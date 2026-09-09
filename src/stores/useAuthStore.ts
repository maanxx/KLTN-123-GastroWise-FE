import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Cập nhật theo type thực tế từ BE & Google OAuth
export interface User {
  id: string;
  email: string;
  fullName: string;
  full_name?: string;
  username?: string;
  avatar?: string;
  picture?: string;
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
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
