'use client';

import { useState, useEffect } from 'react';
import { CloudRain, Sun, Thermometer, Sparkles, ArrowRight, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api/axios';

interface WeatherPreset {
  condition: 'rainy' | 'sunny' | 'cool' | 'hot';
  city: string;
  temp: number;
  icon: any;
  title: string;
  recommendedDishes: string[];
  aiAdvice: string;
}

export function AiWeatherRecommendationCard() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [weather, setWeather] = useState<WeatherPreset>({
    condition: 'rainy',
    city: 'Hồ Chí Minh',
    temp: 24,
    icon: CloudRain,
    title: 'Mưa rào nhẹ, Se lạnh 24°C',
    recommendedDishes: ['Lẩu Thái Cay', 'Phở Bò Tái', 'Cháo Gà Nóng', 'Bún Riêu Cua'],
    aiAdvice: 'Thời tiết se lạnh & mưa phùn thích hợp thưởng thức các món lẩu cay nóng hoặc tô phở bò nghiút khói để giữ ấm cơ thể!',
  });

  const fetchWeatherRecommendation = async (lat?: number, lon?: number) => {
    setLoading(true);
    try {
      const params = lat && lon ? `?lat=${lat}&lon=${lon}` : '';
      const response = await api.get(`/restaurants/weather-recommend${params}`);
      const data = response.data;
      if (data && data.weather) {
        const wType = data.weather.weather_type || data.weather.condition || 'cool';
        const isRainy = wType === 'rainy';
        const isHot = wType === 'hot';
        
        // Trích xuất tên các quán ăn thực tế từ CSDL MongoDB Atlas do AI trả về
        const realDishes = data.data && data.data.length > 0
          ? data.data.slice(0, 5).map((r: any) => r.name || r.tenQuan)
          : (isHot ? ['Trà Sữa 3K', 'Sinh Tố', 'Nước Ép', 'Gỏi Cuốn'] : ['Lẩu Thái Cay', 'Phở Bò Tái', 'Nướng BBQ', 'Bún Bò']);

        setWeather({
          condition: wType,
          city: 'Hồ Chí Minh',
          temp: Math.round(data.weather.temperature || 32),
          icon: isRainy ? CloudRain : (isHot ? Sun : Thermometer),
          title: data.weather.banner_title || `${data.weather.condition_text || 'Trời nắng nóng'}, ${Math.round(data.weather.temperature || 32)}°C`,
          recommendedDishes: realDishes,
          aiAdvice: data.weather.banner_desc || 'Gợi ý món ăn phù hợp nhất với điều kiện khí hậu thời tiết hiện tại.',
        });
      }
    } catch (err) {
      console.warn('Fallback to default weather recommendation:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeatherRecommendation(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          fetchWeatherRecommendation();
        },
        { timeout: 5000 }
      );
    } else {
      fetchWeatherRecommendation();
    }
  }, []);

  const WeatherIcon = weather.icon;

  const handleFilterDish = (dish: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('search', dish);
    params.set('page', '1');
    router.push(`/?${params.toString()}`, { scroll: false });
    
    // Smooth scroll to search filter section
    const elem = document.getElementById('search-filter-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`relative mb-10 overflow-hidden rounded-3xl border p-6 shadow-lg backdrop-blur-md transition-all duration-500 animate-in fade-in slide-in-from-bottom-3 ${
        weather.condition === 'hot'
          ? 'border-amber-200/60 bg-gradient-to-br from-amber-50/70 via-orange-50/30 to-emerald-50/20 dark:border-amber-900/30 dark:from-amber-950/30 dark:via-slate-900'
          : 'border-emerald-200/60 bg-gradient-to-br from-slate-50/90 via-emerald-50/40 to-teal-50/30 dark:border-emerald-900/30 dark:from-emerald-950/30 dark:via-slate-900'
      }`}
    >
      {/* Glow Effect */}
      <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-500/10" />

      {/* Header Bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-amber-600 text-white shadow-md shadow-emerald-600/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2 text-base sm:text-lg lg:text-xl">
              Gợi Ý Món Ăn Theo Thời Tiết & GPS Realtime
              <span className="rounded-full bg-emerald-100/90 px-3 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                Weather AI
              </span>
            </h3>
            {/* Tăng size chữ và tăng gap rộng rãi, dễ đọc */}
            <p className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2.5 mt-1.5">
              <MapPin className="h-4 sm:h-5 w-4 sm:w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Tự động phân tích khí hậu thực tế tại {weather.city}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 items-center">
        {/* Left: Weather Status Card */}
        <div className="md:col-span-5 flex items-center gap-4 rounded-2xl border border-emerald-200/60 bg-white/80 p-4 backdrop-blur-md dark:border-emerald-900/40 dark:bg-slate-950/60 shadow-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
            <WeatherIcon className="h-8 w-8 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <Thermometer className="h-4 w-4" />
              {weather.city}
            </div>
            <h4 className="font-heading text-lg font-extrabold text-slate-900 dark:text-white">
              {weather.title}
            </h4>
            <span className="text-[11px] text-slate-500">Cập nhật theo vị trí GPS thực tế</span>
          </div>
        </div>

        {/* Right: AI Advice & Recommended Dishes */}
        <div className="md:col-span-7">
          <p className="mb-3.5 text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm">
            💡 <strong className="text-emerald-800 dark:text-emerald-300">Lời khuyên AI:</strong> {weather.aiAdvice}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-1">Gợi ý món hot:</span>
            {weather.recommendedDishes.map((dish, idx) => (
              <button
                key={idx}
                onClick={() => handleFilterDish(dish)}
                className="group flex items-center gap-1 rounded-xl bg-white px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-sm transition-all hover:bg-emerald-600 hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-emerald-600"
              >
                <span>{dish}</span>
                <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
