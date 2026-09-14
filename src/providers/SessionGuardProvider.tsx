'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/useAuthStore';
import { AUTH_BROADCAST_CHANNEL, AUTH_TOKEN_KEY, CURRENT_TAB_ID, getAuthToken, removeAuthToken } from '@/lib/utils/storage';

export function SessionGuardProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Lắng nghe qua BroadcastChannel API (Đa Tab realtime)
    let channel: BroadcastChannel | null = null;
    try {
      if ('BroadcastChannel' in window) {
        channel = new BroadcastChannel(AUTH_BROADCAST_CHANNEL);
        channel.onmessage = (event) => {
          const { type, userId, senderTabId } = event.data || {};
          
          // Bỏ qua tin nhắn phát ra từ chính TAB hiện tại
          if (senderTabId === CURRENT_TAB_ID) return;

          if (type === 'LOGIN') {
            // Nếu Tab khác đăng nhập tài khoản khác
            if (user && userId && user.id !== userId) {
              logout();
              removeAuthToken();
              toast.warning('Tài khoản của bạn vừa được đăng nhập từ một phiên làm việc khác. Bạn đã bị đăng xuất khỏi phiên này để bảo mật!');
              router.replace('/login');
            }
          } else if (type === 'LOGOUT') {
            logout();
            removeAuthToken();
            toast.info('Phiên làm việc đã đăng xuất ở tab khác.');
            router.replace('/login');
          }
        };
      }
    } catch (err) {
      console.warn('BroadcastChannel initialization error:', err);
    }

    // 2. Lắng nghe qua sự kiện storage (Fallback cho trình duyệt cũ)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === AUTH_TOKEN_KEY && e.newValue === null) {
        logout();
        if (!window.location.pathname.startsWith('/login')) {
          toast.info('Phiên làm việc đã bị hủy.');
          router.replace('/login');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [user, logout, router]);

  return <>{children}</>;
}
