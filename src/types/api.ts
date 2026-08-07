/**
 * Generic API response wrapper — tất cả API đều trả về format này
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: PaginationMeta;
}

/**
 * Metadata phân trang
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * API Error response
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  code: string;
  statusCode: number;
  details?: unknown;
}

/**
 * Query params cho list endpoints
 */
export interface ListQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
