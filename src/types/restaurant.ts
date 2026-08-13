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
  author: string;
  rating: number;
  date: string;
  content: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  images?: string[];
  rating: number | string;
  reviewCount?: number;
  address: string;
  phone: string;
  openTime: string;
  closeTime: string;
  cuisineTypes: string[];
  menu: MenuItem[];
  reviews: Review[];
  lat?: number;
  lng?: number;
}
