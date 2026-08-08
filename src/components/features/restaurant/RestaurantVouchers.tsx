'use client';

import { Ticket, Clock, Percent } from 'lucide-react';
import { Button } from '@/components/ui';

export function RestaurantVouchers() {
  const vouchers = [
    {
      id: 1,
      title: 'Giảm 20%',
      desc: 'Tối đa 50k cho đơn từ 200k',
      type: 'discount',
    },
    {
      id: 2,
      title: 'Miễn phí Tráng miệng',
      desc: 'Khi đặt bàn nhóm 4 người',
      type: 'gift',
    },
    {
      id: 3,
      title: 'Giảm 50K',
      desc: 'Khách hàng GastroWise hạng Vàng',
      type: 'cash',
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Ticket className="h-5 w-5 text-primary-500" />
        Mã Giảm Giá
      </h2>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {vouchers.map((voucher) => (
          <div 
            key={voucher.id}
            className="relative flex w-72 shrink-0 snap-start items-center rounded-xl bg-gradient-to-r from-orange-50 to-orange-100/50 p-0 shadow-sm border border-orange-200/50 dark:from-orange-950/40 dark:to-orange-900/20 dark:border-orange-900/50"
          >
            {/* Răng cưa bên trái (Dashed Border Shopee style) */}
            <div className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-primary-50 dark:bg-slate-950" />
            
            {/* Phần giá trị */}
            <div className="flex flex-col items-center justify-center border-r border-dashed border-orange-300 px-4 py-4 w-24 dark:border-orange-800">
              <Percent className="h-6 w-6 text-orange-500 mb-1" />
              <span className="text-sm font-bold text-orange-600 text-center leading-tight dark:text-orange-400">
                {voucher.title}
              </span>
            </div>
            
            {/* Phần điều kiện */}
            <div className="flex-1 px-4 py-3">
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                {voucher.desc}
              </p>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-orange-500">
                <Clock className="h-3 w-3" /> HSD: Hôm nay
              </div>
            </div>

            {/* Nút lưu */}
            <div className="pr-3 pl-1">
              <button className="rounded-full bg-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-transform hover:scale-105 active:scale-95">
                Lưu
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
