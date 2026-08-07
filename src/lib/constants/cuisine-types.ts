/**
 * Danh sách loại ẩm thực — tập trung vào TP.HCM
 * Dùng trong PreferenceForm, filter, statistics
 */
export const CUISINE_TYPES = [
  { id: 'viet', label: 'Món Việt', icon: '🇻🇳', description: 'Phở, bún, cơm tấm, bánh mì...' },
  { id: 'street-food', label: 'Ẩm thực đường phố', icon: '🍜', description: 'Hủ tiếu, bún bò, gỏi cuốn...' },
  { id: 'japan', label: 'Món Nhật', icon: '🇯🇵', description: 'Sushi, ramen, tempura...' },
  { id: 'korea', label: 'Món Hàn', icon: '🇰🇷', description: 'BBQ, bibimbap, tteokbokki...' },
  { id: 'china', label: 'Món Trung', icon: '🇨🇳', description: 'Dimsum, lẩu, mì xào...' },
  { id: 'thai', label: 'Món Thái', icon: '🇹🇭', description: 'Tom yum, pad thai, som tam...' },
  { id: 'italian', label: 'Món Ý', icon: '🇮🇹', description: 'Pizza, pasta, risotto...' },
  { id: 'western', label: 'Món Tây', icon: '🍔', description: 'Steak, burger, salad...' },
  { id: 'dessert', label: 'Tráng miệng', icon: '🍰', description: 'Chè, kem, bánh ngọt...' },
  { id: 'cafe', label: 'Cafe & Đồ uống', icon: '☕', description: 'Cà phê, trà sữa, sinh tố...' },
  { id: 'vegetarian', label: 'Chay', icon: '🥗', description: 'Cơm chay, bún chay, lẩu chay...' },
  { id: 'seafood', label: 'Hải sản', icon: '🦐', description: 'Tôm, cua, cá, mực...' },
] as const;

export type CuisineTypeId = (typeof CUISINE_TYPES)[number]['id'];

/**
 * Khung thời gian cho lộ trình
 */
export const TIME_SLOTS = [
  { id: 'morning', label: 'Buổi sáng', timeRange: '06:00 - 11:00', icon: '🌅' },
  { id: 'lunch', label: 'Buổi trưa', timeRange: '11:00 - 14:00', icon: '☀️' },
  { id: 'afternoon', label: 'Buổi chiều', timeRange: '14:00 - 17:00', icon: '🌤️' },
  { id: 'dinner', label: 'Buổi tối', timeRange: '17:00 - 21:00', icon: '🌆' },
  { id: 'night', label: 'Khuya', timeRange: '21:00 - 02:00', icon: '🌙' },
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
