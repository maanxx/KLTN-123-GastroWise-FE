import { HeroSection } from '@/components/features/landing';
import { PersonalizedRecommendationsSSR } from '@/components/features/restaurant/PersonalizedRecommendationsSSR';
import { FeaturedRestaurantsSSR } from '@/components/features/restaurant/FeaturedRestaurantsSSR';
import { SearchFilterBar } from '@/components/features/restaurant/SearchFilterBar';
import { AllRestaurantsSSR } from '@/components/features/restaurant/AllRestaurantsSSR';

export default async function HomePage({ searchParams }: { searchParams: { page?: string, search?: string } }) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || '';

  return (
    <div className="flex flex-col">
      <HeroSection />
      
      {/* SSR component cuộn ngang - Cá nhân hoá */}
      <PersonalizedRecommendationsSSR />

      {/* SSR component cuộn ngang - Top đánh giá */}
      <FeaturedRestaurantsSSR />
      
      {/* Client component tìm kiếm & bộ lọc, bọc SSR List */}
      <SearchFilterBar>
        <AllRestaurantsSSR page={page} search={search} />
      </SearchFilterBar>
    </div>
  );
}
