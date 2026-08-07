/**
 * Tất cả route paths trong app — một nơi duy nhất quản lý
 * Import: import { ROUTES } from '@/lib/constants';
 */
export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  // Main app (cần auth)
  PREFERENCES: '/preferences',
  ITINERARY: '/itinerary',
  ITINERARY_DETAIL: (id: string) => `/itinerary/${id}` as const,
  RESTAURANT: (id: string) => `/restaurant/${id}` as const,
  HISTORY: '/history',
  STATISTICS: '/statistics',
  PROFILE: '/profile',
} as const;

/**
 * Danh sách routes không cần đăng nhập
 */
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
] as const;

/**
 * Danh sách routes cần đăng nhập
 */
export const PROTECTED_ROUTES = [
  ROUTES.PREFERENCES,
  ROUTES.ITINERARY,
  ROUTES.HISTORY,
  ROUTES.STATISTICS,
  ROUTES.PROFILE,
] as const;
