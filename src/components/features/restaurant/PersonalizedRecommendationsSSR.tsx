import React from 'react';
import { RestaurantCard } from './RestaurantCard';
import { Sparkles } from 'lucide-react';

async function fetchPersonalizedRestaurants() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    // Gọi API lấy các quán có đánh giá tốt, ưu tiên mở cửa (dùng tham số search=ngon hoặc tags phổ biến)
    // Thực tế sẽ dùng /recommend của AI, nhưng ở đây dùng filter có sẵn
    const res = await fetch(`${API_URL}/restaurants?limit=10&rating=8to9&sortBy=diemTrungBinh&order=desc`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Lỗi khi lấy món ăn gợi ý:", error);
    return [];
  }
}

export const PersonalizedRecommendationsSSR = async () => {
  const restaurants = await fetchPersonalizedRestaurants();

  if (!restaurants || restaurants.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-primary-50/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-8 h-8 text-primary-500 fill-primary-500" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Đề xuất Dành riêng cho bạn
            </h2>
            <p className="text-sm text-gray-500 mt-1">Dựa trên các món ngon bạn có thể sẽ thích</p>
          </div>
        </div>
        
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
