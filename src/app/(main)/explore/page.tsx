import React from 'react';
import { ExploreControls } from '@/components/features/restaurant/ExploreControls';
import { CollectionsSlider } from '@/components/features/restaurant/CollectionsSlider';
import { AllRestaurantsSSR } from '@/components/features/restaurant/AllRestaurantsSSR';

import { redirect } from 'next/navigation';

export default function ExplorePage({ searchParams }: { searchParams: { page?: string, search?: string, tags?: string, rating?: string, openNow?: string, sortBy?: string } }) {
  if (!searchParams.tags && !searchParams.search && !searchParams.rating && !searchParams.openNow && !searchParams.sortBy && !searchParams.page) {
    redirect('/explore?tags=ĐỒ CHAY');
  }
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || '';
  const tags = searchParams.tags || '';
  const rating = searchParams.rating || '';
  const openNow = searchParams.openNow || '';
  const sortBy = searchParams.sortBy || '';

  return (
    <div className="flex flex-col pt-24 min-h-screen bg-gray-50">
      <section className="bg-white py-10 shadow-sm mb-8">
        <div className="container-app">
          <React.Suspense fallback={<div>Loading filters...</div>}>
            <ExploreControls />
            <CollectionsSlider />
          </React.Suspense>
        </div>
      </section>

      <section className="container-app pb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Kết quả tìm kiếm</h2>
        <React.Suspense fallback={<div>Đang tải danh sách quán ăn...</div>}>
          <AllRestaurantsSSR page={page} search={search} tags={tags} rating={rating} openNow={openNow} sortBy={sortBy} />
        </React.Suspense>
      </section>
    </div>
  );
}
