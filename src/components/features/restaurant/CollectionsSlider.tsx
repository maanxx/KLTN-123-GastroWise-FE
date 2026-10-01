'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { TrendingUp } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export const CollectionsSlider = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const collections = [
    { title: 'Đến Sài Gòn Ăn Gì?', subtitle: '178 địa điểm chuẩn vị', bg: 'from-orange-500 to-amber-600', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80', search: 'Phở' },
    { title: 'Top Lẩu & Nướng Mùa Mưa', subtitle: 'Ấm áp ngày se lạnh', bg: 'from-red-500 to-rose-600', img: 'https://cdn3.ivivu.com/2022/09/l%E1%BA%A9u-n%C6%B0%E1%BB%9Bng-ivivu.jpg', search: 'lẩu' },
    { title: 'Giải Nhiệt Ngày Nắng Nóng', subtitle: 'Trà sữa, Sinh tố tươi mát', bg: 'from-sky-400 to-teal-500', img: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=800&q=80', search: 'trà sữa' },
    { title: 'Quán Ngon Gần Nhà', subtitle: 'Lọc nhanh theo GPS', bg: 'from-emerald-500 to-teal-600', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80', search: 'cơm' },
    { title: 'Ẩm Thực Đêm Sài Gòn', subtitle: 'Phục vụ ăn muộn 24h', bg: 'from-indigo-600 to-purple-700', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', search: 'bánh mì' },
    { title: 'Góc Đồ Chay & Healthy', subtitle: 'Thanh lọc cơ thể', bg: 'from-teal-500 to-emerald-600', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80', search: 'chay' },
  ];

  const handleCollectionClick = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', searchTerm);
    params.set('page', '1');
    router.push(`/?${params.toString()}#search-filter-section`, { scroll: true });
  };

  return (
    <div className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 font-heading text-2xl font-extrabold text-slate-900 dark:text-white">
            <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            Bộ Sưu Tập Ẩm Thực Nổi Bật
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Khám phá các chủ đề ẩm thực hấp dẫn nhất</p>
        </div>
      </div>

      {/* ShopeeFood Style 6 Card Grid (3x2 on desktop, 2x3 on mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection, idx) => (
          <div 
            key={idx} 
            onClick={() => handleCollectionClick(collection.search)}
            className="group cursor-pointer relative h-48 overflow-hidden rounded-2xl shadow-md border border-slate-200/80 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
          >
            <img 
              src={collection.img} 
              alt={collection.title} 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80';
              }}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${collection.bg} opacity-50 mix-blend-multiply transition-opacity group-hover:opacity-40`} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white mb-1">
                {collection.subtitle}
              </span>
              <h3 className="font-heading text-lg font-extrabold text-white drop-shadow-md">
                {collection.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
