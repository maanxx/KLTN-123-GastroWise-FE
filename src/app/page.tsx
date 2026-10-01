import { HeroSection } from '@/components/features/landing';
import { AiWeatherRecommendationCard } from '@/components/features/restaurant/AiWeatherRecommendationCard';
import { PersonalizedRecommendationsSSR } from '@/components/features/restaurant/PersonalizedRecommendationsSSR';
import { FeaturedRestaurantsSSR } from '@/components/features/restaurant/FeaturedRestaurantsSSR';
import { CollectionsSlider } from '@/components/features/restaurant/CollectionsSlider';
import { SearchFilterBar } from '@/components/features/restaurant/SearchFilterBar';
import { AllRestaurantsSSR } from '@/components/features/restaurant/AllRestaurantsSSR';
import React from 'react';

export default async function HomePage({ searchParams }: { searchParams: { page?: string, search?: string, tags?: string, rating?: string, openNow?: string, sortBy?: string } }) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || '';
  const tags = searchParams.tags || '';
  const rating = searchParams.rating || '';
  const openNow = searchParams.openNow || '';
  const sortBy = searchParams.sortBy || '';

  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* Đưa Weather AI Recommendation lên ĐẦU TRANG ngay sau Hero Section */}
      <section className="pt-6 pb-2 bg-gradient-to-b from-slate-50/80 via-emerald-50/15 to-slate-50/60 dark:from-slate-950 dark:via-emerald-950/10 dark:to-slate-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <AiWeatherRecommendationCard />
        </div>
      </section>

      {/* Bộ Sưu Tập Ẩm Thực Chuẩn ShopeeFood Layout 6 Card Grid */}
      <section className="py-6 bg-slate-50/60 dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <CollectionsSlider />
        </div>
      </section>

      {/* SSR component cuộn ngang - Cá nhân hoá */}
      <PersonalizedRecommendationsSSR />

      {/* SSR component cuộn ngang - Top đánh giá */}
      <FeaturedRestaurantsSSR />
      
      {/* Client component tìm kiếm & bộ lọc, bọc SSR List */}
      <SearchFilterBar>
        <AllRestaurantsSSR page={page} search={search} tags={tags} rating={rating} openNow={openNow} sortBy={sortBy} />
      </SearchFilterBar>
    </div>
  );
}
