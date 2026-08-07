/**
 * App-level constants — cấu hình chung cho toàn app
 * KHÔNG chứa secrets, chỉ chứa config hiển thị
 */
export const APP_CONFIG = {
  APP_NAME: 'GastroWise',
  APP_DESCRIPTION: 'Hệ thống trải nghiệm ẩm thực thông minh',
  APP_TAGLINE: 'Khám phá ẩm thực TP.HCM — Thông minh & Tối ưu',

  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,

  // Budget constraints (VND)
  MIN_BUDGET: 50_000,       // 50k
  MAX_BUDGET: 5_000_000,    // 5 triệu
  BUDGET_STEP: 50_000,      // Bước nhảy 50k

  // Locale
  CURRENCY: 'VND',
  LOCALE: 'vi-VN',
  TIMEZONE: 'Asia/Ho_Chi_Minh',

  // API
  API_TIMEOUT: 15_000,      // 15 giây
  API_RETRY_COUNT: 3,

  // Token
  ACCESS_TOKEN_KEY: 'gastrowise_access_token',
  REFRESH_TOKEN_KEY: 'gastrowise_refresh_token',
  USER_KEY: 'gastrowise_user',
} as const;
