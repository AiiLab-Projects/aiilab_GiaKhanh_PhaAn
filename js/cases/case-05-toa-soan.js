/* Hồ sơ #05 — Bản bông cuối cùng */
(window.HS13 = window.HS13 || { cases: [] }).cases.push({
  id: 'toa-soan',
  number: '05',
  title: 'Bản bông cuối cùng',
  titleHtml: 'Bản bông <em>cuối cùng</em>',
  location: 'Báo Tiếng Phố · Phòng biên tập tầng 3',
  datetime: 'Thứ Sáu, 03.12.1999',
  clock: '06:45',
  weather: '☁ GIÓ MÙA',
  difficulty: 3,
  tagline: 'Tổng biên tập bị tủ hồ sơ đè chết lúc nửa đêm. Một tai nạn quá ngăn nắp với một tòa soạn đầy bí mật.',
  theme: { accent: '#1d7262', accent2: '#cf7424', soft: '#dbeee8', mood: 'Gió mùa · tòa soạn Tiếng Phố' },
  interview: { place: 'Phòng họp tòa soạn Tiếng Phố', alibiQ: 'Từ 23:00 đến nửa đêm qua, anh/chị ở đâu?', motiveQ: 'Anh/chị làm việc với tổng biên tập Quách Vĩnh thế nào?', props: 'office' },
  victim: { name: 'Quách Vĩnh, 58 tuổi', desc: 'Tổng biên tập báo Tiếng Phố. Nhân viên tạp vụ phát hiện lúc 05:30.' },
  briefing: [
    'Báo Tiếng Phố sắp lên khuôn số đặc biệt cuối năm. 05:30 sáng, cô Tư tạp vụ phát hiện tổng biên tập Quách Vĩnh nằm dưới một tủ hồ sơ đổ trong phòng biên tập.',
    'Công an phường nghiêng về tai nạn: tủ cũ, sàn trơn, ông Vĩnh làm việc khuya một mình. Nhưng trang nhất của số báo sáng nay đã bị thay bằng một trang quảng cáo.',
    'Một phóng viên trẻ khẳng định bài điều tra của anh đã được duyệt lên trang nhất. Ai đã rút nó xuống, và vì sao?'
  ],
  sceneBrief: 'Phòng biên tập sáng đèn tuýp. Chiếc tủ hồ sơ đổ đè lên chân nạn nhân, ngăn kéo "1997" trống rỗng. Máy chữ trên bàn tổng biên tập vẫn kẹp một trang giấy.',
  objective: 'Chứng minh đây không phải tai nạn và tìm người đã rút bài trang nhất.',
  question: 'Ai đã giết tổng biên tập Quách Vĩnh?',

  art: {
    src: 'img/scenes/toa-soan.jpg', w: 1024, h: 572,
    decals: [{ type: 'smear', uv: true, x: 620, y: 352, w: 14, h: 6, rot: -10, color: 'rgba(150,220,255,.95)' }],
    spots: {
      victim: [690, 415, 65], cabinet: [540, 355, 50], ribbon: [215, 420, 30, 'loupe'], proof: [365, 490, 34, 'loupe'],
      timecard: [514, 224, 26], heel: [842, 515, 22], ink: [620, 352, 22, 'uv']
    }
  },
  spec: {
    seed: 'toa-soan',
    geometry: { width: 8, depth: 4.8, horizon: 102, top: 4 },
    room: {
      wall: { type: 'plaster', color: '#57584c', stains: 6, wainscot: { h: 1.0, color: '#3d4038', panel: 0.8 }, cap: '#1f201c' },
      floor: { type: 'tile', colors: ['#7a756c', '#6c675f', '#736e65'], size: 0.32, grout: '#2a2826' }
    },
    ambient: [0.42, 0.43, 0.47],
    lights: [
      { X: 2.2, z: 1.8, h: 2.5, r: 4.0, color: '#e8f2ea', intensity: 0.7, flicker: 0.2 },
      { X: 5.8, z: 2.4, h: 2.5, r: 4.0, color: '#e8f2ea', intensity: 0.5 },
      { X: 3.6, z: 0.2, h: 1.5, r: 2.4, color: '#8aa4c4', intensity: 0.55 },
      { X: 1.0, z: 1.55, h: 1.15, r: 1.8, color: '#ffcf8a', intensity: 0.8 }
    ],
    beams: [{ from: [3.6, 0.05, 1.5], to: [3.7, 1.6], w: 1.3, sw: 0.6, color: '#9fb6d6', a: 0.06 }],
    spawn: { X: 6.8, z: 4.4 },
    props: [
      { type: 'board', X: 0.5, h: 1.15, w: 1.5, hh: 0.85, strings: true, n: 11 },
      { type: 'clock', X: 2.4, h: 2.05, r: 0.16, time: '06:45', color: '#2a2a2e' },
      { type: 'poster', X: 2.15, h: 1.2, w: 0.5, hh: 0.68, color: '#2a4a6a' },
      { type: 'window', X: 2.95, h: 1.0, w: 1.3, hh: 1.0, view: 'city', blinds: true, rain: false, neon: '#4ac0d0' },
      { type: 'block', X: 6.05, z: 0, w: 0.35, d: 0.12, h: 0.42, e: 1.15, color: '#6a6e66', block: false },
      { type: 'block', X: 6.1, z: 0.12, w: 0.25, d: 0.005, h: 0.04, e: 1.33, color: '#1a1a1a', block: false, sort: 0.2 },
      { type: 'shelf', X: 6.0, h: 0.85, w: 0.45, items: 'boxes', seed: 'cards' },
      { type: 'door', X: 6.75, w: 0.9, number: '3', color: '#4a4a40' },
      { type: 'coatrack', X: 0.3, z: 0.35, coat: '#6a2a3a' },
      { type: 'desk', X: 0.4, z: 1.3, w: 1.5, d: 0.7, color: '#4a3a2a' },
      { type: 'typewriter', X: 0.95, z: 1.42, e: 0.76 },
      { type: 'lamp', X: 1.55, z: 1.5, e: 0.76, color: '#3a3a2a' },
      { type: 'papers', X: 1.6, z: 1.85, e: 0.765, n: 2, spread: 0.2 },
      { type: 'chair', X: 0.95, z: 2.1, facing: 'back', color: '#3a3a40' },
      { type: 'desk', X: 2.5, z: 1.3, w: 1.5, d: 0.7, color: '#4a3a2a' },
      { type: 'sheet', X: 2.75, z: 1.45, e: 0.765, w: 0.34, d: 0.24, color: '#ece6d6', ink: '#3a3a3a' },
      { type: 'cup', X: 3.4, z: 1.5, e: 0.76, color: '#e6e0d2', liquid: '#3a2414' },
      { type: 'ashtray', X: 3.7, z: 1.65, e: 0.76, n: 3 },
      { type: 'filecab', X: 4.55, z: 0.1 },
      { type: 'filecab', X: 5.1, z: 0.1 },
      { type: 'bookcase', X: 7.15, z: 1.25, w: 0.75, d: 0.35, h: 1.9, fill: 'files' },
      { type: 'stack', X: 6.9, z: 2.15, w: 0.55, d: 0.42, h: 0.6 },
      { type: 'stack', X: 7.1, z: 2.7, w: 0.5, d: 0.4, h: 0.4 },
      { type: 'body', X: 3.25, z: 2.95, dir: 'left', look: { coat: '#5a5a62', shirt: '#dcd6c8', pants: '#2e2e34', skin: '#c49a7c', hair: '#a8a29a', hairStyle: 'side', glasses: true } },
      { type: 'filecab', X: 4.05, z: 2.92, fallen: true, sort: 3.6 },
      { type: 'papers', X: 4.3, z: 3.75, n: 6, spread: 0.9 },
      { type: 'footprints', X: 5.95, z: 2.95, X2: 4.9, z2: 3.0, n: 2, color: 'rgba(30,30,32,.35)' },
      { type: 'bit', X: 6.35, z: 3.75, w: 0.05, d: 0.07, color: '#e6dcc4', glint: true },
      { type: 'tube', X: 2.2, z: 1.8, h: 2.55, w: 1.2, flicker: true },
      { type: 'tube', X: 5.8, z: 2.4, h: 2.55, w: 1.2 },
      { type: 'fan', X: 4.0, z: 2.0, h: 2.4, speed: 2.6 }
    ],
    hotspots: [
      { id: 'victim', X: 3.6, z: 3.1, h: 0.1, r: 0.5, pz: 3.85, px: 3.3 },
      { id: 'cabinet', X: 4.7, z: 3.15, h: 0.55, r: 0.4, pz: 3.85 },
      { id: 'ribbon', X: 0.95, z: 1.5, h: 0.95, r: 0.2, pz: 2.2, px: 1.5 },
      { id: 'proof', X: 2.9, z: 1.55, h: 0.78, r: 0.2, pz: 2.2 },
      { id: 'timecard', X: 6.22, z: 0.1, h: 1.35, r: 0.25, pz: 0.75 },
      { id: 'heel', X: 6.37, z: 3.78, h: 0, r: 0.16 },
      { id: 'ink', X: 5.0, z: 3.25, h: 0.3, r: 0.2, sparkle: false, placard: false }
    ]
  },

  clues: [
    { id: 'victim', kind: 'vat', label: 'Khám nghiệm ông Vĩnh', short: 'Vết thương thái dương, xác bị di chuyển', detail: 'Vết thương chí mạng ở thái dương phải, hình cạnh tròn — không khớp với cạnh vuông của tủ. Hoen tử thi ở lưng nhưng thi thể nằm nghiêng: ông đã bị di chuyển sau khi chết.' },
    { id: 'cabinet', kind: 'vat', label: 'Tủ hồ sơ đổ', short: 'Vết kéo lê trên sàn, ngăn "1997" trống', detail: 'Trên nền gạch có hai vệt xước dài gần một mét: chiếc tủ bị kéo lê tới rồi mới bị xô đổ. Ngăn kéo dán nhãn "1997" trống trơn.' },
    { id: 'ribbon', kind: 'vat', label: 'Ruy-băng máy chữ', short: 'Đọc được những dòng cuối', detail: 'Soi ruy-băng carbon dưới đèn, đọc được dòng cuối ông Vĩnh gõ: "...Bài của Bình lên trang nhất số sáng mai. Uyên, chị nên tự nộp đơn từ chức trước 8 giờ."' },
    { id: 'proof', kind: 'vat', label: 'Bản bông trang nhất', short: 'Bị thay bằng quảng cáo — ký "H.U. 23:40"', detail: 'Bản bông trang nhất gửi nhà in đã bị thay bằng trang quảng cáo. Góc phải ký duyệt tắt: "H.U. — 23:40". Chỉ phó tổng biên tập Hà Uyên ký tắt như vậy.' },
    { id: 'timecard', kind: 'vat', label: 'Máy chấm công', short: 'Thẻ của Uyên: ra lúc 23:15', detail: 'Thẻ chấm công của Hà Uyên dập giờ ra 23:15 — sớm hơn 25 phút so với chữ ký duyệt bản bông. Ai đó đã dập thẻ trước khi thật sự rời đi.' },
    { id: 'heel', kind: 'vat', label: 'Mảnh gót giày', short: 'Gót nhọn màu ngà, gãy ở chân', detail: 'Một mảnh gót giày nữ màu ngà, gãy ngang, nằm cạnh lối ra cầu thang sau. Vết gãy còn mới, chưa bám bụi.' },
    { id: 'ink', kind: 'vat', label: 'Vệt mực in xanh', short: 'Dính ở hông tủ', detail: 'Hông tủ có vệt mực in màu xanh — loại mực của xưởng in tầng trệt. Vệt mực đã khô cứng, có từ nhiều giờ trước.' },
    { id: 'luc-moved', kind: 'loi', label: 'Lời thợ in Lực', short: 'Chuyển tủ lúc 18:00', detail: 'Thợ in Lực: "18:00 chiều qua anh Vĩnh nhờ tôi khiêng cái tủ đó ra giữa phòng để lấy hồ sơ cũ. Mực dính tay tôi từ lúc ấy." Vệt mực không liên quan tới cái chết.' },
    { id: 'binh-story', kind: 'loi', label: 'Bài điều tra của Bình', short: 'Vụ đất Phú Mỹ, có tên chồng Uyên', detail: 'Phóng viên Bình: bài điều tra vụ đất Phú Mỹ của anh nêu tên chồng của Hà Uyên. Hồ sơ gốc nằm trong ngăn "1997" của tủ lưu trữ.' },
    { id: 'tu-saw', kind: 'loi', label: 'Lời cô Tư', short: '0:05 thấy chị Uyên đi cầu thang sau, tập tễnh', detail: 'Cô Tư tạp vụ: "0:05 tôi lau cầu thang sau, thấy chị Uyên đi xuống, một tay xách túi to, đi tập tễnh như gãy gót giày. Chị ấy dặn tôi đừng nói với ai."' }
  ],

  suspects: [
    {
      id: 'uyen', name: 'Hà Uyên', role: 'phó tổng biên tập',
      look: { skin: '#d6b096', hair: '#1a1214', hairStyle: 'bob', coat: '#e6dcc4', shirt: '#2a2a2e', pants: '#2a2a30', dress: '#e6dcc4', earrings: true, glasses: true },
      intro: 'Tôi về lúc 23:15, thẻ chấm công ghi rõ. Sáng nay tôi mới biết tin.',
      alibi: 'Thẻ chấm công dập 23:15. Tôi về thẳng nhà, chồng tôi làm chứng.',
      motive: 'Anh Vĩnh và tôi bất đồng chuyên môn, ai làm báo mà chẳng thế.',
      presents: {
        proof: { line: 'Ai cũng có thể ký tắt hai chữ H.U. Trang quảng cáo đó là quyết định của ban trị sự.', mood: 'nervous' },
        heel: { line: 'Giày màu ngà thì cả tòa soạn có ba người đi.', mood: 'angry' },
        'tu-saw': { line: 'Cô Tư lớn tuổi rồi, nhìn nhầm người là chuyện bình thường.', mood: 'angry' },
        ribbon: { line: 'Anh ấy gõ gì là việc của anh ấy. Tôi không bao giờ từ chức vì một bài báo.', mood: 'angry' },
        timecard: { line: 'Tôi dập thẻ rồi... quay lên lấy cái ô. Năm phút thôi.', mood: 'nervous' }
      },
      fallback: ['Tôi còn phải lo số báo sáng nay. Anh hỏi nhanh.', 'Tôi không có gì để nói thêm.']
    },
    {
      id: 'luc', name: 'Trương Lực', role: 'thợ in tầng trệt',
      look: { skin: '#a8805f', hair: '#191516', hairStyle: 'short', coat: '#3a4a5a', shirt: '#8a8a7a', pants: '#2a2a30', apron: '#2a3a4a', beard: true },
      intro: 'Tôi ở dưới xưởng in cả đêm. Máy chạy ầm ầm, có ai gọi cũng chẳng nghe.',
      alibi: 'Ca in đêm từ 22:00, cả tổ bốn người.',
      motive: 'Anh Vĩnh định cắt lương làm đêm. Tôi có cãi nhau, ai cũng biết.',
      presents: {
        ink: { line: 'Mực của tôi đấy. 18:00 chiều qua anh Vĩnh nhờ tôi khiêng cái tủ ra giữa phòng để lấy hồ sơ cũ. Lúc đó tủ vẫn đứng vững.', unlock: 'luc-moved' },
        cabinet: { line: 'Tôi khiêng nó lúc 18:00, đặt ngay ngắn. Cái tủ đó nặng lắm, một người không xô đổ được nếu không kéo nó ra mép.', unlock: 'luc-moved' },
        proof: { line: 'Bản bông lúc 23:45 mới xuống tới xưởng. Trang nhất là quảng cáo, tôi còn ngạc nhiên.' }
      },
      fallback: ['Tôi chỉ biết in thôi.', 'Hỏi mấy người trên lầu ấy.']
    },
    {
      id: 'binh', name: 'Lê Bình', role: 'phóng viên điều tra',
      look: { skin: '#c9a084', hair: '#211a1a', hairStyle: 'side', coat: '#5a5a3a', shirt: '#d8d0bc', pants: '#2e2e30', glasses: true },
      intro: 'Bài của tôi đã được duyệt trang nhất. Sáng nay nó biến mất cùng với anh Vĩnh.',
      alibi: 'Tôi rời tòa soạn lúc 22:30 và ngồi quán cà phê đến 1 giờ.',
      motive: 'Anh Vĩnh là người duy nhất dám đăng bài của tôi. Tôi mất nhiều hơn ai hết.',
      presents: {
        ribbon: { line: 'Bài của tôi là vụ đất Phú Mỹ. Trong đó có tên chồng chị Uyên. Hồ sơ gốc anh Vĩnh cất trong ngăn "1997".', unlock: 'binh-story' },
        cabinet: { line: 'Ngăn 1997 trống? Đó là chỗ để hồ sơ gốc vụ Phú Mỹ — có tên chồng chị Uyên.', unlock: 'binh-story', mood: 'angry' },
        proof: { line: 'Trang quảng cáo? Không thể nào. Anh Vĩnh tự tay duyệt bài tôi lúc 22:00.', mood: 'angry' }
      },
      fallback: ['Tôi chỉ muốn sự thật được in ra.', 'Tôi không biết.']
    },
    {
      id: 'tu', name: 'Cô Tư', role: 'nhân viên tạp vụ',
      look: { skin: '#c49a7c', hair: '#8a8480', hairStyle: 'bun', coat: '#6a7a6a', shirt: '#d8cfb8', pants: '#3a3a34', apron: '#8a8a7a' },
      intro: 'Tôi làm ca đêm, lau dọn từ tầng năm xuống. 05:30 tôi vào phòng thì thấy ông ấy.',
      alibi: 'Tôi đi lau từng tầng, ông bảo vệ có thấy.',
      motive: 'Ông Vĩnh hay cho tôi tiền mua quà cho cháu. Ông là người tử tế.',
      presents: {
        heel: { line: 'Gót giày màu ngà... Lúc 0:05 tôi thấy chị Uyên đi cầu thang sau, xách túi to, đi tập tễnh. Chị ấy dặn tôi đừng nói với ai.', unlock: 'tu-saw', mood: 'nervous' },
        timecard: { line: 'Chị Uyên dập thẻ rồi quay lên lại, tôi thấy mà. Lúc đó khoảng 23:20.', mood: 'nervous' },
        victim: { line: 'Đêm qua tôi thấy chị Uyên đi cầu thang sau lúc 0:05, đi tập tễnh. Tôi sợ quá nên không dám nói.', unlock: 'tu-saw', mood: 'nervous' }
      },
      fallback: ['Tôi chỉ lau nhà thôi, cậu ạ.', 'Tôi không biết chữ nhiều, cậu hỏi người khác.']
    }
  ],

  deductions: [
    { a: 'timecard', b: 'proof', title: 'Ngoại phạm dập trước', text: 'Uyên dập thẻ ra lúc 23:15 nhưng vẫn ký duyệt bản bông lúc 23:40. Thẻ chấm công là ngoại phạm giả.' },
    { a: 'victim', b: 'cabinet', title: 'Tai nạn dàn dựng', text: 'Ông Vĩnh bị đánh vào thái dương ở chỗ khác, rồi bị kéo tới và chiếc tủ được xô đè lên.' },
    { a: 'ribbon', b: 'binh-story', title: 'Động cơ', text: 'Vĩnh định đăng bài vạch vụ đất Phú Mỹ có tên chồng Uyên và buộc chị từ chức trước 8 giờ sáng.' },
    { a: 'heel', b: 'tu-saw', title: 'Cầu thang sau', text: 'Uyên rời đi bằng cầu thang sau lúc 0:05, xách túi to, gãy gót giày gần cửa phòng biên tập.' },
    { a: 'ink', b: 'luc-moved', title: 'Vết mực vô can', text: 'Vệt mực xanh có từ 18:00 khi Lực khiêng tủ giúp ông Vĩnh — không liên quan tới cái chết.' },
    { a: 'cabinet', b: 'binh-story', title: 'Ngăn kéo 1997', text: 'Hồ sơ gốc vụ Phú Mỹ trong ngăn "1997" đã bị lấy đi — trong chiếc túi to cô Tư nhìn thấy.' }
  ],

  solution: {
    culprit: 'uyen',
    evidence: ['timecard', 'proof', 'tu-saw', 'heel', 'ribbon', 'binh-story', 'cabinet', 'victim'],
    summary: 'Hà Uyên dập thẻ ra lúc 23:15 rồi quay lại phòng biên tập. Khi ông Vĩnh đưa trang đánh máy yêu cầu chị từ chức, Uyên đánh ông bằng chặn giấy rồi kéo thi thể tới chân tủ hồ sơ, xô tủ đè lên để dựng tai nạn. Chị lấy hồ sơ gốc vụ Phú Mỹ trong ngăn "1997", thay trang nhất bằng quảng cáo, ký duyệt lúc 23:40 và rời đi bằng cầu thang sau lúc 0:05.',
    epilogue: 'Bài của Bình lên trang nhất số báo chiều. Ở cuối bài, ban biên tập thêm một dòng: "Tưởng nhớ Quách Vĩnh — người không chịu rút bài."'
  }
});
