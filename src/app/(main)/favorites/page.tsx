'use client';

import { Heart, Search, Loader2, Filter, FolderHeart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';

import { Button, Input } from '@/components/ui';
import { RestaurantCard } from '@/components/features/restaurant/RestaurantCard';
import { useGetFavorites } from '@/hooks/queries/useFavorite';
import { useAuthStore } from '@/stores/useAuthStore';
import { useTranslation } from '@/hooks/useTranslation';

export default function FavoritesPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { data: favoritesData, isLoading, isError } = useGetFavorites();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const rawFavorites = (favoritesData as any)?.data || favoritesData || [];

  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'viet', label: 'Món Việt' },
    { id: 'bbq', label: 'Lẩu & Nướng' },
    { id: 'cafe', label: 'Cafe & Trà Sữa' },
    { id: 'fast_food', label: 'Đồ Ăn Nhanh' },
  ];

  // Lọc quán ăn theo danh mục & từ khóa tìm kiếm
  const filteredRestaurants = useMemo(() => {
    return rawFavorites.filter((restaurant: any) => {
      const name = restaurant.name || (restaurant as any).tenQuan || '';
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;
      if (selectedCategory === 'all') return true;

      const cuisines = restaurant.cuisineTypes || [];
      return cuisines.some((c: string) => c.toLowerCase().includes(selectedCategory));
    });
  }, [rawFavorites, searchQuery, selectedCategory]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50/30 pb-24 pt-8 dark:bg-transparent">
      <div className="container-app">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white flex items-center gap-3">
              {t('favorites.title')} <Heart className="h-8 w-8 text-red-500 fill-red-500" />
            </h1>
            <p className="mt-2 text-slate-500">
              {t('favorites.subtitle')} ({rawFavorites.length} địa điểm)
            </p>
          </div>
          <Link href="/explore">
            <Button variant="outline" className="w-full sm:w-auto bg-white dark:bg-slate-900">
              <Search className="mr-2 h-4 w-4" />
              {t('favorites.find_more')}
            </Button>
          </Link>
        </div>

        {/* Smart Collection & Search Controls */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
            <FolderHeart className="w-5 h-5 text-primary-500 shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-semibold text-xs transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box inside Favorites */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Tìm trong danh sách..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-slate-50 dark:bg-slate-800 text-sm rounded-xl border-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Restaurant Cards List */}
        {isError ? (
          <div className="text-center py-10 text-red-500">
            {t('favorites.error_loading')}
          </div>
        ) : filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRestaurants.map((restaurant: any) => (
              <RestaurantCard key={restaurant.id || restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/50 text-center dark:border-slate-800 dark:bg-slate-900/50">
            <Heart className="mb-4 h-12 w-12 text-slate-300 dark:text-slate-700" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {searchQuery || selectedCategory !== 'all' ? 'Không tìm thấy quán ăn phù hợp' : t('favorites.empty_title')}
            </h3>
            <p className="mt-1 text-slate-500">
              {searchQuery || selectedCategory !== 'all' ? 'Thử tìm kiếm với từ khóa khác hoặc chuyển danh mục.' : t('favorites.empty_subtitle')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
