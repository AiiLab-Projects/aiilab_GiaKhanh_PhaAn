/* Tái hiện vụ án: sau khi phá án, phát lại diễn biến thật như một đoạn phim ngắn.
   Tham khảo màn "Closing Argument" của Danganronpa (vụ án dựng lại thành từng khung rồi chiếu thành phim có lời kể)
   và đoạn hồi tưởng cuối vụ của Ace Attorney.
   - Dựng bằng chính PixelScene của hiện trường; nhân vật đi lại theo kịch bản `replay.beats` của hồ sơ
   - Mỗi khoảnh khắc có giờ, địa điểm, lời kể chữ chạy và thẻ chứng cứ (đã thu thập / bỏ lỡ)
   - Sự việc xảy ra ở nơi khác hiện dạng thẻ chân dung (`card`) trên nền hiện trường mờ
   - Hồ sơ không có khối `replay` → tự chia `solution.summary` thành từng câu trên nền hiện trường */
(function (global) {
  'use strict';
  const P = global.PixelPeople;
  const REDUCED = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CHARS_PER_SEC = 42;   // tốc độ chữ chạy
  const CAM_EASE = 1.4;       // giây để máy quay lia tới khung mới

  // Nhân vật trong phim: đứng, ngồi, đi, hoặc nằm (pose: 'body')
  PixelScene.define('cast', {
    draw(g, p) {
      if (p.pose === 'body') P.drawLying(g, p.X, p.z, p.look, { dir: p.dir });
      else P.drawPerson(g, p.X, p.z, p.look, { pose: p.pose, facing: p.facing || 'front', walk: p.walking, phase: p.phase, e: p.e, holding: p.holding, armsCrossed: p.armsCrossed });
    }
  });

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  function h(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const ease = t => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };

  // Diễn viên: nạn nhân lấy dáng từ thi thể trong hiện trường, nghi phạm lấy từ hồ sơ, thêm vai phụ ở `replay.cast`
  function castOf(c) {
    const body = (c.spec.props || []).find(p => p.type === 'body');
    const out = { victim: { name: c.victim.name.split(',')[0], look: body ? body.look : {}, role: 'victim' } };
    c.suspects.forEach(s => { out[s.id] = { name: s.name, look: s.look }; });
    const extra = (c.replay && c.replay.cast) || {};
    Object.keys(extra).forEach(id => { out[id] = Object.assign({}, out[id], extra[id]); });
    out[c.solution.culprit].role = 'culprit';
    return out;
  }

  function beatsOf(c) {
    const story = c.replay ? c.replay.beats : c.solution.summary.split(/(?<=[.!?])\s+/).map(text => ({ text }));
    return [{ kind: 'title' }].concat(story, [{ kind: 'end' }]);
  }

  // ---------- Trạng thái diễn viên ----------
  function applyInstant(st, d) {
    if (d.hide) { st.hidden = true; return; }
    st.hidden = false;
    if (d.at) { st.X = d.at[0]; st.z = d.at[1]; }
    ['pose', 'dir', 'e', 'holding', 'armsCrossed', 'sort'].forEach(k => { if (k in d) st[k] = d[k]; });
    if (d.face) st.facing = d.face;
  }
  function pathLen(st, d) {
    let len = 0, a = [st.X, st.z];
    (d.path || []).forEach(b => { len += Math.hypot(b[0] - a[0], b[1] - a[1]); a = b; });
    return len;
  }
  const walkEnd = (st, d) => (d.delay || 0) + pathLen(st, d) / (d.speed || 1.3);
  // Chặng nối tiếp: then có path/then thì diễn viên đi tiếp sau khi chặng trước kết thúc
  const chained = t => t && (t.path || t.then);
  function splitThen(t) {
    const pre = Object.assign({}, t);
    ['path', 'then', 'hide', 'face', 'delay', 'speed', 'limp'].forEach(k => delete pre[k]);
    return { pre, next: { path: t.path, speed: t.speed, limp: t.limp, face: t.face, then: t.hide ? { hide: true } : t.then } };
  }
  // Tổng thời gian diễn của một chỉ dẫn (gồm các chặng nối tiếp)
  function totalEnd(st, d) {
    let end = walkEnd(st, d);
    if (d.then) {
      end += d.then.delay || 0;
      if (chained(d.then)) {
        const s2 = actorAt(st, Object.assign({}, d, { then: null }), Infinity);
        const { pre, next } = splitThen(d.then);
        applyInstant(s2, pre);
        end += totalEnd(s2, next);
      }
    }
    return end;
  }

  // Vị trí của một diễn viên tại giây `tl` trong khoảnh khắc; `start` là trạng thái đầu khoảnh khắc
  function actorAt(start, d, tl) {
    const st = Object.assign({}, start, { walking: false });
    if (!d) return st;
    const dist0 = Math.max(0, tl - (d.delay || 0)) * (d.speed || 1.3);
    let dist = dist0, a = [st.X, st.z], moving = false;
    for (const b of d.path || []) {
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (dist < L) {
        const k = dist / L, dx = b[0] - a[0], dz = b[1] - a[1];
        st.X = a[0] + dx * k; st.z = a[1] + dz * k;
        if (dist0 > 0) {
          moving = true;
          if (st.pose !== 'body') {
            st.walking = true; st.phase = tl * (d.limp ? 6 : 9);
            st.facing = Math.abs(dx) > Math.abs(dz) ? (dx < 0 ? 'left' : 'right') : (dz < 0 ? 'back' : 'front');
          }
        }
        break;
      }
      dist -= L; st.X = b[0]; st.z = b[1]; a = b;
    }
    const end = walkEnd(start, d);
    if (!moving && tl >= end) {
      if (d.face) st.facing = d.face;
      if (d.then && tl >= end + (d.then.delay || 0)) {
        if (!chained(d.then)) applyInstant(st, d.then);
        else {
          const { pre, next } = splitThen(d.then);
          applyInstant(st, pre);
          return actorAt(st, next, tl - end - (d.then.delay || 0));
        }
      }
    }
    return st;
  }

  // ---------- Trình chiếu ----------
  function open(c, opts = {}) {
    const found = opts.found || [];
    const cast = castOf(c);
    const beats = beatsOf(c);
    const clueOf = id => c.clues.find(x => x.id === id);
    const filmClues = [];
    beats.forEach(b => (b.clues || []).forEach(id => { if (clueOf(id) && !filmClues.includes(id)) filmClues.push(id); }));

    const el = h(`
      <div class="rp" role="dialog" aria-modal="true" aria-label="Tái hiện vụ án ${esc(c.title)}">
        <header class="rp-top">
          <div class="rp-clock"><b>--:--</b><small>${esc(c.datetime)}</small></div>
          <div class="rp-place"><span class="eyebrow">Tái hiện vụ án · Hồ sơ #${esc(c.number)}</span><strong></strong></div>
          <button class="rp-close" aria-label="Đóng phim">×</button>
        </header>
        <div class="rp-stage">
          <div class="rp-world"><canvas aria-hidden="true"></canvas><div class="rp-tags"></div></div>
          <video class="rp-video hidden" muted playsinline preload="auto" aria-hidden="true"></video>
          <img class="rp-still hidden" alt="" aria-hidden="true">
          <div class="rp-flashfx"></div>
          <div class="rp-card hidden"></div>
          <div class="rp-title hidden">
            <span class="eyebrow">Tái hiện vụ án</span>
            <h2>${c.titleHtml || esc(c.title)}</h2>
            <p>${esc(c.location)} · ${esc(c.datetime)}</p>
            <small>Dựng lại từ hồ sơ bạn đã lập</small>
          </div>
          <div class="rp-end hidden"></div>
        </div>
        <div class="rp-caption"><p class="rp-text"></p><div class="rp-clues"></div><span class="rp-sr" aria-live="polite"></span></div>
        <footer class="rp-controls">
          <button class="rp-prev" aria-label="Khoảnh khắc trước">⏮</button>
          <button class="rp-play" aria-label="Tạm dừng">❚❚</button>
          <button class="rp-next" aria-label="Khoảnh khắc sau">⏭</button>
          <div class="rp-bar">${beats.map((b, i) => `<button class="rp-seg" data-i="${i}" aria-label="Tới khoảnh khắc ${i + 1}${b.t ? ' · ' + esc(b.t) : ''}"><i></i></button>`).join('')}</div>
          <button class="rp-speed" aria-label="Tốc độ phát">1×</button>
        </footer>
      </div>`);
    const $ = sel => el.querySelector(sel);
    document.body.appendChild(el);

    const canvas = $('canvas');
    const spec = Object.assign({}, c.spec, { props: (c.spec.props || []).map(p => Object.assign({}, p)) });
    const scene = new PixelScene(canvas, spec, { hint: false });
    const base = scene.props;
    const orig = base.map(p => Object.assign({}, p));
    const world = $('.rp-world'), stage = $('.rp-stage');

    // ---------- Đồ vật theo thời gian: { type, i?, set, after? } ----------
    function resetProps() {
      base.forEach((p, k) => { Object.keys(p).forEach(key => delete p[key]); Object.assign(p, orig[k]); });
    }
    function applyPatch(pt) {
      let n = 0;
      base.forEach(p => {
        if (p.type !== pt.type) return;
        if (pt.i === undefined || pt.i === n) {
          Object.assign(p, pt.set);
          if ('X' in pt.set || 'z' in pt.set || 'e' in pt.set) p._key = PixelScene.sortKey(p);
        }
        n++;
      });
    }

    // ---------- Trạng thái mỗi khoảnh khắc ----------
    let idx = 0, tl = 0, paused = false, speed = 1, fullText = false, raf = 0, last = 0, acc = 0, closed = false;
    let actors = {};          // id → trạng thái đầu khoảnh khắc hiện tại
    let applied = new Set();  // patch/fx đã chạy trong khoảnh khắc hiện tại
    let camFrom = { cx: 0.5, cy: 0.5, s: 1 }, camNow = camFrom, camTo = camFrom;
    const ids = Object.keys(cast);

    function camOf(cam) {
      if (!cam || !cam.zoom || cam.zoom <= 1) return { cx: 0.5, cy: 0.5, s: 1 };
      const p = scene.screenOf(cam.X, cam.z, cam.h === undefined ? 1 : cam.h), s = cam.zoom;
      return { cx: clamp(p.x, 0.5 / s, 1 - 0.5 / s), cy: clamp(p.y, 0.5 / s, 1 - 0.5 / s), s };
    }
    function durOf(b) {
      if (b.kind === 'title') return 3.4;
      if (b.kind === 'end') return Infinity;
      if (b.video) return b.dur || 8;
      let walk = 0;
      Object.keys(b.cast || {}).forEach(id => { if (actors[id]) walk = Math.max(walk, totalEnd(entered(id, b.cast[id]), b.cast[id])); });
      return b.dur || Math.max(4.2, (b.text || '').length / 15 + 1.8, walk + 1.6);
    }
    function entered(id, d) { const st = Object.assign({}, actors[id]); applyInstant(st, Object.assign({}, d, { then: null, face: d.path ? null : d.face })); return st; }

    // Dựng lại toàn bộ trạng thái tới đầu khoảnh khắc i (dùng khi tua)
    function rebuild(i) {
      resetProps();
      scene.setDiscovered([]);
      ((c.replay && c.replay.start) || []).forEach(applyPatch);
      actors = {};
      ids.forEach(id => { actors[id] = { X: 0, z: 0, facing: 'front', hidden: true, look: cast[id].look }; });
      if (!c.replay) return;   // hồ sơ không có kịch bản: giữ nguyên hiện trường
      for (let k = 0; k < i; k++) {
        const b = beats[k];
        (b.patch || []).forEach(applyPatch);
        Object.keys(b.cast || {}).forEach(id => { if (actors[id]) actors[id] = actorAt(entered(id, b.cast[id]), b.cast[id], Infinity); });
      }
    }

    function go(i, keepCam) {
      idx = clamp(i, 0, beats.length - 1);
      rebuild(idx);
      const b = beats[idx];
      if (b.kind === 'end') {
        resetProps();   // về đúng hiện trường lúc được phát hiện, đặt biển số các vật chứng bạn đã thu
        ids.forEach(id => { actors[id].hidden = true; });
        scene.setDiscovered(found.filter(id => scene.hotspots.some(x => x.id === id)));
      }
      Object.keys(b.cast || {}).forEach(id => { if (actors[id]) actors[id] = entered(id, b.cast[id]); });
      tl = 0; fullText = REDUCED; applied = new Set();
      camFrom = keepCam ? camNow : camOf(null);
      camTo = camOf(b.cam);
      b.dur_ = durOf(b);
      drawChrome(b);
      stage.classList.toggle('dark', !!b.dark);
      showVideo(b);
      showStill(b);
    }

    // Vụ có clip quay thật: mở đầu và kết phim dùng ảnh hiện trường bán thực tế, không dùng cảnh pixel
    const still = $('.rp-still');
    const filmed = !!(c.replay && c.replay.beats.some(b => b.video));
    function showStill(b) {
      const src = filmed && !b.video && (b.kind === 'title' || b.kind === 'end') && c.art && c.art.src;
      still.classList.toggle('hidden', !src);
      if (!src) return;
      if (still.getAttribute('src') !== src) still.src = src;
      still.onerror = () => { still.classList.add('hidden'); stage.classList.remove('filmed'); };
      stage.classList.add('filmed');
    }

    // Khoảnh khắc có video quay sẵn (Gemini/Veo): phát đè lên cảnh pixel, độ dài theo clip
    const video = $('.rp-video');
    function showVideo(b) {
      video.onloadedmetadata = video.onerror = null;
      if (!b.video) { video.pause(); video.classList.add('hidden'); stage.classList.remove('filmed'); return; }
      const fit = () => { if (beats[idx] === b && isFinite(video.duration)) b.dur_ = b.dur || Math.max(video.duration + 0.4, (b.text || '').length / 15 + 1.8); };
      video.onerror = () => { if (beats[idx] === b) { video.classList.add('hidden'); stage.classList.remove('filmed'); } };
      video.classList.remove('hidden');
      stage.classList.add('filmed');
      if (video.getAttribute('src') !== b.video) { video.src = b.video; video.onloadedmetadata = fit; } else fit();
      video.currentTime = 0;
      video.playbackRate = speed;
      if (!paused) video.play().catch(() => {});
    }

    // ---------- Phần chữ & lớp phủ ----------
    function portraits(list) {
      return list.map(id => cast[id] ? `<figure class="${cast[id].role || ''}"><canvas width="64" height="64" data-id="${esc(id)}"></canvas><figcaption>${esc(cast[id].name)}</figcaption></figure>` : '').join('');
    }
    function drawChrome(b) {
      $('.rp-clock b').textContent = b.t || (b.kind === 'title' ? c.clock : b.kind === 'end' ? c.clock : '··:··');
      $('.rp-place strong').textContent = b.kind === 'end' ? 'Hiện trường lúc được phát hiện' : (b.place || c.location);
      $('.rp-title').classList.toggle('hidden', b.kind !== 'title');
      const card = $('.rp-card');
      card.classList.toggle('hidden', !b.card);
      stage.classList.toggle('carded', !!b.card);
      if (b.card) {
        card.innerHTML = `<span class="eyebrow">${esc(b.place || 'Cùng lúc đó')}</span><div class="rp-faces">${portraits(b.card)}</div>`;
        card.querySelectorAll('canvas').forEach(cv => P.portrait(cv, cast[cv.dataset.id].look, cast[cv.dataset.id].role === 'culprit' ? 'nervous' : 'neutral'));
      }
      drawEnd(b.kind === 'end');
      $('.rp-text').textContent = '';
      $('.rp-sr').textContent = b.text || '';
      $('.rp-clues').innerHTML = '';
      $('.rp-caption').classList.toggle('empty', !b.text);
      el.querySelectorAll('.rp-seg').forEach((s, k) => { s.classList.toggle('done', k < idx); s.classList.toggle('on', k === idx); s.firstChild.style.width = k < idx ? '100%' : '0'; });
      $('.rp-tags').innerHTML = '';
      tags = {};
    }
    function drawClues(b) {
      const box = $('.rp-clues');
      if (box.childElementCount || !(b.clues || []).length) return;
      box.innerHTML = b.clues.map(id => {
        const cl = clueOf(id);
        if (!cl) return '';
        const got = found.includes(id);
        return `<span class="rp-clue ${got ? 'got' : 'lost'}" title="${esc(cl.short)}"><b>${got ? '✓' : '✗'}</b>${esc(cl.label)}<small>${got ? 'Bạn đã thu thập' : 'Bạn đã bỏ lỡ'}</small></span>`;
      }).join('');
    }
    function drawEnd(show) {
      const end = $('.rp-end');
      end.classList.toggle('hidden', !show);
      if (!show) return;
      const cul = cast[c.solution.culprit];
      const got = filmClues.filter(id => found.includes(id)).length;
      end.innerHTML = `
        <div class="rp-end-card">
          <div class="rp-end-head"><canvas width="64" height="64"></canvas><div><span class="stamp">Hồ sơ đã đóng</span><h3>${esc(cul.name)}</h3></div></div>
          ${filmClues.length ? `<p class="rp-end-score">Bạn đã thu thập <b>${got}/${filmClues.length}</b> chứng cứ xuất hiện trong phim.</p>
          <div class="rp-end-list">${filmClues.map(id => `<span class="rp-clue ${found.includes(id) ? 'got' : 'lost'}"><b>${found.includes(id) ? '✓' : '✗'}</b>${esc(clueOf(id).label)}</span>`).join('')}</div>` : ''}
          <p class="rp-end-epi">${esc(c.solution.epilogue)}</p>
          <div class="rp-end-actions"><button class="primary-button rp-again">↺ Xem lại</button><button class="ghost-button rp-done">Đóng</button></div>
        </div>`;
      P.portrait(end.querySelector('canvas'), cul.look, 'angry');
      end.querySelector('.rp-again').onclick = () => { setPaused(false); go(0); };
      end.querySelector('.rp-done').onclick = close;
      end.querySelector('.rp-again').focus({ preventScroll: true });
    }

    // Bảng tên trên đầu nhân vật (bị phóng to cùng máy quay nên chia lại theo hệ số zoom)
    let tags = {};
    function drawTags(states) {
      const layer = $('.rp-tags');
      ids.forEach(id => {
        const st = states[id];
        const show = st && !st.hidden && st.pose !== 'body' && !beats[idx].card;
        let t = tags[id];
        if (!show) { if (t) t.hidden = true; return; }
        if (!t) { t = tags[id] = h(`<span class="rp-tag ${cast[id].role || ''}">${esc(cast[id].name)}</span>`); layer.appendChild(t); }
        t.hidden = false;
        const p = scene.screenOf(st.X, st.z, (st.e || 0) + (st.pose === 'sit' ? 1.4 : 1.8));
        t.style.left = (p.x * 100).toFixed(2) + '%';
        t.style.top = (p.y * 100).toFixed(2) + '%';
      });
    }

    function fx(kind) {
      if (REDUCED || !kind) return;
      const f = $('.rp-flashfx');
      f.classList.remove('on'); world.classList.remove('shake');
      void f.offsetWidth;   // chạy lại animation
      f.classList.add('on');
      if (kind === 'flash' || kind === 'shake') world.classList.add('shake');
    }

    // ---------- Vòng lặp ----------
    function tick(ts) {
      if (closed) return;
      const real = (ts - (last || ts)) / 1000, dt = Math.min(0.05, real);
      last = ts;
      const b = beats[idx];
      // Dòng thời gian theo giờ thật (máy yếu vẽ ít khung hình vẫn không làm phim chậm lại)
      if (!paused) tl += Math.min(0.25, real) * speed;
      scene.update(dt);
      // Đồ vật / hiệu ứng hẹn giờ trong khoảnh khắc
      (b.patch || []).forEach((pt, k) => { if (!applied.has('p' + k) && tl >= (pt.after || 0)) { applied.add('p' + k); applyPatch(pt); } });
      if (b.fx && !applied.has('fx') && tl >= (b.fxAt || 0)) { applied.add('fx'); fx(b.fx); }
      // Diễn viên
      const states = {};
      const list = [];
      ids.forEach(id => {
        const d = b.cast && b.cast[id];
        const st = states[id] = d ? actorAt(actors[id], d, tl) : actors[id];
        if (st.hidden) return;
        list.push({ type: 'cast', layer: 'floor', look: st.look, X: st.X, z: st.z, facing: st.facing, pose: st.pose, dir: st.dir, e: st.e, holding: st.holding, armsCrossed: st.armsCrossed, walking: st.walking, phase: st.phase, _key: st.sort != null ? st.sort : st.z + (st.pose === 'body' ? 0.5 : 0.05) + (st.e || 0) * 0.6 });
      });
      scene.props = base.filter(p => !p.hidden).concat(list);
      acc += dt;
      if (acc >= 1 / 30) { acc = 0; scene.draw(); }
      // Máy quay
      const k = ease(tl / CAM_EASE);
      camNow = { cx: camFrom.cx + (camTo.cx - camFrom.cx) * k, cy: camFrom.cy + (camTo.cy - camFrom.cy) * k, s: camFrom.s + (camTo.s - camFrom.s) * k };
      world.style.transform = `scale(${camNow.s}) translate(${(-(camNow.cx - 0.5 / camNow.s) * 100).toFixed(3)}%, ${(-(camNow.cy - 0.5 / camNow.s) * 100).toFixed(3)}%)`;
      world.style.setProperty('--inv', (1 / camNow.s).toFixed(3));
      drawTags(states);
      // Lời kể chữ chạy, xong thì hiện thẻ chứng cứ
      if (b.text) {
        const n = fullText ? b.text.length : Math.floor(tl * CHARS_PER_SEC);
        const shown = b.text.slice(0, n);
        const p = $('.rp-text');
        if (p.textContent !== shown) p.textContent = shown;
        if (n >= b.text.length) drawClues(b);
      }
      const seg = el.querySelectorAll('.rp-seg')[idx];
      if (seg && isFinite(b.dur_)) seg.firstChild.style.width = Math.min(100, tl / b.dur_ * 100).toFixed(1) + '%';
      if (tl >= b.dur_) go(idx + 1, true);
      raf = requestAnimationFrame(tick);
    }

    // ---------- Điều khiển ----------
    function setPaused(v) {
      paused = v;
      const b = $('.rp-play');
      b.textContent = v ? '▶' : '❚❚';
      b.setAttribute('aria-label', v ? 'Phát' : 'Tạm dừng');
      el.classList.toggle('paused', v);
      if (beats[idx].video) { if (v) video.pause(); else video.play().catch(() => {}); }
    }
    $('.rp-play').onclick = () => setPaused(!paused);
    $('.rp-prev').onclick = () => go(tl > 1.5 ? idx : idx - 1);
    $('.rp-next').onclick = () => go(idx + 1);
    $('.rp-speed').onclick = e => { speed = speed === 1 ? 2 : 1; e.currentTarget.textContent = speed + '×'; video.playbackRate = speed; };
    $('.rp-close').onclick = () => close();
    el.querySelectorAll('.rp-seg').forEach(s => s.onclick = () => go(+s.dataset.i));
    // Bấm vào lời kể: đang chạy chữ thì hiện hết, đã hết thì sang khoảnh khắc sau
    $('.rp-caption').onclick = () => {
      const b = beats[idx];
      if (!fullText && b.text && tl * CHARS_PER_SEC < b.text.length) fullText = true;
      else go(idx + 1, true);
    };
    function onKey(e) {
      if (e.key === 'Escape') close();
      else if (e.key === ' ' || e.key === 'k') { if (e.target.tagName === 'BUTTON' && e.key === ' ') return; setPaused(!paused); }
      else if (e.key === 'ArrowRight') go(idx + 1);
      else if (e.key === 'ArrowLeft') go(idx - 1);
      else return;
      e.preventDefault(); e.stopPropagation();
    }
    document.addEventListener('keydown', onKey, true);

    function close() {
      if (closed) return;
      closed = true;
      cancelAnimationFrame(raf);
      video.pause();
      document.removeEventListener('keydown', onKey, true);
      el.remove();
      if (opts.onClose) opts.onClose();
    }

    go(0);
    raf = requestAnimationFrame(tick);
    $('.rp-play').focus({ preventScroll: true });
    return close;
  }

  global.CaseReplay = { open };
})(window);
