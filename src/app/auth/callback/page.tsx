'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/useAuthStore';
import { axiosClient } from '@/lib/api/axiosClient';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setLoginState = useAuthStore((state) => state.login);

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken) {
      localStorage.setItem('token', accessToken);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      // Lấy thông tin user
      axiosClient.get('/auth/profile')
        .then((user: any) => {
          setLoginState(user);
          toast.success('Đăng nhập thành công!');
          router.push('/');
        })
        .catch(() => {
          toast.error('Có lỗi xảy ra khi lấy thông tin người dùng.');
          router.push('/login');
        });
    } else {
      toast.error('Đăng nhập thất bại.');
      router.push('/login');
    }
  }, [searchParams, router, setLoginState]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        <p className="text-sm text-slate-600">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
}
