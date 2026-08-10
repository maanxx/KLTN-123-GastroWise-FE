'use client';

import { Heart, Search, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '@/components/ui';
import { useGetFavorites, useToggleFavorite } from '@/hooks/queries/useFavorite';
import { useAuthStore } from '@/stores/useAuthStore';

export default function FavoritesPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { data: favoritesData, isLoading, isError } = useGetFavorites();
  const toggleMutation = useToggleFavorite();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const favoriteRestaurants = (favoritesData as any)?.data || favoritesData || [];

  const handleToggle = (e: React.MouseEvent, restaurantId: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMutation.mutate(restaurantId);
  };

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
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white flex items-center gap-3">
              Quán Yêu Thích <Heart className="h-8 w-8 text-red-500 fill-red-500" />
            </h1>
            <p className="mt-2 text-slate-500">
              Bộ sưu tập những địa điểm ẩm thực chân ái của riêng bạn.
            </p>
          </div>
          <Link href="/explore">
            <Button variant="outline" className="w-full sm:w-auto bg-white dark:bg-slate-900">
              <Search className="mr-2 h-4 w-4" />
              Tìm thêm quán ngon
            </Button>
          </Link>
        </div>

        {isError ? (
          <div className="text-center py-10 text-red-500">
            Đã xảy ra lỗi khi tải danh sách yêu thích.
          </div>
        ) : favoriteRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteRestaurants.map((restaurant: any) => (
              <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`} className="group block">
                <div className="overflow-hidden rounded-2xl border border-primary-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary-400 dark:border-primary-900/50 dark:bg-slate-900">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={restaurant.cover_image || 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&q=80'}
                      alt={restaurant.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Trái tim yêu thích đã lưu */}
                    <button 
                      onClick={(e) => handleToggle(e, restaurant.id)}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-transform hover:scale-110"
                    >
                      <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                      {restaurant.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 line-clamp-1">
                      {restaurant.address}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/50 text-center dark:border-slate-800 dark:bg-slate-900/50">
            <Heart className="mb-4 h-12 w-12 text-slate-300 dark:text-slate-700" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Bạn chưa lưu quán nào</h3>
            <p className="mt-1 text-slate-500">Hãy dạo quanh một vòng và lưu lại những món ngon nhé!</p>
          </div>
        )}
      </div>
    </div>
  );
}
