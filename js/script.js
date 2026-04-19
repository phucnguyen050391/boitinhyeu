/* ===================================================
   boitinhyeu.net — script.js v3.0
   Liquid Heart: CSS rotate-blob technique (no edge leak)
   =================================================== */

'use strict';

/* --------------------------------------------------
   1. HASH — Deterministic (DJB2), không Math.random()
   -------------------------------------------------- */
function hashString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function calcLovePercent(name1, name2) {
  const a = name1.trim().toLowerCase().replace(/\s+/g, '');
  const b = name2.trim().toLowerCase().replace(/\s+/g, '');
  const combined = [a, b].sort().join('\u2661');
  return 50 + (hashString(combined) % 50); // 50–99
}

/* --------------------------------------------------
   2. MESSAGES
   -------------------------------------------------- */
const MESSAGES = [
  {
    min: 40, max: 59,
    emoji: '🌱',
    msg: `Theo phân tích của <b>Dr.Love</b>, mối quan hệ này có sự thu hút ban đầu, nhưng nền tảng cảm xúc vẫn còn khá mỏng manh.

Hai bạn dễ bị ấn tượng bởi một vài điểm tốt của nhau, tuy nhiên sự khác biệt trong cách suy nghĩ, giao tiếp hoặc kỳ vọng có thể khiến cả hai cảm thấy “chưa thật sự được thấu hiểu”.

Ở giai đoạn này, mối quan hệ dễ rơi vào trạng thái:
<ul><li>Có cảm xúc nhưng chưa đủ tin tưởng</li><li>Dễ vui, nhưng cũng dễ buồn vì hiểu lầm</li><li>Muốn tiến xa, nhưng còn thiếu sự kiên nhẫn</li></ul>

👉 <b>Lời khuyên từ Dr.Love:</b>
<ul><li>Học cách lắng nghe nhiều hơn là phản ứng</li><li>Đừng vội so sánh hay đòi hỏi đối phương phải thay đổi ngay</li><li>Tập trung học tập, làm việc và phát triển giá trị cá nhân để tạo nền tảng vững vàng cho tình yêu</li></ul>

Tình yêu lúc này giống như một mầm cây non — khi bạn càng trưởng thành, mối quan hệ mới có cơ hội lớn lên.

<a href="boi-tinh-yeu-12-cung-hoang-dao.html" class="btn-cta-love">🔮 Xem Độ Hợp Nhau 12 Cung Hoàng Đạo ➔</a>`
  },
  {
    min: 60, max: 69,
    emoji: '🔥',
    msg: `Theo phân tích của <b>Dr.Love</b>, giữa hai bạn có một ngọn lửa cảm xúc thực sự — sự cuốn hút lẫn nhau rất rõ ràng. Tuy nhiên, điểm mấu chốt cần chú ý: <b>cái tôi của cả hai đều khá lớn</b>.

Những mâu thuẫn phần lớn không đến từ sự thiếu yêu thương, mà đến từ việc ai cũng muốn được “đúng” và được “nghe” nhiều hơn. Kết quả là:
<ul><li>Dễ xảy ra tranh luận dù điều đó không quá quan trọng</li><li>Cả hai hay khắc khẩu dù đều muốn điều tốt cho nhau</li><li>Dễ gọi là “xựng” nhưng cũng dễ gai góc khi mệt mỏi</li></ul>

👉 <b>Lời khuyên từ Dr.Love:</b>
<ul><li>Thực hành “nhường một bước” — không phải thua, mà là đang chọn yêu thương</li><li>Khi tranh cãi, hãy hỏi “Mình đang bảo vệ cái tôi hay bảo vệ mối quan hệ?”</li><li>Hạ cái tôi xuống một chút, nhưng giữ phẩm giá cá nhân lại — đó mới là nghệ thuật yêu thật sự</li></ul>

Khi cả hai cùng sẵn sàng chọn mối quan hệ hơn là chọn cái tôi, ngọn lửa này sẽ đủ mạnh để sưởi ấm cả cuộc đời.

<a href="boi-tinh-yeu-12-cung-hoang-dao.html" class="btn-cta-love">🔮 Xem Độ Hợp Nhau 12 Cung Hoàng Đạo ➔</a>`
  },
  {
    min: 70, max: 79,
    emoji: '🧋',
    msg: `Theo phân tích của <b>Dr.Love</b>, đây là một cặp đôi khá ăn ý! Hai bạn có nhiều điểm chung — từ sở thích, cách nhìn nhận cuộc sống cho đến nhịp điệu sinh hoạt. Mức độ thấu hiểu nhau ở mức tốt, đủ để cảm thấy thoải mái khi bên nhau.

Nhưng Dr.Love nhận ra một điểm cần cải thiện:
<ul><li>Có lúc hơi vô tâm với những chi tiết nhỏ nhưng quan trọng với đối phương</li><li>Dễ rơi vào sự ổn định quá mức và quên mất gia vị lãng mạn</li><li>Tình yêu có nguy cơ trở nên bình thường như hơi thở — có đó nhưng không ai để ý</li></ul>

👉 <b>Lời khuyên từ Dr.Love:</b>
<ul><li>Thỉnh thoảng tạo bất ngờ nhỏ: một bó hoa, một lời nhắn đúnh lúc, một buổi hẹn không cần lý do</li><li>Chú ý lắng nghe những điều đối phương nói đến nhiều lần — đó là điều họ thực sự cần</li><li>Giữ lại sự tò mò về đối phương như hồi mới quen</li></ul>

Mối quan hệ này giống ly trà sữa ngon — chỉ cần thêm ít gia vị lãng mạn bất ngờ là sẽ trở nên đáng nhớ mãi mãi.

<a href="boi-tinh-yeu-12-cung-hoang-dao.html" class="btn-cta-love">🔮 Xem Độ Hợp Nhau 12 Cung Hoàng Đạo ➔</a>`
  },
  {
    min: 80, max: 89,
    emoji: '💖',
    msg: `Theo phân tích của <b>Dr.Love</b>, mức độ tương hợp giữa hai bạn ở mức rất cao. Đây là kiểu kết nối mà nhiều người ước ao — hai cá nhân tôn trọng nhau, có thể thấy được cả những khuyết điểm của nhau mà vẫn chọn ở lại.

Những điểm nổi bật của cặp đôi này:
<ul><li>Không cần đối phương phải đời hỏi hoàn hảo — chấp nhận nhau như vốn có</li><li>Có khả năng hòa giải sau mâu thuẫn và rút ra bài học</li><li>Hai người cùng phát triển, không ai kéo tụt ai</li></ul>

👉 <b>Lời khuyên từ Dr.Love:</b>
<ul><li>Duy trì thói quen giao tiếp thật sự: nói thẳng điều mình cần thay vì chờ đối phương đoán</li><li>Dành thời gian riêng cho nhau đều đặn, dù cuộc sống bận rộn đến đâu</li><li>Ghi nhớ và trân trọng những kỷ niệm để cảm giác gắn kết không phai mờ</li></ul>

Đây là nền móng của một tình yêu bền vững. Hãy trân trọng và tiếp tục vún xới mỗi ngày.

<a href="boi-tinh-yeu-12-cung-hoang-dao.html" class="btn-cta-love">🔮 Xem Độ Hợp Nhau 12 Cung Hoàng Đạo ➔</a>`
  },
  {
    min: 90, max: 99,
    emoji: '💍',
    msg: `Theo phân tích của <b>Dr.Love</b>, đây không đơn thuần là có duyên — đây là <b>chân ái đích thực (Soulmate)</b>. Hai tâm hồn này như được viết tên cho nhau từ trước.

Dấu hiệu nhận biết một cặp Soulmate:
<ul><li>Thần giao cách cảm — hiểu ý nhau không cần nói nhiều</li><li>Mọi sóng gió đi qua đều làm tình yêu thêm bền chặt, không làm xa cách</li><li>Khi ở bên nhau, cả hai đều cảm thấy “về nhà”</li></ul>

👉 <b>Lời khuyên từ Dr.Love:</b>
<ul><li>Đừng để sự bực bội nhỏ nhặt trong cuộc sống làm mờ đi những gì thật sự quý giá</li><li>Hãy dám nói ra: <em>“Anh/em muốn cùng em/anh xây dựng một tương lai”</em></li><li>Sớm tiến tới cam kết lâu dài — tình yêu đẹp như thế này xứng đáng được bảo vệ bằng một cam kết thật sự</li></ul>

Vũ trụ đã sắp xếp sẵn rồi. Việc của hai bạn chỉ là đủ dũng cảm để nắm lấy nhau.

<a href="boi-tinh-yeu-12-cung-hoang-dao.html" class="btn-cta-love">🔮 Xem Độ Hợp Nhau 12 Cung Hoàng Đạo ➔</a>`
  },
];

function getMessage(percent) {
  return MESSAGES.find(m => percent >= m.min && percent <= m.max) || MESSAGES[MESSAGES.length - 1];
}

/* --------------------------------------------------
   3. BUILD LIQUID HEART — CSS rotate-blob technique
   --------------------------------------------------
   Kiến trúc 3 lớp:
   • #heartWaterLayer → nước + sóng (bị clip-path)
   • .heart-border-svg → viền SVG sắc nét (không bị clip)
   • #heartPctText     → số % đè giữa
   -------------------------------------------------- */
function buildLiquidHeart() {
  // Inject nước + sóng vào #heartWaterLayer (lớp 1, bị clip)
  // Viền và số % đã có sẵn trong HTML (lớp 2 + 3)
  const waterLayer = document.getElementById('heartWaterLayer');
  if (!waterLayer) return;
  waterLayer.innerHTML = `
    <div id="waterFill">
      <div id="waveBlob"></div>
      <div id="waveBlob2"></div>
      <div id="shimmerLayer"></div>
    </div>
  `;
}

/* Cập nhật mực nước — chỉ thay đổi top của waterFill */
function setWaterLevel(percent) {
  const waterFill = document.getElementById('waterFill');
  if (!waterFill) return;
  // top = 100% → trống, top = 0% → đầy
  // Dùng biến CSS để transition mượt
  const topVal = (100 - percent) + '%';
  waterFill.style.top = topVal;
}

/* --------------------------------------------------
   4. DOM REFS
   -------------------------------------------------- */
const nameAInput      = document.getElementById('nameA');
const nameBInput      = document.getElementById('nameB');
const calcBtn         = document.getElementById('calcBtn');
const heartIconEl     = document.getElementById('heartIcon');
const resultCard      = document.getElementById('resultCard');
const resultNamesEl   = document.getElementById('resultNames');
const resultMessageEl = document.getElementById('resultMessage');
const resultEmojiEl   = document.getElementById('resultEmoji');
const scrollTopBtn    = document.getElementById('scrollTop');
const liquidHeartWrap = document.querySelector('.liquid-heart-wrap');

/* --------------------------------------------------
   5. INIT HEART ON LOAD
   -------------------------------------------------- */
buildLiquidHeart();  // inject nước vào #heartWaterLayer
setWaterLevel(0);    // mực nước = 0 sẵn từ đầu

/* --------------------------------------------------
   6. ANIMATION ENGINE
   -------------------------------------------------- */
let isCalculating = false;
let animRaf = null;

function startCalculation() {
  if (isCalculating) return;

  const nameA = nameAInput.value.trim();
  const nameB = nameBInput.value.trim();

  if (!nameA || !nameB) {
    shakeInput(!nameA ? nameAInput : nameBInput);
    return;
  }

  isCalculating = true;
  calcBtn.disabled = true;
  calcBtn.textContent = '💭 Đang bói...';

  // Hủy RAF cũ nếu bấm liên tiếp
  if (animRaf) { cancelAnimationFrame(animRaf); animRaf = null; }

  heartIconEl.classList.add('beating');
  liquidHeartWrap.classList.remove('glow-pulse');

  const finalPercent = calcLovePercent(nameA, nameB);
  const messageData  = getMessage(finalPercent);

  // Bước 1: chuẩn bị nội dung, reset về 0
  resultNamesEl.innerHTML     = `<strong>${escapeHtml(nameA)}</strong> 💕 <strong>${escapeHtml(nameB)}</strong>`;
  resultMessageEl.innerHTML  = '';
  resultEmojiEl.textContent   = '';
  setWaterLevel(0);
  const pctEl = document.getElementById('heartPctText');
  if (pctEl) pctEl.textContent = '0%';

  // Bước 2: Ẩn trước (opacity:0) để reset, sau đó hiện lên
  resultCard.classList.remove('visible');

  // Bước 3: double-rAF — đợi đúng 2 frame để browser:
  //   frame 1: flush DOM (remove .visible được commit)
  //   frame 2: add .visible → trái tim fade in
  //   frame 3: bắt đầu đếm số (tim đã hiện ra rồi)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {

      // Hiện card (tim xuất hiện ngay, số và nước bắt đầu từ 0)
      resultCard.classList.add('visible');

      // Bước 4: sau 1 frame nữa (trái tim đã paint xong) mới chạy count
      requestAnimationFrame(() => {
        runCountAnimation(finalPercent, messageData, nameA, nameB);
      });

    });
  });
}

/* Tách riêng hàm đếm — chạy sau khi tim đã hiện */
function runCountAnimation(finalPercent, messageData, nameA, nameB) {
  const totalDuration = 3000;
  let startTime = null;

  function animate(ts) {
    if (!startTime) startTime = ts;
    const elapsed  = ts - startTime;
    const progress = Math.min(elapsed / totalDuration, 1);

    // Ease-in-out quad
    const eased = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    // Luôn tăng dần từ 1 → finalPercent
    const current = Math.round(1 + eased * (finalPercent - 1));

    const pctEl = document.getElementById('heartPctText');
    if (pctEl) pctEl.textContent = current + '%';
    setWaterLevel(current); // đồng bộ hoàn toàn

    if (progress >= 1) {
      if (pctEl) pctEl.textContent = finalPercent + '%';
      setWaterLevel(finalPercent);
      finishCalculation(nameA, nameB, finalPercent, messageData);
      return;
    }

    animRaf = requestAnimationFrame(animate);
  }

  animRaf = requestAnimationFrame(animate);
}

function finishCalculation(nameA, nameB, percent, messageData) {
  heartIconEl.classList.remove('beating');
  liquidHeartWrap.classList.add('glow-pulse');

  resultMessageEl.innerHTML = messageData.msg;   // HTML content từ Dr.Love
  resultEmojiEl.textContent = messageData.emoji;

  setTimeout(() => {
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 200);

  calcBtn.disabled = false;
  calcBtn.textContent = '💖 Xem Độ Hợp Nhau';
  isCalculating = false;
}

/* --------------------------------------------------
   7. HELPERS
   -------------------------------------------------- */
function shakeInput(el) {
  el.style.borderColor = '#e05780';
  el.style.boxShadow   = '0 0 0 4px rgba(224,87,128,0.25)';
  let left = -6, dir = 1, count = 0;
  const sh = setInterval(() => {
    el.style.transform = `translateX(${left}px)`;
    left = -(left + dir * 3); dir *= -1; count++;
    if (count > 6) {
      clearInterval(sh);
      el.style.transform = '';
      el.style.borderColor = '';
      el.style.boxShadow = '';
    }
  }, 60);
  el.focus();
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* --------------------------------------------------
   8. EVENT LISTENERS
   -------------------------------------------------- */
calcBtn.addEventListener('click', startCalculation);

[nameAInput, nameBInput].forEach(input => {
  input.addEventListener('keydown', e => { if (e.key === 'Enter') startCalculation(); });
  input.addEventListener('input', () => {
    input.style.borderColor = '';
    input.style.boxShadow   = '';
  });
});

/* --------------------------------------------------
   9. SCROLL TOP
   -------------------------------------------------- */
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('show', window.scrollY > 300);
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* --------------------------------------------------
   10. FLOATING HEARTS
   -------------------------------------------------- */
function createFloatingHeart() {
  const container = document.querySelector('.floating-hearts');
  if (!container) return;
  const hearts = ['💗', '💕', '💖', '💓', '🌸', '✨', '🌷'];
  const el = document.createElement('span');
  el.className = 'fh';
  el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  el.style.left              = Math.random() * 100 + '%';
  el.style.fontSize          = (0.7 + Math.random() * 0.8) + 'rem';
  el.style.animationDuration = (9 + Math.random() * 10) + 's';
  el.style.animationDelay    = (Math.random() * 4) + 's';
  container.appendChild(el);
  setTimeout(() => el.remove(), 25000);
}

setInterval(createFloatingHeart, 2800);
for (let i = 0; i < 5; i++) setTimeout(createFloatingHeart, i * 500);
