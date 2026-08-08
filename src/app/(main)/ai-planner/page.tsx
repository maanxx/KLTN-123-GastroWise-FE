'use client';

import { useState } from 'react';
import { Bot, Search, Sparkles, Send, MapPin, Star, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { MOCK_RESTAURANTS } from '@/lib/mock/restaurant';

export default function AiPlannerPage() {
  const [prompt, setPrompt] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Giả lập AI đang tìm kiếm và trả về kết quả sau 2 giây
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  const suggestions = [
    "Quán chay yên tĩnh ở Quận 1 dưới 200k",
    "Gợi ý bữa tối lãng mạn cho 2 người",
    "Tìm quán phở gia truyền ngon nhất",
    "Đồ Âu sang trọng khu Thảo Điền"
  ];

  return (
    <div className="min-h-[85vh] bg-slate-50 dark:bg-slate-950 flex flex-col items-center pt-16 pb-24 px-4 transition-all duration-500">
      
      {/* Header (Thu nhỏ lại khi đã search) */}
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

      {/* Main Search Box (Perplexity Style) */}
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
          />
          <button 
            type="submit"
            disabled={!prompt.trim() || isSearching}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="h-5 w-5 ml-1" />
          </button>
        </form>

        {/* Gợi ý (Chỉ hiện khi chưa search) */}
        {!hasSearched && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestions.map((text, idx) => (
              <button 
                key={idx}
                onClick={() => setPrompt(text)}
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
              {isSearching ? (
                <div className="flex items-center gap-2 text-primary-600 mt-2 font-medium">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary-500" style={{ animationDelay: '0ms' }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary-500" style={{ animationDelay: '150ms' }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary-500" style={{ animationDelay: '300ms' }} />
                  <span className="ml-2 animate-pulse">Đang phân tích dữ liệu ẩm thực TP.HCM...</span>
                </div>
              ) : (
                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                  <p className="leading-relaxed text-lg">
                    Dựa trên yêu cầu của bạn, mình đã sàng lọc hơn 500 nhà hàng tại TP.HCM và tìm ra những địa điểm phù hợp nhất. Đây là đề xuất hàng đầu dành cho bạn:
                  </p>
                  
                  {/* Inline Restaurant Card (Tripadvisor AI Style) */}
                  <Link href="/restaurant/2" className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 flex flex-col sm:flex-row">
                    <div className="relative h-48 w-full sm:w-64 shrink-0 overflow-hidden">
                      <Image 
                        src={MOCK_RESTAURANTS[1].coverImage} 
                        alt="Restaurant" 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">
                            {MOCK_RESTAURANTS[1].name}
                          </h3>
                          <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-bold text-amber-600">
                            <Star className="h-3 w-3 fill-amber-500" /> 4.9
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-500 flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {MOCK_RESTAURANTS[1].address}
                        </p>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Đang mở cửa</span>
                          <span className="font-medium text-green-600">$$$ (Sang trọng)</span>
                        </div>
                        <button className="rounded-lg bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </Link>

                  <p className="leading-relaxed">
                    Nhà hàng này hoàn toàn phù hợp với ngân sách của bạn và nổi tiếng với không gian yên tĩnh. Bạn có muốn mình tạo một lộ trình di chuyển tới đây kết hợp với quán cà phê tráng miệng không?
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
