/* ===================================================
   tarot.js — Bói Bài Tarot Tình Yêu (Trải Bài 3 Lá)
   Đã fix lỗi đường dẫn ảnh & tối ưu hiệu năng
   =================================================== */

'use strict';

/* --------------------------------------------------
   DATA — 78 lá bài Tarot đầy đủ
   -------------------------------------------------- */
const TAROT_CARDS = [
  // ── MAJOR ARCANA (22 lá) ─────────────────────────
  { id: 1,  name: 'The Fool',           emoji: '🌼', type: 'positive',
    meaning: 'Bước khởi đầu hồn nhiên và đầy can đảm. Trái tim bạn đang sẵn sàng cho một cuộc phiêu lưu mới trong tình yêu — hãy bước đi với niềm tin và sự tự do.' },
  { id: 2,  name: 'The Magician',       emoji: '🪄', type: 'positive',
    meaning: 'Bạn có đủ năng lực và sức hút để tạo ra tình yêu bạn mong muốn. Hãy dùng ý chí và hành động để biến điều ước thành hiện thực.' },
  { id: 3,  name: 'The High Priestess', emoji: '🔮', type: 'positive',
    meaning: 'Trực giác, bí ẩn và thế giới nội tâm. Trái tim bạn biết nhiều hơn lý trí nghĩ. Hãy dành thời gian lắng nghe chính mình.' },
  { id: 4,  name: 'The Empress',        emoji: '🌸', type: 'positive',
    meaning: 'Sự nở rộ và dồi dào trong tình cảm. Tình yêu đang được nuôi dưỡng và lớn mạnh. Hãy trao đi sự chăm sóc, dịu dàng một cách tự nhiên.' },
  { id: 5,  name: 'The Emperor',        emoji: '👑', type: 'positive',
    meaning: 'Sự ổn định và nền tảng vững chắc trong tình yêu. Một mối quan hệ có cấu trúc rõ ràng và được xây dựng trên sự tin tưởng lâu dài.' },
  { id: 6,  name: 'The Hierophant',     emoji: '⛪', type: 'positive',
    meaning: 'Cam kết và truyền thống trong tình yêu. Mối quan hệ đang được định hướng theo những giá trị sâu sắc và lâu bền.' },
  { id: 7,  name: 'The Lovers',         emoji: '💑', type: 'positive',
    meaning: 'Lá bài của sự kết nối sâu sắc và lựa chọn từ trái tim. Năng lượng tình cảm đang ở đỉnh cao — hãy tin vào cảm xúc và dám dũng cảm yêu.' },
  { id: 8,  name: 'The Chariot',        emoji: '🏇', type: 'positive',
    meaning: 'Chiến thắng qua ý chí và quyết tâm. Bạn đang dẫn dắt tình yêu về phía trước với sự tập trung và can đảm tuyệt vời.' },
  { id: 9,  name: 'Strength',           emoji: '🦁', type: 'positive',
    meaning: 'Sức mạnh nội tâm và lòng can đảm trong tình yêu. Bạn có khả năng vượt qua thử thách bằng sự kiên nhẫn và tình yêu thương.' },
  { id: 10, name: 'The Hermit',         emoji: '🕯️', type: 'challenge',
    meaning: 'Thời gian cần một mình để suy ngẫm và tìm lại bản thân. Tình yêu đích thực bắt đầu từ việc yêu bản thân. Hãy dành thời gian tĩnh lặng này để trưởng thành hơn.' },
  { id: 11, name: 'Wheel of Fortune',   emoji: '🎡', type: 'positive',
    meaning: 'Vận may và những chu kỳ trong tình yêu đang xoay chuyển. Đây là điểm ngoặt quan trọng — hãy nắm bắt cơ hội khi vận may đang mỉm cười.' },
  { id: 12, name: 'Justice',            emoji: '⚖️', type: 'positive',
    meaning: 'Sự công bằng và cân bằng trong tình yêu. Mối quan hệ đang được xây dựng trên sự trung thực và đối xử công tâm với nhau.' },
  { id: 13, name: 'The Hanged Man',     emoji: '🔄', type: 'challenge',
    meaning: 'Giai đoạn chờ đợi và nhìn nhận lại từ góc độ khác. Đây không phải lúc hành động gấp — hãy để mọi thứ lắng xuống và nhìn thấy sự thật mới.' },
  { id: 14, name: 'Death',              emoji: '🦋', type: 'challenge',
    meaning: 'Sự kết thúc dẫn đến tái sinh. Một giai đoạn tình yêu đang khép lại để nhường chỗ cho điều mới đẹp đẽ hơn. Đừng sợ sự thay đổi.' },
  { id: 15, name: 'Temperance',         emoji: '✨', type: 'positive',
    meaning: 'Sự cân bằng, kiên nhẫn và chữa lành trong tình yêu. Hãy để mọi thứ diễn ra từ từ, hài hòa — đừng vội vàng, tình yêu cần thời gian lắng đọng.' },
  { id: 16, name: 'The Devil',          emoji: '🔗', type: 'challenge',
    meaning: 'Sự ràng buộc và đam mê mãnh liệt. Hãy nhận biết ranh giới giữa tình yêu đích thực và sự lệ thuộc cảm xúc. Tự do nội tâm mới là chìa khóa.' },
  { id: 17, name: 'The Tower',          emoji: '⚡', type: 'challenge',
    meaning: 'Sự thay đổi đột ngột và giải phóng. Đôi khi những điều cũ cần sụp đổ để nhường chỗ cho điều mới. Giai đoạn này có thể đau nhưng cần thiết.' },
  { id: 18, name: 'The Star',           emoji: '⭐', type: 'positive',
    meaning: 'Hy vọng, chữa lành và ánh sáng sau bóng tối. Dù có những vết thương từ quá khứ, tình yêu đang dẫn lối bạn đến một chương mới đẹp đẽ hơn.' },
  { id: 19, name: 'The Moon',           emoji: '🌙', type: 'challenge',
    meaning: 'Bí ẩn, ảo tưởng và cảm xúc sâu thẳm. Có điều gì đó chưa được nói ra. Hãy lắng nghe trực giác và đừng để lo lắng che khuất trái tim thật.' },
  { id: 20, name: 'The Sun',            emoji: '☀️', type: 'positive',
    meaning: 'Niềm vui, hạnh phúc và sự rõ ràng trong tình cảm. Đây là một trong những lá bài tích cực nhất — tình yêu của bạn đang rực rỡ và viên mãn.' },
  { id: 21, name: 'Judgement',          emoji: '📯', type: 'positive',
    meaning: 'Sự tái sinh và gọi tên cảm xúc thật. Đây là lúc nhìn lại, tha thứ và bước sang trang mới trong tình yêu với trái tim rộng mở hơn.' },
  { id: 22, name: 'The World',          emoji: '🌍', type: 'positive',
    meaning: 'Sự hoàn thành và viên mãn. Một chu kỳ tình cảm quan trọng đang khép lại trong trọn vẹn. Bạn đã trưởng thành và sẵn sàng cho giai đoạn tiếp theo.' },

  // ── CUPS (14 lá) ─────────────────────────────────
  { id: 23, name: 'Ace of Cups',        emoji: '💧', type: 'positive',
    meaning: 'Khởi đầu mới trong tình yêu, cảm xúc thuần khiết và trái tim rộng mở. Một tình yêu mới hoặc giai đoạn mới đang chờ đón bạn.' },
  { id: 24, name: 'Two of Cups',        emoji: '🥂', type: 'positive',
    meaning: 'Sự tương hợp và kết nối hai tâm hồn. Hai người đang — hoặc sẽ — tìm thấy sự đồng điệu hiếm có. Đây là nền tảng tuyệt vời cho tình yêu bền lâu.' },
  { id: 25, name: 'Three of Cups',      emoji: '🎉', type: 'positive',
    meaning: 'Ăn mừng, niềm vui và sự kết nối cộng đồng. Tình yêu đang được nuôi dưỡng trong bầu không khí hạnh phúc và chia sẻ.' },
  { id: 26, name: 'Four of Cups',       emoji: '😶', type: 'challenge',
    meaning: 'Thờ ơ và bỏ lỡ cơ hội. Hãy nhìn xung quanh — có thể có điều tốt đẹp đang chờ mà bạn chưa nhận ra do đang mắc kẹt trong suy nghĩ.' },
  { id: 27, name: 'Five of Cups',       emoji: '😢', type: 'challenge',
    meaning: 'Tiếc nuối và đau buồn sau mất mát. Hãy để cảm xúc được giải phóng, nhưng đừng quên nhìn về phía trước — vẫn còn điều tốt đẹp phía trước.' },
  { id: 28, name: 'Six of Cups',        emoji: '🌈', type: 'positive',
    meaning: 'Hoài niệm ngọt ngào và sự kết nối từ quá khứ. Có thể một mối tình cũ hoặc kỷ niệm đẹp đang trở về và mang đến niềm vui.' },
  { id: 29, name: 'Seven of Cups',      emoji: '🌀', type: 'challenge',
    meaning: 'Ảo tưởng và quá nhiều lựa chọn. Hãy tập trung và nhìn nhận thực tế trong tình yêu thay vì đắm chìm trong những giấc mơ không thực tế.' },
  { id: 30, name: 'Eight of Cups',      emoji: '🚶', type: 'challenge',
    meaning: 'Rời bỏ điều không còn phù hợp để tìm kiếm ý nghĩa sâu sắc hơn. Đây là dũng cảm khi biết buông tay để tiến về phía trước.' },
  { id: 31, name: 'Nine of Cups',       emoji: '🌟', type: 'positive',
    meaning: 'Ước nguyện thành sự thật và sự thỏa mãn cảm xúc. Đây là lá bài của hạnh phúc — điều bạn ao ước trong tình yêu đang trở thành hiện thực.' },
  { id: 32, name: 'Ten of Cups',        emoji: '🏡', type: 'positive',
    meaning: 'Hạnh phúc viên mãn và sự hoàn chỉnh trong tình cảm. Lá bài của "mãi mãi" — hướng đến tổ ấm yêu thương, bình an và thỏa mãn trong mối quan hệ.' },
  { id: 33, name: 'Page of Cups',       emoji: '🐟', type: 'positive',
    meaning: 'Tin nhắn tình yêu ngọt ngào và cảm xúc sáng tạo. Có thể có điều gì đó bất ngờ và dễ thương đang đến trong tình yêu của bạn.' },
  { id: 34, name: 'Knight of Cups',     emoji: '🐴', type: 'positive',
    meaning: 'Người theo đuổi lãng mạn và đề nghị từ trái tim. Tình yêu đang đến với sự chân thành và nhiệt huyết — hãy mở lòng đón nhận.' },
  { id: 35, name: 'Queen of Cups',      emoji: '🌊', type: 'positive',
    meaning: 'Sự đồng cảm sâu sắc và yêu thương vô điều kiện. Bạn hoặc đối phương đang thể hiện tình yêu qua sự quan tâm chăm sóc từ trái tim.' },
  { id: 36, name: 'King of Cups',       emoji: '🌺', type: 'positive',
    meaning: 'Sự trưởng thành cảm xúc và tình yêu ổn định. Một người đàn ông (hay người yêu) trưởng thành, ổn định và biết cách bày tỏ tình cảm đúng mực.' },

  // ── WANDS (14 lá) ─────────────────────────────────
  { id: 37, name: 'Ace of Wands',       emoji: '🔥', type: 'positive',
    meaning: 'Ngọn lửa đam mê mới bùng cháy trong tình yêu. Năng lượng sáng tạo và sức hút mạnh mẽ đang được khơi dậy — hãy hành động theo đam mê.' },
  { id: 38, name: 'Two of Wands',       emoji: '🗺️', type: 'positive',
    meaning: 'Lên kế hoạch và nhìn về tương lai tươi sáng trong tình yêu. Bạn đang đứng trước một quyết định quan trọng có thể mở ra những chân trời mới.' },
  { id: 39, name: 'Three of Wands',     emoji: '⛵', type: 'positive',
    meaning: 'Những kế hoạch tình yêu đang thành hình và mở rộng. Bước tiến về phía trước đang được đền đáp — hãy kiên trì và tự tin.' },
  { id: 40, name: 'Four of Wands',      emoji: '🎊', type: 'positive',
    meaning: 'Ăn mừng, sự ổn định và nền tảng vững chắc trong tình yêu. Đây là thời điểm hạnh phúc và kết nối gia đình, cộng đồng.' },
  { id: 41, name: 'Five of Wands',      emoji: '⚔️', type: 'challenge',
    meaning: 'Xung đột và cạnh tranh trong tình yêu. Hãy học cách giao tiếp rõ ràng và tôn trọng nhau thay vì đấu tranh để ai đúng ai sai.' },
  { id: 42, name: 'Six of Wands',       emoji: '🏆', type: 'positive',
    meaning: 'Chiến thắng và được công nhận trong tình yêu. Nỗ lực của bạn đang được đền đáp — mối quan hệ đang bước vào giai đoạn vinh quang.' },
  { id: 43, name: 'Seven of Wands',     emoji: '🛡️', type: 'challenge',
    meaning: 'Đứng vững bảo vệ điều bạn tin. Tình yêu đang đối mặt với thử thách từ bên ngoài — hãy can đảm giữ vững lập trường và bảo vệ mối quan hệ.' },
  { id: 44, name: 'Eight of Wands',     emoji: '💨', type: 'positive',
    meaning: 'Tốc độ, hành động nhanh và tin tức tình yêu đang đến. Mọi thứ đang tăng tốc — hãy chuẩn bị cho những thay đổi thú vị và nhanh chóng.' },
  { id: 45, name: 'Nine of Wands',      emoji: '🏹', type: 'challenge',
    meaning: 'Kiên cường dù mệt mỏi. Bạn đã trải qua nhiều thử thách trong tình yêu — hãy giữ vững, đích đến đang gần kề.' },
  { id: 46, name: 'Ten of Wands',       emoji: '😮‍💨', type: 'challenge',
    meaning: 'Gánh nặng và trách nhiệm quá lớn trong tình yêu. Hãy học cách buông bớt, nhờ người tin cậy giúp đỡ và không cần ôm hết một mình.' },
  { id: 47, name: 'Page of Wands',      emoji: '🌱', type: 'positive',
    meaning: 'Nhiệt huyết và ham học hỏi trong tình yêu. Một khởi đầu mới đầy năng lượng — hãy tiếp cận tình yêu với sự hào hứng và tò mò tươi mới.' },
  { id: 48, name: 'Knight of Wands',    emoji: '🐎', type: 'positive',
    meaning: 'Hành động táo bạo và đam mê mãnh liệt. Tình yêu đang đến với tốc độ và nhiệt huyết — hãy tận hưởng sức sống mãnh liệt này.' },
  { id: 49, name: 'Queen of Wands',     emoji: '🌻', type: 'positive',
    meaning: 'Sức hút, tự tin và đam mê sống động. Bạn hoặc đối phương đang tỏa sáng với sức hút tự nhiên và năng lượng ấm áp, thu hút.' },
  { id: 50, name: 'King of Wands',      emoji: '🦅', type: 'positive',
    meaning: 'Lãnh đạo và tầm nhìn trong tình yêu. Một người đầy nhiệt huyết, quyết đoán và biết cách truyền cảm hứng đang đóng vai trò quan trọng.' },

  // ── PENTACLES (14 lá) ──────────────────────────────
  { id: 51, name: 'Ace of Pentacles',   emoji: '🌿', type: 'positive',
    meaning: 'Cơ hội mới trong tình yêu gắn liền với sự ổn định vật chất và cảm xúc. Nền tảng vững chắc đang được xây dựng để tình yêu nở rộ.' },
  { id: 52, name: 'Two of Pentacles',   emoji: '⚖️', type: 'challenge',
    meaning: 'Cân bằng giữa tình yêu và cuộc sống thực tế. Bạn đang phải quản lý nhiều ưu tiên — hãy linh hoạt và đừng để áp lực làm mờ đi điều quan trọng.' },
  { id: 53, name: 'Three of Pentacles', emoji: '🏗️', type: 'positive',
    meaning: 'Hợp tác và xây dựng cùng nhau. Tình yêu đang được củng cố qua những nỗ lực chung và sự tôn trọng kỹ năng của nhau.' },
  { id: 54, name: 'Four of Pentacles',  emoji: '🤲', type: 'challenge',
    meaning: 'Giữ chặt và sợ mất mát trong tình yêu. Hãy học cách tin tưởng và buông bớt sự kiểm soát — tình yêu cần không gian để thở.' },
  { id: 55, name: 'Five of Pentacles',  emoji: '❄️', type: 'challenge',
    meaning: 'Cảm giác thiếu thốn và cô đơn. Đây là lúc tìm kiếm sự hỗ trợ và nhớ rằng bạn không cần phải đối mặt với khó khăn một mình.' },
  { id: 56, name: 'Six of Pentacles',   emoji: '🎁', type: 'positive',
    meaning: 'Cho đi và nhận lại trong tình yêu. Sự cân bằng trong việc trao và nhận đang tạo ra mối quan hệ lành mạnh, bình đẳng và nuôi dưỡng lẫn nhau.' },
  { id: 57, name: 'Seven of Pentacles', emoji: '🌾', type: 'positive',
    meaning: 'Kiên nhẫn chờ đợi kết quả. Bạn đã đầu tư nhiều vào tình yêu — đây là lúc đánh giá lại và chờ đợi mùa màng bội thu.' },
  { id: 58, name: 'Eight of Pentacles', emoji: '🔨', type: 'positive',
    meaning: 'Nỗ lực và cống hiến trong tình yêu. Bạn đang đầu tư thời gian và công sức để xây dựng mối quan hệ — sự chăm chỉ này sẽ được đền đáp.' },
  { id: 59, name: 'Nine of Pentacles',  emoji: '🍇', type: 'positive',
    meaning: 'Tự lập và sự sung túc từ bên trong. Bạn đang tự tin vào bản thân và biết rõ giá trị của mình — đây là nền tảng tuyệt vời để thu hút tình yêu đích thực.' },
  { id: 60, name: 'Ten of Pentacles',   emoji: '🏛️', type: 'positive',
    meaning: 'Di sản và hạnh phúc lâu dài. Tình yêu đang hướng đến sự bền vững, ổn định và xây dựng tổ ấm mang ý nghĩa lâu dài.' },
  { id: 61, name: 'Page of Pentacles',  emoji: '📚', type: 'positive',
    meaning: 'Học hỏi và khám phá trong tình yêu. Bạn đang tiếp cận mối quan hệ với sự cẩn thận và thực tế — đây là nền tảng tốt cho sự phát triển.' },
  { id: 62, name: 'Knight of Pentacles',emoji: '🐂', type: 'positive',
    meaning: 'Kiên định và đáng tin cậy trong tình yêu. Một người (hoặc bản thân bạn) đang thể hiện sự trung thành và cam kết bền vững.' },
  { id: 63, name: 'Queen of Pentacles', emoji: '🌺', type: 'positive',
    meaning: 'Sự chăm sóc thực tế và ấm áp. Tình yêu được thể hiện qua những hành động quan tâm, tạo nên môi trường an toàn và vững chắc cho cả hai.' },
  { id: 64, name: 'King of Pentacles',  emoji: '🏦', type: 'positive',
    meaning: 'Sự thịnh vượng và ổn định trong tình yêu. Một người đáng tin cậy, ổn định và có khả năng tạo dựng cuộc sống vững bền đang hiện diện.' },

  // ── SWORDS (14 lá) ────────────────────────────────
  { id: 65, name: 'Ace of Swords',      emoji: '⚔️', type: 'positive',
    meaning: 'Sự thật và rõ ràng đột ngột trong tình yêu. Đây là lúc đột phá qua mọi mơ hồ và đối mặt thẳng thắn với sự thật trong mối quan hệ.' },
  { id: 66, name: 'Two of Swords',      emoji: '😌', type: 'challenge',
    meaning: 'Lưỡng lự và né tránh quyết định khó trong tình yêu. Hãy tháo bịt mắt và nhìn thẳng vào sự thật — quyết định không thể mãi trì hoãn.' },
  { id: 67, name: 'Three of Swords',    emoji: '💔', type: 'challenge',
    meaning: 'Đau lòng và nước mắt trong tình yêu. Cơn đau này là thật và cần được thừa nhận. Cho phép bản thân đau để sau đó có thể chữa lành hoàn toàn.' },
  { id: 68, name: 'Four of Swords',     emoji: '🛏️', type: 'challenge',
    meaning: 'Nghỉ ngơi và phục hồi sau giai đoạn khó khăn. Đây là lúc tạm dừng để nạp lại năng lượng trước khi bước tiếp trong tình yêu.' },
  { id: 69, name: 'Five of Swords',     emoji: '😈', type: 'challenge',
    meaning: 'Xung đột và cái giá của chiến thắng. Hãy tự hỏi: thắng cuộc tranh luận này có đáng không nếu bạn mất đi mối quan hệ?' },
  { id: 70, name: 'Six of Swords',      emoji: '⛵', type: 'positive',
    meaning: 'Chuyển tiếp và bước ra khỏi vùng bão tố. Bạn đang rời xa đau khổ và tiến về phía yên bình hơn — hành trình chữa lành đang trên đà tốt.' },
  { id: 71, name: 'Seven of Swords',    emoji: '🦊', type: 'challenge',
    meaning: 'Lừa dối hoặc trốn tránh trong tình yêu. Hãy chú ý đến những dấu hiệu không trung thực xung quanh và đảm bảo bạn cũng đang thành thật với bản thân.' },
  { id: 72, name: 'Eight of Swords',    emoji: '🙈', type: 'challenge',
    meaning: 'Tự giam cầm và sợ hãi trong tình yêu. Thực ra bạn có nhiều tự do hơn bạn nghĩ — hãy tháo bỏ những giới hạn do chính bạn tạo ra.' },
  { id: 73, name: 'Nine of Swords',     emoji: '😰', type: 'challenge',
    meaning: 'Lo âu và đêm dài suy nghĩ trong tình yêu. Nỗi sợ thường lớn hơn thực tế — hãy tìm người tin cậy để chia sẻ thay vì lo một mình trong đêm.' },
  { id: 74, name: 'Ten of Swords',      emoji: '🌅', type: 'challenge',
    meaning: 'Kết thúc đau đớn nhưng sau đó là bình minh. Điều tệ nhất đã qua — bây giờ là lúc nhổ dậy và nhìn về phía mặt trời đang mọc.' },
  { id: 75, name: 'Page of Swords',     emoji: '💬', type: 'positive',
    meaning: 'Sự tò mò và giao tiếp sắc bén trong tình yêu. Hãy lên tiếng và đặt câu hỏi — sự rõ ràng trong lời nói sẽ mở ra những cánh cửa mới.' },
  { id: 76, name: 'Knight of Swords',   emoji: '🌪️', type: 'challenge',
    meaning: 'Hành động hấp tấp và thẳng thắn đến vô tình. Nhiệt huyết là tốt nhưng hãy kiềm chế đôi chút — tốc độ không phải lúc nào cũng là bạn trong tình yêu.' },
  { id: 77, name: 'Queen of Swords',    emoji: '🧊', type: 'positive',
    meaning: 'Sự rõ ràng và độc lập trong tình yêu. Bạn có thể yêu và vẫn giữ được bản thân — đây là sức mạnh, không phải sự lạnh lùng.' },
  { id: 78, name: 'King of Swords',     emoji: '⚖️', type: 'positive',
    meaning: 'Trí tuệ và sự công bằng trong tình yêu. Lý trí và trái tim cần cân bằng — hãy đưa ra quyết định dựa trên cả logic lẫn cảm xúc.' }
];

/* --------------------------------------------------
   IMAGE MAPPING — Đã XÓA dấu gạch chéo ở đầu "/"
   (Nếu ảnh của bạn đuôi .jpg, hãy sửa .png thành .jpg ở dưới nhé)
   -------------------------------------------------- */
function getCardImageUrl(cardId) {
  return `img/tarot/${cardId}.png`; 
}

/* --------------------------------------------------
   Helper: build <img> cho mặt trước lá bài
   -------------------------------------------------- */
function buildCardImage(card) {
  const src = getCardImageUrl(card.id);
  const alt = card.name;
  return `<img
    src="${src}"
    alt="${alt}"
   
    class="card-front-img"
    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
  /><span class="card-front-emoji-fallback" style="display:none;">${card.emoji}</span>`;
}

/* --------------------------------------------------
   COMBINED READINGS — based on 3-card combos
   -------------------------------------------------- */
const COMBINED_READINGS = [
  {
    keywords: ['positive', 'positive', 'positive'],
    text: 'Ba lá bài đều mang năng lượng tích cực — đây là một trải bài hiếm gặp và vô cùng đẹp đẽ. Hành trình tình yêu của bạn từ quá khứ đến tương lai đang được bao bọc bởi ánh sáng. Hãy trao trọn vẹn trái tim và tin tưởng vào con đường đang mở ra phía trước.'
  },
  {
    keywords: ['positive', 'challenge', 'positive'],
    text: 'Bạn đang đứng giữa những kỷ niệm đẹp và tương lai sáng, dù hiện tại có đôi chút thử thách. Giai đoạn này là bước kiểm tra để tình yêu trở nên sâu sắc hơn. Hãy kiên nhẫn — phần thưởng xứng đáng đang chờ.'
  },
  {
    keywords: ['challenge', 'positive', 'positive'],
    text: 'Quá khứ có những vết thương, nhưng hiện tại và tương lai đều hứa hẹn những điều tươi sáng. Bạn đã vượt qua được những khó khăn và đang bước vào giai đoạn nở rộ của tình yêu. Chúc mừng sự trưởng thành này!'
  },
  {
    keywords: ['positive', 'positive', 'challenge'],
    text: 'Nền tảng tình yêu của bạn rất vững chắc, nhưng tương lai đang kêu gọi sự chú tâm. Đừng để những thói quen thoải mái làm bạn quên đầu tư vào mối quan hệ. Hành động chủ động ngay bây giờ sẽ giúp bảo vệ hạnh phúc bạn đang có.'
  }
];

function classifyCard(card) {
  return card.type || 'positive';
}

function getCombinedReading(selected) {
  const types = selected.map(c => classifyCard(c));
  const key = types.join(',');
  const match = COMBINED_READINGS.find(r => r.keywords.join(',') === key);
  if (match) return match.text;
  
  const positiveCount = types.filter(t => t === 'positive').length;
  if (positiveCount === 3) return COMBINED_READINGS[0].text;
  if (positiveCount === 2) return COMBINED_READINGS[1].text;
  if (positiveCount === 1) return COMBINED_READINGS[2].text;
  return 'Ba lá bài đang gửi đến bạn một thông điệp sâu sắc: đây là thời điểm để dừng lại, nhìn vào bên trong và chữa lành những vết thương cũ. Tình yêu đích thực sẽ đến khi bạn thực sự sẵn sàng đón nhận nó.';
}

/* --------------------------------------------------
   STATE
   -------------------------------------------------- */
const POSITIONS = ['Quá Khứ', 'Hiện Tại', 'Tương Lai'];
let selectedCards = [];   
let deckCards = [];       
let isResetting = false;

/* --------------------------------------------------
   SHUFFLE — Fisher-Yates
   -------------------------------------------------- */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* --------------------------------------------------
   RENDER DECK (12 cards displayed)
   -------------------------------------------------- */
function renderDeck() {
  const grid = document.getElementById('cardDeck');
  if (!grid) return;

  deckCards = shuffle(TAROT_CARDS).slice(0, 12);
  grid.innerHTML = '';
  
  deckCards.forEach(card => {
    const preloadImg = new Image();
    preloadImg.src = getCardImageUrl(card.id);
  });

  deckCards.forEach((card, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper';
    wrapper.dataset.idx = idx;
    wrapper.setAttribute('role', 'button');
    wrapper.setAttribute('tabindex', '0');
    wrapper.setAttribute('aria-label', `Lá bài ${idx + 1} — chưa lật`);
    wrapper.setAttribute('aria-pressed', 'false');

    wrapper.innerHTML = `
      <div class="card-inner">
        <div class="card-back" aria-hidden="true">
          <div class="card-back-art">
            <span class="card-back-stars">✨</span>
            <span class="card-back-heart">♥</span>
            <span class="card-back-stars">⭐</span>
          </div>
        </div>
        <div class="card-front" aria-hidden="true">
          ${buildCardImage(card)}
          <span class="card-front-name">${card.name}</span>
          <span class="card-front-pos" id="pos-${idx}"></span>
        </div>
      </div>
    `;

    wrapper.addEventListener('click', () => handleCardClick(wrapper, idx));
    wrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick(wrapper, idx);
      }
    });

    grid.appendChild(wrapper);
  });
}

/* --------------------------------------------------
   HANDLE CARD CLICK
   -------------------------------------------------- */
function handleCardClick(wrapper, idx) {
  if (wrapper.classList.contains('selected') || selectedCards.length >= 3) return;

  const positionIndex = selectedCards.length;
  const card = deckCards[idx];

  selectedCards.push(card);
  wrapper.classList.add('selected', 'flipped');
  wrapper.setAttribute('aria-pressed', 'true');
  wrapper.setAttribute('aria-label', `${card.name} — ${POSITIONS[positionIndex]}`);

  const posLabel = wrapper.querySelector(`#pos-${idx}`);
  if (posLabel) {
    posLabel.textContent = POSITIONS[positionIndex];
    posLabel.classList.add('visible');
  }

  updateProgress();

  if (selectedCards.length === 3) {
    setTimeout(showResult, 700);
  }
}

/* --------------------------------------------------
   UPDATE PROGRESS SLOTS
   -------------------------------------------------- */
function updateProgress() {
  const slots = document.querySelectorAll('.progress-slot');
  slots.forEach((slot, i) => {
    if (i < selectedCards.length) {
      slot.classList.add('filled');
      slot.innerHTML = `<span class="slot-dot"></span> ${POSITIONS[i]}: ${selectedCards[i].emoji}`;
    } else {
      slot.classList.remove('filled');
      slot.innerHTML = `<span class="slot-dot"></span> ${POSITIONS[i]}`;
    }
  });
}

/* --------------------------------------------------
   SHOW RESULT
   -------------------------------------------------- */
function showResult() {
  const resultEl = document.getElementById('tarotResult');
  const spreadEl = document.getElementById('spreadResult');
  const combinedEl = document.getElementById('combinedReading');
  if (!resultEl || !spreadEl || !combinedEl) return;

  spreadEl.innerHTML = selectedCards.map((card, i) => `
    <div class="spread-card">
      <span class="spread-position-label">${POSITIONS[i]}</span>
      <div class="spread-card-image">
        <img
          src="${getCardImageUrl(card.id)}"
          alt="${card.name}"
          loading="lazy"
          class="spread-img"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        <span class="spread-emoji-fallback" style="display:none;">${card.emoji}</span>
      </div>
      <div class="spread-card-name">${card.name}</div>
      <p class="spread-card-meaning">${card.meaning}</p>
    </div>
  `).join('');

  combinedEl.textContent = getCombinedReading(selectedCards);
  resultEl.classList.add('visible');

  setTimeout(() => {
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 150);
}

/* --------------------------------------------------
   RESET
   -------------------------------------------------- */
function resetTarot() {
  if (isResetting) return;
  isResetting = true;
  selectedCards = [];

  const resultEl = document.getElementById('tarotResult');
  if (resultEl) resultEl.classList.remove('visible');
  updateProgress();

  setTimeout(() => {
    renderDeck();
    isResetting = false;
    const deck = document.getElementById('cardDeck');
    if (deck) deck.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 300);
}

/* --------------------------------------------------
   SCROLL TO TOP & INIT (FIXED DOMContentLoaded BUG)
   -------------------------------------------------- */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 350);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initApp() {
  renderDeck();
  updateProgress();
  initScrollTop();

  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) resetBtn.addEventListener('click', resetTarot);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}