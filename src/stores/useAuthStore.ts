import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Sẽ cập nhật theo type thực tế từ BE
export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // Tên lưu trong localStorage
      // Không lưu các trường quá nhạy cảm hoặc token (token lưu ở cookie)
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
