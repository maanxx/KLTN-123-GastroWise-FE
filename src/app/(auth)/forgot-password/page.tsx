'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, KeyRound, Mail, ShieldCheck, QrCode } from 'lucide-react';

import { Button, Input } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import { apiClient } from '@/lib/api/client';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [method, setMethod] = useState<'EMAIL' | '2FA'>('EMAIL');

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'REQUEST' | 'RESET'>('REQUEST');

  // Reset password states
  const [otp, setOtp] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 1. Gửi Yêu Cầu Khôi Phục qua Email (POST /auth/forgot-password)
  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Vui lòng nhập địa chỉ Email!');
      return;
    }

    try {
      setIsLoading(true);
      const res: any = await apiClient.post('/auth/forgot-password', { email });
      toast.success(res?.message || 'Mã xác minh OTP đã được gửi tới email của bạn!');
      setStep('RESET');
    } catch (err: any) {
      toast.error(err?.message || 'Email không tồn tại trong hệ thống!');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Đặt Lại Mật Khẩu Mới bằng Email OTP (POST /auth/reset-password)
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error('Vui lòng nhập mã OTP xác thực!');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error('Mật khẩu mới phải có ít nhất 6 ký tự!');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    try {
      setIsLoading(true);
      const res: any = await apiClient.post('/auth/reset-password', {
        email,
        otp,
        newPassword,
      });
      toast.success(res?.message || 'Đặt lại mật khẩu thành công! Vui lòng đăng nhập.');
      router.push(ROUTES.LOGIN);
    } catch (err: any) {
      toast.error(err?.message || 'Đặt lại mật khẩu thất bại. Mã OTP không chính xác.');
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Đặt Lại Mật Khẩu Mới bằng Google Authenticator 2FA TOTP (POST /auth/2fa/reset-password)
  const handleResetPassword2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !totpCode.trim()) {
      toast.error('Vui lòng nhập đầy đủ Email và Mã 2FA 6 chữ số!');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error('Mật khẩu mới phải có ít nhất 6 ký tự!');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    try {
      setIsLoading(true);
      const res: any = await apiClient.post('/auth/2fa/reset-password', {
        email,
        totpCode,
        newPassword,
      });
      toast.success(res?.message || 'Đặt lại mật khẩu bằng Google Authenticator thành công!');
      router.push(ROUTES.LOGIN);
    } catch (err: any) {
      toast.error(err?.message || 'Mã Google Authenticator không đúng hoặc tài khoản chưa bật 2FA!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <Link
          href={ROUTES.LOGIN}
          className="inline-flex items-center gap-2.5 text-sm font-bold text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 mb-6 group transition-colors"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 group-hover:bg-primary-50 group-hover:text-primary-600 border border-slate-200/80 dark:border-slate-700 transition-all">
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </div>
          <span>Quay lại Đăng nhập</span>
        </Link>

        <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
          <KeyRound className="w-8 h-8 text-primary-500" />
          Khôi phục mật khẩu
        </h1>

        {/* Tab Chuyển Đổi Phương Thức Khôi Phục */}
        <div className="mt-5 grid grid-cols-2 p-1.5 bg-slate-100/90 dark:bg-slate-800/80 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => {
              setMethod('EMAIL');
              setStep('REQUEST');
            }}
            className={`py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${
              method === 'EMAIL'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4 shrink-0 text-primary-500" />
            <span className="truncate">Email OTP</span>
          </button>
          <button
            type="button"
            onClick={() => setMethod('2FA')}
            className={`py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${
              method === '2FA'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4 shrink-0 text-emerald-500" />
            <span className="truncate">Google 2FA</span>
          </button>
        </div>
      </div>

      {/* PHƯƠNG THỨC 1: XÁC THỰC QUA EMAIL OTP */}
      {method === 'EMAIL' && (
        <>
          {step === 'REQUEST' ? (
            <form onSubmit={handleRequestReset} className="space-y-5">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Nhập địa chỉ Email đăng ký của bạn. Hệ thống sẽ gửi mã xác minh OTP qua Email.
              </p>
              <Input
                label="Địa chỉ Email *"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon={<Mail className="w-4 h-4 text-slate-400" />}
              />

              <Button type="submit" className="w-full" isLoading={isLoading}>
                Gửi mã xác minh qua Email
              </Button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-2xl text-xs text-sky-800 flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-sky-600" />
                <span>Mã xác minh OTP đã được gửi tới <strong>{email}</strong>. Vui lòng kiểm tra Hộp thư.</span>
              </div>

              <Input
                label="Mã xác minh OTP *"
                type="text"
                placeholder="Nhập 6 chữ số OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />

              <Input
                label="Mật khẩu mới *"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />

              <Input
                label="Xác nhận mật khẩu mới *"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <Button type="submit" className="w-full" isLoading={isLoading}>
                Cập nhật mật khẩu mới
              </Button>
            </form>
          )}
        </>
      )}

      {/* PHƯƠNG THỨC 2: XÁC THỰC QUA GOOGLE AUTHENTICATOR (2FA TOTP) */}
      {method === '2FA' && (
        <form onSubmit={handleResetPassword2FA} className="space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sử dụng 6 chữ số nhảy 30 giây/lần từ ứng dụng <strong>Google Authenticator</strong> hoặc Authy trên điện thoại của bạn.
          </p>

          <Input
            label="Địa chỉ Email *"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            icon={<Mail className="w-4 h-4 text-slate-400" />}
          />

          <Input
            label="Mã Google Authenticator (6 số) *"
            type="text"
            placeholder="Ví dụ: 849204"
            value={totpCode}
            onChange={(e) => setTotpCode(e.target.value)}
            required
            icon={<QrCode className="w-4 h-4 text-primary-500" />}
          />

          <Input
            label="Mật khẩu mới *"
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <Input
            label="Xác nhận mật khẩu mới *"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Đổi mật khẩu bằng Google Authenticator
          </Button>
        </form>
      )}
    </>
  );
}
