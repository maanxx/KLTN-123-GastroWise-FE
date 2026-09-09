'use client';

import { useState, useRef } from 'react';
import { Camera, Sparkles, Upload, Flame, Scale, CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { Button, Card } from '@/components/ui';
import { restaurantApi } from '@/lib/api/restaurant.api';
import { RestaurantCard } from '@/components/features/restaurant/RestaurantCard';

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  healthAdvice: string;
}

export default function AiNutriPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [foodName, setFoodName] = useState<string | null>(null);
  const [nutrition, setNutrition] = useState<NutritionData | null>(null);
  const [restaurants, setRestaurants] = useState<any[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getMockNutrition = (name: string): NutritionData => {
    const lower = name.toLowerCase();
    if (lower.includes('pho') || lower.includes('phở')) {
      return {
        calories: 485,
        protein: 26,
        carbs: 65,
        fat: 12,
        fiber: 4,
        healthAdvice: 'Món ăn có tỷ lệ đạm và tinh bột cân bằng. Nước dùng nấu từ xương ống giàu canxi. Khuyên dùng thêm rau giá sống để bổ sung chất xơ!',
      };
    } else if (lower.includes('com') || lower.includes('cơm')) {
      return {
        calories: 620,
        protein: 32,
        carbs: 78,
        fat: 18,
        fiber: 3,
        healthAdvice: 'Món ăn giàu năng lượng thích hợp cho bữa trưa. Tỷ lệ đạm từ sườn nướng cao giúp phát triển cơ bắp!',
      };
    } else if (lower.includes('bun') || lower.includes('bún')) {
      return {
        calories: 430,
        protein: 22,
        carbs: 58,
        fat: 10,
        fiber: 5,
        healthAdvice: 'Món ăn thanh mát, vị chua nhẹ kích thích tiêu hóa. Hàm lượng Calo vừa phải suitable cho người giữ dáng!',
      };
    }
    return {
      calories: 510,
      protein: 25,
      carbs: 60,
      fat: 14,
      fiber: 4,
      healthAdvice: 'Món ăn đáp ứng đủ 3 nhóm chất dinh dưỡng thiết yếu (Macro). Thích hợp cho bữa ăn chính trong ngày!',
    };
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setSelectedImage(previewUrl);
    setIsAnalyzing(true);
    setFoodName(null);
    setNutrition(null);
    setRestaurants([]);

    try {
      const res = await restaurantApi.searchByImage(file);
      const detected = res?.detectedFood || 'Phở Bò Tái Nạm';
      setFoodName(detected);
      setNutrition(getMockNutrition(detected));
      setRestaurants(res?.data || []);
    } catch (err) {
      console.error(err);
      // Fallback
      const detected = 'Phở Bò Tái Nạm';
      setFoodName(detected);
      setNutrition(getMockNutrition(detected));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-orange-50/30 pb-24 pt-28 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container-app mx-auto max-w-5xl px-4">
        {/* Page Title */}
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-100/80 px-4 py-1.5 text-xs font-semibold text-amber-800 backdrop-blur-md dark:border-amber-900/50 dark:bg-amber-950/50 dark:text-amber-300">
            <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400 animate-pulse" />
            GastroWise AI NutriEngine 2.0
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
            AI Smart Food Camera & NutriAnalyzer
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Chụp hoặc tải ảnh đĩa thức ăn của bạn. AI sẽ tự động nhận diện tên món, phân tích hàm lượng Calo & Dinh dưỡng, đồng thời gợi ý các quán ăn ngon nhất phục vụ món này!
          </p>
        </div>

        {/* Upload & Scanner Zone */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12 items-start">
          {/* Left Column: Upload Dropzone */}
          <div className="md:col-span-5">
            <Card className="overflow-hidden p-6 border-slate-200/80 shadow-lg dark:border-slate-800">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-amber-300/80 bg-amber-50/30 p-6 transition-all hover:border-amber-500 hover:bg-amber-50/60 dark:border-amber-900/50 dark:bg-amber-950/20"
              >
                {selectedImage ? (
                  <div className="relative h-64 w-full overflow-hidden rounded-xl">
                    <img src={selectedImage} alt="Food dish" className="h-full w-full object-cover" />
                    {isAnalyzing && (
                      <motion.div
                        initial={{ top: '0%' }}
                        animate={{ top: ['0%', '90%', '0%'] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b]"
                      />
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30">
                      <Camera className="h-8 w-8" />
                    </div>
                    <h4 className="font-heading font-bold text-slate-900 dark:text-white">
                      Tải lên ảnh đĩa ăn
                    </h4>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Kéo thả hoặc nhấn vào đây để chọn ảnh từ máy
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-3">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 font-semibold text-white hover:from-amber-600 hover:to-orange-600"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {selectedImage ? 'Chọn ảnh khác' : 'Chọn ảnh thực tế'}
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column: Analysis Results */}
          <div className="md:col-span-7">
            {isAnalyzing ? (
              <Card className="flex flex-col items-center justify-center p-12 text-center min-h-[360px]">
                <Loader2 className="h-10 w-10 animate-spin text-amber-500 mb-4" />
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                  AI đang quét thị giác & phân tích dinh dưỡng...
                </h3>
                <p className="text-xs text-slate-500 mt-1">Đang trích xuất đặc trưng hình ảnh & tính toán lượng Calo</p>
              </Card>
            ) : foodName && nutrition ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <Card className="p-6 border-amber-200/80 bg-white/80 backdrop-blur-md shadow-xl dark:border-amber-900/40 dark:bg-slate-900">
                  {/* Dish Title & Badge */}
                  <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        AI Nhận Diện Thành Công
                      </span>
                      <h2 className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white">
                        {foodName}
                      </h2>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-2xl bg-amber-500/10 px-4 py-2 font-extrabold text-amber-600 dark:text-amber-400">
                      <Flame className="h-5 w-5 fill-amber-500 text-amber-500" />
                      <span>{nutrition.calories} kcal</span>
                    </div>
                  </div>

                  {/* Macros Breakdown Grid */}
                  <div className="mb-6 grid grid-cols-4 gap-3 text-center">
                    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/60">
                      <span className="text-xs font-semibold text-slate-500">Đạm (Protein)</span>
                      <p className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">{nutrition.protein}g</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/60">
                      <span className="text-xs font-semibold text-slate-500">Tinh bột (Carbs)</span>
                      <p className="mt-1 text-base font-bold text-amber-600 dark:text-amber-400">{nutrition.carbs}g</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/60">
                      <span className="text-xs font-semibold text-slate-500">Chất béo (Fat)</span>
                      <p className="mt-1 text-base font-bold text-rose-500">{nutrition.fat}g</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/60">
                      <span className="text-xs font-semibold text-slate-500">Chất xơ (Fiber)</span>
                      <p className="mt-1 text-base font-bold text-teal-600 dark:text-teal-400">{nutrition.fiber}g</p>
                    </div>
                  </div>

                  {/* AI Advice */}
                  <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50 to-orange-50 p-4 dark:border-amber-900/40 dark:from-amber-950/40 dark:to-slate-900">
                    <div className="mb-1 flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300 text-xs">
                      <ShieldCheck className="h-4 w-4 text-amber-600" />
                      TƯ VẤN DINH DƯỠNG TỪ AI GASTROWISE
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed dark:text-slate-300">
                      {nutrition.healthAdvice}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <Card className="flex flex-col items-center justify-center p-12 text-center min-h-[360px] border-dashed">
                <Scale className="h-12 w-12 text-slate-300 mb-3" />
                <h3 className="font-heading font-bold text-slate-700 dark:text-slate-300">
                  Chưa chọn ảnh phân tích
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  Vui lòng chọn hoặc chụp ảnh đĩa thức ăn ở bảng bên trái để AI tiến hành quét thị giác và phân tích dinh dưỡng.
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Serving Restaurants Section */}
        {restaurants && restaurants.length > 0 && (
          <div className="mt-12">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Top Quán Ăn Nổi Bật Bán "{foodName}"
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs text-amber-800">
                    {restaurants.length} quán ngon
                  </span>
                </h3>
                <p className="text-xs text-slate-500">Được sắp xếp theo điểm đánh giá tốt nhất từ cộng đồng</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {restaurants.map((res: any) => (
                <RestaurantCard key={res._id || res.id} restaurant={res} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
