/**
 * Helper quản lý Storage linh hoạt cho localStorage & sessionStorage
 * Xử lý SSR (server-side rendering) và đồng bộ phiên làm việc đa tab (Single Session)
 */

export const AUTH_TOKEN_KEY = 'token';
export const REMEMBERED_EMAIL_KEY = 'gastrowise_remembered_email';
export const AUTH_BROADCAST_CHANNEL = 'gastrowise_auth_channel';

// Unique Tab ID ngẫu nhiên cho phiên tab hiện tại
export const CURRENT_TAB_ID = typeof window !== 'undefined' 
  ? Math.random().toString(36).substring(2, 15) 
  : 'server';

/**
 * Lấy Token đăng nhập từ localStorage hoặc sessionStorage
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Lưu Token theo chế độ Remember Me
 * @param token Chuỗi AccessToken
 * @param rememberMe true: lưu localStorage (lâu dài), false: lưu sessionStorage (tạm thời)
 */
export function setAuthToken(token: string, rememberMe: boolean = true): void {
  if (typeof window === 'undefined') return;
  if (rememberMe) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  } else {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

/**
 * Xóa Token khỏi cả 2 storage khi Đăng xuất
 */
export function removeAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
}

/**
 * Phát tín hiệu Broadcast cho các Tab khác khi Đăng nhập / Đăng xuất
 */
export function broadcastAuthEvent(type: 'LOGIN' | 'LOGOUT', userId?: string): void {
  if (typeof window === 'undefined') return;
  try {
    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel(AUTH_BROADCAST_CHANNEL);
      channel.postMessage({ 
        type, 
        userId, 
        senderTabId: CURRENT_TAB_ID,
        timestamp: Date.now() 
      });
      channel.close();
    }
  } catch (err) {
    console.warn('BroadcastChannel error:', err);
  }
}

/**
 * Lấy giá trị từ localStorage
 */
export function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key) || sessionStorage.getItem(key);
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
    console.warn(`Không thể lưu vào storage: ${key}`);
  }
}

/**
 * Xóa giá trị từ localStorage
 */
export function removeStorageItem(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
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
  removeAuthToken();
}
