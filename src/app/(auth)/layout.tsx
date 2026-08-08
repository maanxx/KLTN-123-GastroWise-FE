import { UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '@/lib/constants';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-white dark:bg-slate-950">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8 flex flex-col items-center lg:items-start">
            <Link href={ROUTES.HOME} className="flex items-center gap-2 lg:hidden mb-8 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 transition-transform group-hover:scale-105 dark:bg-primary-900/30 dark:text-primary-500">
                <UtensilsCrossed className="h-6 w-6" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Gastro<span className="text-primary-500">Wise</span>
              </span>
            </Link>
          </div>
          {children}
        </div>
      </div>

      {/* Right side - Image Cover (Hidden on mobile) */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 bg-primary-900/40 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent z-20" />
        <div className="absolute inset-0 flex items-center justify-center text-white z-30 p-12">
          <div className="max-w-md text-center">
            <h2 className="font-heading text-4xl font-bold tracking-tight">Trải nghiệm ẩm thực hoàn hảo</h2>
            <p className="mt-4 text-lg text-primary-50">
              Khám phá hàng ngàn quán ăn ngon tại TP.HCM được AI gợi ý riêng theo sở thích của bạn.
            </p>
          </div>
        </div>
        {/* Optimized background image using next/image */}
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800">
          <Image
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="GastroWise Auth Background"
            fill
            sizes="50vw"
            priority
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
