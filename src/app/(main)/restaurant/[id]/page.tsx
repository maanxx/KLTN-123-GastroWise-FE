import { ArrowLeft, Ticket } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  RestaurantHero,
  RestaurantInfo,
  RestaurantMenu,
  RestaurantReviews,
} from '@/components/features/restaurant';
import { MOCK_RESTAURANTS } from '@/lib/mock/restaurant';

export default function RestaurantDetailPage({ params }: { params: { id: string } }) {
  const restaurant = MOCK_RESTAURANTS.find((r) => r.id === params.id);

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-primary-50/30 pb-24 dark:bg-transparent">
      {/* Nút Back về quá khứ (Tuỳ chọn hiển thị nổi trên Cover) */}
      <div className="absolute left-4 top-24 z-20 sm:left-8">
        <Link 
          href="/itinerary" 
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/40 border border-white/30 shadow-lg"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </div>

      <RestaurantHero restaurant={restaurant} />
      
      <div className="container-app relative z-10 -mt-8 max-w-5xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content (Trái 2 phần) */}
          <div className="lg:col-span-2">
            
            {/* Vouchers (M12 Upgrade) */}
            <div className="mb-8 flex items-center justify-between rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-4 text-white shadow-md shadow-orange-500/20 relative overflow-hidden">
              <div className="absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-primary-50 dark:bg-primary-950" />
              <div className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-primary-50 dark:bg-primary-950" />
              
              <div className="flex items-center gap-4 z-10">
                <Ticket className="h-8 w-8 opacity-80" />
                <div>
                  <h3 className="font-heading font-bold text-lg">Giảm 20% tổng hoá đơn</h3>
                  <p className="text-sm font-medium text-white/80">Dành riêng cho khách hàng GastroWise</p>
                </div>
              </div>
              <button className="z-10 shrink-0 rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-600 transition-transform active:scale-95 shadow-sm hover:shadow-md">
                Lưu mã
              </button>
            </div>

            <RestaurantMenu menu={restaurant.menu} />
            <RestaurantReviews reviews={restaurant.reviews} />
          </div>

          {/* Sidebar Info (Phải 1 phần) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <RestaurantInfo restaurant={restaurant} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
