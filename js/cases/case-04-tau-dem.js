/* Hồ sơ #04 — Chuyến tàu đêm SE7 */
(window.HS13 = window.HS13 || { cases: [] }).cases.push({
  id: 'tau-se7',
  number: '04',
  title: 'Chuyến tàu đêm SE7',
  titleHtml: 'Chuyến tàu đêm <em>SE7</em>',
  location: 'Tàu Thống Nhất SE7 · Toa 7, khoang 3',
  datetime: 'Thứ Tư, 17.11.1999',
  clock: '02:40',
  weather: '☔ MƯA ĐÈO HẢI VÂN',
  difficulty: 3,
  tagline: 'Một kỹ sư chết lặng lẽ trong khoang giường nằm. Cửa sổ hé mở giữa cơn mưa. Chiếc cặp bản vẽ đã biến mất.',
  theme: { accent: '#2a5d9a', accent2: '#b8452f', soft: '#dde7f3', mood: 'Mưa đèo Hải Vân · tàu SE7' },
  interview: { place: 'Toa hàng ăn tàu SE7', alibiQ: 'Từ nửa đêm tới lúc toa trưởng phát hiện thi thể, anh/chị ở đâu trên tàu?', motiveQ: 'Anh/chị biết kỹ sư Văn Hải thế nào?', props: 'dining' },
  victim: { name: 'Văn Hải, 45 tuổi', desc: 'Kỹ sư trưởng dự án cầu Sông Hàn. Toa trưởng phát hiện lúc 02:10.' },
  briefing: [
    'Tàu SE7 đang vượt đèo Hải Vân trong mưa. Lúc 02:10, toa trưởng phát hiện kỹ sư Văn Hải gục giữa hai giường dưới của khoang 3, toa 7.',
    'Chiếc cặp da đựng bản vẽ thiết kế cầu mà Hải luôn mang bên mình đã biến mất. Cửa sổ khoang hé mở, nước mưa hắt vào bàn.',
    'Tàu sẽ dừng ở ga Đà Nẵng lúc 04:00. Trước giờ đó, bạn phải biết ai đã ra tay — và chiếc cặp đang ở đâu.'
  ],
  sceneBrief: 'Khoang 4 giường bên trái là hiện trường; khoang bên cạnh của các hành khách khác. Đèn tuýp chập chờn theo nhịp tàu.',
  objective: 'Tìm ra Văn Hải chết vì sao, và ai đã mang chiếc cặp bản vẽ ra khỏi khoang.',
  question: 'Ai đã giết kỹ sư Văn Hải?',

  art: {
    src: 'img/scenes/tau-se7.jpg', w: 1024, h: 572,
    spots: {
      victim: [290, 400, 70], tea: [475, 352, 20, 'loupe'], thermos: [551, 320, 28, 'print'], window: [512, 250, 50, 'loupe'],
      rack: [790, 170, 50], hairpin: [808, 497, 20]
    }
  },
  spec: {
    seed: 'tau-se7',
    geometry: { width: 7, depth: 2.7, horizon: 100, top: 6 },
    room: {
      wall: { type: 'train', color: '#5f6d60', accent: '#cfc6ad', trim: '#b69a62', wainscot: { h: 0.72, color: '#5a4636', panel: 0.6 }, cap: '#2a2a2a' },
      floor: { type: 'lino', colors: ['#3e3b36', '#5a5650'] },
      leftShade: 0.7, rightShade: 0.6
    },
    weather: 'rain',
    ambient: [0.3, 0.33, 0.4],
    lights: [
      { X: 1.7, z: 1.1, h: 2.35, r: 3.0, color: '#e8f2ea', intensity: 0.8, flicker: 0.25 },
      { X: 5.25, z: 1.1, h: 2.35, r: 3.0, color: '#e8f2ea', intensity: 0.75 },
      { X: 1.7, z: 0.1, h: 1.2, r: 1.6, color: '#7f9ac0', intensity: 0.5 },
      { X: 6.6, z: 2.5, h: 1.6, r: 1.6, color: '#ffd28a', intensity: 0.45 }
    ],
    spawn: { X: 3.0, z: 2.5 },
    walk: { zMin: 0.5, zMax: 2.6 },
    props: [
      { type: 'window', X: 1.05, h: 0.85, w: 1.3, hh: 0.8, view: 'train', curtain: '#7a2a2a', speed: 0.5 },
      { type: 'window', X: 4.6, h: 0.85, w: 1.3, hh: 0.8, view: 'train', curtain: '#7a2a2a', speed: 0.5 },
      { type: 'text', X: 3.46, h: 2.25, text: 'SE7', color: '#b69a62', size: 1 },
      { type: 'block', X: 3.42, z: 0, w: 0.08, d: 1.95, h: 2.45, color: '#6e7b6c' },
      { type: 'berth', X: 0.05, z: 0.05, w: 0.78, d: 1.9, fabric: '#3f5a78', sheet: '#ddd6c8' },
      { type: 'berth', X: 2.62, z: 0.05, w: 0.78, d: 1.9, fabric: '#3f5a78' },
      { type: 'block', X: 1.25, z: 0.02, w: 0.9, d: 0.45, h: 0.04, e: 0.7, color: '#7a5a3a', block: [1.25, 0.02, 0.9, 0.45] },
      { type: 'cup', X: 1.45, z: 0.25, e: 0.74, color: '#e8e1d0', liquid: '#5a3a1a' },
      { type: 'bottle', X: 1.9, z: 0.22, e: 0.74, color: '#9a3426', label: '#d8c27a' },
      { type: 'stain', X: 1.95, z: 0.3, w: 0.4, d: 0.15, n: 3, color: 'rgba(120,150,180,.35)' },
      { type: 'luggage', X: 0.1, z: 0.55, e: 1.65, w: 0.6, d: 0.35, h: 0.28, color: '#2a2a30' },
      { type: 'block', X: 2.72, z: 0.15, w: 0.55, d: 0.02, h: 0.003, e: 1.635, color: '#5a5446', sort: 2.6 },
      { type: 'body', X: 0.85, z: 1.05, dir: 'right', look: { coat: '#c8c0ae', shirt: '#e8e2d4', pants: '#3a3a40', skin: '#c49a7c', hair: '#3a3434', glasses: true } },
      { type: 'bit', X: 2.35, z: 1.85, w: 0.07, d: 0.025, color: '#7a4a2a', glint: true },
      { type: 'berth', X: 3.55, z: 0.05, w: 0.78, d: 1.9, fabric: '#4a5a3a' },
      { type: 'berth', X: 6.17, z: 0.05, w: 0.78, d: 1.9, fabric: '#4a5a3a' },
      { type: 'block', X: 4.8, z: 0.02, w: 0.9, d: 0.45, h: 0.04, e: 0.7, color: '#7a5a3a', block: [4.8, 0.02, 0.9, 0.45] },
      { type: 'luggage', X: 4.5, z: 0.75, w: 0.7, d: 0.4, h: 0.5, color: '#5a4a2a', tag: '#d8cfb4' },
      { type: 'luggage', X: 5.3, z: 0.95, w: 0.5, d: 0.35, h: 0.35, color: '#3a5a6a' },
      { type: 'ashtray', X: 5.5, z: 0.25, e: 0.74, n: 2 },
      { type: 'person', X: 6.55, z: 2.35, facing: 'left', look: { coat: '#2c3a52', shirt: '#cfc8b6', pants: '#2b2f3a', hat: 'cap', hatColor: '#2c3a52', badge: true, hair: '#2a2524' } },
      { type: 'tube', X: 1.7, z: 1.1, h: 2.4, w: 0.8, flicker: true },
      { type: 'tube', X: 5.25, z: 1.1, h: 2.4, w: 0.8 }
    ],
    hotspots: [
      { id: 'victim', X: 1.7, z: 1.2, h: 0.1, r: 0.55, pz: 1.85 },
      { id: 'tea', X: 1.45, z: 0.25, h: 0.82, r: 0.15, pz: 0.75 },
      { id: 'thermos', X: 1.9, z: 0.22, h: 0.9, r: 0.15, pz: 0.75, px: 2.2 },
      { id: 'window', X: 1.7, z: 0, h: 1.3, r: 0.4, pz: 0.75, px: 1.1 },
      { id: 'rack', X: 3.0, z: 0.4, h: 1.7, r: 0.3, pz: 2.2 },
      { id: 'hairpin', X: 2.4, z: 1.86, h: 0, r: 0.18 }
    ]
  },

  clues: [
    { id: 'victim', kind: 'vat', label: 'Khám nghiệm Văn Hải', short: 'Không vết thương, đồng tử co', detail: 'Không có dấu hiệu vật lộn hay vết thương. Đồng tử co nhỏ, hơi thở còn mùi thuốc an thần. Hải ngủ thiếp đi rồi ngừng thở — liều thuốc gấp nhiều lần bình thường.' },
    { id: 'tea', kind: 'vat', label: 'Cốc trà nguội', short: 'Cặn trắng dưới đáy cốc', detail: 'Cốc trà còn một phần ba, dưới đáy lắng một lớp cặn trắng mịn. Thuốc ngủ dạng viên đã được nghiền nát và khuấy vào trà.' },
    { id: 'thermos', kind: 'vat', label: 'Phích trà đỏ', short: 'Phích riêng, không phải của tàu', detail: 'Phích trà vỏ đỏ, không phải đồ của đường sắt. Quai phích buộc dải ruy-băng xanh — loại ruy-băng gói hồ sơ của Công ty Tư vấn Cầu đường Miền Trung.' },
    { id: 'window', kind: 'vat', label: 'Cửa sổ hé mở', short: 'Bụi ngoài bậu không bị xáo trộn', detail: 'Cửa sổ bị kéo hé 10 phân, nước mưa hắt vào bàn. Nhưng lớp bụi than bám ngoài bậu cửa còn nguyên — không ai trèo ra vào. Đó là cảnh dàn dựng.' },
    { id: 'rack', kind: 'vat', label: 'Giường tầng trên', short: 'Vệt bụi hình chiếc cặp', detail: 'Trên giường tầng phải còn vệt sạch hình chữ nhật trên lớp bụi — chỗ chiếc cặp da từng nằm. Nó vừa bị lấy đi, cẩn thận, không làm xô lệch gối.' },
    { id: 'hairpin', kind: 'vat', label: 'Kẹp tóc đồi mồi', short: 'Rơi dưới mép giường', detail: 'Một chiếc kẹp tóc đồi mồi rơi dưới mép giường phải. Loại kẹp đắt tiền, thường đi theo bộ hai chiếc.' },
    { id: 'kha-dining', kind: 'loi', label: 'Toa ăn đóng cửa 23:00', short: 'Không ai ở toa ăn sau 23:00', detail: 'Toa trưởng Kha: toa ăn khóa cửa lúc 23:00 như mọi đêm. Sau giờ đó không ai được phục vụ và cũng không thể ngồi trong đó.' },
    { id: 'kha-log', kind: 'loi', label: 'Sổ trực toa', short: '01:50 — Trúc xách cặp sang toa 8', detail: 'Sổ trực ghi: "01:50 — hành khách giường 11 (Trúc) xin qua toa 8, tay xách cặp da màu nâu". Kha tưởng đó là cặp của cô.' },
    { id: 'thu-saw', kind: 'loi', label: 'Lời Minh Thư', short: '01:20 thấy chị Trúc rót trà', detail: 'Minh Thư nằm giường trên khoang bên: khoảng 01:20 qua khe rèm cô thấy "chị thư ký" rót trà từ phích đỏ cho chú Hải, rồi ngồi lại rất lâu.' },
    { id: 'loc-deal', kind: 'loi', label: 'Cuộc mặc cả của Lộc', short: 'Có người rao bán bản vẽ', detail: 'Lộc thú nhận: tuần trước có người gọi chào bán "bản vẽ gốc cầu Sông Hàn" cho công ty đối thủ. Giọng phụ nữ, hẹn giao hàng ở ga Đà Nẵng.' }
  ],

  suspects: [
    {
      id: 'truc', name: 'Nguyễn Thanh Trúc', role: 'thư ký của kỹ sư Hải',
      look: { skin: '#d6b096', hair: '#1a1214', hairStyle: 'long', coat: '#3a4a6a', shirt: '#e6e0d2', pants: '#2a2a34', dress: '#3a4a6a', earrings: true },
      intro: 'Từ 01:00 đến 02:00 tôi ngồi ở toa ăn soạn biên bản. Khi tôi quay lại thì đã thấy toa trưởng la lên.',
      alibi: 'Tôi ở toa ăn từ 01:00. Tôi không ngủ được khi tàu qua đèo.',
      motive: 'Anh Hải là sếp tốt nhất tôi từng có. Tôi theo anh ấy tám năm.',
      presents: {
        thermos: { line: 'Phích đó là của tôi, tôi pha trà cho anh ấy từ Hà Nội. Nhưng ai cũng có thể rót từ nó.', mood: 'nervous' },
        hairpin: { line: 'Kẹp tóc thì... tôi có thể làm rơi lúc chiều. Tôi vào khoang anh Hải nhiều lần mà.', mood: 'nervous' },
        'kha-dining': { line: 'Có thể tôi nhầm giờ. Tôi... tôi ngồi ở hành lang toa ăn.', mood: 'nervous' },
        'kha-log': { line: 'Đó là cặp của tôi! Tôi mang tài liệu sang toa 8 vì... vì ở đó yên tĩnh hơn.', mood: 'angry' },
        rack: { line: 'Anh Hải tự cất cặp. Tôi không biết nó ở đâu.', mood: 'nervous' }
      },
      fallback: ['Tôi đã nói những gì tôi biết.', 'Xin anh, tôi vừa mất người sếp của mình.']
    },
    {
      id: 'kha', name: 'Hồ Văn Kha', role: 'toa trưởng toa 7',
      look: { skin: '#b88f72', hair: '#2a2524', hairStyle: 'short', coat: '#2c3a52', shirt: '#cfc8b6', pants: '#2b2f3a', hat: 'cap', hatColor: '#2c3a52', badge: true },
      intro: 'Tôi đi tuần hai lần một giờ. Đêm qua yên ắng cho tới lúc 02:10.',
      alibi: 'Phòng trực đầu toa. Tôi ghi sổ mọi lần đi tuần.',
      motive: 'Tôi chỉ biết ông ấy là khách giường 9. Hay xin thêm nước sôi.',
      presents: {
        tea: { line: 'Trà à? Tàu chỉ có nước sôi. Còn toa ăn thì đóng cửa từ 23:00, không ai được phục vụ sau giờ đó.', unlock: 'kha-dining' },
        thermos: { line: 'Phích này không phải của đường sắt. Mà toa ăn đóng cửa từ 23:00, nên trà này pha ngay trong khoang.', unlock: 'kha-dining' },
        rack: { line: 'Cặp da? Khoảng 01:50 cô thư ký giường 11 xin qua toa 8, tay xách một cái cặp da nâu. Tôi có ghi sổ.', unlock: 'kha-log' },
        window: { line: 'Cửa sổ khoang này kẹt lắm, phải dùng hai tay mới kéo được. Người ngoài không mở từ bên ngoài được đâu.' }
      },
      fallback: ['Tôi chỉ làm đúng việc của tôi.', 'Hỏi tôi về giờ tàu thì tôi trả lời được.']
    },
    {
      id: 'loc', name: 'Đặng Lộc', role: 'thương lái, khoang 4',
      look: { skin: '#a8805f', hair: '#191516', hairStyle: 'side', coat: '#5a4a2a', shirt: '#d8cfb4', pants: '#2a2622', beard: true },
      intro: 'Tôi có cãi nhau với ông ấy lúc tối. Nhưng tôi ngủ say như chết sau đó.',
      alibi: 'Tôi ở khoang 4 cả đêm. Hai người cùng khoang nghe tôi ngáy.',
      motive: 'Công ty tôi thua thầu cầu Sông Hàn vì ông ấy. Tôi tức, nhưng làm ăn là vậy.',
      presents: {
        rack: { line: 'Bản vẽ à? Tuần trước có người gọi chào bán "bản vẽ gốc cầu Sông Hàn" cho công ty tôi. Giọng phụ nữ, hẹn giao ở ga Đà Nẵng. Tôi đã từ chối, tôi thề.', unlock: 'loc-deal', mood: 'nervous' },
        window: { line: 'Tôi mở cửa sổ khoang tôi để hút thuốc, không phải khoang ông ấy.' },
        victim: { line: 'Tôi cãi nhau với ông ấy lúc 22:00 về chuyện thầu. Ông ấy bảo sẽ có người "phải trả giá" khi tới Đà Nẵng.', mood: 'nervous' }
      },
      fallback: ['Tôi có hàng phải lo, anh nhanh lên.', 'Tôi không biết gì.']
    },
    {
      id: 'thu', name: 'Lâm Minh Thư', role: 'sinh viên, giường trên khoang 3',
      look: { skin: '#dcb79c', hair: '#211a1a', hairStyle: 'bob', coat: '#7a8a5a', shirt: '#e6e0d2', pants: '#34343c', glasses: true },
      intro: 'Em đeo tai nghe nghe băng cả đêm. Em tưởng chú ấy đang ngủ.',
      alibi: 'Em nằm trên giường suốt, chỉ xuống đi vệ sinh một lần lúc nửa đêm.',
      motive: 'Em không quen chú ấy. Chú cho em mượn quạt giấy lúc chiều.',
      presents: {
        thermos: { line: 'Phích đỏ này... Khoảng 01:20 em thấy chị thư ký rót trà từ phích đỏ cho chú Hải, rồi ngồi lại rất lâu. Em đang nghe băng nên tưởng mình mơ.', unlock: 'thu-saw', mood: 'nervous' },
        hairpin: { line: 'Không phải của em đâu, em cắt tóc ngắn rồi. Chị thư ký kẹp tóc bằng một đôi kẹp đồi mồi.', unlock: 'thu-saw' },
        tea: { line: 'Chú Hải uống trà lúc khuya. Có người rót cho chú... khoảng 01:20 thì phải.', unlock: 'thu-saw' }
      },
      fallback: ['Em xin lỗi, em không để ý.', 'Em sợ lắm, khi nào tàu tới ga ạ?']
    }
  ],

  deductions: [
    { a: 'tea', b: 'thermos', title: 'Trà pha thuốc', text: 'Thuốc ngủ được nghiền và pha vào trà rót từ phích đỏ — chiếc phích riêng của Trúc.' },
    { a: 'window', b: 'victim', title: 'Kẻ lạ không có thật', text: 'Hải chết vì thuốc, không vật lộn. Cửa sổ hé mở chỉ để dựng cảnh có người trèo vào.' },
    { a: 'kha-dining', b: 'thu-saw', title: 'Ngoại phạm sụp đổ', text: 'Toa ăn đóng cửa từ 23:00, còn lúc 01:20 Trúc đang rót trà trong khoang của Hải.' },
    { a: 'rack', b: 'kha-log', title: 'Chiếc cặp biến mất', text: 'Chiếc cặp bản vẽ rời khoang 3 cùng Trúc lúc 01:50, hướng về toa 8.' },
    { a: 'loc-deal', b: 'kha-log', title: 'Người bán bản vẽ', text: 'Người phụ nữ chào bán bản vẽ hẹn giao ở ga Đà Nẵng — và chiếc cặp đang đi cùng Trúc tới đó.' },
    { a: 'hairpin', b: 'thu-saw', title: 'Chiếc kẹp tóc đồi mồi', text: 'Kẹp tóc của Trúc rơi trong khoang khi cô ngồi lại bên Hải sau 01:20.' }
  ],

  // Phim tái hiện sau khi phá án (js/engine/replay.js). Vệt bụi trên giường tầng (block thứ 3)
  // tạm dựng thành chiếc cặp bản vẽ cho tới khi Trúc lấy đi.
  replay: {
    start: [
      { type: 'body', set: { hidden: true } },
      { type: 'bit', set: { hidden: true } },
      { type: 'bottle', set: { hidden: true } },
      { type: 'person', i: 0, set: { hidden: true } },   // toa trưởng: do Hồ Văn Kha đóng
      { type: 'block', i: 2, set: { w: 0.32, d: 0.32, h: 0.2, color: '#3a2a20' } }
    ],
    beats: [
      { t: '22:00', place: 'Hành lang toa 7', card: ['loc', 'victim'], clues: ['loc-deal'], text: 'Thương lái Đặng Lộc cãi nhau với kỹ sư Hải chuyện thầu. Lộc biết có kẻ đang rao bán bản vẽ gốc cầu Sông Hàn, và Hải cũng vừa nhận ra điều đó.' },
      { t: '23:00', place: 'Toa ăn', card: ['kha'], clues: ['kha-dining'], text: 'Toa trưởng Kha khóa cửa toa ăn lúc 23:00. Sau giờ này, không ai có thể ngồi trong đó.' },
      {
        t: '01:15', clues: ['thermos'], text: 'Trong khoang 3, Hải đối chất với thư ký Nguyễn Thanh Trúc về bản vẽ bị chụp trộm. Trúc lấy ra chiếc phích trà đỏ của riêng mình, không phải phích của tàu.',
        patch: [{ type: 'bottle', set: { hidden: false }, after: 3 }],
        cast: {
          victim: { at: [0.55, 1.3], pose: 'sit', face: 'right', sort: 2 },
          truc: { at: [2.9, 1.3], pose: 'sit', face: 'left', sort: 2 }
        },
        cam: { X: 1.7, z: 1.2, h: 1, zoom: 1.4 }
      },
      {
        t: '01:20', clues: ['thu-saw', 'tea'], text: 'Trúc rót trà cho Hải. Trong cốc đã có sẵn thuốc ngủ nghiền nát. Từ giường trên, Lâm Minh Thư hé mắt nhìn thấy.',
        cast: { truc: { pose: 'stand', sort: null, path: [[2.3, 1.1], [1.9, 1.0]], face: 'back', holding: '#9a3426' } },
        cam: { X: 1.7, z: 0.5, h: 0.9, zoom: 1.8 }
      },
      {
        t: '01:40', clues: ['victim'], dark: true, text: 'Trúc ngồi chờ thuốc ngấm. Hải lả dần rồi gục xuống sàn khoang. Không có vết thương nào, chỉ có đồng tử co lại.',
        cast: {
          truc: { holding: null, path: [[2.5, 1.0], [2.9, 1.3]], then: { pose: 'sit', face: 'left', sort: 2 } },
          victim: { then: { delay: 3, pose: 'body', at: [0.85, 1.05], dir: 'right', sort: null } }
        }
      },
      {
        t: '01:48', clues: ['window'], dark: true, text: 'Cô đẩy hé cửa sổ để dựng cảnh một kẻ lạ trèo vào. Nhưng lớp bụi ngoài bậu cửa không hề bị xáo trộn.',
        cast: { truc: { pose: 'stand', sort: null, path: [[2.4, 1.1], [1.75, 1.0]], face: 'back' } },
        cam: { X: 1.7, z: 0.4, h: 1.2, zoom: 1.8 }
      },
      {
        t: '01:50', clues: ['rack', 'hairpin'], dark: true, text: 'Trúc với lấy chiếc cặp bản vẽ trên giường tầng, để lại vệt bụi hình chữ nhật. Chiếc kẹp tóc đồi mồi tuột khỏi tóc, rơi xuống mép giường.',
        patch: [{ type: 'block', i: 2, set: { w: 0.55, d: 0.02, h: 0.003, color: '#5a5446' }, after: 2.6 }, { type: 'bit', set: { hidden: false }, after: 3 }],
        cast: { truc: { path: [[2.45, 1.5], [2.95, 1.3]], face: 'back', then: { delay: 0.8, holding: '#3a2a20' } } },
        cam: { X: 2.9, z: 1, h: 1.4, zoom: 1.7 }
      },
      {
        t: '01:52', clues: ['kha-log'], text: 'Cô xách cặp đi dọc hành lang sang toa 8. Toa trưởng Kha ghi vào sổ trực: "01:50, chị Trúc xách cặp sang toa 8".',
        cast: {
          kha: { at: [6.5, 2.35], face: 'left' },
          truc: { path: [[3.0, 2.3], [6.95, 2.4]], speed: 1.1, then: { hide: true } }
        }
      },
      {
        t: '02:10', text: 'Toa trưởng Kha phát hiện Hải lúc 02:10. Khi bị hỏi, Trúc khai cô ngồi ở toa ăn suốt đêm, dù toa ăn đã khóa từ 23:00.',
        cast: { kha: { path: [[3.1, 2.3], [2.55, 1.75]], face: 'left' } }
      }
    ]
  },

  meta: { title: "Thép trụ 13", fragment: "Sổ tay kỹ sư Hải: \"Thép trụ 13 không đạt mác. Đã báo Phòng hồ sơ đặc biệt — chưa thấy hồi âm.\" Bản vẽ trụ 13 là thứ duy nhất biến mất khỏi chiếc cặp." },

  solution: {
    culprit: 'truc',
    evidence: ['thu-saw', 'kha-dining', 'kha-log', 'thermos', 'tea', 'hairpin', 'loc-deal', 'rack'],
    summary: 'Nguyễn Thanh Trúc định bán bản vẽ gốc cầu Sông Hàn cho công ty đối thủ ở ga Đà Nẵng. Khi Hải phát hiện, cô nghiền thuốc ngủ vào trà từ phích riêng và rót cho anh lúc 01:20, ngồi chờ thuốc ngấm. Lúc 01:50 cô xách cặp bản vẽ sang toa 8, hé cửa sổ để dựng cảnh kẻ lạ, rồi bịa ngoại phạm ở toa ăn đã đóng cửa.',
    epilogue: 'Chiếc cặp được tìm thấy trong khoang vệ sinh toa 8, bên trong thiếu đúng một tập: bản vẽ trụ cầu số 13.'
  }
});
