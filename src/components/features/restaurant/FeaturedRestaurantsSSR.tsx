import React from 'react';
import { RestaurantCard } from './RestaurantCard';
import { SectionTitle } from './SectionTitle';

async function fetchFeaturedRestaurants() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const res = await fetch(`${API_URL}/restaurants?limit=10&rating=gte9&sortBy=diemTrungBinh&order=desc`, {
      cache: "no-store", // SSR: Lấy dữ liệu mới nhất mỗi lần reload
    });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Lỗi khi lấy món ăn nổi bật:", error);
    return [];
  }
}

export const FeaturedRestaurantsSSR = async () => {
  const restaurants = await fetchFeaturedRestaurants();

  if (!restaurants || restaurants.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionTitle 
          translationKey="home.top_rated"
          defaultText="Top Đánh Giá Cao Nhất"
          iconType="flame"
        />
        
        {/* Horizontal Scrolling Carousel */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {restaurants.map((restaurant: any) => (
              <div 
                key={restaurant.id || restaurant._id} 
                className="snap-start snap-always shrink-0 w-[280px] sm:w-[320px] md:w-[350px]"
              >
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
