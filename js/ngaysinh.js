/**
 * ngaysinh.js – Bói Tình Yêu Theo Ngày Sinh
 * Thần Số Học: Life Path Number + Compatibility
 * Phiên bản: Tối ưu Nội Dung Chuyên Sâu & Cảm Xúc
 */

// ── 1. Dữ liệu Thần Số Học Chuyên Sâu ─────────────────────────────────────

const NUM_TRAITS = {
  1: { name: "Thủ Lĩnh Đam Mê", trait: "độc lập, mạnh mẽ và luôn muốn che chở" },
  2: { name: "Sứ Giả Cảm Xúc", trait: "dịu dàng, tinh tế và khao khát sự thấu hiểu" },
  3: { name: "Nghệ Sĩ Hào Hoa", trait: "sáng tạo, rực rỡ và đầy những bất ngờ lãng mạn" },
  4: { name: "Điểm Tựa Vững Chắc", trait: "thực tế, chung thủy và mang lại cảm giác an toàn tuyệt đối" },
  5: { name: "Cơn Gió Tự Do", trait: "phóng khoáng, phiêu lưu và ghét sự gò bó" },
  6: { name: "Trái Tim Gia Đình", trait: "ấm áp, chu đáo và luôn đặt người mình yêu lên trên hết" },
  7: { name: "Triết Gia Bí Ẩn", trait: "sâu sắc, nội tâm và cần một sự kết nối tâm hồn thật sự" },
  8: { name: "Bậc Thầy Quyến Rũ", trait: "quyết đoán, thực tế và yêu bằng một cường độ mãnh liệt" },
  9: { name: "Linh Hồn Cao Thượng", trait: "vị tha, lãng mạn vô điều kiện và luôn bao dung" },
  11: { name: "Trực Giác Tâm Linh", trait: "nhạy cảm bậc nhất, có khả năng đọc thấu trái tim đối phương" },
  22: { name: "Kiến Trúc Sư Tình Yêu", trait: "kiên định, vĩ đại và muốn xây dựng một bến đỗ trọn đời" },
  33: { name: "Ngọn Lửa Chữa Lành", trait: "mang năng lượng chữa lành, sẵn sàng hy sinh vì tình yêu" }
};

// Ma trận % hòa hợp (giữ nguyên logic gốc)
const COMPATIBILITY = {
  "1-1": 72, "1-2": 68, "1-3": 85, "1-4": 58, "1-5": 90, "1-6": 62, "1-7": 70, "1-8": 75, "1-9": 65,
  "2-2": 82, "2-3": 74, "2-4": 78, "2-5": 55, "2-6": 92, "2-7": 60, "2-8": 64, "2-9": 80,
  "3-3": 76, "3-4": 60, "3-5": 82, "3-6": 70, "3-7": 65, "3-8": 62, "3-9": 88,
  "4-4": 80, "4-5": 52, "4-6": 86, "4-7": 68, "4-8": 90, "4-9": 58,
  "5-5": 70, "5-6": 56, "5-7": 78, "5-8": 66, "5-9": 74,
  "6-6": 88, "6-7": 62, "6-8": 70, "6-9": 85,
  "7-7": 84, "7-8": 58, "7-9": 72,
  "8-8": 78, "8-9": 62,
  "9-9": 90
};

// Các tầng kết quả với câu Quote cực "deep"
const RESULT_TIERS = [
  { 
    min: 85, 
    emoji: "💘", 
    title: "Định Mệnh Giao Thoa", 
    note: "💡 <strong>Vũ trụ nhắn nhủ:</strong> Giữa hàng tỷ người, hai dải tần số này sinh ra là để cộng hưởng cùng nhau. Đây là một mối duyên tiền định hiếm có, hãy nắm tay nhau thật chặt!" 
  },
  { 
    min: 70, 
    emoji: "💞", 
    title: "Nhịp Đập Đồng Điệu", 
    note: "💡 <strong>Vũ trụ nhắn nhủ:</strong> Tình yêu này như một bản nhạc hòa âm tuyệt vời. Đôi khi có những nốt thăng trầm, nhưng chính điều đó làm cho tình cảm của hai bạn ngày càng sâu sắc." 
  },
  { 
    min: 55, 
    emoji: "✨", 
    title: "Mảnh Ghép Thú Vị", 
    note: "💡 <strong>Vũ trụ nhắn nhủ:</strong> Hai bạn là hai màu sắc khác biệt nhưng lại hút nhau mãnh liệt. Sự kiên nhẫn và thấu hiểu sẽ là phép màu biến sự khác biệt thành chất keo gắn kết." 
  },
  { 
    min: 0, 
    emoji: "🌱", 
    title: "Bài Học Của Linh Hồn", 
    note: "💡 <strong>Vũ trụ nhắn nhủ:</strong> Hai linh hồn gặp nhau ở đây để dạy cho nhau những bài học lớn về sự trưởng thành. Yêu thương sự không hoàn hảo của đối phương chính là chìa khóa mở cửa hạnh phúc." 
  }
];

// ── 2. Hàm Tiện Ích ──────────────────────────────────────────────────────

function populateSelect(id, from, to, placeholder) {
  const el = document.getElementById(id);
  if (!el) return;
  let html = `<option value="" disabled selected>${placeholder}</option>`;
  for (let i = from; i <= to; i++) {
    const val = i < 10 ? "0" + i : i;
    html += `<option value="${i}">${val}</option>`;
  }
  el.innerHTML = html;
}

function reduceToLifePath(n) {
  if ([11, 22, 33].includes(n)) return n;
  while (n > 9) {
    n = String(n).split("").reduce((sum, d) => sum + parseInt(d), 0);
    if ([11, 22, 33].includes(n)) return n;
  }
  return n;
}

function calcLifePath(day, month, year) {
  const sum = (num) => String(num).split("").reduce((s, d) => s + parseInt(d), 0);
  let total = sum(day) + sum(month) + sum(year);
  return reduceToLifePath(total);
}

// ── 3. Thuật toán sinh nội dung thông điệp động (Dynamic Content) ────────

function generateDynamicMessage(lpA, lpB) {
  const traitA = NUM_TRAITS[lpA].trait;
  const traitB = NUM_TRAITS[lpB].trait;
  
  if (lpA === lpB) {
    return `Sự kết hợp của hai con số ${lpA} tạo ra một tấm gương phản chiếu tâm hồn hoàn hảo. Cả hai đều <b>${traitA}</b>. Các bạn thấu hiểu nhau mà không cần dùng lời nói, nhưng cũng cần cẩn thận đừng để cái tôi quá lớn vô tình làm tổn thương chính hình ảnh của mình trong mắt người kia.`;
  } else {
    return `Khi năng lượng <b>${traitA}</b> của chàng (Số ${lpA}) giao hòa cùng nét <b>${traitB}</b> của nàng (Số ${lpB}), một phản ứng hóa học tuyệt vời sẽ xảy ra. Sự bù trừ này giúp hai bạn lấp đầy những khoảng trống của nhau, tạo nên một câu chuyện tình yêu đầy những trải nghiệm đan xen giữa bất ngờ và an toàn.`;
  }
}

// ── 4. Xử lý Hiệu Ứng & Kết Quả ───────────────────────────────────────────

function animateRing(pct) {
  const circle = document.getElementById("ringFill");
  const pctText = document.getElementById("ringPct");
  if (!circle || !pctText) return;

  const circumference = 2 * Math.PI * 64; 
  circle.style.strokeDashoffset = circumference;
  
  let start = null;
  const duration = 1200;

  function step(ts) {
    if (!start) start = ts;
    const elapsed = ts - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); 

    const currentPct = Math.round(eased * pct);
    circle.style.strokeDashoffset = circumference * (1 - (eased * pct) / 100);
    pctText.textContent = currentPct + "%";

    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function handleCalc() {
  const getData = (id) => parseInt(document.getElementById(id).value);
  const vals = [getData("dayA"), getData("monthA"), getData("yearA"), getData("dayB"), getData("monthB"), getData("yearB")];

  if (vals.some(isNaN)) {
    alert("💕 Lắng nghe tiếng gọi vũ trụ: Bạn cần chọn đầy đủ ngày, tháng, năm sinh của cả hai nhé!");
    return;
  }

  const card = document.getElementById("resultCard");
  const loader = document.getElementById("infinityLoader");
  const btn = document.getElementById("calcBtn");

  card.classList.remove("show", "visible"); 
  btn.style.display = "none";
  loader.classList.add("show");

  setTimeout(() => {
    const lpA = calcLifePath(vals[0], vals[1], vals[2]);
    const lpB = calcLifePath(vals[3], vals[4], vals[5]);
    
    const normalize = n => [11, 22, 33].includes(n) ? (n === 11 ? 2 : n === 22 ? 4 : 6) : n;
    const na = normalize(lpA), nb = normalize(lpB);
    const pct = COMPATIBILITY[na <= nb ? `${na}-${nb}` : `${nb}-${na}`] || 65;

    // Hiển thị Tên Con Số (Romantic Mode)
    document.getElementById("lifeNumA").textContent = lpA;
    document.getElementById("lifeNameA").textContent = NUM_TRAITS[lpA].name;
    document.getElementById("lifeNumB").textContent = lpB;
    document.getElementById("lifeNameB").textContent = NUM_TRAITS[lpB].name;

    // Sinh nội dung thông điệp
    const tier = RESULT_TIERS.find(t => pct >= t.min);
    document.getElementById("resultEmoji").textContent = tier.emoji;
    document.getElementById("resultTitle").textContent = tier.title;
    
    // Gắn đoạn văn động vào kết quả
    document.getElementById("resultMessage").innerHTML = generateDynamicMessage(lpA, lpB);
    document.getElementById("drLoveNote").innerHTML = tier.note;

    loader.classList.remove("show");
    btn.style.display = "inline-flex";
    card.classList.add("show", "visible");
    
    animateRing(pct);
    card.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 1800);
}

// ── 5. Khởi tạo ──────────────────────────────────────────────────────────

function init() {
  const currentYear = new Date().getFullYear();
  populateSelect("dayA", 1, 31, "Ngày");
  populateSelect("monthA", 1, 12, "Tháng");
  populateSelect("yearA", 1950, currentYear, "Năm");
  populateSelect("dayB", 1, 31, "Ngày");
  populateSelect("monthB", 1, 12, "Tháng");
  populateSelect("yearB", 1950, currentYear, "Năm");

  document.getElementById("calcBtn")?.addEventListener("click", handleCalc);

  const scrollBtn = document.getElementById("scrollTop");
  window.addEventListener("scroll", () => scrollBtn?.classList.toggle("visible", window.scrollY > 300));
  scrollBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();