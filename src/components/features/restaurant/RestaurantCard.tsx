import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Heart } from 'lucide-react';
import { Card } from '@/components/ui';
import { useAuthStore } from '@/stores/useAuthStore';
import { useGetFavorites, useToggleFavorite } from '@/hooks/queries/useFavorite';
import type { Restaurant } from '@/lib/api/restaurant.api';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { isAuthenticated } = useAuthStore();
  const { data: favorites } = useGetFavorites();
  const toggleMutation = useToggleFavorite();
  
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (favorites) {
      setIsFavorited(favorites.some(f => f.id === restaurant.id));
    }
  }, [favorites, restaurant.id]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để lưu quán ăn!');
      return;
    }
    
    setIsFavorited(!isFavorited);
    toggleMutation.mutate(restaurant.id, {
      onError: () => {
        setIsFavorited(isFavorited);
        alert('Có lỗi xảy ra khi lưu quán ăn.');
      }
    });
  };

  const placeholderImage = `https://picsum.photos/seed/${restaurant.id}/600/400`;
  const imageSrc = restaurant.cover_image || placeholderImage;

  return (
    <Link href={`/restaurant/${restaurant.id}`} className="block h-full group">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={restaurant.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <button 
            onClick={handleToggleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
              isFavorited ? 'bg-white text-red-500 shadow-md' : 'bg-black/30 text-white hover:bg-black/50 hover:text-red-400'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-500' : ''}`} />
          </button>

          {restaurant.rating_avg && (
            <div className="absolute bottom-3 left-3 text-white flex items-center bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-sm font-semibold">{(Number(restaurant.rating_avg) / 2).toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-gray-900 line-clamp-1 flex-1">{restaurant.name}</h3>
          </div>
          
          {restaurant.cuisine && (
            <span className="inline-block px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full w-fit mb-3">
              {restaurant.cuisine}
            </span>
          )}
          
          <div className="flex items-start text-sm text-gray-500 mt-auto">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{restaurant.address || 'Đang cập nhật địa chỉ'}</span>
          </div>
          
          {restaurant.distance_m && (
            <div className="mt-2 text-xs font-medium text-primary-600">
              Cách bạn: {(restaurant.distance_m / 1000).toFixed(1)} km
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};
