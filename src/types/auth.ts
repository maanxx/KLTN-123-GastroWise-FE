/**
 * Người dùng
 */
export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Tokens xác thực
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Response đăng nhập
 */
export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

/**
 * Trạng thái auth trong context
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
