import type { Metadata } from 'next';

import { AiChatWidget } from '@/components/features/ai/AiChatWidget';
import { Footer, Navbar } from '@/components/layout';
import { QueryProvider } from '@/providers/QueryProvider';
import { Toaster } from 'sonner';

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
        <QueryProvider>
          <Navbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
          <AiChatWidget />
        </QueryProvider>
        <Toaster 
          position="top-right" 
          visibleToasts={1}
          closeButton
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: 'group flex items-stretch rounded-md overflow-hidden w-full shadow-lg text-white relative items-center',
              title: 'font-medium text-sm py-3 px-4 flex-1',
              description: 'text-white/80 text-xs',
              icon: 'flex items-center justify-center w-12 shrink-0 m-0 rounded-none bg-black/15 text-white',
              closeButton: 'absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-black/10 p-1 rounded',
              success: 'bg-[#20c997]',
              error: 'bg-[#ff6b6b]',
              info: 'bg-[#3399ff]',
              warning: 'bg-[#fcc419]',
            }
          }} 
        />
      </body>
    </html>
  );
}
