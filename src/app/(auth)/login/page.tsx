'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import { loginSchema } from '@/lib/validation/auth.schema';
import type { LoginFormData } from '@/lib/validation/auth.schema';
import { useLoginMutation } from '@/hooks/queries/useAuth';
import { useAuthStore } from '@/stores/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const setLoginState = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: (response: any) => {
        if (response && response.user && response.token) {
          // Lưu token vào localStorage để gửi kèm Header
          localStorage.setItem('token', response.token);
          setLoginState(response.user);
          router.push('/');
        }
      },
      onError: (error: any) => {
        alert(error?.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
      },
    });
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Chào mừng trở lại
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Đăng nhập vào tài khoản GastroWise của bạn
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="name@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        
        <div className="space-y-1">
          <Input
            label="Mật khẩu"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
          <div className="flex justify-end">
            <Link href="#" className="text-xs font-medium text-primary-600 hover:text-primary-500">
              Quên mật khẩu?
            </Link>
          </div>
        </div>

        <Button type="submit" className="w-full" isLoading={isSubmitting || loginMutation.isPending}>
          Đăng nhập
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
        Chưa có tài khoản?{' '}
        <Link href={ROUTES.REGISTER} className="font-semibold text-primary-600 hover:text-primary-500">
          Đăng ký ngay
        </Link>
      </div>
    </>
  );
}
