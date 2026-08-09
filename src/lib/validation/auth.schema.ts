import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email là bắt buộc').email('Email không đúng định dạng'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export const registerSchema = z.object({
  full_name: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
  email: z.string().min(1, 'Email là bắt buộc').email('Email không đúng định dạng'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ').optional(),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  confirm_password: z.string().min(6, 'Vui lòng xác nhận mật khẩu'),
}).refine((data) => data.password === data.confirm_password, {
  message: "Mật khẩu không khớp",
  path: ["confirm_password"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
