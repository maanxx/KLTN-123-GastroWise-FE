'use client';

import { UtensilsCrossed, Phone, MapPin, MessageCircle } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/lib/constants';
import { useTranslation } from '@/hooks/useTranslation';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0a0a0a] text-slate-300 py-16 border-t border-slate-800">
      <div className="container-app">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link href={ROUTES.HOME} className="flex flex-col items-start group inline-block">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="h-8 w-8 text-primary-500" />
                <span className="font-heading text-2xl font-bold tracking-tight text-white">
                  Gastro<span className="text-primary-500">Wise</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 tracking-widest uppercase">Happy is for everyone</p>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              {t('footer.desc')}
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a href="tel:0909943237" className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg" title="Gọi ngay cho chúng tôi">
                <Phone className="w-4 h-4" />
              </a>
              <a href="https://zalo.me/g/pbfttv177" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg" title="Chat Zalo">
                <div className="font-bold text-[9px] leading-tight">Zalo</div>
              </a>
              <a href="https://m.me/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg" title="Chat Messenger">
                <MessageCircle className="w-4 h-4" />
              </a>
              <Link href="/contact" className="w-10 h-10 rounded-full bg-orange-400 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg" title="Xem địa chỉ">
                <MapPin className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Khám phá */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-6">{t('footer.explore')}</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm hover:text-primary-400 transition-colors">{t('navbar.about_us')}</Link></li>
              <li><Link href="/ai-planner" className="text-sm hover:text-primary-400 transition-colors">{t('navbar.ai_planner')}</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-primary-400 transition-colors">{t('footer.contact')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Chính sách */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-6">{t('footer.policy')}</h3>
            <ul className="space-y-4">
              <li><Link href="/terms" className="text-sm hover:text-primary-400 transition-colors">{t('footer.terms')}</Link></li>
              <li><Link href="/privacy" className="text-sm hover:text-primary-400 transition-colors">{t('footer.privacy')}</Link></li>
              <li><Link href="/cookies" className="text-sm hover:text-primary-400 transition-colors">{t('footer.cookies')}</Link></li>
            </ul>
          </div>

          {/* Column 4: Liên hệ */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-6">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="text-sm leading-relaxed">
                12 Nguyễn Văn Bảo, Hạnh Thông, Hồ Chí Minh 700000, Việt Nam
              </li>
              <li className="text-sm">
                (+84) 379767728
              </li>
              <li className="text-sm">
                thanhoangthienthien@gmail.com
              </li>
            </ul>
            {/* Payment Icons */}
            <div className="flex gap-2 mt-8">
              <div className="w-10 h-7 bg-slate-200 rounded flex items-center justify-center">
                <span className="text-[10px] font-black text-blue-900">VISA</span>
              </div>
              <div className="w-10 h-7 bg-slate-200 rounded flex items-center justify-center relative overflow-hidden">
                <div className="w-4 h-4 rounded-full bg-red-500 absolute left-1 mix-blend-multiply opacity-80"></div>
                <div className="w-4 h-4 rounded-full bg-yellow-500 absolute right-1 mix-blend-multiply opacity-80"></div>
              </div>
              <div className="w-10 h-7 bg-slate-200 rounded flex items-center justify-center">
                <span className="text-[10px] font-bold text-blue-600 italic">PayPal</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
