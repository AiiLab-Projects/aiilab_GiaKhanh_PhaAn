(() => {
  const caseWindow = document.querySelector('#ballroom-case');
  const openButton = document.querySelector('#open-ballroom-case');
  const closeButton = document.querySelector('#close-ballroom-case');
  const readout = document.querySelector('#ballroom-readout');
  const clueList = document.querySelector('#ballroom-clue-list');
  const clueCount = document.querySelector('#ballroom-clue-count');
  const testimony = document.querySelector('#ballroom-testimony');
  const result = document.querySelector('#ballroom-result');
  const clues = [
    { id: 'victim', name: 'Khám nghiệm Dương Khải', location: 'Nạn nhân / thảm đỏ', detail: 'Không có vết thương ngoài. Bác sĩ xác nhận nạn nhân tử vong do chất độc tác dụng nhanh, khoảng vài phút sau khi uống.' },
    { id: 'glass', name: 'Ly pha lê', location: 'Bàn tiệc bên trái', detail: 'Cặn còn lại trong ly có dấu vết độc chất. Vết lau trên miệng ly cho thấy hung thủ đã cố xóa dấu vân tay.' },
    { id: 'microphone', name: 'Micro sân khấu', location: 'Sân khấu', detail: 'Bản ghi thử âm lưu lại cuộc tranh cãi giữa Khải và quản lý Bảo Ngọc về cuốn sổ quỹ bị thất lạc.' },
    { id: 'placecard', name: 'Thẻ chỗ ngồi bị đổi', location: 'Bàn tiệc bên phải', detail: 'Thẻ tên của Khải bị chuyển sang chiếc bàn khuất camera. Sơ đồ sắp chỗ do chính quản lý sự kiện duyệt.' },
    { id: 'curtain', name: 'Dấu vết cánh gà', location: 'Rèm sân khấu', detail: 'Một sợi chỉ nhung đỏ mắc ở lối đi hậu trường. Nó trùng với áo khoác của Bảo Ngọc, người nói rằng cả tối không rời bàn điều phối.' },
    { id: 'footprint', name: 'Dấu giày trên thảm', location: 'Rìa thảm đỏ', detail: 'Dấu gót giày nhỏ đi từ bàn điều phối tới chỗ nạn nhân. Lớp sáp còn mới khớp với giày dự tiệc cỡ 36.' }
  ];
  const suspects = [
    { id: 'manager', name: 'Phạm Bảo Ngọc', role: 'quản lý sự kiện', statement: 'Tôi ở bàn điều phối suốt buổi. Việc xếp chỗ và rót rượu đều do nhân viên phụ trách.', detail: 'Lời khai mâu thuẫn với sơ đồ chỗ ngồi và dấu vết hậu trường.' },
    { id: 'pianist', name: 'Nguyễn Duy', role: 'nghệ sĩ piano', statement: 'Tôi đang trên sân khấu khi nghe tiếng ly vỡ. Khải từng phàn nàn về danh sách khách mời.', detail: 'Lịch diễn và nhân chứng xác nhận Duy ở trên sân khấu vào khoảng 22:15.' },
    { id: 'server', name: 'Mai Linh', role: 'nhân viên phục vụ', statement: 'Tôi mang khay nước ra sảnh, nhưng không biết ly nào của ông Khải.', detail: 'Linh có cơ hội chạm vào ly, nhưng thẻ chỗ ngồi được đổi trước lúc cô phục vụ.' },
    { id: 'investor', name: 'Trịnh Phúc', role: 'nhà đầu tư', statement: 'Tôi tranh cãi với Khải về khoản quyên góp, rồi ra ngoài nghe điện thoại.', detail: 'Cuộc gọi và camera xác nhận Phúc rời sảnh trước thời điểm gây án.' }
  ];
  const found = new Set();
  let selectedSuspect = null;
  let opener = null;

  function showTab(name) {
    document.querySelectorAll('[data-ballroom-tab]').forEach(button => {
      button.classList.toggle('active', button.dataset.ballroomTab === name);
    });
    document.querySelectorAll('[data-ballroom-panel]').forEach(panel => {
      panel.classList.toggle('hidden', panel.dataset.ballroomPanel !== name);
    });
  }

  function renderClues() {
    clueCount.textContent = `${found.size}/6`;
    const discovered = clues.filter(clue => found.has(clue.id));
    clueList.innerHTML = discovered.length
      ? discovered.map(clue => `<button class="ballroom-clue found" type="button" data-ballroom-read="${clue.id}"><span>${clue.location}</span>${clue.name}<small>${clue.detail}</small></button>`).join('')
      : '<div class="ballroom-testimony">Chưa ghi nhận manh mối. Hãy chọn các điểm sáng trong sảnh để kiểm tra.</div>';
  }

  function inspect(id) {
    const clue = clues.find(item => item.id === id);
    if (!clue) return;
    found.add(id);
    renderClues();
    readout.innerHTML = `<span>ĐÃ KIỂM TRA / ${clue.location}</span><strong>${clue.detail}</strong>`;
  }

  function renderSuspects() {
    document.querySelector('#ballroom-suspects').innerHTML = suspects.map(suspect =>
      `<button class="ballroom-suspect" type="button" data-ballroom-suspect="${suspect.id}"><strong>${suspect.name}</strong><small>${suspect.role}</small></button>`
    ).join('');
    document.querySelector('#ballroom-accusations').innerHTML = suspects.map(suspect =>
      `<button class="ballroom-accusation" type="button" data-ballroom-accuse="${suspect.id}">${suspect.name}<small>${suspect.role}</small></button>`
    ).join('');
  }

  function openCase() {
    opener = document.activeElement;
    caseWindow.classList.remove('hidden');
    caseWindow.setAttribute('aria-hidden', 'false');
    closeButton.focus();
  }

  function closeCase() {
    caseWindow.classList.add('hidden');
    caseWindow.setAttribute('aria-hidden', 'true');
    if (opener instanceof HTMLElement) opener.focus();
  }

  openButton.addEventListener('click', openCase);
  closeButton.addEventListener('click', closeCase);
  caseWindow.addEventListener('click', event => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const hotspot = target.closest('[data-ballroom-clue]');
    if (hotspot) inspect(hotspot.dataset.ballroomClue);
    const clueButton = target.closest('[data-ballroom-read]');
    if (clueButton) {
      const clue = clues.find(item => item.id === clueButton.dataset.ballroomRead);
      if (clue) readout.innerHTML = `<span>ĐÃ GHI / ${clue.location}</span><strong>${clue.detail}</strong>`;
    }
    const suspectButton = target.closest('[data-ballroom-suspect]');
    if (suspectButton) {
      const suspect = suspects.find(item => item.id === suspectButton.dataset.ballroomSuspect);
      if (!suspect) return;
      document.querySelectorAll('.ballroom-suspect').forEach(button => button.classList.toggle('selected', button === suspectButton));
      testimony.innerHTML = `<strong>${suspect.name} / ${suspect.role}</strong><br>“${suspect.statement}”<br><br>${suspect.detail}`;
    }
    const accusation = target.closest('[data-ballroom-accuse]');
    if (accusation) {
      selectedSuspect = accusation.dataset.ballroomAccuse;
      document.querySelectorAll('.ballroom-accusation').forEach(button => button.classList.toggle('selected', button === accusation));
      result.classList.add('hidden');
    }
    if (target.closest('[data-ballroom-tab]')) showTab(target.closest('[data-ballroom-tab]').dataset.ballroomTab);
  });
  document.querySelector('#ballroom-submit').addEventListener('click', () => {
    result.classList.remove('hidden', 'correct', 'incorrect');
    if (!selectedSuspect) {
      result.textContent = 'Hãy chọn một nghi phạm trước khi khóa kết luận.';
      return;
    }
    if (selectedSuspect === 'manager') {
      result.classList.add('correct');
      result.textContent = found.size >= 3
        ? 'KẾT LUẬN ĐÚNG — Bảo Ngọc đã đổi chỗ ngồi, đầu độc ly rượu của Khải và quay lại bàn điều phối. Các manh mối đã xác nhận lời khai giả.'
        : 'KẾT LUẬN ĐÚNG — Bảo Ngọc là hung thủ. Hãy khám phá thêm manh mối để dựng lại toàn bộ cách gây án.';
    } else {
      result.classList.add('incorrect');
      result.textContent = 'KẾT LUẬN CHƯA CHÍNH XÁC — Lời khai và bằng chứng hiện trường chưa khớp với nghi phạm này. Hãy đối chiếu thêm manh mối rồi thử lại.';
    }
  });
  caseWindow.addEventListener('keydown', event => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(event.key)) event.stopPropagation();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !caseWindow.classList.contains('hidden')) closeCase();
  });
  caseWindow.setAttribute('aria-hidden', 'true');
  renderClues();
  renderSuspects();
})();
