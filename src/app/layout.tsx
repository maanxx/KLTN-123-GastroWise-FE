import type { Metadata } from 'next';

import { AiChatWidget } from '@/components/features/ai/AiChatWidget';
import { Footer, Navbar } from '@/components/layout';

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
      <body className="flex min-h-screen flex-col bg-primary-50/30 antialiased dark:bg-primary-950">
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <AiChatWidget />
      </body>
    </html>
  );
}
