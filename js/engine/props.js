/* Hồ Sơ 13 — thư viện đạo cụ hiện trường (đơn vị: mét; X từ tường trái, z từ tường sau) */
(function (global) {
  'use strict';
  const PS = global.PixelScene;
  const { shade, mix, rng, hashStr } = PS.util;
  const P = global.PixelPeople;
  const def = PS.define;
  const fp = p => [p.X, p.z, p.w, p.d]; // dấu chân va chạm mặc định
  const seedOf = p => rng(hashStr(p.type + p.X + ':' + p.z + (p.seed || '')));

  // Hình tròn đứng (mặt đồng hồ, trống...) trong không gian pixel
  function circ(g, cx, cy, R, col, emit) {
    const r = Math.max(1, R);
    for (let y = -Math.ceil(r); y <= Math.ceil(r); y++) {
      const hw = Math.sqrt(Math.max(0, r * r - y * y));
      if (hw > 0.3) g.rect(cx - hw, cy + y, hw * 2, 1, col, emit);
    }
  }
  // Hình trụ đứng (bàn tròn phủ khăn, trống) — vẽ theo từng cột điểm ảnh
  function cylinder(g, X, z, r, h, color, opts = {}) {
    const top = g.geo.at(X, z, h), bot = g.geo.at(X, z, 0);
    const rx = r * top.s;
    const ryT = Math.abs(g.geo.at(X, z + r, h).y - g.geo.at(X, z - r, h).y) / 2;
    const ryB = Math.abs(g.geo.at(X, z + r, 0).y - g.geo.at(X, z - r, 0).y) / 2;
    const rxB = r * bot.s;
    for (let dx = -Math.ceil(rxB); dx <= Math.ceil(rxB); dx++) {
      const kT = Math.max(0, 1 - (dx / rx) * (dx / rx)), kB = Math.max(0, 1 - (dx / rxB) * (dx / rxB));
      if (kB <= 0) continue;
      const yT = top.y + ryT * Math.sqrt(kT), yB = bot.y + ryB * Math.sqrt(kB);
      const lum = 0.62 + 0.38 * Math.sqrt(kB) - (dx > 0 ? dx / rxB * 0.14 : 0);
      let c = shade(color, lum);
      if (opts.folds && Math.abs(Math.round(dx)) % opts.folds === 0) c = shade(color, lum * 0.82);
      g.rect(top.x + dx, yT, 1, yB - yT, c);
    }
    g.disc(X, z, r, h, opts.top || shade(color, 1.15));
  }

  // ===================== ĐẠO CỤ TRÊN TƯỜNG =====================
  def('window', {
    layer: 'wall',
    draw(g, p, env) {
      const f = g.frame(p.X, 0, p.h === undefined ? 0.9 : p.h);
      const w = p.w || 1.1, hh = p.hh || 1.1, t = env.t, fl = env.flash;
      const frame = p.frame || '#2b2422';
      const rand = seedOf(p);
      f.r(-0.07, -0.07, w + 0.14, hh + 0.14, shade(frame, 0.75));
      const steps = 8;
      for (let i = 0; i < steps; i++) {
        const c = fl > 0.2 ? mix(p.skyLow || '#1a2234', '#dfe7f5', fl) : mix(p.skyLow || '#1a2234', p.skyHigh || '#0b0f1c', i / steps);
        f.r(0, hh * i / steps, w, hh / steps + 0.01, c, '#8a8a8a');
      }
      const view = p.view || 'city';
      if (view === 'city' || view === 'alley') {
        let bx = -0.05;
        while (bx < w) {
          const bw = 0.12 + rand() * 0.18, bh = hh * (0.25 + rand() * 0.5);
          const col = view === 'alley' ? '#0d0f14' : mix('#0b0e16', '#1a1f2c', rand());
          f.r(Math.max(0, bx), 0, Math.min(bw, w - Math.max(0, bx)), bh, col, '#3a3a3a');
          for (let wy = 0.06; wy < bh - 0.06; wy += 0.09) for (let wx = bx + 0.03; wx < bx + bw - 0.03 && wx < w - 0.02; wx += 0.06) {
            if (wx > 0 && rand() < 0.28) f.e(wx, wy, 0.025, 0.035, rand() < 0.8 ? '#e9c27a' : '#9cc3d8');
          }
          bx += bw + 0.01;
        }
        if (p.neon) {
          const on = Math.sin(t * 3.1) > -0.7 || Math.sin(t * 17) > 0;
          f.r(w * 0.62, hh * 0.55, 0.16, 0.05, on ? p.neon : shade(p.neon, 0.35), on);
        }
      } else if (view === 'train') {
        const sp = p.speed || 0.35;
        for (let x = 0; x < w; x += 0.02) {
          const wx = x + t * sp * 0.25;
          const hill = hh * (0.28 + 0.1 * Math.sin(wx * 2.1) + 0.05 * Math.sin(wx * 5.3));
          f.r(x, 0, 0.021, hill, '#0c1119', '#333');
          const near = hh * (0.12 + 0.05 * Math.sin((x + t * sp) * 6.7));
          f.r(x, 0, 0.021, near, '#06080c', '#222');
        }
        for (let i = 0; i < 6; i++) {
          const lx = ((i * 0.37 + t * sp * 0.25) % (w + 0.4)) - 0.2;
          const lx2 = w - lx;
          if (lx2 > 0 && lx2 < w) f.e(lx2, hh * 0.22 + (i % 3) * 0.03, 0.02, 0.02, '#f0c873');
        }
        const pole = w - ((t * sp * 2.4) % (w + 1.2)) + 0.6;
        if (pole > 0 && pole < w) { f.r(pole, 0, 0.03, hh, '#05060a', '#111'); f.r(pole - 0.1, hh * 0.85, 0.23, 0.015, '#05060a', '#111'); }
        f.e(w * 0.78, hh * 0.82, 0.03, 0.03, '#e6e3d4'); // trăng
      }
      if (p.rain !== false) {
        const r2 = rng(hashStr('rain' + p.X));
        for (let i = 0; i < 26; i++) {
          const sx = r2() * w, sy = r2() * hh, sp = 1.4 + r2();
          const x = (sx + t * 0.25 * (view === 'train' ? -3 : 1)) % w, y = hh - ((sy + t * sp) % hh);
          const xx = x < 0 ? x + w : x;
          f.line(xx, y, Math.max(0, xx - 0.03), Math.max(0, y - 0.09), 'rgba(160,190,215,.55)', '#666');
        }
        for (let i = 0; i < 18; i++) f.p(r2() * w, r2() * hh, '#7e95ab', '#555');
      }
      // Song cửa & bậu
      f.r(w / 2 - 0.02, 0, 0.04, hh, frame);
      f.r(0, hh * 0.56, w, 0.035, frame);
      f.r(-0.11, -0.1, w + 0.22, 0.06, shade(frame, 1.35));
      f.r(-0.07, hh + 0.03, w + 0.14, 0.04, shade(frame, 1.2));
      if (p.curtain) {
        const c = p.curtain;
        f.r(-0.3, hh + 0.18, w + 0.6, 0.03, '#5a4a3a');
        for (const side of [-1, 1]) {
          const x0 = side < 0 ? -0.28 : w - 0.04;
          for (let i = 0; i < 5; i++) f.r(x0 + i * 0.065, -0.2, 0.066, hh + 0.38, i % 2 ? shade(c, 0.78) : c);
          f.r(x0, -0.22, 0.32, 0.03, shade(c, 0.6));
        }
      }
      if (p.blinds) for (let y = 0.08; y < hh; y += 0.09) f.r(0, y, w, 0.025, 'rgba(30,26,24,.55)');
    }
  });

  def('painting', {
    layer: 'wall',
    draw(g, p) {
      const f = g.frame(p.X, 0, p.h || 1.3);
      const w = p.w || 0.6, hh = p.hh || 0.45, fr = p.frame || '#6e5634';
      f.r(-0.05, -0.05, w + 0.1, hh + 0.1, fr);
      f.r(-0.05, -0.05, w + 0.1, 0.02, shade(fr, 0.6));
      const art = p.art || 'landscape';
      if (art === 'landscape') {
        f.r(0, 0, w, hh, '#4a5f6e');
        f.r(0, hh * 0.55, w, hh * 0.45, '#6f7f86');
        f.poly([[0, hh * 0.35], [w * 0.35, hh * 0.75], [w * 0.6, hh * 0.4], [w * 0.85, hh * 0.65], [w, hh * 0.45], [w, hh * 0.3], [0, hh * 0.3]], '#2f3d36');
        f.r(0, 0, w, hh * 0.3, '#33505a');
        f.r(w * 0.7, hh * 0.78, 0.06, 0.06, '#d8c99a');
      } else if (art === 'portrait') {
        f.r(0, 0, w, hh, '#2b2322');
        f.r(w * 0.3, hh * 0.1, w * 0.4, hh * 0.35, '#3d3a46');
        f.r(w * 0.36, hh * 0.45, w * 0.28, hh * 0.35, '#b08f74');
        f.r(w * 0.36, hh * 0.72, w * 0.28, hh * 0.1, '#2a2120');
      } else {
        f.r(0, 0, w, hh, '#3d3646');
        f.r(w * 0.1, hh * 0.2, w * 0.35, hh * 0.5, '#7a3d3a');
        f.r(w * 0.5, hh * 0.45, w * 0.4, hh * 0.35, '#c6a061');
      }
      if (p.tilt) f.r(w - 0.04, -0.09, 0.04, 0.05, 'rgba(0,0,0,.4)');
    }
  });

  function clockFace(g, cx, cy, R, time, col, rim) {
    circ(g, cx, cy, R + 1, rim || '#2c241e');
    circ(g, cx, cy, R, col || '#e3dcc6');
    for (let i = 0; i < 12; i++) {
      const a = i / 12 * Math.PI * 2;
      if (R > 4 || i % 3 === 0) g.px(cx + Math.sin(a) * (R - 1), cy - Math.cos(a) * (R - 1), '#3a302a');
    }
    const [hh, mm] = (time || '03:47').split(':').map(Number);
    const am = mm / 60 * Math.PI * 2, ah = ((hh % 12) + mm / 60) / 12 * Math.PI * 2;
    g.line(cx, cy, cx + Math.sin(am) * (R - 1), cy - Math.cos(am) * (R - 1), '#1b1512');
    g.line(cx, cy, cx + Math.sin(ah) * (R * 0.55), cy - Math.cos(ah) * (R * 0.55), '#1b1512');
    g.px(cx, cy, '#8a2b24');
  }
  def('clock', {
    layer: 'wall',
    draw(g, p, env) {
      const f = g.frame(p.X, 0, p.h || 1.8);
      const r = p.r || 0.16, col = p.color || '#5a3b26';
      const style = p.style || 'round';
      const c = f.at(0, 0);
      const R = r * f.s;
      if (style === 'pendulum') {
        f.r(-r - 0.04, -0.75, r * 2 + 0.08, 0.75 + r * 2 + 0.06, col);
        f.r(-r, -0.7, r * 2, 0.6, '#16110e');
        const ang = p.stopped ? 0 : Math.sin(env.t * 3.1) * 0.25;
        const top = f.at(0, -0.12), len = 0.45 * f.s;
        g.line(top.x, top.y, top.x + Math.sin(ang) * len, top.y + Math.cos(ang) * len, '#a7864a');
        circ(g, top.x + Math.sin(ang) * len, top.y + Math.cos(ang) * len, Math.max(1, 0.05 * f.s), '#d2a95a');
        clockFace(g, c.x, c.y - R - 0.04 * f.s, R, p.time, '#e8e0c8', shade(col, 0.6));
      } else if (style === 'square') {
        f.r(-r - 0.03, -0.03, r * 2 + 0.06, r * 2 + 0.06, col);
        clockFace(g, c.x, c.y - R, R * 0.85, p.time, '#ddd3bb', shade(col, 0.7));
      } else if (style === 'cuckoo') {
        f.poly([[-r - 0.06, r * 2], [0, r * 2 + 0.16], [r + 0.06, r * 2]], shade(col, 0.8));
        f.r(-r - 0.03, -0.05, r * 2 + 0.06, r * 2 + 0.05, col);
        clockFace(g, c.x, c.y - R, R * 0.8, p.time, '#e8dfc8', shade(col, 0.6));
        f.r(-0.02, -0.25, 0.01, 0.2, '#5a4a32'); f.r(0.02, -0.3, 0.01, 0.25, '#5a4a32');
      } else {
        clockFace(g, c.x, c.y - R, R, p.time, p.face || '#e3dcc6', col);
      }
    }
  });

  def('text', {
    layer: 'wall',
    draw(g, p) {
      const f = g.frame(p.X, 0, p.h || 1.5);
      const size = p.size || 1;
      g.text(f.x, f.y, p.text, p.color || '#8a2a28', size, p.emit);
      if (p.paintOver) {
        // Lớp sơn che phủ không kín: ô vuông xen kẽ
        const S = g.S, w = g.textWidth(p.text, size) + 4 * S, h = (5 * size + 4) * S;
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if ((x + y) % 3 === 0) g.px(f.x - 2 * S + x, f.y - 2 * S + y, p.paintOver);
      }
    }
  });

  def('door', {
    layer: 'wall',
    draw(g, p) {
      const f = g.frame(p.X, 0, 0);
      const w = p.w || 0.9, hh = p.hh || 2.05, col = p.color || '#4b2f26';
      f.r(-0.08, 0, w + 0.16, hh + 0.08, shade(col, 0.6));
      if (p.open) {
        f.r(0, 0, w, hh, '#07080b');
        f.poly([[0, 0], [w * 0.28, -0.08], [w * 0.28, hh + 0.05], [0, hh]], shade(col, 0.8));
      } else {
        f.r(0, 0, w, hh, col);
        f.r(w - 0.05, 0, 0.05, hh, shade(col, 0.7));
        const pw = (w - 0.24) / 2;
        for (const [px, py, ph] of [[0.08, 0.12, 0.8], [0.16 + pw, 0.12, 0.8], [0.08, 1.05, 0.85], [0.16 + pw, 1.05, 0.85]]) {
          f.r(px, py, pw, ph, shade(col, 0.82));
          f.r(px, py + ph - 0.03, pw, 0.03, shade(col, 0.62));
          f.r(px, py, 0.02, ph, shade(col, 1.12));
        }
        f.r(w - 0.16, 0.95, 0.06, 0.06, '#c9a25a');
        f.r(w - 0.15, 1.08, 0.04, 0.05, '#9a7c45');
        if (p.chain) f.line(w - 0.12, 1.35, w - 0.03, 1.2, ['#bfb39a', '#7a705f']);
      }
      if (p.number) {
        const tp = f.at(w / 2, hh - 0.25);
        const tw = g.textWidth(p.number);
        g.rect(tp.x - tw / 2 - 2 * g.S, tp.y - g.S, tw + 4 * g.S, 7 * g.S, '#c4a768');
        g.text(tp.x - tw / 2, tp.y, p.number, '#2a2118');
      }
      if (p.gap) f.e(0.02, 0, w - 0.04, 0.02, p.gap);
      if (p.sign) { const tp = f.at(w / 2, hh + 0.2); const tw = g.textWidth(p.sign); g.rect(tp.x - tw / 2 - 2 * g.S, tp.y - g.S, tw + 4 * g.S, 7 * g.S, '#1d4a2e', true); g.text(tp.x - tw / 2, tp.y, p.sign, '#b8f0c4', 1, true); }
    }
  });

  def('shelf', {
    layer: 'wall',
    draw(g, p) {
      const f = g.frame(p.X, 0, p.h || 1.4);
      const w = p.w || 1, col = p.color || '#5a3d2a';
      const rand = seedOf(p);
      let x = 0.04;
      while (x < w - 0.06) {
        const kind = p.items || 'mixed';
        const pick = kind === 'mixed' ? ['book', 'bottle', 'box'][Math.floor(rand() * 3)] : kind.replace(/s$/, '');
        if (pick === 'book') {
          const bw = 0.04 + rand() * 0.03, bh = 0.18 + rand() * 0.1;
          f.r(x, 0.04, bw, bh, ['#6a2f2a', '#2d4a5a', '#4c5a33', '#8a6a3a', '#3a3046'][Math.floor(rand() * 5)]);
          x += bw + 0.005;
        } else if (pick === 'bottle') {
          const c = ['#2e5a3a', '#6a3a22', '#7f8f96', '#a07a3c'][Math.floor(rand() * 4)];
          f.r(x, 0.04, 0.06, 0.16, c); f.r(x + 0.02, 0.2, 0.02, 0.06, c); f.r(x + 0.01, 0.08, 0.015, 0.08, shade(c, 1.5));
          x += 0.09;
        } else if (pick === 'clock') {
          const c = f.at(x + 0.08, 0.12);
          clockFace(g, c.x, c.y, Math.max(2, 0.07 * f.s), p.time || '03:47', '#e2d8c0', ['#6a4a2a', '#2c2c30', '#a68a4a'][Math.floor(rand() * 3)]);
          x += 0.18;
        } else {
          const bw = 0.12 + rand() * 0.1;
          f.r(x, 0.04, bw, 0.1 + rand() * 0.08, ['#7a6a52', '#5d4f3e', '#8c7d62'][Math.floor(rand() * 3)]);
          x += bw + 0.02;
        }
      }
      f.r(0, 0, w, 0.04, col);
      f.r(0, -0.01, w, 0.012, shade(col, 0.5));
      f.r(0.08, -0.12, 0.03, 0.12, shade(col, 0.7)); f.r(w - 0.11, -0.12, 0.03, 0.12, shade(col, 0.7));
    }
  });

  def('sconce', {
    layer: 'wall',
    draw(g, p) {
      const f = g.frame(p.X, 0, p.h || 1.75);
      f.r(-0.03, -0.1, 0.06, 0.12, '#6f5a36');
      f.r(-0.06, 0, 0.12, 0.04, '#8a7044');
      f.e(-0.035, 0.04, 0.07, 0.09, p.color || '#ffe1a0');
      f.poly([[-0.1, 0.06], [0.1, 0.06], [0.07, 0.2], [-0.07, 0.2]], p.shade || '#d9b57a', '#999');
    }
  });

  def('board', {
    layer: 'wall',
    draw(g, p) {
      const f = g.frame(p.X, 0, p.h || 1.1);
      const w = p.w || 1.2, hh = p.hh || 0.8, rand = seedOf(p);
      f.r(-0.04, -0.04, w + 0.08, hh + 0.08, '#4a3624');
      f.r(0, 0, w, hh, p.color || '#9a7448');
      const pins = [];
      for (let i = 0; i < (p.n || 9); i++) {
        const pw = 0.12 + rand() * 0.1, ph = 0.1 + rand() * 0.1;
        const px = rand() * (w - pw), py = rand() * (hh - ph);
        const photo = rand() < 0.3;
        f.r(px, py, pw, ph, photo ? '#3c3a3e' : mix('#e6dfcc', '#cbbf9e', rand()));
        if (photo) f.r(px + 0.02, py + 0.02, pw - 0.04, ph - 0.04, '#77706a');
        else for (let ly = py + ph - 0.03; ly > py + 0.02; ly -= 0.025) f.r(px + 0.015, ly, pw * (0.5 + rand() * 0.4), 0.008, '#8a8070');
        pins.push([px + pw / 2, py + ph - 0.01]);
        f.p(px + pw / 2, py + ph - 0.01, '#c4302b');
      }
      if (p.strings) for (let i = 0; i + 1 < pins.length; i += 2) f.line(pins[i][0], pins[i][1], pins[i + 1][0], pins[i + 1][1], '#b0302a');
    }
  });

  def('poster', {
    layer: 'wall',
    draw(g, p) {
      const f = g.frame(p.X, 0, p.h || 1.2);
      const w = p.w || 0.45, hh = p.hh || 0.62, c = p.color || '#8a3a2e';
      f.r(0, 0, w, hh, '#d8cfb8');
      f.r(0.03, hh * 0.35, w - 0.06, hh * 0.6, c);
      f.r(0.06, hh * 0.45, w * 0.4, hh * 0.4, shade(c, 1.4));
      for (let y = 0.04; y < hh * 0.3; y += 0.04) f.r(0.04, y, w - 0.08, 0.015, '#4a4038');
      if (p.torn) f.poly([[w - 0.12, 0], [w, 0], [w, 0.14]], '#3a3a3a');
    }
  });

  def('neon', {
    layer: 'wall',
    draw(g, p, env) {
      const f = g.frame(p.X, 0, p.h || 2);
      const w = p.w || 0.8, hh = p.hh || 0.2, c = p.color || '#e0485a';
      const on = !p.flicker || Math.sin(env.t * 2.3) > -0.85 || Math.sin(env.t * 23) > 0.2;
      const col = on ? c : shade(c, 0.3);
      f.r(0, 0, w, 0.025, col, on); f.r(0, hh - 0.025, w, 0.025, col, on);
      f.r(0, 0, 0.025, hh, col, on); f.r(w - 0.025, 0, 0.025, hh, col, on);
      if (p.shape === 'wave') for (let x = 0.08; x < w - 0.08; x += 0.04) f.r(x, hh / 2 + Math.sin(x * 20) * hh * 0.2, 0.04, 0.025, col, on);
    }
  });

  def('balcony', {
    layer: 'wall',
    draw(g, p) {
      const f = g.frame(p.X, 0, p.h || 2.6);
      const w = p.w || 2, col = p.color || '#b08a46';
      f.r(-0.05, -0.12, w + 0.1, 0.12, shade(p.base || '#3a1e26', 0.8));
      f.r(0, 0, w, 0.04, col);
      f.r(0, 0.42, w, 0.05, col);
      for (let x = 0.05; x < w; x += 0.12) f.r(x, 0.04, 0.025, 0.38, shade(col, 0.85));
      f.r(0, -0.2, w, 0.08, shade(p.base || '#3a1e26', 0.6));
    }
  });

  // ===================== ĐÈN TRẦN (vẽ sau cùng) =====================
  def('pendant', {
    layer: 'ceiling',
    draw(g, p, env) {
      const f = g.frame(p.X, p.z, p.h || 2.2);
      const c = p.color || '#ffd9a0';
      f.r(-0.008, 0.15, 0.016, 4, '#141418');
      if (p.bare) { f.e(-0.04, -0.05, 0.08, 0.1, c); f.r(-0.03, 0.05, 0.06, 0.04, '#6a6050'); return; }
      f.poly([[-0.22, 0], [0.22, 0], [0.08, 0.16], [-0.08, 0.16]], p.shade || '#2f4a3a');
      f.r(-0.22, 0, 0.44, 0.015, shade(p.shade || '#2f4a3a', 1.4));
      f.e(-0.05, -0.04, 0.1, 0.05, c);
    }
  });

  def('chandelier', {
    layer: 'ceiling',
    draw(g, p, env) {
      const f = g.frame(p.X, p.z, p.h || 3);
      const w = p.w || 1.1, gold = '#c9a053';
      f.r(-0.01, 0.4, 0.02, 3, '#6a5634');
      f.r(-w / 2, 0.15, w, 0.04, gold);
      f.r(-w * 0.32, 0.38, w * 0.64, 0.035, gold);
      f.r(-0.06, 0.05, 0.12, 0.4, shade(gold, 0.8));
      for (let i = 0; i <= 6; i++) {
        const x = -w / 2 + w * i / 6;
        f.r(x - 0.012, 0.19, 0.024, 0.08, '#e9e2cf');
        f.e(x - 0.02, 0.27, 0.04, 0.05, '#ffe2a2');
        const tw = Math.sin(env.t * 3 + i * 1.7) > 0.6;
        f.p(x, 0.05, tw ? '#ffffff' : '#bcd3e0', tw);
      }
      for (let i = 0; i <= 4; i++) {
        const x = -w * 0.32 + w * 0.64 * i / 4;
        f.e(x - 0.018, 0.42, 0.036, 0.045, '#ffe7b2');
      }
    }
  });

  def('fan', {
    layer: 'ceiling',
    draw(g, p, env) {
      const h = p.h || 2.5, a0 = env.t * (p.speed === undefined ? 4 : p.speed);
      const f = g.frame(p.X, p.z, h);
      f.r(-0.012, 0.08, 0.024, 3, '#1c1b1f');
      for (let i = 0; i < 3; i++) {
        const a = a0 + i * Math.PI * 2 / 3;
        const cx = Math.cos(a), cz = Math.sin(a), px = -cz, pz = cx;
        const L = 0.62, Wb = 0.07;
        const pts = [[0.1, -Wb], [L, -Wb * 1.5], [L, Wb * 1.5], [0.1, Wb]].map(([l, s]) => g.geo.at(p.X + cx * l + px * s, p.z + cz * l + pz * s, h));
        g.poly(pts, p.color || '#4d3a2c');
      }
      f.r(-0.08, -0.04, 0.16, 0.1, '#2a282c');
    }
  });

  def('tube', {
    layer: 'ceiling',
    draw(g, p, env) {
      const f = g.frame(p.X, p.z, p.h || 2.6);
      const w = p.w || 1.2;
      f.r(-w / 2 - 0.04, 0, w + 0.08, 0.06, '#5d6064');
      const on = !p.flicker || Math.sin(env.t * 1.3) < 0.93 || Math.sin(env.t * 41) > 0;
      f.r(-w / 2, -0.03, w, 0.035, on ? '#eef6f0' : '#7d8582', on);
    }
  });

  // ===================== ĐỒ ĐẠC TRÊN SÀN =====================
  def('bed', {
    depth: p => p.d || 2,
    draw(g, p) {
      const w = p.w || 1.4, d = p.d || 2, fr = p.frame || '#3b2a26';
      g.box(p.X, p.z - 0.06, w, 0.07, 1.0, { color: fr });
      g.box(p.X, p.z, w, d, 0.32, { color: fr });
      g.box(p.X + 0.03, p.z + 0.03, w - 0.06, d - 0.06, 0.15, { e: 0.32, color: p.sheet || '#cbc2b1' });
      g.box(p.X + 0.15, p.z + 0.1, w - 0.3, 0.38, 0.1, { e: 0.47, color: '#e0d9cb', noShadow: true });
      const bc = p.color || '#5b3f4b';
      g.box(p.X + 0.01, p.z + 0.72, w - 0.02, d - 0.74, 0.05, { e: 0.44, color: bc, noShadow: true });
      const ff = g.frame(p.X + 0.01, p.z + d + 0.02, 0.17);
      ff.r(0, 0, w - 0.02, 0.32, shade(bc, 0.78));
      for (let x = 0.12; x < w - 0.1; x += 0.27) ff.r(x, 0, 0.03, 0.32, shade(bc, 0.62));
      if (p.messy) {
        g.plane(p.X + 0.2, p.z + 0.95, w * 0.5, 0.05, 0.495, shade(bc, 0.7));
        g.plane(p.X + 0.5, p.z + 1.3, w * 0.35, 0.05, 0.495, shade(bc, 0.7));
      }
    }
  }, p => [p.X, p.z - 0.06, p.w || 1.4, (p.d || 2) + 0.08]);

  def('desk', {
    depth: p => p.d || 0.6,
    draw(g, p) {
      const w = p.w || 1.2, d = p.d || 0.6, h = p.h || 0.76, col = p.color || '#4e3426';
      g.shadow(p.X + w / 2, p.z + d / 2, w * 0.6, d * 0.7, 0.35);
      g.box(p.X + 0.02, p.z + 0.02, 0.05, d - 0.04, h - 0.04, { color: shade(col, 0.8), noShadow: true });
      const dr = g.box(p.X + w - 0.46, p.z + 0.02, 0.44, d - 0.04, h - 0.04, { color: col, noShadow: true });
      for (let i = 0; i < 3; i++) {
        const y = 0.06 + i * (h - 0.12) / 3;
        dr.r(0.03, y, 0.38, (h - 0.12) / 3 - 0.03, shade(col, 0.95));
        dr.r(0.18, y + 0.08, 0.08, 0.025, '#b39256');
      }
      if (p.drawerOpen) g.box(p.X + w - 0.43, p.z + d - 0.05, 0.38, 0.3, 0.14, { e: h - 0.3, color: shade(col, 1.05), noShadow: true });
      const tf = g.box(p.X, p.z, w, d, 0.05, { e: h - 0.05, color: shade(col, 1.1), noShadow: true });
      tf.r(0, 0, w, 0.012, shade(col, 0.55));
    }
  }, p => [p.X, p.z, p.w || 1.2, p.d || 0.6]);

  def('table', { // bàn chữ nhật đơn giản (bàn thẩm vấn, bàn ăn)
    depth: p => p.d || 0.8,
    draw(g, p) {
      const w = p.w || 1.4, d = p.d || 0.8, h = p.h || 0.75, col = p.color || '#5a4a3e';
      g.shadow(p.X + w / 2, p.z + d / 2, w * 0.6, d * 0.65, 0.35);
      for (const [lx, lz] of [[0.04, 0.04], [w - 0.09, 0.04], [0.04, d - 0.09], [w - 0.09, d - 0.09]]) g.box(p.X + lx, p.z + lz, 0.05, 0.05, h - 0.04, { color: shade(col, 0.6), noShadow: true, edge: false });
      g.box(p.X, p.z, w, d, 0.04, { e: h - 0.04, color: col, noShadow: true });
      if (p.cloth) {
        g.box(p.X - 0.03, p.z - 0.03, w + 0.06, d + 0.06, 0.02, { e: h, color: p.cloth, noShadow: true });
        const ff = g.frame(p.X - 0.03, p.z + d + 0.03, h - 0.25);
        ff.r(0, 0, w + 0.06, 0.27, shade(p.cloth, 0.85));
      }
    }
  }, p => [p.X, p.z, p.w || 1.4, p.d || 0.8]);

  def('roundtable', {
    depth: p => p.r || 0.6,
    draw(g, p, env) {
      const r = p.r || 0.6, h = p.h || 0.76, cloth = p.cloth || '#ddd5c4';
      g.shadow(p.X, p.z, r * 1.05, r * 1.05, 0.38);
      cylinder(g, p.X, p.z, r, h, cloth, { folds: 3, top: shade(cloth, 1.08) });
      const rand = seedOf(p);
      for (let i = 0; i < (p.seats || 5); i++) {
        const a = i / (p.seats || 5) * Math.PI * 2 + 0.3;
        const px = p.X + Math.cos(a) * r * 0.68, pz = p.z + Math.sin(a) * r * 0.68;
        g.disc(px, pz, 0.11, h + 0.005, '#f2eee6');
        g.disc(px, pz, 0.06, h + 0.008, rand() < 0.5 ? '#c6a06a' : '#9a4a3a');
      }
      if (p.candle !== false) {
        const f = g.frame(p.X, p.z, h);
        f.r(-0.02, 0, 0.04, 0.18, '#efe9d6');
        f.e(-0.015, 0.18, 0.03, 0.04 + Math.sin(env.t * 9) * 0.01, '#ffcf6e');
      }
      if (p.vase) { const f = g.frame(p.X + 0.15, p.z - 0.1, h); f.r(-0.04, 0, 0.08, 0.15, '#4a6a7a'); f.r(-0.08, 0.15, 0.16, 0.08, '#a8344a'); f.r(-0.05, 0.2, 0.1, 0.06, '#d9a2b2'); }
    }
  }, p => [p.X - (p.r || 0.6), p.z - (p.r || 0.6), (p.r || 0.6) * 2, (p.r || 0.6) * 2]);

  def('chair', {
    depth: () => 0.45,
    draw(g, p) {
      const col = p.color || '#4a3530', X = p.X, z = p.z;
      if (p.fallen) {
        g.shadow(X + 0.22, z + 0.1, 0.4, 0.35, 0.3);
        g.box(X, z - 0.55, 0.44, 0.52, 0.04, { color: shade(col, 0.9), noShadow: true });
        g.box(X, z - 0.05, 0.44, 0.06, 0.45, { color: col, noShadow: true });
        for (const lx of [0.02, 0.37]) {
          g.box(X + lx, z, 0.05, 0.42, 0.05, { e: 0.04, color: shade(col, 0.7), noShadow: true });
          g.box(X + lx, z, 0.05, 0.42, 0.05, { e: 0.38, color: shade(col, 0.7), noShadow: true });
        }
        return;
      }
      g.shadow(X + 0.22, z + 0.22, 0.3, 0.28, 0.3);
      const back = p.facing === 'back';
      for (const [lx, lz] of [[0.02, 0.02], [0.37, 0.02], [0.02, 0.37], [0.37, 0.37]]) g.box(X + lx, z + lz, 0.05, 0.05, 0.42, { color: shade(col, 0.65), noShadow: true, edge: false });
      if (!back) g.box(X, z - 0.02, 0.44, 0.05, 0.5, { e: 0.42, color: col, noShadow: true });
      g.box(X, z, 0.44, 0.44, 0.05, { e: 0.42, color: p.seat || shade(col, 1.1), noShadow: true });
      if (back) g.box(X, z + 0.41, 0.44, 0.05, 0.5, { e: 0.42, color: col, noShadow: true });
    }
  }, p => p.fallen ? [p.X, p.z - 0.5, 0.44, 0.9] : [p.X, p.z, 0.44, 0.44]);

  def('wardrobe', {
    depth: p => p.d || 0.55,
    draw(g, p) {
      const w = p.w || 1, d = p.d || 0.55, h = p.h || 1.95, col = p.color || '#3e2e2a';
      const f = g.box(p.X, p.z, w, d, h, { color: col });
      f.r(w / 2 - 0.01, 0.08, 0.02, h - 0.16, shade(col, 0.55));
      for (const x of [0.06, w / 2 + 0.05]) { f.r(x, 0.12, w / 2 - 0.11, h * 0.42, shade(col, 0.78)); f.r(x, h * 0.6, w / 2 - 0.11, h * 0.32, shade(col, 0.78)); }
      f.r(w / 2 - 0.07, h * 0.5, 0.03, 0.08, '#b89656'); f.r(w / 2 + 0.04, h * 0.5, 0.03, 0.08, '#b89656');
      g.box(p.X - 0.03, p.z - 0.02, w + 0.06, d + 0.04, 0.06, { e: h, color: shade(col, 1.1), noShadow: true });
      if (p.ajar) f.r(w / 2 + 0.01, 0.08, 0.05, h - 0.16, '#0b0b0d');
    }
  }, fp);

  def('tv', {
    depth: () => 0.45,
    draw(g, p, env) {
      const col = p.stand || '#3f2c24';
      const sf = g.box(p.X, p.z, 0.75, 0.45, 0.5, { color: col });
      sf.r(0.05, 0.06, 0.3, 0.32, shade(col, 0.75)); sf.r(0.4, 0.06, 0.3, 0.32, shade(col, 0.75));
      const f = g.box(p.X + 0.1, p.z + 0.04, 0.55, 0.38, 0.46, { e: 0.5, color: p.color || '#2a2a2e', noShadow: true });
      const sx0 = f.at(0.05, 0.42), sx1 = f.at(0.42, 0.07);
      const rand = rng(Math.floor(env.t * 12));
      for (let y = Math.round(sx0.y); y < Math.round(sx1.y); y++) for (let x = Math.round(sx0.x); x < Math.round(sx1.x); x++) {
        if (p.on === false) { g.px(x, y, '#1d2126'); continue; }
        const v = 90 + rand() * 120 * ((y & 1) ? 0.75 : 1);
        g.px(x, y, `rgb(${v * 0.85 | 0},${v | 0},${v * 1.05 | 0})`, true);
      }
      f.r(0.45, 0.15, 0.05, 0.05, '#7a6a5a'); f.r(0.45, 0.25, 0.05, 0.05, '#7a6a5a');
      const top = f.at(0.27, 0.46);
      g.line(top.x, top.y, top.x - 6 * g.S, top.y - 9 * g.S, '#77787c'); g.line(top.x, top.y, top.x + 5 * g.S, top.y - 10 * g.S, '#77787c');
    }
  }, p => [p.X, p.z, 0.75, 0.45]);

  def('lamp', {
    depth: () => 0.1,
    draw(g, p) {
      const f = g.frame(p.X, p.z, p.e || 0);
      const c = p.color || '#2f4a3a';
      f.r(-0.08, 0, 0.16, 0.03, '#2a2622');
      f.r(-0.012, 0.03, 0.024, 0.28, '#8c7a52');
      f.poly([[-0.13, 0.28], [0.13, 0.28], [0.06, 0.43], [-0.06, 0.43]], c);
      f.r(-0.13, 0.28, 0.26, 0.015, shade(c, 1.5));
      if (p.on !== false) f.e(-0.09, 0.265, 0.18, 0.02, '#ffe4a8');
    }
  });

  def('phone', {
    depth: () => 0.16,
    draw(g, p) {
      const e = p.e || 0, c = p.color || '#1e1c1e';
      const f = g.box(p.X - 0.1, p.z, 0.2, 0.16, 0.07, { e, color: c, noShadow: true });
      if (p.offhook) {
        g.box(p.X + 0.12, p.z + 0.04, 0.2, 0.06, 0.035, { e, color: shade(c, 1.4), noShadow: true });
        g.line(f.at(0.18, 0.04).x, f.at(0.18, 0.04).y, g.geo.at(p.X + 0.2, p.z + 0.07, e).x, g.geo.at(p.X + 0.2, p.z + 0.07, e).y, '#111');
      } else g.box(p.X - 0.11, p.z + 0.03, 0.22, 0.05, 0.035, { e: e + 0.07, color: shade(c, 1.4), noShadow: true });
      f.r(0.07, 0.015, 0.06, 0.04, '#c9bfa8');
    }
  });

  def('radio', {
    depth: () => 0.12,
    draw(g, p, env) {
      const e = p.e || 0, c = p.color || '#5a3b2a';
      const f = g.box(p.X - 0.15, p.z, 0.3, 0.12, 0.18, { e, color: c, noShadow: true });
      for (let y = 0.03; y < 0.15; y += 0.025) f.r(0.02, y, 0.13, 0.012, shade(c, 0.6));
      f.e(0.17, 0.08, 0.1, 0.04, p.on ? '#f0a54a' : '#7a5a3a');
      if (p.on) f.e(0.17 + (Math.sin(env.t * 0.5) * 0.5 + 0.5) * 0.08, 0.07, 0.01, 0.06, '#ff4a2a');
      f.r(0.2, 0.025, 0.035, 0.035, '#c6b48a');
      const a = f.at(0.27, 0.18);
      g.line(a.x, a.y, a.x + 7 * g.S, a.y - 5 * g.S, '#9a9a9e');
    }
  });

  def('papers', {
    layer: 'decal',
    draw(g, p) {
      const rand = seedOf(p), e = p.e || 0.002;
      for (let i = 0; i < (p.n || 3); i++) {
        const x = p.X + (rand() - 0.5) * (p.spread || 0.4), z = p.z + (rand() - 0.5) * (p.spread || 0.4) * 0.6;
        const big = rand() < 0.5;
        g.plane(x, z, big ? 0.21 : 0.15, big ? 0.15 : 0.2, e, i === 0 && p.color ? p.color : mix('#e7e1d1', '#cfc6ae', rand()));
        if (p.lines !== false) g.plane(x + 0.03, z + 0.04, 0.1, 0.01, e + 0.001, '#8c8576');
      }
    }
  });
  // Đồ nhỏ đặt trên mặt bàn cần nằm trên lớp mặt bàn, nên không dùng lớp decal
  def('sheet', {
    depth: () => 0.15,
    draw(g, p) {
      g.plane(p.X, p.z, p.w || 0.2, p.d || 0.14, p.e || 0.77, p.color || '#e8e1cf');
      if (p.torn) g.plane(p.X + (p.w || 0.2) + 0.03, p.z + 0.02, (p.w || 0.2) * 0.6, (p.d || 0.14) * 0.9, p.e || 0.77, mix(p.color || '#e8e1cf', '#bbb19a', 0.4));
      if (p.ink) g.plane(p.X + 0.04, p.z + 0.04, 0.08, 0.012, (p.e || 0.77) + 0.001, p.ink);
    }
  });

  def('rug', {
    layer: 'decal',
    draw(g, p) {
      const w = p.w || 2, d = p.d || 1.2, c = p.color || '#5a2a2a';
      g.plane(p.X, p.z, w, d, 0.004, p.trim || shade(c, 0.6));
      g.plane(p.X + 0.08, p.z + 0.08, w - 0.16, d - 0.16, 0.005, c);
      g.plane(p.X + 0.2, p.z + 0.2, w - 0.4, d - 0.4, 0.006, shade(c, 1.18));
      g.plane(p.X + 0.28, p.z + 0.28, w - 0.56, d - 0.56, 0.007, c);
    }
  });

  def('footprints', {
    layer: 'decal',
    draw(g, p) {
      const n = p.n || 4, c = p.color || 'rgba(40,28,20,.55)';
      for (let i = 0; i < n; i++) {
        const t = n === 1 ? 0 : i / (n - 1);
        const x = p.X + (p.X2 - p.X) * t + (i % 2 ? 0.08 : -0.08), z = p.z + (p.z2 - p.z) * t;
        g.plane(x, z, 0.09, 0.2, 0.004, c);
        g.plane(x + 0.01, z + 0.22, 0.07, 0.07, 0.004, c);
      }
    }
  });

  def('stain', {
    layer: 'decal',
    draw(g, p) {
      const rand = seedOf(p), c = p.color || 'rgba(70,12,14,.75)';
      for (let i = 0; i < (p.n || 5); i++) g.disc(p.X + (rand() - 0.5) * (p.w || 0.4), p.z + (rand() - 0.5) * (p.d || 0.25), 0.05 + rand() * 0.1, 0.003, c);
    }
  });

  def('glass', {
    layer: 'decal',
    draw(g, p, env) {
      const rand = seedOf(p);
      for (let i = 0; i < (p.n || 7); i++) {
        const x = p.X + (rand() - 0.5) * 0.5, z = p.z + (rand() - 0.5) * 0.3;
        g.plane(x, z, 0.03 + rand() * 0.05, 0.02 + rand() * 0.04, 0.004, 'rgba(200,225,235,.55)');
        if (Math.sin(env.t * 2 + i * 2.1) > 0.8) { const q = g.geo.at(x, z, 0); g.px(q.x, q.y, '#ffffff', true); }
      }
      if (p.stem) g.box(p.X - 0.02, p.z, 0.04, 0.04, 0.12, { color: '#b9d1db', noShadow: true });
    }
  });

  def('cup', {
    depth: () => 0.08,
    draw(g, p) {
      const e = p.e || 0, c = p.color || '#e4ddcf';
      if (p.wine) {
        const f = g.frame(p.X, p.z, e);
        f.r(-0.03, 0, 0.06, 0.01, '#c6dce4'); f.r(-0.006, 0.01, 0.012, 0.08, '#c6dce4');
        f.r(-0.04, 0.09, 0.08, 0.09, 'rgba(190,220,232,.65)'); f.r(-0.035, 0.09, 0.07, 0.04, p.liquid || '#6a1a26');
        return;
      }
      g.box(p.X - 0.04, p.z - 0.04, 0.08, 0.08, 0.09, { e, color: c, noShadow: true });
      if (p.liquid) g.plane(p.X - 0.03, p.z - 0.03, 0.06, 0.06, e + 0.085, p.liquid);
    }
  });

  def('bottle', {
    depth: () => 0.08,
    draw(g, p) {
      const f = g.frame(p.X, p.z, p.e || 0), c = p.color || '#2e5a3a';
      f.r(-0.04, 0, 0.08, 0.2, c); f.r(-0.015, 0.2, 0.03, 0.09, c); f.r(-0.025, 0.05, 0.015, 0.12, shade(c, 1.6));
      f.r(-0.035, 0.06, 0.07, 0.06, p.label || '#d8cfb4');
    }
  });

  def('ashtray', {
    depth: () => 0.1,
    draw(g, p) {
      const e = p.e || 0;
      g.disc(p.X, p.z, 0.09, e + 0.01, '#5d5e60');
      g.disc(p.X, p.z, 0.065, e + 0.015, '#2b2b2c');
      const rand = seedOf(p);
      for (let i = 0; i < (p.n || 3); i++) g.plane(p.X - 0.05 + rand() * 0.06, p.z - 0.03 + rand() * 0.05, 0.05, 0.015, e + 0.02, i === 0 && p.mark ? p.mark : '#e8e1d0');
    }
  });

  def('book', {
    depth: () => 0.2,
    draw(g, p) {
      const e = p.e || 0.77, c = p.color || '#4a2a22';
      g.plane(p.X - 0.02, p.z - 0.01, 0.44, 0.24, e, c);
      g.plane(p.X, p.z, 0.19, 0.22, e + 0.01, '#e6dec7');
      g.plane(p.X + 0.21, p.z, 0.19, 0.22, e + 0.01, '#ddd4bb');
      for (let i = 0; i < 4; i++) { g.plane(p.X + 0.02, p.z + 0.03 + i * 0.045, 0.14, 0.01, e + 0.011, '#7a7262'); g.plane(p.X + 0.23, p.z + 0.03 + i * 0.045, 0.12, 0.01, e + 0.011, '#7a7262'); }
      if (p.torn) g.plane(p.X + 0.36, p.z + 0.02, 0.04, 0.18, e + 0.012, '#bdb39a');
    }
  });

  def('bit', { // vật rất nhỏ: chìa khoá, kẹp tóc, đầu lọc...
    depth: () => 0.05,
    draw(g, p, env) {
      g.plane(p.X, p.z, p.w || 0.06, p.d || 0.03, p.e || 0.003, p.color || '#c9a24a');
      if (p.glint && Math.sin(env.t * 2.5 + p.X) > 0.7) { const q = g.geo.at(p.X, p.z, p.e || 0); g.px(q.x, q.y, '#fff8d8', true); }
    }
  });

  def('body', {
    depth: () => 0.5,
    draw(g, p) { P.drawLying(g, p.X, p.z, p.look, { dir: p.dir }); }
  });

  def('person', {
    depth: () => 0.02,
    draw(g, p, env) {
      const sway = p.idle !== false ? Math.sin(env.t * 1.3 + p.X * 3) : 0;
      P.drawPerson(g, p.X, p.z, p.look, { pose: p.pose, facing: p.facing || 'front', e: p.e, armsCrossed: p.armsCrossed, holding: p.holding, phase: sway, walk: false });
    }
  });

  def('stage', {
    depth: p => p.d || 1.6,
    draw(g, p, env) {
      const w = p.w || 4, d = p.d || 1.6, h = p.h || 0.55, cur = p.curtain || '#7a1a26';
      const back = g.frame(p.X, p.z, h);
      const ch = (p.ch || 2.6);
      for (let x = 0; x < w; x += 0.14) back.r(x, 0, 0.15, ch, Math.floor(x / 0.14) % 2 ? shade(cur, 0.72) : cur);
      back.r(-0.1, ch - 0.35, w + 0.2, 0.35, shade(cur, 0.85));
      for (let x = 0; x < w; x += 0.3) back.poly([[x, ch - 0.35], [x + 0.3, ch - 0.35], [x + 0.15, ch - 0.48]], shade(cur, 0.85));
      back.r(-0.1, ch - 0.06, w + 0.2, 0.06, '#c9a053');
      const f = g.box(p.X, p.z, w, d, h, { color: p.color || '#3a2620' });
      for (let x = 0.15; x < w; x += 0.35) f.e(x, h - 0.07, 0.05, 0.035, '#ffd98a');
      for (const side of [0, 1]) {
        const sf = g.frame(p.X + (side ? w - 0.45 : -0.05), p.z + d, h);
        for (let x = 0; x < 0.5; x += 0.1) sf.r(x, 0, 0.1, ch + 0.1, Math.floor(x / 0.1) % 2 ? shade(cur, 0.7) : shade(cur, 0.92));
      }
      if (p.label) { const tp = back.at(w / 2, ch - 0.22); const tw = g.textWidth(p.label); g.text(tp.x - tw / 2, tp.y - 2 * g.S, p.label, '#e6c27a', 1, true); }
    }
  }, p => [p.X, p.z, p.w || 4, p.d || 1.6]);

  def('piano', {
    depth: () => 0.85,
    draw(g, p) {
      const e = p.e || 0, c = p.color || '#141216';
      g.box(p.X, p.z, 1.45, 0.55, 1.15, { e, color: c, edgeColor: '#5a5560' });
      const k = g.box(p.X + 0.05, p.z + 0.55, 1.35, 0.25, 0.06, { e: e + 0.68, color: '#ece6da', noShadow: true });
      for (let x = 0.06; x < 1.3; x += 0.08) if (Math.floor(x / 0.08) % 7 !== 2 && Math.floor(x / 0.08) % 7 !== 6) g.plane(p.X + 0.05 + x, p.z + 0.55, 0.03, 0.13, e + 0.741, '#1a1a1e');
      const f = g.frame(p.X, p.z + 0.55, e);
      f.r(0.05, 0.72, 1.35, 0.25, shade(c, 1.4));
      f.r(0.4, 0.8, 0.4, 0.12, '#e6dfcc');
    }
  }, p => [p.X, p.z, 1.45, 0.8]);

  def('mic', {
    depth: () => 0.1,
    draw(g, p) {
      const f = g.frame(p.X, p.z, p.e || 0);
      f.r(-0.1, 0, 0.2, 0.02, '#2a2a2e');
      f.r(-0.01, 0.02, 0.02, 1.35, '#8a8a90');
      f.r(-0.03, 1.37, 0.06, 0.1, '#3a3a40'); f.r(-0.035, 1.42, 0.07, 0.05, '#a0a0a8');
      if (p.cable) f.line(0, 0.4, 0.4, 0.02, '#111');
    }
  });

  def('drum', {
    depth: () => 0.4,
    draw(g, p) {
      const e = p.e || 0;
      const f = g.frame(p.X, p.z, e);
      cylinder(g, p.X, p.z, 0.32, e + 0.5, p.color || '#7a1e2a', { top: '#e6e0d2' });
      f.r(-0.34, 0.02, 0.68, 0.03, '#b8b8c0');
      f.r(0.3, 0.5, 0.02, 0.4, '#a0a0a8'); f.r(0.16, 0.9, 0.3, 0.025, '#d6b45a');
    }
  });

  def('column', {
    depth: p => p.d || 0.5,
    draw(g, p) {
      const w = p.w || 0.5, d = p.d || 0.5, h = p.h || g.geo.wallH, c = p.color || '#b9ad94';
      g.box(p.X - 0.06, p.z - 0.06, w + 0.12, d + 0.12, 0.2, { color: shade(c, 0.85) });
      const f = g.box(p.X, p.z, w, d, h - 0.4, { e: 0.2, color: c, noShadow: true });
      for (let x = 0.08; x < w - 0.04; x += 0.1) f.r(x, 0.05, 0.02, h - 0.5, shade(c, 0.78));
      g.box(p.X - 0.08, p.z - 0.08, w + 0.16, d + 0.16, 0.2, { e: h - 0.2, color: shade(c, 1.05), noShadow: true });
    }
  }, p => [p.X, p.z, p.w || 0.5, p.d || 0.5]);

  def('buffet', {
    depth: p => p.d || 0.7,
    draw(g, p) {
      const w = p.w || 2, d = p.d || 0.7, cloth = p.cloth || '#e3dccd';
      const f = g.box(p.X, p.z, w, d, 0.82, { color: cloth });
      for (let x = 0.1; x < w; x += 0.2) f.r(x, 0, 0.03, 0.7, shade(cloth, 0.78));
      f.r(0, 0.68, w, 0.06, p.trim || '#8a2a34');
      const rand = seedOf(p);
      for (let x = 0.15; x < w - 0.2; x += 0.42) {
        g.box(p.X + x, p.z + 0.15, 0.32, 0.3, 0.04, { e: 0.82, color: '#b9bcc2', noShadow: true });
        g.plane(p.X + x + 0.06, p.z + 0.2, 0.2, 0.18, 0.865, ['#c27a3a', '#7a9a4a', '#d9c07a', '#a83a2a'][Math.floor(rand() * 4)]);
      }
    }
  }, p => [p.X, p.z, p.w || 2, p.d || 0.7]);

  def('plant', {
    depth: () => 0.35,
    draw(g, p) {
      g.box(p.X - 0.17, p.z - 0.17, 0.34, 0.34, 0.38, { color: p.pot || '#6a4a3a' });
      const f = g.frame(p.X, p.z + 0.17, 0.38);
      const rand = seedOf(p);
      for (let i = 0; i < 70; i++) {
        const a = rand() * Math.PI, r = rand();
        f.r(Math.cos(a) * r * 0.42 - 0.03, Math.sin(a) * r * 0.75, 0.06, 0.05, ['#2e4a2a', '#3d5f33', '#4f7a3e', '#24391f'][Math.floor(rand() * 4)]);
      }
    }
  }, p => [p.X - 0.17, p.z - 0.17, 0.34, 0.34]);

  def('counter', {
    depth: p => p.d || 0.6,
    draw(g, p, env) {
      const w = p.w || 2, d = p.d || 0.6, col = p.color || '#4a3022';
      const f = g.box(p.X, p.z, w, d, 0.72, { color: col });
      for (let x = 0.05; x < w - 0.1; x += 0.5) f.r(x, 0.08, 0.44, 0.56, shade(col, 0.82));
      if (p.glass !== false) {
        g.box(p.X, p.z, w, d, 0.03, { e: 0.72, color: shade(col, 1.2), noShadow: true });
        const rand = seedOf(p);
        for (let i = 0; i < w * 9; i++) {
          const x = p.X + 0.08 + rand() * (w - 0.16), z = p.z + 0.08 + rand() * (d - 0.16);
          g.disc(x, z, 0.035, 0.76, rand() < 0.6 ? '#c9a24a' : '#b6bcc4');
          if (Math.sin(env.t * 1.7 + i) > 0.92) { const q = g.geo.at(x, z, 0.76); g.px(q.x, q.y, '#fffbe6', true); }
        }
        g.box(p.X, p.z, w, d, 0.24, { e: 0.75, color: '#3e5864', top: 'rgba(150,190,205,.22)', front: 'rgba(120,165,185,.18)', side: 'rgba(110,150,170,.2)', noShadow: true, edge: false });
        const gf = g.frame(p.X, p.z + d, 0.75);
        for (let x = 0.1; x < w; x += 0.6) gf.line(x, 0.02, x + 0.12, 0.22, 'rgba(230,245,250,.35)');
        gf.r(0, 0.235, w, 0.01, 'rgba(230,245,250,.5)');
      } else {
        g.box(p.X - 0.03, p.z - 0.03, w + 0.06, d + 0.06, 0.04, { e: 0.72, color: shade(col, 1.25), noShadow: true });
      }
    }
  }, p => [p.X, p.z, p.w || 2, p.d || 0.6]);

  def('grandclock', {
    depth: () => 0.35,
    draw(g, p, env) {
      const c = p.color || '#4a2a1c';
      g.box(p.X - 0.04, p.z - 0.02, 0.58, 0.39, 0.15, { color: shade(c, 0.85) });
      const f = g.box(p.X, p.z, 0.5, 0.35, 1.45, { e: 0.15, color: c, noShadow: true });
      f.r(0.1, 0.25, 0.3, 0.95, '#120d0a');
      const top = f.at(0.25, 1.15);
      const ang = p.stopped ? 0.02 : Math.sin(env.t * 2.4) * 0.22;
      const len = 0.75 * f.s;
      g.line(top.x, top.y, top.x + Math.sin(ang) * len, top.y + Math.cos(ang) * len, '#b48d4a');
      circ(g, top.x + Math.sin(ang) * len, top.y + Math.cos(ang) * len, Math.max(1.5, 0.07 * f.s), '#d6b05e');
      const hf = g.box(p.X - 0.03, p.z - 0.02, 0.56, 0.39, 0.45, { e: 1.6, color: shade(c, 1.08), noShadow: true });
      const fc = hf.at(0.28, 0.22);
      clockFace(g, fc.x, fc.y, Math.max(3, 0.16 * f.s), p.time || '03:47', '#e8dfc6', '#b48d4a');
      g.box(p.X - 0.05, p.z - 0.03, 0.6, 0.41, 0.06, { e: 2.05, color: shade(c, 1.2), noShadow: true });
    }
  }, p => [p.X, p.z, 0.5, 0.35]);

  def('safe', {
    depth: p => p.d || 0.6,
    draw(g, p) {
      const w = p.w || 0.7, d = p.d || 0.6, h = p.h || 0.85, c = p.color || '#3f464a';
      const f = g.box(p.X, p.z, w, d, h, { color: c });
      if (p.open) {
        f.r(0.06, 0.06, w - 0.12, h - 0.12, '#0d0e10');
        f.r(0.06, h / 2, w - 0.12, 0.03, shade(c, 0.6));
        f.r(0.12, 0.08, 0.2, 0.06, '#d8cfb4'); f.r(0.14, 0.14, 0.18, 0.04, '#cfc49e');
        g.box(p.X + w, p.z + d - 0.04, 0.05, 0.55, h - 0.06, { e: 0.03, color: shade(c, 1.1), noShadow: true });
        const df = g.frame(p.X + w, p.z + d + 0.51, 0.03);
        df.r(0, 0.3, 0.05, 0.18, '#8a8f92');
      } else {
        const c0 = f.at(w / 2, h * 0.55);
        circ(g, c0.x, c0.y, Math.max(2, 0.09 * f.s), '#9aa0a4');
        g.px(c0.x, c0.y, '#222');
        f.r(w * 0.7, h * 0.3, 0.12, 0.03, '#a8acb0');
      }
    }
  }, p => [p.X, p.z, (p.w || 0.7) + (p.open ? 0.1 : 0), (p.d || 0.6) + (p.open ? 0.5 : 0)]);

  def('bench', {
    depth: p => p.d || 0.65,
    draw(g, p) {
      const w = p.w || 1.6, d = p.d || 0.65, h = 0.85, col = p.color || '#5a4030';
      g.shadow(p.X + w / 2, p.z + d / 2, w * 0.6, d * 0.65, 0.35);
      for (const lx of [0.04, w - 0.1]) g.box(p.X + lx, p.z + 0.05, 0.06, d - 0.1, h - 0.06, { color: shade(col, 0.7), noShadow: true });
      g.box(p.X + 0.1, p.z + 0.1, w - 0.2, d - 0.2, 0.04, { e: 0.18, color: shade(col, 0.8), noShadow: true });
      g.box(p.X, p.z, w, d, 0.06, { e: h - 0.06, color: col, noShadow: true });
      const rand = seedOf(p);
      for (let i = 0; i < 9; i++) g.plane(p.X + 0.1 + rand() * (w - 0.3), p.z + 0.08 + rand() * (d - 0.2), 0.03 + rand() * 0.07, 0.015 + rand() * 0.03, h + 0.002, ['#a8acb0', '#c9a24a', '#5a5a5e', '#d6d0c0'][Math.floor(rand() * 4)]);
    }
  }, p => [p.X, p.z, p.w || 1.6, p.d || 0.65]);

  def('bookcase', {
    depth: p => p.d || 0.35,
    draw(g, p) {
      const w = p.w || 1, d = p.d || 0.35, h = p.h || 1.9, col = p.color || '#3a2a20';
      const f = g.box(p.X, p.z, w, d, h, { color: col });
      const rand = seedOf(p);
      const shelves = Math.max(2, Math.round(h / 0.38));
      for (let s = 0; s < shelves; s++) {
        const y0 = 0.06 + s * (h - 0.1) / shelves, sh = (h - 0.1) / shelves - 0.04;
        f.r(0.04, y0, w - 0.08, sh, '#141012');
        let x = 0.05;
        while (x < w - 0.09) {
          const kind = p.fill || 'books';
          if (kind === 'files') { const bw = 0.07; f.r(x, y0, bw, sh * 0.85, ['#c9b98a', '#a89a6a', '#8a7a52', '#d6caa0'][Math.floor(rand() * 4)]); f.r(x + 0.02, y0 + sh * 0.55, 0.03, 0.04, '#3a3026'); x += bw + 0.006; }
          else if (kind === 'boxes') { const bw = 0.2 + rand() * 0.1; f.r(x, y0, bw, sh * (0.5 + rand() * 0.4), ['#8c7a5a', '#6e5e44'][Math.floor(rand() * 2)]); x += bw + 0.02; }
          else { const bw = 0.035 + rand() * 0.03; f.r(x, y0, bw, sh * (0.7 + rand() * 0.28), ['#6a2f2a', '#2d4a5a', '#4c5a33', '#8a6a3a', '#3a3046', '#9a8a6a'][Math.floor(rand() * 6)]); x += bw + 0.004; }
        }
        f.r(0.04, y0 - 0.03, w - 0.08, 0.03, shade(col, 1.15));
      }
    }
  }, fp);

  def('filecab', {
    depth: p => p.fallen ? 0.55 : (p.d || 0.6),
    draw(g, p) {
      const c = p.color || '#5c6660';
      if (p.fallen) {
        g.box(p.X, p.z, 1.35, 0.5, 0.55, { color: c });
        for (let i = 0; i < 4; i++) {
          g.plane(p.X + 0.05 + i * 0.33, p.z + 0.04, 0.3, 0.42, 0.555, shade(c, 0.88));
          g.plane(p.X + 0.15 + i * 0.33, p.z + 0.2, 0.1, 0.05, 0.56, '#b9b19a');
        }
        return;
      }
      const f = g.box(p.X, p.z, 0.5, p.d || 0.6, p.h || 1.32, { color: c });
      for (let i = 0; i < 4; i++) {
        const y = 0.05 + i * 0.32;
        f.r(0.03, y, 0.44, 0.29, shade(c, 0.92));
        f.r(0.18, y + 0.2, 0.14, 0.03, '#b9b19a');
        f.r(0.2, y + 0.13, 0.1, 0.05, '#e3dccb');
      }
    }
  }, p => p.fallen ? [p.X, p.z, 1.35, 0.5] : [p.X, p.z, 0.5, p.d || 0.6]);

  def('typewriter', {
    depth: () => 0.3,
    draw(g, p) {
      const e = p.e || 0.77, c = p.color || '#2c3530';
      const back = g.frame(p.X, p.z + 0.05, e + 0.1);
      back.r(-0.12, 0, 0.24, 0.24, p.paper || '#ebe5d6');
      if (p.text !== false) for (let y = 0.05; y < 0.2; y += 0.035) back.r(-0.09, y, 0.12 + (y * 37 % 0.06), 0.01, '#4a4a4a');
      g.box(p.X - 0.22, p.z, 0.44, 0.08, 0.06, { e: e + 0.1, color: '#1c1f1d', noShadow: true });
      g.box(p.X - 0.2, p.z + 0.06, 0.4, 0.28, 0.1, { e, color: c, noShadow: true });
      for (let r = 0; r < 3; r++) for (let k = 0; k < 8; k++) g.plane(p.X - 0.17 + k * 0.043, p.z + 0.13 + r * 0.05, 0.025, 0.025, e + 0.101, '#d6d0c2');
    }
  });

  def('press', {
    depth: p => p.d || 1.2,
    draw(g, p, env) {
      const w = p.w || 2.4, d = p.d || 1.2, c = p.color || '#2f4038';
      g.box(p.X, p.z, w, d, 0.5, { color: shade(c, 0.85) });
      g.box(p.X, p.z + 0.1, 0.18, d - 0.2, 1.45, { e: 0.5, color: c, noShadow: true });
      g.box(p.X + w - 0.18, p.z + 0.1, 0.18, d - 0.2, 1.45, { e: 0.5, color: c, noShadow: true });
      const f = g.frame(p.X, p.z + d - 0.15, 0.5);
      for (let i = 0; i < 4; i++) {
        const y = 0.2 + i * 0.3;
        f.r(0.18, y, w - 0.36, 0.17, '#5d6266');
        f.r(0.18, y + 0.12, w - 0.36, 0.03, '#9aa0a4');
        const off = (env.t * (p.running ? 1.5 : 0) + i * 0.13) % 0.3;
        if (p.running) f.r(0.18 + off * (w - 0.4) / 0.3, y + 0.02, 0.05, 0.13, '#3a3f44');
      }
      f.r(0.18, 1.32, w - 0.36, 0.08, '#e9e3d3');
      const gc = g.frame(p.X + w - 0.18, p.z + d - 0.1, 0.5).at(0.09, 0.8);
      circ(g, gc.x, gc.y, Math.max(3, 0.22 * f.s), '#4a5650'); circ(g, gc.x, gc.y, Math.max(1, 0.06 * f.s), '#1a1f1c');
      g.box(p.X + 0.4, p.z + d - 0.05, w - 0.8, 0.4, 0.12, { e: 0.5, color: '#e6e0d0', noShadow: true });
    }
  }, p => [p.X, p.z, p.w || 2.4, (p.d || 1.2) + 0.35]);

  def('stack', {
    depth: p => p.d || 0.4,
    draw(g, p) {
      const w = p.w || 0.5, d = p.d || 0.4, h = p.h || 0.5;
      const f = g.box(p.X, p.z, w, d, h, { color: p.color || '#d8d2c2' });
      for (let y = 0.03; y < h; y += 0.06) f.r(0, y, w, 0.008, '#b7b09f');
      f.r(w / 2 - 0.01, 0, 0.02, h, '#8a6a3a');
    }
  }, fp);

  def('block', {
    depth: p => p.d || 0.5,
    draw(g, p) { g.box(p.X, p.z, p.w || 0.5, p.d || 0.5, p.h || 0.5, { e: p.e || 0, color: p.color || '#555', noShadow: !!p.e }); }
  }, fp);

  def('berth', {
    depth: p => p.d || 1.9,
    draw(g, p) {
      const w = p.w || 0.75, d = p.d || 1.9, fr = p.frame || '#5a4a3c', fab = p.fabric || '#3f5a78';
      g.box(p.X, p.z, w, d, 0.42, { color: fr });
      g.box(p.X + 0.02, p.z + 0.02, w - 0.04, d - 0.04, 0.12, { e: 0.42, color: fab, noShadow: true });
      if (p.sheet) g.box(p.X + 0.05, p.z + 0.6, w - 0.1, 0.9, 0.04, { e: 0.54, color: p.sheet, noShadow: true });
      g.box(p.X + 0.08, p.z + 0.05, w - 0.16, 0.3, 0.08, { e: 0.54, color: '#e3ddd0', noShadow: true });
      if (p.upper !== false) {
        const postX = p.X < g.geo.width / 2 ? p.X + w - 0.05 : p.X;
        g.box(postX, p.z + d - 0.05, 0.05, 0.05, 1.45, { color: '#8a8f94', noShadow: true });
        g.box(p.X, p.z, w, d, 0.08, { e: 1.45, color: fr, noShadow: true });
        g.box(p.X + 0.02, p.z + 0.02, w - 0.04, d - 0.04, 0.1, { e: 1.53, color: shade(fab, 1.1), noShadow: true });
        g.box(p.X + 0.08, p.z + 0.05, w - 0.16, 0.3, 0.07, { e: 1.63, color: '#d8d2c4', noShadow: true });
      }
    }
  }, fp);

  def('luggage', {
    depth: p => p.d || 0.25,
    draw(g, p) {
      const w = p.w || 0.6, d = p.d || 0.25, h = p.h || 0.45, c = p.color || '#6a4a2a';
      const f = g.box(p.X, p.z, w, d, h, { e: p.e || 0, color: c, noShadow: !!p.e });
      f.r(0.12, 0, 0.03, h, shade(c, 0.6)); f.r(w - 0.15, 0, 0.03, h, shade(c, 0.6));
      f.r(w / 2 - 0.08, h, 0.16, 0.04, shade(c, 0.5));
      if (p.tag) f.r(w - 0.1, h * 0.4, 0.06, 0.08, p.tag);
    }
  }, p => p.e ? null : [p.X, p.z, p.w || 0.6, p.d || 0.25]);

  def('cordon', {
    depth: () => 0.02,
    draw(g, p) {
      const a = g.geo.at(p.X, p.z, 0.85), b = g.geo.at(p.X2, p.z2, 0.85);
      for (const [x, z] of [[p.X, p.z], [p.X2, p.z2]]) g.box(x - 0.03, z - 0.03, 0.06, 0.06, 0.9, { color: '#d9b53a', noShadow: true, edge: false });
      g.line(a.x, a.y, b.x, b.y, ['#e6c33a', '#e6c33a', '#151515']);
      g.line(a.x, a.y + 1, b.x, b.y + 1, ['#b8962a', '#b8962a', '#101010']);
    }
  });

  def('coatrack', {
    depth: () => 0.2,
    draw(g, p) {
      const f = g.frame(p.X, p.z, 0);
      g.shadow(p.X, p.z, 0.22, 0.12, 0.3);
      f.r(-0.18, 0, 0.36, 0.03, '#3a2a20'); f.r(-0.02, 0.03, 0.04, 1.75, '#4a3426');
      f.r(-0.14, 1.65, 0.28, 0.03, '#4a3426');
      if (p.coat) { f.r(-0.18, 0.85, 0.24, 0.8, p.coat); f.r(-0.18, 0.85, 0.06, 0.8, shade(p.coat, 0.75)); }
      if (p.hat) f.r(0.02, 1.7, 0.2, 0.08, p.hat);
    }
  });

  def('placard', {
    depth: () => 0.02,
    draw(g, p) {
      const f = g.frame(p.X, p.z, 0);
      f.poly([[-0.08, 0], [0.08, 0], [0.05, 0.16], [-0.05, 0.16]], '#e2b52c');
      f.r(-0.08, 0, 0.16, 0.012, '#8a6a12');
      const c = f.at(0, 0.13);
      const txt = String(p.n);
      g.text(c.x - g.textWidth(txt) / 2, c.y, txt, '#151006');
    }
  });

  global.PixelProps = { circ, cylinder, clockFace };
})(window);
