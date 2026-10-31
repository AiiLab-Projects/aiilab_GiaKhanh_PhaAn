# Hồ Sơ 13 — Phá Án

Trò chơi trinh thám pixel chạy hoàn toàn trên trình duyệt: chọn hồ sơ, khám nghiệm hiện trường, thẩm vấn nghi phạm, ghép manh mối thành suy luận rồi chỉ ra hung thủ.

## Chạy thử

Không cần build. Mở `index.html` bằng một máy chủ tĩnh bất kỳ (khuyến nghị, để font và `localStorage` hoạt động ổn định):

```bash
npx serve .            # hoặc
python -m http.server 8000
```

Mở trực tiếp bằng `file://` vẫn chạy được.

## Tám hồ sơ

| # | Hồ sơ | Bối cảnh | Độ khó |
|---|-------|----------|--------|
| 01 | Căn phòng 204 | Nhà nghỉ ven ga, đêm mưa, cửa khóa trái | ●○○ |
| 02 | Đêm cuối tại Vạn Hoa | Sảnh dạ tiệc khách sạn, sân khấu, ly rượu | ●●○ |
| 03 | Giờ chết của Kim Thời | Tiệm đồng hồ, mọi chiếc đồng hồ dừng 22:15 | ●●○ |
| 04 | Chuyến tàu đêm SE7 | Khoang giường nằm, cửa sổ hé giữa cơn mưa | ●●● |
| 05 | Bản bông cuối cùng | Phòng biên tập báo, tủ hồ sơ đổ | ●●● |
| 06 | Cuộn phim cuối cùng | Phòng máy rạp chiếu bóng, cuộn phim thứ tư nối vụng | ●●○ |
| 07 | Chuyến phà lúc 23:30 | Khoang phà đêm, chậu nước xà phòng, dây neo dính bùn | ●●● |
| 08 | Hồ Sơ 13 (hồi cuối) | Phòng lưu trữ đêm giao thừa; mở khoá sau khi phá 5 vụ | ●●● |

Bảy vụ đầu đều để lại một mảnh của "Hồ sơ 13". Phá xong vụ nào, mảnh đó hiện trên bảng **Mạch truyện Hồ sơ 13** trong Tủ hồ sơ (bấm vào để đọc). Đủ năm vụ thì mở được hồ sơ cuối.

## Cách chơi

1. **Khám hiện trường bằng bộ đồ pháp y**: chọn dụng cụ ở thanh dưới ảnh (phím `1`–`4`): 👁 Quan sát, 🔍 Kính lúp (phóng to chữ nhỏ, vết xước), 🟣 Đèn UV (tắt đèn, soi dấu vết mắt thường không thấy), 🖌 Bột vân tay (rắc lên bề mặt để hiện dấu tay). Mỗi vật chứng chỉ lộ ra với đúng dụng cụ; số trên từng nút cho biết còn bao nhiêu dấu vết cần tìm. Thấy dấu vết thì bấm **📷 Chụp ảnh & đặt biển số** để thu vào túi; biển số vàng đánh theo thứ tự thu được. Vòng gợi ý nét đứt tắt được. Hồ sơ không có ảnh sẽ dùng cảnh pixel: đi lại bằng WASD hoặc bấm sàn, bấm `E` để kiểm tra.
2. **Thẩm vấn** (kiểu visual novel): chọn nghi phạm ở cột trái, hỏi ngoại phạm / quan hệ, hoặc bấm một thẻ trong **túi chứng cứ** ở đáy màn hình để đưa ra. Đưa đúng thứ, nghi phạm sẽ lộ thêm lời khai mới.
   - **Đối chất** (kiểu Ace Attorney): bấm *Đối chất* để nghe lại từng câu trong lời khai, dùng ◀ ▶ chuyển câu, *Hỏi vặn* để nghe thêm, rồi chọn một thẻ trong túi và bấm **Phản bác!** đúng vào câu sai. Đúng thì nghi phạm lung lay (+30 áp lực), câu bị gạch và mở thêm lời khai; sai thì mất điểm áp lực và tốn 1 giờ.
3. **Suy luận**: đặt hai thẻ vào phương trình `[manh mối] + [manh mối] = ?`. Các suy luận chưa mở hiện dạng "???".
   - **Dòng thời gian** (các vụ 06–08): kéo các sự kiện vào đúng mốc giờ trên bảng. Sự kiện chỉ mở khi đã có manh mối liên quan. Phải xếp đúng toàn bộ mới được buộc tội; kiểm tra sai tốn 1 giờ.
4. **Buộc tội**: chọn hung thủ trong hàng nhận diện, rồi chọn tối đa 3 thẻ trong túi làm chứng cứ. chỉ ra hung thủ và tối đa ba chứng cứ. Điểm = đúng hung thủ (40) + chứng cứ đúng (10 mỗi cái) + tỉ lệ suy luận (20) + tỉ lệ manh mối (10) − 10 mỗi lần nộp sai. Xếp hạng S ≥ 90, A ≥ 75, B ≥ 60, còn lại C.
   - **Áp lực thời gian** (các vụ 06–08): đồng hồ ⏳ trên thanh trên cùng đếm số giờ còn lại trước khi hung thủ trốn thoát. Mỗi câu hỏi tốn 1 giờ, phản bác sai 1 giờ, buộc tội sai tốn nhiều giờ hơn. Hết giờ thì vào **kết thúc "Hung thủ trốn thoát"**; buộc tội sai thì vào **kết thúc oan sai**. Cả hai đều có thể chơi lại. Giờ còn dư được cộng thêm tới 10 điểm.
5. **Tái hiện vụ án**: phá án xong, một đoạn phim ngắn tự chiếu lại diễn biến thật ngay trên hiện trường: nhân vật đi lại, đồ vật đổi trạng thái (ghế đổ, két mở, đồng hồ bị chỉnh giờ), máy quay lia tới từng chi tiết, kèm đồng hồ thời gian và lời kể chữ chạy. Mỗi khoảnh khắc gắn với chứng cứ liên quan và cho biết bạn đã thu thập hay bỏ lỡ. Phim kết thúc ở hiện trường lúc được phát hiện, có biển số tại những vật chứng bạn đã tìm thấy. Xem lại bất cứ lúc nào ở màn "Hồ sơ đã đóng". Phím: `Space` dừng/phát, `←`/`→` chuyển khoảnh khắc, `Esc` đóng; nút `1×/2×` đổi tốc độ.

Tiến độ (kể cả lịch sử hỏi cung) lưu trong `localStorage` (khóa `hoso13:v1`) và có thể xoá riêng từng hồ sơ trong Tủ hồ sơ.

Mỗi màn có địa chỉ riêng nên nút Back của trình duyệt hoạt động và có thể gửi link thẳng tới một bước:
`#/` (tủ hồ sơ), `#/ho-so/<id>` (hiện trường), `#/ho-so/<id>/interview`, `/board`, `/conclude`.

## Giao diện theo từng vụ án

Giao diện kiểu game, tham khảo The Case of the Golden Idol (kho manh mối luôn hiện, màn suy luận điền ô trống), Ace Attorney (túi chứng cứ, hộp thoại có bảng tên, "đưa ra" chứng cứ) và hàng nhận diện của cảnh sát. Chữ dùng Be Vietnam Pro, phông được thiết kế riêng cho dấu tiếng Việt. Sổ tay mở dạng ngăn kéo bên phải. Khi mở một hồ sơ, toàn bộ màu nhấn đổi theo khối `theme` của vụ đó, còn phòng thẩm vấn được dựng lại từ tường và sàn của hiện trường, cộng thêm đồ đạc theo `interview.props`.

## Cấu trúc

```
index.html            khung trang, nạp engine → hồ sơ → game
css/game.css          giao diện (phông Be Vietnam Pro)
js/engine/core.js     PixelScene: phối cảnh, vật liệu, ánh sáng, va chạm, tìm đường, chụp cận cảnh
js/engine/people.js   vẽ nhân vật đứng/ngồi/nằm và chân dung thẩm vấn 64×64
js/engine/props.js    thư viện ~60 đạo cụ (cửa sổ mưa, đèn, tủ, bàn, đồng hồ, giường tàu…)
js/engine/props-more.js đạo cụ cho vụ 06–08 (máy chiếu, hộp phim, giá phim, phao, chậu, dây neo, thùng đốt, đèn bão)
js/engine/art.js      SceneArt: hiện trường từ ảnh minh hoạ, vùng bấm, ảnh cận cảnh
js/engine/replay.js   CaseReplay: phim tái hiện vụ án sau khi phá án
img/scenes/*.jpg      ảnh hiện trường (Gemini, đã xoá logo ✦)
video/*.mp4           đoạn phim tái hiện quay sẵn (Gemini Veo, đã xoá logo)
js/cases/*.js         mỗi file là một hồ sơ, chỉ chứa dữ liệu
js/game.js            luồng trò chơi, lưu tiến độ, chấm điểm
```

## Thêm một hồ sơ mới

Tạo `js/cases/case-06-ten.js` rồi thêm một thẻ `<script>` trong `index.html`:

```js
(window.HS13 = window.HS13 || { cases: [] }).cases.push({
  id: 'ten-ho-so', number: '06', title: '…', titleHtml: '… <em>…</em>',
  location: '…', datetime: '…', clock: '23:10', weather: '☔ MƯA', difficulty: 2,
  tagline: '…', victim: { name: '…', desc: '…' },
  theme: { accent: '#c0503a', accent2: '#2f7189', soft: '#f6e3dc', mood: 'Đêm mưa · nhà nghỉ ven ga' },
  interview: { place: 'Phòng trực …', alibiQ: 'Từ 22:00 đến 22:30 …?', motiveQ: 'Anh/chị quen … thế nào?',
               props: 'office' },          // office | backstage | workshop | dining
  briefing: ['…'], sceneBrief: '…', objective: '…', question: 'Ai đã …?',
  spec: {                                   // hiện trường, đơn vị mét
    geometry: { width: 8, depth: 5, horizon: 100 },
    room: { wall: { type: 'wallpaper', color: '#3a4a40' }, floor: { type: 'wood' } },
    ambient: [0.35, 0.36, 0.45],
    lights: [{ X: 4, z: 2, h: 2.3, r: 3, color: '#ffd59a', intensity: 1 }],
    props: [{ type: 'desk', X: 1, z: 1.5 }, { type: 'body', X: 3, z: 3, dir: 'left', look: {} }],
    hotspots: [{ id: 'victim', X: 3.6, z: 3.1, h: 0.1, r: 0.5 }],
    spawn: { X: 7, z: 4.5 }
  },
  clues: [{ id: 'victim', kind: 'vat', label: '…', short: '…', detail: '…' },
          { id: 'loi-a', kind: 'loi', label: '…', short: '…', detail: '…' }],
  suspects: [{ id: 'a', name: '…', role: '…', look: {}, intro: '…', alibi: '…', motive: '…',
               presents: { victim: { line: '…', unlock: 'loi-a', mood: 'nervous' } }, fallback: ['…'] }],
  deductions: [{ a: 'victim', b: 'loi-a', title: '…', text: '…' }],
  solution: { culprit: 'a', evidence: ['victim', 'loi-a'], summary: '…', epilogue: '…' }
});
```

Các khối tuỳ chọn cho lối chơi mới (xem mẫu đầy đủ ở `case-06-rap-thang-tam.js`):

```js
suspects: [{ id: 'a', …,
  testimony: [                               // lời khai để đối chất
    { text: 'Tôi ở sảnh suốt từ 21:30.', contra: 'confetti',       // contra: id thẻ (hoặc mảng id) phản bác được
      press: 'Thật mà!', broken: 'Thôi được… tôi có lên lầu.', unlock: 'tam-vhs' },
    { text: '…' }                            // không có contra: câu thật, không phản bác được
  ],
  deflect: ['Cái đó thì liên quan gì?']      // câu đáp khi phản bác sai
}],
timeline: {
  intro: '…', done: '…',
  slots: [{ t: '21:45' }, { t: '21:55' }],
  events: [{ id: 'e1', text: 'Đổi cuộn 3', slot: 0, need: 'logbook' },   // need: manh mối cần có để thấy sự kiện
           { id: 'x1', text: 'Sự kiện gây nhiễu', slot: -1 }]             // slot -1: không thuộc mốc nào
},
pressure: { budget: 40, wrongCost: 8, warn: [{ at: 15, text: '…' }] },   // số giờ trước khi hung thủ trốn
endings: { escape: '…', wrong: { idNghiPham: '…' } },
meta: { title: 'Bản sao số 1', fragment: '…' },   // mảnh của mạch truyện Hồ sơ 13
finale: true, unlockAfter: 5, lockedText: '…'      // chỉ hồ sơ cuối
```

Quy ước: mỗi manh mối `vat` cần một `hotspot` cùng `id`; mỗi lời khai `loi` phải được mở khóa bởi `unlock` ở một nghi phạm nào đó; hồ sơ phải giải được từ những gì người chơi thu thập.

- Toạ độ: `X` tính từ tường trái, `z` tính từ tường sau, `h` là độ cao.
- Đồ vật trên tường dùng `X` và `h`; đồ vật trên sàn dùng `X`, `z` và kích thước `w`/`d`.
- Danh sách đạo cụ và tham số xem trong `js/engine/props.js`.

## Phim tái hiện vụ án

Lấy cảm hứng từ màn "Closing Argument" của Danganronpa (vụ án được dựng lại thành từng khung rồi chiếu thành phim có lời kể) và đoạn hồi tưởng cuối vụ của Ace Attorney. Phim dựng bằng chính `spec` của hiện trường; các vụ 06–08 có một đoạn video quay sẵn bằng Gemini Veo (≈10 giây, đã xoá logo) cho từng mốc thời gian, nên cả vụ án được chiếu thành một bộ phim liền mạch từ đầu đến cuối. Tên tệp theo mẫu `video/<số vụ>-<giờ>.mp4`, ví dụ `video/07-2350.mp4`. Mỗi hồ sơ khai báo khối `replay`:

```js
replay: {
  start: [                                   // trạng thái đồ vật TRƯỚC khi vụ án xảy ra
    { type: 'body', set: { hidden: true } },
    { type: 'chair', set: { fallen: false, X: 4.95, z: 2.95 } },
    { type: 'papers', i: 1, set: { hidden: true } }        // i: chỉ đồ vật thứ i cùng loại
  ],
  beats: [                                   // các khoảnh khắc, chiếu lần lượt
    { t: '21:40', place: 'Cổng nhà nghỉ', card: ['khang', 'bao'], clues: ['bao-key'], text: '…' }, // sự việc ở nơi khác: thẻ chân dung
    {
      t: '22:10', text: '…', clues: ['victim'],
      cast: {                                // diễn viên: 'victim' hoặc id nghi phạm
        khang: { at: [6.2, 0.55], path: [[4.6, 2.05]], face: 'front', speed: 1.3, delay: 0.5 },
        victim: { then: { delay: 1.6, pose: 'body', at: [2.5, 3.05], dir: 'right' } }
      },
      patch: [{ type: 'chair', set: { fallen: true }, after: 1.6 }],   // đổi đồ vật sau 1,6 giây
      fx: 'flash', fxAt: 1.6,                // flash | shake
      cam: { X: 3.8, z: 3, h: 1, zoom: 1.5 } // máy quay lia tới điểm này; bỏ trống = toàn cảnh
    }
  ]
}
```

- Diễn viên giữ nguyên trạng thái từ khoảnh khắc trước. `at` đặt vị trí tức thì, `path` đi bộ qua các điểm, `then` áp dụng khi đi xong (ngã xuống, ngồi, biến mất bằng `hide: true`).
- `pose`: `stand` | `sit` | `body` (nằm); `holding`: màu đồ vật cầm trên tay; `limp: true`: đi tập tễnh; `sort`: ép thứ tự vẽ khi bị giường/sân khấu che.
- `dark: true` làm tối cảnh, `dur` đặt thời lượng (mặc định tính theo độ dài lời kể và quãng đường đi).
- Vai phụ không phải nghi phạm thêm qua `replay.cast: { id: { name, look } }`.
- `video: 'video/ten.mp4'`: khoảnh khắc chiếu một đoạn phim quay sẵn đè lên cảnh pixel (tắt tiếng, theo nút dừng/tốc độ). Thời lượng lấy theo độ dài clip, trừ khi đặt `dur`. Lỗi tải video thì tự quay về cảnh pixel.
- Hồ sơ không có khối `replay` vẫn có phim: lời giải `solution.summary` được chia thành từng câu trên nền hiện trường.

## Hiện trường ảnh minh hoạ

Ảnh trong `img/scenes/` là tranh vẽ bán thực tạo bằng Gemini (cùng một cuộc trò chuyện để giữ phong cách): có nạn nhân, dây phong toả, vết máu vừa phải, không ghê rợn. `js/engine/art.js` (SceneArt) dựng từ ảnh gốc ba lớp: ảnh thường, lớp UV (tối, ám tím, hiện các chi tiết `uv: true` phát sáng) và lớp bột vân tay (bột xám và dấu tay tại các điểm `print`). Các lớp này dùng cho hiện trường, ảnh thu nhỏ và ảnh cận cảnh. Mỗi hồ sơ khai báo khối `art`, toạ độ tính theo điểm ảnh của ảnh gốc:

```js
art: {
  src: 'img/scenes/phong-204.jpg', w: 1024, h: 572,
  decals: [{ type: 'text', uv: true, x: 640, y: 200, text: '13' }], // text | clock | steps | smear; uv: chỉ hiện dưới đèn UV
  spots: {                                   // id manh mối: [x, y, bán kính, dụng cụ]
    victim: [600, 395, 70],                  // mặc định 'look' (quan sát)
    receipt: [912, 358, 22, 'loupe'],        // kính lúp
    phone: [842, 318, 26, 'print'],          // bột vân tay
    number: [640, 200, 34, 'uv']             // đèn UV
  }
}
```

Khối `spec` vẫn giữ để dựng phòng thẩm vấn và làm phương án dự phòng khi hồ sơ không có ảnh.

## Kỹ thuật dựng hiện trường (cảnh pixel)

Mục tiêu là hiện trường dễ nhìn, rõ từng đồ vật, nhưng vẫn giữ chất pixel và không cần file ảnh:

- **Phối cảnh một điểm tụ** ở độ phân giải 640×360 (dữ liệu hồ sơ vẫn viết theo khung 320×180, engine tự nhân hệ số `S = 2`). Mọi vật thể đặt theo mét, nên tỉ lệ người và đồ đạc luôn nhất quán.
- **Kiểu minh hoạ rõ nét**: đồ vật và nhân vật vẽ trên một lớp riêng rồi được viền đậm khi ghép, nên tách hẳn khỏi tường và sàn.
- **Vật liệu thủ tục từng điểm ảnh**:
  - tường: giấy dán tường, gạch, ốp gỗ, vữa loang ố
  - sàn: gỗ, gạch bông, thảm, bê tông
  - đổ bóng góc (ambient occlusion) ở chân tường và quanh đồ vật
- **Ánh sáng nhân theo từng điểm ảnh**:
  - mỗi nguồn sáng tính sẵn một trường cường độ mượt, không dither hay hạt nhiễu
  - nền sáng đều (ít nhất khoảng 75%); màu `ambient` của từng vụ chỉ tạo sắc thái
  - đèn chập chờn, nhấp nháy, chớp sét khi trời mưa
  - luồng sáng thể tích qua cửa sổ, bụi bay trong vùng sáng
  - lớp phát sáng riêng cho màn hình TV, đèn neon
- **Chi tiết điều tra**: biển đánh số vật chứng như hiện trường thật, dây phong tỏa, vệt kéo lê, dấu chân.

### Hướng nâng cấp đã cân nhắc

- **Ảnh nền AI** (Stable Diffusion / Flux kèm LoRA pixel-art), rồi đặt hotspot lên trên. Đẹp hơn, nhưng mỗi hồ sơ cần ảnh riêng, khó giữ phong cách đồng nhất và khó đổi bố cục khi sửa cốt truyện.
- **Tilemap với Tiled + Phaser**. Hợp khi muốn nhiều phòng nối nhau, nhưng thêm build step và thư viện ngoài.
- **Engine thủ tục hiện tại**. Mỗi hồ sơ chỉ là dữ liệu, nhẹ (không có ảnh) và sửa bố cục tức thì. Đây là lựa chọn phù hợp nhất cho giai đoạn này. Vẫn có thể ghép thêm ảnh nền AI như một lớp `static` sau này.
