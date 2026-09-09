'use client';

import { useState, useEffect } from 'react';
import { CloudRain, Sun, Thermometer, Sparkles, HeartPulse, RefreshCw, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface WeatherPreset {
  condition: 'rainy' | 'sunny' | 'cold' | 'hot';
  city: string;
  temp: number;
  icon: any;
  title: string;
  recommendedDishes: string[];
  aiAdvice: string;
}

export function AiWeatherRecommendationCard() {
  const router = useRouter();
  const [activeMood, setActiveMood] = useState<'normal' | 'tired' | 'diet'>('normal');
  const [weather, setWeather] = useState<WeatherPreset>({
    condition: 'rainy',
    city: 'Hồ Chí Minh',
    temp: 24,
    icon: CloudRain,
    title: 'Mưa rào nhẹ, Se lạnh 24°C',
    recommendedDishes: ['Lẩu Thái Cay', 'Phở Bò Tái', 'Cháo Gà Nóng', 'Bún Riêu Cua'],
    aiAdvice: 'Thời tiết se lạnh & mưa phùn thích hợp thưởng thức các món lẩu cay nóng hoặc tô phở bò nghiút khói để giữ ấm cơ thể!',
  });

  const toggleWeather = () => {
    if (weather.condition === 'rainy') {
      setWeather({
        condition: 'sunny',
        city: 'Hà Nội',
        temp: 34,
        icon: Sun,
        title: 'Nắng oi bức, 34°C',
        recommendedDishes: ['Trà Trái Cây', 'Chè Khúc Bạch', 'Bún Thịt Nướng', 'Gỏi Cuốn'],
        aiAdvice: 'Trời nắng oi nồng thích hợp giải nhiệt với trà trái cây tươi mát, chè khúc bạch thanh ngọt hoặc các món cuốn nhẹ nhàng!',
      });
    } else {
      setWeather({
        condition: 'rainy',
        city: 'Hồ Chí Minh',
        temp: 24,
        icon: CloudRain,
        title: 'Mưa rào nhẹ, Se lạnh 24°C',
        recommendedDishes: ['Lẩu Thái Cay', 'Phở Bò Tái', 'Cháo Gà Nóng', 'Bún Riêu Cua'],
        aiAdvice: 'Thời tiết se lạnh & mưa phùn thích hợp thưởng thức các món lẩu cay nóng hoặc tô phở bò nghiút khói để giữ ấm cơ thể!',
      });
    }
  };

  const WeatherIcon = weather.icon;

  const handleFilterDish = (dish: string) => {
    router.push(`/?search=${encodeURIComponent(dish)}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-10 overflow-hidden rounded-3xl border border-sky-200/80 bg-gradient-to-br from-sky-50/80 via-indigo-50/40 to-blue-100/30 p-6 shadow-xl backdrop-blur-md dark:border-sky-900/40 dark:from-sky-950/40 dark:via-indigo-950/30 dark:to-slate-900"
    >
      {/* Glow Effect */}
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-sky-400/20 blur-2xl dark:bg-sky-500/10" />

      {/* Header Bar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 text-white shadow-md shadow-sky-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2 text-base">
              Gợi Ý Món Ăn Theo Thời Tiết & Sức Khỏe
              <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-semibold text-sky-700 dark:bg-sky-900/60 dark:text-sky-300">
                Weather AI
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tự động phân tích khí hậu thực tế tại {weather.city}
            </p>
          </div>
        </div>

        <button
          onClick={toggleWeather}
          className="flex items-center gap-1.5 rounded-xl border border-sky-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-50 dark:border-sky-800 dark:bg-slate-800 dark:text-sky-300 shadow-sm transition-all"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Đổi thời tiết giả định
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 items-center">
        {/* Left: Weather Status Card */}
        <div className="md:col-span-5 flex items-center gap-4 rounded-2xl border border-sky-200/60 bg-white/70 p-4 backdrop-blur-md dark:border-sky-900/40 dark:bg-slate-950/50">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-500/30">
            <WeatherIcon className="h-8 w-8 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400">
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
          <p className="mb-3 text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed bg-white/50 dark:bg-slate-800/40 p-3 rounded-xl border border-sky-100 dark:border-sky-900/30">
            💡 <strong className="text-sky-700 dark:text-sky-300">Lời khuyên AI:</strong> {weather.aiAdvice}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-1">Gợi ý món hot:</span>
            {weather.recommendedDishes.map((dish, idx) => (
              <button
                key={idx}
                onClick={() => handleFilterDish(dish)}
                className="group flex items-center gap-1 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm transition-all hover:bg-sky-500 hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-sky-500"
              >
                <span>{dish}</span>
                <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
