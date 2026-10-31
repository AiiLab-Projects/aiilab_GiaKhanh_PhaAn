/* Hồ Sơ 13 — luồng trò chơi: chọn vụ án → hiện trường → thẩm vấn → suy luận → buộc tội
   Bố cục tham khảo các game trinh thám:
   - Túi chứng cứ luôn nằm dưới màn hình (Court Record của Ace Attorney, kho từ khoá của The Case of the Golden Idol)
   - Thẩm vấn kiểu visual novel: hộp thoại lớn có bảng tên, chữ chạy, bấm chứng cứ để "đưa ra"
   - Suy luận dạng phương trình [manh mối] + [manh mối] = kết luận, các ô chưa mở hiện "???"
   - Buộc tội trước hàng nhận diện (police line-up) có thước chiều cao */
(function () {
  'use strict';
  const CASES = (window.HS13 && window.HS13.cases) || [];
  const STORE_KEY = 'hoso13:v1';
  const root = document.getElementById('root');
  const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Lưu trữ (localStorage có thể bị chặn → luôn bọc try/catch) ----------
  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
  }
  const state = Object.assign({ name: '', tutorialSeen: false, cases: {}, lastCase: null }, load());
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* chế độ riêng tư: bỏ qua */ }
  }
  function progress(c) {
    // Luôn trả về CÙNG một object: nếu mỗi lần gọi lại tạo bản sao mới, những chỗ còn giữ bản cũ
    // (dòng thời gian, buộc tội) gán timeline/solved vào bản cũ và save() làm mất thay đổi đó.
    const p = state.cases[c.id] = state.cases[c.id] || {};
    const d = { found: [], deductions: [], notes: '', attempts: 0, solved: false, stress: {}, log: [], dialog: {}, spent: 0, broken: {}, tl: {}, timeline: false, ending: null };
    for (const k in d) if (p[k] === undefined) p[k] = d[k];
    p.stress = p.stress || {}; p.dialog = p.dialog || {}; p.broken = p.broken || {}; p.tl = p.tl || {}; p.spent = p.spent || 0;
    if (p.ending === 'escape') p.ending = null; // đã bỏ đồng hồ điều tra: mở lại các ván từng hết giờ
    return p;
  }

  // ---------- Tiện ích DOM ----------
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  function h(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const stars = n => '★'.repeat(n) + '☆'.repeat(Math.max(0, 3 - n));
  const DIFF = ['', 'Dễ', 'Vừa', 'Khó'];
  const PORTRAIT_BG = '#e9e2d4';
  function toast(msg, kind = '') {
    const box = document.getElementById('toasts');
    const el = h(`<div class="toast ${kind}">${msg}</div>`);
    box.appendChild(el);
    setTimeout(() => el.classList.add('out'), 2800);
    setTimeout(() => el.remove(), 3300);
  }
  function now() { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }

  // Ảnh hiện trường thu nhỏ: ảnh minh hoạ nếu hồ sơ có khối `art`, không thì dựng bằng PixelScene
  function stillOf(canvas, c) {
    if (SceneArt.has(c)) SceneArt.still(canvas, c).catch(() => PixelScene.still(canvas, c.spec, 1.4));
    else PixelScene.still(canvas, c.spec, 1.4);
  }

  // ---------- Màu chủ đạo theo từng hồ sơ ----------
  const BRAND = { accent: '#c0392b', accent2: '#2f6f86', soft: '#f6e1dc' };
  const themeOf = c => Object.assign({}, BRAND, c && c.theme);
  function applyTheme(c) {
    const t = themeOf(c);
    const s = document.documentElement.style;
    s.setProperty('--accent', t.accent);
    s.setProperty('--accent-2', t.accent2);
    s.setProperty('--accent-soft', t.soft);
  }

  // ---------- Điều hướng bằng #/ (nút Back của trình duyệt hoạt động) ----------
  const go = hash => { if (location.hash === hash) route(); else location.hash = hash; };
  function route() {
    closeModals();
    if (!state.name) return screenIntro();
    const parts = location.hash.replace(/^#\/?/, '').split('/');
    if (parts[0] === 'ho-so') {
      const c = CASES.find(x => x.id === parts[1]);
      if (c && !lockInfo(c)) {
        const tab = STEPS.some(t => t.id === parts[2]) ? parts[2] : 'scene';
        if (current && current.c === c && $('.case-app')) { current.tab = tab; renderSteps(); renderMode(); return; }
        return screenCase(c, tab);
      }
    }
    screenCabinet();
  }

  // ---------- Quản lý cảnh đang chạy ----------
  const running = new Set();
  function stopScenes() { running.forEach(s => s.stop()); running.clear(); }
  function run(scene) { running.add(scene); scene.start(); return scene; }

  let keyHandler = null;
  function setKeys(fn) {
    if (keyHandler) { document.removeEventListener('keydown', keyHandler.down); document.removeEventListener('keyup', keyHandler.up); }
    keyHandler = fn;
    if (fn) { document.addEventListener('keydown', fn.down); document.addEventListener('keyup', fn.up); }
  }

  const openModals = new Set();
  function closeModals() { Array.from(openModals).forEach(f => f()); }
  function modal(inner, { onClose, wide } = {}) {
    const back = h(`<div class="modal-back" role="dialog" aria-modal="true"><div class="modal ${wide ? 'wide' : ''}"><button class="modal-close" aria-label="Đóng">×</button></div></div>`);
    const box = $('.modal', back);
    box.appendChild(inner);
    const close = () => {
      if (!openModals.has(close)) return;
      openModals.delete(close);
      back.remove(); document.removeEventListener('keydown', onEsc, true);
      if (onClose) onClose();
    };
    const onEsc = e => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
    document.addEventListener('keydown', onEsc, true);
    $('.modal-close', back).onclick = close;
    back.addEventListener('click', e => { if (e.target === back) close(); });
    document.body.appendChild(back);
    openModals.add(close);
    const f = $('.primary-button, button, input, textarea', inner) || $('.modal-close', back);
    f.focus({ preventScroll: true });
    return close;
  }

  // ==================== MÀN HÌNH 1: GIỚI THIỆU ====================
  function screenIntro() {
    stopScenes(); setKeys(null); applyTheme(null); current = null;
    root.innerHTML = '';
    const el = h(`
      <section class="intro-screen">
        <div class="intro-photos" aria-hidden="true">${CASES.filter(c => !c.finale).map((c, i) => `<figure style="--r:${[-7, 5, -3, 8, -5][i % 5]}deg"><canvas></canvas><figcaption>#${esc(c.number)} ${esc(c.title)}</figcaption></figure>`).join('')}</div>
        <form class="intro-card">
          <span class="kicker">Phòng hồ sơ đặc biệt · Vạn Phúc 1999</span>
          <h1>Hồ Sơ <em>13</em></h1>
          <p>${CASES.length} vụ án chưa có lời giải đang chờ trên bàn. Mỗi hiện trường đều nói dối một chút. Bạn là người tìm ra sự thật.</p>
          <label for="agent-name">Tên điều tra viên</label>
          <input id="agent-name" maxlength="24" autocomplete="off" placeholder="Ví dụ: Trần Khánh" value="${esc(state.name)}">
          <button class="primary-button big" type="submit">Nhận nhiệm vụ <span>→</span></button>
          <small>Tiến độ được lưu trên trình duyệt này.</small>
        </form>
      </section>`);
    root.appendChild(el);
    $$('.intro-photos canvas', el).forEach((cv, i) => setTimeout(() => stillOf(cv, CASES.filter(c => !c.finale)[i]), 30 * i));
    const input = $('#agent-name', el);
    input.focus();
    $('form', el).onsubmit = e => {
      e.preventDefault();
      state.name = input.value.trim() || 'Điều tra viên';
      save();
      if (!state.tutorialSeen) tutorial(() => go('#/')); else go('#/');
    };
  }

  function tutorial(next) {
    const el = h(`
      <div class="tutorial">
        <span class="eyebrow">Hướng dẫn nhanh</span>
        <h2>Cách phá một vụ án</h2>
        <div class="tutorial-steps">
          <div><b>1</b><strong>Khám hiện trường</strong><p>Đi bằng WASD / phím mũi tên hoặc bấm vào sàn. Lại gần chỗ lấp lánh và bấm <kbd>E</kbd>, hoặc bấm thẳng vào đồ vật.</p></div>
          <div><b>2</b><strong>Thẩm vấn</strong><p>Hỏi ngoại phạm, quan hệ, đưa thẻ trong <b>túi chứng cứ</b>. Ở các vụ mới, bấm <b>Đối chất</b> để bắt mâu thuẫn từng câu khai.</p></div>
          <div><b>3</b><strong>Suy luận</strong><p>Ghép hai manh mối để mở suy luận, rồi xếp <b>dòng thời gian</b> cho đúng giờ.</p></div>
          <div><b>4</b><strong>Buộc tội</strong><p>Chỉ ra hung thủ và ba chứng cứ quyết định. Không giới hạn thời gian, nhưng bắt nhầm thì hồ sơ rẽ sang hướng khác.</p></div>
        </div>
        <button class="primary-button big">Bắt đầu <span>→</span></button>
      </div>`);
    const close = modal(el, { wide: true, onClose: () => { state.tutorialSeen = true; save(); next(); } });
    $('.primary-button', el).onclick = close;
  }

  // ==================== MÀN HÌNH 2: CHỌN VỤ ÁN ====================
  // Mạch truyện Hồ sơ 13: vụ cuối (finale) chỉ mở khi đã phá đủ số vụ khác
  const isSolved = c => !!(state.cases[c.id] && state.cases[c.id].solved);
  function lockInfo(c) {
    if (!c.unlockAfter) return null;
    const n = CASES.filter(x => !x.finale && isSolved(x)).length;
    return n >= c.unlockAfter ? null : { need: c.unlockAfter - n };
  }
  function caseStatus(c) {
    const lk = lockInfo(c);
    if (lk) return { cls: 'locked', text: `Khoá · phá thêm ${lk.need} vụ để mở`, pct: 0 };
    const p = state.cases[c.id];
    if (!p || (!p.found.length && !p.solved)) return { cls: 'new', text: 'Chưa mở', pct: 0 };
    if (p.solved) return { cls: 'solved', text: `Đã phá · hạng ${p.rank}`, pct: 100 };
    const pct = Math.round((p.found.length / c.clues.length) * 100);
    return { cls: 'open', text: `Đang điều tra · ${pct}%`, pct };
  }

  function menuBar(extra = '') {
    const initial = ((state.name || '?').trim().split(/\s+/).pop() || '?')[0];
    return `
      <header class="menu-bar">
        <button class="brand" title="Về danh sách vụ án"><span class="brand-mark">13</span><span><small>Phòng hồ sơ đặc biệt</small><strong>Hồ Sơ 13</strong></span></button>
        ${extra}
        <button class="agent" title="Đổi tên điều tra viên"><span class="avatar">${esc(initial)}</span><span class="agent-name">${esc(state.name)}</span></button>
      </header>`;
  }

  function screenCabinet() {
    stopScenes(); setKeys(null); current = null;
    root.innerHTML = '';
    const solved = CASES.filter(c => state.cases[c.id] && state.cases[c.id].solved).length;
    let idx = Math.max(0, CASES.findIndex(c => c.id === state.lastCase));
    const el = h(`
      <div class="select-screen">
        ${menuBar(`<div class="menu-stat"><span>Đã phá</span><b>${solved}/${CASES.length}</b><i><u style="width:${solved / CASES.length * 100}%"></u></i></div>`)}
        <div class="select-layout">
          <section class="feature" aria-live="polite"></section>
          <div class="case-list-wrap">
            <h2 class="list-title">Tủ hồ sơ <small>${CASES.length} vụ án</small></h2>
            <ol class="case-list"></ol>
            <section class="meta-board" aria-label="Mạch truyện Hồ sơ 13"></section>
          </div>
        </div>
      </div>`);
    root.appendChild(el);
    $('.brand', el).onclick = () => go('#/');
    $('.agent', el).onclick = screenIntro;
    const list = $('.case-list', el), feature = $('.feature', el);

    list.innerHTML = CASES.map((c, i) => {
      const st = caseStatus(c), t = themeOf(c);
      return `<li><button class="case-row ${st.cls}" data-i="${i}" style="--row:${t.accent}">
        <canvas aria-hidden="true"></canvas>
        <span class="row-text"><small>Hồ sơ #${esc(c.number)} · ${stars(c.difficulty)}</small><strong>${esc(c.title)}</strong><em>${esc(c.theme ? c.theme.mood : c.location)}</em></span>
        <span class="row-status ${st.cls}">${st.cls === 'solved' ? 'Hạng ' + esc(state.cases[c.id].rank) : st.cls === 'open' ? st.pct + '%' : st.cls === 'locked' ? '🔒' : 'Mới'}</span>
      </button></li>`;
    }).join('');
    $$('.case-row', list).forEach((b, i) => {
      setTimeout(() => stillOf($('canvas', b), CASES[i]), 20 + 40 * i);
      b.onclick = () => { if (idx === i) openCase(CASES[i]); else select(i); };
    });

    drawMeta($('.meta-board', el));

    function select(i) {
      idx = i;
      const c = CASES[i], st = caseStatus(c), p = state.cases[c.id];
      if (st.cls === 'locked') {
        applyTheme(c);
        $$('.case-row', list).forEach((b, j) => { b.classList.toggle('active', j === i); b.setAttribute('aria-current', j === i); });
        feature.innerHTML = `
          <div class="feature-art locked-art"><span class="feature-no">Hồ sơ #${esc(c.number)}</span><div class="lock-big">🔒<b>Hồ sơ niêm phong</b></div></div>
          <div class="feature-body">
            <div class="feature-pills"><span class="pill">Mạch truyện chính</span><span class="pill diff">${stars(c.difficulty)} ${DIFF[c.difficulty] || ''}</span></div>
            <h1>${c.titleHtml || esc(c.title)}</h1>
            <p class="feature-tag">${esc(c.lockedText || c.tagline)}</p>
            <div class="briefing-goal"><span>Điều kiện mở</span>Phá thêm ${lockInfo(c).need} vụ án nữa. Mỗi vụ đã phá trao cho bạn một mảnh của Hồ sơ 13.</div>
          </div>`;
        return;
      }
      state.lastCase = c.id; save();
      applyTheme(c);
      $$('.case-row', list).forEach((b, j) => { b.classList.toggle('active', j === i); b.setAttribute('aria-current', j === i); });
      feature.innerHTML = `
        <div class="feature-art">
          <canvas aria-hidden="true"></canvas>
          <span class="feature-no">Hồ sơ #${esc(c.number)}</span>
          ${st.cls === 'solved' ? '<span class="solved-stamp">Đã phá</span>' : ''}
        </div>
        <div class="feature-body">
          <div class="feature-pills"><span class="pill">${esc(c.theme ? c.theme.mood : c.location)}</span><span class="pill diff">${stars(c.difficulty)} ${DIFF[c.difficulty] || ''}</span></div>
          <h1>${c.titleHtml || esc(c.title)}</h1>
          <p class="feature-tag">${esc(c.tagline)}</p>
          <dl class="facts">
            <div><dt>Nạn nhân</dt><dd>${esc(c.victim.name)}</dd></div>
            <div><dt>Thời điểm</dt><dd>${esc(c.datetime)} · ${esc(c.clock)}</dd></div>
            <div><dt>Nghi phạm</dt><dd>${c.suspects.length} người</dd></div>
            <div><dt>Tiến độ</dt><dd>${esc(st.text)}</dd></div>
          </dl>
          <div class="feature-actions">
            <button class="primary-button big open-case">${st.cls === 'new' ? 'Bắt đầu điều tra' : st.cls === 'solved' ? 'Xem lại hồ sơ' : 'Tiếp tục điều tra'} <span>→</span></button>
            ${p ? '<button class="text-button reset">Xoá tiến độ</button>' : ''}
          </div>
        </div>`;
      stillOf($('canvas', feature), c);
      $('.open-case', feature).onclick = () => openCase(c);
      const rs = $('.reset', feature);
      if (rs) rs.onclick = () => {
        if (rs.dataset.armed) { delete state.cases[c.id]; save(); screenCabinet(); toast('Đã xoá tiến độ hồ sơ #' + c.number); }
        else { rs.dataset.armed = '1'; rs.textContent = 'Bấm lần nữa để xoá'; setTimeout(() => { if (rs.isConnected) { delete rs.dataset.armed; rs.textContent = 'Xoá tiến độ'; } }, 3000); }
      };
    }
    select(idx);

    setKeys({
      down: e => {
        if (document.querySelector('.modal-back') || /INPUT|TEXTAREA/.test(e.target.tagName)) return;
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          select((idx + (e.key === 'ArrowDown' ? 1 : CASES.length - 1)) % CASES.length);
          $$('.case-row', list)[idx].focus({ preventScroll: false });
        }
      },
      up: () => {}
    });
  }

  // ==================== HỒ SƠ: TÓM TẮT ====================
  let pendingBrief = null; // hiện tóm tắt sau khi màn chơi đã dựng xong (route() đóng mọi hộp thoại cũ)
  function drawMeta(box) {
    const parts = CASES.filter(c => c.meta && !c.finale);
    const got = parts.filter(isSolved).length;
    box.innerHTML = `<h2 class="list-title">Mạch truyện Hồ sơ 13 <small>${got}/${parts.length} mảnh</small></h2>
      <div class="meta-pieces">${parts.map(c => isSolved(c)
        ? `<button class="meta-piece got" data-id="${c.id}"><small>#${esc(c.number)}</small><strong>${esc(c.meta.title)}</strong></button>`
        : `<div class="meta-piece"><small>#${esc(c.number)}</small><strong>???</strong></div>`).join('')}</div>`;
    $$('.meta-piece.got', box).forEach(b => b.onclick = () => {
      const c = CASES.find(x => x.id === b.dataset.id);
      const m = h(`<div class="meta-note"><span class="eyebrow">Mảnh hồ sơ · vụ #${esc(c.number)} ${esc(c.title)}</span><h2>${esc(c.meta.title)}</h2><p>${esc(c.meta.fragment)}</p><button class="primary-button">Đóng</button></div>`);
      const close = modal(m);
      $('.primary-button', m).onclick = close;
    });
  }

  function openCase(c) {
    if (lockInfo(c)) { toast('Hồ sơ này còn niêm phong. Phá thêm ' + lockInfo(c).need + ' vụ để mở.'); return; }
    const p = state.cases[c.id];
    state.lastCase = c.id; save();
    if (!p || (!p.found.length && !p.solved)) pendingBrief = c;
    go('#/ho-so/' + c.id);
  }
  function briefing(c) {
    const el = h(`
      <div class="briefing">
        <div class="briefing-photo"><canvas aria-hidden="true"></canvas><span>Ảnh hiện trường · ${esc(c.clock)}</span></div>
        <div>
          <span class="eyebrow">Hồ sơ #${esc(c.number)} · ${esc(c.datetime)}</span>
          <h2>${c.titleHtml || esc(c.title)}</h2>
          ${c.briefing.map(t => `<p>${esc(t)}</p>`).join('')}
          <div class="briefing-victim"><span>Nạn nhân</span><strong>${esc(c.victim.name)}</strong><small>${esc(c.victim.desc)}</small></div>
          <div class="briefing-goal"><span>Nhiệm vụ</span>${esc(c.objective)}</div>
          <button class="primary-button big">Đến hiện trường <span>→</span></button>
        </div>
      </div>`);
    stillOf($('canvas', el), c);
    const close = modal(el, { wide: true });
    $('.primary-button', el).onclick = close;
  }

  // ==================== HỒ SƠ: MÀN CHƠI ====================
  const STEPS = [
    { id: 'scene', label: 'Khám hiện trường' },
    { id: 'interview', label: 'Thẩm vấn' },
    { id: 'board', label: 'Suy luận' },
    { id: 'conclude', label: 'Buộc tội' }
  ];
  let current = null; // { c, tab, suspect, scene, onPick, bagHint, chosen, slots }

  function screenCase(c, tab) {
    stopScenes(); setKeys(null); applyTheme(c);
    progress(c);
    current = { c, tab: tab || 'scene', suspect: c.suspects[0].id, chosen: [], slots: [] };
    root.innerHTML = '';
    const el = h(`
      <div class="game case-app">
        <header class="hud">
          <button class="hud-back" title="Về danh sách vụ án">←<span> Vụ án</span></button>
          <div class="hud-title"><small>Hồ sơ #${esc(c.number)} · ${esc(c.clock)} · ${esc(c.weather)}</small><strong>${esc(c.title)}</strong></div>
          <nav class="steps" aria-label="Các bước điều tra"></nav>
          <div class="hud-tools">
            <button class="hud-btn brief" title="Đọc lại hồ sơ vụ án">Hồ sơ</button>
            <button class="hud-btn nb-open" title="Mở sổ tay điều tra">Sổ tay</button>
          </div>
        </header>
        <main class="mode-area"></main>
        <footer class="bag-bar">
          <div class="bag-label"><b>Túi chứng cứ</b><small class="bag-hint"></small></div>
          <div class="bag" role="list"></div>
        </footer>
        <div class="drawer-back" hidden></div>
        <aside class="drawer" aria-label="Sổ tay điều tra" hidden></aside>
      </div>`);
    root.appendChild(el);
    $('.hud-back', el).onclick = () => go('#/');
    $('.brief', el).onclick = () => briefing(c);
    $('.nb-open', el).onclick = () => toggleDrawer(true);
    $('.drawer-back', el).onclick = () => toggleDrawer(false);
    renderSteps();
    renderMode();
    if (pendingBrief === c) { pendingBrief = null; briefing(c); }
  }

  function counts() {
    const { c } = current, p = progress(c);
    const vat = c.clues.filter(x => x.kind === 'vat');
    return { clues: p.found.length, cluesT: c.clues.length, vat: vat.filter(x => p.found.includes(x.id)).length, vatT: vat.length, ded: p.deductions.length, dedT: c.deductions.length };
  }

  function renderSteps() {
    const nav = $('.steps');
    if (!nav) return;
    const k = counts(), p = progress(current.c);
    const badge = { scene: `${k.vat}/${k.vatT}`, interview: `${Object.keys(p.dialog).filter(id => p.dialog[id].length).length}/${current.c.suspects.length}`, board: `${k.ded}/${k.dedT}${current.c.timeline ? (p.timeline ? ' · ⏱✓' : ' · ⏱') : ''}`, conclude: p.solved ? '✓' : '' };
    nav.innerHTML = STEPS.map((t, i) => `<button class="step ${current.tab === t.id ? 'active' : ''}" aria-current="${current.tab === t.id ? 'step' : 'false'}" data-tab="${t.id}"><span class="step-no">${i + 1}</span><span class="step-label">${t.label}</span>${badge[t.id] ? `<b>${badge[t.id]}</b>` : ''}</button>`).join('<i class="step-line" aria-hidden="true"></i>');
    $$('.step', nav).forEach(b => b.onclick = () => go(`#/ho-so/${current.c.id}/${b.dataset.tab}`));
  }

  function renderMode() {
    stopScenes(); setKeys(null);
    current.onPick = null; current.bagHint = ''; current.selectedIds = null;
    const area = $('.mode-area');
    area.innerHTML = '';
    area.className = 'mode-area mode-' + current.tab;
    const p = progress(current.c);
    ({ scene: modeScene, interview: modeInterview, board: modeBoard, conclude: modeAccuse })[current.tab](area);
    renderBag();
    renderDrawer();
  }

  function clueById(id) { return current.c.clues.find(x => x.id === id); }

  // Ghi một manh mối vào sổ. Trả về true nếu là manh mối mới.
  function record(id, source) {
    const p = progress(current.c);
    if (p.found.includes(id)) return false;
    const cl = clueById(id);
    if (!cl) return false;
    p.found.push(id);
    p.log.push({ t: now(), text: (cl.kind === 'loi' ? 'Lời khai: ' : 'Vật chứng: ') + cl.label + (source ? ' — ' + source : '') });
    save();
    toast(`<b>${cl.kind === 'loi' ? 'Lời khai mới' : 'Vật chứng mới'}</b> ${esc(cl.label)}`, cl.kind);
    renderSteps(); renderBag(id); renderDrawer();
    return true;
  }

  // ---------- Túi chứng cứ (luôn ở đáy màn hình) ----------
  function renderBag(freshId) {
    const bag = $('.bag');
    if (!bag) return;
    const { c } = current, p = progress(c);
    // Theo thứ tự thu được, để số trong túi trùng với biển số ngoài hiện trường
    const items = p.found.map(id => c.clues.find(x => x.id === id)).filter(Boolean);
    const sel = current.selectedIds ? current.selectedIds() : [];
    $('.bag-hint').textContent = current.bagHint || 'Bấm vào thẻ để xem lại';
    let vn = 0;
    bag.innerHTML = items.length ? items.map(x => {
      const tag = x.kind === 'vat' ? String(++vn) : '❝';
      return `<button class="chip ${x.kind} ${sel.includes(x.id) ? 'selected' : ''} ${x.id === freshId ? 'fresh' : ''}" role="listitem" data-id="${x.id}" title="${esc(x.short)}"><i>${tag}</i><span><strong>${esc(x.label)}</strong><small>${x.kind === 'loi' ? 'Lời khai' : 'Vật chứng'}</small></span></button>`;
    }).join('') : `<p class="bag-empty">Túi còn trống. Khám hiện trường để thu vật chứng đầu tiên.</p>`;
    $$('.chip', bag).forEach(b => b.onclick = () => (current.onPick || showClue)(b.dataset.id));
  }
  function flashBag() {
    const bar = $('.bag-bar');
    if (!bar) return;
    bar.classList.remove('pulse'); void bar.offsetWidth; bar.classList.add('pulse');
  }

  // Xem lại một manh mối (vật chứng thì kèm ảnh cận cảnh)
  function showClue(id) {
    const { c } = current, cl = clueById(id);
    if (!cl) return;
    const art = SceneArt.has(c);
    const spot = art ? c.art.spots[id] : (c.spec.hotspots || []).find(x => x.id === id);
    const box = h(`
      <div class="inspect ${spot ? '' : 'no-art'}">
        ${spot ? '<div class="inspect-art"><canvas></canvas><span class="tag">Cận cảnh</span></div>' : ''}
        <div class="inspect-copy">
          <span class="eyebrow">${cl.kind === 'loi' ? 'Lời khai' : 'Vật chứng'}</span>
          <h2>${esc(cl.label)}</h2>
          <p class="short">${esc(cl.short)}</p>
          <p>${esc(cl.detail)}</p>
          <div class="inspect-actions"><button class="primary-button">Đóng</button></div>
        </div>
      </div>`);
    if (spot && art) SceneArt.crop($('canvas', box), c, id);
    else if (spot) {
      const sc = PixelScene.still(document.createElement('canvas'), c.spec, 2.1);
      sc.snapshot($('canvas', box), spot.X, spot.z, spot.h || 0, spot.r || 0.5);
    }
    const close = modal(box, { wide: !!spot });
    $('.primary-button', box).onclick = close;
  }

  // ---------- Sổ tay (ngăn kéo bên phải) ----------
  function toggleDrawer(open) {
    const d = $('.drawer'), b = $('.drawer-back');
    if (!d) return;
    d.hidden = !open; b.hidden = !open;
    if (open) { renderDrawer(); d.focus && $('.drawer-close', d).focus(); }
  }
  function renderDrawer() {
    const aside = $('.drawer');
    if (!aside || !current) return;
    const { c } = current, p = progress(c), k = counts();
    aside.innerHTML = `
      <div class="drawer-head"><div><span class="eyebrow">Sổ tay điều tra</span><h2>${esc(state.name)}</h2></div><button class="drawer-close" aria-label="Đóng sổ tay">×</button></div>
      <div class="drawer-body">
        <div class="objective"><span>Nhiệm vụ</span><p>${esc(c.objective)}</p></div>
        <div class="meters">
          <div><span>Manh mối</span><b>${k.clues}/${k.cluesT}</b><i><u style="width:${k.clues / k.cluesT * 100}%"></u></i></div>
          <div><span>Suy luận</span><b>${k.ded}/${k.dedT}</b><i><u style="width:${k.ded / k.dedT * 100}%"></u></i></div>
        </div>
        <h3>Nghi phạm</h3>
        <ul class="nb-suspects">${c.suspects.map(s => { const v = p.stress[s.id] || 0, asked = (p.dialog[s.id] || []).length; return `<li><button data-id="${s.id}"><canvas width="64" height="64"></canvas><span><b>${esc(s.name)}</b><small>${esc(s.role)}</small></span><em class="${asked ? 'asked' : ''}">${asked ? 'Căng ' + v + '%' : 'Chưa hỏi'}</em></button></li>`; }).join('')}</ul>
        <h3>Nhật ký</h3>
        <ol class="timeline">${p.log.length ? p.log.slice().reverse().map(l => `<li><time>${esc(l.t)}</time><span>${esc(l.text)}</span></li>`).join('') : '<li class="pending">Chưa có ghi chép.</li>'}</ol>
        <h3>Ghi chú riêng</h3>
        <textarea rows="5" placeholder="Giả thuyết, nghi vấn, mốc giờ…">${esc(p.notes)}</textarea>
      </div>`;
    $('.drawer-close', aside).onclick = () => toggleDrawer(false);
    $('textarea', aside).oninput = e => { p.notes = e.target.value; save(); };
    $$('.nb-suspects button', aside).forEach(b => {
      const s = c.suspects.find(x => x.id === b.dataset.id);
      PixelPeople.portrait($('canvas', b), s.look, 'neutral', PORTRAIT_BG);
      b.onclick = () => { current.suspect = s.id; toggleDrawer(false); if (current.tab === 'interview') renderMode(); else go(`#/ho-so/${c.id}/interview`); };
    });
  }

  // ---------- Bước 1: hiện trường ----------
  function modeScene(area) {
    if (SceneArt.has(current.c)) return modeSceneArt(area);
    const { c } = current, p = progress(c);
    const el = h(`
      <div class="scene-layout">
        <div class="stage-wrap">
          <div class="stage" tabindex="0" aria-label="Hiện trường. Dùng phím mũi tên hoặc WASD để di chuyển, E để kiểm tra.">
            <canvas class="scene-canvas"></canvas>
            <div class="hotspots"></div>
            <div class="prompt hidden"></div>
            <div class="stage-tag">${esc(c.location)}</div>
          </div>
        </div>
        <aside class="side-card">
          <span class="eyebrow">Nhiệm vụ</span>
          <p class="side-goal">${esc(c.objective)}</p>
          <div class="big-count"><b class="vat-n"></b><span>/ <span class="vat-t"></span> vật chứng</span></div>
          <div class="bar"><u class="vat-bar"></u></div>
          <ul class="howto">
            <li><span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></span> Đi lại</li>
            <li><span class="mouse">Bấm sàn</span> Đi tới chỗ đó</li>
            <li><span><kbd>E</kbd></span> Kiểm tra đồ vật gần nhất</li>
          </ul>
          <label class="switch"><input type="checkbox" ${state.hints === false ? '' : 'checked'}><span></span> Hiện điểm lấp lánh</label>
          <button class="primary-button next-step">Sang thẩm vấn <span>→</span></button>
        </aside>
      </div>`);
    area.appendChild(el);
    const canvas = $('.scene-canvas', el), stage = $('.stage', el), hs = $('.hotspots', el), prompt = $('.prompt', el);
    const scene = new PixelScene(canvas, c.spec, { actor: true, hint: state.hints !== false });
    current.scene = scene;
    const discovered = () => p.found.filter(id => scene.hotspots.some(x => x.id === id));
    scene.setDiscovered(discovered());

    // Nút HTML đặt chồng lên từng điểm kiểm tra (truy cập bằng bàn phím / trình đọc màn hình)
    scene.hotspots.forEach(spot => {
      const cl = clueById(spot.id);
      const pos = scene.screenOf(spot.X, spot.z, spot.h || 0);
      const b = h(`<button class="hotspot" style="left:${(pos.x * 100).toFixed(2)}%;top:${(pos.y * 100).toFixed(2)}%" aria-label="Kiểm tra: ${esc(cl ? cl.label : spot.id)}"><span>${esc(cl ? cl.label : '')}</span></button>`);
      b.dataset.id = spot.id;
      b.onclick = e => { e.stopPropagation(); goInspect(spot); };
      hs.appendChild(b);
    });
    function refresh() {
      $$('.hotspot', hs).forEach(b => b.classList.toggle('done', p.found.includes(b.dataset.id)));
      const k = counts();
      $('.vat-n', el).textContent = k.vat; $('.vat-t', el).textContent = k.vatT;
      $('.vat-bar', el).style.width = (k.vat / k.vatT * 100) + '%';
      $('.next-step', el).classList.toggle('ready', k.vat === k.vatT);
    }
    refresh();

    function goInspect(spot) {
      const ap = scene.approachPoint(spot.X, spot.z);
      scene.walkTo(ap.X, ap.z, () => { scene.actor.facing = 'back'; inspect(spot); });
    }
    function inspect(spot) {
      const cl = clueById(spot.id);
      if (!cl) return;
      const isNew = record(spot.id, 'hiện trường');
      scene.setDiscovered(discovered());
      refresh();
      const n = discovered().indexOf(spot.id) + 1;
      const box = h(`
        <div class="inspect">
          <div class="inspect-art"><canvas></canvas><span class="tag">${n > 0 ? 'Vật chứng số ' + n : 'Cận cảnh'}</span></div>
          <div class="inspect-copy">
            <span class="eyebrow ${isNew ? 'new' : ''}">${isNew ? '● Vật chứng mới · đã cho vào túi' : 'Đã thu trước đó'}</span>
            <h2>${esc(cl.label)}</h2>
            <p class="short">${esc(cl.short)}</p>
            <p>${esc(cl.detail)}</p>
            <div class="inspect-actions"><button class="primary-button">Tiếp tục khám <span>→</span></button><button class="ghost-button ask">Hỏi nghi phạm về vật này</button></div>
          </div>
        </div>`);
      scene.hideActor = true; scene.draw();
      scene.snapshot($('canvas', box), spot.X, spot.z, spot.h || 0, spot.r || 0.5);
      scene.hideActor = false;
      scene.stop();
      const close = modal(box, { wide: true, onClose: () => { if (current && current.scene === scene && current.tab === 'scene') { scene.start(); stage.focus({ preventScroll: true }); } } });
      $('.primary-button', box).onclick = close;
      $('.ask', box).onclick = () => { close(); go(`#/ho-so/${c.id}/interview`); };
    }
    current.onPick = id => { const s = scene.hotspots.find(x => x.id === id); if (s) inspect(s); else showClue(id); };

    // Bấm vào sàn để đi tới
    stage.addEventListener('click', e => {
      if (e.target.closest('.hotspot')) return;
      const r = canvas.getBoundingClientRect();
      const sx = (e.clientX - r.left) / r.width * PixelScene.W, sy = (e.clientY - r.top) / r.height * PixelScene.H;
      if (sy <= scene.geo.horizon) return;
      const w = scene.geo.toWorld(sx, sy);
      scene.walkTo(w.X, w.z);
      stage.focus({ preventScroll: true });
    });

    const KEYMAP = { ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right', ArrowUp: 'up', w: 'up', W: 'up', ArrowDown: 'down', s: 'down', S: 'down' };
    const typing = e => /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || document.querySelector('.modal-back') || !$('.drawer').hidden;
    setKeys({
      down: e => {
        if (typing(e)) return;
        const k = KEYMAP[e.key];
        if (k) { scene.actor.keys.add(k); e.preventDefault(); return; }
        if (e.key === 'e' || e.key === 'E' || (e.key === 'Enter' && e.target === stage)) {
          const near = scene.nearestHotspot();
          if (near) { e.preventDefault(); scene.actor.keys.clear(); inspect(near); }
        }
      },
      up: e => { const k = KEYMAP[e.key]; if (k) scene.actor.keys.delete(k); }
    });
    window.addEventListener('blur', () => scene.actor && scene.actor.keys.clear(), { once: true });

    let lastNear = null;
    scene.onTick = () => {
      const near = scene.nearestHotspot();
      if (near !== lastNear) {
        lastNear = near;
        prompt.classList.toggle('hidden', !near);
        if (near) { const cl = clueById(near.id); prompt.innerHTML = `<kbd>E</kbd> ${esc(cl ? cl.label : 'Kiểm tra')}`; }
      }
      if (near) {
        const pos = scene.screenOf(scene.actor.X, scene.actor.z, 2.05);
        prompt.style.left = (pos.x * 100) + '%'; prompt.style.top = (pos.y * 100) + '%';
      }
    };

    $('.switch input', el).onchange = e => { state.hints = e.target.checked; scene.hint = state.hints; save(); };
    $('.next-step', el).onclick = () => go(`#/ho-so/${c.id}/interview`);
    current.bagHint = 'Bấm vào thẻ để xem lại cận cảnh';
    run(scene);
    stage.focus({ preventScroll: true });
  }

  // Hiện trường ảnh + bộ đồ pháp y: chọn dụng cụ, soi, rắc bột, rồi chụp ảnh để thu vật chứng
  function modeSceneArt(area) {
    const { c } = current, p = progress(c), a = c.art, T = SceneArt.TOOLS;
    const ids = Object.keys(a.spots).filter(id => clueById(id));
    const toolOf = id => SceneArt.toolOf(c, id);
    const keys = Object.keys(T);
    const el = h(`
      <div class="scene-layout">
        <div class="stage-wrap">
          <div class="stage forensic" data-tool="look" aria-label="Hiện trường. Chọn dụng cụ bằng phím 1 đến 4, bấm vào chỗ khả nghi để kiểm tra.">
            <canvas class="scene-canvas art-img" width="${a.w}" height="${a.h}"></canvas>
            <div class="markers" aria-hidden="true"></div>
            <div class="hotspots"></div>
            <div class="stage-tag">${esc(c.location)}</div>
            <div class="miss" aria-live="polite"></div>
          </div>
          <div class="toolbelt" role="toolbar" aria-label="Bộ đồ pháp y">
            ${keys.map((k, i) => `<button class="tool" data-tool="${k}" aria-pressed="${k === 'look'}"><b>${T[k].icon}</b><span>${T[k].name}</span><em class="tc"></em><kbd>${i + 1}</kbd></button>`).join('')}
          </div>
        </div>
        <aside class="side-card">
          <span class="eyebrow">Nhiệm vụ</span>
          <p class="side-goal">${esc(c.objective)}</p>
          <div class="big-count"><b class="vat-n"></b><span>/ <span class="vat-t"></span> vật chứng</span></div>
          <div class="bar"><u class="vat-bar"></u></div>
          <div class="tool-now"><b class="tn-icon"></b><div><strong class="tn-name"></strong><p class="tn-hint"></p></div></div>
          <p class="side-note">Tìm thấy dấu vết thì bấm <b>📷 Chụp ảnh</b> để đặt biển số và cho vào túi chứng cứ.</p>
          <label class="switch"><input type="checkbox" ${state.hints === false ? '' : 'checked'}><span></span> Hiện vòng gợi ý</label>
          <button class="primary-button next-step">Sang thẩm vấn <span>→</span></button>
        </aside>
      </div>`);
    area.appendChild(el);
    const stage = $('.stage', el), canvas = $('.scene-canvas', el), hs = $('.hotspots', el), marks = $('.markers', el), miss = $('.miss', el);
    let bench = null, tool = 'look', busy = false;
    const pct = (v, t) => (v / t * 100).toFixed(2) + '%';
    const order = () => p.found.filter(id => ids.includes(id));

    SceneArt.compose(c).then(L => {
      if (!stage.isConnected) return;
      bench = new SceneArt.Bench(canvas, c, L);
      ids.filter(id => toolOf(id) === 'print' && p.found.includes(id)).forEach(id => bench.dusted.add(id));
      bench.draw();
    });

    function setTool(t) {
      tool = t;
      stage.dataset.tool = t;
      $$('.tool', el).forEach(b => b.setAttribute('aria-pressed', b.dataset.tool === t));
      $('.tn-icon', el).textContent = T[t].icon; $('.tn-name', el).textContent = T[t].name; $('.tn-hint', el).textContent = T[t].hint;
      if (bench) bench.setTool(t);
      renderSpots();
    }
    // Nút trong suốt cho các điểm của dụng cụ đang cầm (bàn phím / trình đọc màn hình, vòng gợi ý)
    function renderSpots() {
      hs.innerHTML = '';
      ids.filter(id => toolOf(id) === tool && !p.found.includes(id)).forEach(id => {
        const [x, y, r] = a.spots[id];
        const b = h(`<button class="hotspot art-spot" style="left:${pct(x, a.w)};top:${pct(y, a.h)};--d:${pct(r * 2, a.w)}" aria-label="Kiểm tra điểm khả nghi"></button>`);
        b.onclick = e => { e.stopPropagation(); use(id, x, y); };
        hs.appendChild(b);
      });
    }
    function refresh() {
      const o = order();
      marks.innerHTML = o.map((id, i) => { const [x, y] = a.spots[id]; return `<span class="marker" style="left:${pct(x, a.w)};top:${pct(y, a.h)}">${i + 1}</span>`; }).join('');
      $$('.tool', el).forEach(b => {
        const t = b.dataset.tool, all = ids.filter(id => toolOf(id) === t), got = all.filter(id => p.found.includes(id));
        $('.tc', b).textContent = all.length ? `${got.length}/${all.length}` : '–';
        b.classList.toggle('clear', all.length > 0 && got.length === all.length);
      });
      const k = counts();
      $('.vat-n', el).textContent = k.vat; $('.vat-t', el).textContent = k.vatT;
      $('.vat-bar', el).style.width = (k.vat / k.vatT * 100) + '%';
      $('.next-step', el).classList.toggle('ready', k.vat === k.vatT);
      renderSpots();
    }
    function say(text, x, y) {
      miss.textContent = text;
      miss.style.left = pct(x, a.w); miss.style.top = pct(y, a.h);
      miss.classList.remove('show'); void miss.offsetWidth; miss.classList.add('show');
    }
    // Điểm gần nhất quanh (x, y) thuộc dụng cụ `t` (null = mọi dụng cụ)
    function hit(x, y, t) {
      let best = null, bd = Infinity;
      ids.forEach(id => {
        if (t && toolOf(id) !== t) return;
        const [sx, sy, r] = a.spots[id], d = Math.hypot(sx - x, sy - y);
        if (d <= Math.max(18, r) + 8 && d < bd) { best = id; bd = d; }
      });
      return best;
    }

    // Dùng dụng cụ đang cầm tại (x, y)
    function use(id, x, y) {
      if (busy) return;
      if (tool === 'print') {
        busy = true;
        const done = () => {
          busy = false;
          if (id) { bench && bench.dusted.add(id); inspect(id); }
          else say('Bột không bám dấu tay nào rõ', x, y);
        };
        if (bench) bench.brush(x, y, 650, done); else done();
        return;
      }
      if (id) return inspect(id);
      const other = hit(x, y, null);
      if (other && toolOf(other) === 'loupe' && tool === 'look') say('Chi tiết quá nhỏ, thử kính lúp 🔍', x, y);
      else say('Không thấy gì bất thường', x, y);
    }
    stage.addEventListener('pointermove', e => {
      if (!bench) return;
      const q = SceneArt.toImage(canvas, e);
      bench.point(q.x, q.y, q.inside);
      const id = hit(q.x, q.y, tool);
      stage.classList.toggle('hot', !!id && !p.found.includes(id));
    });
    stage.addEventListener('pointerleave', () => bench && bench.point(bench.px, bench.py, false));
    stage.addEventListener('click', e => {
      if (e.target.closest('.hotspot')) return;
      const q = SceneArt.toImage(canvas, e);
      if (bench) bench.point(q.x, q.y, true);
      use(hit(q.x, q.y, tool), q.x, q.y);
    });

    function inspect(id) {
      const cl = clueById(id);
      if (!cl) return;
      const had = p.found.includes(id), t = toolOf(id);
      const box = h(`
        <div class="inspect">
          <div class="inspect-art"><canvas></canvas><span class="tag">${T[t].icon} ${had ? 'Vật chứng số ' + (order().indexOf(id) + 1) : T[t].name}</span></div>
          <div class="inspect-copy">
            <span class="eyebrow ${had ? '' : 'new'}">${had ? 'Đã chụp và thu trước đó' : '● Phát hiện dấu vết'}</span>
            <h2>${esc(cl.label)}</h2>
            <p class="short">${esc(cl.short)}</p>
            <p>${esc(cl.detail)}</p>
            <div class="inspect-actions">${had
              ? '<button class="primary-button close-it">Tiếp tục khám <span>→</span></button><button class="ghost-button ask">Hỏi nghi phạm về vật này</button>'
              : '<button class="primary-button shoot">📷 Chụp ảnh &amp; đặt biển số</button><button class="ghost-button close-it">Để sau</button>'}</div>
          </div>
        </div>`);
      SceneArt.crop($('canvas', box), c, id);
      const close = modal(box, { wide: true, onClose: () => stage.isConnected && stage.focus({ preventScroll: true }) });
      $$('.close-it', box).forEach(b => { b.onclick = close; });
      const ask = $('.ask', box);
      if (ask) ask.onclick = () => { close(); go(`#/ho-so/${c.id}/interview`); };
      const shoot = $('.shoot', box);
      if (shoot) shoot.onclick = () => {
        close();
        record(id, 'hiện trường · ' + T[t].name.toLowerCase());
        if (bench) bench.shoot();
        refresh();
      };
    }
    current.onPick = id => (ids.includes(id) && p.found.includes(id) ? inspect(id) : showClue(id));

    $$('.tool', el).forEach(b => { b.onclick = () => setTool(b.dataset.tool); });
    setKeys({
      down: e => {
        if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || document.querySelector('.modal-back')) return;
        const i = Number(e.key) - 1;
        if (keys[i]) { setTool(keys[i]); e.preventDefault(); }
      },
      up: () => {}
    });
    const hintBox = $('.switch input', el);
    stage.classList.toggle('hints', state.hints !== false);
    hintBox.onchange = e => { state.hints = e.target.checked; stage.classList.toggle('hints', state.hints); save(); };
    $('.next-step', el).onclick = () => go(`#/ho-so/${c.id}/interview`);
    current.bagHint = 'Bấm vào thẻ để xem lại cận cảnh';
    setTool('look');
    refresh();
    stage.tabIndex = 0;
  }

  // ---------- Bước 2: thẩm vấn ----------
  // Phòng thẩm vấn dựng theo chất liệu hiện trường của chính vụ án
  const INTERVIEW_DECOR = {
    office: (c, rain) => [
      { type: 'window', X: 0.25, h: 0.95, w: 1.05, hh: 0.85, view: 'city', blinds: true, rain },
      { type: 'shelf', X: 2.75, h: 1.3, w: 0.9, items: 'mixed' },
      { type: 'coatrack', X: 3.7, z: 0.3, coat: '#6a5a4a' }
    ],
    backstage: () => [
      { type: 'poster', X: 0.3, h: 1.05, w: 0.55, hh: 0.75, color: '#8a2a3a' },
      { type: 'poster', X: 1.0, h: 1.15, w: 0.45, hh: 0.62, color: '#2a4a6a' },
      { type: 'coatrack', X: 3.6, z: 0.3, coat: '#7a1f2a', hat: '#2a2a2a' },
      { type: 'shelf', X: 2.75, h: 1.2, w: 0.8, items: 'bottles' }
    ],
    workshop: () => [
      { type: 'clock', X: 0.5, h: 1.6, r: 0.16, style: 'round', time: '22:15', stopped: true },
      { type: 'clock', X: 1.0, h: 1.3, r: 0.12, style: 'square', time: '22:15', stopped: true },
      { type: 'clock', X: 3.2, h: 1.55, r: 0.15, style: 'round', time: '22:15', stopped: true },
      { type: 'shelf', X: 2.6, h: 0.95, w: 1.0, items: 'clocks' }
    ],
    dining: () => [
      { type: 'window', X: 0.3, h: 0.95, w: 1.0, hh: 0.75, view: 'train', rain: true },
      { type: 'window', X: 2.7, h: 0.95, w: 1.0, hh: 0.75, view: 'train', rain: true }
    ]
  };
  function interviewSpec(c, s) {
    const iv = c.interview || {};
    const room = c.spec.room || {};
    const floor = Object.assign({}, room.floor); delete floor.runner;
    const rain = c.spec.weather === 'rain';
    const decor = (INTERVIEW_DECOR[iv.props] || INTERVIEW_DECOR.office)(c, rain);
    return {
      seed: 'tham-van-' + c.id + '-' + s.id,
      geometry: { width: 4, depth: 2.6, horizon: 78, top: 2, back: [70, 250], front: [-50, 370] },
      room: { wall: Object.assign({}, room.wall), floor },
      weather: rain ? 'rain' : undefined,
      ambient: [0.5, 0.49, 0.5],
      exposure: 1.4,
      lights: [
        { X: 2.0, z: 1.3, h: 2.1, r: 3.2, color: '#ffe2b0', intensity: 1.3, flicker: 0.03 },
        { X: 0.8, z: 0.3, h: 1.4, r: 2.2, color: '#bcd2ec', intensity: 0.45 }
      ],
      vignette: 0.3,
      props: decor.concat([
        { type: 'clock', X: 2.0, h: 2.15, r: 0.13, time: c.clock },
        { type: 'chair', X: 1.78, z: 0.85, facing: 'front', color: '#3a302c', block: false },
        { type: 'person', X: 2.0, z: 1.05, pose: 'sit', facing: 'front', look: s.look, idle: true },
        { type: 'table', X: 1.2, z: 1.3, w: 1.6, d: 0.75, color: '#6a523e', cloth: iv.props === 'dining' ? '#e8e2d2' : undefined },
        { type: 'papers', X: 1.65, z: 1.55, e: 0.77, n: 2, spread: 0.12 },
        { type: 'cup', X: 2.45, z: 1.5, e: 0.77, color: '#e8e0cc', liquid: '#3a2414' },
        { type: 'pendant', X: 2.0, z: 1.3, h: 2.1, shade: '#2f4a3a' }
      ])
    };
  }

  let typing = null;
  // Chữ chạy từng ký tự như hộp thoại game; bấm vào hộp để hiện hết ngay
  function typeText(el, text, done) {
    if (typing) { clearInterval(typing.timer); typing = null; }
    if (REDUCED || !text) { el.textContent = text; if (done) done(); return; }
    let i = 0;
    el.textContent = '';
    const t = { el, text, done, timer: setInterval(() => {
      i += 2;
      el.textContent = text.slice(0, i);
      if (i >= text.length) finishTyping();
    }, 22) };
    typing = t;
  }
  function finishTyping() {
    if (!typing) return;
    const t = typing; typing = null;
    clearInterval(t.timer); t.el.textContent = t.text;
    if (t.done) t.done();
  }

  function modeInterview(area) {
    const { c } = current, p = progress(c);
    const iv = c.interview || {};
    const el = h(`
      <div class="interview-layout">
        <nav class="suspect-rail" aria-label="Chọn nghi phạm"></nav>
        <div class="vn">
          <div class="vn-stage">
            <canvas class="scene-canvas"></canvas>
            <span class="stage-tag">${esc(iv.place || 'Phòng thẩm vấn')}</span>
            <div class="objection" aria-hidden="true">Mâu thuẫn!</div>
            <div class="vn-box" aria-live="polite">
              <div class="vn-face"><canvas width="64" height="64"></canvas></div>
              <div class="vn-main">
                <div class="vn-name"><strong></strong><small></small></div>
                <p class="vn-q"></p>
                <p class="vn-text"></p>
                <p class="vn-unlock hidden"></p>
              </div>
            </div>
          </div>
          <div class="vn-actions main-actions">
            <button class="act" data-act="alibi"><b>Hỏi ngoại phạm</b><span>${esc(iv.alibiQ || 'Đêm đó anh/chị ở đâu?')}</span></button>
            <button class="act" data-act="motive"><b>Hỏi quan hệ</b><span>${esc(iv.motiveQ || 'Quan hệ với nạn nhân thế nào?')}</span></button>
            <button class="act present" data-act="present"><b>Đưa chứng cứ</b><span>Bấm một thẻ trong túi chứng cứ bên dưới</span></button>
            <button class="act cross" data-act="cross"><b>Đối chất</b><span>Nghe lại từng câu khai và bắt mâu thuẫn</span></button>
            <div class="vn-meta">
              <div class="stress"><span>Căng thẳng</span><i><u></u></i><b></b></div>
              <button class="text-button history">Xem lịch sử hỏi cung</button>
            </div>
          </div>
          <div class="vn-actions cross-actions hidden">
            <button class="act" data-x="prev"><b>◀ Câu trước</b><span>Quay lại câu khai trước</span></button>
            <button class="act" data-x="press"><b>Hỏi vặn</b><span>Ép nghi phạm nói rõ hơn câu này</span></button>
            <button class="act present" data-x="object"><b>Phản bác!</b><span>Bấm thẻ chứng cứ mâu thuẫn trong túi bên dưới</span></button>
            <button class="act" data-x="next"><b>Câu sau ▶</b><span>Sang câu khai tiếp theo</span></button>
            <div class="vn-meta"><div class="cross-count"></div><button class="text-button exit-cross">Kết thúc đối chất</button></div>
          </div>
        </div>
      </div>`);
    area.appendChild(el);
    const rail = $('.suspect-rail', el);
    const sus = () => c.suspects.find(s => s.id === current.suspect);
    const moodOf = id => { const v = p.stress[id] || 0; return v >= 60 ? 'angry' : v >= 25 ? 'nervous' : 'neutral'; };

    function drawRail() {
      rail.innerHTML = c.suspects.map((s, i) => { const v = p.stress[s.id] || 0, asked = (p.dialog[s.id] || []).length; return `<button class="rail-card ${s.id === current.suspect ? 'selected' : ''}" data-id="${s.id}" aria-pressed="${s.id === current.suspect}"><canvas width="64" height="64"></canvas><span><small>Nghi phạm ${i + 1}</small><strong>${esc(s.name)}</strong><em>${esc(s.role)}</em></span><b class="${asked ? 'asked' : ''}">${asked ? v + '%' : 'Mới'}</b></button>`; }).join('');
      $$('.rail-card', rail).forEach(b => {
        const s = c.suspects.find(x => x.id === b.dataset.id);
        PixelPeople.portrait($('canvas', b), s.look, moodOf(s.id), PORTRAIT_BG);
        b.onclick = () => { if (current.suspect !== s.id) { current.suspect = s.id; drawAll(); } };
      });
    }
    function drawHead(mood) {
      const s = sus();
      $('.vn-name strong', el).textContent = s.name;
      $('.vn-name small', el).textContent = s.role;
      PixelPeople.portrait($('.vn-face canvas', el), s.look, mood || moodOf(s.id), PORTRAIT_BG);
      const v = Math.min(100, p.stress[s.id] || 0);
      $('.stress u', el).style.width = v + '%';
      $('.stress b', el).textContent = v + '%';
      const n = (p.dialog[s.id] || []).length / 2;
      $('.history', el).textContent = n ? `Xem lịch sử hỏi cung (${n})` : 'Chưa có lịch sử hỏi cung';
      $('.history', el).disabled = !n;
      const T = s.testimony || [];
      $('.act.cross', el).classList.toggle('hidden', !T.length);
      $('.main-actions', el).classList.toggle('has-cross', !!T.length);
      if (T.length) {
        const k = T.filter(x => x.contra).length, b = (p.broken[s.id] || []).length;
        $('.act.cross span', el).textContent = b ? `Đã bắt được ${b}/${k} mâu thuẫn` : 'Nghe lại từng câu khai và bắt mâu thuẫn';
      }
    }
    function showLine(q, a, unlock, animate) {
      $('.vn-q', el).textContent = q ? state.name + ': “' + q + '”' : '';
      const un = $('.vn-unlock', el);
      un.classList.add('hidden');
      const txt = $('.vn-text', el);
      const end = () => { if (unlock) { un.textContent = '+ Lời khai mới vào túi: ' + unlock; un.classList.remove('hidden'); } };
      if (animate) typeText(txt, a, end); else { txt.textContent = a; end(); }
    }
    function showLast() {
      const L = p.dialog[current.suspect] || [];
      if (L.length >= 2) showLine(L[L.length - 2].text, L[L.length - 1].text, L[L.length - 1].unlock, false);
      else showLine('', '“' + sus().intro + '”', null, false);
    }
    function say(q, a, m, unlock) {
      const L = p.dialog[current.suspect] = p.dialog[current.suspect] || [];
      L.push({ who: 'me', text: q }, { who: 'them', text: a, unlock });
      if (L.length > 60) L.splice(0, L.length - 60);
      save();
      drawHead(m); drawRail(); renderSteps(); renderDrawer();
      if (sus().look.photo) drawRoom(m);
      showLine(q, a, unlock, true);
    }
    // Nghi phạm có ảnh thật thì màn hình lớn hiện ảnh đó; còn lại vẽ phòng thẩm vấn pixel
    function drawRoom(mood) {
      stopScenes();
      const cv = $('.vn-stage canvas', el), s = sus();
      const room = () => { cv._photoReq = null; cv.classList.remove('art-img'); run(new PixelScene(cv, interviewSpec(c, s), { hint: false })); };
      if (!PixelPeople.stagePhoto(cv, s.look, mood || moodOf(s.id), () => { if (sus() === s) room(); })) room();
    }
    function drawAll() { cross = null; toggleCross(); drawRail(); drawHead(); showLast(); drawRoom(); }

    // ----- Đối chất: nghe từng câu khai, đưa chứng cứ vào đúng câu nói dối -----
    let cross = null;
    const testimony = () => sus().testimony || [];
    const brokenOf = id => (p.broken[id] = p.broken[id] || []);
    function toggleCross() {
      const on = cross != null;
      $('.main-actions', el).classList.toggle('hidden', on);
      $('.cross-actions', el).classList.toggle('hidden', !on);
      el.classList.toggle('crossing', on);
      current.bagHint = on ? 'Bấm thẻ chứng cứ mâu thuẫn với câu khai đang hiện' : 'Bấm một thẻ để đưa ra trước mặt nghi phạm';
      renderBag();
    }
    function showStatement(animate) {
      const s = sus(), T = testimony(), st = T[cross], done = brokenOf(s.id).includes(cross);
      $('.vn-q', el).textContent = `Lời khai ${cross + 1}/${T.length}${done ? ' · đã bị bác bỏ' : ''}`;
      $('.vn-unlock', el).classList.add('hidden');
      const txt = $('.vn-text', el);
      txt.classList.toggle('struck', done);
      if (animate) typeText(txt, '“' + st.text + '”'); else { finishTyping(); txt.textContent = '“' + st.text + '”'; }
      $('[data-x=prev]', el).disabled = cross === 0;
      $('[data-x=next]', el).disabled = cross === T.length - 1;
      $('.cross-count', el).innerHTML = `<b>Đối chất</b> Mâu thuẫn đã bắt: ${brokenOf(s.id).length}/${T.filter(x => x.contra).length}`;
    }
    function objection(ok) {
      const o = $('.objection', el), st = $('.vn-stage', el);
      o.textContent = ok ? 'Mâu thuẫn!' : 'Không khớp…';
      o.classList.toggle('miss', !ok);
      o.classList.remove('show'); st.classList.remove('jolt'); void o.offsetWidth;
      o.classList.add('show'); if (ok) st.classList.add('jolt');
    }
    $('.act.cross', el).onclick = () => { cross = 0; toggleCross(); drawHead(); showStatement(true); };
    $('.exit-cross', el).onclick = () => { cross = null; toggleCross(); drawHead(); showLast(); };
    $('[data-x=prev]', el).onclick = () => { if (cross > 0) { cross--; showStatement(true); } };
    $('[data-x=next]', el).onclick = () => { if (cross < testimony().length - 1) { cross++; showStatement(true); } };
    $('[data-x=object]', el).onclick = () => { flashBag(); if (!p.found.length) toast('Túi chứng cứ còn trống.'); };
    $('[data-x=press]', el).onclick = () => {
      const st = testimony()[cross];
      say('Nói rõ hơn đi: “' + st.text + '”', st.press || 'Tôi đã nói hết những gì tôi biết.', 'nervous');
    };
    function crossPick(id) {
      const s = sus(), st = testimony()[cross], cl = clueById(id);
      if (brokenOf(s.id).includes(cross)) { toast('Câu khai này đã bị bác bỏ. Sang câu khác.'); return; }
      const hits = [].concat(st.contra || []);
      if (hits.includes(id)) {
        brokenOf(s.id).push(cross);
        p.stress[s.id] = Math.min(100, (p.stress[s.id] || 0) + 30);
        p.log.push({ t: now(), text: `Bắt mâu thuẫn: ${s.name} — ${cl.label}` });
        objection(true);
        const fresh = st.unlock && !p.found.includes(st.unlock);
        setTimeout(() => {
          say(`Câu khai đó mâu thuẫn với ${cl.label}!`, st.broken, 'angry', fresh ? clueById(st.unlock).label : null);
          if (fresh) record(st.unlock, s.name);
          $('.vn-q', el).textContent = 'Lời khai ' + (cross + 1) + ' · bị bác bỏ';
          $('.cross-count', el).innerHTML = `<b>Đối chất</b> Mâu thuẫn đã bắt: ${brokenOf(s.id).length}/${testimony().filter(x => x.contra).length}`;
        }, 700);
      } else {
        objection(false);
        p.stress[s.id] = Math.max(0, (p.stress[s.id] || 0) - 8);
        say(`Câu khai đó mâu thuẫn với ${cl.label}!`, (s.deflect && s.deflect[Math.floor(Math.random() * s.deflect.length)]) || 'Cái đó thì liên quan gì tới điều tôi vừa nói? Anh/chị đang đoán mò.', 'neutral');
      }
    }

    // Bấm hộp thoại: đang chạy chữ thì hiện hết; đang đối chất thì quay về câu khai
    $('.vn-box', el).onclick = () => { if (typing) finishTyping(); else if (cross != null) showStatement(false); };
    $$('.main-actions .act:not(.cross)', el).forEach(b => b.onclick = () => {
      const s = sus();
      if (b.dataset.act === 'alibi') say(iv.alibiQ || 'Đêm xảy ra vụ việc, anh/chị ở đâu?', s.alibi);
      else if (b.dataset.act === 'motive') say(iv.motiveQ || 'Anh/chị quan hệ với nạn nhân thế nào?', s.motive);
      else { flashBag(); if (!p.found.length) toast('Túi chứng cứ còn trống. Hãy khám hiện trường trước.'); }
    });
    $('.history', el).onclick = () => {
      const s = sus(), L = p.dialog[s.id] || [];
      const box = h(`<div class="history-box"><span class="eyebrow">Biên bản hỏi cung</span><h2>${esc(s.name)}</h2><div class="dialogue-log">${L.map(l => `<div class="bubble ${l.who}"><b>${l.who === 'me' ? esc(state.name) : esc(s.name)}</b><p>${esc(l.text)}</p>${l.unlock ? `<em>+ Lời khai mới: ${esc(l.unlock)}</em>` : ''}</div>`).join('')}</div></div>`);
      modal(box, { wide: true });
      const log = $('.dialogue-log', box); log.scrollTop = log.scrollHeight;
    };

    current.bagHint = 'Bấm một thẻ để đưa ra trước mặt nghi phạm';
    current.onPick = id => {
      if (cross != null) return crossPick(id);
      const s = sus(), cl = clueById(id);
      const r = s.presents && s.presents[id];
      const q = `Anh/chị giải thích thế nào về: ${cl.label}?`;
      if (r) {
        p.stress[s.id] = Math.min(100, (p.stress[s.id] || 0) + (r.mood === 'angry' ? 25 : r.mood === 'nervous' ? 18 : 8));
        const fresh = r.unlock && !p.found.includes(r.unlock);
        say(q, r.line, r.mood || moodOf(s.id), fresh ? clueById(r.unlock).label : null);
        if (fresh) record(r.unlock, s.name);
      } else {
        const fb = s.fallback || ['Tôi không biết gì về chuyện đó.'];
        say(q, fb[Math.floor(Math.random() * fb.length)]);
      }
    };
    drawAll();
  }

  // ---------- Bước 3: suy luận ----------
  function modeBoard(area) {
    const { c } = current, p = progress(c);
    current.slots = [];
    const el = h(`
      <div class="think-layout">
        <section class="think-card">
          <span class="eyebrow">Phòng suy luận</span>
          <h2>Ghép hai manh mối</h2>
          <p class="think-sub">Chọn hai thẻ trong túi chứng cứ bên dưới. Nếu chúng cùng chỉ ra một điều, bạn sẽ mở được một suy luận.</p>
          <div class="equation">
            <button class="slot" data-i="0"></button>
            <span class="op">+</span>
            <button class="slot" data-i="1"></button>
            <span class="op">=</span>
            <div class="answer"></div>
          </div>
        </section>
        <section class="ded-section">
          <h3>Suy luận của vụ án <small class="ded-count"></small></h3>
          <div class="ded-grid"></div>
        </section>
        ${c.timeline ? `<section class="ded-section tl-section">
          <h3>Dòng thời gian <small class="tl-state"></small></h3>
          <p class="think-sub">${esc(c.timeline.intro || 'Xếp các sự kiện vào đúng mốc giờ. Mỗi sự kiện chỉ hiện ra khi bạn đã có manh mối tương ứng.')}</p>
          <ol class="tl-track"></ol>
          <div class="tl-pool"></div>
          <div class="tl-actions"><button class="primary-button tl-check">Kiểm tra dòng thời gian</button><span class="tl-msg" aria-live="polite"></span></div>
        </section>` : ''}
      </div>`);
    area.appendChild(el);

    function drawSlots(result) {
      $$('.slot', el).forEach((b, i) => {
        const id = current.slots[i], cl = id && clueById(id);
        b.className = 'slot' + (cl ? ' filled ' + cl.kind : '');
        b.innerHTML = cl ? `<small>${cl.kind === 'loi' ? 'Lời khai' : 'Vật chứng'}</small><strong>${esc(cl.label)}</strong><em>Bấm để bỏ ra</em>` : `<small>Manh mối ${i + 1}</small><strong>?</strong><em>Chọn trong túi</em>`;
      });
      const ans = $('.answer', el);
      if (!result) { ans.className = 'answer'; ans.innerHTML = '<strong>?</strong><small>Suy luận</small>'; }
      else if (result.miss) { ans.className = 'answer miss'; ans.innerHTML = '<strong>Chưa khớp</strong><small>Hai manh mối này chưa nói lên điều gì. Thử cặp khác.</small>'; }
      else { ans.className = 'answer hit'; ans.innerHTML = `<strong>${esc(result.d.title)}</strong><small>${esc(result.d.text)}</small>`; }
    }
    function drawDeductions(freshIdx) {
      $('.ded-count', el).textContent = `${p.deductions.length} / ${c.deductions.length}`;
      $('.ded-grid', el).innerHTML = c.deductions.map((d, i) => {
        const n = p.deductions.indexOf(i);
        if (n < 0) return `<div class="ded locked"><span class="num">?</span><div><b>Suy luận chưa mở</b><p>Cần ghép đúng hai manh mối.</p></div></div>`;
        return `<div class="ded ${i === freshIdx ? 'fresh' : ''}"><span class="num">✓</span><div><b>${esc(d.title)}</b><p>${esc(d.text)}</p><small>${esc(clueById(d.a).label)} + ${esc(clueById(d.b).label)}</small></div></div>`;
      }).join('');
    }
    function evaluate() {
      if (current.slots.length < 2) return drawSlots(null);
      const [a, b] = current.slots;
      const di = c.deductions.findIndex(d => (d.a === a && d.b === b) || (d.a === b && d.b === a));
      if (di < 0) return drawSlots({ miss: true });
      const d = c.deductions[di];
      drawSlots({ d });
      if (!p.deductions.includes(di)) {
        p.deductions.push(di);
        p.log.push({ t: now(), text: 'Suy luận: ' + d.title });
        save(); drawDeductions(di); renderSteps(); renderDrawer();
        toast(`<b>Suy luận mới</b> ${esc(d.title)}`, 'ded');
      }
    }
    $$('.slot', el).forEach(b => b.onclick = () => {
      const i = +b.dataset.i;
      if (current.slots[i]) { current.slots.splice(i, 1); renderBag(); evaluate(); }
      else flashBag();
    });
    current.bagHint = 'Bấm thẻ để đặt vào phương trình (bấm lại để bỏ ra)';
    current.selectedIds = () => current.slots;
    current.onPick = id => {
      const i = current.slots.indexOf(id);
      if (i >= 0) current.slots.splice(i, 1);
      else { if (current.slots.length >= 2) current.slots.shift(); current.slots.push(id); }
      renderBag(); evaluate();
    };
    drawSlots(null);
    drawDeductions();
    if (c.timeline) timelineBoard($('.tl-section', el), c, p);
  }

  // ---------- Dòng thời gian (kiểu The Case of the Golden Idol): kéo hoặc bấm sự kiện rồi bấm mốc giờ ----------
  function timelineBoard(box, c, p) {
    const T = c.timeline, ev = id => T.events.find(e => e.id === id);
    const ready = e => [].concat(e.need || []).every(id => p.found.includes(id));
    let sel = null;
    function place(slot, id) {
      if (p.timeline) return;
      Object.keys(p.tl).forEach(k => { if (p.tl[k] === id) delete p.tl[k]; });
      if (id) p.tl[slot] = id; else delete p.tl[slot];
      sel = null; save(); draw();
    }
    function draw() {
      const placed = Object.values(p.tl);
      $('.tl-state', box).textContent = p.timeline ? '✓ Đã dựng xong' : `${placed.length}/${T.slots.length} mốc`;
      $('.tl-track', box).innerHTML = T.slots.map((sl, i) => {
        const e = p.tl[i] && ev(p.tl[i]);
        return `<li><time>${esc(sl.t)}</time><button class="tl-slot ${e ? 'filled' : ''} ${p.timeline ? 'done' : ''}" data-i="${i}">${e ? esc(e.text) : '<em>Thả sự kiện vào đây</em>'}</button></li>`;
      }).join('');
      const pool = T.events.filter(e => !placed.includes(e.id));
      $('.tl-pool', box).innerHTML = p.timeline ? '' : pool.map(e => ready(e)
        ? `<button class="tl-event ${sel === e.id ? 'selected' : ''}" draggable="true" data-id="${e.id}">${esc(e.text)}</button>`
        : `<div class="tl-event locked">Sự kiện chưa rõ — cần thêm manh mối</div>`).join('');
      $('.tl-check', box).disabled = p.timeline || placed.length < T.slots.length;
      $('.tl-check', box).classList.toggle('hidden', !!p.timeline);
      if (p.timeline) $('.tl-msg', box).textContent = T.done || 'Dòng thời gian khớp với mọi chứng cứ.';
      $$('.tl-event[data-id]', box).forEach(b => {
        b.onclick = () => { sel = sel === b.dataset.id ? null : b.dataset.id; draw(); };
        b.ondragstart = e => { e.dataTransfer.setData('text/plain', b.dataset.id); };
      });
      $$('.tl-slot', box).forEach(b => {
        const i = b.dataset.i;
        b.onclick = () => { if (sel) place(i, sel); else if (p.tl[i]) place(i, null); };
        b.ondragover = e => { e.preventDefault(); b.classList.add('over'); };
        b.ondragleave = () => b.classList.remove('over');
        b.ondrop = e => { e.preventDefault(); const id = e.dataTransfer.getData('text/plain'); if (id) place(i, id); };
      });
    }
    $('.tl-check', box).onclick = () => {
      const ok = T.slots.filter((sl, i) => { const e = p.tl[i] && ev(p.tl[i]); return e && e.slot === i; }).length;
      const msg = $('.tl-msg', box);
      if (ok === T.slots.length) {
        p.timeline = true;
        p.log.push({ t: now(), text: 'Dựng xong dòng thời gian' });
        save(); renderSteps(); renderDrawer();
        toast('<b>Dòng thời gian hoàn chỉnh</b> Các mốc giờ đã khớp với chứng cứ', 'ded');
      } else {
        msg.textContent = `Mới khớp ${ok}/${T.slots.length} mốc. Có sự kiện đang nằm sai giờ.`;
        box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake');
      }
      draw();
    };
    draw();
  }

  // ---------- Bước 4: buộc tội ----------
  // ---------- Kết thúc khi bắt nhầm người ----------
  function endingModal(c, who) {
    const E = c.endings || {};
    const wrong = c.suspects.find(s => s.id === who);
    const el = h(`
      <div class="ending ending-wrong">
        <canvas class="ending-face" width="64" height="64"></canvas>
        <div>
          <span class="eyebrow">Kết thúc · Bắt nhầm người</span>
          <h2>${esc(wrong.name)} bị tạm giam</h2>
          <p>${esc((E.wrong && E.wrong[who]) || E.wrongDefault || 'Người bị bắt có ngoại phạm vững chắc. Viện kiểm sát trả hồ sơ, còn hung thủ thật có thêm thời gian.')}</p>
          <div class="closed-actions"><button class="primary-button big">Tiếp tục điều tra <span>→</span></button></div>
        </div>
      </div>`);
    PixelPeople.portrait($('.ending-face', el), wrong.look, 'angry', PORTRAIT_BG);
    $('.primary-button', el).onclick = modal(el, { wide: true });
  }

  function score(c, p, matched) {
    const k = counts();
    const raw = 40 + 10 * matched + 20 * (k.ded / k.dedT) + 10 * (k.clues / k.cluesT) - 10 * p.attempts;
    const s = Math.max(0, Math.min(100, Math.round(raw)));
    return { s, rank: s >= 90 ? 'S' : s >= 75 ? 'A' : s >= 60 ? 'B' : 'C' };
  }

  function modeAccuse(area) {
    const { c } = current, p = progress(c);
    if (p.solved) return solvedView(area);
    current.chosen = current.chosen || [];
    const el = h(`
      <div class="accuse-layout">
        <section class="lineup-card">
          <div class="lineup-head"><span class="eyebrow">Bước cuối · ${esc(c.question)}</span><h2>Chỉ ra hung thủ</h2></div>
          <div class="lineup">${c.suspects.map((s, i) => `<button class="person" data-id="${s.id}" aria-pressed="false"><canvas width="64" height="64"></canvas><span class="plate">${i + 1}</span><strong>${esc(s.name)}</strong><small>${esc(s.role)}</small></button>`).join('')}</div>
        </section>
        <section class="charge-card">
          <span class="eyebrow">Biên bản buộc tội</span>
          <h2>Chứng cứ quyết định</h2>
          <p class="charge-sub">Chọn tối đa 3 thẻ trong túi chứng cứ. Cần đúng hung thủ và ít nhất 2 chứng cứ then chốt.</p>
          <div class="ev-slots"></div>
          <div class="result-box hidden"></div>
          <button class="primary-button big accuse" disabled>Buộc tội <span>→</span></button>
          <small class="attempts">Lần buộc tội sai: ${p.attempts} (mỗi lần trừ 10 điểm)</small>
        </section>
      </div>`);
    area.appendChild(el);
    let culprit = current.culprit || null;
    function drawSel() {
      $$('.person', el).forEach(b => { const on = b.dataset.id === culprit; b.classList.toggle('selected', on); b.setAttribute('aria-pressed', on); });
      $('.ev-slots', el).innerHTML = [0, 1, 2].map(i => {
        const cl = current.chosen[i] && clueById(current.chosen[i]);
        return cl ? `<button class="ev-slot filled ${cl.kind}" data-id="${cl.id}"><small>${cl.kind === 'loi' ? 'Lời khai' : 'Vật chứng'}</small><strong>${esc(cl.label)}</strong><em>Bấm để bỏ</em></button>` : `<div class="ev-slot"><small>Chứng cứ ${i + 1}</small><strong>Chọn trong túi ↓</strong></div>`;
      }).join('');
      $$('.ev-slot.filled', el).forEach(b => b.onclick = () => current.onPick(b.dataset.id));
      $('.accuse', el).disabled = !culprit; // luôn cho buộc tội; đúng hay sai do hung thủ và chứng cứ quyết định
    }
    $$('.person', el).forEach(b => {
      PixelPeople.portrait($('canvas', b), c.suspects.find(s => s.id === b.dataset.id).look, 'neutral', PORTRAIT_BG);
      b.onclick = () => { culprit = current.culprit = b.dataset.id; drawSel(); };
    });
    current.bagHint = 'Bấm thẻ để chọn làm chứng cứ buộc tội (tối đa 3)';
    current.selectedIds = () => current.chosen;
    current.onPick = id => {
      const i = current.chosen.indexOf(id);
      if (i >= 0) current.chosen.splice(i, 1);
      else if (current.chosen.length >= 3) { toast('Chỉ chọn tối đa 3 chứng cứ.'); return; }
      else current.chosen.push(id);
      renderBag(); drawSel();
    };
    drawSel();

    const res = $('.result-box', el);
    $('.accuse', el).onclick = () => {
      const ev = current.chosen.slice();
      const matched = ev.filter(id => c.solution.evidence.includes(id)).length;
      res.classList.remove('hidden');
      if (culprit === c.solution.culprit && matched >= 2) {
        const sc = score(c, p, matched);
        Object.assign(p, { solved: true, score: sc.s, rank: sc.rank, solvedAt: new Date().toISOString() });
        p.log.push({ t: now(), text: `Phá án — hạng ${sc.rank} (${sc.s} điểm)` });
        save(); renderDrawer(); renderSteps();
        area.innerHTML = '';
        current.onPick = null; current.selectedIds = null; current.bagHint = '';
        renderBag();
        solvedView(area, true);
        return;
      }
      p.attempts++;
      save();
      if (c.endings && culprit !== c.solution.culprit) {
        p.log.push({ t: now(), text: 'Bắt nhầm: ' + c.suspects.find(s => s.id === culprit).name });
        res.classList.add('hidden');
        $('.attempts', el).textContent = `Lần buộc tội sai: ${p.attempts} (mỗi lần trừ 10 điểm)`;
        endingModal(c, culprit);
        return;
      }
      $('.attempts', el).textContent = `Lần buộc tội sai: ${p.attempts} (mỗi lần trừ 10 điểm)`;
      const missing = c.deductions.length - p.deductions.length;
      let msg;
      if (culprit !== c.solution.culprit && matched >= 2) msg = 'Chứng cứ của bạn có sức nặng, nhưng chúng không chỉ về người này. Hãy đọc lại các suy luận.';
      else if (culprit !== c.solution.culprit) msg = 'Viện kiểm sát trả hồ sơ: lập luận không đứng vững. Người này có thể vô can.';
      else msg = 'Có thể bạn đã chỉ đúng người, nhưng chứng cứ chưa đủ để buộc tội. Chọn những chứng cứ phá được ngoại phạm hoặc chứng minh động cơ.';
      if (missing > 0) msg += ` Gợi ý: còn ${missing} suy luận chưa mở.`;
      res.className = 'result-box wrong';
      res.textContent = 'Buộc tội sai. ' + msg;
    };
  }

  function solvedView(area, fresh) {
    const { c } = current, p = progress(c);
    const cul = c.suspects.find(s => s.id === c.solution.culprit);
    const next = CASES.find(x => !(state.cases[x.id] && state.cases[x.id].solved) && x !== c);
    const el = h(`
      <div class="closed">
        <div class="closed-card">
          <div class="closed-head">
            <canvas class="closed-face" width="64" height="64"></canvas>
            <div class="closed-who"><span class="stamp">${fresh ? 'Đã phá án' : 'Hồ sơ đã đóng'}</span><h2>${esc(cul.name)}</h2><small>${esc(cul.role)}</small></div>
            <div class="rank rank-${esc(p.rank)}"><small>Hạng</small>${esc(p.rank)}</div>
          </div>
          <div class="score-grid">
            <div><span>Điểm</span><b>${p.score}</b></div>
            <div><span>Manh mối</span><b>${p.found.length}/${c.clues.length}</b></div>
            <div><span>Suy luận</span><b>${p.deductions.length}/${c.deductions.length}</b></div>
            <div><span>Lần sai</span><b>${p.attempts}</b></div>
          </div>
          <h3>Diễn biến thật</h3>
          <p>${esc(c.solution.summary)}</p>
          <h3>Hậu kỳ</h3>
          <p class="epilogue">${esc(c.solution.epilogue)}</p>
          <button class="replay-cta"><span class="replay-play">▶</span><span><b>Xem tái hiện vụ án</b><small>Phim ngắn dựng lại diễn biến thật, từng khoảnh khắc</small></span></button>
          <div class="closed-actions">${next ? `<button class="primary-button big next-case">Vụ tiếp theo: ${esc(next.title)} <span>→</span></button>` : ''}<button class="ghost-button to-list">Về danh sách vụ án</button></div>
        </div>
      </div>`);
    area.appendChild(el);
    PixelPeople.portrait($('.closed-face', el), cul.look, 'angry', PORTRAIT_BG);
    $('.to-list', el).onclick = () => go('#/');
    $('.replay-cta', el).onclick = () => openReplay(c);
    const nx = $('.next-case', el);
    if (nx) nx.onclick = () => openCase(next);
    if (fresh) {
      toast(`<b>Phá án thành công</b> Hạng ${esc(p.rank)} · ${p.score} điểm`, 'ded');
      // Tự chiếu phim tái hiện, trừ khi người chơi đã rời màn này
      setTimeout(() => { if (current && current.c === c && current.tab === 'conclude' && !openModals.size) openReplay(c); }, 1400);
    }
  }

  // Phim tái hiện vụ án (js/engine/replay.js); đăng ký như một hộp thoại để route() đóng được
  function openReplay(c) {
    const close = CaseReplay.open(c, { found: progress(c).found, onClose: () => openModals.delete(close) });
    openModals.add(close);
  }

  // ---------- Khởi động ----------
  if (!CASES.length) { root.textContent = 'Không tìm thấy hồ sơ nào.'; return; }
  window.addEventListener('hashchange', route);
  route();
})();
