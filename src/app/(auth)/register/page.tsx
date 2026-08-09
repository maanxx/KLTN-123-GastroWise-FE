'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import { registerSchema, type RegisterFormData } from '@/lib/validation/auth.schema';
import { useRegisterMutation } from '@/hooks/queries/useAuth';
import { useAuthStore } from '@/stores/useAuthStore';

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegisterMutation();
  const setLoginState = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    const { confirm_password, ...submitData } = data;
    
    registerMutation.mutate(submitData, {
      onSuccess: (response: any) => {
        if (response && response.user && response.token) {
          localStorage.setItem('token', response.token);
          setLoginState(response.user);
          router.push('/');
        }
      },
      onError: (error: any) => {
        alert(error?.message || 'Đăng ký thất bại. Email có thể đã tồn tại.');
      },
    });
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Tạo tài khoản mới
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Gia nhập cộng đồng sành ăn GastroWise
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Họ và tên"
          placeholder="Nguyễn Văn A"
          error={errors.full_name?.message}
          {...register('full_name')}
        />
        
        <Input
          label="Email"
          type="email"
          placeholder="name@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Số điện thoại"
          type="tel"
          placeholder="0912345678"
          error={errors.phone?.message}
          {...register('phone')}
        />
        
        <Input
          label="Mật khẩu"
          type="password"
          placeholder="Tối thiểu 6 ký tự"
          error={errors.password?.message}
          {...register('password')}
        />
        
        <Input
          label="Xác nhận mật khẩu"
          type="password"
          placeholder="Nhập lại mật khẩu"
          error={errors.confirm_password?.message}
          {...register('confirm_password')}
        />

        <Button type="submit" className="w-full" isLoading={isSubmitting || registerMutation.isPending}>
          Đăng ký
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
        Đã có tài khoản?{' '}
        <Link href={ROUTES.LOGIN} className="font-semibold text-primary-600 hover:text-primary-500">
          Đăng nhập
        </Link>
      </div>
    </>
  );
}
