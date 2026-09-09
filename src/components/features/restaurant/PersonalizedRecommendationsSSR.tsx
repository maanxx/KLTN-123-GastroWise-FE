import React from 'react';
import { SectionTitle } from './SectionTitle';
import { PersonalizedSwiperSlider } from './PersonalizedSwiperSlider';

async function fetchPersonalizedRestaurants() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
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
        <SectionTitle 
          translationKey="home.personalized"
          defaultText="Đề xuất Dành riêng cho bạn"
          iconType="sparkles"
          subtitleTranslationKey="home.personalized_desc"
          subtitle="Dựa trên các món ngon bạn có thể sẽ thích"
        />
        
        <PersonalizedSwiperSlider restaurants={restaurants} />
      </div>
    </section>
  );
};
