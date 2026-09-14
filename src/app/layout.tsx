import type { Metadata } from 'next';

import { AiChatWidget } from '@/components/features/ai/AiChatWidget';
import { Footer, Navbar } from '@/components/layout';
import { QueryProvider } from '@/providers/QueryProvider';
import { SessionGuardProvider } from '@/providers/SessionGuardProvider';
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
          <SessionGuardProvider>
            <Navbar />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
            <AiChatWidget />
          </SessionGuardProvider>
        </QueryProvider>
        <Toaster 
          position="top-right" 
          visibleToasts={3}
          closeButton
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: 'group flex items-center rounded-2xl overflow-hidden w-full max-w-sm shadow-2xl text-white relative border border-white/15 p-3.5 gap-3 transition-all',
              title: 'font-semibold text-xs sm:text-sm flex-1 leading-snug pr-7',
              description: 'text-white/80 text-xs mt-0.5 pr-7',
              icon: 'flex items-center justify-center w-8 h-8 shrink-0 rounded-xl bg-black/20 text-white',
              closeButton: 'absolute right-2.5 top-3 text-white/70 hover:text-white hover:bg-black/20 p-1 rounded-full transition-colors flex items-center justify-center w-6 h-6',
              success: 'bg-emerald-600',
              error: 'bg-rose-600',
              info: 'bg-sky-600',
              warning: 'bg-amber-600',
            }
          }} 
        />
      </body>
    </html>
  );
}
