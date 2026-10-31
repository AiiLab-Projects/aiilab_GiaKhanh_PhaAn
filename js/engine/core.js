/*
 * Hồ Sơ 13 — PixelScene
 * Bộ dựng hiện trường pixel-art 2.5D:
 *  - Phối cảnh một điểm tụ thật: mọi đồ vật đặt theo toạ độ mét (X, z, h) trong phòng.
 *  - Kết cấu tường / sàn sinh theo từng điểm ảnh (gỗ, gạch bông, thảm, gạch men...).
 *  - Kiểu "minh hoạ rõ nét": độ phân giải 640x360, ánh sáng mượt, nền sáng đều,
 *    viền đậm quanh đồ vật và nhân vật để tách khỏi tường / sàn.
 *  - Nguồn sáng màu, nhấp nháy, sét.
 *  - Mặt nạ phát sáng (emissive) để màn hình, bóng đèn, neon không bị tối đi.
 *  - Sắp xếp chiều sâu, va chạm với đồ đạc, nhân vật điều tra di chuyển được.
 */
(function (global) {
  'use strict';

  // Dữ liệu hồ sơ (horizon, back, front...) viết theo khung 320x180; S nhân lên độ phân giải thật
  const S = 2;
  const W = 320 * S, H = 180 * S;
  const INK = [36, 28, 44]; // màu viền đồ vật

  // ---------- Tiện ích màu & số ngẫu nhiên có hạt giống ----------
  function rng(seed) {
    let s = seed >>> 0;
    return function () {
      s = (s + 0x6D2B79F5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hashStr(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
    return h >>> 0;
  }
  const hexCache = new Map();
  function hex(c) {
    if (Array.isArray(c)) return c;
    let v = hexCache.get(c);
    if (v) return v;
    if (c.startsWith('rgb')) {
      v = c.slice(c.indexOf('(') + 1, -1).split(',').slice(0, 3).map(Number);
      hexCache.set(c, v);
      return v;
    }
    let s = c.replace('#', '');
    if (s.length === 3) s = s.split('').map(x => x + x).join('');
    const n = parseInt(s, 16);
    v = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    hexCache.set(c, v);
    return v;
  }
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  function css(a, alpha) {
    const r = clamp(Math.round(a[0]), 0, 255), g = clamp(Math.round(a[1]), 0, 255), b = clamp(Math.round(a[2]), 0, 255);
    return alpha === undefined ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${alpha})`;
  }
  function shade(c, f) { const a = hex(c); return css([a[0] * f, a[1] * f, a[2] * f]); }
  function mix(c1, c2, t) { const a = hex(c1), b = hex(c2); return css([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]); }

  // ---------- Hình học phòng ----------
  // z = khoảng cách (mét) tính từ tường sau; X = khoảng cách từ tường trái; h = độ cao.
  function makeGeometry(spec) {
    const g0 = Object.assign({ width: 8, depth: 5, horizon: 96, top: 8, back: [32, 288], front: [0, 320] }, spec || {});
    const g = Object.assign({}, g0, { horizon: g0.horizon * S, top: g0.top * S, back: g0.back.map(v => v * S), front: g0.front.map(v => v * S) });
    const bw = g.back[1] - g.back[0], fw = g.front[1] - g.front[0];
    const Z0 = g.depth / (fw / bw - 1);
    const geo = Object.assign({}, g, { bw, fw, Z0 });
    geo.at = (X, z, h = 0) => {
      const D = g.depth - z;
      const width = fw * Z0 / (Z0 + D);
      const t = (width - bw) / (fw - bw);
      const y = g.horizon + t * (H - g.horizon);
      const left = g.back[0] + (g.front[0] - g.back[0]) * t;
      const s = width / g.width;
      return { x: left + X * s, y: y - h * s, s };
    };
    geo.toWorld = (sx, sy) => {
      const t = (sy - g.horizon) / (H - g.horizon);
      const width = bw + (fw - bw) * t;
      const left = g.back[0] + (g.front[0] - g.back[0]) * t;
      const s = width / g.width;
      return { X: (sx - left) / s, z: g.depth - (Z0 * fw / width - Z0) };
    };
    geo.wallH = (g.horizon - g.top) / (bw / g.width);
    // Hệ số thu ngắn của mặt sàn tại độ sâu z (pixel dọc / pixel ngang trên mỗi mét)
    geo.fore = z => {
      const a = geo.at(0, z - 0.05), b = geo.at(0, z + 0.05);
      return (b.y - a.y) / 0.1 / geo.at(0, z).s;
    };
    return geo;
  }

  // ---------- Bộ vẽ (painter) ----------
  // Mỗi lệnh vẽ màu đồng thời vẽ lên mặt nạ phát sáng: đen = chịu ánh sáng, trắng = tự phát sáng.
  function makePainter(ctx, mctx, geo, rand) {
    const g = { ctx, geo, rand, W, H, S };
    let mStyle = '#000';
    function fill(x0, y0, w, h, c, emit) {
      ctx.fillStyle = c;
      ctx.fillRect(x0, y0, w, h);
      const m = emit ? (emit === true ? '#fff' : emit) : '#000';
      if (m !== mStyle) { mctx.fillStyle = m; mStyle = m; }
      if (typeof c === 'string' && c.startsWith('rgba') && !emit) return; // lớp mờ không xoá phát sáng
      mctx.fillRect(x0, y0, w, h);
    }
    g.rect = (x, y, w, h, c, emit) => {
      if (w <= 0 || h <= 0) return;
      const x0 = Math.round(x), y0 = Math.round(y);
      const x1 = Math.max(x0 + 1, Math.round(x + w)), y1 = Math.max(y0 + 1, Math.round(y + h));
      fill(x0, y0, x1 - x0, y1 - y0, c, emit);
    };
    g.erect = (x, y, w, h, c) => g.rect(x, y, w, h, c, true);
    g.px = (x, y, c, emit) => fill(Math.round(x), Math.round(y), 1, 1, c, emit);
    g.line = (x0, y0, x1, y1, c, emit) => {
      x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
      const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
      let err = dx + dy, n = 0;
      const colors = Array.isArray(c) ? c : null;
      while (true) {
        fill(x0, y0, 1, 1, colors ? colors[Math.floor(n / 2) % colors.length] : c, emit);
        n++;
        if (x0 === x1 && y0 === y1) break;
        const e2 = 2 * err;
        if (e2 >= dy) { err += dy; x0 += sx; }
        if (e2 <= dx) { err += dx; y0 += sy; }
      }
    };
    // Đa giác lồi, tô theo từng hàng quét để giữ cạnh sắc nét (không khử răng cưa)
    g.poly = (pts, c, emit) => {
      let minY = Infinity, maxY = -Infinity;
      for (const p of pts) { if (p.y < minY) minY = p.y; if (p.y > maxY) maxY = p.y; }
      const y0 = Math.max(0, Math.round(minY)), y1 = Math.min(H, Math.round(maxY));
      for (let y = y0; y < y1; y++) {
        const yc = y + 0.5;
        let xa = Infinity, xb = -Infinity;
        for (let i = 0; i < pts.length; i++) {
          const a = pts[i], b = pts[(i + 1) % pts.length];
          if ((a.y <= yc && b.y > yc) || (b.y <= yc && a.y > yc)) {
            const x = a.x + (yc - a.y) / (b.y - a.y) * (b.x - a.x);
            if (x < xa) xa = x;
            if (x > xb) xb = x;
          }
        }
        if (xb > xa) {
          const r0 = Math.round(xa), r1 = Math.round(xb);
          if (r1 > r0) fill(r0, y, r1 - r0, 1, c, emit);
        }
      }
    };
    // Khung "biển phẳng" song song màn hình tại độ sâu z: đơn vị mét, dy tính từ đáy lên
    g.frame = (X, z, e = 0) => {
      const p = geo.at(X, z, e);
      const s = p.s, x = p.x, y = p.y;
      return {
        x, y, s,
        r: (dx, dy, w, h, c, emit) => g.rect(x + dx * s, y - (dy + h) * s, w * s, h * s, c, emit),
        e: (dx, dy, w, h, c) => g.rect(x + dx * s, y - (dy + h) * s, w * s, h * s, c, true),
        p: (dx, dy, c, emit) => g.px(x + dx * s, y - dy * s, c, emit),
        line: (ax, ay, bx, by, c, emit) => g.line(x + ax * s, y - ay * s, x + bx * s, y - by * s, c, emit),
        poly: (pts, c, emit) => g.poly(pts.map(([px, py]) => ({ x: x + px * s, y: y - py * s })), c, emit),
        at: (dx, dy) => ({ x: x + dx * s, y: y - dy * s })
      };
    };
    // Mặt phẳng nằm ngang (sàn, mặt bàn, tấm thảm...)
    g.plane = (X, z, w, d, h, c, emit) => {
      g.poly([geo.at(X, z, h), geo.at(X + w, z, h), geo.at(X + w, z + d, h), geo.at(X, z + d, h)], c, emit);
    };
    g.disc = (cx, cz, r, h, c, emit, rz) => {
      const pts = [];
      for (let i = 0; i < 20; i++) {
        const a = i / 20 * Math.PI * 2;
        pts.push(geo.at(cx + Math.cos(a) * r, cz + Math.sin(a) * (rz || r), h));
      }
      g.poly(pts, c, emit);
    };
    // Bóng tiếp xúc mềm dưới đồ vật (dithered)
    g.shadow = (cx, cz, rx, rz, a = 0.38) => {
      g.disc(cx, cz, rx * 1.12, 0, `rgba(0,0,0,${a * 0.45})`, false, rz * 1.12);
      g.disc(cx, cz, rx, 0, `rgba(0,0,0,${a * 0.55})`, false, rz);
    };
    // Khối hộp có phối cảnh: (X, z) là góc trái-sau, w theo chiều ngang, d theo chiều sâu, h cao, e = độ cao đáy
    g.box = (X, z, w, d, h, o) => {
      o = typeof o === 'string' ? { color: o } : (o || {});
      const e = o.e || 0, c = o.color || '#555';
      const fz = z + d;
      const FLB = geo.at(X, fz, e), FRB = geo.at(X + w, fz, e);
      const FLT = geo.at(X, fz, e + h), FRT = geo.at(X + w, fz, e + h);
      const BLT = geo.at(X, z, e + h), BRT = geo.at(X + w, z, e + h);
      const BLB = geo.at(X, z, e), BRB = geo.at(X + w, z, e);
      const cx = geo.width / 2;
      const top = o.top || shade(c, 1.18), front = o.front || shade(c, 0.86), side = o.side || shade(c, 0.66);
      if (!o.noShadow && e === 0 && h > 0.25) g.shadow(X + w / 2, z + d / 2, w * 0.62, d * 0.62 + 0.08, 0.32);
      if (X > cx) g.poly([FLB, FLT, BLT, BLB], side, o.emit);
      else if (X + w < cx) g.poly([FRB, FRT, BRT, BRB], side, o.emit);
      if (!o.noTop) g.poly([FLT, FRT, BRT, BLT], top, o.emit);
      g.rect(FLT.x, FLT.y, FRT.x - FLT.x, FLB.y - FLT.y, front, o.emit);
      if (o.edge !== false && FRT.x - FLT.x > 3) {
        g.rect(FLT.x, FLT.y, FRT.x - FLT.x, 1, o.edgeColor || shade(c, 1.35), o.emit);
        g.rect(FLB.x, FLB.y - 1, FRB.x - FLB.x, 1, shade(c, 0.5), o.emit);
      }
      return g.frame(X, fz, e);
    };
    // Chữ pixel 3x5 (chỉ số và chữ không dấu dùng cho bảng hiệu nhỏ)
    g.text = (x, y, str, c, size = 1, emit) => {
      size *= S;
      let cx = Math.round(x);
      for (const ch of String(str).toUpperCase()) {
        const glyph = FONT[ch];
        if (glyph) {
          for (let r = 0; r < 5; r++) for (let col = 0; col < 3; col++) {
            if (glyph[r] & (4 >> col)) fill(cx + col * size, Math.round(y) + r * size, size, size, c, emit);
          }
        }
        cx += 4 * size;
      }
    };
    g.textWidth = (str, size = 1) => (String(str).length * 4 * size - size) * S;
    return g;
  }

  const FONT = {
    '0': [7, 5, 5, 5, 7], '1': [2, 6, 2, 2, 7], '2': [7, 1, 7, 4, 7], '3': [7, 1, 7, 1, 7], '4': [5, 5, 7, 1, 1],
    '5': [7, 4, 7, 1, 7], '6': [7, 4, 7, 5, 7], '7': [7, 1, 2, 2, 2], '8': [7, 5, 7, 5, 7], '9': [7, 5, 7, 1, 7],
    'A': [2, 5, 7, 5, 5], 'B': [6, 5, 6, 5, 6], 'C': [7, 4, 4, 4, 7], 'D': [6, 5, 5, 5, 6], 'E': [7, 4, 6, 4, 7],
    'F': [7, 4, 6, 4, 4], 'G': [7, 4, 5, 5, 7], 'H': [5, 5, 7, 5, 5], 'I': [7, 2, 2, 2, 7], 'K': [5, 5, 6, 5, 5],
    'L': [4, 4, 4, 4, 7], 'M': [5, 7, 7, 5, 5], 'N': [6, 5, 5, 5, 5], 'O': [7, 5, 5, 5, 7], 'P': [7, 5, 7, 4, 4],
    'R': [6, 5, 6, 5, 5], 'S': [7, 4, 7, 1, 7], 'T': [7, 2, 2, 2, 2], 'U': [5, 5, 5, 5, 7], 'V': [5, 5, 5, 5, 2],
    'X': [5, 5, 2, 5, 5], 'Y': [5, 5, 2, 2, 2], 'Q': [7, 5, 5, 7, 1], 'W': [5, 5, 7, 7, 5], 'Z': [7, 1, 2, 4, 7],
    'J': [1, 1, 1, 5, 7], ':': [0, 2, 0, 2, 0], '-': [0, 0, 7, 0, 0], '.': [0, 0, 0, 0, 2], '#': [5, 7, 5, 7, 5], ' ': [0, 0, 0, 0, 0],
    '/': [1, 1, 2, 4, 4], '!': [2, 2, 2, 0, 2], '?': [7, 1, 3, 0, 2]
  };

  // ---------- Kết cấu tường & sàn (vẽ một lần vào lớp tĩnh) ----------
  function wallTexture(o, u, h, n, stains) {
    const base = hex(o.color), acc = hex(o.accent || o.color);
    let c = base, f = 1;
    const type = o.type || 'plaster';
    if (type === 'wallpaper') {
      const stripe = Math.floor(u / 0.22) % 2;
      c = stripe ? acc : base;
      const lu = ((u % 0.22) + 0.22) % 0.22, lh = ((h % 0.3) + 0.3) % 0.3;
      if (stripe && Math.abs(lu - 0.11) + Math.abs(lh - 0.15) < 0.045) f *= 1.16;
    } else if (type === 'brick') {
      const row = Math.floor(h / 0.08);
      const off = row % 2 ? 0.12 : 0;
      const bu = ((u + off) % 0.24 + 0.24) % 0.24, bh = h % 0.08;
      if (bu < 0.02 || bh < 0.015) c = hex(o.mortar || '#4a4440');
      else f *= 0.9 + ((row * 7 + Math.floor((u + off) / 0.24) * 13) % 5) * 0.05;
    } else if (type === 'tile') {
      const s = o.size || 0.2;
      if (((u % s) + s) % s < 0.018 || h % s < 0.018) c = hex(o.mortar || '#8b8f8a');
      else f *= 0.96 + ((Math.floor(u / s) * 3 + Math.floor(h / s) * 5) % 4) * 0.025;
    } else if (type === 'panel') {
      const s = o.size || 0.9;
      const pu = ((u % s) + s) % s;
      if (pu < 0.035) f *= 0.72;
      else if (pu < 0.07) f *= 1.12;
      if (o.trim && Math.abs(h - (o.trimH || 2.2)) < 0.04) c = hex(o.trim);
    } else if (type === 'stripes') {
      c = Math.floor(u / 0.12) % 2 ? acc : base;
    } else if (type === 'train') {
      if (h > 1.9) c = acc;
      if (Math.abs(h - 1.9) < 0.03) c = hex(o.trim || '#b69a62');
    }
    // Ốp chân tường bằng gỗ
    if (o.wainscot && h < o.wainscot.h) {
      const wc = hex(o.wainscot.color);
      c = wc; f = 1;
      const s = o.wainscot.panel || 0.55;
      const pu = ((u % s) + s) % s;
      if (pu < 0.03) f *= 0.7;
      else if (pu < 0.06) f *= 1.15;
      if (h > o.wainscot.h - 0.05) f *= 1.3;
      else if (h > o.wainscot.h - 0.08) f *= 0.75;
    }
    if (h < 0.1) { c = hex(o.baseboard || '#1d1a1d'); f = 1; }
    if (stains) {
      for (const s of stains) {
        const dx = (u - s[0]) / s[2], dy = (h - s[1]) / s[3];
        const d = dx * dx + dy * dy;
        if (d < 1) f *= 0.88 + d * 0.12; // vệt loang mềm, không viền cứng
      }
    }
    f *= 0.96 + n * 0.06;
    return [c[0] * f, c[1] * f, c[2] * f];
  }

  function floorTexture(o, X, z, n, cellRand) {
    const type = o.type || 'wood';
    const cols = (o.colors || ['#5a3d2e']).map(hex);
    let c = cols[0], f = 1;
    if (type === 'wood') {
      const pw = o.plank || 0.18;
      const idx = Math.floor(X / pw);
      const len = 1.4;
      const off = cellRand(idx) * len;
      const seg = Math.floor((z + off) / len);
      c = cols[Math.floor(cellRand(idx * 31 + seg * 7) * cols.length)];
      const lx = ((X % pw) + pw) % pw, lz = (((z + off) % len) + len) % len;
      if (lx < 0.016) f *= 0.55;
      else if (lz < 0.02) f *= 0.62;
      else f *= 0.93 + Math.sin(X * 90 + idx * 3.1 + z * 2) * 0.05 + cellRand(idx * 17 + seg) * 0.06;
    } else if (type === 'checker') {
      const s = o.size || 0.5;
      const a = Math.floor(X / s), b = Math.floor(z / s);
      c = cols[(((a + b) % 2) + 2) % 2];
      const lx = ((X % s) + s) % s, lz = ((z % s) + s) % s;
      if (lx < 0.015 || lz < 0.015) f *= 0.8;
    } else if (type === 'encaustic') {
      // Gạch bông xi măng kiểu Đông Dương
      const s = o.size || 0.4;
      const a = Math.floor(X / s), b = Math.floor(z / s);
      const lx = (((X % s) + s) % s) / s - 0.5, lz = (((z % s) + s) % s) / s - 0.5;
      const r = Math.hypot(lx, lz);
      const ang = Math.atan2(lz, lx);
      const petal = 0.2 + Math.abs(Math.cos(ang * 2)) * 0.12;
      if (Math.abs(lx) > 0.47 || Math.abs(lz) > 0.47) c = cols[3] || cols[0];
      else if (r < 0.07) c = cols[2] || cols[1];
      else if (r < petal) c = cols[1];
      else if (Math.hypot(Math.abs(lx) - 0.5, Math.abs(lz) - 0.5) < 0.2) c = cols[2] || cols[1];
      else c = cols[0];
      f *= 0.95 + cellRand(a * 13 + b * 29) * 0.08; // gạch mòn không đều
    } else if (type === 'tile') {
      const s = o.size || 0.3;
      const a = Math.floor(X / s), b = Math.floor(z / s);
      const lx = ((X % s) + s) % s, lz = ((z % s) + s) % s;
      c = cols[Math.floor(cellRand(a * 13 + b * 7) * cols.length)];
      if (lx < 0.02 || lz < 0.02) c = hex(o.grout || '#2a2a2c');
    } else if (type === 'carpet') {
      const s = o.size || 0.3;
      const lx = (((X % s) + s) % s) / s, lz = (((z % s) + s) % s) / s;
      if (Math.abs(lx - 0.5) + Math.abs(lz - 0.5) < 0.18) c = cols[1] || cols[0];
      f *= 0.92 + n * 0.12;
    } else if (type === 'lino') {
      f *= 0.94 + n * 0.1;
      if (n > 0.93) c = cols[1] || cols[0];
    } else if (type === 'concrete') {
      f *= 0.88 + n * 0.16 + Math.sin(X * 3 + z * 5) * 0.03;
    }
    if (o.runner && X > o.runner.x0 && X < o.runner.x1) {
      const rc = hex(o.runner.color);
      const edge = Math.min(X - o.runner.x0, o.runner.x1 - X);
      c = edge < 0.08 ? hex(o.runner.trim || '#b08a46') : rc;
      f = edge < 0.08 ? 1 : 0.9 + n * 0.12;
    }
    return [c[0] * f, c[1] * f, c[2] * f];
  }

  function paintStatic(ctx, geo, room, seed) {
    const img = ctx.createImageData(W, H), d = img.data;
    const rand = rng(seed);
    const cellCache = new Map();
    const cellRand = k => { let v = cellCache.get(k); if (v === undefined) { v = rng(seed ^ (k * 2654435761))(); cellCache.set(k, v); } return v; };
    const wall = room.wall || { color: '#444' };
    const floor = room.floor || {};
    const voidC = hex(room.void || '#0b0c10');
    const capC = hex(wall.cap || '#26232a');
    const stains = wall.stains ? Array.from({ length: wall.stains }, () => [rand() * geo.width, 0.6 + rand() * 1.8, 0.25 + rand() * 0.5, 0.2 + rand() * 0.45]) : null;
    const bl = geo.back[0], br = geo.back[1], f0 = geo.front[0], f1 = geo.front[1];
    const sBack = geo.bw / geo.width;
    const frontTopY = H - geo.wallH * (geo.fw / geo.width);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        const n = rand();
        let c = null;
        let region = 'back';
        let k = 0;
        if (x < bl && bl > f0) { region = 'left'; k = (bl - x) / (bl - f0); }
        else if (x >= br && f1 > br) { region = 'right'; k = (x - br) / (f1 - br); }
        if (region === 'back') {
          if (y < geo.top - 3) c = voidC;
          else if (y < geo.top) c = capC;
          else if (y < geo.horizon) {
            const u = (x - bl) / sBack, h = (geo.horizon - y) / sBack;
            c = wallTexture(wall, u, h, n, stains);
            const ao = Math.min(1, (geo.horizon - y) / 6) * 0.15 + 0.85; // tối sát chân tường
            const topAo = Math.min(1, (y - geo.top) / 10) * 0.18 + 0.82;
            c = [c[0] * ao * topAo, c[1] * ao * topAo, c[2] * ao * topAo];
          }
        } else {
          const yF = geo.horizon + k * (H - geo.horizon);
          const yT = geo.top + k * (frontTopY - geo.top);
          if (y < yT - 3) c = voidC;
          else if (y < yT) c = capC;
          else if (y < yF) {
            const wz = geo.toWorld(x, yF).z;
            const s = (geo.bw + (geo.fw - geo.bw) * k) / geo.width;
            const h = (yF - y) / s;
            c = wallTexture(wall, wz, h, n, null);
            const f = region === 'left' ? (room.leftShade || 0.74) : (room.rightShade || 0.62);
            c = [c[0] * f, c[1] * f, c[2] * f];
          }
        }
        if (!c) {
          const w = geo.toWorld(x, y + 0.5);
          c = floorTexture(floor, w.X, w.z, n, cellRand);
          // Tối dần sát chân tường (ambient occlusion)
          let ao = 1;
          if (w.z < 0.35) ao *= 0.72 + w.z / 0.35 * 0.28;
          if (bl > f0 && w.X < 0.3) ao *= 0.8 + w.X / 0.3 * 0.2;
          if (f1 > br && w.X > geo.width - 0.3) ao *= 0.8 + (geo.width - w.X) / 0.3 * 0.2;
          c = [c[0] * ao, c[1] * ao, c[2] * ao];
        }
        d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  // ---------- Ánh sáng ----------
  function buildLightField(geo, L) {
    const field = new Float32Array(W * H);
    const p = geo.at(L.X, L.z, L.h || 0);
    const R = (L.r || 2) * p.s;
    const sq = L.squash || 0.72;
    const cy = p.y + (L.drop === undefined ? 0.35 : L.drop) * (L.h || 0) * p.s; // tâm lệch xuống sàn
    const pow = L.falloff || 1.7, inten = L.intensity === undefined ? 1 : L.intensity;
    const x0 = Math.max(0, Math.floor(p.x - R)), x1 = Math.min(W, Math.ceil(p.x + R));
    const y0 = Math.max(0, Math.floor(cy - R * sq)), y1 = Math.min(H, Math.ceil(cy + R * sq));
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const dx = x - p.x, dy = (y - cy) / sq;
        const dd = Math.sqrt(dx * dx + dy * dy) / R;
        if (dd >= 1) continue;
        const f = Math.pow(1 - dd, pow) * inten;
        field[y * W + x] = f;
      }
    }
    return field;
  }

  // Tia sáng thể tích (cột sáng từ cửa sổ, đèn sân khấu) — cộng thêm, có dithering
  function buildBeamField(geo, B) {
    const field = new Float32Array(W * H);
    const a = geo.at(B.from[0], B.from[1], B.from[2]);
    const pts = [];
    const half = (B.w || 1) / 2;
    const tl = geo.at(B.to[0] - half, B.to[1], 0), tr = geo.at(B.to[0] + half, B.to[1], 0);
    const sw = (B.sw || 0.15) * a.s;
    pts.push({ x: a.x - sw, y: a.y }, { x: a.x + sw, y: a.y }, tr, tl);
    let minY = Math.min(...pts.map(p => p.y)), maxY = Math.max(...pts.map(p => p.y));
    for (let y = Math.max(0, Math.floor(minY)); y < Math.min(H, Math.ceil(maxY)); y++) {
      const yc = y + 0.5;
      let xa = Infinity, xb = -Infinity;
      for (let i = 0; i < 4; i++) {
        const p = pts[i], q = pts[(i + 1) % 4];
        if ((p.y <= yc && q.y > yc) || (q.y <= yc && p.y > yc)) {
          const x = p.x + (yc - p.y) / (q.y - p.y) * (q.x - p.x);
          xa = Math.min(xa, x); xb = Math.max(xb, x);
        }
      }
      const t = (yc - minY) / Math.max(1, maxY - minY);
      for (let x = Math.max(0, Math.floor(xa)); x < Math.min(W, Math.ceil(xb)); x++) {
        const edge = Math.min(x - xa, xb - x) / Math.max(1, (xb - xa) / 2);
        const f = (B.a || 0.18) * Math.min(1, edge * 1.6) * (1 - t * 0.55);
        field[y * W + x] = f;
      }
    }
    return field;
  }

  // ---------- Thư viện đạo cụ ----------
  const PROPS = {};
  const BLOCKERS = {}; // type -> hàm trả về [X, z, w, d] cho va chạm

  function sortKey(p) {
    if (p.layer === 'decal') return -1000 + (p.z || 0);
    if (p.layer === 'wall') return -2000 + (p.order || 0);
    if (p.layer === 'ceiling') return 1000 + (p.z || 0);
    if (p.sort !== undefined) return p.sort;
    const def = PROPS[p.type];
    const d = def && def.depth ? def.depth(p) : (p.d || 0);
    return (p.z || 0) + d + (p.e || 0) * 0.6;
  }

  // ---------- Cảnh ----------
  class PixelScene {
    constructor(canvas, spec, opts = {}) {
      this.canvas = canvas;
      this.spec = spec;
      this.opts = opts;
      canvas.width = W; canvas.height = H;
      this.ctx = canvas.getContext('2d');
      this.geo = makeGeometry(spec.geometry);
      this.seed = hashStr(spec.seed || JSON.stringify(spec.geometry || {}) + (spec.room && spec.room.wall && spec.room.wall.color));
      const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
      this.staticCanvas = mk(); this.workCanvas = mk(); this.maskCanvas = mk(); this.propCanvas = mk();
      this.sctx = this.staticCanvas.getContext('2d');
      this.wctx = this.workCanvas.getContext('2d', { willReadFrequently: true });
      this.pctx = this.propCanvas.getContext('2d', { willReadFrequently: true });
      this.mctx = this.maskCanvas.getContext('2d', { willReadFrequently: true });
      paintStatic(this.sctx, this.geo, spec.room || {}, this.seed);
      this.props = (spec.props || []).map((p, i) => Object.assign({ _i: i }, p));
      for (const p of this.props) {
        if (!p.layer) p.layer = (PROPS[p.type] && PROPS[p.type].layer) || 'floor';
        p._key = sortKey(p);
      }
      this.blockers = [];
      for (const p of this.props) {
        if (p.block === false) continue;
        const f = BLOCKERS[p.type];
        const b = p.block && p.block !== true ? p.block : (f ? f(p) : null);
        if (b) this.blockers.push(b);
      }
      (spec.blockers || []).forEach(b => this.blockers.push(b));
      this.lights = (spec.lights || []).map(L => ({ L, field: buildLightField(this.geo, L), phase: Math.random() * 10 }));
      this.beams = (spec.beams || []).map(B => ({ B, field: buildBeamField(this.geo, B) }));
      // exposure: hệ số sáng chung. Nền luôn sáng ít nhất ~0.75 để nhìn rõ mọi góc phòng,
      // màu ambient của từng vụ chỉ còn tạo sắc thái (xanh đêm mưa, vàng sáng sớm...)
      const expo = spec.exposure || 1.6;
      this.ambient = (spec.ambient || [0.35, 0.36, 0.45]).map(v => Math.min(1.05, 0.42 + v * expo * 0.72));
      this.vignette = new Float32Array(W * H);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const dx = (x - W / 2) / (W / 2), dy = (y - H / 2) / (H / 2);
        this.vignette[y * W + x] = 1 - Math.min(0.5, (dx * dx * 0.55 + dy * dy * 0.75) * (spec.vignette === undefined ? 0.1 : spec.vignette * 0.4));
      }
      this.lbuf = new Float32Array(W * H * 3);
      this.edge = new Uint8Array(W * H);
      this.hotspots = (spec.hotspots || []).slice();
      this.discovered = [];
      this.hint = opts.hint !== false;
      this.time = 0;
      this.flash = 0;
      this.nextFlash = 6 + Math.random() * 10;
      this.dust = Array.from({ length: spec.dust === false ? 0 : 26 }, () => ({ x: Math.random() * W, y: Math.random() * H, v: 0.6 + Math.random() }));
      if (opts.actor) {
        const sp = spec.spawn || { X: this.geo.width / 2, z: this.geo.depth - 0.4 };
        this.actor = { X: sp.X, z: sp.z, facing: 'back', walking: false, phase: 0, target: null, keys: new Set(), stuck: 0 };
      }
      this.running = false;
    }

    // Toạ độ màn hình (tỉ lệ 0..1) của một điểm thế giới — dùng để đặt nút HTML lên canvas
    screenOf(X, z, h = 0) { const p = this.geo.at(X, z, h); return { x: p.x / W, y: p.y / H, s: p.s / W }; }

    setDiscovered(list) { this.discovered = list.slice(); }

    blocked(X, z) {
      const g = this.geo;
      const zMin = (this.spec.walk && this.spec.walk.zMin) || 0.45;
      const zMax = (this.spec.walk && this.spec.walk.zMax) || g.depth - 0.12;
      if (X < 0.25 || X > g.width - 0.25 || z < zMin || z > zMax) return true;
      for (const b of this.blockers) {
        if (X > b[0] - 0.14 && X < b[0] + b[2] + 0.14 && z > b[1] - 0.06 && z < b[1] + b[3] + 0.1) return true;
      }
      return false;
    }

    // Điểm đứng gần nhất để quan sát một vị trí
    approachPoint(X, z) {
      const g = this.geo;
      for (let dz = 0.55; dz < g.depth; dz += 0.1) {
        for (const dx of [0, -0.3, 0.3, -0.6, 0.6, -0.9, 0.9]) {
          const nx = X + dx, nz = z + dz;
          if (!this.blocked(nx, nz)) return { X: nx, z: nz };
        }
      }
      return { X: this.actor.X, z: this.actor.z };
    }

    walkTo(X, z, onArrive) {
      if (!this.actor) return;
      const path = this.findPath(this.actor.X, this.actor.z, X, z);
      const last = path.pop() || { X, z };
      this.actor.path = path;
      this.actor.target = { X: last.X, z: last.z, onArrive };
      this.actor.stuck = 0;
    }

    // Tìm đường A* trên lưới 10cm, tránh vật cản; trả về các điểm dừng đã rút gọn
    findPath(sx, sz, tx, tz) {
      const S = 0.1, g = this.geo;
      const cols = Math.ceil(g.width / S) + 1, rows = Math.ceil(g.depth / S) + 1;
      const idx = (c, r) => r * cols + c;
      const free = new Uint8Array(cols * rows);
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) free[idx(c, r)] = this.blocked(c * S, r * S) ? 0 : 1;
      const cl = v => Math.max(0, Math.min(cols - 1, v)), rl = v => Math.max(0, Math.min(rows - 1, v));
      const sc = cl(Math.round(sx / S)), sr = rl(Math.round(sz / S));
      // Đích bị chặn → chọn ô trống gần đích nhất
      let tc = cl(Math.round(tx / S)), tr = rl(Math.round(tz / S));
      if (!free[idx(tc, tr)]) {
        let best = null, bd = Infinity;
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (free[idx(c, r)]) {
          const d = (c - tc) * (c - tc) + (r - tr) * (r - tr);
          if (d < bd) { bd = d; best = [c, r]; }
        }
        if (!best) return [{ X: tx, z: tz }];
        [tc, tr] = best;
      }
      const start = idx(sc, sr), goal = idx(tc, tr);
      const gs = new Float32Array(cols * rows).fill(Infinity), from = new Int32Array(cols * rows).fill(-1);
      const open = [start]; gs[start] = 0;
      const hh = i => Math.hypot(i % cols - tc, Math.floor(i / cols) - tr);
      const closed = new Uint8Array(cols * rows);
      while (open.length) {
        let bi = 0;
        for (let i = 1; i < open.length; i++) if (gs[open[i]] + hh(open[i]) < gs[open[bi]] + hh(open[bi])) bi = i;
        const cur = open[bi]; open.splice(bi, 1);
        if (cur === goal) break;
        if (closed[cur]) continue;
        closed[cur] = 1;
        const c = cur % cols, r = Math.floor(cur / cols);
        for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
          if (!dr && !dc) continue;
          const nc = c + dc, nr = r + dr;
          if (nc < 0 || nr < 0 || nc >= cols || nr >= rows) continue;
          const ni = idx(nc, nr);
          if (!free[ni] && ni !== goal) continue;
          if (dr && dc && (!free[idx(c + dc, r)] || !free[idx(c, r + dr)])) continue;
          const ng = gs[cur] + (dr && dc ? 1.414 : 1);
          if (ng < gs[ni]) { gs[ni] = ng; from[ni] = cur; open.push(ni); }
        }
      }
      if (from[goal] < 0 && goal !== start) return [{ X: tx, z: tz }];
      const cells = [];
      for (let i = goal; i !== -1 && i !== start; i = from[i]) cells.unshift(i);
      const pts = cells.map(i => ({ X: (i % cols) * S, z: Math.floor(i / cols) * S }));
      const exact = free[idx(cl(Math.round(tx / S)), rl(Math.round(tz / S)))] && !this.blocked(tx, tz);
      if (exact && pts.length) pts[pts.length - 1] = { X: tx, z: tz };
      // Rút gọn: bỏ các điểm có thể đi thẳng tới
      const clear = (a, b) => {
        const n = Math.ceil(Math.hypot(b.X - a.X, b.z - a.z) / 0.05);
        for (let k = 1; k < n; k++) if (this.blocked(a.X + (b.X - a.X) * k / n, a.z + (b.z - a.z) * k / n)) return false;
        return true;
      };
      const out = [];
      let anchor = { X: sx, z: sz };
      for (let i = 0; i < pts.length; i++) {
        if (i === pts.length - 1 || !clear(anchor, pts[i + 1])) { out.push(pts[i]); anchor = pts[i]; }
      }
      return out.length ? out : [{ X: tx, z: tz }];
    }

    nearestHotspot(range = 1.25) {
      if (!this.actor) return null;
      let best = null, bd = Infinity;
      for (const h of this.hotspots) {
        const d = Math.hypot(h.X - this.actor.X, (h.z - this.actor.z) * 1.1);
        if (d < range && d < bd) { best = h; bd = d; }
      }
      return best;
    }

    update(dt) {
      this.time += dt;
      if (this.spec.weather === 'rain' || this.spec.lightning) {
        this.nextFlash -= dt;
        if (this.nextFlash <= 0) { this.flash = 1; this.nextFlash = 9 + Math.random() * 14; }
        this.flash = Math.max(0, this.flash - dt * 2.6);
      }
      const a = this.actor;
      if (!a) return;
      let vx = 0, vz = 0;
      const k = a.keys;
      if (k.has('left')) vx -= 1;
      if (k.has('right')) vx += 1;
      if (k.has('up')) vz -= 1;
      if (k.has('down')) vz += 1;
      if (vx || vz) { a.target = null; a.path = null; }
      if (a.target) {
        // Đi qua từng điểm dừng trên đường trước khi tới đích
        if (a.path && a.path.length && Math.hypot(a.path[0].X - a.X, a.path[0].z - a.z) < 0.08) { a.path.shift(); a.stuck = 0; }
        const wp = a.path && a.path.length ? a.path[0] : a.target;
        const dx = wp.X - a.X, dz = wp.z - a.z, len = Math.hypot(dx, dz);
        if (len < 0.06 && wp === a.target) {
          const cb = a.target.onArrive; a.target = null;
          if (cb) cb();
        } else { vx = dx / len; vz = dz / len; }
      }
      const moving = vx || vz;
      a.walking = Boolean(moving);
      if (moving) {
        const n = Math.hypot(vx, vz), sp = 1.9 * dt;
        const nx = a.X + vx / n * sp, nz = a.z + vz / n * sp;
        let moved = false;
        if (!this.blocked(nx, nz)) { a.X = nx; a.z = nz; moved = true; }
        else if (!this.blocked(nx, a.z)) { a.X = nx; moved = Math.abs(vx) > 0.2; }
        else if (!this.blocked(a.X, nz)) { a.z = nz; moved = Math.abs(vz) > 0.2; }
        if (Math.abs(vx) > Math.abs(vz)) a.facing = vx < 0 ? 'left' : 'right';
        else a.facing = vz < 0 ? 'back' : 'front';
        a.phase += dt * 9;
        if (!moved && a.target) {
          a.stuck += dt;
          if (a.stuck > 0.25) { const cb = a.target.onArrive; a.target = null; if (cb) cb(); }
        }
      }
    }

    draw() {
      // Hai lớp: nền (tường, sàn, vết trên sàn) và đồ vật (được vẽ viền khi ghép)
      const gb = makePainter(this.wctx, this.mctx, this.geo, rng(this.seed));
      const g = makePainter(this.pctx, this.mctx, this.geo, rng(this.seed + 1));
      const t = this.time;
      this.wctx.drawImage(this.staticCanvas, 0, 0);
      this.pctx.clearRect(0, 0, W, H);
      this.mctx.globalCompositeOperation = 'source-over';
      this.mctx.fillStyle = '#000';
      this.mctx.fillRect(0, 0, W, H);
      const env = { t, flash: this.flash, scene: this };
      const list = this.props.slice();
      if (this.actor && !this.hideActor) list.push({ type: '__actor', _key: this.actor.z + 0.05, layer: 'floor' });
      this.discovered.forEach((id, i) => {
        const h = this.hotspots.find(x => x.id === id);
        if (h && h.placard !== false) {
          const pz = h.pz !== undefined ? h.pz : h.z + 0.25, px = h.px !== undefined ? h.px : h.X + 0.25;
          list.push({ type: 'placard', X: px, z: pz, n: i + 1, _key: pz + 0.02, layer: 'floor' });
        }
      });
      list.sort((a, b) => a._key - b._key);
      for (const p of list) {
        if (p.type === '__actor') { global.PixelPeople.drawActor(g, this.actor, this.spec.detective); continue; }
        const def = PROPS[p.type];
        if (def) def.draw(p.layer === 'decal' ? gb : g, p, env);
      }
      this.applyLight();
    }

    applyLight() {
      const src = this.wctx.getImageData(0, 0, W, H);
      const s = src.data;
      // Ghép lớp đồ vật lên nền và đánh dấu viền: điểm trong suốt nằm cạnh điểm đặc
      const pd = this.pctx.getImageData(0, 0, W, H).data;
      const edge = this.edge;
      for (let i = 0, q = 0; i < W * H; i++, q += 4) {
        const a = pd[q + 3];
        edge[i] = 0;
        if (a >= 200) { s[q] = pd[q]; s[q + 1] = pd[q + 1]; s[q + 2] = pd[q + 2]; continue; }
        if (a) { const k = a / 255; s[q] += (pd[q] - s[q]) * k; s[q + 1] += (pd[q + 1] - s[q + 1]) * k; s[q + 2] += (pd[q + 2] - s[q + 2]) * k; }
        if (a < 120) {
          const x = i % W;
          if ((x > 0 && pd[q - 1] >= 200) || (x < W - 1 && pd[q + 7] >= 200) || (i >= W && pd[q - W * 4 + 3] >= 200) || (i < W * (H - 1) && pd[q + W * 4 + 3] >= 200)) edge[i] = 1;
        }
      }
      const m = this.mctx.getImageData(0, 0, W, H).data;
      const L = this.lbuf;
      const amb = this.ambient;
      const fl = this.flash;
      const ar = amb[0] + fl * 0.55, ag = amb[1] + fl * 0.6, ab = amb[2] + fl * 0.75;
      for (let i = 0, j = 0; i < W * H; i++, j += 3) {
        const v = this.vignette[i];
        L[j] = ar * v; L[j + 1] = ag * v; L[j + 2] = ab * v;
      }
      for (const lt of this.lights) {
        const Lp = lt.L;
        let k = 1;
        if (Lp.flicker) {
          const t = this.time + lt.phase;
          k = 1 - Lp.flicker * (0.5 + 0.5 * Math.sin(t * 13) * Math.sin(t * 7.3));
          if (Math.sin(t * 1.7) > 0.985) k *= 0.35; // chập chờn mạnh thỉnh thoảng
        }
        if (Lp.blink) k *= Math.sin(this.time * Lp.blink) > 0 ? 1 : 0.1;
        const col = hex(Lp.color || '#ffd9a0');
        const cr = col[0] / 255 * k, cg = col[1] / 255 * k, cb = col[2] / 255 * k;
        const f = lt.field;
        for (let i = 0, j = 0; i < W * H; i++, j += 3) {
          const v = f[i];
          if (v) { L[j] += v * cr * 0.8; L[j + 1] += v * cg * 0.8; L[j + 2] += v * cb * 0.8; }
        }
      }
      for (let i = 0, j = 0, q = 0; i < W * H; i++, j += 3, q += 4) {
        if (edge[i]) { s[q] = INK[0]; s[q + 1] = INK[1]; s[q + 2] = INK[2]; continue; }
        const e = m[q] / 255;
        const ne = 1 - e;
        s[q] = s[q] * (L[j] * ne + e);
        s[q + 1] = s[q + 1] * (L[j + 1] * ne + e);
        s[q + 2] = s[q + 2] * (L[j + 2] * ne + e);
      }
      for (const b of this.beams) {
        const col = hex(b.B.color || '#9fb6d6');
        const f = b.field;
        const k = b.B.pulse ? 0.85 + 0.15 * Math.sin(this.time * b.B.pulse) : 1;
        for (let i = 0, q = 0; i < W * H; i++, q += 4) {
          const v = f[i];
          if (v) { s[q] += col[0] * v * k; s[q + 1] += col[1] * v * k; s[q + 2] += col[2] * v * k; }
        }
      }
      this.ctx.putImageData(src, 0, 0);
      this.drawOverlay();
    }

    drawOverlay() {
      const ctx = this.ctx, t = this.time;
      // Bụi lơ lửng trong luồng sáng
      for (const d of this.dust) {
        d.y -= d.v * 0.05; d.x += Math.sin(t * 0.7 + d.v * 9) * 0.04;
        if (d.y < 0) { d.y = H; d.x = Math.random() * W; }
        const i = Math.floor(d.y) * W + Math.floor(d.x);
        let lit = 0;
        for (const lt of this.lights) lit += lt.field[i] || 0;
        for (const b of this.beams) lit += (b.field[i] || 0) * 3;
        if (lit > 0.25) {
          ctx.fillStyle = `rgba(255,236,200,${Math.min(0.55, lit * 0.5)})`;
          ctx.fillRect(Math.floor(d.x), Math.floor(d.y), S, S);
        }
      }
      // Lấp lánh ở những điểm chưa kiểm tra
      if (this.hint) {
        for (const h of this.hotspots) {
          if (this.discovered.includes(h.id) || h.sparkle === false) continue;
          const p = this.geo.at(h.X, h.z, h.h || 0);
          const ph = (t * 1.3 + (h.X * 7 + h.z * 3)) % 3.2;
          if (ph < 1.4) {
            // Ngôi sao lấp lánh to, rõ trên nền sáng
            const a = Math.sin(ph / 1.4 * Math.PI);
            const x = Math.round(p.x), y = Math.round(p.y), u = S, arm = Math.round((2 + a * 4) * u);
            ctx.fillStyle = `rgba(255,200,40,${a})`;
            ctx.fillRect(x - arm, y - u / 2, arm * 2 + u, u); ctx.fillRect(x - u / 2, y - arm, u, arm * 2 + u);
            ctx.fillStyle = `rgba(255,255,235,${a})`;
            ctx.fillRect(x - u, y - u, u * 2, u * 2);
          }
        }
      }
    }

    frame(ts) {
      if (!this.running) return;
      const now = ts || performance.now();
      const dt = Math.min(0.05, (now - (this.last || now)) / 1000);
      this.last = now;
      this.acc = (this.acc || 0) + dt;
      this.update(dt);
      if (this.acc >= 1 / 30) { this.acc = 0; this.draw(); }
      if (this.onTick) this.onTick();
      this.raf = requestAnimationFrame(t => this.frame(t));
    }
    start() { if (this.running) return; this.running = true; this.last = 0; this.raf = requestAnimationFrame(t => this.frame(t)); }
    stop() { this.running = false; cancelAnimationFrame(this.raf); }
    renderOnce(time = 0) { this.time = time; this.draw(); }

    // Cắt một vùng (toạ độ thế giới) để phóng to cận cảnh
    snapshot(target, X, z, h, radius) {
      const p = this.geo.at(X, z, h || 0);
      const r = Math.min(H / 2, Math.max(30 * S, (radius || 0.6) * p.s * 2.4));
      const w = Math.round(r * 2 * 4 / 3), hh = Math.round(r * 2);
      const sx = clamp(Math.round(p.x - w / 2), 0, W - w), sy = clamp(Math.round(p.y - hh / 2), 0, H - hh);
      target.width = w; target.height = hh;
      target.getContext('2d').drawImage(this.canvas, sx, sy, w, hh, 0, 0, w, hh);
    }
  }

  PixelScene.W = W; PixelScene.H = H;
  PixelScene.util = { rng, hex, css, shade, mix, clamp, hashStr };
  PixelScene.props = PROPS;
  PixelScene.blockers = BLOCKERS;
  PixelScene.sortKey = sortKey;
  PixelScene.define = (type, def, blocker) => { PROPS[type] = def; if (blocker) BLOCKERS[type] = blocker; };
  PixelScene.still = (canvas, spec, time = 1.2) => { const s = new PixelScene(canvas, spec, { hint: false }); s.dust = []; s.renderOnce(time); return s; };
  global.PixelScene = PixelScene;
})(window);
