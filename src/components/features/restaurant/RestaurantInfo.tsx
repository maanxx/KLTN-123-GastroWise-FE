'use client';

import { useState } from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';

import { Card } from '@/components/ui';
import { BookingModal } from './BookingModal';
import type { Restaurant } from '@/lib/mock/restaurant';

interface RestaurantInfoProps {
  restaurant: Restaurant;
}

export function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
    <Card className="p-6 md:p-8">
      <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-4">
        Giới thiệu chung
      </h2>
      <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
        {restaurant.description}
      </p>

      <div className="flex flex-col space-y-6">
        {/* Bản đồ Mini (M12 Upgrade) */}
        <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900 group cursor-pointer">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 group-hover:bg-slate-200/50 transition-colors dark:group-hover:bg-slate-800/50">
            <div className="h-10 w-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-md mb-2">
              <MapPin className="h-5 w-5 text-primary-500" />
            </div>
            <span className="text-xs font-semibold text-slate-500">Xem bản đồ lớn</span>
          </div>
        </div>

        <div className="space-y-4">
          {/* Địa chỉ */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {restaurant.address}
              </p>
            </div>
          </div>

          {/* Giờ mở cửa */}
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {restaurant.openTime} - {restaurant.closeTime}
              </p>
              <p className="text-xs text-green-600 font-medium mt-1">Đang mở cửa</p>
            </div>
          </div>

          {/* Liên hệ */}
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-primary-600 dark:text-primary-400 hover:underline cursor-pointer">
                {restaurant.phone}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Nút Đặt bàn (M12 Upgrade) */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
        <button 
          onClick={() => setIsBookingModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary-500/25 transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95"
        >
          Đặt bàn ngay
        </button>
        <p className="mt-3 text-center text-xs text-slate-500">Giữ chỗ miễn phí, thanh toán sau</p>
      </div>
    </Card>
    <BookingModal 
      isOpen={isBookingModalOpen} 
      onClose={() => setIsBookingModalOpen(false)} 
      restaurantName={restaurant.name} 
    />
    </>
  );
}
