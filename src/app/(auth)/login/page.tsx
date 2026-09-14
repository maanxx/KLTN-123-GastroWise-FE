'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

import { Button, Input } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import { loginSchema } from '@/lib/validation/auth.schema';
import type { LoginFormData } from '@/lib/validation/auth.schema';
import { useLoginMutation } from '@/hooks/queries/useAuth';
import { useAuthStore } from '@/stores/useAuthStore';
import { getAuthToken, setAuthToken, broadcastAuthEvent, REMEMBERED_EMAIL_KEY } from '@/lib/utils/storage';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const loginMutation = useLoginMutation();
  const { isAuthenticated, login: setLoginState, logout } = useAuthStore();
  
  const [rememberMe, setRememberMe] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Redirect Guard: Chỉ redirect về '/' khi CẢ state authenticated VÀ token thực tế đều tồn tại!
  // Tránh triệt để lỗi Infinite Loop giữa '/' và '/login'
  useEffect(() => {
    const existingToken = getAuthToken();
    if (isAuthenticated && existingToken) {
      router.replace('/');
    } else if (!existingToken && isAuthenticated) {
      logout(); // Dọn dẹp state rác nếu không còn token
    }
  }, [isAuthenticated, logout, router]);

  // Đọc email đã ghi nhớ từ localStorage nếu có
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY);
      if (savedEmail) {
        setValue('email', savedEmail);
        setRememberMe(true);
      }
    }
  }, [setValue]);

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: (response: any) => {
        if (response && response.user && response.token) {
          // Lưu Token linh hoạt theo Remember Me (localStorage vs sessionStorage)
          setAuthToken(response.token, rememberMe);
          
          if (rememberMe) {
            localStorage.setItem(REMEMBERED_EMAIL_KEY, data.email);
          } else {
            localStorage.removeItem(REMEMBERED_EMAIL_KEY);
          }

          // Cập nhật State Zustand
          setLoginState(response.user);

          // Broadcast Event thông báo đăng nhập cho các Tab khác
          broadcastAuthEvent('LOGIN', response.user.id);

          toast.success((t('login.success') as string) || 'Đăng nhập thành công!');
          router.replace('/');
        }
      },
      onError: (error: any) => {
        toast.error(error?.message || (t('login.fail') as string) || 'Đăng nhập thất bại!');
      },
    });
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t('login.welcome_back')}
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {t('login.description')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label={t('login.email') as string}
          type="email"
          placeholder="name@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        
        <div className="space-y-1">
          <Input
            label={t('login.password') as string}
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
          
          {/* Checkbox Ghi nhớ mật khẩu */}
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              />
              <span>Ghi nhớ đăng nhập</span>
            </label>

            <Link href="/forgot-password" className="text-xs font-medium text-primary-600 hover:text-primary-500">
              {t('login.forgot_password')}
            </Link>
          </div>
        </div>

        <Button type="submit" className="w-full" isLoading={isSubmitting || loginMutation.isPending}>
          {t('login.submit')}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300 dark:border-slate-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
              Hoặc tiếp tục với
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:3001'}/auth/google`}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:3001'}/auth/facebook`}
          >
            <svg className="mr-2 h-4 w-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </Button>
        </div>
      </div>

      <div className="mt-8 mb-6 pb-2 text-center text-sm text-slate-600 dark:text-slate-400">
        {t('login.no_account')}{' '}
        <Link href={ROUTES.REGISTER} className="font-semibold text-primary-600 hover:text-primary-500">
          {t('login.register_now')}
        </Link>
      </div>
    </>
  );
}
