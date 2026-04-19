/* ===================================================
   boitinhyeu.net — zodiac.js v1.0
   Bói Tình Yêu 12 Cung Hoàng Đạo
   =================================================== */

'use strict';

/* --------------------------------------------------
   1. DATA: 12 Cung Hoàng Đạo
   -------------------------------------------------- */
const ZODIACS = [
  { id: 'aries',       name: 'Bạch Dương', emoji: '♈', element: 'fire',  symbol: '🐏' },
  { id: 'taurus',      name: 'Kim Ngưu',   emoji: '♉', element: 'earth', symbol: '🐂' },
  { id: 'gemini',      name: 'Song Tử',    emoji: '♊', element: 'air',   symbol: '👯' },
  { id: 'cancer',      name: 'Cự Giải',    emoji: '♋', element: 'water', symbol: '🦀' },
  { id: 'leo',         name: 'Sư Tử',      emoji: '♌', element: 'fire',  symbol: '🦁' },
  { id: 'virgo',       name: 'Xử Nữ',      emoji: '♍', element: 'earth', symbol: '👧' },
  { id: 'libra',       name: 'Thiên Bình', emoji: '♎', element: 'air',   symbol: '⚖️' },
  { id: 'scorpio',     name: 'Bọ Cạp',     emoji: '♏', element: 'water', symbol: '🦂' },
  { id: 'sagittarius', name: 'Nhân Mã',    emoji: '♐', element: 'fire',  symbol: '🏹' },
  { id: 'capricorn',   name: 'Ma Kết',     emoji: '♑', element: 'earth', symbol: '🐐' },
  { id: 'aquarius',    name: 'Bảo Bình',   emoji: '♒', element: 'air',   symbol: '🏺' },
  { id: 'pisces',      name: 'Song Ngư',   emoji: '♓', element: 'water', symbol: '🐟' },
];

/* --------------------------------------------------
   2. ELEMENT COMPATIBILITY MATRIX
   Chỉ số radar: [Giao Tiếp, Cảm Xúc, Lãng Mạn, Gắn Kết]
   -------------------------------------------------- */
const ELEMENT_DATA = {
  'fire-fire':   { scores: [8, 7, 9, 7], label: 'Lửa & Lửa', percent: 78, tagline: '🔥 Bừng cháy đam mê' },
  'fire-earth':  { scores: [6, 6, 7, 8], label: 'Lửa & Đất',  percent: 68, tagline: '⚡ Sức hút mạnh mẽ' },
  'fire-air':    { scores: [9, 7, 9, 7], label: 'Lửa & Khí',  percent: 83, tagline: '🌬️ Ngọn lửa bùng cháy' },
  'fire-water':  { scores: [5, 8, 7, 5], label: 'Lửa & Nước', percent: 62, tagline: '💧 Đối cực hút nhau' },
  'earth-earth': { scores: [7, 6, 7, 9], label: 'Đất & Đất',  percent: 75, tagline: '🌱 Vững chắc bền lâu' },
  'earth-air':   { scores: [7, 5, 7, 6], label: 'Đất & Khí',  percent: 65, tagline: '🌿 Cân bằng thực tế' },
  'earth-water': { scores: [7, 9, 8, 9], label: 'Đất & Nước', percent: 85, tagline: '🌊 Hòa hợp tuyệt vời' },
  'air-air':     { scores: [9, 6, 8, 7], label: 'Khí & Khí',  percent: 77, tagline: '💨 Tâm đầu ý hợp' },
  'air-water':   { scores: [7, 8, 8, 7], label: 'Khí & Nước', percent: 75, tagline: '🌈 Lãng mạn sâu sắc' },
  'water-water': { scores: [7, 9, 8, 9], label: 'Nước & Nước', percent: 82, tagline: '🌊 Thấu cảm sâu xa' },
};

function getElementData(elem1, elem2) {
  const key1 = `${elem1}-${elem2}`;
  const key2 = `${elem2}-${elem1}`;
  return ELEMENT_DATA[key1] || ELEMENT_DATA[key2] || ELEMENT_DATA['fire-fire'];
}

/* --------------------------------------------------
   3. DR.LOVE MESSAGES by element combo
   -------------------------------------------------- */
const DR_LOVE_MSGS = {
  'fire-fire': `<b>Lửa gặp Lửa</b> — Hai ngọn lửa cháy bên nhau tạo ra một nguồn nhiệt khổng lồ đầy đam mê và năng lượng. Cả hai đều sống động, nhiệt huyết và luôn tạo ra những khoảnh khắc đáng nhớ.
<ul>
  <li>Sức hút ban đầu rất mãnh liệt, đầy kịch tính và lãng mạn</li>
  <li>Cả hai đều thích dẫn đầu — cần học cách <b>nhường bước</b> để tránh va chạm ego</li>
  <li>Khi cùng hướng về một mục tiêu, đây là cặp đôi <b>chinh phục mọi thứ</b></li>
</ul>
<b>👉 Lời khuyên Dr.Love:</b> Hãy biến năng lượng cạnh tranh thành động lực cùng nhau phát triển thay vì đối đầu nhau.`,

  'fire-earth': `<b>Lửa gặp Đất</b> — Sự kết hợp của nhiệt huyết bốc đồng và sự kiên định thực tế. Hai người này bổ sung cho nhau những mảnh ghép còn thiếu.
<ul>
  <li>Lửa mang lại <b>cảm hứng và đam mê</b>; Đất mang lại <b>sự ổn định và an toàn</b></li>
  <li>Đôi khi Lửa cảm thấy Đất quá chậm; Đất cảm thấy Lửa quá bốc đồng</li>
  <li>Khi dung hòa được, đây là nền tảng <b>vừa thăng hoa vừa bền vững</b></li>
</ul>
<b>👉 Lời khuyên Dr.Love:</b> Tôn trọng nhịp điệu của nhau — Lửa học kiên nhẫn, Đất học buông bỏ đôi chút để tận hưởng khoảnh khắc hiện tại.`,

  'fire-air': `<b>Lửa gặp Khí</b> — Gió thổi bùng ngọn lửa! Đây là một trong những cặp đôi tương hợp nhất. Cả hai cùng yêu tự do, sáng tạo và không ngại phiêu lưu.
<ul>
  <li>Giao tiếp <b>tự nhiên và thú vị</b> — luôn có chuyện để nói</li>
  <li>Cùng nhau tạo ra những cuộc phiêu lưu <b>đáng nhớ suốt đời</b></li>
  <li>Cần chú ý: đôi lúc thiếu chiều sâu cảm xúc, dễ lướt qua mà không gắn kết thật sự</li>
</ul>
<b>👉 Lời khuyên Dr.Love:</b> Dành thời gian chia sẻ những điều sâu kín trong lòng — không chỉ vui vẻ bề ngoài mà còn kết nối từ tâm hồn.`,

  'fire-water': `<b>Lửa gặp Nước</b> — Sức hút mãnh liệt nhưng cũng dễ dập tắt nhau. Đây là cặp đôi đối cực: một người bùng cháy, một người trầm sâu.
<ul>
  <li>Sự khác biệt tạo ra <b>sức hút không tưởng</b> ở giai đoạn đầu</li>
  <li>Nước có thể dập tắt Lửa nếu cảm xúc quá lấn át; Lửa có thể bốc hơi Nước nếu quá mạnh mẽ</li>
  <li>Cần <b>nỗ lực gấp đôi</b> để thấu hiểu ngôn ngữ tình yêu của nhau</li>
</ul>
<b>👉 Lời khuyên Dr.Love:</b> Học cách lắng nghe thay vì phản ứng — mỗi người đều có nhu cầu cảm xúc khác nhau và cần được trân trọng.`,

  'earth-earth': `<b>Đất gặp Đất</b> — Hai tâm hồn thực tế, đáng tin cậy và chung thủy. Cặp đôi này xây dựng tình yêu như xây nhà — từng viên gạch chắc chắn.
<ul>
  <li>Tin tưởng lẫn nhau tuyệt đối, ít ghen tuông, ít drama</li>
  <li>Nguy cơ: <b>quá ổn định đến nhàm chán</b> — thiếu bất ngờ và lãng mạn</li>
  <li>Khi cùng có mục tiêu chung, đây là cặp đôi <b>thành công nhất</b></li>
</ul>
<b>👉 Lời khuyên Dr.Love:</b> Thêm gia vị bất ngờ — một chuyến du lịch ngẫu hứng, một buổi hẹn hò khác lạ — để tình yêu luôn tươi mới.`,

  'earth-air': `<b>Đất gặp Khí</b> — Thực tế gặp lý tưởng. Hai thế giới quan khác nhau nhưng có thể học hỏi rất nhiều từ nhau.
<ul>
  <li>Khí mang đến <b>ý tưởng mới mẻ</b>; Đất giúp <b>hiện thực hóa những giấc mơ</b></li>
  <li>Đất có thể cảm thấy Khí không đáng tin; Khí cảm thấy Đất quá cứng nhắc</li>
  <li>Cần thỏa hiệp để tìm điểm cân bằng giữa <b>tự do và trách nhiệm</b></li>
</ul>
<b>👉 Lời khuyên Dr.Love:</b> Tôn trọng sự khác biệt thay vì cố thay đổi nhau — chính sự khác biệt đó làm cho mối quan hệ thú vị hơn.`,

  'earth-water': `<b>Đất gặp Nước</b> — Sự kết hợp lý tưởng! Nước nuôi dưỡng Đất và Đất tạo hình cho Nước. Đây là nền tảng của một tình yêu bền lâu.
<ul>
  <li>Đất cho Nước <b>sự ổn định và an toàn</b> cần thiết</li>
  <li>Nước mang lại <b>chiều sâu cảm xúc và sự ấm áp</b> cho Đất</li>
  <li>Hiếm khi xảy ra mâu thuẫn lớn — cả hai đều coi trọng gia đình và cam kết</li>
</ul>
<b>👉 Lời khuyên Dr.Love:</b> Đây là cặp đôi được tạo ra để lâu dài — hãy nuôi dưỡng bằng sự ân cần hàng ngày và đừng bao giờ coi tình yêu là điều hiển nhiên.`,

  'air-air': `<b>Khí gặp Khí</b> — Hai tâm hồn tự do, thông minh và yêu giao tiếp. Không bao giờ thiếu đề tài trò chuyện.
<ul>
  <li>Kết nối trí tuệ <b>sâu sắc và kích thích</b></li>
  <li>Cùng yêu tự do, không ai muốn kiểm soát ai — đây là ưu điểm cũng là thách thức</li>
  <li>Dễ lướt qua bề mặt, <b>cần cố ý tạo chiều sâu cảm xúc</b></li>
</ul>
<b>👉 Lời khuyên Dr.Love:</b> Đừng chỉ nói — hãy cảm nhận. Dành thời gian ở bên nhau trong im lặng, để trái tim thay lời.`,

  'air-water': `<b>Khí gặp Nước</b> — Lý trí gặp cảm xúc. Hai ngôn ngữ tình yêu khác nhau nhưng có thể tạo ra sự hài hòa tuyệt đẹp.
<ul>
  <li>Khí giúp Nước <b>nhìn nhận vấn đề rõ ràng hơn</b></li>
  <li>Nước giúp Khí <b>kết nối với cảm xúc sâu hơn</b></li>
  <li>Cần kiên nhẫn để thấu hiểu nhau — một người nghĩ bằng đầu, một người nghĩ bằng tim</li>
</ul>
<b>👉 Lời khuyên Dr.Love:</b> Học ngôn ngữ tình yêu của đối phương — đôi khi chỉ cần một cái ôm ấm áp (cho Nước) hay một cuộc trò chuyện sâu (cho Khí) là đủ.`,

  'water-water': `<b>Nước gặp Nước</b> — Hai tâm hồn nhạy cảm, đồng cảm và yêu thương sâu sắc. Sự kết nối cảm xúc đạt đến mức độ hiếm có.
<ul>
  <li>Thấu hiểu nhau mà <b>không cần nói nhiều</b> — gần như đọc được suy nghĩ</li>
  <li>Nguy cơ: cả hai đều nhạy cảm, dễ tổn thương lẫn nhau nếu không cẩn thận</li>
  <li>Khi yêu nhau, sẽ yêu <b>trọn vẹn và tuyệt đối</b></li>
</ul>
<b>👉 Lời khuyên Dr.Love:</b> Hãy tạo không gian cho nhau — đôi khi cả hai cùng cần thời gian một mình để nạp lại năng lượng cảm xúc trước khi đến với nhau.`,
};

function getDrLoveMsg(elem1, elem2) {
  const key1 = `${elem1}-${elem2}`;
  const key2 = `${elem2}-${elem1}`;
  return DR_LOVE_MSGS[key1] || DR_LOVE_MSGS[key2] || DR_LOVE_MSGS['fire-fire'];
}

/* --------------------------------------------------
   4. BUILD ZODIAC GRID
   -------------------------------------------------- */
function buildZodiacGrid(containerId, groupName) {
  const container = document.getElementById(containerId);
  if (!container) return;
  ZODIACS.forEach(z => {
    const btn = document.createElement('button');
    btn.className = 'zodiac-btn';
    btn.dataset.id      = z.id;
    btn.dataset.element = z.element;
    btn.dataset.name    = z.name;
    btn.dataset.emoji   = z.emoji;
    btn.dataset.group   = groupName;
    btn.innerHTML = `<span class="z-emoji">${z.emoji}</span><span class="z-name">${z.name}</span>`;
    btn.addEventListener('click', () => selectZodiac(btn, groupName));
    container.appendChild(btn);
  });
}

/* --------------------------------------------------
   5. SELECTION LOGIC
   -------------------------------------------------- */
const selected = { him: null, her: null };

function selectZodiac(btn, group) {
  const gridId = group === 'him' ? 'gridHim' : 'gridHer';
  document.querySelectorAll(`#${gridId} .zodiac-btn`).forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selected[group] = {
    id:      btn.dataset.id,
    element: btn.dataset.element,
    name:    btn.dataset.name,
    emoji:   btn.dataset.emoji,
  };
}

/* --------------------------------------------------
   6. CHART.JS RADAR CHART
   -------------------------------------------------- */
let radarChart = null;

function drawRadar(scores) {
  const ctx = document.getElementById('radarChart').getContext('2d');
  if (radarChart) { radarChart.destroy(); radarChart = null; }

  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Giao Tiếp', 'Cảm Xúc', 'Lãng Mạn', 'Gắn Kết'],
      datasets: [{
        label: 'Độ tương hợp',
        data: scores,
        backgroundColor: 'rgba(255, 143, 171, 0.25)',
        borderColor: 'rgba(224, 87, 128, 0.85)',
        borderWidth: 2.5,
        pointBackgroundColor: '#e05780',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.raw}/10`
          }
        }
      },
      scales: {
        r: {
          min: 0,
          max: 10,
          ticks: {
            stepSize: 2,
            color: 'rgba(122, 62, 90, 0.5)',
            font: { size: 10, family: 'Quicksand' },
            backdropColor: 'transparent',
          },
          grid: {
            color: 'rgba(255, 143, 171, 0.25)',
          },
          angleLines: {
            color: 'rgba(255, 143, 171, 0.35)',
          },
          pointLabels: {
            color: '#7a3e5a',
            font: { size: 12, family: 'Quicksand', weight: '700' },
          }
        }
      }
    }
  });
}

/* --------------------------------------------------
   7. COUNT-UP ANIMATION
   -------------------------------------------------- */
function animateCount(el, target, duration = 1800) {
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

/* --------------------------------------------------
   8. MAIN CALCULATE FUNCTION
   -------------------------------------------------- */
function calculate() {
  if (!selected.him || !selected.her) {
    if (!selected.him) shakeGroup('gridHim');
    if (!selected.her) shakeGroup('gridHer');
    return;
  }

  const him  = selected.him;
  const her  = selected.her;
  const data = getElementData(him.element, her.element);
  const msg  = getDrLoveMsg(him.element, her.element);

  // Pair names
  document.getElementById('pairHim').textContent = `${him.emoji} ${him.name}`;
  document.getElementById('pairHer').textContent = `${her.emoji} ${her.name}`;

  // Score
  const scoreEl = document.getElementById('scoreNumber');
  scoreEl.textContent = '0';
  animateCount(scoreEl, data.percent);

  // Element tag
  document.getElementById('elementTag').textContent = `${data.tagline} · ${data.label}`;

  // Dr.Love message
  document.getElementById('drLoveText').innerHTML = msg;

  // Show result
  const section = document.getElementById('resultSection');
  section.classList.add('visible');
  setTimeout(() => {
    drawRadar(data.scores);
    section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 300);
}

function shakeGroup(gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.style.outline = '2px solid rgba(224,87,128,0.5)';
  grid.style.borderRadius = '12px';
  let left = -4, count = 0;
  const sh = setInterval(() => {
    grid.style.transform = `translateX(${left}px)`;
    left = -left; count++;
    if (count > 6) {
      clearInterval(sh);
      grid.style.transform = '';
      grid.style.outline = '';
    }
  }, 60);
}

/* --------------------------------------------------
   9. INIT
   -------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  buildZodiacGrid('gridHim', 'him');
  buildZodiacGrid('gridHer', 'her');

  document.getElementById('calcBtn').addEventListener('click', calculate);

  // Scroll top
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 300);
  });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Floating hearts
  function createFloatingHeart() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;
    const hearts = ['💗','💕','💖','💓','🌸','✨','🌷','⭐','♈','♌','♎'];
    const el = document.createElement('span');
    el.className = 'fh';
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    el.style.left              = Math.random() * 100 + '%';
    el.style.fontSize          = (0.6 + Math.random() * 0.7) + 'rem';
    el.style.animationDuration = (9 + Math.random() * 10) + 's';
    el.style.animationDelay   = (Math.random() * 4) + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), 25000);
  }

  setInterval(createFloatingHeart, 3000);
  for (let i = 0; i < 4; i++) setTimeout(createFloatingHeart, i * 600);
});
