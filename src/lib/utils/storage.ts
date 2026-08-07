/**
 * Wrapper an toàn cho localStorage
 * Xử lý SSR (server-side rendering) và các lỗi parse
 */

/**
 * Lấy giá trị từ localStorage
 */
export function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const item = localStorage.getItem(key);
    if (item === null) return fallback;
    return JSON.parse(item) as T;
  } catch {
    return fallback;
  }
}

/**
 * Lưu giá trị vào localStorage
 */
export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full hoặc private mode
    // eslint-disable-next-line no-console
    console.warn(`Không thể lưu vào localStorage: ${key}`);
  }
}

/**
 * Xóa giá trị từ localStorage
 */
export function removeStorageItem(key: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore
  }
}

/**
 * Xóa tất cả dữ liệu GastroWise
 */
export function clearGastroWiseStorage(): void {
  if (typeof window === 'undefined') return;

  const keys = Object.keys(localStorage).filter((key) => key.startsWith('gastrowise_'));
  keys.forEach((key) => localStorage.removeItem(key));
}
