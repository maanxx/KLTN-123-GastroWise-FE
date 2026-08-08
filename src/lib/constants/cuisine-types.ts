import React from 'react';
import { 
  Utensils, 
  MapPin, 
  ChefHat, 
  Coffee, 
  Pizza, 
  Soup, 
  Flame, 
  Croissant, 
  Fish, 
  Carrot, 
  Sun, 
  Moon, 
  Sunset, 
  Sunrise,
  CloudSun
} from 'lucide-react';

/**
 * Danh sách loại ẩm thực — tập trung vào TP.HCM
 * Dùng trong PreferenceForm, filter, statistics
 */
export const CUISINE_TYPES = [
  { id: 'viet', label: 'Món Việt', icon: React.createElement(Soup, { className: "h-8 w-8" }), description: 'Phở, bún, cơm tấm, bánh mì...' },
  { id: 'street-food', label: 'Ẩm thực đường phố', icon: React.createElement(MapPin, { className: "h-8 w-8" }), description: 'Hủ tiếu, bún bò, gỏi cuốn...' },
  { id: 'japan', label: 'Món Nhật', icon: React.createElement(Fish, { className: "h-8 w-8" }), description: 'Sushi, ramen, tempura...' },
  { id: 'korea', label: 'Món Hàn', icon: React.createElement(Flame, { className: "h-8 w-8" }), description: 'BBQ, bibimbap, tteokbokki...' },
  { id: 'china', label: 'Món Trung', icon: React.createElement(Utensils, { className: "h-8 w-8" }), description: 'Dimsum, lẩu, mì xào...' },
  { id: 'thai', label: 'Món Thái', icon: React.createElement(ChefHat, { className: "h-8 w-8" }), description: 'Tom yum, pad thai, som tam...' },
  { id: 'italian', label: 'Món Ý', icon: React.createElement(Pizza, { className: "h-8 w-8" }), description: 'Pizza, pasta, risotto...' },
  { id: 'western', label: 'Món Tây', icon: React.createElement(Utensils, { className: "h-8 w-8" }), description: 'Steak, burger, salad...' },
  { id: 'dessert', label: 'Tráng miệng', icon: React.createElement(Croissant, { className: "h-8 w-8" }), description: 'Chè, kem, bánh ngọt...' },
  { id: 'cafe', label: 'Cafe & Đồ uống', icon: React.createElement(Coffee, { className: "h-8 w-8" }), description: 'Cà phê, trà sữa, sinh tố...' },
  { id: 'vegetarian', label: 'Chay', icon: React.createElement(Carrot, { className: "h-8 w-8" }), description: 'Cơm chay, bún chay, lẩu chay...' },
  { id: 'seafood', label: 'Hải sản', icon: React.createElement(Fish, { className: "h-8 w-8" }), description: 'Tôm, cua, cá, mực...' },
] as const;

export type CuisineTypeId = (typeof CUISINE_TYPES)[number]['id'];

/**
 * Khung thời gian cho lộ trình
 */
export const TIME_SLOTS = [
  { id: 'morning', label: 'Buổi sáng', timeRange: '06:00 - 11:00', icon: React.createElement(Sunrise, { className: "h-6 w-6 text-orange-500" }) },
  { id: 'lunch', label: 'Buổi trưa', timeRange: '11:00 - 14:00', icon: React.createElement(Sun, { className: "h-6 w-6 text-yellow-500" }) },
  { id: 'afternoon', label: 'Buổi chiều', timeRange: '14:00 - 17:00', icon: React.createElement(CloudSun, { className: "h-6 w-6 text-sky-500" }) },
  { id: 'dinner', label: 'Buổi tối', timeRange: '17:00 - 21:00', icon: React.createElement(Sunset, { className: "h-6 w-6 text-orange-600" }) },
  { id: 'night', label: 'Khuya', timeRange: '21:00 - 02:00', icon: React.createElement(Moon, { className: "h-6 w-6 text-indigo-500" }) },
] as const;

export type TimeSlotId = (typeof TIME_SLOTS)[number]['id'];

/**
 * Các tuỳ chọn bổ sung
 */
export const DIETARY_OPTIONS = [
  { id: 'vegetarian', label: 'Ăn chay' },
  { id: 'halal', label: 'Halal' },
  { id: 'gluten-free', label: 'Không gluten' },
  { id: 'dairy-free', label: 'Không sữa' },
  { id: 'nut-allergy', label: 'Dị ứng đậu phộng' },
  { id: 'spicy', label: 'Thích ăn cay' },
  { id: 'no-spicy', label: 'Không ăn cay' },
] as const;
