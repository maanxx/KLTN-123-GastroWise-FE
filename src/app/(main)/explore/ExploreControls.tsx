'use client';

import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input } from '@/components/ui';

const CATEGORIES = ['Tất cả', 'Món Việt', 'Ăn vặt', 'Giải khát', 'Chay', 'Lẩu', 'Món Âu', 'Nhật Bản'];

export const ExploreControls = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || 'Tất cả';

  const [searchTerm, setSearchTerm] = useState(currentSearch);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm === currentSearch) return;
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm) params.set('search', searchTerm);
      else params.delete('search');
      params.set('page', '1');
      router.push(`/explore?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, currentSearch, router, searchParams]);

  const handleCategoryClick = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === 'Tất cả') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    params.set('page', '1');
    router.push(`/explore?${params.toString()}`, { scroll: false });
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-14 px-6 rounded-2xl border-primary-200 hover:bg-primary-50">
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Categories / Filters */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        {CATEGORIES.map((cat, i) => (
          <button
            key={i}
            onClick={() => handleCategoryClick(cat)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              currentCategory === cat 
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600 dark:bg-slate-900 dark:border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </>
  );
};
