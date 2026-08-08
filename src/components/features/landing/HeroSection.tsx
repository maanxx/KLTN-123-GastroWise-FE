import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/constants';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-32 lg:pt-40">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-50 via-white to-white dark:from-primary-950/20 dark:via-slate-950 dark:to-slate-950" />
      
      <div className="container-app relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex animate-fade-in items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-medium text-primary-600 dark:border-primary-900 dark:bg-primary-900/30 dark:text-primary-300">
            <Sparkles className="mr-2 h-4 w-4" /> Hệ thống gợi ý ẩm thực thông minh số 1 TP.HCM
          </div>
          
          <h1 className="animate-slide-up font-heading text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
            Khám phá ẩm thực Sài Gòn <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              thông minh & tối ưu
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl animate-slide-up text-lg text-slate-600 sm:text-xl dark:text-slate-400" style={{ animationDelay: '100ms' }}>
            Không còn phải đau đầu suy nghĩ &quot;Hôm nay ăn gì?&quot;. Hãy để AI của chúng tôi thiết kế lộ trình ăn uống hoàn hảo dựa trên sở thích, ngân sách và thời gian của bạn.
          </p>
          
          <div className="mt-10 flex animate-slide-up flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: '200ms' }}>
            <Link href={ROUTES.PREFERENCES}>
              <Button size="lg" className="w-full sm:w-auto">
                Tạo lộ trình ngay
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Tìm hiểu thêm
              </Button>
            </Link>
          </div>
        </div>

        {/* Optimized Hero image using next/image */}
        <div className="mx-auto mt-16 max-w-5xl animate-scale-in sm:mt-24" style={{ animationDelay: '300ms' }}>
          <div className="relative aspect-[2/1] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <Image
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="GastroWise App Interface"
              fill
              priority
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            {/* Glass reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 via-transparent to-transparent mix-blend-overlay" />
          </div>
        </div>
      </div>
    </section>
  );
}
