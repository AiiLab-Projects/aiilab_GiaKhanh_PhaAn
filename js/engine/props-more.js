/* Hồ Sơ 13 — đạo cụ cho các hồ sơ #06–#08 (rạp chiếu bóng, phà sông, phòng lưu trữ) */
(function (global) {
  'use strict';
  const PS = global.PixelScene;
  const { shade, rng, hashStr } = PS.util;
  const { circ } = global.PixelProps;
  const def = PS.define;
  const fp = p => [p.X, p.z, p.w, p.d];

  // Máy chiếu phim 35mm: thân hộp trên chân sắt, hai bánh cuộn phim, ống kính hướng về ô kính
  def('projector', {
    depth: () => 0.7,
    draw(g, p, env) {
      const c = p.color || '#3a4a44', run = p.running;
      g.box(p.X + 0.15, p.z + 0.2, 0.12, 0.3, 0.75, { color: '#2a2a2c' });
      const f = g.box(p.X, p.z, 0.6, 0.7, 0.45, { e: 0.75, color: c, noShadow: true });
      f.r(0.06, 0.1, 0.48, 0.05, shade(c, 0.7));
      f.e(0.45, 0.25, 0.08, 0.06, run ? '#ffd27a' : '#4a3a2a');
      for (const [dz, dy] of [[0.15, 1.55], [0.5, 1.1]]) {
        const q = g.geo.at(p.X + 0.3, p.z + dz, dy);
        const R = Math.max(3, 0.28 * q.s);
        circ(g, q.x, q.y, R, '#7a7e80'); circ(g, q.x, q.y, R * 0.82, p.empty && dz === 0.15 ? '#5a5e60' : '#2a2622');
        const a = env.t * (run ? 3 : 0) + dz * 9;
        for (let k = 0; k < 3; k++) { const an = a + k * 2.09; g.line(q.x, q.y, q.x + Math.cos(an) * R * 0.8, q.y + Math.sin(an) * R * 0.8, '#9aa0a2'); }
        circ(g, q.x, q.y, Math.max(1, R * 0.15), '#c9c9c9');
      }
      g.box(p.X + 0.22, p.z - 0.18, 0.16, 0.2, 0.14, { e: 0.95, color: '#1c1c1e', noShadow: true });
      if (run) { const l = g.geo.at(p.X + 0.3, p.z - 0.18, 1.02); g.px(l.x, l.y, '#fff2c8', true); }
    }
  }, p => [p.X, p.z, 0.6, 0.7]);

  // Hộp phim thép tròn, nằm dưới sàn hoặc trên bàn
  def('filmcan', {
    depth: () => 0.35,
    draw(g, p) {
      const e = p.e || 0, r = p.r || 0.18;
      g.disc(p.X, p.z, r, e + 0.01, shade(p.color || '#8a8e90', 0.7));
      g.disc(p.X, p.z, r * 0.94, e + 0.04, p.color || '#8a8e90');
      g.disc(p.X, p.z, r * 0.3, e + 0.045, '#5a5e60');
      if (p.dent) g.plane(p.X + r * 0.4, p.z - r * 0.2, r * 0.4, r * 0.3, e + 0.046, '#5a2020');
      if (p.label) g.plane(p.X - r * 0.5, p.z + r * 0.3, r * 0.8, r * 0.2, e + 0.046, p.label);
    }
  });

  // Giá phim trên tường: các hộp phim xếp đứng, có thể có một ô trống
  def('reelrack', {
    layer: 'wall',
    draw(g, p) {
      const w = p.w || 1.2, rows = p.rows || 2, f = g.frame(p.X, 0, p.h || 1.0);
      const rand = rng(hashStr('reel' + p.X));
      for (let r = 0; r < rows; r++) {
        const y = r * 0.42;
        f.r(0, y, w, 0.035, '#4a3a2c');
        for (let x = 0.04, i = 0; x < w - 0.1; x += 0.13, i++) {
          if (p.gap === r * 10 + i) { f.r(x, y + 0.04, 0.1, 0.3, '#1a1614'); continue; }
          f.r(x, y + 0.04, 0.1, 0.3, ['#8a8e90', '#7a7e80', '#9a9284'][Math.floor(rand() * 3)]);
          f.r(x + 0.02, y + 0.22, 0.06, 0.05, ['#e8e0c8', '#d8b860', '#c8d8e0'][Math.floor(rand() * 3)]);
        }
      }
    }
  });

  // Phao cứu sinh treo tường
  def('buoy', {
    layer: 'wall',
    draw(g, p) {
      const f = g.frame(p.X, 0, p.h || 1.4), c = f.at(0, 0), R = Math.max(4, 0.24 * f.s);
      circ(g, c.x, c.y, R, '#d8d2c4');
      for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + 0.4; circ(g, c.x + Math.cos(a) * R * 0.8, c.y + Math.sin(a) * R * 0.8, R * 0.28, '#c0392b'); }
      circ(g, c.x, c.y, R * 0.55, p.wall || '#3a3a36');
    }
  });

  // Chậu nhôm (có thể đầy nước xà phòng)
  def('washtub', {
    depth: () => 0.5,
    draw(g, p) {
      const e = p.e || 0, r = p.r || 0.3;
      global.PixelProps.cylinder(g, p.X, p.z, r, e + 0.28, '#a8acae', { top: '#8a8e90' });
      if (p.water) g.disc(p.X, p.z, r * 0.88, e + 0.26, p.water);
      if (p.foam) for (let i = 0; i < 6; i++) g.disc(p.X + Math.cos(i) * r * 0.5, p.z + Math.sin(i * 2) * r * 0.4, 0.04, e + 0.27, '#eef2f2');
    }
  }, p => [p.X - (p.r || 0.3), p.z - (p.r || 0.3), (p.r || 0.3) * 2, (p.r || 0.3) * 2]);

  // Cuộn dây thừng
  def('rope', {
    layer: 'decal',
    draw(g, p) {
      for (let i = 0; i < 4; i++) g.disc(p.X, p.z, 0.28 - i * 0.05, 0.01 + i * 0.012, i % 2 ? '#8a7450' : '#a68a5a');
      g.disc(p.X, p.z, 0.08, 0.06, '#3a3024');
      if (p.mud) g.plane(p.X + 0.1, p.z, 0.16, 0.06, 0.07, '#4a3a22');
    }
  });

  // Thùng sắt đốt giấy, còn khói và tàn lửa
  def('burnbin', {
    depth: () => 0.4,
    draw(g, p, env) {
      global.PixelProps.cylinder(g, p.X, p.z, 0.2, 0.5, '#4a4644', { top: '#1a1614' });
      if (p.ash !== false) for (let i = 0; i < 5; i++) g.plane(p.X - 0.12 + i * 0.05, p.z - 0.05 + (i % 2) * 0.06, 0.06, 0.04, 0.49, i % 2 ? '#d8d0c0' : '#2a2420');
      if (p.fire) {
        const q = g.geo.at(p.X, p.z, 0.55);
        for (let k = 0; k < 6; k++) {
          const fl = Math.sin(env.t * 9 + k * 1.7);
          g.rect(q.x - 6 + k * 2, q.y - 3 - Math.abs(fl) * 6, 2, 3 + Math.abs(fl) * 6, k % 2 ? '#ffb040' : '#ff6a20', true);
        }
      }
      if (p.smoke) {
        const q = g.geo.at(p.X, p.z, 0.6);
        for (let k = 0; k < 5; k++) { const y = (env.t * 6 + k * 9) % 40; g.rect(q.x - 2 + Math.sin(y * 0.2 + k) * 4, q.y - y, 4, 3, 'rgba(160,160,160,.25)'); }
      }
    }
  }, p => [p.X - 0.2, p.z - 0.2, 0.4, 0.4]);

  // Đèn bão treo (phà, bến đò)
  def('lantern', {
    layer: 'ceiling',
    draw(g, p, env) {
      const q = g.geo.at(p.X, p.z, p.h || 1.9), top = g.geo.at(p.X, p.z, (p.h || 1.9) + 0.4);
      g.line(q.x, top.y, q.x, q.y - 4, '#2a2a2a');
      const fl = 0.85 + Math.sin(env.t * 7) * 0.08;
      g.rect(q.x - 3, q.y - 4, 7, 2, '#3a3a36');
      g.rect(q.x - 2, q.y - 2, 5, 6, shade('#ffcf7a', fl), true);
      g.rect(q.x - 3, q.y + 4, 7, 2, '#3a3a36');
    }
  });
})(window);
