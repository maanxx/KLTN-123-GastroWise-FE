import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import { ExploreControls } from './ExploreControls';
import { CollectionsSlider } from './CollectionsSlider';
import { RestaurantCard } from '@/components/features/restaurant/RestaurantCard';
import React from 'react';

async function fetchExploreRestaurants(search: string, tags: string, page: number, rating: string, openNow: string, sortBy: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  
  const params = new URLSearchParams({
    limit: '20',
    page: page.toString(),
  });
  
  if (search) params.set('search', search);
  if (tags) params.set('tags', tags);
  if (rating) params.set('rating', rating);
  if (openNow) params.set('openNow', openNow);
  if (sortBy) params.set('sortBy', sortBy);

  try {
    const res = await fetch(`${API_URL}/restaurants?${params.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách quán ăn SSR Explore:", error);
    return [];
  }
}

export default async function ExplorePage({ searchParams }: { searchParams: { search?: string, tags?: string, page?: string, rating?: string, openNow?: string, sortBy?: string } }) {
  // Mặc định vô trang khám phá là vô bộ sưu tập Chay
  if (Object.keys(searchParams).length === 0) {
    redirect('/explore?tags=ĐỒ CHAY');
  }

  const search = searchParams.search || '';
  const tags = searchParams.tags || '';
  const rating = searchParams.rating || '';
  const openNow = searchParams.openNow || '';
  const sortBy = searchParams.sortBy || '';
  const page = Number(searchParams.page) || 1;

  const restaurants = await fetchExploreRestaurants(search, tags, page, rating, openNow, sortBy);

  return (
    <div className="min-h-screen bg-primary-50/30 pb-24 pt-8 dark:bg-transparent">
      <div className="container-app">
        
        {/* Client components using useSearchParams MUST be wrapped in Suspense */}
        <React.Suspense fallback={<div>Loading filters...</div>}>
          <ExploreControls />
          <CollectionsSlider />
        </React.Suspense>

        {/* Results Grid - SSR */}
        {restaurants.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            Không tìm thấy quán ăn nào phù hợp.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {restaurants.map((restaurant: any) => (
              <RestaurantCard key={restaurant.id || restaurant._id} restaurant={restaurant} activeTags={tags} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
