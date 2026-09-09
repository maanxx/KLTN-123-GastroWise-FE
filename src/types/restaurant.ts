export type PriceRange = string | { min: number; max: number; label: string };

export type OpeningHours = { open: string; close: string } | { dayOfWeek: number; openTime: string; closeTime: string }[];

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  imageUrl?: string;
  isPopular?: boolean;
}

export interface Review {
  id: string;
  author?: string;
  userName?: string;
  userAvatar?: string;
  rating: number;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  content?: string;
  comment?: string;
  userId?: string;
}

export interface Restaurant {
  id: string;
  slug?: string;
  name: string;
  description: string;
  coverImage: string;
  images?: string[];
  rating: number | string;
  reviewCount?: number;
  totalReviews?: number;
  address: string;
  phone?: string;
  openTime?: string;
  closeTime?: string;
  openingHours?: OpeningHours;
  priceRange?: PriceRange;
  cuisineTypes?: string[];
  menu?: MenuItem[];
  reviews?: Review[];
  coordinate?: { latitude: number; longitude: number };
  lat?: number;
  lng?: number;
  isOpen?: boolean;
}
