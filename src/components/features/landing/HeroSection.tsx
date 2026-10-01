'use client';

import { ArrowRight, MapPin, Sparkles, Star, Utensils } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import { useTranslation } from '@/hooks/useTranslation';

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-10 md:py-16 bg-gradient-to-b from-slate-50/90 via-emerald-50/20 to-slate-50/80 dark:from-slate-950 dark:via-emerald-950/10 dark:to-slate-950">
      {/* Soft Ambient Eye-Friendly Glow */}
      <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl dark:bg-emerald-600/10" />
      
      <div className="container-app relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Hero Copy & CTA */}
          <div className="lg:col-span-7 text-left">
            <div className="mb-4 inline-flex animate-fade-in items-center rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3.5 py-1 text-xs sm:text-sm font-semibold text-emerald-800 backdrop-blur-md dark:border-emerald-800/50 dark:bg-emerald-950/60 dark:text-emerald-300 shadow-sm">
              <Sparkles className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" /> {t('home.hero_badge')}
            </div>
            
            <h1 className="animate-slide-up font-heading text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl md:text-5xl lg:text-5xl dark:text-slate-100 leading-snug">
              {t('home.hero_title_1')}{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent block sm:inline">
                {t('home.hero_title_2')}
              </span>
            </h1>
            
            <p className="mt-4 animate-slide-up text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl" style={{ animationDelay: '100ms' }}>
              {t('home.hero_desc')}
            </p>
            
            <div className="mt-8 flex animate-slide-up flex-wrap items-center gap-3" style={{ animationDelay: '200ms' }}>
              <Link href={ROUTES.PREFERENCES}>
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-lg shadow-emerald-600/20 hover:from-emerald-700 hover:to-teal-700 rounded-2xl px-6">
                  {t('navbar.create_itinerary')}
                </Button>
              </Link>
              <Link href="#search-filter-section">
                <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 rounded-2xl px-6">
                  {t('home.hero_btn_explore')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Embedded Hero Food Image Card (Compact Vertical Height) */}
          <div className="lg:col-span-5 animate-scale-in" style={{ animationDelay: '300ms' }}>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-3 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 group">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80"
                  alt="Ẩm thực Sài Gòn Nổi Bật"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Floating Glass Stats Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-xl bg-white/80 px-3 py-1 text-xs font-bold text-slate-800 shadow-md backdrop-blur-md dark:bg-slate-900/80 dark:text-slate-100">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <span>4.9 / 5 (AI Rating)</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300">
                      <Utensils className="h-3 w-3" /> Đặc sản Sài Gòn
                    </span>
                    <h3 className="font-heading text-base font-extrabold text-white drop-shadow">
                      Lẩu & Nướng Đêm Chuẩn Vị
                    </h3>
                  </div>
                  <span className="rounded-full bg-emerald-600/90 px-2.5 py-1 text-[10px] font-bold backdrop-blur-md">
                    178+ Quán
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
