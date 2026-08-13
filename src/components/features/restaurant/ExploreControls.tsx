'use client';

import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, Check } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input } from '@/components/ui';

const MAIN_CATEGORIES = ['Món Chính', 'Ăn Vặt & Tráng Miệng', 'Đồ Uống'];
const SUB_CATEGORIES: Record<string, string[]> = {
  'Món Chính': ['ĐỒ ĂN', 'ĐỒ CHAY', 'MÌ PHỞ', 'MÓN LẨU', 'PIZZA/BURGER', 'SUSHI', 'CƠM HỘP'],
  'Ăn Vặt & Tráng Miệng': ['BÁNH KEM', 'TRÁNG MIỆNG'],
  'Đồ Uống': ['ĐỒ UỐNG']
};

export const ExploreControls = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || 'Tất cả';
  const currentTags = searchParams.get('tags') ? searchParams.get('tags')!.split(',') : [];
  const currentRating = searchParams.get('rating') || 'all';
  const currentOpenNow = searchParams.get('openNow') === 'true';
  const currentSortBy = searchParams.get('sortBy') || 'diemTrungBinh';

  const [searchTerm, setSearchTerm] = useState(currentSearch || currentTags.join(', '));
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const isTypingRef = React.useRef(false);

  const [tempMainCategory, setTempMainCategory] = useState<string>('Món Chính');
  const [tempTags, setTempTags] = useState<string[]>(currentTags);
  const [tempRating, setTempRating] = useState<string>(currentRating);
  const [tempOpenNow, setTempOpenNow] = useState<boolean>(currentOpenNow);
  const [tempSortBy, setTempSortBy] = useState<string>(currentSortBy);

  useEffect(() => {
    if (!isTypingRef.current) {
      setSearchTerm(currentSearch || currentTags.join(', '));
    }
  }, [currentSearch, currentTags.join(',')]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!isTypingRef.current) return;
      
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm) {
        params.set('search', searchTerm);
      } else {
        params.delete('search');
      }

      params.delete('tags');
      params.delete('rating');
      params.delete('openNow');
      setTempTags([]);
      setTempRating('all');
      setTempOpenNow(false);

      params.set('page', '1');
      router.push(`/explore?${params.toString()}`, { scroll: false });
      
      isTypingRef.current = false;
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, router, searchParams]);

  const toggleTag = (tag: string) => {
    setTempTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleApplyFilters = () => {
    isTypingRef.current = false; 
    const params = new URLSearchParams(searchParams.toString());
    
    params.delete('search');

    if (tempTags.length > 0) {
      params.set('tags', tempTags.join(','));
      setSearchTerm(tempTags.join(', '));
    } else {
      params.delete('tags');
      setSearchTerm('');
    }

    if (tempRating !== 'all') params.set('rating', tempRating);
    else params.delete('rating');

    if (tempOpenNow) params.set('openNow', 'true');
    else params.delete('openNow');

    if (tempSortBy !== 'diemTrungBinh') params.set('sortBy', tempSortBy);
    else params.delete('sortBy');

    params.set('page', '1');
    router.push(`/explore?${params.toString()}`, { scroll: false });
    setIsModalOpen(false);
  };

  const handleClearFilters = () => {
    setTempTags([]);
    setTempRating('all');
    setTempOpenNow(false);
    setTempSortBy('diemTrungBinh');
  };

  return (
    <>
      <div className="mb-10 text-center">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Khám phá Ẩm thực
        </h1>
        <p className="mt-2 text-slate-500">
          Tìm kiếm quán ăn ngon theo sở thích của riêng bạn
        </p>

        <div className="mx-auto mt-8 flex max-w-2xl items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Tên quán, món ăn, khu vực..." 
              className="pl-12 h-14 rounded-2xl border-primary-200 focus:border-primary-500 shadow-sm"
              value={searchTerm}
              onChange={(e) => {
                isTypingRef.current = true;
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <Button 
            variant="outline" 
            className="h-14 px-6 rounded-2xl border-primary-200 hover:bg-primary-50 relative"
            onClick={() => setIsModalOpen(true)}
          >
            <SlidersHorizontal className="h-5 w-5" />
            {(currentTags.length > 0 || currentRating !== 'all' || currentOpenNow) && (
              <span className="absolute top-3 right-4 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
            )}
          </Button>
        </div>
      </div>



      {/* Advanced Filter Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold font-heading">Bộ lọc nâng cao</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-8">
              {/* Phân tầng danh mục */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase mb-3">Phân loại ẩm thực</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {MAIN_CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setTempMainCategory(cat)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg border ${
                        tempMainCategory === cat 
                          ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400' 
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                {/* Sub Categories for the selected Main Category */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-xs text-slate-500 mb-3">Chọn nhiều mục để lọc chính xác hơn</p>
                  <div className="flex flex-wrap gap-2">
                    {SUB_CATEGORIES[tempMainCategory]?.map(sub => {
                      const isSelected = tempTags.includes(sub);
                      return (
                        <button
                          key={sub}
                          onClick={() => toggleTag(sub)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border transition-all ${
                            isSelected 
                              ? 'bg-primary-500 text-white border-primary-500 shadow-md shadow-primary-500/20' 
                              : 'bg-white text-slate-700 border-slate-200 hover:border-primary-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mức Đánh giá */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase mb-3">Đánh giá</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'all', label: 'Tất cả' },
                    { value: 'gte9', label: 'Từ 9.0 trở lên ⭐' },
                    { value: '8to9', label: '8.0 - 9.0 ⭐' },
                    { value: '7to8', label: '7.0 - 8.0 ⭐' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setTempRating(opt.value)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg border ${
                        tempRating === opt.value 
                          ? 'border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400' 
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tuỳ chọn khác */}
              <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase mb-3">Sắp xếp theo</h3>
                  <select 
                    value={tempSortBy}
                    onChange={(e) => setTempSortBy(e.target.value)}
                    className="w-full sm:w-48 bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-slate-800 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white"
                  >
                    <option value="diemTrungBinh">Đánh giá cao nhất</option>
                    <option value="diemGiaCa">Giá cả tốt nhất</option>
                    <option value="diemViTri">Vị trí thuận lợi</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase mb-3">Trạng thái</h3>
                  <label className="relative inline-flex items-center cursor-pointer mt-2">
                    <input type="checkbox" checked={tempOpenNow} onChange={() => setTempOpenNow(!tempOpenNow)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary-500"></div>
                    <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">Đang mở cửa</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Footer / Actions */}
            <div className="p-5 border-t border-slate-100 dark:border-slate-800 flex justify-between gap-3 bg-slate-50 dark:bg-slate-900/50">
              <Button variant="outline" onClick={handleClearFilters} className="text-slate-600">
                Xoá bộ lọc
              </Button>
              <Button onClick={handleApplyFilters} className="px-8">
                Áp dụng
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
