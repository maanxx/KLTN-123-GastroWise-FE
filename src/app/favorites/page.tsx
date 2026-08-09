'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { useGetFavorites } from '@/hooks/queries/useFavorite';
import { RestaurantCard } from '@/components/features/restaurant/RestaurantCard';
import { Heart, Loader2, Search } from 'lucide-react';
import { Input, Button } from '@/components/ui';

export default function FavoritesPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { data: favorites, isLoading } = useGetFavorites();
  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const filteredFavorites = favorites?.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (restaurant.address && restaurant.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!isAuthenticated) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center">
            <Heart className="w-8 h-8 mr-3 text-red-500 fill-red-500" />
            Quán ăn Yêu thích
          </h1>
          <p className="text-gray-600">
            Danh sách những địa điểm ẩm thực tuyệt vời mà bạn đã lưu lại.
          </p>
        </div>
        
        {favorites && favorites.length > 0 && (
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Tìm trong danh sách yêu thích..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="w-10 h-10 animate-spin text-primary-500 mb-4" />
          <p className="text-gray-500">Đang tải danh sách yêu thích...</p>
        </div>
      ) : !favorites || favorites.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 shadow-sm">
          <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Bạn chưa lưu quán ăn nào!</h3>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Hãy khám phá các nhà hàng trên hệ thống và nhấn biểu tượng trái tim để lưu lại những nơi bạn muốn thử nhé.
          </p>
          <Button 
            className="mt-6" 
            onClick={() => router.push('/explore')}
          >
            Khám phá ngay
          </Button>
        </div>
      ) : filteredFavorites && filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFavorites.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          Không tìm thấy quán ăn nào phù hợp với từ khóa "{searchTerm}".
        </div>
      )}
    </div>
  );
}
