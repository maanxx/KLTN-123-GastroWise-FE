import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'GastroWise — Trải nghiệm ẩm thực thông minh',
    template: '%s | GastroWise',
  },
  description:
    'Hệ thống trải nghiệm ẩm thực thông minh tại TP.HCM. Nhập sở thích, thời gian, ngân sách — nhận lộ trình ăn uống tối ưu.',
  keywords: ['ẩm thực', 'TP.HCM', 'lộ trình ăn uống', 'GastroWise', 'food', 'restaurant'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen bg-white antialiased dark:bg-slate-950">{children}</body>
    </html>
  );
}
