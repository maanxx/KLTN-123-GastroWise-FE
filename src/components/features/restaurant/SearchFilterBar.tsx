'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input, Button } from '@/components/ui';
import { Search, Loader2, Camera, X, MapPin, ChevronDown, Check, Building2 } from 'lucide-react';
import { restaurantApi } from '@/lib/api/restaurant.api';
import { RestaurantCard } from './RestaurantCard';
import { useAuthStore } from '@/stores/useAuthStore';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from 'sonner';
import { AiWeatherRecommendationCard } from './AiWeatherRecommendationCard';

const CATEGORIES_TAGS = [
  { name: 'Tất cả', value: '' },
  { name: 'Món lẩu & Nướng 🍲', value: 'lẩu' },
  { name: 'Mì & Phở 🍜', value: 'phở' },
  { name: 'Cơm tấm 🍚', value: 'cơm' },
  { name: 'Trà sữa & Đồ uống 🧋', value: 'trà sữa' },
  { name: 'Ăn vặt & Bánh mì 🥖', value: 'bánh mì' },
  { name: 'Đồ chay 🥗', value: 'chay' },
  { name: 'Hải sản 🦀', value: 'hải sản' },
  { name: 'Món Á - Âu 🍕', value: 'pizza' },
];

const DISTRICTS = [
  'Tất cả Quận/Huyện',
  'Quận 1',
  'Quận 2',
  'Quận 3',
  'Quận 4',
  'Quận 5',
  'Quận 6',
  'Quận 7',
  'Quận 8',
  'Quận 9',
  'Quận 10',
  'Quận 11',
  'Quận 12',
  'Bình Thạnh',
  'Gò Vấp',
  'Tân Bình',
  'Tân Phú',
  'Bình Tân',
  'Thủ Đức',
];

interface SearchFilterBarProps {
  children: React.ReactNode;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [selectedDistrict, setSelectedDistrict] = useState('Tất cả Quận/Huyện');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [districtSearch, setDistrictSearch] = useState('');
  const [imageResults, setImageResults] = useState<any[] | null>(null);
  const [isSearchingImage, setIsSearchingImage] = useState(false);

  const { isAuthenticated } = useAuthStore();
  const { t } = useTranslation();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close custom dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const s = searchParams.get('search') || '';
    setSearchTerm(s);
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm === currentSearch) return;

      setImageResults(null);
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm) {
        params.set('search', searchTerm);
      } else {
        params.delete('search');
      }
      params.set('page', '1');
      router.push(`/?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, currentSearch, router, searchParams]);

  const handleSelectDistrict = (district: string) => {
    setSelectedDistrict(district);
    setIsDropdownOpen(false);

    const params = new URLSearchParams(searchParams.toString());
    if (district && district !== 'Tất cả Quận/Huyện') {
      params.set('search', district);
      setSearchTerm(district);
    } else {
      params.delete('search');
      setSearchTerm('');
    }
    params.set('page', '1');
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handleSelectCategoryTag = (val: string) => {
    setSearchTerm(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set('search', val);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsSearchingImage(true);
    try {
      const result = await restaurantApi.searchByImage(file);
      if (result && result.data) {
        setImageResults(result.data);
      }
    } catch (error) {
      alert(t('alert.search_image_error'));
    } finally {
      setIsSearchingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const isSearching = currentSearch.length > 0 || imageResults !== null;

  return (
    <section id="search-filter-section" className="bg-gray-50 py-16 dark:bg-slate-950">
      <div className="container mx-auto max-w-7xl px-4">
        {/* ShopeeFood Style Search & District Filter Bar */}
        <div className="mb-8 flex flex-col items-end justify-between gap-4 md:flex-row">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              {imageResults !== null
                ? t('home.search_ai_result')
                : isSearching
                  ? t('home.search_result')
                  : isAuthenticated
                    ? t('home.suggest_for_you')
                    : t('home.all_restaurants')}
            </h2>
            <p className="text-gray-600 dark:text-slate-400">
              {imageResults !== null
                ? t('home.search_ai_desc')
                : isSearching
                  ? `${t('home.search_for')} "${currentSearch}"`
                  : isAuthenticated
                    ? t('home.suggest_desc')
                    : t('home.all_desc')}
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-3 sm:flex-row md:w-auto">
            {/* Custom Styled District Dropdown Selector */}
            <div className="relative w-full sm:w-auto" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex w-full items-center justify-between gap-2.5 rounded-2xl border px-4 py-2.5 text-xs font-bold shadow-sm backdrop-blur-md transition-all duration-200 ${
                  isDropdownOpen
                    ? 'border-emerald-500 bg-white ring-4 ring-emerald-500/10 dark:border-emerald-500 dark:bg-slate-900'
                    : 'border-slate-200/90 bg-white hover:border-emerald-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/80">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="max-w-[140px] truncate font-extrabold text-slate-800 dark:text-slate-200">
                    {selectedDistrict}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-emerald-600' : ''}`}
                />
              </button>

              {/* Custom Animated Glassmorphic Dropdown Popover */}
              {isDropdownOpen && (
                <div className="animate-in fade-in slide-in-from-top-2 absolute right-0 top-full z-50 mt-2 max-h-80 w-72 overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-2 shadow-2xl backdrop-blur-2xl duration-200 dark:border-slate-800 dark:bg-slate-900/95 sm:left-0">
                  {/* Internal Filter Search Input */}
                  <div className="mb-1 border-b border-slate-100 p-1 dark:border-slate-800">
                    <div className="relative flex items-center">
                      <Search className="absolute left-2.5 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Tìm theo Quận/Huyện..."
                        value={districtSearch}
                        onChange={(e) => setDistrictSearch(e.target.value)}
                        className="w-full rounded-xl bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:bg-slate-800/80 dark:text-slate-200"
                      />
                    </div>
                  </div>

                  {/* List of District Items */}
                  <div className="scrollbar-thin scrollbar-thumb-emerald-200 dark:scrollbar-thumb-emerald-900 max-h-60 space-y-0.5 overflow-y-auto pr-1">
                    {DISTRICTS.filter((d) => d.toLowerCase().includes(districtSearch.toLowerCase()))
                      .length > 0 ? (
                      DISTRICTS.filter((d) =>
                        d.toLowerCase().includes(districtSearch.toLowerCase()),
                      ).map((district, idx) => {
                        const isSelected = selectedDistrict === district;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelectDistrict(district)}
                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-150 ${
                              isSelected
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 font-bold text-white shadow-md shadow-emerald-500/20'
                                : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-emerald-950/50 dark:hover:text-emerald-300'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {district === 'Tất cả Quận/Huyện' ? (
                                <Building2
                                  className={`h-3.5 w-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`}
                                />
                              ) : (
                                <MapPin
                                  className={`h-3.5 w-3.5 ${isSelected ? 'text-white' : 'text-emerald-500'}`}
                                />
                              )}
                              <span>{district}</span>
                            </div>
                            {isSelected && <Check className="h-4 w-4 shrink-0 text-white" />}
                          </button>
                        );
                      })
                    ) : (
                      <div className="p-3 text-center text-xs text-slate-400">
                        Không tìm thấy quận/huyện
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSearch} className="flex w-full max-w-sm gap-2 sm:w-auto">
              <Input
                type="text"
                placeholder={t('home.search_placeholder') as string}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-slate-900"
              />
              <Button type="submit" variant="primary" className="px-3">
                <Search className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-slate-300 px-3 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300"
                title={t('home.search_image_btn') as string}
                onClick={() => fileInputRef.current?.click()}
                disabled={isSearchingImage}
              >
                {isSearchingImage ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Camera className="h-5 w-5" />
                )}
              </Button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
            </form>
          </div>
        </div>

        {/* ShopeeFood Style Category Tag Pills Bar */}
        <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-6 dark:border-slate-800">
          {CATEGORIES_TAGS.map((cat, idx) => {
            const isActive =
              (cat.value === '' && searchTerm === '') ||
              (cat.value !== '' && searchTerm.toLowerCase().includes(cat.value.toLowerCase()));
            return (
              <button
                key={idx}
                onClick={() => handleSelectCategoryTag(cat.value)}
                className={`rounded-xl px-4 py-2 text-xs font-bold shadow-sm transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* NẾU ĐANG TÌM KIẾM HÌNH ẢNH -> HIỂN THỊ KẾT QUẢ ẢNH, NẾU KHÔNG -> HIỂN THỊ CHILDREN (SSR) */}
        {isSearchingImage ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="mb-4 h-10 w-10 animate-spin text-primary-600" />
            <p className="text-gray-500">{t('home.analyzing')}</p>
          </div>
        ) : imageResults !== null ? (
          imageResults.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {imageResults.map((restaurant: any) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Button variant="outline" onClick={() => setImageResults(null)}>
                  {t('home.clear_search')}
                </Button>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-gray-100 bg-white py-20 text-center shadow-sm">
              <p className="font-medium text-gray-500">{t('home.not_found')}</p>
              <Button variant="outline" className="mt-4" onClick={() => setImageResults(null)}>
                {t('home.back')}
              </Button>
            </div>
          )
        ) : (
          children
        )}
      </div>
    </section>
  );
};
