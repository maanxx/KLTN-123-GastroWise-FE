'use client';

import { useState } from 'react';
import { Filter, Search, SlidersHorizontal, TrendingUp, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { Button, Input } from '@/components/ui';
import { useGetRestaurants } from '@/hooks/queries/useRestaurants';

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Tất cả');

  const { data: restaurantsResponse, isLoading, isError } = useGetRestaurants({
    search: searchTerm || undefined,
    cuisine: activeCategory !== 'Tất cả' ? activeCategory : undefined
  });

  // Extract array of restaurants from the Axios response wrapper (which might be nested depending on the exact BE format)
  // Usually it returns { data: [...] } or just an array.
  const restaurants = Array.isArray(restaurantsResponse) 
    ? restaurantsResponse 
    : (restaurantsResponse as any)?.data || [];

  return (
    <div className="min-h-screen bg-primary-50/30 pb-24 pt-8 dark:bg-transparent">
      <div className="container-app">
        {/* Header & Search */}
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
            <Button className="h-14 px-8 rounded-2xl">
              Tìm kiếm
            </Button>
          </div>
        </div>

        {/* Featured Collections */}
        <div className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-slate-900 dark:text-white">
              <TrendingUp className="h-5 w-5 text-accent-500" />
              Bộ sưu tập Nổi bật
            </h2>
            <button className="text-sm font-semibold text-primary-600 hover:text-primary-700">Xem tất cả</button>
          </div>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {[
              { title: 'Ăn sập Quận 1 dưới 100K', bg: 'from-orange-400 to-red-500', img: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80' },
              { title: 'Top 5 Quán chay thanh tịnh', bg: 'from-emerald-400 to-teal-600', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80' },
            ].map((collection, idx) => (
              <div key={idx} className="group relative h-40 w-64 shrink-0 snap-center overflow-hidden rounded-2xl shadow-sm sm:h-48 sm:w-72">
                <Image src={collection.img} alt={collection.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-gradient-to-t ${collection.bg} opacity-60 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <h3 className="absolute bottom-4 left-4 right-4 font-heading text-lg font-bold text-white shadow-black drop-shadow-md">
                  {collection.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Categories / Filters */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {['Tất cả', 'Món Việt', 'Món Âu', 'Chay', 'Gần tôi', 'Đánh giá cao'].map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat 
                  ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600 dark:bg-slate-900 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
          </div>
        ) : isError ? (
          <div className="text-center py-10 text-red-500">
            Đã xảy ra lỗi khi tải dữ liệu quán ăn.
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            Không tìm thấy quán ăn nào phù hợp.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {restaurants.map((restaurant: any) => (
              <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`} className="group block">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary-300 dark:border-slate-800 dark:bg-slate-900">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={restaurant.cover_image || 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&q=80'}
                      alt={restaurant.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-900 backdrop-blur-sm shadow-sm">
                      ⭐ {restaurant.rating_avg ? (Number(restaurant.rating_avg) / 2).toFixed(1) : 'Mới'}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                      {restaurant.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 line-clamp-1">
                      {restaurant.address}
                    </p>
                    {restaurant.cuisine && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                          {restaurant.cuisine}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
