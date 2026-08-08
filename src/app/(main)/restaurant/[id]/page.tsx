import { ArrowLeft } from 'lucide-react';
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
