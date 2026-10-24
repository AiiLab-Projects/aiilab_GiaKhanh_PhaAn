# Hồ Sơ 13 — Phá Án

Trò chơi trinh thám pixel chạy hoàn toàn trên trình duyệt: chọn hồ sơ, khám nghiệm hiện trường, thẩm vấn nghi phạm, ghép manh mối thành suy luận rồi chỉ ra hung thủ.

## Chạy thử

Không cần build. Mở `index.html` bằng một máy chủ tĩnh bất kỳ (khuyến nghị, để font và `localStorage` hoạt động ổn định):

```bash
npx serve .            # hoặc
python -m http.server 8000
```

Mở trực tiếp bằng `file://` vẫn chạy được.

## Năm hồ sơ

| # | Hồ sơ | Bối cảnh | Độ khó |
|---|-------|----------|--------|
| 01 | Căn phòng 204 | Nhà nghỉ ven ga, đêm mưa, cửa khóa trái | ●○○ |
| 02 | Đêm cuối tại Vạn Hoa | Sảnh dạ tiệc khách sạn, sân khấu, ly rượu | ●●○ |
| 03 | Giờ chết của Kim Thời | Tiệm đồng hồ, mọi chiếc đồng hồ dừng 22:15 | ●●○ |
| 04 | Chuyến tàu đêm SE7 | Khoang giường nằm, cửa sổ hé giữa cơn mưa | ●●● |
| 05 | Bản bông cuối cùng | Phòng biên tập báo, tủ hồ sơ đổ | ●●● |

## Cách chơi

1. **Khám hiện trường bằng bộ đồ pháp y**: chọn dụng cụ ở thanh dưới ảnh (phím `1`–`4`): 👁 Quan sát, 🔍 Kính lúp (phóng to chữ nhỏ, vết xước), 🟣 Đèn UV (tắt đèn, soi dấu vết mắt thường không thấy), 🖌 Bột vân tay (rắc lên bề mặt để hiện dấu tay). Mỗi vật chứng chỉ lộ ra với đúng dụng cụ; số trên từng nút cho biết còn bao nhiêu dấu vết cần tìm. Thấy dấu vết thì bấm **📷 Chụp ảnh & đặt biển số** để thu vào túi; biển số vàng đánh theo thứ tự thu được. Vòng gợi ý nét đứt tắt được. Hồ sơ không có ảnh sẽ dùng cảnh pixel: đi lại bằng WASD hoặc bấm sàn, bấm `E` để kiểm tra.
2. **Thẩm vấn** (kiểu visual novel): chọn nghi phạm ở cột trái, hỏi ngoại phạm / quan hệ, hoặc bấm một thẻ trong **túi chứng cứ** ở đáy màn hình để đưa ra. Đưa đúng thứ, nghi phạm sẽ lộ thêm lời khai mới.
3. **Suy luận**: đặt hai thẻ vào phương trình `[manh mối] + [manh mối] = ?`. Các suy luận chưa mở hiện dạng "???".
4. **Buộc tội**: chọn hung thủ trong hàng nhận diện, rồi chọn tối đa 3 thẻ trong túi làm chứng cứ. chỉ ra hung thủ và tối đa ba chứng cứ. Điểm = đúng hung thủ (40) + chứng cứ đúng (10 mỗi cái) + tỉ lệ suy luận (20) + tỉ lệ manh mối (10) − 10 mỗi lần nộp sai. Xếp hạng S ≥ 90, A ≥ 75, B ≥ 60, còn lại C.

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
js/engine/art.js      SceneArt: hiện trường từ ảnh minh hoạ, vùng bấm, ảnh cận cảnh
img/scenes/*.jpg      ảnh hiện trường (Gemini)
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

Quy ước: mỗi manh mối `vat` cần một `hotspot` cùng `id`; mỗi lời khai `loi` phải được mở khóa bởi `unlock` ở một nghi phạm nào đó; hồ sơ phải giải được từ những gì người chơi thu thập.

- Toạ độ: `X` tính từ tường trái, `z` tính từ tường sau, `h` là độ cao.
- Đồ vật trên tường dùng `X` và `h`; đồ vật trên sàn dùng `X`, `z` và kích thước `w`/`d`.
- Danh sách đạo cụ và tham số xem trong `js/engine/props.js`.

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
