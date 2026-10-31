/* Hồ sơ #08 — Hồ Sơ 13 (vụ cuối của mạch truyện) */
(window.HS13 = window.HS13 || { cases: [] }).cases.push({
  id: 'ho-so-13',
  number: '13',
  title: 'Hồ Sơ 13',
  titleHtml: 'Hồ Sơ <em>13</em>',
  location: 'Phòng lưu trữ · Phòng hồ sơ đặc biệt, tầng 3',
  datetime: 'Thứ Sáu, 31.12.1999',
  clock: '23:40',
  weather: '✦ GIAO THỪA',
  difficulty: 3,
  finale: true,
  unlockAfter: 5,
  lockedText: 'Mỗi vụ án bạn phá đều để lại một mảnh giấy có số 13. Ai đó đang gom chúng lại — và người ấy ở rất gần bạn.',
  tagline: 'Đêm giao thừa. Người giữ Hồ sơ 13 chết trong phòng lưu trữ đầy khói. Bác sĩ đến trước cả khi có người báo tin.',
  theme: { accent: '#8a2a3a', accent2: '#c8a040', soft: '#efe0e2', mood: 'Đêm giao thừa · phòng lưu trữ tầng 3' },
  interview: { place: 'Phòng họp Phòng hồ sơ đặc biệt', alibiQ: 'Từ 22:30 đến 23:20 đêm nay, anh/chị ở đâu?', motiveQ: 'Anh/chị biết gì về bà Thái Ngọc Lan và Hồ sơ 13?', props: 'office' },
  victim: { name: 'Thái Ngọc Lan, 58 tuổi', desc: 'Lưu trữ viên ba mươi năm của Phòng hồ sơ đặc biệt. Bảo vệ phá cửa lúc 23:20.' },
  briefing: [
    '23:20 đêm giao thừa, bảo vệ tòa nhà ngửi thấy khói ở tầng 3. Cửa phòng lưu trữ khóa trái. Phá cửa vào, anh thấy bà Thái Ngọc Lan nằm cạnh thùng sắt còn bốc khói.',
    'Bác sĩ Phạm Quân — người từng ký biên bản "tự sát" ở nhà nghỉ Minh Tân — đã có mặt trong tòa nhà và kết luận: "Đột quỵ. Thùng giấy chắc do bà tự đốt rác."',
    'Bà Lan là người duy nhất giữ bản gốc Hồ sơ 13. Sáng nay bà nói với bạn: "Tối nay tôi đối chiếu xong. Mai cậu sẽ biết ai ký chữ L."'
  ],
  sceneBrief: 'Thùng sắt đầy tro giấy và một cuộn phim chảy nhựa. Trên mặt trong cánh cửa có những vết cào. Bình xịt hen của bà Lan lăn dưới gầm bàn.',
  objective: 'Chứng minh bà Lan bị sát hại và chỉ ra người ký chữ "L." trong Hồ sơ 13.',
  question: 'Ai đã sát hại bà Thái Ngọc Lan?',

  art: {
    src: 'img/scenes/ho-so-13.jpg', w: 1024, h: 572,
    spots: {
      victim: [360, 435, 70], inhaler: [622, 425, 24, 'print'], burnbin: [870, 440, 60], film: [700, 520, 40, 'loupe'],
      door: [150, 200, 60, 'loupe'], guardlog: [80, 432, 34], 'lan-notes': [720, 298, 28, 'loupe'], board: [478, 162, 70]
    }
  },

  spec: {
    seed: 'ho-so-13',
    weather: 'rain',
    geometry: { width: 6, depth: 3.8, horizon: 102, top: 3.8 },
    room: {
      wall: { type: 'plaster', color: '#4c4e46', stains: 7, wainscot: { h: 0.95, color: '#3a3c34', panel: 0.7 }, cap: '#1c1d1a' },
      floor: { type: 'tile', colors: ['#6a665e', '#5e5a52', '#64605a'], size: 0.36, grout: '#2a2826' }
    },
    ambient: [0.3, 0.3, 0.34],
    lights: [
      { X: 3.0, z: 1.8, h: 2.3, r: 3.6, color: '#f0e0b8', intensity: 0.7, flicker: 0.06 },
      { X: 1.25, z: 1.3, h: 1.1, r: 1.8, color: '#ffcf8a', intensity: 0.9 },
      { X: 3.6, z: 2.4, h: 0.6, r: 1.6, color: '#ff8a40', intensity: 0.6, flicker: 0.2 }
    ],
    spawn: { X: 5.2, z: 3.5 },
    props: [
      { type: 'window', X: 0.2, h: 1.0, w: 0.9, hh: 0.9, view: 'city', blinds: true },
      { type: 'clock', X: 1.5, h: 2.0, r: 0.13, time: '23:20' },
      { type: 'board', X: 1.85, h: 1.05, w: 1.0, hh: 0.75, n: 11, strings: true },
      { type: 'door', X: 5.0, w: 0.8, hh: 1.95, color: '#3a3a36' },
      { type: 'bookcase', X: 3.0, z: 0.05, w: 0.95, color: '#3a2e24' },
      { type: 'bookcase', X: 3.95, z: 0.05, w: 0.95, color: '#3a2e24' },
      { type: 'filecab', X: 2.3, z: 0.1, w: 0.6, color: '#5c6660' },
      { type: 'desk', X: 0.4, z: 1.2, w: 1.5, d: 0.65, color: '#4a3424' },
      { type: 'lamp', X: 1.65, z: 1.35, e: 0.77, color: '#2a3a2a' },
      { type: 'typewriter', X: 0.8, z: 1.35, e: 0.77 },
      { type: 'phone', X: 1.3, z: 1.5, e: 0.76, color: '#2a2a2a' },
      { type: 'book', X: 1.0, z: 1.6, e: 0.765, color: '#5a1a22' },
      { type: 'cup', X: 1.55, z: 1.6, e: 0.77, color: '#e8e0cc', liquid: '#5a3a1a' },
      { type: 'papers', X: 2.8, z: 2.0, n: 6, spread: 0.9 },
      { type: 'burnbin', X: 3.6, z: 2.4, smoke: true },
      { type: 'filmcan', X: 4.0, z: 2.8, r: 0.15, color: '#5a5450' },
      { type: 'body', X: 3.9, z: 3.1, dir: 'right', look: { skin: '#c9a084', hair: '#9a948e', hairStyle: 'bun', coat: '#5a4a5a', shirt: '#d8d0bc', pants: '#2e2c30', glasses: true } },
      { type: 'bit', X: 1.1, z: 2.2, w: 0.06, d: 0.03, color: '#4a8ab0', glint: true },
      { type: 'bit', X: 4.95, z: 2.0, w: 0.05, d: 0.03, color: '#c8a040' },
      { type: 'pendant', X: 3.0, z: 1.8, h: 2.3, shade: '#3a3a30' }
    ],
    hotspots: [
      { id: 'victim', X: 4.4, z: 3.15, h: 0.1, r: 0.5 },
      { id: 'inhaler', X: 1.1, z: 2.2, h: 0, r: 0.2 },
      { id: 'burnbin', X: 3.6, z: 2.4, h: 0.5, r: 0.3 },
      { id: 'film', X: 4.0, z: 2.8, h: 0.05, r: 0.2 },
      { id: 'door', X: 5.4, z: 0, h: 1.0, r: 0.4, pz: 0.75 },
      { id: 'guardlog', X: 4.95, z: 2.0, h: 0, r: 0.2 },
      { id: 'lan-notes', X: 1.2, z: 1.65, h: 0.8, r: 0.22 },
      { id: 'board', X: 2.35, z: 0, h: 1.45, r: 0.45, pz: 0.7 }
    ]
  },

  clues: [
    { id: 'victim', kind: 'vat', label: 'Khám nghiệm bà Lan', short: 'Chết ngạt khói, không phải đột quỵ', detail: 'Đường thở đầy muội khói, môi tím tái, móng tay gãy. Không có dấu hiệu xuất huyết não. Bà Lan còn sống, còn thở trong khói ít nhất mười phút — cơn hen trong phòng kín đã giết bà.' },
    { id: 'inhaler', kind: 'vat', label: 'Bình xịt hen', short: 'Đầy thuốc, nhưng vòi bị dán keo', detail: 'Bình xịt hen còn đầy thuốc, mới lĩnh hôm qua. Nhưng lỗ phun bị bịt bằng một giọt keo dán giấy đã khô. Bà Lan đã bóp nó trong vô vọng.' },
    { id: 'burnbin', kind: 'vat', label: 'Thùng sắt đốt giấy', short: 'Tro bản gốc Hồ sơ 13, mồi bằng cồn', detail: 'Tro giấy dày, mùi cồn công nghiệp. Một mẩu chưa cháy hết: "...trụ 13 — BẢN GỐC — đối chiếu chữ ký L." Lửa được mồi để cháy âm ỉ, nhiều khói.' },
    { id: 'film', kind: 'vat', label: 'Cuộn phim chảy nhựa', short: '"Phóng sự khởi công trụ 13"', detail: 'Một cuộn phim 35mm bị ném vào lửa rồi lăn ra. Nhãn hộp còn đọc được: "Phóng sự: Khởi công trụ cầu số 13 — 1996 — Rạp Tháng Tám". Cuộn phim mà "L." đã mua của Tâm.' },
    { id: 'door', kind: 'vat', label: 'Cửa phòng lưu trữ', short: 'Vết cào bên trong, khóa bằng chìa tổng', detail: 'Mặt trong cánh cửa đầy vết cào. Chìa của bà Lan vẫn trong túi áo bà. Ổ khóa chỉ mở được bằng chìa của bà hoặc chìa tổng — chìa tổng do trưởng phòng giữ.' },
    { id: 'guardlog', kind: 'vat', label: 'Sổ trực bảo vệ', short: 'Ghi giờ ra vào đêm giao thừa', detail: '22:30 Trưởng phòng Liêm ra về. 22:40 Nhà báo Bình ra về. 22:55 Trưởng phòng quay lại "quên cặp". 23:05 Trưởng phòng ra về. 23:18 Bác sĩ Quân tới, "được gọi đến khám cho bà Lan". 23:20 Ngửi thấy khói tầng 3, phá cửa.' },
    { id: 'lan-notes', kind: 'vat', label: 'Sổ tay bà Lan', short: 'Danh mục Hồ sơ 13', detail: '"Hồ sơ 13: bản 1 (phóng viên Minh), bản 2 (Dương Khải), bản 3 (báo Tiếng Phố), bản vẽ trụ 13 (kỹ sư Hải), báo cáo vết nứt (kỹ sư Sơn), cuộn phim khởi công. Mọi khoản chi của Hưng Thịnh đều ký nhận một chữ: L. Tối nay đối chiếu chữ ký với sổ công văn."' },
    { id: 'board', kind: 'vat', label: 'Bảng ghim của bà Lan', short: 'Sợi chỉ đỏ nối bảy vụ án', detail: 'Ảnh hiện trường của bảy vụ án bạn đã điều tra, nối bằng chỉ đỏ về một tờ công văn ở giữa: chữ ký "L." của trưởng phòng Đoàn Minh Liêm — giống hệt chữ "L." trên các biên nhận của Hưng Thịnh.' },
    { id: 'quan-call', kind: 'loi', label: 'Cuộc gọi lúc 23:07', short: 'Liêm gọi bác sĩ trước khi ai biết', detail: 'Bác sĩ Quân: "23:07 trưởng phòng Liêm gọi, bảo bà Lan bị đột quỵ, đến ký giấy cho nhanh. Như lần ở nhà nghỉ Minh Tân. Lần trước cũng chính ông ấy gọi."' },
    { id: 'binh-left', kind: 'loi', label: 'Bình rời đi lúc 22:40', short: 'Bà Lan còn khỏe, hẹn 23:30', detail: 'Lê Bình: "22:40 tôi về, bà Lan còn khỏe, vừa pha trà. Bà hẹn tôi 23:30 quay lại nhận bản gốc, sau khi đối chiếu xong chữ ký."' },
    { id: 'bao-order', kind: 'loi', label: 'Người nhận tiền', short: 'Bảo giao tiền cho Liêm ba lần', detail: 'Trịnh Bảo: "Tôi giao tiền cho ông Liêm ba lần, ở quán cà phê dưới tòa nhà này. Lần nào ông ấy cũng ký nhận một chữ: L."' },
    { id: 'lan-asthma', kind: 'loi', label: 'Bệnh hen của bà Lan', short: 'Không rời bình xịt nửa bước', detail: 'Bác sĩ Quân: "Bà Lan hen nặng. Khói là thứ duy nhất giết được bà nhanh như vậy mà không để lại vết." Cả phòng đều biết bà không rời bình xịt nửa bước.' }
  ],

  suspects: [
    {
      id: 'liem', name: 'Đoàn Minh Liêm', role: 'trưởng phòng hồ sơ đặc biệt',
      look: { photo: 'img/faces/08-liem.jpg', skin: '#c49a7c', hair: '#4a4440', hairStyle: 'side', coat: '#3a3a40', shirt: '#e0dcd0', pants: '#2a2a30', tie: '#3a2a4a', glasses: true, longCoat: true },
      intro: 'Cậu là điều tra viên giỏi nhất của tôi. Đừng để cảm xúc dắt mũi, bà Lan đã già và bệnh.',
      alibi: 'Tôi về từ 22:30, giao thừa ở nhà với vợ con.',
      motive: 'Bà Lan là đồng nghiệp ba mươi năm. Tôi rất kính trọng bà ấy.',
      testimony: [
        { text: 'Tôi rời tòa nhà lúc 22:30 và không quay lại.', contra: 'guardlog', press: 'Bảo vệ thấy tôi ra cửa mà.', broken: 'Tôi có quay lại lấy cặp lúc 22:55. Mười phút thôi. Tôi không vào phòng lưu trữ.' },
        { text: 'Phòng lưu trữ là của bà Lan. Chìa bà ấy giữ, tôi không có lý do vào đó.', contra: 'door', press: 'Tôi tôn trọng không gian của bà ấy.', broken: 'Chìa tổng thì… phòng nào tôi chẳng mở được. Nhưng tôi không khóa ai cả!' },
        { text: 'Tôi chỉ biết chuyện khi bảo vệ gọi điện cho tôi lúc 23:25.', contra: 'quan-call', press: 'Đêm giao thừa, tôi đang xem pháo hoa trên tivi.', broken: '…Tôi gọi bác sĩ Quân vì… vì bà Lan có kêu mệt từ chiều.' },
        { text: 'Hồ sơ 13 chỉ là lời đồn. Phòng này chưa từng nhận báo cáo nào về trụ 13.', contra: ['lan-notes', 'board'], press: 'Cậu đọc báo lá cải nhiều quá rồi.', broken: 'Những báo cáo đó là tài liệu mật. Tôi có quyền niêm phong chúng.' },
        { text: 'Tôi chưa từng nhận một đồng nào của Hưng Thịnh, chưa từng ký chữ "L." nào cho họ.', contra: ['bao-order', 'film'], press: 'Chữ L thì cả nước có hàng triệu người.', broken: 'Cậu không hiểu đâu. Cây cầu đó đằng nào cũng xây xong. Bà Lan muốn đập bỏ mọi thứ chỉ vì vài vết nứt!' }
      ],
      deflect: ['Cậu đang thử sự kiên nhẫn của tôi.', 'Tôi là cấp trên của cậu, cẩn thận lời nói.'],
      presents: {
        guardlog: { line: 'Sổ bảo vệ ghi sai giờ là chuyện thường.', mood: 'nervous' },
        door: { line: 'Chìa tổng tôi để trong két, ai lấy được thì tôi không biết.', mood: 'nervous' },
        burnbin: { line: 'Bà Lan hay đốt giấy loại. Nguy hiểm, tôi đã nhắc nhiều lần.', mood: 'neutral' },
        film: { line: 'Một cuộn phim cũ thì liên quan gì đến tôi?', mood: 'angry' },
        inhaler: { line: 'Bình xịt hỏng là chuyện của nhà sản xuất.', mood: 'nervous' }
      },
      fallback: ['Hôm nay là giao thừa, cậu nên về nghỉ.', 'Tôi sẽ ký mọi biên bản cậu cần.']
    },
    {
      id: 'quan', name: 'Phạm Quân', role: 'bác sĩ trực bệnh viện quận',
      look: { photo: 'img/faces/08-quan.jpg', skin: '#c79e83', hair: '#3a3436', hairStyle: 'side', coat: '#dedbd2', shirt: '#9ab0c0', pants: '#3a3d44', glasses: true },
      intro: 'Tôi chỉ làm đúng chuyên môn. Đột quỵ ở tuổi bà ấy không hiếm.',
      alibi: 'Tôi trực ở bệnh viện đến 23:00, rồi đến đây.',
      motive: 'Tôi gần như không quen bà Lan.',
      testimony: [
        { text: 'Tôi được bảo vệ gọi đến sau khi phát hiện thi thể.', contra: 'guardlog', press: 'Tôi đến ngay khi được báo.', broken: 'Không… trưởng phòng Liêm gọi tôi lúc 23:07, bảo bà Lan bị đột quỵ, đến ký giấy cho nhanh. Như lần ở nhà nghỉ Minh Tân. Lần trước cũng chính ông ấy gọi.', unlock: 'quan-call' },
        { text: 'Thi thể không có dấu hiệu gì bất thường.', contra: ['victim', 'inhaler'], press: 'Tôi khám kỹ rồi.', broken: 'Muội khói… đúng là có. Tôi chỉ ghi những gì người ta muốn tôi ghi.' }
      ],
      deflect: ['Đó không phải chuyên môn của tôi.'],
      presents: {
        inhaler: { line: 'Bà Lan hen nặng. Khói là thứ duy nhất giết được bà nhanh như vậy mà không để lại vết.', unlock: 'lan-asthma', mood: 'nervous' },
        victim: { line: 'Bà ấy hen suyễn… trong phòng kín đầy khói thì… Thôi được, bà Lan hen nặng, không rời bình xịt nửa bước.', unlock: 'lan-asthma', mood: 'nervous' },
        guardlog: { line: '23:18… tôi đến sớm vì đường vắng thôi.', mood: 'nervous' }
      },
      fallback: ['Tôi chỉ là bác sĩ.', 'Tôi có ca trực sáng mai.']
    },
    {
      id: 'binh', name: 'Lê Bình', role: 'phóng viên điều tra báo Tiếng Phố',
      look: { photo: 'img/faces/08-binh.jpg', skin: '#c9a084', hair: '#211a1a', hairStyle: 'side', coat: '#5a5a3a', shirt: '#d8d0bc', pants: '#2e2e30', glasses: true },
      intro: 'Bà Lan là nguồn tin của tôi. Tôi là người cuối cùng thấy bà còn sống, tôi biết các anh nghi tôi.',
      alibi: '22:40 tôi ra về, ngồi quán cà phê đầu phố chờ đến 23:30.',
      motive: 'Bà Lan định đưa tôi bản gốc Hồ sơ 13. Giết bà thì tôi được gì?',
      testimony: [
        { text: '22:40 tôi về, bà Lan còn khỏe, đang pha trà.', press: 'Bà còn rót cho tôi một chén.' },
        { text: 'Bà hẹn tôi 23:30 quay lại nhận bản gốc, sau khi đối chiếu xong chữ ký.', press: 'Bà bảo chỉ cần so một chữ ký nữa thôi.' }
      ],
      deflect: ['Tôi là nhà báo, không phải hung thủ.'],
      presents: {
        guardlog: { line: '22:40 tôi về, bà Lan còn khỏe, vừa pha trà. Bà hẹn tôi 23:30 quay lại nhận bản gốc, sau khi đối chiếu xong chữ ký.', unlock: 'binh-left' },
        victim: { line: 'Tôi rời đi lúc 22:40, bà còn khỏe. Bà hẹn 23:30 đưa tôi bản gốc.', unlock: 'binh-left' },
        'lan-notes': { line: 'Bản 3 là bản ông Vĩnh giữ ở tòa soạn. Họ đã giết ông ấy vì nó. Giờ đến bà Lan.' },
        film: { line: 'Cuộn phim đó cho thấy thép đem vào trụ 13 không đúng hồ sơ. Ai đốt nó, người đó sợ cây cầu.' }
      },
      fallback: ['Tôi sẽ viết sự thật, dù thế nào.', 'Anh hỏi trưởng phòng của anh đi.']
    },
    {
      id: 'bao', name: 'Trịnh Bảo', role: 'phó giám đốc Hưng Thịnh (đang tại ngoại)',
      look: { photo: 'img/faces/bao.jpg', skin: '#c9a084', hair: '#141012', hairStyle: 'slick', coat: '#2a2a34', shirt: '#e0dcd0', pants: '#24242a', tie: '#7a2a2a', glasses: true },
      intro: 'Tôi đến đây để đầu thú, không phải để giết ai. Tôi đợi ở sảnh từ 23:00.',
      alibi: 'Tôi ngồi sảnh tầng 1 từ 23:00, bảo vệ thấy tôi.',
      motive: 'Bà Lan giữ chứng cứ chống lại công ty tôi. Nhưng tôi đã quyết định khai hết.',
      testimony: [
        { text: 'Tôi đến để đầu thú. Tôi chưa lên tầng 3.', press: 'Bảo vệ không cho tôi lên.' },
        { text: 'Tôi chưa từng gặp người ký chữ "L.".', contra: ['lan-notes', 'board', 'film'], press: 'Tiền tôi để ở chỗ hẹn, có người tự đến lấy.', broken: 'Thôi được. Tôi giao tiền cho ông Liêm ba lần, ở quán cà phê dưới tòa nhà này. Lần nào ông ấy cũng ký nhận một chữ: L.', unlock: 'bao-order' }
      ],
      deflect: ['Luật sư tôi dặn không trả lời câu đó.'],
      presents: {
        'lan-notes': { line: 'Tôi giao tiền cho ông Liêm ba lần, ở quán cà phê dưới tòa nhà này. Lần nào ông ấy cũng ký nhận một chữ: L.', unlock: 'bao-order', mood: 'nervous' }
      },
      fallback: ['Tôi đã nói tôi đến đầu thú.', 'Hỏi ông Liêm ấy.']
    }
  ],

  deductions: [
    { a: 'victim', b: 'inhaler', title: 'Cơn hen được sắp đặt', text: 'Vòi bình xịt bị dán keo: bà Lan lên cơn hen trong khói mà không thể cứu mình.' },
    { a: 'victim', b: 'door', title: 'Bị nhốt trong khói', text: 'Vết cào bên trong, cửa khóa từ ngoài: bà Lan bị nhốt trong phòng đầy khói.' },
    { a: 'door', b: 'guardlog', title: 'Người cầm chìa tổng', text: 'Liêm quay lại 22:55–23:05 — người duy nhất có chìa tổng, đúng lúc ngọn lửa bắt đầu.' },
    { a: 'quan-call', b: 'guardlog', title: 'Cuộc gọi trước khi chết', text: '23:07 Liêm gọi bác sĩ báo bà Lan "đột quỵ" — 13 phút trước khi bất cứ ai phát hiện ra bà.' },
    { a: 'burnbin', b: 'film', title: 'Đốt Hồ sơ 13', text: 'Bản gốc Hồ sơ 13 và cuộn phim khởi công trụ 13 bị đốt cùng một lúc.' },
    { a: 'bao-order', b: 'board', title: 'Người ký chữ L.', text: 'Chữ "L." trên biên nhận của Hưng Thịnh là chữ ký của trưởng phòng Đoàn Minh Liêm.' },
    { a: 'lan-asthma', b: 'burnbin', title: 'Vũ khí không để lại vết', text: 'Lửa được mồi để cháy âm ỉ, nhiều khói — hung khí dành riêng cho một người bị hen nặng.' }
  ],

  timeline: {
    intro: 'Bác sĩ Quân ghi "đột quỵ lúc khoảng 23:15". Xếp lại các sự kiện đêm giao thừa.',
    slots: [{ t: '22:30' }, { t: '22:40' }, { t: '22:55' }, { t: '23:00' }, { t: '23:07' }, { t: '23:20' }],
    events: [
      { id: 'e1', text: 'Liêm chào bảo vệ ra về', slot: 0, need: 'guardlog' },
      { id: 'e2', text: 'Bình rời phòng lưu trữ, bà Lan còn khỏe', slot: 1, need: 'binh-left' },
      { id: 'e3', text: 'Liêm quay lại tầng 3 bằng chìa tổng', slot: 2, need: 'door' },
      { id: 'e4', text: 'Lửa mồi cồn bắt đầu cháy âm ỉ trong thùng sắt', slot: 3, need: 'burnbin' },
      { id: 'e5', text: 'Bác sĩ Quân nhận cuộc gọi "bà Lan đột quỵ"', slot: 4, need: 'quan-call' },
      { id: 'e6', text: 'Bảo vệ ngửi thấy khói, phá cửa', slot: 5 },
      { id: 'x1', text: 'Trịnh Bảo ngồi chờ ở sảnh tầng 1', slot: -1, need: 'bao-order' }
    ],
    done: 'Bà Lan bị nhốt trong khói từ 23:00. Mười ba phút trước khi cửa bị phá, kẻ nhốt bà đã gọi bác sĩ đến ký giấy chứng tử.'
  },

  endings: {
    wrong: {
      quan: 'Bác sĩ Quân bị bắt vì ký giấy chứng tử sai. Ông ta im lặng — vì người ra lệnh vẫn đang ký mọi giấy tờ của vụ án này. Trưởng phòng Liêm vỗ vai bạn: "Làm tốt lắm."',
      binh: 'Lê Bình bị bắt — người cuối cùng thấy nạn nhân còn sống. Báo Tiếng Phố mất phóng viên cuối cùng dám viết về Hồ sơ 13. Trưởng phòng Liêm ký lệnh tạm giam rất nhanh.',
      bao: 'Trịnh Bảo bị bắt thêm tội giết người. Hưng Thịnh có một con dê tế thần hoàn hảo. Bản gốc Hồ sơ 13 đã thành tro, và không ai còn hỏi chữ "L." là ai.'
    }
  },

  replay: {
    start: [
      { type: 'body', set: { hidden: true } },
      { type: 'papers', set: { hidden: true } },
      { type: 'burnbin', set: { smoke: false, ash: false } },
      { type: 'filmcan', set: { hidden: true } },
      { type: 'bit', set: { hidden: true } },
      { type: 'clock', set: { time: '22:30' } }
    ],
    beats: [
      { t: '22:30', video: 'video/08-2230.mp4', place: 'Sảnh tòa nhà Phòng hồ sơ đặc biệt', card: ['liem'], text: 'Trưởng phòng Đoàn Minh Liêm chào bảo vệ, chúc mừng năm mới và ra về. Trong cặp của ông là chìa tổng của mọi căn phòng.' },
      {
        t: '22:40', clues: ['binh-left'], text: 'Trên tầng 3, bà Lan pha trà cho Lê Bình rồi hẹn anh 23:30 quay lại: "Chỉ còn một chữ ký phải đối chiếu."',
        patch: [{ type: 'clock', set: { time: '22:40' } }],
        cast: {
          victim: { at: [1.2, 1.0], pose: 'sit', face: 'front' },
          binh: { at: [2.4, 1.9], face: 'left', then: { delay: 4, path: [[5.4, 3.9]], then: { hide: true } } }
        },
        cam: { X: 1.8, z: 1.5, h: 1, zoom: 1.35 }
      },
      {
        t: '22:55', clues: ['door', 'guardlog'], text: 'Liêm quay lại, nói với bảo vệ là "quên cặp". Hắn mở cửa phòng lưu trữ bằng chìa tổng. Bà Lan không ngạc nhiên — bà đang chờ đúng người này.',
        patch: [{ type: 'clock', set: { time: '22:55' } }],
        cast: {
          victim: { at: [1.2, 1.0], pose: 'stand', path: [[1.6, 2.1]], delay: 3, face: 'right' },
          liem: { at: [5.4, 3.9], path: [[4.4, 2.6], [2.6, 2.2]], face: 'left' }
        },
        cam: { X: 2.8, z: 2.0, h: 1, zoom: 1.3 }
      },
      {
        t: '22:58', clues: ['inhaler', 'lan-asthma'], text: 'Trong lúc bà Lan trải bảng ghim chỉ đỏ ra trước mặt hắn, Liêm lén nhỏ một giọt keo vào vòi bình xịt hen đặt trên bàn.',
        patch: [{ type: 'clock', set: { time: '22:58' } }],
        cast: {
          victim: { at: [1.6, 2.1], path: [[2.35, 0.75]], face: 'back' },
          liem: { at: [2.6, 2.2], path: [[1.4, 1.95]], delay: 2, face: 'back' }
        },
        cam: { X: 1.9, z: 1.4, h: 1, zoom: 1.5 }
      },
      {
        t: '23:00', video: 'video/08-2300.mp4', clues: ['burnbin', 'film', 'lan-notes'], text: 'Hắn gom bản gốc Hồ sơ 13 và cuộn phim trụ 13 vào thùng sắt, tưới cồn và châm lửa. Rồi bước ra, khóa cửa từ bên ngoài bằng chìa tổng.',
        patch: [
          { type: 'clock', set: { time: '23:00' } },
          { type: 'papers', set: { hidden: false } },
          { type: 'burnbin', set: { fire: true, smoke: true, ash: true }, after: 4.5 },
          { type: 'filmcan', set: { hidden: false }, after: 3.5 }
        ],
        cast: {
          liem: { path: [[3.2, 2.3]], face: 'right', then: { delay: 2.5, path: [[5.4, 3.9]], then: { hide: true } } },
          victim: { at: [2.35, 0.75], path: [[3.0, 1.9]], delay: 5, face: 'right' }
        },
        fx: 'flash', fxAt: 4.5
      },
      {
        t: '23:05', video: 'video/08-2305.mp4', clues: ['victim', 'inhaler'], dark: true, text: 'Khói đặc dần. Bà Lan bóp bình xịt — không một tia thuốc. Bà cào lên cánh cửa khóa trái, rồi gục xuống cạnh thùng sắt.',
        patch: [{ type: 'clock', set: { time: '23:05' } }, { type: 'bit', i: 0, set: { hidden: false }, after: 3 }],
        cast: { victim: { at: [3.0, 1.9], path: [[1.2, 2.2], [4.9, 2.6]], speed: 1.0, then: { delay: 1.5, pose: 'body', at: [3.9, 3.1], dir: 'right' } } },
        fx: 'shake', fxAt: 6
      },
      {
        t: '23:07', place: 'Buồng điện thoại sảnh', card: ['liem', 'quan'], clues: ['quan-call'], text: 'Từ máy lẻ 13 ở sảnh, Liêm gọi bác sĩ Quân: "Bà Lan đột quỵ. Đến ký giấy cho nhanh." Giống hệt cuộc gọi đêm 22:52 ở nhà nghỉ Minh Tân.'
      },
      {
        t: '23:20', clues: ['guardlog'], text: 'Bảo vệ ngửi thấy khói và phá cửa. Bác sĩ Quân đã đứng sẵn dưới sảnh từ 23:18. Mười ba phút. Cái chết được báo trước mười ba phút.',
        patch: [{ type: 'clock', set: { time: '23:20' } }, { type: 'burnbin', set: { fire: false } }, { type: 'bit', i: 1, set: { hidden: false } }]
      }
    ]
  },

  solution: {
    culprit: 'liem',
    evidence: ['quan-call', 'guardlog', 'door', 'inhaler', 'bao-order', 'board', 'film', 'burnbin', 'lan-notes'],
    summary: 'Đoàn Minh Liêm, trưởng phòng hồ sơ đặc biệt, là người ký chữ "L." trên mọi khoản tiền của Hưng Thịnh để chôn hồ sơ trụ cầu 13. Biết bà Lan đối chiếu xong chữ ký, đêm giao thừa hắn quay lại lúc 22:55 bằng chìa tổng, bịt vòi bình xịt hen của bà, đốt bản gốc Hồ sơ 13 cùng cuộn phim khởi công trụ 13 trong thùng sắt rồi khóa cửa từ bên ngoài. Bà Lan chết ngạt trong khói. 23:07, hắn gọi bác sĩ Quân đến ký giấy "đột quỵ" — như hắn đã làm ở nhà nghỉ Minh Tân.',
    epilogue: 'Tro trong thùng sắt không phải là tất cả. Sáng mùng một, bưu điện chuyển đến bàn bạn một phong bì bà Lan gửi từ chiều 31: bản chụp toàn bộ Hồ sơ 13, kèm một dòng chữ run run: "Cho người phá được vụ thứ mười ba." Trụ cầu số 13 bị đình chỉ thi công ba ngày sau.'
  }
});
