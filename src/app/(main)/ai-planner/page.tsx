'use client';

import { useState } from 'react';
import { Bot, Search, Sparkles, Send, DollarSign, Clock, MapPin, Compass } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGenerateItinerary } from '@/hooks/queries/useItinerary';
import { useAuthStore } from '@/stores/useAuthStore';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui';

export default function AiPlannerPage() {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [budget, setBudget] = useState<number>(300000);
  const [mealType, setMealType] = useState<string>('full_day');
  const [hasSearched, setHasSearched] = useState(false);
  
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { mutate: generateItinerary, isPending } = useGenerateItinerary();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    if (!isAuthenticated) {
      alert(t('alert.login_required'));
      router.push('/login');
      return;
    }

    setHasSearched(true);
    
    const payload = {
      prompt: `${prompt} (Ngân sách: ${budget.toLocaleString('vi-VN')} VNĐ, Loại tour: ${mealType})`,
      start_time: new Date().toISOString(),
      end_time: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
      budget: budget,
      lat: 10.7769,
      lng: 106.7009
    };

    generateItinerary(payload, {
      onSuccess: (data: any) => {
        const itineraryId = data?._id || data?.id || data?.data?.id || data?.data?._id;
        if (itineraryId) {
          router.push(`/itinerary/${itineraryId}`);
        } else {
          alert(t('alert.itinerary_create_error'));
          setHasSearched(false);
        }
      },
      onError: () => {
        alert(t('alert.ai_server_error'));
        setHasSearched(false);
      }
    });
  };

  const suggestions = [
    "Food tour ẩm thực đường phố Sài Gòn dưới 300k",
    "Tour chay thanh tịnh Quận 1 trọn gói cả ngày",
    "Lộ trình quán cafe sống ảo & ăn vặt khu Thủ Đức",
    "Bữa tối lãng mạn cho 2 người ven sông"
  ];

  return (
    <div className="min-h-[85vh] bg-slate-50 dark:bg-slate-950 flex flex-col items-center pt-16 pb-24 px-4 transition-all duration-500">
      
      {/* Header */}
      <div className={`flex flex-col items-center transition-all duration-500 ${hasSearched ? 'h-0 opacity-0 overflow-hidden' : 'mb-8'}`}>
        <div className="relative mb-4">
          <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-primary-400 to-accent-400 opacity-50 blur" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white dark:bg-slate-900 shadow-xl">
            <Sparkles className="h-10 w-10 text-primary-500" />
          </div>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white text-center tracking-tight">
          Gastro<span className="text-primary-500">AI</span> Route & Budget Planner
        </h1>
        <p className="mt-3 text-base text-slate-500 text-center max-w-xl">
          Nhập sở thích, chọn ngân sách & loại tour. AI sẽ tự động phân bổ chi phí & thiết kế tuyến đường ngắn nhất cho bạn!
        </p>
      </div>

      {/* Main Form & Search Box */}
      <div className={`w-full max-w-3xl transition-all duration-500 ${hasSearched ? '-translate-y-4' : ''}`}>
        
        {/* Quick Parameters Selector */}
        {!hasSearched && (
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900">
            {/* Budget Selector */}
            <div>
              <label className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                <DollarSign className="h-4 w-4 text-emerald-500" />
                Ngân sách dự kiến (VNĐ)
              </label>
              <div className="flex gap-2">
                {[150000, 300000, 500000, 1000000].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                      budget === b
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {(b / 1000).toLocaleString()}k
                  </button>
                ))}
              </div>
            </div>

            {/* Meal Type Selector */}
            <div>
              <label className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Compass className="h-4 w-4 text-primary-500" />
                Loại hình Food Tour
              </label>
              <div className="flex gap-2">
                {[
                  { id: 'morning', label: 'Bữa sáng & Cafe' },
                  { id: 'lunch_dinner', label: 'Trưa & Tối' },
                  { id: 'full_day', label: 'Cả ngày (3 bữa)' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setMealType(type.id)}
                    className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                      mealType === type.id
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input Bar */}
        <form 
          onSubmit={handleSearch}
          className="relative flex items-center w-full rounded-3xl bg-white shadow-2xl shadow-primary-500/10 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 p-2"
        >
          <div className="pl-4 text-slate-400">
            <Search className="h-6 w-6" />
          </div>
          <input 
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Mô tả mong muốn của bạn (ví dụ: Quán ăn vặt sinh viên rẻ đẹp quanh Q1)..."
            className="w-full bg-transparent px-4 py-4 text-base sm:text-lg outline-none placeholder:text-slate-400 dark:text-white"
            disabled={isPending}
          />
          <button 
            type="submit"
            disabled={!prompt.trim() || isPending}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="h-5 w-5 ml-0.5" />
          </button>
        </form>

        {/* Gợi ý */}
        {!hasSearched && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestions.map((text, idx) => (
              <button 
                key={idx}
                type="button"
                onClick={() => setPrompt(text)}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-primary-400 hover:bg-primary-50/40 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-primary-900/20"
              >
                <Bot className="h-5 w-5 text-primary-500 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">{text}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Area (AI Replying) */}
      {hasSearched && (
        <div className="w-full max-w-3xl mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-md">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            
            <div className="flex-1 space-y-6">
              {isPending && (
                <div className="flex items-center gap-2 text-primary-600 mt-2 font-medium">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary-500" style={{ animationDelay: '0ms' }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary-500" style={{ animationDelay: '150ms' }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary-500" style={{ animationDelay: '300ms' }} />
                  <span className="ml-2 animate-pulse">AI đang tối ưu hóa tuyến đường & phân bổ ngân sách {budget.toLocaleString('vi-VN')}đ...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
