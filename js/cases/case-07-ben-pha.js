/* Hồ sơ #07 — Bến phà Vạn Phúc */
(window.HS13 = window.HS13 || { cases: [] }).cases.push({
  id: 'ben-pha',
  number: '07',
  title: 'Chuyến phà lúc 23:30',
  titleHtml: 'Chuyến phà <em>lúc 23:30</em>',
  location: 'Bến phà Vạn Phúc · Sông Hàn',
  datetime: 'Thứ Ba, 23.11.1999',
  clock: '05:50',
  weather: '☂ MƯA DẦM',
  difficulty: 3,
  tagline: 'Kỹ sư kiểm định cầu trôi dạt vào chân bến phà lúc rạng sáng. Người ta bảo anh say rượu, trượt chân. Nhưng trong phổi anh không có một hạt phù sa nào.',
  theme: { accent: '#2f6a7a', accent2: '#c0582a', soft: '#dcebee', mood: 'Rạng sáng mưa dầm · khoang phà Vạn Phúc' },
  interview: { place: 'Nhà chờ bến phà Vạn Phúc', alibiQ: 'Từ 22:00 tối qua đến 1 giờ sáng nay, anh/chị ở đâu?', motiveQ: 'Anh/chị biết kỹ sư Trần Quốc Sơn thế nào?', props: 'office' },
  victim: { name: 'Trần Quốc Sơn, 39 tuổi', desc: 'Kỹ sư kiểm định cầu Sông Hàn. Ngư dân vớt được lúc 05:30 cạnh mố phà.' },
  briefing: [
    'Rạng sáng, hai ngư dân vớt được thi thể một người đàn ông mặc sơ mi xanh cạnh mố bến phà Vạn Phúc. Họ đặt anh vào khoang phà chờ công an.',
    'Đó là kỹ sư Trần Quốc Sơn, người phụ trách kiểm định trụ cầu Sông Hàn đang xây cách bến hai trăm mét. Áo anh nồng mùi rượu. Biên bản sơ bộ: "Say rượu, trượt chân xuống sông."',
    'Phà chạy chuyến cuối lúc 22:00 rồi neo bến. Ít nhất, sổ hành trình nói như vậy.'
  ],
  sceneBrief: 'Khoang phà ẩm mùi dầu máy và nước sông. Một chậu nhôm đầy nước xà phòng. Chiếc cặp da của kỹ sư nằm trên băng ghế — rỗng.',
  objective: 'Tìm nơi kỹ sư Sơn thật sự chết, và chuyến phà không có trong sổ.',
  question: 'Ai đã sát hại kỹ sư Trần Quốc Sơn?',

  art: {
    src: 'img/scenes/ben-pha.jpg', w: 1024, h: 572,
    spots: {
      victim: [310, 420, 70], shoes: [240, 500, 32, 'loupe'], washtub: [825, 430, 60, 'loupe'], briefcase: [455, 255, 32, 'print'],
      logbook: [630, 232, 26, 'loupe'], envelope: [900, 160, 50], fuel: [595, 372, 42], rope: [915, 515, 48, 'uv']
    }
  },

  spec: {
    seed: 'ben-pha',
    weather: 'rain',
    geometry: { width: 5.6, depth: 3.4, horizon: 100, top: 3.4 },
    room: {
      wall: { type: 'panel', color: '#4a3c2e', size: 0.5, trim: '#2a2016', trimH: 2.2, wainscot: { h: 0.75, color: '#3a5a5a', panel: 0.5 }, cap: '#1a1612' },
      floor: { type: 'wood', colors: ['#5a4a38', '#4e4030', '#64523e', '#56463a'] }
    },
    ambient: [0.34, 0.38, 0.44],
    lights: [
      { X: 2.8, z: 1.4, h: 2.0, r: 3.2, color: '#ffcf7a', intensity: 0.85, flicker: 0.05 },
      { X: 1.0, z: 0.1, h: 1.3, r: 2.0, color: '#9fb8d0', intensity: 0.5 },
      { X: 4.4, z: 0.1, h: 1.3, r: 2.0, color: '#9fb8d0', intensity: 0.5 }
    ],
    spawn: { X: 5.0, z: 3.1 },
    props: [
      { type: 'window', X: 0.35, h: 1.0, w: 1.0, hh: 0.6, view: 'river', frame: '#2a2016' },
      { type: 'window', X: 1.85, h: 1.0, w: 1.0, hh: 0.6, view: 'river', pier: true, frame: '#2a2016' },
      { type: 'buoy', X: 3.3, h: 1.45, wall: '#4a3c2e' },
      { type: 'window', X: 3.75, h: 1.0, w: 0.9, hh: 0.6, view: 'river', frame: '#2a2016' },
      { type: 'door', X: 4.85, w: 0.7, hh: 1.85, color: '#3a4a4a' },
      { type: 'block', X: 0.3, z: 0.15, w: 1.6, d: 0.45, h: 0.45, color: '#5a4632' },
      { type: 'luggage', X: 0.7, z: 0.25, e: 0.45, w: 0.45, d: 0.12, h: 0.32, color: '#3a2418' },
      { type: 'desk', X: 2.3, z: 0.15, w: 1.0, d: 0.5, color: '#4a3a2a' },
      { type: 'book', X: 2.4, z: 0.3, e: 0.765, color: '#2a3a2a', torn: true },
      { type: 'radio', X: 2.95, z: 0.3, e: 0.76, color: '#3a3a3a' },
      { type: 'washtub', X: 4.35, z: 1.25, r: 0.3, water: '#9aa8a0', foam: true },
      { type: 'bit', X: 4.2, z: 1.7, w: 0.04, d: 0.04, color: '#5a8ab0', glint: true },
      { type: 'block', X: 3.9, z: 2.55, w: 0.9, d: 0.6, h: 0.5, color: '#3a4040' },
      { type: 'rope', X: 1.0, z: 2.55, mud: true },
      { type: 'stain', X: 2.5, z: 2.3, w: 1.2, d: 0.4, n: 8, color: 'rgba(60,80,90,.55)' },
      { type: 'body', X: 1.9, z: 2.25, dir: 'right', look: { skin: '#c49a7c', hair: '#1c1616', hairStyle: 'side', coat: '#5a7a9a', shirt: '#9ab4cc', pants: '#2e3036', shoes: '#2a1a12' } },
      { type: 'lantern', X: 2.8, z: 1.4, h: 1.9 },
      { type: 'lantern', X: 0.9, z: 1.2, h: 1.9 }
    ],
    hotspots: [
      { id: 'victim', X: 2.3, z: 2.3, h: 0.1, r: 0.5 },
      { id: 'shoes', X: 3.25, z: 2.35, h: 0.05, r: 0.2 },
      { id: 'washtub', X: 4.35, z: 1.4, h: 0.3, r: 0.32 },
      { id: 'briefcase', X: 0.9, z: 0.35, h: 0.6, r: 0.25, pz: 0.8 },
      { id: 'logbook', X: 2.6, z: 0.4, h: 0.8, r: 0.22, pz: 0.85 },
      { id: 'envelope', X: 3.3, z: 0, h: 1.45, r: 0.25, pz: 0.7 },
      { id: 'fuel', X: 4.35, z: 2.85, h: 0.5, r: 0.35 },
      { id: 'rope', X: 1.0, z: 2.55, h: 0.05, r: 0.3 }
    ]
  },

  clues: [
    { id: 'victim', kind: 'vat', label: 'Khám nghiệm kỹ sư Sơn', short: 'Chết đuối nước trong, bầm sau gáy', detail: 'Chết đuối, nhưng nước trong phổi trong vắt, có bọt xà phòng, không lẫn phù sa sông. Sau gáy có bốn vết bầm hình đầu ngón tay. Anh bị dìm, không phải trượt chân. Mùi rượu chỉ có trên áo, không có trong dạ dày.' },
    { id: 'washtub', kind: 'vat', label: 'Chậu nhôm trong khoang', short: 'Nước xà phòng, cúc áo xanh dưới đáy', detail: 'Chậu nhôm đầy nước xà phòng, mép chậu móp như bị đè mạnh. Dưới đáy có một chiếc cúc áo sơ mi màu xanh — khớp với chiếc áo đang thiếu một cúc của kỹ sư Sơn.' },
    { id: 'shoes', kind: 'vat', label: 'Dây giày của nạn nhân', short: 'Buộc nút thòng lọng đôi', detail: 'Đôi giày tây của kỹ sư Sơn được buộc bằng nút thòng lọng đôi — nút của dân sông nước, không ai buộc giày kiểu đó. Có người đã xỏ lại giày cho anh sau khi chết.' },
    { id: 'briefcase', kind: 'vat', label: 'Cặp da của kỹ sư', short: 'Chỉ còn bìa "Báo cáo trụ 13"', detail: 'Cặp da nằm trên băng ghế khoang phà. Bên trong chỉ còn tấm bìa: "Báo cáo kiểm định trụ 13 — vết nứt thân trụ, đề nghị dừng thi công". Toàn bộ ruột báo cáo đã bị rút.' },
    { id: 'logbook', kind: 'vat', label: 'Sổ hành trình phà', short: 'Chuyến cuối 22:00, trang sau bị xé', detail: 'Dòng cuối: "Chuyến 22:00 — 14 khách — Tư Hải ký". Trang kế tiếp bị xé, còn cuống. Trên trang dưới in hằn nét bút: "23:3…".' },
    { id: 'envelope', kind: 'vat', label: 'Phong bì trong hộc phao', short: '5 triệu, logo Hưng Thịnh, dấu "13"', detail: 'Giấu trong hộc phao cứu sinh: một phong bì 5 triệu đồng in logo công ty xây dựng Hưng Thịnh, góc đóng con dấu mực tím số "13".' },
    { id: 'fuel', kind: 'vat', label: 'Bình dầu máy phà', short: 'Hụt đúng một chuyến qua sông', detail: 'Sổ bảo dưỡng ghi đổ đầy dầu sau chuyến 22:00. Sáng nay bình hụt đúng lượng dầu của một chuyến khứ hồi qua sông.' },
    { id: 'rope', kind: 'vat', label: 'Dây neo phà', short: 'Nút thòng lọng đôi, dính bùn trụ cầu', detail: 'Dây neo được buộc lại bằng nút thòng lọng đôi. Đoạn đầu dây dính bùn xám lẫn vụn bê tông — loại bùn chỉ có ở chân trụ cầu đang thi công, không phải bùn bến phà.' },
    { id: 'nam-light', kind: 'loi', label: 'Đèn phà lúc 23:30', short: 'Bà Năm thấy phà qua sông', detail: 'Bà Năm: "23:30 tôi dậy đóng cửa thì thấy đèn phà đang qua sông, về phía công trường trụ cầu. Chuyến cuối là 22:00, tôi bán vé hai mươi năm, tôi biết."' },
    { id: 'cuong-home', kind: 'loi', label: 'Cường được cho về sớm', short: '22:15, lần đầu tiên', detail: 'Cường: "22:15 chú Hải bảo cháu về, chú tự neo phà. Hai năm làm phụ phà, đó là lần đầu chú làm thế."' },
    { id: 'cuong-knot', kind: 'loi', label: 'Nút thòng lọng đôi', short: 'Cả bến chỉ Tư Hải buộc kiểu đó', detail: 'Cường: "Nút thòng lọng đôi là chú Hải dạy cháu, nhưng cháu buộc mãi không được. Cả bến này chỉ chú Hải buộc kiểu đó."' },
    { id: 'bao-meeting', kind: 'loi', label: 'Cuộc gặp lúc 21:00', short: 'Bảo mời Sơn "sửa" báo cáo', detail: 'Trịnh Bảo: "21:00 tôi gặp Sơn ở quán nước bến phà, đề nghị anh ấy xem lại báo cáo. Anh ấy từ chối, nói tối nay sẽ tự sang xem trụ 13 lúc nước ròng. 21:30 tôi về khách sạn."' },
    { id: 'hai-trip', kind: 'loi', label: 'Tư Hải nhận chuyến 23:30', short: 'Chở kỹ sư sang trụ 13', detail: 'Tư Hải: "Tôi có chạy một chuyến lúc 23:30. Kỹ sư Sơn trả tiền, đòi sang chân trụ 13 lúc nước ròng. Ông ấy lội xuống bùn xem rồi lên phà… rồi ông ấy tự lên bờ!"' }
  ],

  suspects: [
    {
      id: 'hai', name: 'Tư Hải', role: 'chủ phà Vạn Phúc',
      look: { photo: 'img/faces/07-hai.jpg', skin: '#a07858', hair: '#3a3430', hairStyle: 'short', coat: '#3a4a3a', shirt: '#c9c0aa', pants: '#2a2a2a', hat: true, hatColor: '#c8b078' },
      intro: 'Tôi chạy phà ba mươi năm. Người say rượu trượt chân xuống sông, năm nào chẳng có.',
      alibi: 'Chuyến cuối 22:00. Neo phà xong tôi về nhà ngủ, vợ tôi biết.',
      motive: 'Tôi chẳng quen ông kỹ sư nào. Ông ấy thỉnh thoảng đi phà, thế thôi.',
      testimony: [
        { text: 'Chuyến cuối là 22:00. Xong tôi neo phà, tắt máy, về nhà ngủ.', contra: ['nam-light', 'fuel', 'logbook'], press: 'Mưa thế này ai chạy phà đêm làm gì.', broken: 'Được rồi… tôi có chạy thêm một chuyến lúc 23:30. Kỹ sư Sơn trả tiền, đòi sang chân trụ 13 lúc nước ròng. Ông ấy lội xuống bùn xem rồi lên phà… rồi ông ấy tự lên bờ!', unlock: 'hai-trip' },
        { text: 'Thằng Cường phụ tôi neo phà như mọi hôm.', contra: 'cuong-home', press: 'Nó là cháu tôi, nó phụ tôi suốt.', broken: 'Tôi cho nó về sớm, thì sao? Trời mưa, tôi thương cháu.' },
        { text: 'Kỹ sư Sơn lên bờ an toàn, ông ấy chưa từng vào khoang phà.', contra: ['washtub', 'briefcase'], press: 'Ông ấy đứng ngoài boong suốt.', broken: 'Thì… ông ấy có vào khoang rửa mặt. Bùn trụ cầu bám đầy mặt. Tôi đâu biết cúc áo rơi lúc nào.' },
        { text: 'Tôi không nhận đồng nào của ai.', contra: 'envelope', press: 'Tôi sống bằng tiền vé.', broken: 'Tiền đó… là tiền công. Có người nhờ tôi "đưa kỹ sư đi một chuyến cho xong việc". Tôi tưởng chỉ là dọa!' },
        { text: 'Xác người chết thì tôi không động tới, ngư dân vớt lên đấy.', contra: ['cuong-knot', 'shoes'], press: 'Tôi sợ ma lắm.', broken: '…' }
      ],
      deflect: ['Anh nói gì tôi không hiểu.', 'Cái đó thì liên quan gì tới tôi?'],
      presents: {
        logbook: { line: 'Sổ rách thì tôi xé làm giấy nhóm bếp. Có gì lạ.', mood: 'nervous' },
        rope: { line: 'Dây neo của tôi, tôi buộc thế nào kệ tôi.', mood: 'nervous' },
        envelope: { line: 'Cái đó… ai giấu trên phà tôi biết đâu!', mood: 'angry' },
        fuel: { line: 'Bình dầu rò, chứ hụt cái gì.', mood: 'nervous' }
      },
      fallback: ['Tôi phải đi chuyến sáng.', 'Hỏi thằng Cường ấy.']
    },
    {
      id: 'bao', name: 'Trịnh Bảo', role: 'phó giám đốc công ty Hưng Thịnh',
      look: { photo: 'img/faces/bao.jpg', skin: '#c9a084', hair: '#141012', hairStyle: 'slick', coat: '#2a2a34', shirt: '#e0dcd0', pants: '#24242a', tie: '#7a2a2a', glasses: true },
      intro: 'Công ty chúng tôi là nhà thầu trụ cầu. Kỹ sư Sơn là đối tác, chúng tôi rất tiếc.',
      alibi: '21:30 tài xế đưa tôi về khách sạn Bến Thành. Lễ tân thấy tôi lên phòng.',
      motive: 'Báo cáo của Sơn có vài số liệu cần trao đổi lại. Chuyện kỹ thuật thôi.',
      testimony: [
        { text: 'Tôi chỉ mời kỹ sư Sơn uống nước, nói chuyện xã giao.', contra: 'briefcase', press: 'Uống nước chè thôi mà.', broken: 'Thôi được. Tôi đề nghị anh ấy xem lại báo cáo. Anh ấy từ chối, bảo tối nay sẽ tự sang xem trụ 13 lúc nước ròng.', unlock: 'bao-meeting' },
        { text: 'Hưng Thịnh không có lý do gì phải sợ một bản báo cáo.', contra: 'envelope', press: 'Chúng tôi làm đúng thiết kế.', broken: 'Phong bì đó là tiền công ty, tôi chuyển theo chỉ đạo. Nhưng không phải chỉ đạo của tôi. Tôi chỉ là người cầm tiền.' },
        { text: '21:30 tôi về khách sạn, cả đêm không ra ngoài.', press: 'Hỏi lễ tân khách sạn Bến Thành.' }
      ],
      deflect: ['Luật sư của tôi sẽ trả lời câu đó.'],
      presents: {
        briefcase: { line: 'Báo cáo mất rồi à? Tôi… tôi không lấy. Tôi gặp anh ấy lúc 21:00, anh ấy còn ôm cặp khư khư.', unlock: 'bao-meeting', mood: 'nervous' },
        envelope: { line: 'Logo công ty thì ai in chẳng được.', mood: 'nervous' },
        victim: { line: 'Sơn không uống rượu. Tối qua anh ấy còn gọi trà đá.' }
      },
      fallback: ['Tôi bận lắm.', 'Anh nên hỏi chủ phà.']
    },
    {
      id: 'nam', name: 'Bà Năm', role: 'bán vé bến phà',
      look: { photo: 'img/faces/07-nam.jpg', skin: '#b98e70', hair: '#8a8480', hairStyle: 'bun', coat: '#6a5a4a', shirt: '#d8cfb8', pants: '#2a2a30', scarf: '#4a6a5a' },
      intro: 'Tôi bán vé ở bến này hai mươi năm. Nhà tôi ngay cạnh chòi vé.',
      alibi: 'Tôi ngủ ở nhà, dậy lúc 23:30 đóng cửa vì gió.',
      motive: 'Kỹ sư Sơn tốt bụng lắm, hay mua bánh cho cháu tôi.',
      presents: {
        logbook: { line: 'Chuyến cuối 22:00 thật. Nhưng 23:30 tôi dậy đóng cửa thì thấy đèn phà đang qua sông, về phía công trường trụ cầu!', unlock: 'nam-light' },
        fuel: { line: 'Phà chạy đêm à? Đúng rồi, 23:30 tôi thấy đèn phà giữa sông.', unlock: 'nam-light' },
        victim: { line: 'Tối qua cậu ấy hỏi tôi có ai chở sang trụ cầu được không. Tôi bảo đi hỏi ông Hải.' }
      },
      fallback: ['Tôi già rồi, mắt kém.', 'Tôi chỉ bán vé thôi.']
    },
    {
      id: 'cuong', name: 'Lê Cường', role: 'phụ phà, cháu Tư Hải',
      look: { photo: 'img/faces/07-cuong.jpg', skin: '#b08a6c', hair: '#1c1616', hairStyle: 'short', coat: '#5a6a7a', shirt: '#d0c8b4', pants: '#2a2622' },
      intro: 'Cháu làm phụ phà cho chú Hải hai năm rồi.',
      alibi: 'Cháu về nhà lúc 22:15, mẹ cháu biết.',
      motive: 'Cháu không biết ông kỹ sư.',
      testimony: [
        { text: 'Cháu ở lại phụ chú neo phà như mọi hôm.', contra: ['logbook', 'fuel'], press: 'Cháu… cháu ở đó mà.', broken: 'Không ạ… 22:15 chú Hải bảo cháu về, chú tự neo phà. Hai năm nay đó là lần đầu.', unlock: 'cuong-home' }
      ],
      deflect: ['Cháu không hiểu.'],
      presents: {
        rope: { line: 'Nút thòng lọng đôi là chú Hải dạy cháu, nhưng cháu buộc mãi không được. Cả bến này chỉ chú Hải buộc kiểu đó.', unlock: 'cuong-knot', mood: 'nervous' },
        shoes: { line: 'Nút này… là nút của chú Hải. Cả bến chỉ chú buộc được kiểu đó.', unlock: 'cuong-knot', mood: 'nervous' },
        logbook: { line: 'Tối qua chú bảo cháu về sớm lúc 22:15, chú tự neo phà. Lần đầu tiên đấy.', unlock: 'cuong-home' }
      },
      fallback: ['Cháu không biết đâu ạ.', 'Chú Hải dặn cháu đừng nói nhiều.']
    }
  ],

  deductions: [
    { a: 'victim', b: 'washtub', title: 'Không chết dưới sông', text: 'Nước xà phòng trong phổi, cúc áo dưới đáy chậu: kỹ sư Sơn bị dìm trong chậu nhôm ngay trên phà.' },
    { a: 'fuel', b: 'nam-light', title: 'Chuyến phà ma', text: 'Phà đã chạy thêm một chuyến lúc 23:30 — không có trong sổ hành trình.' },
    { a: 'rope', b: 'bao-meeting', title: 'Sang chân trụ 13', text: 'Bùn chân trụ trên dây neo: chuyến 23:30 đã chở kỹ sư Sơn sang xem trụ 13 lúc nước ròng.' },
    { a: 'shoes', b: 'cuong-knot', title: 'Người xỏ lại giày', text: 'Nút thòng lọng đôi trên giày nạn nhân: chỉ Tư Hải buộc kiểu ấy.' },
    { a: 'logbook', b: 'cuong-home', title: 'Một đêm khác thường', text: 'Tư Hải đuổi phụ phà về sớm rồi xé trang sổ ghi chuyến 23:30.' },
    { a: 'envelope', b: 'briefcase', title: 'Cái giá của bản báo cáo', text: 'Tiền của Hưng Thịnh nằm trên phà; báo cáo vết nứt trụ 13 biến mất khỏi cặp.' }
  ],

  timeline: {
    intro: 'Biên bản nói kỹ sư Sơn say rượu ngã xuống sông sau chuyến 22:00. Dựng lại đêm đó theo chứng cứ.',
    slots: [{ t: '21:00' }, { t: '22:00' }, { t: '22:15' }, { t: '23:30' }, { t: '00:10' }, { t: '05:30' }],
    events: [
      { id: 'e1', text: 'Bảo gặp Sơn ở quán nước, đề nghị "xem lại" báo cáo', slot: 0, need: 'bao-meeting' },
      { id: 'e2', text: 'Chuyến phà cuối được ghi sổ', slot: 1, need: 'logbook' },
      { id: 'e3', text: 'Tư Hải bảo Cường về sớm', slot: 2, need: 'cuong-home' },
      { id: 'e4', text: 'Đèn phà qua sông về phía trụ 13', slot: 3, need: 'nam-light' },
      { id: 'e5', text: 'Kỹ sư Sơn bị dìm trong chậu nhôm', slot: 4, need: 'washtub' },
      { id: 'e6', text: 'Ngư dân vớt thi thể cạnh mố phà', slot: 5 },
      { id: 'x1', text: 'Bảo về khách sạn Bến Thành cùng tài xế', slot: -1, need: 'bao-meeting' }
    ],
    done: 'Kỹ sư Sơn còn sống khi lên chuyến phà 23:30. Anh chết trên phà, không phải dưới sông.'
  },

  pressure: {
    budget: 44, wrongCost: 8,
    warn: [{ at: 16, text: 'Tư Hải đang tháo bạt che máy phà, như chuẩn bị đi xa.' }, { at: 6, text: 'Luật sư của Hưng Thịnh vừa đến bến phà.' }]
  },
  endings: {
    escape: 'Bốn giờ sáng hôm sau, phà Vạn Phúc tháo neo không đèn. Người ta tìm thấy nó mắc cạn ở bãi bồi hạ lưu, khoang trống, chậu nhôm đã được cọ sạch. Báo cáo vết nứt trụ 13 không bao giờ được tìm thấy.',
    wrong: {
      bao: 'Trịnh Bảo bị tạm giữ. Một giờ sau, ba luật sư của Hưng Thịnh có mặt cùng lễ tân và tài xế khách sạn Bến Thành. Bảo được thả, còn tờ báo sáng hôm sau đăng: "Công an bắt nhầm doanh nhân".',
      nam: 'Bà Năm bị đưa về đồn trong tiếng khóc của đứa cháu. Cả bến phà biết bà không thể dìm nổi một người đàn ông. Người duy nhất mỉm cười là Tư Hải.',
      cuong: 'Cường bị bắt thay chú. Thằng bé không nói một lời — chú Hải dặn nó thế. Trong lúc đó, dây neo phà đã được tháo ra, buộc lại bằng nút thường.'
    }
  },

  meta: { title: 'Báo cáo bị chôn', fragment: 'Sổ tay kỹ sư Sơn, trang cuối: "Đã nộp bản sao báo cáo vết nứt trụ 13 cho Phòng hồ sơ đặc biệt. Trưởng phòng L. hứa sẽ xử lý trong tuần." Con dấu mực tím số 13 trên phong bì là con dấu của phòng lưu trữ — nơi bạn đang làm việc.' },

  replay: {
    start: [
      { type: 'body', set: { hidden: true } },
      { type: 'bit', set: { hidden: true } },
      { type: 'stain', set: { hidden: true } },
      { type: 'washtub', set: { foam: false, water: '#7a8a8a' } },
      { type: 'book', set: { torn: false } },
      { type: 'luggage', set: { hidden: true } }
    ],
    beats: [
      { t: '21:00', video: 'video/07-2100.mp4', place: 'Quán nước bến phà', card: ['bao'], text: 'Trịnh Bảo của Hưng Thịnh mời kỹ sư Sơn uống nước, đề nghị anh "xem lại" báo cáo vết nứt trụ 13. Sơn từ chối: tối nay anh sẽ tự sang xem chân trụ lúc nước ròng.' },
      {
        t: '22:00', video: 'video/07-2200.mp4', clues: ['logbook'], text: 'Chuyến phà cuối cập bến. Tư Hải ghi sổ: 14 khách, ký tên. Cường cuộn dây chuẩn bị neo.',
        cast: {
          hai: { at: [2.7, 0.9], face: 'back' },
          cuong: { at: [5.0, 3.4], path: [[1.4, 2.4]], face: 'left' }
        },
        cam: { X: 2.4, z: 1.2, h: 1, zoom: 1.3 }
      },
      {
        t: '22:15', video: 'video/07-2215.mp4', clues: ['cuong-home'], text: 'Tư Hải bảo cháu về sớm, "chú tự neo". Hai năm làm phụ phà, đó là lần đầu tiên Cường được về trước.',
        cast: {
          hai: { at: [2.7, 0.9], path: [[2.6, 1.8]], face: 'left' },
          cuong: { at: [1.4, 2.4], face: 'right', then: { delay: 3.5, path: [[5.0, 3.4]], hide: true } }
        },
        cam: { X: 2.4, z: 1.8, h: 1, zoom: 1.35 }
      },
      {
        t: '23:30', video: 'video/07-2330.mp4', clues: ['nam-light', 'fuel'], text: 'Kỹ sư Sơn tìm đến, ôm chiếc cặp da, trả tiền một chuyến sang chân trụ 13. Phà rời bến không ghi sổ. Bên bờ, bà Năm dậy đóng cửa và thấy đèn phà giữa sông.',
        patch: [{ type: 'luggage', set: { hidden: false }, after: 4.5 }],
        cast: {
          hai: { at: [2.7, 0.9], face: 'back' },
          victim: { at: [5.0, 3.4], path: [[3.6, 2.2], [0.9, 0.9]], face: 'back', holding: '#3a2418', then: { holding: null, face: 'front' } }
        }
      },
      {
        t: '23:50', video: 'video/07-2350.mp4', clues: ['rope', 'bao-meeting'], text: 'Ở chân trụ 13, Sơn lội xuống bùn xem vết nứt bằng đèn pin. Anh quay lại khoang, mặt mũi lấm bùn, cúi xuống chậu nhôm rửa mặt.',
        cast: {
          victim: { at: [5.0, 3.4], path: [[4.35, 1.7]], face: 'back', face: 'back' },
          hai: { at: [2.7, 0.9], face: 'right' }
        },
        cam: { X: 4.2, z: 1.5, h: 0.9, zoom: 1.5 }
      },
      {
        t: '00:10', video: 'video/07-0010.mp4', clues: ['victim', 'washtub'], fx: 'shake', fxAt: 3.4,
        text: 'Tư Hải bước tới sau lưng, ấn đầu kỹ sư Sơn xuống chậu nước xà phòng. Chiếc cúc áo xanh đứt, chìm xuống đáy chậu.',
        patch: [{ type: 'bit', set: { hidden: false }, after: 4 }, { type: 'washtub', set: { foam: true, water: '#9aa8a0' }, after: 3.4 }],
        cast: {
          hai: { path: [[3.8, 1.8]], speed: 1.1, face: 'right' },
          victim: { then: { delay: 6.5, pose: 'body', at: [3.0, 1.9], dir: 'left' } }
        },
        cam: { X: 4.0, z: 1.6, h: 0.9, zoom: 1.6 }
      },
      {
        t: '00:30', video: 'video/07-0030.mp4', clues: ['briefcase', 'envelope', 'logbook'], text: 'Hắn rút ruột bản báo cáo trụ 13 khỏi cặp, xé trang sổ ghi chuyến 23:30, rồi nhét phong bì tiền của Hưng Thịnh vào hộc phao cứu sinh.',
        patch: [{ type: 'book', set: { torn: true }, after: 4.5 }],
        cast: { hai: { path: [[1.2, 0.9]], face: 'back', then: { delay: 2, path: [[2.6, 0.9]], then: { delay: 2, path: [[3.3, 0.85]] } } } }
      },
      {
        t: '01:00', clues: ['shoes', 'cuong-knot', 'rope'], text: 'Tư Hải xỏ lại đôi giày cho người chết, buộc dây bằng nút thòng lọng đôi theo thói quen, tưới rượu lên áo rồi thả thi thể xuống nước cạnh mố phà. Hắn neo phà bằng đúng cái nút ấy.',
        cast: {
          hai: { path: [[3.4, 2.1]], face: 'left', then: { delay: 3, path: [[5.0, 3.4]], then: { hide: true } } },
          victim: { then: { delay: 5, hide: true } }
        },
        cam: { X: 3.2, z: 2.0, h: 0.6, zoom: 1.5 }
      },
      {
        t: '05:30', text: 'Rạng sáng, hai ngư dân vớt được kỹ sư Sơn và đặt anh vào khoang phà. Áo nồng mùi rượu. "Say rượu, trượt chân" — đúng như kẻ giết anh mong đợi.',
        patch: [{ type: 'body', set: { hidden: false }, after: 1.5 }, { type: 'stain', set: { hidden: false }, after: 1.8 }]
      }
    ]
  },

  solution: {
    culprit: 'hai',
    evidence: ['shoes', 'cuong-knot', 'washtub', 'victim', 'nam-light', 'fuel', 'hai-trip', 'logbook', 'cuong-home', 'envelope', 'rope'],
    summary: 'Tư Hải nhận tiền của Hưng Thịnh để "đưa kỹ sư đi một chuyến cho xong việc". Hắn cho cháu về sớm lúc 22:15, rồi 23:30 chở kỹ sư Sơn sang chân trụ 13. Khi Sơn rửa bùn trong chậu nhôm, Hải dìm anh tới chết, rút ruột báo cáo vết nứt, xé trang sổ hành trình. Hắn xỏ lại giày cho nạn nhân bằng nút thòng lọng đôi của mình, tưới rượu lên áo và thả xác xuống sông cạnh mố phà.',
    epilogue: 'Tư Hải khai ra người đưa phong bì: Trịnh Bảo. Còn Trịnh Bảo chỉ nói một câu trước khi luật sư đến: "Tôi chỉ cầm tiền. Người ra lệnh ngồi ở Phòng hồ sơ đặc biệt." Ruột bản báo cáo vết nứt được tìm thấy ở đâu, không ai biết.'
  }
});
