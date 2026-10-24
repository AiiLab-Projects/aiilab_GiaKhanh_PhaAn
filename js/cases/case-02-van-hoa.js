/* Hồ sơ #02 — Đêm cuối tại Vạn Hoa */
(window.HS13 = window.HS13 || { cases: [] }).cases.push({
  id: 'van-hoa',
  number: '02',
  title: 'Đêm cuối tại Vạn Hoa',
  titleHtml: 'Đêm cuối tại <em>Vạn Hoa</em>',
  location: 'Khách sạn Vạn Hoa · Sảnh dạ tiệc',
  datetime: 'Thứ Bảy, 23.10.1999',
  clock: '22:15',
  weather: '✦ TRỜI QUANG',
  difficulty: 2,
  tagline: 'Ban nhạc vừa dừng chơi. Nhà tài trợ gục trên thảm đỏ ngay trước bài phát biểu. Không ai rời khỏi sảnh.',
  theme: { accent: '#a8243a', accent2: '#b8892c', soft: '#f5dfe2', mood: 'Dạ tiệc gây quỹ · khách sạn Vạn Hoa' },
  interview: { place: 'Phòng hậu đài khách sạn Vạn Hoa', alibiQ: 'Trong mười phút trước khi ông Khải ngã xuống, anh/chị đứng ở đâu?', motiveQ: 'Anh/chị và ông Dương Khải có quan hệ thế nào?', props: 'backstage' },
  victim: { name: 'Dương Khải, 41 tuổi', desc: 'Nhà tài trợ chính của đêm gây quỹ. Gục trên thảm đỏ lúc 22:15.' },
  briefing: [
    'Đêm gây quỹ thường niên của quỹ Học bổng Vạn Hoa quy tụ hơn một trăm khách mời. Lúc 22:15, nhà tài trợ chính Dương Khải gục ngã giữa thảm đỏ, vài phút trước khi lên phát biểu.',
    'Bác sĩ có mặt trong sảnh xác nhận ông tử vong do chất độc tác dụng nhanh. Ban tổ chức đã phong tỏa sảnh; không ai được rời đi.',
    'Bốn người có cơ hội tiếp cận ly rượu của Khải. Một trong số họ đang nói dối về nơi mình đứng suốt buổi tối.'
  ],
  sceneBrief: 'Sảnh tiệc vẫn sáng đèn, khách mời bị giữ lại hai bên. Thi thể nằm trên thảm đỏ giữa sảnh, cách bàn tiệc bên trái vài bước.',
  objective: 'Tìm ra ai đã bỏ độc vào ly của Dương Khải và bằng cách nào ly đó đến tay ông.',
  question: 'Ai đã hạ độc Dương Khải?',

  art: {
    src: 'img/scenes/van-hoa.jpg', w: 1024, h: 572,
    decals: [{ type: 'steps', uv: true, at: [[462, 548], [452, 520], [444, 494], [436, 468]], rot: -6, size: 8, color: 'rgba(200,255,240,.85)' }],
    spots: {
      victim: [515, 445, 70], glass: [580, 482, 24, 'print'], microphone: [512, 262, 26], placecard: [868, 418, 24, 'loupe'],
      curtain: [700, 230, 34, 'loupe'], footprint: [450, 512, 40, 'uv'], winecup: [818, 385, 24]
    }
  },
  spec: {
    seed: 'van-hoa',
    geometry: { width: 14, depth: 8, horizon: 100, top: 2, back: [-20, 340], front: [-90, 410] },
    room: {
      wall: { type: 'panel', color: '#4a2430', size: 1.2, trim: '#b08a46', trimH: 3.1, wainscot: { h: 1.1, color: '#3a1a22', panel: 1.2 }, cap: '#1d1418' },
      floor: { type: 'checker', colors: ['#2b2226', '#3d3036'], size: 0.6, runner: { x0: 6.3, x1: 7.7, color: '#7a1f24', trim: '#c09a4c' } }
    },
    ambient: [0.36, 0.31, 0.33],
    lights: [
      { X: 4, z: 3.2, h: 3.0, r: 6.5, color: '#ffd9a0', intensity: 0.85 },
      { X: 10, z: 3.2, h: 3.0, r: 6.5, color: '#ffd9a0', intensity: 0.85 },
      { X: 7, z: 0.9, h: 2.2, r: 3.8, color: '#ffe8b8', intensity: 1.0 },
      { X: 1.2, z: 0.2, h: 2.0, r: 2.2, color: '#ffcf8a', intensity: 0.6 },
      { X: 12.8, z: 0.2, h: 2.0, r: 2.2, color: '#ffcf8a', intensity: 0.6 }
    ],
    beams: [{ from: [7, 2.5, 3.7], to: [7, 1.0], w: 1.8, sw: 0.25, color: '#ffe2b0', a: 0.11 }],
    spawn: { X: 9.2, z: 7.4 },
    walk: { zMin: 0.5 },
    props: [
      { type: 'balcony', X: 0.3, h: 2.6, w: 2.2 },
      { type: 'balcony', X: 11.5, h: 2.6, w: 2.2 },
      { type: 'sconce', X: 1.2, h: 2.0 },
      { type: 'sconce', X: 12.8, h: 2.0 },
      { type: 'painting', X: 3.2, h: 1.6, w: 0.7, hh: 0.9, art: 'portrait', frame: '#b08a46' },
      { type: 'painting', X: 10.1, h: 1.6, w: 0.7, hh: 0.9, art: 'portrait', frame: '#b08a46' },
      { type: 'stage', X: 4.5, z: 0, w: 5, d: 1.8, h: 0.6, ch: 3.0, label: 'GALA 1999' },
      { type: 'piano', X: 4.9, z: 0.2, e: 0.6, sort: 1.9 },
      { type: 'drum', X: 8.9, z: 0.6, e: 0.6, sort: 1.9 },
      { type: 'mic', X: 7.0, z: 1.45, e: 0.6, cable: true, sort: 1.95 },
      { type: 'column', X: 2.3, z: 0.15 },
      { type: 'column', X: 11.2, z: 0.15 },
      { type: 'buffet', X: 0.4, z: 1.0, w: 1.9 },
      { type: 'buffet', X: 11.7, z: 1.0, w: 1.9 },
      { type: 'roundtable', X: 3.1, z: 4.2, r: 0.75, vase: true },
      { type: 'cup', X: 3.55, z: 4.05, e: 0.765, wine: true, sort: 4.95 },
      { type: 'roundtable', X: 10.9, z: 4.2, r: 0.75, vase: true },
      { type: 'block', X: 10.55, z: 3.75, w: 0.12, d: 0.03, h: 0.07, e: 0.76, color: '#efe9da', sort: 4.96, block: false },
      { type: 'roundtable', X: 12.4, z: 6.6, r: 0.6 },
      { type: 'plant', X: 0.5, z: 6.6 },
      { type: 'plant', X: 13.5, z: 3.0 },
      { type: 'body', X: 6.1, z: 4.75, dir: 'right', look: { coat: '#1d1d24', shirt: '#efe9dc', pants: '#1a1a20', skin: '#c49a7c', hair: '#2a2224', tie: '#1a1a1a' } },
      { type: 'glass', X: 8.1, z: 5.05, n: 8, stem: true },
      { type: 'stain', X: 7.95, z: 5.0, w: 0.35, d: 0.2, n: 4, color: 'rgba(90,16,26,.65)' },
      { type: 'footprints', X: 7.45, z: 6.6, X2: 7.4, z2: 5.5, n: 4, color: 'rgba(210,190,140,.35)' },
      { type: 'cordon', X: 5.4, z: 3.9, X2: 8.9, z2: 3.9 },
      { type: 'person', X: 1.3, z: 3.4, look: { coat: '#2a2a33', shirt: '#e0dbd0', tie: '#7a1a26', hair: '#1c1718', hairStyle: 'slick' } },
      { type: 'person', X: 1.9, z: 5.4, look: { dress: '#7a2a4a', coat: '#7a2a4a', hair: '#141012', hairStyle: 'bun', earrings: true } },
      { type: 'person', X: 4.6, z: 6.6, facing: 'right', look: { coat: '#34343c', shirt: '#dcd6c8', hair: '#3a3a3a', hairStyle: 'bald', glasses: true } },
      { type: 'person', X: 9.7, z: 6.9, look: { dress: '#2a4a5a', coat: '#2a4a5a', hair: '#2a1e1a', hairStyle: 'long' } },
      { type: 'person', X: 12.9, z: 3.5, facing: 'left', look: { coat: '#24242c', shirt: '#e3ded2', tie: '#2a3a6a', hair: '#1e1a1a' } },
      { type: 'person', X: 13.2, z: 5.4, armsCrossed: true, look: { coat: '#4a3a2a', shirt: '#d8d0c0', hair: '#4a4040', hairStyle: 'side', beard: true } },
      { type: 'person', X: 9.5, z: 2.4, look: { coat: '#e6e1d6', shirt: '#ffffff', pants: '#202024', apron: '#2a2a2e', hair: '#141012', hairStyle: 'bun' } },
      { type: 'person', X: 4.2, z: 2.5, facing: 'right', look: { coat: '#3a2a40', dress: '#3a2a40', hair: '#1a1214', hairStyle: 'bob' } },
      { type: 'chandelier', X: 4, z: 3.2, h: 3.0, w: 1.4 },
      { type: 'chandelier', X: 10, z: 3.2, h: 3.0, w: 1.4 }
    ],
    hotspots: [
      { id: 'victim', X: 7.0, z: 4.9, h: 0.1, r: 0.8 },
      { id: 'glass', X: 8.1, z: 5.05, h: 0, r: 0.35 },
      { id: 'microphone', X: 7.0, z: 1.5, h: 2.0, r: 0.3, pz: 2.2, px: 6.5 },
      { id: 'placecard', X: 10.6, z: 3.8, h: 0.82, r: 0.25 },
      { id: 'curtain', X: 9.25, z: 1.8, h: 1.6, r: 0.4, pz: 2.2 },
      { id: 'footprint', X: 7.4, z: 6.1, h: 0, r: 0.35 },
      { id: 'winecup', X: 3.55, z: 4.05, h: 0.9, r: 0.2 }
    ]
  },

  clues: [
    { id: 'victim', kind: 'vat', label: 'Khám nghiệm Dương Khải', short: 'Chất độc tác dụng nhanh', detail: 'Không có vết thương ngoài. Môi thâm, đồng tử co, có mùi hạnh nhân đắng. Chất độc phát tác chỉ vài phút sau khi uống — Khải đã uống nó ngay trong sảnh.' },
    { id: 'glass', kind: 'vat', label: 'Ly pha lê vỡ', short: 'Cặn rượu có độc chất', detail: 'Ly rơi vỡ cạnh thi thể. Cặn rượu vang còn dấu vết độc chất. Chân ly bị lau sạch đến mức không còn cả vân tay của chính Khải.' },
    { id: 'microphone', kind: 'vat', label: 'Micro sân khấu', short: 'Bản ghi thử âm lúc 21:50', detail: 'Máy ghi của bàn âm thanh còn lưu đoạn thử micro lúc 21:50: tiếng Khải cãi nhau với một người phụ nữ về "cuốn sổ quỹ" và "kiểm toán".' },
    { id: 'placecard', kind: 'vat', label: 'Thẻ chỗ ngồi bị đổi', short: 'Bàn số 7, khuất camera', detail: 'Thẻ tên của Khải bị chuyển từ bàn chính sang bàn số 7 — góc duy nhất camera sảnh không quay tới. Sơ đồ chỗ ngồi có chữ ký duyệt của quản lý sự kiện.' },
    { id: 'curtain', kind: 'vat', label: 'Lối đi cánh gà', short: 'Sợi chỉ nhung đỏ', detail: 'Một sợi chỉ nhung đỏ mắc ở đinh lối đi hậu trường dẫn từ bàn điều phối ra sảnh. Áo khoác nhung đỏ — trang phục của quản lý sự kiện tối nay.' },
    { id: 'footprint', kind: 'vat', label: 'Dấu giày trên thảm', short: 'Gót nhỏ cỡ 36, sáp mới', detail: 'Dấu gót giày nhỏ in lớp sáp đánh sàn còn mới, đi từ phía hậu trường tới chỗ Khải đứng. Giày dự tiệc nữ, cỡ 36.' },
    { id: 'winecup', kind: 'vat', label: 'Ly vang trên bàn 7', short: 'Ly thứ hai, chưa ai uống', detail: 'Trên bàn số 7 còn một ly vang đầy, sạch độc chất. Nhân viên phục vụ chỉ mang ra đúng hai ly cho bàn này theo chỉ thị riêng.' },
    { id: 'linh-order', kind: 'loi', label: 'Chỉ thị của quản lý', short: 'Chỉ mang ly ra bàn 7', detail: 'Mai Linh khai: lúc 21:55, chị Bảo Ngọc tự tay đặt khay ly và dặn chỉ được mang ra bàn số 7. Ly bên trái là "ly của ông Khải".' },
    { id: 'duy-heard', kind: 'loi', label: 'Lời Duy nghe được', short: '"Sổ quỹ đang ở chỗ kiểm toán"', detail: 'Nghệ sĩ Duy nghe qua tai nghe kiểm âm: Khải nói "Ngọc, sổ quỹ đang ở chỗ kiểm toán. Tối nay tôi sẽ nói hết."' },
    { id: 'phuc-speech', kind: 'loi', label: 'Bài phát biểu bị hủy', short: 'Khải định công bố thất thoát', detail: 'Trịnh Phúc khai: Khải cho ông xem bản nháp bài phát biểu — trong đó công bố quỹ học bổng thất thoát gần hai tỷ đồng và tên người chịu trách nhiệm.' }
  ],

  suspects: [
    {
      id: 'ngoc', name: 'Phạm Bảo Ngọc', role: 'quản lý sự kiện',
      look: { skin: '#d4ab90', hair: '#160f11', hairStyle: 'bun', coat: '#8a1f2a', shirt: '#efe6d8', pants: '#1a1418', dress: '#8a1f2a', earrings: true },
      intro: 'Tôi ở bàn điều phối suốt buổi. Việc xếp chỗ và rót rượu đều do nhân viên phụ trách.',
      alibi: 'Từ 21:30 tôi không rời bàn điều phối. Cả đội âm thanh đều thấy tôi.',
      motive: 'Ông Khải là nhà tài trợ quan trọng nhất của chúng tôi. Tôi mất ông ấy là mất cả quỹ.',
      presents: {
        placecard: { line: 'Đổi chỗ là chuyện bình thường. Ông Khải muốn ngồi yên tĩnh trước khi phát biểu.', mood: 'nervous' },
        curtain: { line: 'Tôi có ra sau cánh gà một lần, kiểm tra dây micro. Một phút thôi.', mood: 'nervous' },
        microphone: { line: 'Chúng tôi tranh luận chuyện sổ sách, đó là công việc. Tranh luận không phải giết người.', mood: 'angry' },
        footprint: { line: 'Nửa sảnh này đi giày cỡ 36.', mood: 'angry' },
        'linh-order': { line: 'Linh hiểu nhầm. Tôi chỉ dặn mang ly ra cho đúng bàn.', mood: 'nervous' }
      },
      fallback: ['Tôi còn cả trăm khách mời phải lo, anh hỏi nhanh giúp tôi.', 'Tôi không có gì để nói thêm.']
    },
    {
      id: 'duy', name: 'Nguyễn Duy', role: 'nghệ sĩ piano',
      look: { skin: '#c9a084', hair: '#2a2020', hairStyle: 'long', coat: '#1c1c22', shirt: '#e6e1d6', pants: '#16161a', tie: '#16161a' },
      intro: 'Tôi đang trên sân khấu khi nghe tiếng ly vỡ. Khải từng phàn nàn về danh sách khách mời.',
      alibi: 'Tôi chơi liên tục từ 21:45 tới 22:14. Một trăm người nhìn tôi.',
      motive: 'Khải từng hứa tài trợ album cho tôi rồi rút lại. Tôi giận, nhưng không đến mức ấy.',
      presents: {
        microphone: { line: 'Lúc 21:50 tôi đeo tai nghe kiểm âm và nghe rõ ông Khải nói: "Ngọc, sổ quỹ đang ở chỗ kiểm toán. Tối nay tôi sẽ nói hết."', unlock: 'duy-heard' },
        curtain: { line: 'Từ sân khấu tôi thấy có người mặc đồ đỏ đi ra từ cánh gà phải, khoảng 22:05.' }
      },
      fallback: ['Tôi chỉ chơi đàn thôi, anh điều tra viên.', 'Hỏi ban tổ chức ấy.']
    },
    {
      id: 'linh', name: 'Mai Linh', role: 'nhân viên phục vụ',
      look: { skin: '#d6b096', hair: '#141012', hairStyle: 'bun', coat: '#e6e1d6', shirt: '#ffffff', pants: '#202024', apron: '#2a2a2e' },
      intro: 'Tôi mang khay nước ra sảnh, nhưng không biết ly nào của ông Khải.',
      alibi: 'Tôi đi lại giữa bếp và sảnh cả tối. Camera hành lang bếp có quay.',
      motive: 'Tôi mới làm ở đây hai tuần. Tôi còn không biết mặt ông ấy.',
      presents: {
        placecard: { line: 'Bàn số 7... Chị Ngọc tự tay đặt khay ly, dặn tôi chỉ mang ra bàn 7. Ly bên trái là "ly của ông Khải". Tôi tưởng ông ấy kén rượu.', unlock: 'linh-order', mood: 'nervous' },
        winecup: { line: 'Đúng hai ly đó. Chị Ngọc bảo không được mang thêm.', unlock: 'linh-order', mood: 'nervous' },
        glass: { line: 'Tôi không chạm vào chân ly. Chị Ngọc bảo đeo găng mà rót.', mood: 'nervous' }
      },
      fallback: ['Em... em không biết ạ.', 'Em chỉ làm theo chỉ dẫn thôi.']
    },
    {
      id: 'phuc', name: 'Trịnh Phúc', role: 'nhà đầu tư',
      look: { skin: '#c0957a', hair: '#3a3434', hairStyle: 'side', coat: '#3a3a44', shirt: '#dcd6ca', pants: '#2a2a30', tie: '#6a5a2a', glasses: true },
      intro: 'Tôi tranh cãi với Khải về khoản quyên góp, rồi ra ngoài nghe điện thoại.',
      alibi: 'Từ 22:02 đến 22:16 tôi đứng ngoài sảnh gọi điện. Camera hành lang và hóa đơn điện thoại đều xác nhận.',
      motive: 'Khải muốn tôi góp thêm tiền, tôi từ chối. Chuyện làm ăn thôi.',
      presents: {
        victim: { line: 'Ông ấy cho tôi xem bản nháp bài phát biểu. Quỹ học bổng thất thoát gần hai tỷ, và ông ấy định đọc tên người chịu trách nhiệm ngay trên sân khấu.', unlock: 'phuc-speech' },
        microphone: { line: 'Sổ quỹ? Vậy là ông ấy đã nói chuyện với kiểm toán. Bài phát biểu tối nay là để công bố chuyện đó.', unlock: 'phuc-speech' }
      },
      fallback: ['Tôi đã khai với cảnh sát rồi.', 'Thời gian của tôi đắt lắm, anh biết không?']
    }
  ],

  deductions: [
    { a: 'glass', b: 'victim', title: 'Ly rượu tử thần', text: 'Chất độc nằm trong ly vang Khải cầm trên tay. Chân ly bị lau sạch — kẻ chuẩn bị ly biết trước nó sẽ bị khám.' },
    { a: 'placecard', b: 'linh-order', title: 'Bàn số 7', text: 'Ngọc chuyển Khải tới bàn khuất camera và tự tay chỉ định ly nào mang ra cho ông.' },
    { a: 'microphone', b: 'duy-heard', title: 'Cuộc cãi vã lúc 21:50', text: 'Khải đe dọa công khai chuyện sổ quỹ với Ngọc chỉ 25 phút trước khi chết.' },
    { a: 'phuc-speech', b: 'duy-heard', title: 'Động cơ', text: 'Bài phát biểu sẽ công bố khoản thất thoát và tên Ngọc. Khải phải im lặng trước 22:20.' },
    { a: 'curtain', b: 'footprint', title: 'Lối đi hậu trường', text: 'Ngọc đi theo lối cánh gà ra tận chỗ Khải, trái với lời khai không rời bàn điều phối.' }
  ],

  solution: {
    culprit: 'ngoc',
    evidence: ['linh-order', 'placecard', 'curtain', 'footprint', 'duy-heard', 'phuc-speech', 'microphone', 'glass'],
    summary: 'Phạm Bảo Ngọc biển thủ quỹ học bổng. Sau cuộc cãi vã lúc 21:50, cô đổi chỗ Khải sang bàn số 7 khuất camera, tự tay pha độc vào ly bên trái rồi dặn Mai Linh mang ra. Khoảng 22:05, Ngọc đi lối cánh gà ra sảnh để chắc chắn Khải uống, rồi quay về bàn điều phối.',
    epilogue: 'Cuốn sổ quỹ được tìm thấy trong két của phòng kiểm toán, với ghi chú bằng nét chữ của Khải: "Hồ sơ 13 — bản sao số 2".'
  }
});
