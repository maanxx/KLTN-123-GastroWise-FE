import { APP_CONFIG } from '@/lib/constants';

/**
 * Format số tiền sang VND
 * @example formatCurrency(150000) → "150.000 ₫"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(APP_CONFIG.LOCALE, {
    style: 'currency',
    currency: APP_CONFIG.CURRENCY,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format ngày tháng tiếng Việt
 * @example formatDate('2024-01-15') → "15 tháng 1, 2024"
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat(APP_CONFIG.LOCALE, {
    dateStyle: 'long',
  }).format(new Date(date));
}

/**
 * Format ngày tháng ngắn gọn
 * @example formatDateShort('2024-01-15') → "15/01/2024"
 */
export function formatDateShort(date: string | Date): string {
  return new Intl.DateTimeFormat(APP_CONFIG.LOCALE, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

/**
 * Format thời gian
 * @example formatTime('2024-01-15T14:30:00') → "14:30"
 */
export function formatTime(date: string | Date): string {
  return new Intl.DateTimeFormat(APP_CONFIG.LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(date));
}

/**
 * Format khoảng cách (mét → km)
 * @example formatDistance(1500) → "1.5 km"
 * @example formatDistance(800) → "800 m"
 */
export function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }
  return `${Math.round(meters)} m`;
}

/**
 * Format rating (1-5)
 * @example formatRating(4.5) → "4.5"
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/**
 * Rút gọn text
 * @example truncate('Hello World', 5) → "Hello..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Tạo initials từ tên (cho avatar)
 * @example getInitials('Nguyễn Văn A') → "NA"
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
