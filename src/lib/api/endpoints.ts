/**
 * Tất cả API endpoints — tập trung 1 nơi
 * Khi API Gateway URL thay đổi, chỉ sửa ở đây
 */
export const API_ENDPOINTS = {
  // Auth
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
  },

  // Preferences
  preferences: {
    save: '/preferences',
    get: '/preferences',
    cuisineTypes: '/preferences/cuisine-types',
  },

  // Itinerary
  itinerary: {
    generate: '/itineraries/generate',
    list: '/itineraries',
    detail: (id: string) => `/itineraries/${id}`,
    save: (id: string) => `/itineraries/${id}/save`,
    rate: (id: string) => `/itineraries/${id}/rate`,
  },

  // Restaurant
  restaurant: {
    list: '/restaurants',
    detail: (id: string) => `/restaurants/${id}`,
    menu: (id: string) => `/restaurants/${id}/menu`,
    reviews: (id: string) => `/restaurants/${id}/reviews`,
    addReview: (id: string) => `/restaurants/${id}/reviews`,
  },

  // History
  history: {
    list: '/history',
    detail: (id: string) => `/history/${id}`,
    delete: (id: string) => `/history/${id}`,
  },

  // Statistics
  statistics: {
    overview: '/statistics/overview',
    topCuisines: '/statistics/top-cuisines',
    budgetAnalysis: '/statistics/budget-analysis',
  },
} as const;
