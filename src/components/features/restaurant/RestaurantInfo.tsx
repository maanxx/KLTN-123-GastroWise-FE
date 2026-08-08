import { Clock, MapPin, Phone } from 'lucide-react';

import { Card } from '@/components/ui';
import type { Restaurant } from '@/lib/mock/restaurant';

interface RestaurantInfoProps {
  restaurant: Restaurant;
}

export function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
  return (
    <Card className="p-6 md:p-8">
      <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-4">
        Giới thiệu chung
      </h2>
      <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
        {restaurant.description}
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Giờ mở cửa */}
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Giờ mở cửa</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {restaurant.openTime} - {restaurant.closeTime}
            </p>
          </div>
        </div>

        {/* Liên hệ */}
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Điện thoại</h3>
            <p className="mt-1 text-sm font-medium text-primary-600 dark:text-primary-400">
              {restaurant.phone}
            </p>
          </div>
        </div>

        {/* Địa chỉ */}
        <div className="flex items-start gap-4 sm:col-span-2 lg:col-span-1 lg:flex-col lg:items-start lg:gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 lg:hidden">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="w-full">
            <h3 className="hidden lg:block font-semibold text-slate-900 dark:text-white mb-2">Vị trí</h3>
            {/* Bản đồ Mini (M12 Upgrade) */}
            <div className="hidden lg:block relative h-32 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 mb-3 dark:border-slate-800 dark:bg-slate-900">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <MapPin className="h-8 w-8 mb-1 opacity-50" />
                <span className="text-xs font-medium uppercase tracking-wider">Bản đồ</span>
              </div>
            </div>
            <p className="mt-1 lg:mt-0 text-sm text-slate-500 dark:text-slate-400">
              {restaurant.address}
            </p>
          </div>
        </div>
      </div>

      {/* Nút Đặt bàn (M12 Upgrade) */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
        <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary-500/25 transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95">
          Đặt bàn ngay
        </button>
        <p className="mt-3 text-center text-xs text-slate-500">Giữ chỗ miễn phí, thanh toán sau</p>
      </div>
    </Card>
  );
}
