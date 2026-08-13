'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { TrendingUp } from 'lucide-react';

export const CollectionsSlider = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const collections = [
    { title: 'Quán chay thanh tịnh', bg: 'from-emerald-400 to-teal-600', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80', tags: 'ĐỒ CHAY' },
    { title: 'Trà sữa & Giải khát', bg: 'from-pink-400 to-rose-500', img: 'https://tse3.mm.bing.net/th/id/OIP.vpwv-37gD3dvEgNMfe32rQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: 'ĐỒ UỐNG,TRÁNG MIỆNG' },
    { title: 'Lẩu cuối tuần', bg: 'from-orange-400 to-red-500', img: 'https://cdn3.ivivu.com/2022/09/l%E1%BA%A9u-n%C6%B0%E1%BB%9Bng-ivivu.jpg', tags: 'MÓN LẨU' },
    { title: 'Thiên đường Ăn vặt', bg: 'from-yellow-400 to-orange-500', img: 'https://bloganchoi.com/wp-content/uploads/2022/11/tong-hop-10-mon-an-vat.jpg', tags: 'ĐỒ ĂN' },
  ];

  const handleCollectionClick = (tags: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tags', tags);
    params.delete('search'); // Reset search if they pick a collection
    params.set('page', '1');
    router.push(`/explore?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-slate-900 dark:text-white">
          <TrendingUp className="h-5 w-5 text-accent-500" />
          Bộ sưu tập Nổi bật
        </h2>
        <button className="text-sm font-semibold text-primary-600 hover:text-primary-700">Xem tất cả</button>
      </div>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {collections.map((collection, idx) => (
          <div 
            key={idx} 
            onClick={() => handleCollectionClick(collection.tags)}
            className="group cursor-pointer relative h-40 w-64 shrink-0 snap-center overflow-hidden rounded-2xl shadow-sm sm:h-48 sm:w-72"
          >
            <img src={collection.img} alt={collection.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className={`absolute inset-0 bg-gradient-to-t ${collection.bg} opacity-60 mix-blend-multiply`} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            <h3 className="absolute bottom-4 left-4 right-4 font-heading text-lg font-bold text-white shadow-black drop-shadow-md">
              {collection.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};
