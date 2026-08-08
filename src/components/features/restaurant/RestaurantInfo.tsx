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
        <div className="flex items-start gap-4 sm:col-span-2 lg:col-span-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Địa chỉ</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {restaurant.address}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
