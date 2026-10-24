/* Hồ sơ #03 — Tiệm đồng hồ Kim Thời */
(window.HS13 = window.HS13 || { cases: [] }).cases.push({
  id: 'kim-thoi',
  number: '03',
  title: 'Giờ chết của Kim Thời',
  titleHtml: 'Giờ chết của <em>Kim Thời</em>',
  location: 'Tiệm đồng hồ Kim Thời · Phố Hàng Chiếu',
  datetime: 'Chủ Nhật, 07.11.1999',
  clock: '06:20',
  weather: '☁ SƯƠNG MÙ',
  difficulty: 2,
  tagline: 'Mọi chiếc đồng hồ trong tiệm cùng dừng lúc 22:15. Người thợ già không bao giờ để đồng hồ chết.',
  theme: { accent: '#a5701a', accent2: '#2f6a50', soft: '#f3e6cc', mood: 'Sáng sương mù · phố Hàng Chiếu' },
  interview: { place: 'Gian sau tiệm đồng hồ Kim Thời', alibiQ: 'Từ nửa đêm đến 1 giờ sáng nay, anh/chị ở đâu?', motiveQ: 'Ông Lý Tùng là người thế nào với anh/chị?', props: 'workshop' },
  victim: { name: 'Lý Tùng, 63 tuổi', desc: 'Chủ tiệm đồng hồ Kim Thời. Người giao báo phát hiện lúc 06:00.' },
  briefing: [
    'Sáng sớm, người giao báo thấy cửa cuốn tiệm Kim Thời hé mở. Bên trong, ông Lý Tùng, 63 tuổi, nằm sấp trước quầy kính.',
    'Điều kỳ lạ: toàn bộ đồng hồ trong tiệm — đồng hồ treo, đồng hồ quả lắc, cả chiếc đồng hồ cây trăm tuổi — đều dừng ở cùng một thời điểm: 22:15.',
    'Con trai nạn nhân có ngoại phạm ở quán karaoke đúng giờ đó. Một ngoại phạm hoàn hảo đến mức đáng ngờ.'
  ],
  sceneBrief: 'Ánh đèn bàn thợ vẫn bật. Két sắt mở toang, không có dấu cạy phá. Hàng chục mặt đồng hồ trên tường cùng chỉ 22:15.',
  objective: 'Xác định thời điểm thật của vụ án và ai có thể mở két mà không cần phá khóa.',
  question: 'Ai đã sát hại ông Lý Tùng?',

  art: {
    src: 'img/scenes/kim-thoi.jpg', w: 1024, h: 572,
    spots: {
      victim: [430, 450, 70], clocks: [520, 115, 60], wedge: [138, 372, 24, 'loupe'], safe: [480, 315, 40, 'print'],
      ledger: [880, 440, 32, 'loupe'], ashtray: [600, 270, 22], backdoor: [385, 232, 30], weight: [552, 538, 28]
    }
  },
  spec: {
    seed: 'kim-thoi',
    geometry: { width: 6, depth: 4.2, horizon: 104, top: 4 },
    room: {
      wall: { type: 'wallpaper', color: '#3d4636', accent: '#444e3c', stains: 3, wainscot: { h: 0.9, color: '#3a2a20', panel: 0.45 }, cap: '#1e1d1a' },
      floor: { type: 'encaustic', colors: ['#bdb197', '#7a3a2e', '#2f4a4a', '#6f6551'], size: 0.42 }
    },
    ambient: [0.32, 0.33, 0.4],
    lights: [
      { X: 3.0, z: 2.0, h: 2.0, r: 3.6, color: '#ffd9a0', intensity: 0.9 },
      { X: 2.25, z: 0.35, h: 1.25, r: 2.0, color: '#ffcf8a', intensity: 1.05 },
      { X: 5.3, z: 3.6, h: 1.5, r: 2.4, color: '#9fb5cf', intensity: 0.45 }
    ],
    beams: [{ from: [3.0, 2.0, 1.95], to: [3.0, 2.6], w: 1.6, sw: 0.2, color: '#ffe2b0', a: 0.06 }],
    spawn: { X: 4.9, z: 3.95 },
    props: [
      { type: 'clock', X: 0.6, h: 1.55, r: 0.15, time: '22:15', color: '#5a3b26' },
      { type: 'clock', X: 1.05, h: 1.95, r: 0.12, time: '22:15', style: 'square', color: '#2c2c30' },
      { type: 'clock', X: 1.5, h: 1.6, r: 0.13, time: '22:15', style: 'cuckoo', color: '#6a4a2a' },
      { type: 'clock', X: 2.0, h: 2.0, r: 0.1, time: '22:15', color: '#a68a4a' },
      { type: 'clock', X: 2.45, h: 1.3, r: 0.13, time: '22:15', style: 'pendulum', color: '#4a2e1e', stopped: true },
      { type: 'clock', X: 2.9, h: 1.9, r: 0.14, time: '22:15', color: '#7a6a5a', face: '#f0e8d0' },
      { type: 'shelf', X: 3.3, h: 1.35, w: 1.3, items: 'clocks', time: '22:15', seed: 'k' },
      { type: 'clock', X: 3.6, h: 1.85, r: 0.12, time: '22:15', style: 'square', color: '#5a3b26' },
      { type: 'clock', X: 4.15, h: 1.95, r: 0.1, time: '22:15', color: '#3a3a3e' },
      { type: 'door', X: 4.85, w: 0.85, hh: 1.95, color: '#3a403a' },
      { type: 'grandclock', X: 0.3, z: 0.12, stopped: true, time: '22:15' },
      { type: 'bench', X: 1.0, z: 0.1, w: 1.55, d: 0.6, color: '#5a4030' },
      { type: 'lamp', X: 2.25, z: 0.3, e: 0.85, color: '#2a3a4a' },
      { type: 'ashtray', X: 1.35, z: 0.42, e: 0.85, n: 4, mark: '#e0a060' },
      { type: 'cup', X: 1.7, z: 0.35, e: 0.85, color: '#d9d2c2', liquid: '#3a2414' },
      { type: 'safe', X: 3.1, z: 0.08, open: true },
      { type: 'papers', X: 3.6, z: 1.1, n: 4, spread: 0.6 },
      { type: 'counter', X: 0.9, z: 2.05, w: 2.6, d: 0.6 },
      { type: 'desk', X: 4.3, z: 1.45, w: 1.2, d: 0.6, color: '#3e2a1e' },
      { type: 'book', X: 4.5, z: 1.55, e: 0.765, color: '#3a1e1a', torn: true },
      { type: 'phone', X: 5.25, z: 1.6, e: 0.76, color: '#2a2a2a' },
      { type: 'body', X: 0.85, z: 3.2, dir: 'left', look: { coat: '#4a4038', shirt: '#cfc6b0', pants: '#3a342c', skin: '#c49a7c', hair: '#bdb6aa', hairStyle: 'bald' } },
      { type: 'bit', X: 2.95, z: 3.5, w: 0.12, d: 0.06, color: '#c9a24a', glint: true },
      { type: 'coatrack', X: 5.7, z: 0.6, coat: '#6a2a2a' },
      { type: 'pendant', X: 3.0, z: 2.0, h: 2.0, shade: '#2f4a3a' }
    ],
    hotspots: [
      { id: 'victim', X: 1.8, z: 3.35, h: 0.1, r: 0.6 },
      { id: 'clocks', X: 1.5, z: 0, h: 1.75, r: 0.6, pz: 0.75, px: 0.5 },
      { id: 'wedge', X: 0.55, z: 0.3, h: 0.95, r: 0.25, pz: 0.75 },
      { id: 'safe', X: 3.45, z: 0.4, h: 0.5, r: 0.35, pz: 0.8 },
      { id: 'ledger', X: 4.7, z: 1.65, h: 0.8, r: 0.2 },
      { id: 'ashtray', X: 1.35, z: 0.45, h: 0.9, r: 0.18, pz: 0.85 },
      { id: 'backdoor', X: 5.25, z: 0, h: 1.0, r: 0.4, pz: 0.75 },
      { id: 'weight', X: 3.0, z: 3.53, h: 0, r: 0.2 }
    ]
  },

  clues: [
    { id: 'victim', kind: 'vat', label: 'Khám nghiệm ông Tùng', short: 'Bị đánh từ phía sau', detail: 'Vết thương sau gáy do vật nặng, bị đánh từ phía sau — ông không hề đề phòng người đứng sau lưng. Thi thể còn ấm lúc 06:00: cái chết xảy ra muộn hơn nhiều so với 22:15.' },
    { id: 'clocks', kind: 'vat', label: 'Đồng hồ trên tường', short: 'Tất cả dừng ở 22:15', detail: 'Mọi đồng hồ đều chỉ 22:15. Đồng hồ pin bị tháo pin, đồng hồ quả lắc bị chặn con lắc. Không phải hỏng — có người chỉnh từng chiếc bằng tay.' },
    { id: 'wedge', kind: 'vat', label: 'Nêm chặn con lắc', short: 'Hóa đơn karaoke Hoa Sen — 23:40', detail: 'Con lắc đồng hồ cây bị chặn bằng một mẩu giấy gấp tư: hóa đơn karaoke Hoa Sen, phòng 6, in lúc 23:40. Đồng hồ chỉ có thể bị dừng sau giờ đó.' },
    { id: 'safe', kind: 'vat', label: 'Két sắt', short: 'Mở bằng mã, không cạy phá', detail: 'Két mở bằng đúng mã số, không một vết cạy. Ngăn trên trống trơn; chỉ còn giấy tờ nhà và một phong bì ghi "cho Phong — khi bố mất".' },
    { id: 'ledger', kind: 'vat', label: 'Sổ cái bị xé', short: 'Trang "cho vay" bị xé', detail: 'Cuốn sổ cái mở trên bàn thu ngân. Một trang bị xé vội; phần cuống còn sót chữ "...P. vay 30 cây — hạn 6/11".' },
    { id: 'ashtray', kind: 'vat', label: 'Gạt tàn bàn thợ', short: 'Bốn đầu lọc Craven A', detail: 'Bốn đầu lọc thuốc Craven A, một điếu còn vết tàn ấm khi công an tới. Có người đã ngồi đợi rất lâu ở bàn thợ đêm qua.' },
    { id: 'backdoor', kind: 'vat', label: 'Cửa sau', short: 'Cài then từ bên trong', detail: 'Cửa sau cài then từ bên trong. Cửa cuốn phía trước khóa bằng chìa — chỉ ông Tùng và con trai có chìa.' },
    { id: 'weight', kind: 'vat', label: 'Quả tạ đồng hồ', short: 'Quả tạ đồng có vết máu', detail: 'Quả tạ đồng của đồng hồ quả lắc nằm lăn dưới gầm quầy, dính máu và tóc bạc. Hung khí được lấy ngay trong tiệm.' },
    { id: 'tu-smoke', kind: 'loi', label: 'Lời Tú về thuốc lá', short: 'Thầy bỏ thuốc 5 năm, anh Phong hút Craven A', detail: 'Thợ học việc Tú: "Thầy bỏ thuốc lá năm năm rồi, không cho ai hút trong tiệm. Chỉ anh Phong hút Craven A — anh ấy hay ngồi bàn thợ chờ xin tiền thầy."' },
    { id: 'diep-crash', kind: 'loi', label: 'Tiếng đổ vỡ lúc 0:40', short: 'Bà Diệp nghe thấy khi ngâm gạo', detail: 'Bà Diệp bán xôi đầu ngõ: "0:40 tôi dậy ngâm gạo thì nghe tiếng đổ rầm bên tiệm, rồi tiếng cửa cuốn kéo xuống. Tôi tưởng ông Tùng làm rơi đồ."' },
    { id: 'debt', kind: 'loi', label: 'Khoản nợ 30 cây vàng', short: 'Hạn chót: ngày 6/11', detail: 'Sáu Lùn: "Phong nợ tôi ba mươi cây, hạn chót là hôm qua. Tối qua nó gọi bảo: sáng mai sẽ có đủ, bố nó sẽ phải đưa."' },
    { id: 'tu-code', kind: 'loi', label: 'Mã két', short: 'Chỉ có hai bố con biết', detail: 'Tú: "Mã két là ngày sinh của bà chủ đã mất. Thầy chỉ nói cho anh Phong. Em làm năm năm cũng chưa từng biết."' }
  ],

  suspects: [
    {
      id: 'phong', name: 'Lý Phong', role: 'con trai nạn nhân',
      look: { skin: '#c49a7c', hair: '#141012', hairStyle: 'slick', coat: '#6a2a2a', shirt: '#2a2a2e', pants: '#24242a' },
      intro: 'Tôi ở karaoke Hoa Sen với bạn bè từ 21:30 đến gần nửa đêm. Hỏi ai cũng biết.',
      alibi: 'Phòng 6, karaoke Hoa Sen, 21:30 đến 23:45. Có năm người làm chứng.',
      motive: 'Bố tôi khó tính, nhưng tôi là con trai duy nhất. Tôi giết bố để làm gì?',
      presents: {
        wedge: { line: 'Hóa đơn đó... ai chẳng nhặt được ngoài đường! Anh đừng có vu khống.', mood: 'angry' },
        safe: { line: 'Mã két thì... nhiều người biết lắm. Thằng Tú làm ở đây năm năm rồi.', mood: 'nervous' },
        ashtray: { line: 'Craven A bán đầy ngoài phố.', mood: 'nervous' },
        debt: { line: 'Nợ thì sao? Nợ không có nghĩa là giết người!', mood: 'angry' },
        ledger: { line: 'Bố tôi ghi sổ đủ thứ chuyện, tôi không quan tâm.', mood: 'nervous' }
      },
      fallback: ['Tôi đang có tang, anh để tôi yên được không?', 'Tôi đã nói hết với công an phường rồi.']
    },
    {
      id: 'tu', name: 'Võ Văn Tú', role: 'thợ học việc',
      look: { skin: '#b98e70', hair: '#1c1616', hairStyle: 'short', coat: '#4a5a4a', shirt: '#cfc8b6', pants: '#34322c', apron: '#5a4a3a', glasses: true },
      intro: 'Tôi về nhà lúc 21:00. Lúc đó thầy vẫn khỏe, đồng hồ trong tiệm vẫn chạy đúng giờ.',
      alibi: 'Tôi ở phòng trọ với ba người cùng phòng từ 21:20.',
      motive: 'Thầy dạy nghề cho tôi, nuôi tôi ăn. Tôi chưa bao giờ muốn thầy chết.',
      presents: {
        clocks: { line: 'Thầy không bao giờ để đồng hồ chết, đó là nguyên tắc của tiệm. Ai chặn con lắc đều phải biết từng chiếc. Người trong nghề... hoặc người lớn lên trong tiệm này.', mood: 'nervous' },
        ashtray: { line: 'Thầy bỏ thuốc năm năm rồi, cấm hút trong tiệm. Chỉ anh Phong hút Craven A, anh ấy hay ngồi bàn thợ chờ xin tiền thầy.', unlock: 'tu-smoke' },
        safe: { line: 'Mã két là ngày sinh của bà chủ đã mất. Thầy chỉ nói cho anh Phong thôi, em làm năm năm cũng chưa từng biết.', unlock: 'tu-code' },
        wedge: { line: 'Hoa Sen? Anh Phong hay hát ở đó. Phòng 6 là phòng quen của anh ấy.' }
      },
      fallback: ['Em không biết ạ.', 'Thầy mất rồi, em cũng chẳng biết đi đâu.']
    },
    {
      id: 'diep', name: 'Bà Diệp', role: 'hàng xóm bán xôi',
      look: { skin: '#c9a084', hair: '#7a7470', hairStyle: 'bun', coat: '#5a6a7a', shirt: '#d8cfb8', pants: '#2a2a30', scarf: '#8a3a3a' },
      intro: 'Tôi dậy từ nửa đêm để nấu xôi. Ngõ này có gì tôi biết hết.',
      alibi: 'Tôi ở bếp nhà mình cả đêm, chồng tôi làm chứng.',
      motive: 'Ông Tùng là người tốt, Tết nào cũng cho bọn trẻ trong ngõ lì xì.',
      presents: {
        clocks: { line: '22:15 à? Không đúng. Lúc 0:40 tôi dậy ngâm gạo thì nghe tiếng đổ rầm bên tiệm, rồi tiếng cửa cuốn kéo xuống.', unlock: 'diep-crash' },
        victim: { line: 'Tội ông ấy quá... Đêm qua lúc 0:40 tôi có nghe tiếng đổ vỡ, rồi tiếng cửa cuốn kéo xuống. Tôi tưởng ông làm rơi đồ.', unlock: 'diep-crash' },
        backdoor: { line: 'Cửa sau thì ông ấy luôn cài then. Ai ra vào cũng phải đi cửa cuốn đằng trước.' }
      },
      fallback: ['Tôi chỉ biết bán xôi thôi, cậu ạ.', 'Cậu hỏi thằng Tú ấy.']
    },
    {
      id: 'sau', name: 'Sáu Lùn', role: 'chủ tiệm cầm đồ',
      look: { skin: '#a8805f', hair: '#2a2420', hairStyle: 'bald', coat: '#2a2a2a', shirt: '#c9b98a', pants: '#2a2622', beard: true },
      intro: 'Tôi là người làm ăn đàng hoàng. Ông Tùng chết, tôi mất một khách quen.',
      alibi: 'Tối qua tôi đánh bài ở nhà, có bốn người ngồi cùng tới sáng.',
      motive: 'Ông Tùng chẳng nợ tôi đồng nào. Người nợ là thằng con ông ấy.',
      presents: {
        ledger: { line: 'Thằng Phong nợ tôi ba mươi cây vàng, hạn chót là hôm qua. Tối qua nó gọi bảo sáng nay sẽ có đủ, bố nó sẽ phải đưa.', unlock: 'debt' },
        safe: { line: 'Két trống à? Hừ. Vậy là có người trả nợ sớm rồi.', unlock: 'debt' }
      },
      fallback: ['Tôi không biết gì hết.', 'Chuyện nhà người ta, tôi không xen vào.']
    }
  ],

  deductions: [
    { a: 'clocks', b: 'diep-crash', title: 'Giờ chết giả', text: 'Đồng hồ bị chỉnh về 22:15 để dựng giờ chết giả. Vụ án thực sự xảy ra khoảng 0:40.' },
    { a: 'clocks', b: 'wedge', title: 'Sau 23:40', text: 'Con lắc bị chặn bằng hóa đơn in lúc 23:40 — đồng hồ chỉ bị dừng sau khi bữa karaoke kết thúc.' },
    { a: 'safe', b: 'tu-code', title: 'Người biết mã két', text: 'Két mở bằng mã mà chỉ hai bố con biết. Hung thủ là người trong nhà.' },
    { a: 'ashtray', b: 'tu-smoke', title: 'Người ngồi chờ ở bàn thợ', text: 'Bốn điếu Craven A: Phong đã ngồi ở bàn thợ rất lâu đêm qua, trái với lời khai.' },
    { a: 'ledger', b: 'debt', title: 'Món nợ đến hạn', text: 'Trang sổ bị xé ghi khoản vay 30 cây của Phong, hạn chót đúng ngày án mạng.' },
    { a: 'victim', b: 'weight', title: 'Hung khí trong tiệm', text: 'Nạn nhân bị đánh từ phía sau bằng quả tạ đồng hồ — một người ông hoàn toàn tin tưởng.' }
  ],

  solution: {
    culprit: 'phong',
    evidence: ['wedge', 'tu-code', 'safe', 'tu-smoke', 'ashtray', 'debt', 'ledger', 'diep-crash'],
    summary: 'Lý Phong rời karaoke Hoa Sen lúc 23:45 rồi về tiệm, ngồi hút thuốc ở bàn thợ xin bố trả nợ. Bị từ chối, khoảng 0:40 hắn dùng quả tạ đồng hồ đánh ông Tùng từ phía sau, mở két bằng mã số, xé trang sổ ghi nợ, rồi chỉnh mọi đồng hồ về 22:15 — giờ hắn đang có ngoại phạm. Hắn chặn con lắc bằng chính hóa đơn karaoke trong túi.',
    epilogue: 'Trong két, phong bì "cho Phong — khi bố mất" chứa giấy chuyển nhượng tiệm và một dòng chữ: "Đừng vay của Sáu nữa."'
  }
});
