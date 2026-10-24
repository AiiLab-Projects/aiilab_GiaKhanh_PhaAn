/* Hồ Sơ 13 — nhân vật pixel: đứng, ngồi, nằm và chân dung thẩm vấn */
(function (global) {
  'use strict';
  const { shade, hex, rng, hashStr } = global.PixelScene.util;

  const DEFAULT = { skin: '#c49a7c', hair: '#1e1a1c', hairStyle: 'short', coat: '#3a3f4a', shirt: '#c9c3b5', pants: '#2a2b33', shoes: '#141418' };
  const DETECTIVE = { skin: '#c79d80', hair: '#211b1a', hairStyle: 'short', coat: '#8a7458', shirt: '#cfc8b6', pants: '#2d2a2c', shoes: '#151315', hat: 'fedora', hatColor: '#3a332f', longCoat: true, tie: '#7d2b2a' };

  function look(l) { return Object.assign({}, DEFAULT, l || {}); }

  function drawHead(f, L, facing, y0) {
    const skin = L.skin, dark = shade(skin, 0.8), hair = L.hair;
    const side = facing === 'left' || facing === 'right';
    const dir = facing === 'left' ? -1 : 1;
    const hw = side ? 0.2 : 0.22, hx = -hw / 2;
    f.r(-0.05, y0 - 0.06, 0.1, 0.08, dark);
    f.r(hx, y0, hw, 0.25, skin);
    if (!side) f.r(hx + hw - 0.05, y0, 0.05, 0.25, dark);
    else f.r(dir > 0 ? hx : hx + hw - 0.05, y0, 0.05, 0.25, dark);
    if (facing === 'back') {
      if (L.hairStyle !== 'bald') f.r(hx - 0.01, y0 + 0.05, hw + 0.02, 0.21, hair);
    } else if (side) {
      f.p(dir * 0.05, y0 + 0.13, '#18120f');
      f.r(dir > 0 ? hx + hw : hx - 0.03, y0 + 0.08, 0.03, 0.05, skin); // mũi
      f.r(dir * 0.02 - 0.02, y0 + 0.04, 0.05, 0.012, shade(skin, 0.6));
      if (L.glasses) f.r(dir * 0.04 - 0.03, y0 + 0.12, 0.07, 0.03, '#2a2526');
    } else {
      f.p(-0.05, y0 + 0.13, '#18120f'); f.p(0.05, y0 + 0.13, '#18120f');
      f.r(-0.03, y0 + 0.045, 0.06, 0.012, shade(skin, 0.58));
      if (L.glasses) { f.r(-0.09, y0 + 0.115, 0.08, 0.035, '#2a2526'); f.r(0.01, y0 + 0.115, 0.08, 0.035, '#2a2526'); }
      if (L.beard) f.r(-0.07, y0 + 0.06, 0.14, 0.025, hair);
      if (L.earrings) { f.p(-0.12, y0 + 0.08, '#e3c06a'); f.p(0.12, y0 + 0.08, '#e3c06a'); }
    }
    if (facing !== 'back') {
      const st = L.hairStyle;
      if (st === 'short' || st === 'side' || st === 'slick') {
        f.r(hx - 0.01, y0 + 0.19, hw + 0.02, 0.08, hair);
        f.r(hx - 0.01, y0 + 0.12, 0.03, 0.1, hair);
        f.r(hx + hw - 0.02, y0 + 0.12, 0.03, 0.1, hair);
        if (st === 'side') f.r(hx, y0 + 0.17, hw * 0.6, 0.04, hair);
        if (st === 'slick') f.r(hx + 0.04, y0 + 0.24, hw * 0.4, 0.02, shade(hair, 1.8));
      } else if (st === 'long' || st === 'bob') {
        const bottom = st === 'long' ? -0.12 : 0.04;
        f.r(hx - 0.02, y0 + 0.19, hw + 0.04, 0.09, hair);
        f.r(hx - 0.03, y0 + bottom, 0.05, 0.27 - bottom, hair);
        f.r(hx + hw - 0.02, y0 + bottom, 0.05, 0.27 - bottom, hair);
      } else if (st === 'bun') {
        f.r(hx - 0.01, y0 + 0.19, hw + 0.02, 0.08, hair);
        f.r(-0.05, y0 + 0.26, 0.1, 0.06, hair);
        f.r(hx - 0.01, y0 + 0.13, 0.03, 0.08, hair);
        f.r(hx + hw - 0.02, y0 + 0.13, 0.03, 0.08, hair);
      } else if (st === 'bald') {
        f.r(hx - 0.01, y0 + 0.1, 0.03, 0.07, hair);
        f.r(hx + hw - 0.02, y0 + 0.1, 0.03, 0.07, hair);
        f.r(hx + 0.04, y0 + 0.21, 0.05, 0.02, shade(skin, 1.2));
      }
    }
    if (L.hat === 'fedora') {
      const hc = L.hatColor || '#3a332f';
      f.r(-0.19, y0 + 0.19, 0.38, 0.035, shade(hc, 0.85));
      f.r(-0.12, y0 + 0.22, 0.24, 0.11, hc);
      f.r(-0.12, y0 + 0.22, 0.24, 0.025, shade(hc, 0.45));
      f.r(-0.12, y0 + 0.31, 0.24, 0.02, shade(hc, 1.3));
    } else if (L.hat === 'cap') {
      const hc = L.hatColor || '#2c3a52';
      f.r(-0.13, y0 + 0.2, 0.26, 0.08, hc);
      f.r(facing === 'left' ? -0.21 : -0.13, y0 + 0.19, 0.34, 0.025, shade(hc, 0.7));
    } else if (L.hat === 'beret') {
      f.r(-0.14, y0 + 0.21, 0.28, 0.07, L.hatColor || '#5a2430');
    }
  }

  // Người đứng / ngồi, vẽ như biển phẳng tại vị trí chân
  function drawPerson(g, X, z, l, o = {}) {
    const L = look(l);
    const f = g.frame(X, z, o.e || 0);
    const facing = o.facing || 'front';
    const side = facing === 'left' || facing === 'right';
    const ph = o.walk ? Math.sin(o.phase || 0) : 0;
    const sit = o.pose === 'sit';
    if (!o.noShadow) g.shadow(X, z, 0.3, 0.16, 0.4);
    const up = sit ? -0.4 : 0;
    const coat = L.coat, coatD = shade(coat, 0.72), coatL = shade(coat, 1.15);
    const tw = side ? 0.3 : 0.42;
    // Chân
    if (sit) {
      f.r(-0.17, 0.4, 0.34, 0.08, L.pants);
      f.r(-0.15, 0.06, 0.12, 0.36, shade(L.pants, 0.8));
      f.r(0.03, 0.06, 0.12, 0.36, shade(L.pants, 0.8));
      f.r(-0.16, 0, 0.14, 0.07, L.shoes); f.r(0.02, 0, 0.14, 0.07, L.shoes);
    } else if (side) {
      const a = ph * 0.09;
      f.r(-0.07 + a, 0.07, 0.12, 0.78, shade(L.pants, 0.82));
      f.r(-0.07 - a, 0.07, 0.12, 0.78, L.pants);
      f.r(-0.09 + a + (facing === 'right' ? 0.04 : -0.02), 0, 0.17, 0.07, L.shoes);
      f.r(-0.09 - a + (facing === 'right' ? 0.04 : -0.02), 0, 0.17, 0.07, L.shoes);
    } else {
      const la = Math.max(0, ph) * 0.06, ra = Math.max(0, -ph) * 0.06;
      f.r(-0.15, 0.07 + la, 0.12, 0.78 - la, L.pants);
      f.r(0.03, 0.07 + ra, 0.12, 0.78 - ra, shade(L.pants, 0.85));
      f.r(-0.16, la, 0.14, 0.07, L.shoes); f.r(0.02, ra, 0.14, 0.07, L.shoes);
    }
    // Váy / áo dài
    if (L.dress) {
      f.poly([[-0.27, 0.42], [0.27, 0.42], [0.2, 0.95 + up], [-0.2, 0.95 + up]], L.dress);
      f.r(0.12, 0.42, 0.08, 0.5 + up, shade(L.dress, 0.75));
    }
    // Thân
    const ty = 0.82 + up;
    f.r(-tw / 2, ty, tw, 0.6, coat);
    f.r(tw / 2 - 0.09, ty, 0.09, 0.6, coatD);
    f.r(-tw / 2, ty + 0.05, 0.04, 0.5, coatL);
    if (L.longCoat && !sit) {
      f.r(-tw / 2 - 0.01, 0.48, tw + 0.02, 0.36, coat);
      f.r(tw / 2 - 0.09, 0.48, 0.09, 0.36, coatD);
      if (!side) f.r(-0.01, 0.48, 0.02, 0.4, coatD);
      f.r(-tw / 2, ty + 0.12, tw, 0.04, shade(coat, 0.6)); // thắt lưng
    }
    if (!side && facing !== 'back') {
      f.poly([[-0.08, ty + 0.6], [0.08, ty + 0.6], [0, ty + 0.4]], L.shirt);
      if (L.tie) f.r(-0.015, ty + 0.28, 0.03, 0.22, L.tie);
      if (L.apron) f.r(-0.17, ty - 0.2, 0.34, 0.6, L.apron);
      if (L.badge) f.r(-0.15, ty + 0.4, 0.04, 0.04, '#d8b25a');
      if (L.scarf) f.r(-0.12, ty + 0.5, 0.24, 0.07, L.scarf);
    }
    // Tay
    const sw = ph * 0.05;
    if (side) {
      f.r(-0.05 - sw * 1.5, ty + 0.02, 0.1, 0.56, coatD);
      f.r(-0.05 - sw * 1.5, ty - 0.06, 0.1, 0.08, L.skin);
    } else if (o.armsCrossed) {
      f.r(-0.22, ty + 0.25, 0.44, 0.12, coatD);
    } else {
      f.r(-tw / 2 - 0.09, ty + 0.02 + sw, 0.09, 0.56, shade(coat, 0.86));
      f.r(tw / 2, ty + 0.02 - sw, 0.09, 0.56, coatD);
      f.r(-tw / 2 - 0.09, ty - 0.06 + sw, 0.09, 0.08, L.skin);
      f.r(tw / 2, ty - 0.06 - sw, 0.09, 0.08, shade(L.skin, 0.8));
      if (o.holding) f.r(tw / 2 - 0.02, ty - 0.02, 0.07, 0.12, o.holding);
    }
    drawHead(f, L, facing, 1.47 + up);
  }

  // Thi thể nằm trên sàn: dựng bằng các khối hộp có phối cảnh
  function drawLying(g, X, z, l, o = {}) {
    const L = look(l);
    const Ln = 1.72;
    const right = o.dir !== 'left';
    const parts = [];
    const seg = (a, b, z0, d, h, c) => parts.push({ x: right ? X + a : X + Ln - b, w: b - a, z0, d, h, c });
    g.shadow(X + Ln / 2, z + 0.15, 0.95, 0.32, 0.45);
    seg(0, 0.1, z - 0.01, 0.13, 0.13, L.shoes);
    seg(0, 0.1, z + 0.15, 0.13, 0.13, L.shoes);
    seg(0.08, 0.9, z, 0.13, 0.13, shade(L.pants, 0.9));
    seg(0.08, 0.86, z + 0.15, 0.13, 0.12, L.pants);
    seg(0.86, 1.46, z - 0.07, 0.42, 0.19, L.coat);
    seg(0.92, 1.4, z - 0.17, 0.1, 0.1, shade(L.coat, 0.85)); // tay sát thân
    seg(0.82, 0.92, z - 0.17, 0.1, 0.08, L.skin);
    seg(1.22, 1.32, z + 0.35, 0.42, 0.09, shade(L.coat, 0.9)); // tay dang ra
    seg(1.22, 1.32, z + 0.77, 0.1, 0.08, L.skin);
    seg(1.44, 1.48, z + 0.05, 0.16, 0.12, shade(L.skin, 0.8));
    seg(1.48, 1.72, z + 0.02, 0.22, 0.2, L.skin);
    seg(right ? 1.6 : 1.48, right ? 1.72 : 1.6, z + 0.01, 0.24, 0.215, L.hair);
    parts.sort((a, b) => (a.z0 + a.d) - (b.z0 + b.d));
    for (const p of parts) g.box(p.x, p.z0, p.w, p.d, p.h, { color: p.c, noShadow: true, edge: false });
    // Cổ áo sáng màu
    const c = right ? X + 1.38 : X + Ln - 1.46;
    g.plane(c, z + 0.03, 0.08, 0.22, 0.19, L.shirt);
  }

  function drawActor(g, a, l) {
    drawPerson(g, a.X, a.z, Object.assign({}, DETECTIVE, l || {}), { facing: a.facing, walk: a.walking, phase: a.phase });
  }

  // ---------- Chân dung thẩm vấn 64x64 ----------
  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + 0.5) / 16);
  // bg (tuỳ chọn): màu nền sáng cho giao diện; mặc định là nền phòng thẩm vấn tối
  function portrait(canvas, l, mood, bg) {
    const L = look(l);
    canvas.width = 64; canvas.height = 64;
    const c = canvas.getContext('2d');
    const r = (x, y, w, h, col) => { c.fillStyle = col; c.fillRect(x, y, w, h); };
    const rand = rng(hashStr(JSON.stringify(L)));
    // Nền phòng thẩm vấn
    const base = bg || '#22232a';
    r(0, 0, 64, 64, base);
    for (let y = 0; y < 64; y += 8) r(0, y, 64, 1, shade(base, bg ? 0.96 : 1.12));
    r(0, 52, 64, 12, shade(base, bg ? 0.9 : 0.78));
    const skin = L.skin, sd = shade(skin, 0.78), sl = shade(skin, 1.1), hair = L.hair;
    // Vai & áo
    r(8, 47, 48, 17, L.coat);
    r(8, 47, 6, 17, shade(L.coat, 1.15));
    r(44, 47, 12, 17, shade(L.coat, 0.72));
    r(6, 52, 3, 12, shade(L.coat, 0.85)); r(55, 52, 3, 12, shade(L.coat, 0.6));
    c.fillStyle = L.shirt; c.beginPath(); c.moveTo(25, 46); c.lineTo(39, 46); c.lineTo(32, 58); c.fill();
    if (L.tie) { r(31, 48, 3, 12, L.tie); r(30, 47, 5, 3, shade(L.tie, 1.2)); }
    if (L.scarf) r(22, 45, 20, 4, L.scarf);
    if (L.apron) r(18, 52, 28, 12, L.apron);
    if (L.badge) r(13, 52, 3, 3, '#d8b25a');
    if (L.dress) { r(16, 47, 32, 17, L.dress); r(40, 47, 8, 17, shade(L.dress, 0.75)); }
    // Cổ
    r(27, 39, 10, 9, sd);
    // Đầu
    r(21, 15, 22, 26, skin);
    r(20, 18, 1, 20, skin); r(43, 18, 1, 20, sd);
    r(22, 40, 20, 2, skin);
    r(37, 15, 6, 26, sd);
    r(18, 26, 3, 7, sd); r(43, 26, 3, 7, shade(skin, 0.68));
    // Mắt, mày
    const browY = mood === 'nervous' ? 23 : 24;
    const eyeY = 27;
    r(25, eyeY, 4, 2, '#e8e1d6'); r(35, eyeY, 4, 2, '#d9d0c4');
    const look2 = mood === 'nervous' ? 0 : 1;
    r(26 + look2, eyeY, 2, 2, '#1c1514'); r(36 + look2, eyeY, 2, 2, '#1c1514');
    if (mood === 'angry') { r(24, browY + 1, 3, 1, hair); r(27, browY + 2, 3, 1, hair); r(34, browY + 2, 3, 1, hair); r(37, browY + 1, 3, 1, hair); }
    else { r(24, browY, 6, 1, shade(hair, 1.1)); r(34, browY, 6, 1, shade(hair, 1.1)); }
    // Mũi, miệng
    r(31, 29, 2, 5, sd); r(30, 33, 4, 1, shade(skin, 0.7));
    if (mood === 'nervous') { r(29, 37, 6, 1, shade(skin, 0.55)); r(28, 36, 1, 1, shade(skin, 0.55)); }
    else if (mood === 'angry') { r(28, 37, 8, 1, shade(skin, 0.5)); }
    else { r(29, 37, 6, 1, shade(skin, 0.55)); }
    r(23, 33, 3, 2, shade(skin, 1.04)); // gò má
    if (L.beard) { r(24, 35, 16, 2, hair); r(23, 37, 2, 4, hair); r(39, 37, 2, 4, hair); r(25, 39, 14, 2, shade(hair, 0.9)); }
    if (L.glasses) {
      c.strokeStyle = '#2a2526'; c.lineWidth = 1;
      c.strokeRect(23.5, 25.5, 7, 5); c.strokeRect(33.5, 25.5, 7, 5); r(30, 27, 4, 1, '#2a2526');
      r(24, 26, 2, 1, 'rgba(255,255,255,.5)');
    }
    if (L.earrings) { r(18, 33, 2, 2, '#e3c06a'); r(44, 33, 2, 2, '#e3c06a'); }
    // Tóc
    const st = L.hairStyle;
    if (st === 'short' || st === 'side' || st === 'slick') {
      r(20, 11, 24, 7, hair); r(19, 14, 3, 12, hair); r(42, 14, 3, 10, hair);
      if (st === 'side') r(22, 17, 12, 2, hair);
      if (st === 'slick') { r(24, 12, 10, 1, shade(hair, 1.9)); }
      else for (let i = 0; i < 5; i++) r(21 + Math.floor(rand() * 20), 17, 2, 1 + Math.floor(rand() * 2), hair);
    } else if (st === 'long' || st === 'bob') {
      const bottom = st === 'long' ? 58 : 42;
      r(19, 10, 26, 8, hair); r(17, 14, 5, bottom - 14, hair); r(42, 14, 5, bottom - 14, shade(hair, 0.85));
      r(22, 17, 9, 3, hair);
    } else if (st === 'bun') {
      r(20, 11, 24, 7, hair); r(27, 6, 10, 6, hair); r(19, 15, 3, 9, hair); r(42, 15, 3, 9, hair);
    } else if (st === 'bald') {
      r(18, 22, 3, 8, hair); r(43, 22, 3, 8, hair); r(25, 16, 6, 2, shade(skin, 1.25));
    }
    if (L.hat === 'fedora') {
      const hc = L.hatColor || '#3a332f';
      r(12, 14, 40, 3, shade(hc, 0.85)); r(19, 4, 26, 10, hc); r(19, 11, 26, 3, shade(hc, 0.45));
    } else if (L.hat === 'cap') {
      const hc = L.hatColor || '#2c3a52';
      r(19, 8, 26, 9, hc); r(17, 15, 28, 3, shade(hc, 0.65));
    } else if (L.hat === 'beret') {
      r(17, 8, 28, 7, L.hatColor || '#5a2430');
    }
    if (mood === 'nervous') { r(45, 19, 2, 3, '#9fc3dc'); r(45, 22, 2, 1, '#cfe3f0'); }
    // Ánh đèn bàn thẩm vấn: sáng bên trái, tối dần sang phải & xuống dưới (dithering)
    const img = c.getImageData(0, 0, 64, 64), d = img.data;
    for (let y = 0; y < 64; y++) for (let x = 0; x < 64; x++) {
      const i = (y * 64 + x) * 4;
      let f = 1.15 - x / 64 * 0.55 - Math.max(0, y - 40) / 64 * 0.6;
      f = Math.floor(f * 6 + BAYER[(x & 3) + (y & 3) * 4]) / 6;
      d[i] *= f; d[i + 1] *= f * 0.97; d[i + 2] *= f * 0.9;
    }
    c.putImageData(img, 0, 0);
  }

  global.PixelPeople = { drawPerson, drawLying, drawActor, portrait, DETECTIVE };
})(window);
