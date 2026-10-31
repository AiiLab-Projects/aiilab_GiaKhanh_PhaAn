/* Hồ sơ #01 — Căn phòng 204 */
(window.HS13 = window.HS13 || { cases: [] }).cases.push({
  id: 'phong-204',
  number: '01',
  title: 'Căn phòng 204',
  titleHtml: 'Căn phòng <em>204</em>',
  location: 'Nhà nghỉ Minh Tân · Phòng 204',
  datetime: 'Thứ Ba, 12.10.1999',
  clock: '22:58',
  weather: '☔ MƯA NHỎ',
  difficulty: 1,
  tagline: 'Một căn phòng khóa trái. Một cuộc gọi lúc 22:31. Và một con số xuất hiện ở nơi không nên có.',
  theme: { accent: '#c0503a', accent2: '#2f7189', soft: '#f6e3dc', mood: 'Đêm mưa · nhà nghỉ ven ga' },
  interview: { place: 'Phòng trực nhà nghỉ Minh Tân', alibiQ: 'Từ 22:00 đến 22:30 tối qua, anh/chị ở đâu và làm gì?', motiveQ: 'Anh/chị quen biết Nguyễn Minh thế nào?', props: 'office' },
  victim: { name: 'Nguyễn Minh, 34 tuổi', desc: 'Phóng viên tự do. Được phát hiện nằm cạnh bàn làm việc lúc 22:46.' },
  briefing: [
    'Thành phố Vạn Phúc đang bước vào mùa mưa năm 1999. Những khu chung cư cũ, nhà nghỉ ven ga và các con hẻm sáng đèn neon là địa bàn của Phòng Hồ Sơ Đặc Biệt.',
    'Nguyễn Minh, 34 tuổi, phóng viên tự do, được tìm thấy trong phòng 204 nhà nghỉ Minh Tân. Cửa khóa từ bên trong. Công an phường đã ghi sơ bộ: tự sát.',
    'Minh đang viết một loạt bài anh gọi là "Hồ sơ 13". Tôi không tin vào sự trùng hợp. Hãy khám hiện trường, hỏi người liên quan và tự quyết định điều gì là thật.'
  ],
  sceneBrief: 'Thi thể nằm cạnh bàn làm việc. Cửa khóa từ bên trong, đồ đạc gần như nguyên vẹn, nhưng chiếc ghế bị đổ và cơ thể có dấu hiệu bị khống chế.',
  objective: 'Xác định Nguyễn Minh chết lúc nào, bằng cách nào, và ai đã khóa căn phòng.',
  question: 'Ai đã giết Nguyễn Minh?',

  // Hiện trường vẽ sẵn (Gemini). spots: id → [x, y, bán kính, dụng cụ], toạ độ theo ảnh gốc 1024×572
  art: {
    src: 'img/scenes/phong-204.jpg', w: 1024, h: 572,
    decals: [{ type: 'text', uv: true, x: 640, y: 200, text: '13', size: 44, color: 'rgba(255,120,150,.95)', rot: -4 }],
    spots: {
      victim: [600, 395, 70], receipt: [912, 358, 22, 'loupe'], radio: [978, 338, 26], phone: [842, 318, 26, 'print'],
      window: [790, 170, 50], shoe: [440, 470, 50], number: [640, 200, 34, 'uv'], door: [366, 236, 24, 'loupe']
    }
  },
  spec: {
    seed: 'phong-204',
    geometry: { width: 7, depth: 4.5, horizon: 104, top: 4 },
    room: {
      wall: { type: 'wallpaper', color: '#3b4744', accent: '#425049', stains: 5, wainscot: { h: 0.85, color: '#3a2b26' }, cap: '#211f24' },
      floor: { type: 'wood', colors: ['#5a3d2e', '#4f3527', '#634434', '#553a2c'] }
    },
    weather: 'rain',
    ambient: [0.34, 0.35, 0.46],
    lights: [
      { X: 1.95, z: 0.3, h: 1.4, r: 2.6, color: '#7c9cc8', intensity: 0.75 },
      { X: 5.85, z: 2.5, h: 1.15, r: 2.4, color: '#ffcf8a', intensity: 1.15 },
      { X: 0.75, z: 2.2, h: 0.8, r: 1.7, color: '#9fbadb', intensity: 0.65, flicker: 0.35 },
      { X: 3.5, z: 2.1, h: 2.25, r: 4.2, color: '#ffd8a0', intensity: 0.55, flicker: 0.12 }
    ],
    beams: [{ from: [1.95, 0.05, 1.5], to: [2.25, 1.7], w: 1.3, sw: 0.5, color: '#8fa8cc', a: 0.07 }],
    spawn: { X: 1.1, z: 4.1 },
    props: [
      { type: 'window', X: 1.4, h: 0.95, w: 1.1, hh: 1.15, view: 'alley', curtain: '#5e2f2c', neon: '#e0485a' },
      { type: 'painting', X: 3.2, h: 1.55, w: 0.6, hh: 0.42, art: 'landscape', tilt: true },
      { type: 'text', X: 4.62, h: 1.42, text: '13', size: 2, color: '#8e2826', paintOver: '#41504a' },
      { type: 'door', X: 5.75, w: 0.9, number: '204', chain: true, color: '#4a2d24', gap: '#e8c27a' },
      { type: 'sconce', X: 2.75, h: 1.75 },
      { type: 'wardrobe', X: 0.1, z: 0.05, w: 1.0, d: 0.55, h: 1.95, ajar: true },
      { type: 'bed', X: 2.75, z: 0.07, w: 1.45, d: 2.0, color: '#5b3f4b', messy: true },
      { type: 'tv', X: 0.2, z: 1.9, on: true },
      { type: 'rug', X: 1.4, z: 2.45, w: 2.5, d: 1.5, color: '#5a2a2a' },
      { type: 'desk', X: 4.8, z: 2.3, w: 1.35, d: 0.6, color: '#4e3426', drawerOpen: true },
      { type: 'lamp', X: 5.9, z: 2.45, e: 0.76 },
      { type: 'phone', X: 5.0, z: 2.4, e: 0.76, offhook: true },
      { type: 'radio', X: 5.45, z: 2.38, e: 0.76, on: true },
      { type: 'sheet', X: 5.1, z: 2.62, e: 0.765, w: 0.14, d: 0.1, torn: true, color: '#efe6cf', ink: '#6a5a4a' },
      { type: 'papers', X: 5.6, z: 2.68, e: 0.765, n: 2, spread: 0.2 },
      { type: 'chair', X: 4.25, z: 3.05, fallen: true, color: '#4a3530' },
      { type: 'body', X: 2.5, z: 3.05, dir: 'right', look: { coat: '#c6c0b3', shirt: '#e2ddd0', pants: '#2f3038', skin: '#bd9a87', hair: '#1c1719' } },
      { type: 'papers', X: 2.2, z: 3.85, n: 3, spread: 0.6 },
      { type: 'footprints', X: 6.15, z: 0.75, X2: 4.55, z2: 2.0, n: 5, color: 'rgba(52,36,24,.6)' },
      { type: 'pendant', X: 3.5, z: 2.1, h: 2.25, bare: true }
    ],
    hotspots: [
      { id: 'victim', X: 3.4, z: 3.2, h: 0.1, r: 0.55 },
      { id: 'receipt', X: 5.2, z: 2.65, h: 0.78, r: 0.16 },
      { id: 'radio', X: 5.45, z: 2.42, h: 0.88, r: 0.16 },
      { id: 'phone', X: 5.0, z: 2.46, h: 0.82, r: 0.16 },
      { id: 'window', X: 1.95, z: 0, h: 1.5, r: 0.45, pz: 0.6 },
      { id: 'shoe', X: 5.0, z: 1.6, h: 0, r: 0.3 },
      { id: 'number', X: 4.8, z: 0, h: 1.35, r: 0.25, pz: 0.6 },
      { id: 'door', X: 6.2, z: 0, h: 1.0, r: 0.4, pz: 0.6 }
    ]
  },

  clues: [
    { id: 'victim', kind: 'vat', label: 'Khám nghiệm sơ bộ', short: 'Vết bầm vòng cung ở cổ tay', detail: 'Nạn nhân nằm nghiêng, đầu hướng về bàn làm việc. Cổ tay trái có vết bầm hình vòng cung như bị bóp chặt. Môi tím tái, không có hung khí trong tầm tay — rất khó là tự sát.' },
    { id: 'receipt', kind: 'vat', label: 'Hóa đơn bị xé', short: 'Quán Thanh Xuân — 21:58', detail: 'Nửa tờ hóa đơn quán cà phê Thanh Xuân, đối diện nhà nghỉ: "Bàn 6 — 1 bạc xỉu — 21:58". Mặt sau có dòng chữ viết vội: "204 — chìa phụ". Nét chữ không phải của Minh.' },
    { id: 'radio', kind: 'vat', label: 'Radio hẹn giờ', short: 'Hẹn bật lúc 23:17', detail: 'Chiếc radio đang phát kênh FM 91.5. Nút hẹn giờ được vặn để tự bật lúc 23:17 — sau khi thi thể đã được phát hiện. Ai đó muốn căn phòng có tiếng động.' },
    { id: 'phone', kind: 'vat', label: 'Điện thoại bàn', short: 'Cuộc gọi đi — 22:31, 13 giây', detail: 'Ống nghe bị nhấc khỏi máy. Bộ nhớ ghi một cuộc gọi đi lúc 22:31, dài 13 giây. Số nhận đã bị xóa, nhưng tổng đài vẫn lưu được đầu số máy nhắn tin.' },
    { id: 'window', kind: 'vat', label: 'Cửa sổ', short: 'Chốt cài từ bên trong', detail: 'Chốt cửa sổ vẫn cài. Bậu cửa bên ngoài phủ rêu ướt, không có dấu chân hay vết trượt. Không ai ra vào bằng lối này.' },
    { id: 'shoe', kind: 'vat', label: 'Vết ủng bùn', short: 'Cỡ 41, đế có hình tam giác', detail: 'Năm dấu ủng bùn đi từ cửa tới cạnh bàn. Cỡ 41, đế khắc hình tam giác — loại ủng lao động. Minh đi dép trong nhà, cỡ 39.' },
    { id: 'number', kind: 'vat', label: 'Con số dưới lớp sơn', short: '"13" bằng mực đỏ', detail: 'Hai chữ số "13" viết bằng mực đỏ, bị quét sơn che vội nhưng sơn chưa phủ kín. Trong sổ tay của Minh, "Hồ sơ 13" là loạt bài về công ty vận tải Hưng Thịnh.' },
    { id: 'door', kind: 'vat', label: 'Ổ khóa cửa', short: 'Không bị phá, có vết xước mới', detail: 'Cửa khóa bằng ổ xoay, dây xích chưa cài. Lỗ khóa phía ngoài có vết xước mới như vừa tra một chìa không quen tay. Chìa chính vẫn nằm trong túi áo nạn nhân.' },
    { id: 'bao-key', kind: 'loi', label: 'Sổ giao chìa phụ', short: 'Ký nhận lúc 21:40 — "K."', detail: 'Bảo vệ Bảo khai: 21:40 một người đàn ông tự xưng là anh họ của Minh đã mượn chìa phụ phòng 204. Anh ta đi ủng lao động, ký sổ bằng một chữ "K." và trả chìa lúc 22:40.' },
    { id: 'hanh-sound', kind: 'loi', label: 'Âm thanh lúc 22:10', short: 'Ghế đổ, rồi im lặng', detail: 'Lê Hạnh ở phòng 304 ngay phía trên: khoảng 22:10 có tiếng ghế đổ và tiếng giằng co ngắn, rồi im hẳn. Không có tiếng radio nào cho tới 23:17.' },
    { id: 'quan-autopsy', kind: 'loi', label: 'Nhận định pháp y', short: 'Chết do ngạt, 22:00–22:20', detail: 'Bác sĩ Quân thừa nhận: Minh chết do bị làm ngạt trong khoảng 22:00–22:20. Vết bầm cổ tay do bị một người thuận tay phải nắm chặt. Ông bị "nhắc khéo" phải ghi là tự sát.' },
    { id: 'khang-pager', kind: 'loi', label: 'Máy nhắn tin của Khang', short: 'Nhận cuộc gọi từ phòng 204 lúc 22:31', detail: 'Máy nhắn tin của Đỗ Khang lưu một cuộc gọi đến lúc 22:31 từ số máy phòng 204 — đúng cuộc gọi 13 giây. Lúc đó Minh đã chết ít nhất 10 phút.' }
  ],

  suspects: [
    {
      id: 'bao', name: 'Trần Văn Bảo', role: 'bảo vệ ca đêm',
      look: { skin: '#b88f72', hair: '#2a2524', hairStyle: 'short', coat: '#3c4a5c', shirt: '#cfc8b6', pants: '#2b2f3a', hat: 'cap', hatColor: '#2c3a52', badge: true },
      intro: 'Tôi không rời khỏi phòng trực cả tối. Camera cổng cũng không hỏng, tôi thề.',
      alibi: 'Sổ trực ghi tôi ở cổng chính từ 21:50 đến 22:30. Camera cổng quay được tôi suốt.',
      motive: 'Anh Minh thuê phòng dài ngày, trả tiền đúng hạn. Tôi chẳng có lý do gì hại anh ấy.',
      presents: {
        door: { line: 'Được rồi... 21:40 có một người tự xưng là anh họ của Minh mượn chìa phụ. Anh ta dúi cho tôi ít tiền. Tôi chỉ bắt ký sổ thôi.', unlock: 'bao-key', mood: 'nervous' },
        receipt: { line: 'Chữ "chìa phụ" à? Người mượn chìa ngồi quán Thanh Xuân cả buổi tối, tôi thấy anh ta nhìn sang đây. Đi ủng lao động, ký một chữ "K.".', unlock: 'bao-key', mood: 'nervous' },
        shoe: { line: 'Ủng lao động... Người mượn chìa cũng đi ủng như vậy. Bùn đỏ, giống ngoài bến xe.', mood: 'nervous' }
      },
      fallback: ['Tôi chỉ là bảo vệ. Cái đó thì tôi không biết.', 'Anh hỏi người khác đi, ca của tôi chỉ có cái cổng.']
    },
    {
      id: 'hanh', name: 'Lê Hạnh', role: 'khách thuê phòng 304',
      look: { skin: '#d1a88f', hair: '#1a1416', hairStyle: 'long', coat: '#6a3a44', shirt: '#e0d2c0', pants: '#2a2228', dress: '#6a3a44', earrings: true },
      intro: 'Tôi chỉ nghe thấy vài âm thanh. Phòng 204? Tôi chưa từng bước vào đó.',
      alibi: 'Từ 22:04 đến 22:28 tôi gọi điện cho em gái ở Đà Lạt. Bưu điện có ghi lại.',
      motive: 'Tôi không quen anh ta. Thỉnh thoảng gặp ở cầu thang, anh ấy hay ôm một xấp giấy.',
      presents: {
        radio: { line: 'Radio? Không... lúc 22:10 tôi nghe tiếng ghế đổ, tiếng giằng co rất ngắn rồi im hẳn. Radio chỉ bật lên lúc 23:17. Tôi không nói vì sợ bị đuổi khỏi nhà nghỉ.', unlock: 'hanh-sound', mood: 'nervous' },
        victim: { line: 'Trời ơi... Tôi đã nghe thấy mà không xuống. Lúc đó là khoảng 22:10, tôi đang gọi cho em gái.', unlock: 'hanh-sound', mood: 'nervous' },
        number: { line: 'Số 13 à? Anh ấy hay lẩm bẩm "mười ba" mỗi lần gọi điện. Như một cái tên.' }
      },
      fallback: ['Tôi không biết gì về chuyện đó.', 'Tôi chỉ muốn yên ổn ở đây thôi, anh hiểu không?']
    },
    {
      id: 'quan', name: 'Phạm Quân', role: 'bác sĩ trực bệnh viện quận',
      look: { skin: '#c79e83', hair: '#3a3436', hairStyle: 'side', coat: '#dedbd2', shirt: '#9ab0c0', pants: '#3a3d44', glasses: true },
      intro: 'Hồ sơ khám nghiệm đã rõ. Có lẽ cậu nên đọc kỹ hơn trước khi hỏi.',
      alibi: 'Camera bệnh viện ghi tôi ở phòng cấp cứu từ 21:45 đến 22:35.',
      motive: 'Tôi chỉ ký giấy chứng tử. Tôi không quen nạn nhân.',
      presents: {
        victim: { line: '...Vết bầm đó không thể tự gây ra. Minh chết do bị làm ngạt, khoảng 22:00 đến 22:20. Có người gọi cho tôi trước khi cảnh sát tới, bảo tôi ghi "tự sát". Tôi đã sửa bản nháp.', unlock: 'quan-autopsy', mood: 'nervous' },
        phone: { line: 'Cuộc gọi 22:31? Nếu vậy thì người gọi không thể là Minh. Lúc đó anh ta đã chết rồi.' }
      },
      fallback: ['Đó không phải chuyên môn của tôi.', 'Tôi đã nói những gì cần nói trong hồ sơ.']
    },
    {
      id: 'khang', name: 'Đỗ Khang', role: 'người báo án, tài xế công ty Hưng Thịnh',
      look: { skin: '#a8805f', hair: '#191516', hairStyle: 'short', coat: '#4a4a3a', shirt: '#8a8470', pants: '#30302a', shoes: '#3a2a1e', beard: true },
      intro: 'Tôi tìm thấy cửa mở. Sau đó nó tự khóa lại, nghe thật vô lý phải không?',
      alibi: 'Tôi chạy xe cả tối, 22:40 mới ghé để trả Minh ít tài liệu. Tôi gọi công an lúc 22:31... à không, 22:46.',
      motive: 'Minh là bạn học cũ. Anh ta hay hỏi tôi chuyện xe tải của Hưng Thịnh, chỉ vậy thôi.',
      presents: {
        phone: { line: 'Máy nhắn tin của tôi báo một cuộc gọi lúc 22:31 thì sao? Có thể Minh gọi cho tôi trước khi... Tôi không nghe máy.', unlock: 'khang-pager', mood: 'nervous' },
        shoe: { line: 'Cả thành phố này ai chẳng đi ủng mùa mưa. Cỡ 41 thì nhiều lắm.', mood: 'angry' },
        number: { line: 'Mười ba... Tôi không biết. Minh hay viết linh tinh lên tường.', mood: 'nervous' },
        'bao-key': { line: '"K." thì có hàng trăm người. Anh định đổ cho tôi chỉ vì một chữ cái à?', mood: 'angry' },
        receipt: { line: 'Quán Thanh Xuân thì ai cũng ngồi được. Tôi không nhớ tối đó mình ở đâu lúc 21:58.', mood: 'nervous' }
      },
      fallback: ['Tôi là người báo án mà! Anh nên cảm ơn tôi mới phải.', 'Tôi không biết gì thêm.']
    }
  ],

  deductions: [
    { a: 'radio', b: 'hanh-sound', title: 'Thời điểm tử vong', text: 'Minh chết khoảng 22:10. Radio được hẹn giờ bật lúc 23:17 để tạo cảm giác trong phòng vẫn có người.' },
    { a: 'victim', b: 'quan-autopsy', title: 'Không phải tự sát', text: 'Minh bị một người thuận tay phải khống chế rồi làm ngạt. Biên bản "tự sát" là do có người gây sức ép lên bác sĩ.' },
    { a: 'phone', b: 'khang-pager', title: 'Cuộc gọi của người chết', text: 'Cuộc gọi 22:31 tới máy nhắn tin của Khang được bấm khi Minh đã chết: hung thủ dựng bằng chứng rằng Minh còn sống.' },
    { a: 'door', b: 'bao-key', title: 'Căn phòng khóa trái', text: 'Căn phòng được khóa từ bên ngoài bằng chìa phụ. Người mượn chìa lúc 21:40 ký tên "K." và trả chìa lúc 22:40.' },
    { a: 'shoe', b: 'receipt', title: 'Kẻ ngồi chờ bên kia đường', text: 'Người đi ủng cỡ 41 đã ngồi ở quán Thanh Xuân canh phòng 204 tới 21:58, ghi sẵn ghi chú về chìa phụ.' },
    { a: 'number', b: 'khang-pager', title: 'Hồ sơ 13', text: 'Khang lái xe cho Hưng Thịnh, công ty mà loạt bài "Hồ sơ 13" của Minh đang điều tra. Đó là động cơ.' }
  ],

  // Phim tái hiện sau khi phá án (js/engine/replay.js). start: trạng thái đồ vật trước khi vụ án xảy ra
  replay: {
    start: [
      { type: 'body', set: { hidden: true } },
      { type: 'footprints', set: { hidden: true } },
      { type: 'papers', i: 1, set: { hidden: true } },
      { type: 'sheet', set: { hidden: true } },
      { type: 'text', set: { paintOver: null } },
      { type: 'chair', set: { fallen: false, X: 4.95, z: 2.95, facing: 'back' } },
      { type: 'phone', set: { offhook: false } },
      { type: 'radio', set: { on: false } },
      { type: 'desk', set: { drawerOpen: false } }
    ],
    beats: [
      {
        t: '21:00', text: 'Nguyễn Minh ngồi bên bàn làm việc trong phòng 204, viết tiếp loạt bài "Hồ sơ 13" về công ty vận tải Hưng Thịnh. Con số 13 bằng mực đỏ trên tường là ký hiệu riêng của anh.',
        cast: { victim: { at: [5.2, 3.05], pose: 'sit', face: 'back' } }, cam: { X: 5, z: 2.5, h: 1.1, zoom: 1.5 }
      },
      { t: '21:40', place: 'Cổng nhà nghỉ Minh Tân', card: ['khang', 'bao'], clues: ['bao-key'], text: 'Một người đàn ông đi ủng lao động tự xưng là anh họ của Minh, dúi tiền cho bảo vệ Bảo để mượn chìa phụ phòng 204. Anh ta ký sổ bằng một chữ "K.".' },
      { t: '21:58', place: 'Quán cà phê Thanh Xuân', card: ['khang'], clues: ['receipt'], text: 'Đỗ Khang ngồi bàn 6 quán Thanh Xuân, nhìn sang cửa sổ phòng 204. Trên mặt sau hóa đơn, hắn ghi vội: "204 — chìa phụ".' },
      {
        t: '22:08', clues: ['shoe'], text: 'Khang tra chìa phụ vào ổ khóa rồi đi thẳng tới bàn làm việc. Đôi ủng cỡ 41 để lại năm dấu bùn trên sàn. Minh đứng bật dậy.',
        patch: [{ type: 'door', set: { open: true } }, { type: 'footprints', set: { hidden: false }, after: 2.4 }],
        cast: {
          khang: { at: [6.2, 0.55], path: [[6.0, 1.2], [4.6, 2.05]], face: 'front', speed: 1.0, delay: 0.5 },
          victim: { then: { delay: 2.6, pose: 'stand', at: [4.35, 3.2], face: 'back' } }
        }
      },
      {
        t: '22:10', clues: ['victim', 'hanh-sound', 'quan-autopsy'], fx: 'flash', fxAt: 1.6,
        text: 'Khang dùng tay phải khóa chặt cổ tay trái của Minh rồi làm ngạt anh. Chiếc ghế đổ xuống sàn. Lê Hạnh ở phòng 304 ngay phía trên nghe tiếng giằng co, rồi mọi thứ im bặt.',
        patch: [{ type: 'chair', set: { fallen: true, X: 4.25, z: 3.05, facing: null }, after: 1.6 }],
        cast: { khang: { path: [[4.1, 2.75]], face: 'front', speed: 1.4 }, victim: { then: { delay: 1.6, pose: 'body', at: [2.5, 3.05], dir: 'right' } } },
        cam: { X: 3.8, z: 3, h: 0.7, zoom: 1.6 }
      },
      {
        t: '22:15', text: 'Hắn lục ngăn kéo, vơ hết tài liệu về Hưng Thịnh. Vài trang rơi vương xuống sàn cạnh thi thể.',
        patch: [{ type: 'desk', set: { drawerOpen: true }, after: 2 }, { type: 'papers', i: 1, set: { hidden: false }, after: 3 }],
        cast: { khang: { path: [[4.5, 2.05], [5.6, 2.05]], face: 'front' } }, cam: { X: 5.3, z: 2.4, h: 1, zoom: 1.5 }
      },
      {
        t: '22:20', clues: ['number'], text: 'Thấy con số 13 trên tường, Khang quét sơn lên che đi. Lớp sơn vội vàng không phủ kín.',
        patch: [{ type: 'text', set: { paintOver: '#41504a' }, after: 2.6 }],
        cast: { khang: { path: [[4.7, 1.0]], face: 'back' } }, cam: { X: 4.6, z: 0.6, h: 1.3, zoom: 1.7 }
      },
      {
        t: '22:24', clues: ['radio'], text: 'Hắn vặn radio hẹn giờ tự bật lúc 23:17, để căn phòng có tiếng động khi người khác tới. Nửa tờ hóa đơn quán Thanh Xuân rơi lại trên bàn.',
        patch: [{ type: 'sheet', set: { hidden: false }, after: 2.4 }],
        cast: { khang: { path: [[5.4, 2.05]], face: 'front' } }, cam: { X: 5.4, z: 2.4, h: 1, zoom: 1.7 }
      },
      {
        t: '22:31', clues: ['phone', 'khang-pager'], text: 'Khang nhấc điện thoại của Minh, gọi tới máy nhắn tin của chính mình trong 13 giây. Hắn dựng chứng cứ giả rằng lúc 22:31 Minh vẫn còn sống.',
        patch: [{ type: 'phone', set: { offhook: true }, after: 1.2 }],
        cast: { khang: { path: [[5.0, 2.05]], face: 'front' } }, cam: { X: 5, z: 2.4, h: 1, zoom: 1.7 }
      },
      {
        t: '22:38', clues: ['door'], text: 'Hắn bước ra, khóa cửa từ bên ngoài bằng chìa phụ, rồi 22:40 trả chìa cho bảo vệ. Căn phòng "khóa trái" trong khi chìa chính vẫn nằm trong túi áo Minh.',
        patch: [{ type: 'door', set: { open: false }, after: 2.6 }],
        cast: { khang: { path: [[6.0, 1.3], [6.2, 0.55]], then: { hide: true, delay: 0.3 } } }
      },
      {
        t: '22:46', text: 'Khang quay lại, "phát hiện" thi thể và gọi báo án. Vai người báo án vô can là do chính hắn dựng nên.',
        patch: [{ type: 'door', set: { open: true } }],
        cast: { khang: { at: [6.2, 0.55], path: [[5.9, 1.6]], face: 'left', delay: 0.4 } }
      },
      {
        t: '23:17', text: 'Radio tự bật như đã hẹn giờ. Nhưng Lê Hạnh nhớ rõ: khoảng 22:10 có tiếng ghế đổ, sau đó im lặng hoàn toàn. Thời điểm tử vong không thể bị dời đi.',
        patch: [{ type: 'radio', set: { on: true }, after: 0.8 }],
        cam: { X: 5.45, z: 2.4, h: 0.9, zoom: 1.8 }
      }
    ]
  },

  meta: { title: "Bản sao số 1", fragment: "Trong tập tài liệu Khang lấy lại có một bìa cứng ghi \"HỒ SƠ 13 — bản 1/3\". Bên trong trống rỗng: ai đó đã rút ruột trước cả Khang. Còn cuộc gọi cho bác sĩ Quân lúc 22:52 đi ra từ một máy lẻ nội bộ có số 13." },

  solution: {
    culprit: 'khang',
    evidence: ['bao-key', 'khang-pager', 'shoe', 'receipt', 'door', 'hanh-sound', 'radio', 'number'],
    summary: 'Đỗ Khang ngồi ở quán Thanh Xuân canh phòng 204, rồi lúc 21:40 mượn chìa phụ từ bảo vệ dưới danh nghĩa anh họ của Minh. Khoảng 22:10, Khang khống chế và làm ngạt Minh để lấy lại tài liệu về Hưng Thịnh. Hắn hẹn giờ radio, dùng điện thoại của Minh gọi tới máy nhắn tin của mình lúc 22:31 để dựng chứng cứ rằng Minh còn sống, khóa cửa bằng chìa phụ rồi quay lại "phát hiện" thi thể lúc 22:46.',
    epilogue: 'Bản ghi "tự sát" bị hủy. Nhưng người đã gọi cho bác sĩ Quân trước khi cảnh sát tới vẫn chưa có tên trong hồ sơ.'
  }
});
