/* SceneArt — hiện trường vẽ sẵn (ảnh minh hoạ bán thực) và bộ đồ pháp y.
 *
 * Hồ sơ khai báo khối `art`, mọi toạ độ tính theo điểm ảnh của ảnh gốc:
 *   art: {
 *     src: 'img/scenes/x.jpg', w: 1024, h: 572,
 *     spots: { id: [x, y, r, tool] },   // tool: look (mắt thường) | loupe (kính lúp) | uv (đèn UV) | print (bột vân tay)
 *     decals: [{ type, uv?, ... }]       // chi tiết vẽ thêm; uv: true = chỉ phát sáng dưới đèn UV
 *   }
 *
 * Ba lớp ảnh được ghép một lần cho mỗi hồ sơ:
 *   base  — ảnh gốc + chi tiết thường
 *   uv    — phòng tắt đèn, ánh tím, dấu vết huỳnh quang
 *   print — ảnh gốc + dấu vân tay đã rắc bột ở các điểm `print`
 */
(function () {
  'use strict';
  const cache = new Map();
  const TOOLS = {
    look: { icon: '👁', name: 'Quan sát', hint: 'Nhìn bằng mắt thường, bấm vào chỗ khả nghi' },
    loupe: { icon: '🔍', name: 'Kính lúp', hint: 'Phóng to chi tiết nhỏ: chữ viết, vết xước, bụi' },
    uv: { icon: '🟣', name: 'Đèn UV', hint: 'Tắt đèn phòng, soi dấu vết mắt thường không thấy' },
    print: { icon: '🖌', name: 'Bột vân tay', hint: 'Bấm giữ lên bề mặt để rắc bột tìm dấu tay' }
  };
  const toolOf = (c, id) => (c.art.spots[id] && c.art.spots[id][3]) || 'look';

  function drawClock(ctx, d) {
    const [hh, mm] = String(d.time || '22:15').split(':').map(Number);
    const r = d.r;
    ctx.save();
    ctx.translate(d.x, d.y);
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = d.face || '#f1e9d6'; ctx.fill();
    ctx.lineWidth = Math.max(1.5, r * 0.12); ctx.strokeStyle = d.rim || '#2a2024'; ctx.stroke();
    ctx.fillStyle = ctx.strokeStyle = '#2a2024';
    const hand = (a, len, w) => { ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.sin(a) * len, -Math.cos(a) * len); ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.stroke(); };
    hand(((hh % 12) + mm / 60) / 12 * Math.PI * 2, r * 0.5, Math.max(1.6, r * 0.13));
    hand(mm / 60 * Math.PI * 2, r * 0.75, Math.max(1.2, r * 0.08));
    ctx.restore();
  }

  const DECALS = {
    text(ctx, d) {
      ctx.save();
      ctx.font = `900 ${d.size || 24}px "Be Vietnam Pro", Arial, sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = d.color || 'rgba(120,30,30,.4)';
      ctx.translate(d.x, d.y); ctx.rotate((d.rot || 0) * Math.PI / 180);
      ctx.fillText(d.text, 0, 0);
      ctx.restore();
    },
    clock: drawClock,
    steps(ctx, d) {
      // dấu giày (đế + gót) xếp theo hướng đi
      ctx.save();
      ctx.fillStyle = d.color || 'rgba(235,215,160,.55)';
      (d.at || []).forEach(([x, y], i) => {
        ctx.save(); ctx.translate(x, y); ctx.rotate((d.rot || 0) * Math.PI / 180);
        const s = d.size || 7, o = i % 2 ? s * 0.7 : -s * 0.7;
        ctx.beginPath(); ctx.ellipse(o, -s * 0.5, s * 0.45, s * 0.5, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(o, s * 0.75, s * 0.35, s * 0.2, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });
      ctx.restore();
    },
    smear(ctx, d) {
      ctx.save(); ctx.fillStyle = d.color || 'rgba(40,80,170,.55)';
      ctx.beginPath(); ctx.ellipse(d.x, d.y, d.w || 10, d.h || 4, (d.rot || 0) * Math.PI / 180, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
  };

  // Dấu vân tay: các vòng xoáy lồng nhau
  function fingerprint(ctx, x, y, s, rot) {
    ctx.save();
    ctx.translate(x, y); ctx.rotate(rot);
    ctx.strokeStyle = 'rgba(245,245,240,.85)'; ctx.lineWidth = Math.max(0.8, s * 0.07);
    for (let i = 1; i <= 6; i++) {
      ctx.beginPath();
      ctx.ellipse(0, i * 0.1 * s, s * 0.16 * i, s * 0.22 * i, 0, Math.PI * (0.05 + i * 0.03), Math.PI * (1.95 - i * 0.02));
      ctx.stroke();
    }
    ctx.restore();
  }

  function compose(c) {
    if (cache.has(c.id)) return cache.get(c.id);
    const a = c.art;
    const pr = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const mk = () => { const cv = document.createElement('canvas'); cv.width = a.w || img.naturalWidth; cv.height = a.h || img.naturalHeight; return cv; };
        const base = mk(), uv = mk(), print = mk();
        const b = base.getContext('2d');
        b.drawImage(img, 0, 0, base.width, base.height);
        (a.decals || []).filter(d => !d.uv).forEach(d => DECALS[d.type] && DECALS[d.type](b, d));

        // Lớp UV: ảnh tối, ngả tím; dấu vết huỳnh quang tự phát sáng
        const u = uv.getContext('2d');
        u.filter = 'grayscale(.7) brightness(.42) contrast(1.15)';
        u.drawImage(base, 0, 0);
        u.filter = 'none';
        u.globalCompositeOperation = 'multiply'; u.fillStyle = '#7b5cff'; u.fillRect(0, 0, uv.width, uv.height);
        u.globalCompositeOperation = 'source-over';
        u.shadowColor = '#d8c4ff'; u.shadowBlur = 14;
        (a.decals || []).filter(d => d.uv).forEach(d => DECALS[d.type] && DECALS[d.type](u, d));
        u.shadowBlur = 0;

        // Lớp vân tay: bột xám rắc quanh điểm, dấu tay hiện trắng
        const p = print.getContext('2d');
        p.drawImage(base, 0, 0);
        Object.entries(a.spots).forEach(([id, s]) => {
          if (s[3] !== 'print') return;
          const r = Math.max(14, s[2] * 0.7);
          const g = p.createRadialGradient(s[0], s[1], 0, s[0], s[1], r * 1.4);
          g.addColorStop(0, 'rgba(40,40,46,.55)'); g.addColorStop(1, 'rgba(40,40,46,0)');
          p.fillStyle = g; p.beginPath(); p.arc(s[0], s[1], r * 1.4, 0, Math.PI * 2); p.fill();
          fingerprint(p, s[0] - r * 0.3, s[1], r * 0.55, -0.3);
          fingerprint(p, s[0] + r * 0.35, s[1] - r * 0.15, r * 0.5, 0.25);
        });
        resolve({ base, uv, print, w: base.width, h: base.height });
      };
      img.onerror = reject;
      img.src = a.src;
    });
    cache.set(c.id, pr);
    return pr;
  }

  // Ảnh thu nhỏ 16:9 (cắt phủ kín khung)
  function still(canvas, c, width = 640) {
    canvas.classList.add('art-img');
    canvas.width = width; canvas.height = Math.round(width * 9 / 16);
    return compose(c).then(L => {
      const src = L.base, k = Math.max(canvas.width / src.width, canvas.height / src.height);
      const sw = canvas.width / k, sh = canvas.height / k;
      canvas.getContext('2d').drawImage(src, (src.width - sw) / 2, (src.height - sh) / 2, sw, sh, 0, 0, canvas.width, canvas.height);
      return canvas;
    });
  }

  // Ảnh cận cảnh một vật chứng, lấy đúng lớp của dụng cụ đã tìm ra nó
  function crop(target, c, id) {
    const s = c.art.spots[id];
    if (!s) return Promise.resolve(null);
    return compose(c).then(L => {
      const tool = toolOf(c, id), src = tool === 'uv' ? L.uv : tool === 'print' ? L.print : L.base;
      const zoom = tool === 'loupe' ? 3.2 : 4.2;
      const hh = Math.min(src.height, Math.max(tool === 'loupe' ? 110 : 150, s[2] * zoom)), w = Math.min(src.width, hh * 4 / 3);
      const sx = Math.max(0, Math.min(src.width - w, s[0] - w / 2)), sy = Math.max(0, Math.min(src.height - hh, s[1] - hh / 2));
      target.classList.add('art-img');
      target.width = 640; target.height = 480;
      const ctx = target.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(src, sx, sy, w, hh, 0, 0, 640, 480);
      return target;
    });
  }

  /* Bàn khám nghiệm: vẽ hiện trường theo dụng cụ đang cầm.
   *   look  — ảnh sáng bình thường
   *   loupe — vòng kính phóng to 2.4× theo con trỏ
   *   uv    — phòng tối tím, vùng đèn UV rọi lộ dấu vết phát sáng
   *   print — ảnh bình thường; điểm đã rắc bột hiện dấu tay
   */
  class Bench {
    constructor(canvas, c, layers) {
      this.canvas = canvas; this.ctx = canvas.getContext('2d'); this.c = c; this.L = layers;
      canvas.width = layers.w; canvas.height = layers.h;
      this.tool = 'look'; this.px = layers.w / 2; this.py = layers.h / 2; this.inside = false;
      this.dusted = new Set(); this.dust = null; this.flash = 0; this.raf = 0;
    }
    setTool(t) { this.tool = t; this.request(); }
    point(x, y, inside) { this.px = x; this.py = y; this.inside = inside; this.request(); }
    request() { if (!this.raf) this.raf = requestAnimationFrame(() => { this.raf = 0; this.draw(); }); }
    // Hiệu ứng rắc bột: chấm xám bung ra quanh điểm bấm trong `ms`
    brush(x, y, ms, done) {
      const t0 = performance.now(), dots = Array.from({ length: 70 }, () => [Math.random() * Math.PI * 2, Math.random()]);
      this.dust = { x, y, dots, p: 0 };
      const step = now => {
        this.dust.p = Math.min(1, (now - t0) / ms);
        this.draw();
        if (this.dust.p < 1) requestAnimationFrame(step); else { this.dust = null; this.draw(); done && done(); }
      };
      requestAnimationFrame(step);
    }
    // Đèn flash máy ảnh
    shoot() {
      const t0 = performance.now();
      const step = now => { this.flash = Math.max(0, 1 - (now - t0) / 380); this.draw(); if (this.flash > 0) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }
    draw() {
      const { ctx, L, tool, px, py } = this, W = L.w, H = L.h;
      ctx.drawImage(L.base, 0, 0);
      // dấu tay đã lấy được giữ nguyên trên ảnh
      this.dusted.forEach(id => {
        const s = this.c.art.spots[id], r = Math.max(14, s[2] * 0.7) * 1.5;
        ctx.save(); ctx.beginPath(); ctx.arc(s[0], s[1], r, 0, Math.PI * 2); ctx.clip(); ctx.drawImage(L.print, 0, 0); ctx.restore();
      });
      if (tool === 'uv') {
        ctx.save(); ctx.globalAlpha = 0.86; ctx.drawImage(L.uv, 0, 0); ctx.restore();
        ctx.fillStyle = 'rgba(8,4,20,.55)'; ctx.fillRect(0, 0, W, H);
        const R = 120;
        ctx.save(); ctx.beginPath(); ctx.arc(px, py, R, 0, Math.PI * 2); ctx.clip();
        ctx.drawImage(L.uv, 0, 0);
        const g = ctx.createRadialGradient(px, py, R * 0.2, px, py, R);
        g.addColorStop(0, 'rgba(170,120,255,.28)'); g.addColorStop(1, 'rgba(10,4,30,.75)');
        ctx.fillStyle = g; ctx.fillRect(px - R, py - R, R * 2, R * 2);
        ctx.restore();
      }
      if (tool === 'loupe' && this.inside) {
        const R = 92, k = 2.4;
        ctx.save(); ctx.beginPath(); ctx.arc(px, py, R, 0, Math.PI * 2); ctx.clip();
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(L.base, px - R / k, py - R / k, 2 * R / k, 2 * R / k, px - R, py - R, 2 * R, 2 * R);
        ctx.restore();
        ctx.save();
        ctx.lineWidth = 7; ctx.strokeStyle = '#1e1b2c'; ctx.beginPath(); ctx.arc(px, py, R, 0, Math.PI * 2); ctx.stroke();
        ctx.lineWidth = 3; ctx.strokeStyle = '#d9b45a'; ctx.stroke();
        ctx.restore();
      }
      if (this.dust) {
        const { x, y, dots, p } = this.dust;
        ctx.save(); ctx.fillStyle = 'rgba(70,70,78,.55)';
        dots.forEach(([a, d]) => { const r = d * 34 * p; ctx.fillRect(x + Math.cos(a) * r, y + Math.sin(a) * r * 0.8, 2, 2); });
        ctx.restore();
      }
      if (this.flash) { ctx.fillStyle = `rgba(255,255,255,${this.flash * 0.85})`; ctx.fillRect(0, 0, W, H); }
    }
  }

  // Toạ độ ảnh tại vị trí con trỏ (đọc kích thước canvas đang hiển thị)
  function toImage(canvas, e) {
    const r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * canvas.width, y: (e.clientY - r.top) / r.height * canvas.height, inside: e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom };
  }

  window.SceneArt = { compose, still, crop, Bench, toImage, TOOLS, toolOf, has: c => !!(c && c.art) };
})();
