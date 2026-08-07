import { AppError } from './AppError';

/**
 * Wrapper try-catch cho async operations
 * Trả về tuple [data, error] giống Go-style error handling
 *
 * @example
 * const [data, error] = await tryCatch(() => api.getUser(id));
 * if (error) {
 *   toast.error(error.message);
 *   return;
 * }
 * // Sử dụng data an toàn
 */
export async function tryCatch<T>(
  fn: () => Promise<T>,
): Promise<[T, null] | [null, AppError]> {
  try {
    const result = await fn();
    return [result, null];
  } catch (error) {
    if (error instanceof AppError) {
      return [null, error];
    }

    if (error instanceof Error) {
      return [null, new AppError(500, error.message, 'UNEXPECTED_ERROR', error)];
    }

    return [null, new AppError(500, 'Đã xảy ra lỗi không xác định', 'UNKNOWN_ERROR', error)];
  }
}

/**
 * Tạo AppError từ HTTP response
 */
export function createApiError(
  status: number,
  message?: string,
  code?: string,
): AppError {
  const defaultMessages: Record<number, string> = {
    400: 'Yêu cầu không hợp lệ',
    401: 'Phiên đăng nhập đã hết hạn',
    403: 'Bạn không có quyền truy cập',
    404: 'Không tìm thấy dữ liệu',
    409: 'Dữ liệu bị xung đột',
    422: 'Dữ liệu không hợp lệ',
    429: 'Quá nhiều yêu cầu, vui lòng thử lại sau',
    500: 'Lỗi hệ thống, vui lòng thử lại sau',
    502: 'Server tạm thời không khả dụng',
    503: 'Dịch vụ đang bảo trì',
  };

  return new AppError(
    status,
    message || defaultMessages[status] || 'Đã xảy ra lỗi',
    code || `HTTP_${status}`,
  );
}
