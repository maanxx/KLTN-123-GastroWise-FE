import Image from 'next/image';
import { TrendingUp, Loader2 } from 'lucide-react';
import { ExploreControls } from './ExploreControls';
import { RestaurantCard } from '@/components/features/restaurant/RestaurantCard';

async function fetchExploreRestaurants(search: string, category: string, page: number) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  
  const params = new URLSearchParams({
    limit: '20',
    page: page.toString(),
  });
  
  if (search) params.set('search', search);
  // Match with backend query for category/tags. 
  // Assuming the backend filters by 'search' or 'tags'. 
  // In our backend, the search parameter searches both name and tags!
  // So if category != 'Tất cả', we append it to search or pass as a separate parameter if the backend supports it.
  // ShopeeFood tags are stored in 'tags'. Let's pass it as 'search' for now or 'category' if the backend has it. 
  // Let's pass it as search. If both exist, combine them.
  let finalSearch = search;
  if (category && category !== 'Tất cả') {
    finalSearch = finalSearch ? `${finalSearch} ${category}` : category;
  }
  
  if (finalSearch) params.set('search', finalSearch);

  try {
    const res = await fetch(`${API_URL}/restaurants?${params.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách quán ăn SSR Explore:", error);
    return [];
  }
}

export default async function ExplorePage({ searchParams }: { searchParams: { search?: string, category?: string, page?: string } }) {
  const search = searchParams.search || '';
  const category = searchParams.category || 'Tất cả';
  const page = Number(searchParams.page) || 1;

  const restaurants = await fetchExploreRestaurants(search, category, page);

  return (
    <div className="min-h-screen bg-primary-50/30 pb-24 pt-8 dark:bg-transparent">
      <div className="container-app">
        
        {/* Client component for Search & Tags */}
        <ExploreControls />

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

        {/* Results Grid - SSR */}
        {restaurants.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            Không tìm thấy quán ăn nào phù hợp.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {restaurants.map((restaurant: any) => (
              <RestaurantCard key={restaurant.id || restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
