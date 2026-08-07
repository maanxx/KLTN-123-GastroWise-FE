import type { Coordinate } from './itinerary';

/**
 * Quán ăn / nhà hàng
 */
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  phone?: string;
  images: string[];
  coverImage: string;
  rating: number;
  totalReviews: number;
  priceRange: PriceRange;
  cuisineTypes: string[];
  openingHours: OpeningHours[];
  coordinate: Coordinate;
  isOpen?: boolean;
  distance?: number; // mét, từ vị trí hiện tại
}

/**
 * Khoảng giá
 */
export interface PriceRange {
  min: number;
  max: number;
  label: string; // "50k - 150k"
}

/**
 * Giờ mở cửa
 */
export interface OpeningHours {
  dayOfWeek: number; // 0 = CN, 1 = T2...
  openTime: string;  // "08:00"
  closeTime: string; // "22:00"
}

/**
 * Món ăn trong menu
 */
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
}

/**
 * Đánh giá từ người dùng
 */
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}
