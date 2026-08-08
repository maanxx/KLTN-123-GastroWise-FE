import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

import { Button, Input } from '@/components/ui';
import { MOCK_RESTAURANTS } from '@/lib/mock/restaurant';
import Image from 'next/image';

export default function ExplorePage() {
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

        {/* Categories / Filters */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {['Tất cả', 'Món Việt', 'Món Âu', 'Chay', 'Gần tôi', 'Đánh giá cao'].map((cat, i) => (
            <button
              key={i}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                i === 0 
                  ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600 dark:bg-slate-900 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MOCK_RESTAURANTS.map((restaurant) => (
            <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`} className="group block">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary-300 dark:border-slate-800 dark:bg-slate-900">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={restaurant.coverImage}
                    alt={restaurant.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-900 backdrop-blur-sm shadow-sm">
                    ⭐ {restaurant.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                    {restaurant.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 line-clamp-1">
                    {restaurant.address}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {restaurant.cuisineTypes.map((type, idx) => (
                      <span key={idx} className="rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
