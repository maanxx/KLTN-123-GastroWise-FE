import { HeroSection } from '@/components/features/landing';
import { RestaurantList } from '@/components/features/restaurant/RestaurantList';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <RestaurantList />
    </div>
  );
}
