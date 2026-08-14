'use client';

import { useState } from 'react';
import { Bot, Search, Sparkles, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGenerateItinerary } from '@/hooks/queries/useItinerary';
import { useAuthStore } from '@/stores/useAuthStore';
import { useTranslation } from '@/hooks/useTranslation';

export default function AiPlannerPage() {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
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
    
    // Tạo payload mẫu (do UI chỉ có 1 ô chat, ta sẽ giả lập các tham số khác)
    // Toạ độ mặc định ở trung tâm Q1, TP.HCM
    const payload = {
      prompt: prompt,
      start_time: new Date().toISOString(),
      end_time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      budget: 500000,
      lat: 10.7769,
      lng: 106.7009
    };

    generateItinerary(payload, {
      onSuccess: (data: any) => {
        // Lấy ID trả về (phụ thuộc vào cấu trúc response, giả sử data.id hoặc data.data.id hoặc data._id)
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
    "Quán chay yên tĩnh ở Quận 1 dưới 200k",
    "Gợi ý bữa tối lãng mạn cho 2 người",
    "Tìm quán phở gia truyền ngon nhất",
    "Đồ Âu sang trọng khu Thảo Điền"
  ];

  return (
    <div className="min-h-[85vh] bg-slate-50 dark:bg-slate-950 flex flex-col items-center pt-16 pb-24 px-4 transition-all duration-500">
      
      {/* Header */}
      <div className={`flex flex-col items-center transition-all duration-500 ${hasSearched ? 'h-0 opacity-0 overflow-hidden' : 'mb-12'}`}>
        <div className="relative mb-6">
          <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-primary-400 to-accent-400 opacity-50 blur" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white dark:bg-slate-900 shadow-xl">
            <Sparkles className="h-10 w-10 text-primary-500" />
          </div>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white text-center tracking-tight">
          Gastro<span className="text-primary-500">AI</span> Planner
        </h1>
        <p className="mt-4 text-lg text-slate-500 text-center max-w-xl">
          Hỏi bất cứ thứ gì. AI của chúng tôi sẽ thiết kế trải nghiệm ẩm thực hoàn hảo dành riêng cho bạn.
        </p>
      </div>

      {/* Main Search Box */}
      <div className={`w-full max-w-3xl transition-all duration-500 ${hasSearched ? '-translate-y-8' : ''}`}>
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
            placeholder="Bạn muốn ăn gì hôm nay?..."
            className="w-full bg-transparent px-4 py-4 text-lg outline-none placeholder:text-slate-400 dark:text-white"
            disabled={isPending}
          />
          <button 
            type="submit"
            disabled={!prompt.trim() || isPending}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="h-5 w-5 ml-1" />
          </button>
        </form>

        {/* Gợi ý */}
        {!hasSearched && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestions.map((text, idx) => (
              <button 
                key={idx}
                type="button"
                onClick={() => {
                  setPrompt(text);
                  // Không auto submit để user có thể nhìn thấy prompt
                }}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors hover:border-primary-400 hover:bg-primary-50/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-primary-900/20"
              >
                <Bot className="h-5 w-5 text-primary-500 shrink-0" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{text}</span>
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
                  <span className="ml-2 animate-pulse">Đang phân tích và tạo lộ trình tối ưu qua API...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
