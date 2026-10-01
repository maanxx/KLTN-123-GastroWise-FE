import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Inter } from 'next/font/google';

import { AiChatWidget } from '@/components/features/ai/AiChatWidget';
import { Footer, Navbar } from '@/components/layout';
import { QueryProvider } from '@/providers/QueryProvider';
import { SessionGuardProvider } from '@/providers/SessionGuardProvider';
import { Toaster } from 'sonner';

import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-be-vietnam',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'GastroWise — Trải nghiệm ẩm thực thông minh',
    template: '%s | GastroWise',
  },
  description:
    'Hệ thống trải nghiệm ẩm thực thông minh tại TP.HCM. Nhập sở thích, thời gian, ngân sách — nhận lộ trình ăn uống tối ưu.',
  keywords: ['ẩm thực', 'TP.HCM', 'lộ trình ăn uống', 'GastroWise', 'food', 'restaurant'],
};

import { CartDrawer } from '@/components/layout/CartDrawer';
import { GastroBotWidget } from '@/components/layout/GastroBotWidget';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-primary-50/30 font-sans antialiased dark:bg-primary-950">
        <QueryProvider>
          <SessionGuardProvider>
            <Navbar />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
            <CartDrawer />
            <GastroBotWidget />
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
