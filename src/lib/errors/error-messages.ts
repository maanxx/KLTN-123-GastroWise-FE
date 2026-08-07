/**
 * Các message lỗi tiếng Việt dùng chung trong toàn app
 * Import: import { ERROR_MESSAGES } from '@/lib/errors';
 */
export const ERROR_MESSAGES = {
  // Mạng
  NETWORK: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng.',
  TIMEOUT: 'Yêu cầu quá thời gian chờ. Vui lòng thử lại.',

  // Xác thực
  AUTH_EXPIRED: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
  AUTH_INVALID: 'Email hoặc mật khẩu không chính xác.',
  AUTH_REQUIRED: 'Vui lòng đăng nhập để tiếp tục.',

  // Phân quyền
  FORBIDDEN: 'Bạn không có quyền truy cập tài nguyên này.',

  // Dữ liệu
  NOT_FOUND: 'Không tìm thấy dữ liệu yêu cầu.',
  VALIDATION: 'Dữ liệu nhập không hợp lệ. Vui lòng kiểm tra lại.',
  CONFLICT: 'Dữ liệu đã tồn tại hoặc bị xung đột.',

  // Server
  SERVER: 'Lỗi hệ thống. Vui lòng thử lại sau.',
  MAINTENANCE: 'Hệ thống đang bảo trì. Vui lòng quay lại sau.',

  // Chung
  UNKNOWN: 'Đã xảy ra lỗi không xác định.',
  RATE_LIMIT: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng chờ một chút.',
} as const;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
