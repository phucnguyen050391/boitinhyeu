/**
 * congiap.js – Bói Tình Yêu 12 Con Giáp
 * Logic: Tam hợp / Tứ hành xung / Lục hại / Lục hợp / Nhị hợp
 * BoiTinhYeu.net
 */

/* =============================================
   1. DỮ LIỆU 12 CON GIÁP
   ============================================= */
const GIAP = [
  { name: 'Tý',  emoji: '🐭', element: 'Thủy', year: 2020 },
  { name: 'Sửu', emoji: '🐮', element: 'Thổ',  year: 2021 },
  { name: 'Dần', emoji: '🐯', element: 'Mộc',  year: 2022 },
  { name: 'Mão', emoji: '🐰', element: 'Mộc',  year: 2023 },
  { name: 'Thìn',emoji: '🐲', element: 'Thổ',  year: 2024 },
  { name: 'Tỵ',  emoji: '🐍', element: 'Hỏa',  year: 2025 },
  { name: 'Ngọ', emoji: '🐴', element: 'Hỏa',  year: 2026 },
  { name: 'Mùi', emoji: '🐑', element: 'Thổ',  year: 2027 },
  { name: 'Thân',emoji: '🐒', element: 'Kim',  year: 2028 },
  { name: 'Dậu', emoji: '🐓', element: 'Kim',  year: 2029 },
  { name: 'Tuất',emoji: '🐕', element: 'Thổ',  year: 2030 },
  { name: 'Hợi', emoji: '🐷', element: 'Thủy', year: 2031 },
];
// index: Tý=0, Sửu=1, Dần=2, Mão=3, Thìn=4, Tỵ=5, Ngọ=6, Mùi=7, Thân=8, Dậu=9, Tuất=10, Hợi=11

/* =============================================
   2. CÁC NHÓM QUAN HỆ
   ============================================= */

// Tam hợp: 3 con hợp thành vòng tròn hoàn hảo → cực kỳ tốt
const TAM_HOP = [
  [0, 4, 8],   // Tý – Thìn – Thân
  [1, 5, 9],   // Sửu – Tỵ – Dậu
  [2, 6, 10],  // Dần – Ngọ – Tuất
  [3, 7, 11],  // Mão – Mùi – Hợi
];

// Nhị hợp: 2 con hợp hoàn hảo → rất tốt
const NHI_HOP = [
  [0, 11],  // Tý – Hợi
  [1, 10],  // Sửu – Tuất
  [2, 9],   // Dần – Dậu
  [3, 8],   // Mão – Thân
  [4, 7],   // Thìn – Mùi
  [5, 6],   // Tỵ – Ngọ
];

// Lục hợp: hợp nhau khá tốt (khác nhị hợp, bổ trợ nhau)
const LUC_HOP = [
  [0, 1],   // Tý – Sửu
  [2, 11],  // Dần – Hợi
  [3, 10],  // Mão – Tuất
  [4, 9],   // Thìn – Dậu
  [5, 8],   // Tỵ – Thân
  [6, 7],   // Ngọ – Mùi
];

// Tứ hành xung: khắc nhau nặng nhất
const TU_HANH_XUNG = [
  [0, 3, 6, 9],  // Tý – Mão – Ngọ – Dậu
  [1, 4, 7, 10], // Sửu – Thìn – Mùi – Tuất
  [2, 5, 8, 11], // Dần – Tỵ – Thân – Hợi
];

// Lục hại (lục xung): khắc khá nặng
const LUC_HAI = [
  [0, 6],   // Tý – Ngọ
  [1, 7],   // Sửu – Mùi
  [2, 8],   // Dần – Thân
  [3, 9],   // Mão – Dậu
  [4, 10],  // Thìn – Tuất
  [5, 11],  // Tỵ – Hợi
];

/* =============================================
   3. HÀM PHÂN LOẠI & TÍNH %
   ============================================= */
function getRelationship(a, b) {
  // Tam hợp
  for (const grp of TAM_HOP) {
    if (grp.includes(a) && grp.includes(b)) return 'tam_hop';
  }
  // Nhị hợp
  for (const pair of NHI_HOP) {
    if ((pair[0] === a && pair[1] === b) || (pair[0] === b && pair[1] === a))
      return 'nhi_hop';
  }
  // Lục hợp
  for (const pair of LUC_HOP) {
    if ((pair[0] === a && pair[1] === b) || (pair[0] === b && pair[1] === a))
      return 'luc_hop';
  }
  // Tứ hành xung
  for (const grp of TU_HANH_XUNG) {
    if (grp.includes(a) && grp.includes(b)) return 'tu_hanh_xung';
  }
  // Lục hại
  for (const pair of LUC_HAI) {
    if ((pair[0] === a && pair[1] === b) || (pair[0] === b && pair[1] === a))
      return 'luc_hai';
  }
  return 'binh_thuong';
}

const RELATION_DATA = {
  tam_hop: {
    baseScore: 92,
    label: 'Tam Hợp – Trời Sinh Một Đôi',
    emoji: '💘',
    color: '#ff4d6d',
    titleTemplate: (n, m) => `${n} ${GIAP[n].emoji} & ${m} ${GIAP[m].emoji} — Duyên Trời Định`,
    analysis: (na, nb) =>
      `${na} và ${nb} thuộc cùng vòng Tam Hợp — một trong những mối duyên đẹp nhất trong luận đoán 12 Con Giáp. Hai người bổ trợ nhau hoàn hảo về cả năng lượng lẫn tính cách. Khi ở bên nhau, cả hai đều cảm thấy được nâng đỡ, được hiểu và được trân trọng mà không cần giải thích nhiều.`,
    drLove: (na, nb) =>
      `Dr.Love thẩm: ${na} và ${nb} là cặp đôi mà ngay cả vũ trụ cũng phải ghen tị! Tam Hợp nghĩa là hai người không chỉ hợp về tính cách — mà còn hỗ trợ nhau trên con đường trưởng thành. Hãy nắm tay nhau thật chặt. Đây là điều hiếm có.`,
    advice: `Hãy trân trọng sự hòa hợp tự nhiên này. Thách thức duy nhất là đừng để sự thoải mái làm bạn quên đầu tư vào nhau. Hãy tạo thêm những kỷ niệm mới mỗi ngày!`,
  },
  nhi_hop: {
    baseScore: 88,
    label: 'Nhị Hợp – Linh Hồn Đồng Điệu',
    emoji: '💖',
    color: '#ff758c',
    titleTemplate: (n, m) => `${n} ${GIAP[n].emoji} & ${m} ${GIAP[m].emoji} — Tâm Đầu Ý Hợp`,
    analysis: (na, nb) =>
      `${na} và ${nb} là cặp Nhị Hợp — hai linh hồn vốn đã đồng điệu từ sâu bên trong. Mối quan hệ này mang đến sự hiểu biết sâu sắc, ít hiểu lầm và rất nhiều khoảnh khắc "ừ, mình cũng nghĩ vậy!". Năng lượng của hai người bổ trợ và nâng đỡ nhau một cách tự nhiên.`,
    drLove: (na, nb) =>
      `Dr.Love thẩm: ${na} và ${nb} trong Nhị Hợp giống như hai mảnh ghép được sinh ra để khớp vào nhau. Ở bên nhau, cả hai đều cảm thấy hoàn chỉnh hơn. Đây là nền tảng vững chắc cho một tình yêu bền lâu.`,
    advice: `Tận dụng sự hiểu biết tự nhiên này để xây dựng niềm tin sâu sắc. Đừng ngại chia sẻ những điều thầm kín nhất — đối phương xứng đáng được nghe và sẵn sàng lắng nghe bạn.`,
  },
  luc_hop: {
    baseScore: 78,
    label: 'Lục Hợp – Bổ Trợ Tuyệt Vời',
    emoji: '💗',
    color: '#c084fc',
    titleTemplate: (n, m) => `${n} ${GIAP[n].emoji} & ${m} ${GIAP[m].emoji} — Duyên Bổ Trợ`,
    analysis: (na, nb) =>
      `${na} và ${nb} thuộc Lục Hợp — mối quan hệ bổ trợ lẫn nhau rất tốt. Hai người có thể khác nhau ở bề ngoài nhưng lại lấp đầy những khoảng trống của nhau một cách khéo léo. Đây là kiểu tình yêu mà ban đầu có thể cần thêm thời gian làm quen, nhưng khi đã gắn kết, sẽ rất bền chặt.`,
    drLove: (na, nb) =>
      `Dr.Love thẩm: ${na} và ${nb} trong Lục Hợp — hai mảnh ghép khác màu sắc nhưng hoàn toàn vừa khít! Hãy kiên nhẫn với sự khác biệt của nhau. Chính những điểm không giống nhau sẽ làm tình yêu này thêm phần thú vị và phong phú.`,
    advice: `Hãy học hỏi từ những điểm khác biệt của nhau thay vì cố thay đổi nhau. Đối phương nhìn thế giới theo cách mà bạn chưa từng thấy — đó là món quà quý giá.`,
  },
  binh_thuong: {
    baseScore: 65,
    label: 'Bình Thường – Cần Vun Đắp',
    emoji: '🌱',
    color: '#34d399',
    titleTemplate: (n, m) => `${n} ${GIAP[n].emoji} & ${m} ${GIAP[m].emoji} — Duyên Vun Đắp`,
    analysis: (na, nb) =>
      `${na} và ${nb} không thuộc nhóm hợp đặc biệt hay khắc nặng — đây là mối quan hệ mang tính trung lập, nơi mọi thứ phụ thuộc vào sự nỗ lực và chân thành của cả hai. Không có gì ngăn cản hai người yêu nhau đẹp — chỉ cần cả hai thực sự muốn.`,
    drLove: (na, nb) =>
      `Dr.Love thẩm: ${na} và ${nb} — vũ trụ không sắp xếp sẵn, nhưng điều đó không có nghĩa là không thể. Tình yêu đẹp nhất đôi khi là thứ được tạo ra bằng hai đôi tay, không phải bằng số phận. Hãy chọn nhau mỗi ngày!`,
    advice: `Đầu tư vào việc hiểu nhau sâu hơn — tính cách, giá trị, mong ước. Giao tiếp cởi mở và sự kiên nhẫn sẽ là chìa khóa cho mối tình này.`,
  },
  luc_hai: {
    baseScore: 42,
    label: 'Lục Hại – Cần Thấu Hiểu',
    emoji: '⚡',
    color: '#f59e0b',
    titleTemplate: (n, m) => `${n} ${GIAP[n].emoji} & ${m} ${GIAP[m].emoji} — Duyên Thử Thách`,
    analysis: (na, nb) =>
      `${na} và ${nb} thuộc Lục Hại — một mối quan hệ không ít thử thách, thường dễ nảy sinh hiểu lầm và ma sát. Điều này không có nghĩa là không thể yêu nhau — nhưng cả hai cần nỗ lực gấp đôi để hiểu và chấp nhận nhau.`,
    drLove: (na, nb) =>
      `Dr.Love thẩm: ${na} và ${nb} — sự khác biệt giữa hai người có thể tạo ra những tia lửa thú vị... hoặc những cuộc chiến không hồi kết. Chìa khóa là: lắng nghe nhiều hơn, phán xét ít hơn. Tình yêu không phải là chiến thắng — tình yêu là cùng nhau vượt qua.`,
    advice: `Hãy ưu tiên giao tiếp và đặt mình vào vị trí của đối phương trước khi phản ứng. Sự kiên nhẫn và lòng bao dung sẽ là thuốc chữa cho mọi va chạm.`,
  },
  tu_hanh_xung: {
    baseScore: 28,
    label: 'Tứ Hành Xung – Lửa & Nước',
    emoji: '🌊',
    color: '#6366f1',
    titleTemplate: (n, m) => `${n} ${GIAP[n].emoji} & ${m} ${GIAP[m].emoji} — Duyên Nghịch Chiều`,
    analysis: (na, nb) =>
      `${na} và ${nb} thuộc Tứ Hành Xung — nhóm khắc nhau mạnh nhất trong 12 Con Giáp. Hai người có thể thu hút nhau mãnh liệt ban đầu, nhưng về lâu dài thường gặp nhiều xung đột về quan điểm, lối sống và cách giải quyết vấn đề.`,
    drLove: (na, nb) =>
      `Dr.Love thẩm: ${na} và ${nb} — đây là cặp đôi mà tình yêu đòi hỏi một trái tim thực sự dũng cảm. Không phải là không thể — nhưng cả hai cần cam kết sâu sắc và sẵn sàng "bẻ cong bản ngã" vì nhau. Nếu cả hai chọn yêu, hãy chọn thật sự và chọn mỗi ngày.`,
    advice: `Đừng cố thay đổi nhau — hãy tìm những điểm chung để cùng nhau đứng vào. Xác định rõ ràng những giá trị cốt lõi cả hai đều chia sẻ và xây dựng từ đó. Tình yêu trong Tứ Hành Xung không dễ nhưng khi thành công, nó cực kỳ mạnh mẽ.`,
  },
};

/* =============================================
   4. HÀM TÍNH % CÓ BIẾN ĐỘNG NHỎ (giữ deterministic)
   ============================================= */
function calcPercent(idxA, idxB) {
  const rel = getRelationship(idxA, idxB);
  const base = RELATION_DATA[rel].baseScore;
  // Micro-variation: dựa trên tổng index để giữ cố định cho cùng cặp
  const delta = ((idxA * 7 + idxB * 13) % 9) - 4; // -4 đến +4
  return Math.min(99, Math.max(10, base + delta));
}

/* =============================================
   5. DOM & HIỂN THỊ
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  const selMale   = document.getElementById('selMale');
  const selFemale = document.getElementById('selFemale');
  const calcBtn   = document.getElementById('calcBtn');
  const resultCard = document.getElementById('resultCard');

  // Populate selects
  GIAP.forEach((g, i) => {
    const optM = new Option(`${g.emoji} ${g.name}`, i);
    const optF = new Option(`${g.emoji} ${g.name}`, i);
    selMale.add(optM);
    selFemale.add(optF);
  });

  calcBtn.addEventListener('click', () => {
    const idxA = parseInt(selMale.value, 10);
    const idxB = parseInt(selFemale.value, 10);

    if (isNaN(idxA) || isNaN(idxB)) {
      alert('Vui lòng chọn tuổi của cả hai người nhé! 💕');
      return;
    }

    const rel  = getRelationship(idxA, idxB);
    const data = RELATION_DATA[rel];
    const pct  = calcPercent(idxA, idxB);
    const gA   = GIAP[idxA];
    const gB   = GIAP[idxB];

    // Animate percent ring
    const ring = document.getElementById('ringFill');
    const circum = 439.82; // 2π × 70
    ring.style.strokeDashoffset = circum - (circum * pct / 100);
    ring.style.stroke = data.color;

    // Update ring text
    document.getElementById('ringPct').textContent = `${pct}%`;

    // Analysis title
    document.getElementById('resultTitle').innerHTML =
      `<b>Phân tích: ${gA.name} ${gA.emoji} 💗 ${gB.name} ${gB.emoji}</b>`;

    // Label badge
    document.getElementById('relLabel').textContent = `${data.emoji} ${data.label}`;
    document.getElementById('relLabel').style.background =
      data.color + '22';
    document.getElementById('relLabel').style.color = data.color;

    // Analysis text
    document.getElementById('resultAnalysis').textContent =
      data.analysis(gA.name, gB.name);

    // Dr.Love note
    document.getElementById('drLoveText').textContent =
      data.drLove(gA.name, gB.name);

    // Advice
    document.getElementById('adviceText').textContent = data.advice;

    // Scroll & show
    resultCard.classList.add('visible');
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
