import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [NgFor],
  templateUrl: './latest-news.component.html',
  styleUrl: './latest-news.component.css'
})
export class LatestNewsComponent {
  newsList = [
    {
      img: 'https://www.cgv.vn/media/catalog/product/cache/1/image/1800x/71252117777b696995f01934522c402d/n/b/nbn_main_thumb.jpg',
      title: 'Nhà bà Nữ là một bộ phim điện ảnh Việt Nam thuộc thể loại hài - chính kịch ra mắt vào năm 2023',
      desc: 'Với sự tham gia diễn xuất của các diễn viên gồm Lê Giang, Uyển Ân, Song Luân, Trấn Thành, Khả Như, Quỳnh Lý, Phương Lan, Dương Lâm, Ngọc Giàu và Việt Anh'
    },
    {
      img: 'https://www.cgv.vn/media/catalog/product/cache/1/image/1800x/71252117777b696995f01934522c402d/t/o/top_gun_cgv.jpg',
      title: 'Phi công siêu đẳng Maverick là một bộ phim chính kịch hành động của Hoa Kỳ được phát hành vào năm 2022',
      desc: 'Bộ phim được đạo diễn bởi Joseph Kosinski, biên kịch bởi Ehren Kruger, Eric Warren Singer, Christopher McQuarrie, và cốt truyện được xây dựng bởi Peter Craig và Justin Marks'
    },
    {
      img: 'https://i.ytimg.com/vi/j-lsGWkw8UM/maxresdefault.jpg',
      title: 'Gái già lắm chiêu V: Những cuộc đời vương giả là phim điện ảnh chính kịch của Việt Nam năm 2021',
      desc: 'Tác phẩm xoay quanh câu chuyện của 3 chị em Lý Lệ Hà, Lý Lệ Hồng và Lý Linh. Dòng họ Lý ở trong Bạch Trà viên xa hoa lộng lẫy, với đầy cổ vật có giá trị gấp mấy lần siêu xe'
    },
    {
      img: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/02/lich-chieu-phim-creed-iii-tay-dam-huyen-thoai-1.jpg',
      title: 'Creed III: Tay đấm huyền thoại là bộ phim chính kịch thể thao của Hoa Kỳ ra mắt năm 2023',
      desc: 'Được đạo diễn bởi Michael B. Jordan kiêm diễn viên chính với kịch bản từ Keenan Coolger và Zach Baylin. Bộ phim đồng thời vừa là phần hậu truyện của Creed II vừa là phần phim thứ chín thuộc loạt phim Rocky'
    },
  ]
}
