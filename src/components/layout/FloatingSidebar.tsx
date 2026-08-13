'use client';

import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

export function FloatingSidebar() {
  const { t } = useTranslation();

  return (
    <div className="fixed right-4 bottom-24 z-50 flex flex-col gap-3">
      {/* Phone */}
      <a 
        href="tel:0909943237" 
        className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative group"
      >
        <Phone className="w-6 h-6" />
        <span className="absolute right-14 bg-white text-slate-800 text-sm font-medium px-3 py-1.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Gọi ngay cho chúng tôi
        </span>
      </a>

      {/* Zalo */}
      <a 
        href="https://zalo.me/g/pbfttv177" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative group"
      >
        <div className="font-bold text-[10px] leading-tight">Zalo</div>
        <span className="absolute right-14 bg-white text-slate-800 text-sm font-medium px-3 py-1.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat Zalo
        </span>
      </a>

      {/* Messenger */}
      <a 
        href="https://m.me/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-14 bg-white text-slate-800 text-sm font-medium px-3 py-1.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat Messenger
        </span>
      </a>

      {/* Email */}
      <a 
        href="mailto:thanhoangthienthien@gmail.com" 
        className="w-12 h-12 rounded-full bg-cyan-400 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative group"
      >
        <Mail className="w-6 h-6" />
        <span className="absolute right-14 bg-white text-slate-800 text-sm font-medium px-3 py-1.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Gửi email
        </span>
      </a>

      {/* Location */}
      <Link 
        href="/contact" 
        className="w-12 h-12 rounded-full bg-orange-400 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative group"
      >
        <MapPin className="w-6 h-6" />
        <span className="absolute right-14 bg-white text-slate-800 text-sm font-medium px-3 py-1.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Xem địa chỉ
        </span>
      </Link>
    </div>
  );
}
