export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isPopular?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  coverImage: string; // URL ảnh thật từ Cloudinary hoặc Unsplash
  images: string[];
  rating: number;
  reviewCount: number;
  address: string;
  phone: string;
  openTime: string;
  closeTime: string;
  cuisineTypes: string[];
  menu: MenuItem[];
  reviews: Review[];
}

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Phở Hoà Pasteur',
    description: 'Một trong những quán phở lâu đời và nổi tiếng nhất Sài Gòn, giữ nguyên hương vị truyền thống hơn 50 năm.',
    coverImage: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cb43f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Ảnh Phở (Unsplash demo)
    images: [],
    rating: 4.5,
    reviewCount: 1250,
    address: '260C Pasteur, Phường 8, Quận 3, TP.HCM',
    phone: '028 3829 7943',
    openTime: '06:00',
    closeTime: '23:00',
    cuisineTypes: ['Món Việt', 'Truyền thống'],
    menu: [
      { id: 'm1', name: 'Phở Đặc Biệt', description: 'Bò viên, tái, nạm, gầu, gân, sách', price: 90000, isPopular: true },
      { id: 'm2', name: 'Phở Tái Nạm', description: 'Thịt bò tái và nạm mềm', price: 75000 },
      { id: 'm3', name: 'Chả Giò', description: 'Cuốn chả giò chiên giòn rụm', price: 45000 },
    ],
    reviews: [
      { id: 'r1', author: 'Minh Tuấn', rating: 5, date: '2023-11-15', content: 'Nước dùng trong và ngọt thanh, không bị nhiều bột ngọt. Thịt bò tươi và mềm. Rất đáng đồng tiền!' },
      { id: 'r2', author: 'Hương Lý', rating: 4, date: '2023-11-10', content: 'Quán đông nên phục vụ hơi chậm vào buổi sáng, nhưng phở rất ngon.' },
    ],
  },
  {
    id: '2',
    name: 'Hum Vegetarian',
    description: 'Không gian xanh mát, tĩnh lặng ngay giữa lòng Sài Gòn nhộn nhịp. Thực đơn chay thanh đạm, tốt cho sức khoẻ và môi trường.',
    coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Ảnh salad chay (Unsplash demo)
    images: [],
    rating: 4.8,
    reviewCount: 845,
    address: '32 Võ Văn Tần, Phường 6, Quận 3, TP.HCM',
    phone: '028 3930 3819',
    openTime: '10:00',
    closeTime: '22:00',
    cuisineTypes: ['Chay', 'Healthy'],
    menu: [
      { id: 'm1', name: 'Gỏi Củ Hũ Dừa', description: 'Củ hũ dừa giòn ngọt trộn cùng đậu phộng và rau thơm', price: 120000, isPopular: true },
      { id: 'm2', name: 'Lẩu Nấm Vân Cẩu', description: 'Nước dùng thanh ngọt từ các loại nấm rừng', price: 350000 },
      { id: 'm3', name: 'Đậu Hũ Tứ Xuyên Chay', description: 'Đậu hũ non sốt cay mặn đậm đà', price: 95000 },
    ],
    reviews: [
      { id: 'r1', author: 'Thảo Nhi', rating: 5, date: '2023-11-20', content: 'Không gian quá tuyệt vời, nhiều cây xanh mát mẻ đúng chuẩn Eco-friendly. Đồ ăn trang trí đẹp và ngon miệng.' },
    ],
  }
];
