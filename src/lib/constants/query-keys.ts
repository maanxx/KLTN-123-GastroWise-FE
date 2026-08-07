/**
 * React Query key factory — quản lý tập trung tất cả query keys
 * Tránh trùng key, dễ invalidate cache
 *
 * Import: import { QUERY_KEYS } from '@/lib/constants';
 *
 * @example
 * useQuery({ queryKey: QUERY_KEYS.itinerary.all, queryFn: ... })
 * queryClient.invalidateQueries({ queryKey: QUERY_KEYS.itinerary.all })
 */
export const QUERY_KEYS = {
  // Auth
  auth: {
    user: ['auth', 'user'] as const,
    session: ['auth', 'session'] as const,
  },

  // Sở thích
  preferences: {
    current: ['preferences'] as const,
    cuisineTypes: ['preferences', 'cuisineTypes'] as const,
  },

  // Lộ trình
  itinerary: {
    all: ['itinerary'] as const,
    list: (filters?: Record<string, unknown>) => ['itinerary', 'list', filters] as const,
    detail: (id: string) => ['itinerary', 'detail', id] as const,
  },

  // Quán ăn
  restaurant: {
    all: ['restaurant'] as const,
    detail: (id: string) => ['restaurant', 'detail', id] as const,
    reviews: (id: string) => ['restaurant', 'reviews', id] as const,
    menu: (id: string) => ['restaurant', 'menu', id] as const,
  },

  // Lịch sử
  history: {
    all: ['history'] as const,
    list: (page: number) => ['history', 'list', page] as const,
  },

  // Thống kê
  statistics: {
    overview: ['statistics', 'overview'] as const,
    topCuisines: ['statistics', 'topCuisines'] as const,
    budgetAnalysis: ['statistics', 'budget'] as const,
  },
} as const;
