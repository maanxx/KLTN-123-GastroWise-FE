'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal, X, Check, ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { useTranslation } from '@/hooks/useTranslation';

const MAIN_CATEGORIES = ['Món Chính', 'Ăn Vặt & Tráng Miệng', 'Đồ Uống'];
const SUB_CATEGORIES: Record<string, string[]> = {
  'Món Chính': ['ĐỒ ĂN', 'ĐỒ CHAY', 'MÌ PHỞ', 'MÓN LẨU', 'PIZZA/BURGER', 'SUSHI', 'CƠM HỘP'],
  'Ăn Vặt & Tráng Miệng': ['BÁNH KEM', 'TRÁNG MIỆNG'],
  'Đồ Uống': ['ĐỒ UỐNG'],
};

const SORT_OPTIONS = [
  { value: 'diemTrungBinh', label: 'Đánh giá cao nhất', icon: '⭐️' },
  { value: 'diemGiaCa', label: 'Giá cả tốt nhất', icon: '💰' },
  { value: 'diemViTri', label: 'Vị trí thuận lợi', icon: '📍' },
];

interface CustomSortDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CustomSortDropdown({ value, onChange, className }: CustomSortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOpt = SORT_OPTIONS.find((o) => o.value === value) || SORT_OPTIONS[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-14 min-w-[180px] items-center justify-between gap-3 rounded-2xl border-2 border-emerald-500/80 bg-white px-4 text-xs font-bold text-slate-800 shadow-sm transition-all hover:border-emerald-600 hover:bg-emerald-50/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-emerald-600 dark:bg-slate-900 dark:text-white ${className || ''}`}
      >
        <span className="truncate">{selectedOpt.label}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-emerald-600' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="animate-in fade-in slide-in-from-top-2 absolute right-0 top-full z-50 mt-2 min-w-[200px] overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-1.5 shadow-2xl backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-900/95">
          <div className="space-y-1">
            {SORT_OPTIONS.map((opt) => {
              const isSelected = value === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20'
                      : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export const ExploreControls = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || 'Tất cả';
  const currentTags = searchParams.get('tags') ? searchParams.get('tags')!.split(',') : [];
  const currentRating = searchParams.get('rating') || 'all';
  const currentOpenNow = searchParams.get('openNow') === 'true';
  const currentSortBy = searchParams.get('sortBy') || 'diemTrungBinh';

  const [searchTerm, setSearchTerm] = useState(
    currentSearch || currentTags.map((tag) => t(`tag.${tag}`, tag)).join(', '),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isTypingRef = React.useRef(false);

  const [tempMainCategory, setTempMainCategory] = useState<string>('Món Chính');
  const [tempTags, setTempTags] = useState<string[]>(currentTags);
  const [tempRating, setTempRating] = useState<string>(currentRating);
  const [tempOpenNow, setTempOpenNow] = useState<boolean>(currentOpenNow);
  const [tempSortBy, setTempSortBy] = useState<string>(currentSortBy);

  useEffect(() => {
    if (!isTypingRef.current) {
      setSearchTerm(currentSearch || currentTags.map((tag) => t(`tag.${tag}`, tag)).join(', '));
    }
  }, [currentSearch, currentTags.join(','), t]);

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
    setTempTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handleApplyFilters = () => {
    isTypingRef.current = false;
    const params = new URLSearchParams(searchParams.toString());

    params.delete('search');

    if (tempTags.length > 0) {
      params.set('tags', tempTags.join(','));
      setSearchTerm(tempTags.map((tag) => t(`tag.${tag}`, tag)).join(', '));
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

  const handleSortChange = (val: string) => {
    setTempSortBy(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== 'diemTrungBinh') {
      params.set('sortBy', val);
    } else {
      params.delete('sortBy');
    }
    params.set('page', '1');
    router.push(`/explore?${params.toString()}`, { scroll: false });
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
        <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {t('explore.title')}
        </h1>
        <p className="mt-2 text-slate-500">{t('explore.subtitle')}</p>

        <div className="mx-auto mt-8 flex max-w-2xl items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder={t('explore.search_placeholder') as string}
              className="h-14 rounded-2xl border-primary-200 pl-12 shadow-sm focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => {
                isTypingRef.current = true;
                setSearchTerm(e.target.value);
              }}
            />
          </div>

          <Button
            variant="outline"
            className="relative h-14 rounded-2xl border-primary-200 px-6 hover:bg-primary-50"
            onClick={() => setIsModalOpen(true)}
            title="Bộ lọc nâng cao"
          >
            <SlidersHorizontal className="h-5 w-5" />
            {(currentTags.length > 0 || currentRating !== 'all' || currentOpenNow) && (
              <span className="absolute right-4 top-3 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500"></span>
            )}
          </Button>
        </div>
      </div>

      {/* Advanced Filter Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="animate-in fade-in zoom-in-95 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl duration-200 dark:bg-slate-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800">
              <h2 className="font-heading text-xl font-bold">{t('explore.filter_title')}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 space-y-8 overflow-y-auto p-6">
              {/* Phân tầng danh mục */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase text-slate-900 dark:text-white">
                  {t('explore.filter_category')}
                </h3>
                <div className="mb-4 flex flex-wrap gap-2">
                  {MAIN_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setTempMainCategory(cat)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium ${
                        tempMainCategory === cat
                          ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {t(`cat.${cat}`, cat)}
                    </button>
                  ))}
                </div>
                {/* Sub Categories for the selected Main Category */}
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <p className="mb-3 text-xs text-slate-500">{t('explore.filter_hint')}</p>
                  <div className="flex flex-wrap gap-2">
                    {SUB_CATEGORIES[tempMainCategory]?.map((sub) => {
                      const isSelected = tempTags.includes(sub);
                      return (
                        <button
                          key={sub}
                          onClick={() => toggleTag(sub)}
                          className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all ${
                            isSelected
                              ? 'border-primary-500 bg-primary-500 text-white shadow-md shadow-primary-500/20'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-primary-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {isSelected && <Check className="h-3.5 w-3.5" />}
                          {t(`tag.${sub}`, sub)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mức Đánh giá */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase text-slate-900 dark:text-white">
                  {t('explore.filter_rating')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'all', label: t('explore.filter_all') },
                    { value: 'gte4_5', label: t('explore.filter_rating_4_5') },
                    { value: 'gte4', label: t('explore.filter_rating_4') },
                    { value: 'gte3_5', label: t('explore.filter_rating_3_5') },
                    { value: 'gte3', label: t('explore.filter_rating_3') },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setTempRating(opt.value)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                        tempRating === opt.value
                          ? 'border-orange-500 bg-orange-50 font-bold text-orange-700 shadow-sm dark:bg-orange-500/10 dark:text-orange-400'
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
                  <h3 className="mb-3 text-sm font-semibold uppercase text-slate-900 dark:text-white">
                    {t('explore.filter_sort_by')}
                  </h3>
                  <CustomSortDropdown value={tempSortBy} onChange={setTempSortBy} />
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase text-slate-900 dark:text-white">
                    {t('explore.filter_status')}
                  </h3>
                  <label className="relative mt-2 inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={tempOpenNow}
                      onChange={() => setTempOpenNow(!tempOpenNow)}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:border-slate-600 dark:bg-slate-700 dark:peer-focus:ring-primary-800"></div>
                    <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t('explore.status_open')}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Footer / Actions */}
            <div className="flex justify-between gap-3 border-t border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/50">
              <Button variant="outline" onClick={handleClearFilters} className="text-slate-600">
                {t('explore.filter_clear')}
              </Button>
              <Button onClick={handleApplyFilters} className="px-8">
                {t('explore.filter_apply')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
