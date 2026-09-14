import axios from 'axios';

import { APP_CONFIG } from '@/lib/constants';
import { AppError, ERROR_MESSAGES } from '@/lib/errors';
import { getAuthToken, removeAuthToken } from '@/lib/utils/storage';

/**
 * Axios instance — cấu hình tập trung cho tất cả API calls
 * Base URL lấy từ biến môi trường, KHÔNG hardcode
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL || '',
  timeout: APP_CONFIG.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Request Interceptor — tự gắn access token vào mọi request
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken() || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Response Interceptor — xử lý lỗi tập trung
 */
apiClient.interceptors.response.use(
  // Thành công: trả về response.data (bỏ wrapper axios)
  (response) => response.data,

  // Lỗi: chuyển thành AppError
  (error) => {
    // Lỗi mạng (không có response)
    if (!error.response) {
      throw new AppError(0, ERROR_MESSAGES.NETWORK, 'NETWORK_ERROR');
    }

    const { status, data } = error.response;

    if (status === 403) {
      const msg = data?.message || '';
      if (msg.toLowerCase().includes('khóa') || msg.toLowerCase().includes('banned')) {
        removeAuthToken();
        if (typeof window !== 'undefined') {
          alert(msg || 'Tài khoản của bạn đã bị khóa bởi Quản trị viên do vi phạm điều khoản.');
          window.location.href = '/login';
        }
      }
    }

    // Token hết hạn hoặc Phiên làm việc hết hạn/hợp lệ -> xoá token, redirect login
    if (status === 401) {
      removeAuthToken();

      // Chỉ redirect khi ở client-side
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }

      throw new AppError(401, ERROR_MESSAGES.AUTH_EXPIRED, 'AUTH_EXPIRED');
    }

    // Quá nhiều request
    if (status === 429) {
      throw new AppError(429, ERROR_MESSAGES.RATE_LIMIT, 'RATE_LIMIT');
    }

    // Lỗi server
    throw new AppError(
      status,
      data?.message || ERROR_MESSAGES.SERVER,
      data?.code || `HTTP_${status}`,
      data?.details,
    );
  },
);
