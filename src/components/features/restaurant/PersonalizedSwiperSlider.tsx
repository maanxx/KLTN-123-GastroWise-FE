'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RestaurantCard } from './RestaurantCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PersonalizedSwiperSliderProps {
  restaurants: any[];
}

export const PersonalizedSwiperSlider: React.FC<PersonalizedSwiperSliderProps> = ({ restaurants }) => {
  if (!restaurants || restaurants.length === 0) return null;

  return (
    <div className="relative group/slider">
      {/* Custom Styling for Pagination Position & Active Bullet */}
      <style jsx global>{`
        .personalized-slider {
          padding-bottom: 3.5rem !important;
        }
        .personalized-slider .swiper-pagination {
          bottom: 2px !important;
        }
        .personalized-slider .swiper-pagination-bullet {
          transition: all 0.3s ease;
          opacity: 0.5;
        }
        .personalized-slider .swiper-pagination-bullet-active {
          opacity: 1;
          width: 20px !important;
          border-radius: 9999px !important;
          background-color: #3b82f6 !important;
        }
      `}</style>

      {/* Custom Navigation Buttons */}
      <button
        id="swiper-prev-btn"
        aria-label="Previous Slide"
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white shadow-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-primary-500 hover:text-white hover:border-primary-500 disabled:opacity-0 disabled:pointer-events-none"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        id="swiper-next-btn"
        aria-label="Next Slide"
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white shadow-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-primary-500 hover:text-white hover:border-primary-500 disabled:opacity-0 disabled:pointer-events-none"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1.2}
        loop={restaurants.length > 3}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: '#swiper-prev-btn',
          nextEl: '#swiper-next-btn',
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2.2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3.2,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 3.8,
            spaceBetween: 24,
          },
        }}
        className="personalized-slider pt-2 !px-1"
      >
        {restaurants.map((restaurant, idx) => (
          <SwiperSlide key={restaurant.id || restaurant._id || idx} className="h-auto">
            <RestaurantCard restaurant={restaurant} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
