/**
 * AppError — Lớp lỗi tùy chỉnh dùng xuyên suốt app
 * Giúp phân biệt lỗi từ app vs lỗi hệ thống
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;
  public readonly timestamp: Date;

  constructor(
    statusCode: number,
    message: string,
    code: string = 'UNKNOWN_ERROR',
    details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.timestamp = new Date();

    // Đảm bảo instanceof hoạt động đúng
    Object.setPrototypeOf(this, AppError.prototype);
  }

  /**
   * Kiểm tra có phải lỗi mạng không
   */
  isNetworkError(): boolean {
    return this.code === 'NETWORK_ERROR';
  }

  /**
   * Kiểm tra có phải lỗi authentication không
   */
  isAuthError(): boolean {
    return this.statusCode === 401 || this.code === 'AUTH_EXPIRED';
  }

  /**
   * Chuyển thành object để log/serialize
   */
  toJSON() {
    return {
      name: this.name,
      statusCode: this.statusCode,
      message: this.message,
      code: this.code,
      details: this.details,
      timestamp: this.timestamp.toISOString(),
    };
  }
}
