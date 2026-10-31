/* Hồ sơ #06 — Rạp chiếu bóng Tháng Tám */
(window.HS13 = window.HS13 || { cases: [] }).cases.push({
  id: 'rap-thang-tam',
  number: '06',
  title: 'Cuộn phim cuối cùng',
  titleHtml: 'Cuộn phim <em>cuối cùng</em>',
  location: 'Rạp chiếu bóng Tháng Tám · Phố Tràng Thi',
  datetime: 'Thứ Bảy, 13.11.1999',
  clock: '22:40',
  weather: '☂ MƯA PHÙN',
  difficulty: 2,
  tagline: 'Màn ảnh trắng xóa giữa suất chiếu cuối. Trên phòng máy, người thợ chiếu phim nằm cạnh vũng dầu. Nhưng cuộn phim thứ tư vẫn được ai đó nối rất vụng.',
  theme: { accent: '#b0302a', accent2: '#c08a2a', soft: '#f4e2d6', mood: 'Đêm mưa phùn · phòng máy rạp Tháng Tám' },
  interview: { place: 'Phòng vé rạp Tháng Tám', alibiQ: 'Từ 21:40 đến 22:30 tối nay, anh/chị ở đâu trong rạp?', motiveQ: 'Ông Lương Văn Đạt là người thế nào với anh/chị?', props: 'backstage' },
  victim: { name: 'Lương Văn Đạt, 52 tuổi', desc: 'Thợ chiếu phim ba mươi năm của rạp Tháng Tám. Quản lý rạp phát hiện lúc 22:30.' },
  briefing: [
    'Suất chiếu 21:00 đang chạy thì lúc 22:25 màn ảnh bỗng trắng xóa: cuộn phim thứ năm không được đổi. Bà quản lý chạy lên phòng máy và thấy ông Lương Văn Đạt nằm sấp cạnh máy chiếu số 1.',
    'Một can dầu máy đổ lênh láng dưới chân ông. Bác sĩ trực ở đồn ghi nhận: "Trượt ngã, đập đầu vào thành máy."',
    'Nhưng ông Đạt đứng máy ba mươi năm chưa từng ngã. Và mối nối ở cuộn phim thứ tư không giống tay nghề của ông.'
  ],
  sceneBrief: 'Hai máy chiếu 35mm, một chiếc vẫn còn ấm. Giá phim thiếu một ô. Trên sàn: vũng dầu, vài mẩu giấy tròn nhỏ như hạt mưa.',
  objective: 'Tìm thời điểm ông Đạt thật sự chết và người đã thay ông đổi cuộn phim thứ tư.',
  question: 'Ai đã sát hại ông Lương Văn Đạt?',

  art: {
    src: 'img/scenes/rap-thang-tam.jpg', w: 1024, h: 572,
    spots: {
      victim: [320, 415, 70], oil: [235, 490, 40, 'uv'], reel4: [558, 280, 34, 'loupe'], logbook: [735, 280, 26, 'loupe'],
      filmcan: [755, 495, 44, 'print'], confetti: [540, 450, 40, 'loupe'], rack: [790, 140, 55], backpack: [878, 390, 38]
    }
  },

  spec: {
    seed: 'rap-thang-tam',
    geometry: { width: 5.2, depth: 3.6, horizon: 100, top: 3.6 },
    room: {
      wall: { type: 'brick', color: '#4a2c26', accent: '#5a3830', stains: 6, wainscot: { h: 0.8, color: '#2a2422', panel: 0.6 }, cap: '#181414' },
      floor: { type: 'concrete', colors: ['#4a4642', '#3e3a36'] }
    },
    ambient: [0.3, 0.28, 0.32],
    lights: [
      { X: 2.6, z: 1.6, h: 2.3, r: 3.4, color: '#ffd8a0', intensity: 0.85, flicker: 0.04 },
      { X: 0.95, z: 0.1, h: 1.0, r: 1.6, color: '#fff2c8', intensity: 0.9 },
      { X: 4.0, z: 1.3, h: 1.2, r: 1.6, color: '#ffcf8a', intensity: 0.8 }
    ],
    beams: [{ from: [1.25, 0.05, 1.02], to: [1.25, -2], w: 0.25, sw: 0.05, color: '#fff2c8', a: 0.1 }],
    spawn: { X: 4.5, z: 3.3 },
    props: [
      { type: 'poster', X: 0.15, h: 1.25, w: 0.5, hh: 0.7, color: '#8a2a2a' },
      { type: 'window', X: 1.05, h: 1.0, w: 0.4, hh: 0.22, view: 'alley', rain: false, frame: '#1a1614' },
      { type: 'window', X: 2.45, h: 1.0, w: 0.4, hh: 0.22, view: 'alley', rain: false, frame: '#1a1614' },
      { type: 'reelrack', X: 3.35, h: 0.9, w: 1.4, rows: 2, gap: 13 },
      { type: 'door', X: 4.85, w: 0.8, hh: 1.95, color: '#2e2a2a' },
      { type: 'projector', X: 0.95, z: 0.2, running: true },
      { type: 'projector', X: 2.35, z: 0.2, running: false },
      { type: 'desk', X: 3.4, z: 1.15, w: 1.3, d: 0.55, color: '#4a3424' },
      { type: 'lamp', X: 4.45, z: 1.25, e: 0.77, color: '#2a2a2a' },
      { type: 'book', X: 3.55, z: 1.3, e: 0.765, color: '#2a2a3a' },
      { type: 'bit', X: 4.05, z: 1.35, e: 0.77, w: 0.08, d: 0.03, color: '#e8c838' },
      { type: 'filmcan', X: 3.95, z: 1.45, e: 0.77, r: 0.16 },
      { type: 'luggage', X: 4.3, z: 0.25, w: 0.4, d: 0.22, h: 0.4, color: '#4a5a3a', tag: '#d8c8a0' },
      { type: 'stain', X: 1.35, z: 1.45, w: 0.8, d: 0.4, n: 7, color: 'rgba(40,34,20,.8)' },
      { type: 'stain', X: 1.05, z: 1.35, w: 0.3, d: 0.15, n: 3 },
      { type: 'bottle', X: 1.85, z: 1.25, color: '#6a5a2a', label: '#c8a040' },
      { type: 'body', X: 0.75, z: 1.45, dir: 'right', look: { skin: '#b98e70', hair: '#6a645e', hairStyle: 'short', coat: '#3a4a5a', shirt: '#c9c0aa', pants: '#2a2a2e', apron: '#4a3a2a' } },
      { type: 'filmcan', X: 4.5, z: 2.95, r: 0.18, dent: true },
      { type: 'bit', X: 2.75, z: 2.2, w: 0.03, d: 0.03, color: '#efe6cc', glint: true },
      { type: 'bit', X: 2.9, z: 2.35, w: 0.03, d: 0.03, color: '#efe6cc' },
      { type: 'bit', X: 3.1, z: 2.6, w: 0.03, d: 0.03, color: '#efe6cc' },
      { type: 'pendant', X: 2.6, z: 1.6, h: 2.3, shade: '#3a2a22' }
    ],
    hotspots: [
      { id: 'victim', X: 1.0, z: 1.5, h: 0.1, r: 0.55 },
      { id: 'oil', X: 1.7, z: 1.3, h: 0.1, r: 0.35 },
      { id: 'reel4', X: 2.6, z: 0.4, h: 1.2, r: 0.35, pz: 0.85 },
      { id: 'logbook', X: 3.75, z: 1.35, h: 0.8, r: 0.22 },
      { id: 'filmcan', X: 4.5, z: 2.95, h: 0, r: 0.25 },
      { id: 'confetti', X: 2.9, z: 2.35, h: 0, r: 0.3 },
      { id: 'rack', X: 4.05, z: 0, h: 1.35, r: 0.4, pz: 0.7 },
      { id: 'backpack', X: 4.5, z: 0.35, h: 0.3, r: 0.25, pz: 0.75 }
    ]
  },

  clues: [
    { id: 'victim', kind: 'vat', label: 'Khám nghiệm ông Đạt', short: 'Chết trước 22:00, vết thương tròn', detail: 'Vết thương sau đầu có hình cung tròn, mép phẳng — không khớp với cạnh vuông của máy chiếu. Nhiệt độ cơ thể cho thấy ông chết khoảng 21:50–22:00, sớm hơn lúc màn ảnh trắng gần nửa tiếng.' },
    { id: 'oil', kind: 'vat', label: 'Vũng dầu máy', short: 'Dầu đổ đè lên vết máu', detail: 'Lớp dầu máy phủ lên trên vệt máu đã khô mép, không nằm bên dưới. Dầu bị đổ ra sau khi ông Đạt đã nằm xuống — "trượt chân" là dàn dựng.' },
    { id: 'reel4', kind: 'vat', label: 'Mối nối cuộn 4', short: 'Băng dính vàng, cắt chéo vụng', detail: 'Cuộn 4 trên máy số 2 được nối bằng băng dính vàng, vết cắt chéo lệch hai lỗ răng. Mọi mối nối khác trong rạp đều là băng trắng, cắt thẳng tắp — kiểu của ông Đạt.' },
    { id: 'logbook', kind: 'vat', label: 'Sổ chiếu phim', short: 'Cuộn 3 lúc 21:45, cuộn 4 bỏ trống', detail: 'Nét chữ ông Đạt: "Cuộn 3 — đổi máy 21:45 ✓". Dòng "Cuộn 4 — 22:05" bỏ trống. Ba mươi năm, ông chưa bỏ sót một dòng nào.' },
    { id: 'filmcan', kind: 'vat', label: 'Hộp phim móp', short: 'Hộp thép rỗng, dính máu', detail: 'Hộp phim thép của cuộn 6 bị đá vào gầm bàn: rỗng, móp một góc, dính máu và vài sợi tóc bạc. Vành hộp tròn khớp với vết thương.' },
    { id: 'confetti', kind: 'vat', label: 'Hạt giấy tròn', short: 'Vụn từ kìm bấm vé', detail: 'Những hạt giấy tròn đường kính 4mm rơi thành vệt từ cửa vào tới máy chiếu. Chúng chỉ sinh ra từ kìm bấm vé — dụng cụ của người soát vé dưới sảnh.' },
    { id: 'rack', kind: 'vat', label: 'Ô trống trên giá phim', short: 'Mất cuộn "Phóng sự trụ 13"', detail: 'Ô thứ tư hàng dưới trống. Nhãn còn dán: "Phóng sự: Khởi công trụ cầu số 13 — 1996". Cuộn phim này không có trong lịch chiếu nào.' },
    { id: 'backpack', kind: 'vat', label: 'Ba lô vải xanh', short: 'Ba cuốn băng VHS sao lậu', detail: 'Trong ba lô có ba băng VHS dán nhãn viết tay — đúng ba phim rạp chiếu tháng này — và một sổ ghi "khách đặt" với giá tiền.' },
    { id: 'kieu-thud', kind: 'loi', label: 'Tiếng "cạch" lúc 21:55', short: 'Ông Kiều nghe từ ghế 13', detail: 'Ông Kiều, ghế 13: "Đoạn phim im lặng thì có tiếng cạch rất to trên phòng máy, như ai đánh rơi hộp sắt. Tôi nhìn đồng hồ: 21:55."' },
    { id: 'huong-door', kind: 'loi', label: 'Tâm ở cửa lúc 22:10', short: 'Thở dốc, tóc ướt mồ hôi', detail: 'Bà Hương: "22:10 tôi ra sảnh thì thấy Tâm ở cửa soát vé, thở hổn hển như vừa chạy cầu thang. Nó bảo đuổi mèo."' },
    { id: 'hien-fuse', kind: 'loi', label: 'Hiển ở hầm điện', short: 'Trả lời bộ đàm lúc 22:00', detail: 'Bà Hương: "22:00 tôi gọi bộ đàm, Hiển trả lời từ hầm điện. Tiếng máy phát ầm ầm đằng sau, không lẫn được."' },
    { id: 'dat-warning', kind: 'loi', label: 'Lời cảnh báo của ông Đạt', short: '"Mai tôi báo chị Hương chuyện thằng Tâm"', detail: 'Hiển: "Chiều nay ông Đạt bảo tôi: mai tôi sẽ báo chị Hương chuyện thằng Tâm, không thể để nó làm thế với phim của rạp."' },
    { id: 'tam-skill', kind: 'loi', label: 'Người biết nối phim', short: 'Chỉ ông Đạt và Tâm', detail: 'Bà Hương: "Cả rạp chỉ có ông Đạt và thằng Tâm biết nối phim, đổi máy. Ông Đạt dạy nó hai năm nay."' },
    { id: 'tam-vhs', kind: 'loi', label: 'Tâm nhận sao phim', short: 'Bán băng lậu, ông Đạt đã biết', detail: 'Tâm: "Em chỉ sao vài phim bán kiếm thêm… Chú Đạt biết rồi, chú bảo sẽ báo chị Hương. Nhưng em không giết chú!"' }
  ],

  suspects: [
    {
      id: 'tam', name: 'Phan Minh Tâm', role: 'soát vé, học việc phòng máy',
      look: { photo: 'img/faces/06-tam.jpg', skin: '#c49a7c', hair: '#141012', hairStyle: 'short', coat: '#7a2a2a', shirt: '#d8cfb8', pants: '#24242a' },
      intro: 'Em đứng cửa soát vé suốt buổi. Màn ảnh trắng em mới biết có chuyện.',
      alibi: 'Từ 21:00 em ở cửa soát vé. Khách vào muộn nhiều lắm, em không rời đi được.',
      motive: 'Chú Đạt dạy nghề cho em. Chú như bố em vậy.',
      testimony: [
        { text: 'Từ 21:00 em đứng ở cửa soát vé, không lên phòng máy lần nào.', contra: 'confetti', press: 'Thật mà! Kìm bấm vé lúc nào cũng trong túi em… à, ý em là em đứng ở cửa.', broken: 'Hạt giấy… chắc em mang theo từ chiều! Chiều em có lên lấy đồ.' },
        { text: 'Chú Đạt không bao giờ cho em đụng vào máy chiếu, em đâu biết nối phim.', contra: ['tam-skill', 'reel4'], press: 'Em chỉ được đứng xem thôi.', broken: 'Thì… chú có dạy em nối phim vài lần. Nhưng băng dính vàng đâu phải của em!' },
        { text: 'Mấy cuốn băng VHS trong ba lô? Em không biết của ai.', contra: 'backpack', press: 'Ba lô để trên đó ai chẳng bỏ vào được.', broken: 'Em… em chỉ sao vài phim để bán kiếm thêm. Chú Đạt biết rồi, chú bảo sẽ báo chị Hương. Nhưng em không giết chú!', unlock: 'tam-vhs' },
        { text: 'Lúc 22:10 em đang đuổi con mèo ở sảnh, chị Hương thấy mà.', press: 'Con mèo mướp hay vào sảnh lắm.' }
      ],
      deflect: ['Cái đó thì liên quan gì tới em?', 'Anh đang gán ghép cho em đấy.'],
      presents: {
        confetti: { line: 'Hạt giấy… chắc em mang theo từ chiều! Chiều em có lên lấy đồ.', mood: 'nervous' },
        reel4: { line: 'Băng dính vàng ở đâu chẳng có. Em không biết.', mood: 'nervous' },
        backpack: { line: 'Ba lô của em thì sao? Ai chẳng có ba lô!', mood: 'angry' },
        filmcan: { line: 'Hộp phim… em không đụng vào.', mood: 'nervous' }
      },
      fallback: ['Em không biết ạ.', 'Em chỉ là đứa soát vé thôi mà.']
    },
    {
      id: 'huong', name: 'Bà Mai Hương', role: 'quản lý rạp',
      look: { photo: 'img/faces/06-huong.jpg', skin: '#c9a084', hair: '#2a2020', hairStyle: 'bun', coat: '#4a3a5a', shirt: '#e0d6c0', pants: '#2a2a30', earrings: '#d8b860' },
      intro: 'Rạp này tôi giữ hai mươi năm. Ông Đạt mất, tôi mất người cuối cùng còn biết chiếu phim nhựa.',
      alibi: 'Tôi ngồi phòng vé đối sổ. 22:00 gọi bộ đàm cho Hiển, 22:10 ra sảnh, 22:25 màn ảnh trắng thì chạy lên.',
      motive: 'Ông Đạt cãi tôi chuyện bán rạp cho công ty Hưng Thịnh. Nhưng cãi nhau thì có gì lạ.',
      presents: {
        confetti: { line: 'Hạt giấy bấm vé? Chỉ thằng Tâm cầm kìm bấm. Mà 22:10 tôi thấy nó ở cửa, thở hổn hển như vừa chạy cầu thang.', unlock: 'huong-door' },
        reel4: { line: 'Cả rạp chỉ ông Đạt và thằng Tâm biết nối phim, đổi máy. Ông Đạt dạy nó hai năm nay.', unlock: 'tam-skill' },
        logbook: { line: 'Ông Đạt ghi sổ chưa sót dòng nào. Dòng 22:05 trống thì… lúc đó ông ấy không còn đứng được nữa.', unlock: 'tam-skill' },
        rack: { line: 'Cuộn phóng sự đó à? Bên Hưng Thịnh hỏi mua mấy lần, ông Đạt không bán. Ông ấy bảo trong đó có thứ người ta muốn giấu.' },
        backpack: { line: 'Ba lô xanh đó là của thằng Tâm.' }
      },
      fallback: ['Tôi còn phải lo hoàn vé cho khách.', 'Hỏi thằng Hiển ấy.']
    },
    {
      id: 'hien', name: 'Đỗ Hiển', role: 'thợ điện của rạp',
      look: { photo: 'img/faces/06-hien.jpg', skin: '#a8805f', hair: '#2a2420', hairStyle: 'short', coat: '#4a5a6a', shirt: '#c9c0aa', pants: '#2a2622', apron: '#3a3a3a' },
      intro: 'Tôi ở dưới hầm điện cả tối. Máy phát dở chứng từ chiều.',
      alibi: 'Hầm điện, 21:30 đến 22:30. Chị Hương gọi bộ đàm lúc 22:00, tôi trả lời ngay.',
      motive: 'Tôi nợ ông Đạt hai triệu, nhưng ông ấy chưa đòi bao giờ.',
      testimony: [
        { text: 'Tôi xuống hầm điện từ 21:30, không lên lại cho đến khi nghe la.', press: 'Máy phát kêu như máy cày, tôi chẳng nghe thấy gì trên kia.' },
        { text: 'Ông Đạt với thằng Tâm thân như bố con, chẳng có gì xích mích.', contra: ['backpack', 'tam-vhs'], press: 'Thì… dạo này hai chú cháu ít nói chuyện.', broken: 'Thôi được, chiều nay ông Đạt bảo tôi: mai ông sẽ báo chị Hương chuyện thằng Tâm, không thể để nó làm thế với phim của rạp.', unlock: 'dat-warning' }
      ],
      deflect: ['Tôi chỉ biết dây điện thôi.'],
      presents: {
        oil: { line: 'Dầu máy là tôi mua. Can đó tôi để dưới gầm bàn, ai lôi ra giữa phòng thế kia?' },
        backpack: { line: 'Băng lậu à… Chiều nay ông Đạt có bảo tôi: mai ông sẽ báo chị Hương chuyện thằng Tâm.', unlock: 'dat-warning', mood: 'nervous' },
        victim: { line: 'Ông Đạt đứng máy ba mươi năm, ngã thế nào được.' },
        reel4: { line: 'Nối phim tôi chịu. Lúc đó tôi ở hầm điện — 22:00 chị Hương gọi bộ đàm, tôi trả lời ngay, máy phát kêu ầm ầm. Hỏi chị ấy.', unlock: 'hien-fuse' }
      },
      fallback: ['Tôi ở dưới hầm, có biết gì đâu.', 'Anh hỏi chị Hương.']
    },
    {
      id: 'kieu', name: 'Ông Kiều', role: 'khán giả quen, ghế số 13',
      look: { photo: 'img/faces/06-kieu.jpg', skin: '#c49a7c', hair: '#d8d4cc', hairStyle: 'side', coat: '#5a5040', shirt: '#d8d0bc', pants: '#3a342c', glasses: true, hat: true, hatColor: '#3a3028' },
      intro: 'Hai mươi năm tôi ngồi ghế 13. Tối nay tôi đến vì rạp hứa chiếu lại cuộn phóng sự cũ trước phim.',
      alibi: 'Tôi ngồi ghế của tôi từ đầu đến cuối. Già rồi, đi đâu được.',
      motive: 'Tôi là kỹ sư cầu đường về hưu. Ông Đạt là người duy nhất còn giữ phim về cây cầu tôi từng làm.',
      presents: {
        victim: { line: 'Đoạn phim im lặng thì có tiếng cạch rất to trên phòng máy, như ai đánh rơi hộp sắt. Tôi nhìn đồng hồ: 21:55.', unlock: 'kieu-thud' },
        filmcan: { line: 'Hộp sắt… đúng rồi, tiếng ấy là tiếng hộp phim. 21:55, tôi nhớ vì đang xem giờ.', unlock: 'kieu-thud' },
        rack: { line: 'Cuộn phóng sự trụ 13 mất rồi sao? Trong đó quay cảnh đổ bê tông. Thép đem vào trụ 13 không phải thép trong hồ sơ — ai xem kỹ sẽ thấy.' }
      },
      fallback: ['Tôi chỉ là khán giả.', 'Tai tôi còn tốt lắm đấy.']
    }
  ],

  deductions: [
    { a: 'victim', b: 'kieu-thud', title: 'Giờ chết thật', text: 'Ông Đạt bị đánh lúc 21:55, không phải ngã lúc 22:25 như hiện trường muốn kể.' },
    { a: 'oil', b: 'victim', title: 'Tai nạn dàn dựng', text: 'Dầu đổ sau khi ông đã nằm xuống, vết thương lại không khớp cạnh máy: có người dựng cảnh trượt ngã.' },
    { a: 'filmcan', b: 'victim', title: 'Hung khí', text: 'Hộp phim thép tròn khớp với vết thương cung tròn sau đầu.' },
    { a: 'reel4', b: 'logbook', title: 'Người đổi cuộn 4', text: 'Cuộn 4 vẫn được đổi lúc 22:05 — sau khi ông Đạt đã chết — bởi một bàn tay khác.' },
    { a: 'reel4', b: 'tam-skill', title: 'Chỉ còn một người', text: 'Ngoài ông Đạt, chỉ Tâm biết nối phim. Tâm đã đứng máy thay ông để giữ màn ảnh sáng.' },
    { a: 'confetti', b: 'huong-door', title: 'Đường chạy xuống sảnh', text: 'Hạt giấy bấm vé trên phòng máy, rồi 22:10 Tâm thở dốc ở cửa: hắn vừa chạy từ trên xuống.' },
    { a: 'tam-vhs', b: 'dat-warning', title: 'Động cơ', text: 'Ông Đạt định tố việc Tâm sao phim bán băng lậu. Tâm sẽ mất việc và bị truy tố.' }
  ],

  timeline: {
    intro: 'Màn ảnh vẫn sáng đến 22:25 — đó là lý do mọi người tin ông Đạt còn sống tới lúc ấy. Xếp lại các sự kiện cho đúng giờ.',
    slots: [{ t: '21:45' }, { t: '21:55' }, { t: '22:05' }, { t: '22:10' }, { t: '22:25' }],
    events: [
      { id: 'e1', text: 'Ông Đạt đổi sang cuộn 3 và ghi sổ', slot: 0, need: 'logbook' },
      { id: 'e2', text: 'Tiếng "cạch" trên phòng máy: ông Đạt bị đánh', slot: 1, need: 'kieu-thud' },
      { id: 'e3', text: 'Cuộn 4 được nối bằng băng dính vàng', slot: 2, need: 'reel4' },
      { id: 'e4', text: 'Tâm thở dốc ở cửa soát vé', slot: 3, need: 'huong-door' },
      { id: 'e5', text: 'Không ai đổi cuộn 5 — màn ảnh trắng xóa', slot: 4 },
      { id: 'x1', text: 'Hiển trả lời bộ đàm từ hầm điện', slot: -1, need: 'hien-fuse' }
    ],
    done: 'Ông Đạt chết lúc 21:55. Kẻ giết ông đã đứng máy thay ông thêm mười phút để giữ màn ảnh sáng — rồi chạy xuống sảnh tạo ngoại phạm.'
  },

  pressure: {
    budget: 40, wrongCost: 8,
    warn: [{ at: 15, text: 'Tâm vừa xin nghỉ phép "về quê có việc gấp".' }, { at: 6, text: 'Có người thấy Tâm mua vé xe khách đi Lạng Sơn chuyến sáng sớm.' }]
  },
  endings: {
    escape: 'Sáng hôm sau, chuyến xe khách 5 giờ đi Lạng Sơn có một hành khách trẻ ôm chiếc ba lô vải xanh. Ba tháng sau, băng lậu phim của rạp Tháng Tám vẫn bán đầy chợ Trời. Rạp đóng cửa trước Tết.',
    wrong: {
      huong: 'Bà Hương bị tạm giữ với động cơ "muốn bán rạp". Báo chí làm ầm lên; công ty Hưng Thịnh mua lại rạp với giá rẻ chỉ một tuần sau. Còn mối nối băng dính vàng vẫn chờ người đọc ra nó.',
      hien: 'Hiển bị bắt vì khoản nợ hai triệu. Nhưng tiếng máy phát trong bộ đàm lúc 22:00 là ngoại phạm không thể chối. Hồ sơ bị trả về, và bạn mất thêm thời gian.',
      kieu: 'Bắt một ông lão bảy mươi tuổi ngồi ghế khán giả? Cả khán phòng làm chứng ông không rời ghế. Trưởng phòng gọi bạn lên nói chuyện riêng.'
    }
  },

  meta: { title: 'Cuộn phim mất tích', fragment: 'Cuộn "Phóng sự khởi công trụ 13 — 1996" không nằm trong số băng lậu của Tâm. Tâm khai: một tuần trước có người đặt mua riêng cuộn ấy với giá gấp mười, trả tiền mặt, ký nhận đúng một chữ: "L."' },

  // Phim tái hiện: máy số 1 chạy cuộn 3, máy số 2 chờ cuộn 4
  replay: {
    start: [
      { type: 'body', set: { hidden: true } },
      { type: 'stain', set: { hidden: true } },
      { type: 'bit', set: { hidden: true } },
      { type: 'filmcan', set: { hidden: true } },
      { type: 'bottle', set: { hidden: true } }
    ],
    beats: [
      { t: '21:00', video: 'video/06-2100.mp4', place: 'Sảnh rạp Tháng Tám', card: ['tam', 'huong'], text: 'Suất chiếu cuối bắt đầu. Tâm đứng cửa soát vé, kìm bấm vé trong túi áo. Bà Hương ngồi phòng vé, Hiển xuống hầm điện sửa máy phát.' },
      {
        t: '21:45', video: 'video/06-2145.mp4', clues: ['logbook'], text: 'Trên phòng máy, ông Đạt đổi sang cuộn 3 đúng chấm hiệu trên phim, rồi cúi xuống ghi sổ như ba mươi năm nay.',
        patch: [{ type: 'filmcan', i: 0, set: { hidden: false } }, { type: 'bit', i: 0, set: { hidden: false } }],
        cast: { victim: { at: [1.3, 0.95], path: [[3.0, 1.0], [3.7, 1.0]], face: 'back', delay: 1.5 } },
        cam: { X: 2.6, z: 0.9, h: 1, zoom: 1.4 }
      },
      {
        t: '21:50', video: 'video/06-2150.mp4', clues: ['confetti', 'backpack', 'dat-warning'], text: 'Tâm lẻn lên phòng máy. Hạt giấy bấm vé rơi theo từng bước chân. Ông Đạt đã lấy những cuốn băng lậu ra khỏi ba lô: "Mai chú báo chị Hương."',
        patch: [{ type: 'bit', i: 1, set: { hidden: false }, after: 2 }, { type: 'bit', i: 2, set: { hidden: false }, after: 2.8 }, { type: 'bit', i: 3, set: { hidden: false }, after: 3.5 }],
        cast: {
          victim: { at: [3.7, 1.0], path: [[4.3, 0.75]], face: 'back', then: { delay: 1, face: 'front', holding: '#2a2a2a' } },
          tam: { at: [4.9, 3.8], path: [[3.3, 2.6], [2.8, 2.0], [3.2, 1.55]], speed: 1.2, face: 'right' }
        },
        cam: { X: 3.6, z: 1.6, h: 1, zoom: 1.35 }
      },
      {
        t: '21:55', video: 'video/06-2155.mp4', clues: ['victim', 'filmcan', 'kieu-thud'], fx: 'flash', fxAt: 4.2,
        text: 'Khi ông Đạt quay lưng lại máy số 1, Tâm vớ hộp phim thép trên bàn và đánh từ phía sau. Dưới khán phòng, ông Kiều ở ghế 13 nghe tiếng "cạch" và nhìn đồng hồ.',
        patch: [{ type: 'filmcan', i: 0, set: { hidden: true }, after: 1.6 }],
        cast: {
          victim: { holding: null, path: [[1.3, 1.2]], speed: 1, face: 'back', then: { delay: 2.7, pose: 'body', at: [0.75, 1.45], dir: 'right' } },
          tam: { path: [[3.9, 1.6], [1.7, 1.55]], delay: 1.4, speed: 1.6, holding: '#8a8e90', face: 'left' }
        },
        cam: { X: 1.4, z: 1.3, h: 1, zoom: 1.5 }
      },
      {
        t: '22:00', video: 'video/06-2200.mp4', clues: ['oil'], text: 'Tâm lôi can dầu máy dưới gầm bàn ra, đổ lênh láng quanh thi thể rồi đá hộp phim vào gầm. Một vụ "trượt ngã" được dựng lên.',
        patch: [
          { type: 'bottle', set: { hidden: false }, after: 2.2 }, { type: 'stain', i: 0, set: { hidden: false }, after: 3.2 },
          { type: 'stain', i: 1, set: { hidden: false } }, { type: 'filmcan', i: 1, set: { hidden: false }, after: 5.5 }
        ],
        cast: { tam: { holding: null, path: [[3.4, 1.8], [2.0, 1.6]], face: 'left', then: { delay: 1.2, path: [[4.3, 2.6]] } } },
        cam: { X: 2.2, z: 1.6, h: 0.8, zoom: 1.35 }
      },
      {
        t: '22:05', video: 'video/06-2205.mp4', clues: ['reel4', 'tam-skill'], text: 'Chấm hiệu đổi cuộn lóe lên trên màn ảnh. Tâm biết rằng nếu màn ảnh tắt bây giờ, cả rạp sẽ lên đây. Hắn nối cuộn 4 bằng băng dính vàng — vụng về, cắt chéo — và bật máy số 2.',
        patch: [{ type: 'projector', i: 0, set: { running: false }, after: 4.5 }, { type: 'projector', i: 1, set: { running: true }, after: 4.5 }],
        cast: { tam: { path: [[2.6, 1.1]], face: 'back' } },
        cam: { X: 2.4, z: 0.6, h: 1.1, zoom: 1.7 }
      },
      {
        t: '22:10', video: 'video/06-2210.mp4', clues: ['huong-door'], text: 'Rồi hắn chạy xuống cầu thang, về cửa soát vé. Bà Hương thấy hắn thở hổn hển: "Em đuổi mèo." Cuộn 4 sẽ hết lúc 22:25 — và không ai ở trên đó để đổi cuộn 5.',
        cast: { tam: { path: [[3.6, 2.4], [4.9, 3.8]], speed: 2, then: { hide: true } } }
      },
      {
        t: '22:25', video: 'video/06-2225.mp4', text: 'Màn ảnh trắng xóa. Bà Hương chạy lên phòng máy và thấy ông Đạt nằm cạnh vũng dầu — "chết lúc 22:25", như kẻ giết ông muốn mọi người tin.',
        patch: [{ type: 'projector', i: 1, set: { running: false }, after: 1 }],
        cast: { huong: { at: [4.9, 3.8], path: [[3.4, 2.6], [1.9, 2.2]], delay: 1.5, speed: 1.6, face: 'left' } }
      }
    ]
  },

  solution: {
    culprit: 'tam',
    evidence: ['reel4', 'tam-skill', 'confetti', 'huong-door', 'logbook', 'kieu-thud', 'tam-vhs', 'backpack', 'filmcan'],
    summary: 'Phan Minh Tâm sao phim của rạp bán băng lậu. Ông Đạt phát hiện và định báo bà Hương. Lúc 21:55, Tâm dùng hộp phim thép đánh ông từ phía sau, đổ dầu máy dựng cảnh trượt ngã. Để màn ảnh không tắt và lộ giờ chết, hắn tự nối cuộn 4 bằng băng dính vàng lúc 22:05, rồi chạy xuống sảnh lúc 22:10 tạo ngoại phạm. Cuộn 5 không ai đổi, màn ảnh trắng lúc 22:25.',
    epilogue: 'Trong sổ "khách đặt" của Tâm có một dòng khác hẳn: "Cuộn phóng sự trụ 13 — không sao, giao nguyên bản — khách: L. — đã nhận tiền." Ông Kiều nhìn ô trống trên giá phim rất lâu rồi nói: "Họ không mua phim. Họ mua sự im lặng."'
  }
});
