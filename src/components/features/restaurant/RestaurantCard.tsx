'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Heart, Clock, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui';
import { useAuthStore } from '@/stores/useAuthStore';
import { useGetFavorites, useToggleFavorite } from '@/hooks/queries/useFavorite';
import type { Restaurant } from '@/lib/api/restaurant.api';

interface RestaurantCardProps {
  restaurant: Restaurant;
  activeTags?: string;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, activeTags }) => {
  const { isAuthenticated } = useAuthStore();
  const { data: favorites } = useGetFavorites();
  const toggleMutation = useToggleFavorite();
  
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (favorites) {
      setIsFavorited(favorites.some(f => f.id === restaurant.id || f.id === (restaurant as any)._id));
    }
  }, [favorites, restaurant]);

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

  const rId = (restaurant as any)._id || restaurant.id;
  const placeholderImage = `https://picsum.photos/seed/${rId}/600/400`;
  const imageSrc = (restaurant as any).avatarUrl || restaurant.cover_image || placeholderImage;
  const name = (restaurant as any).tenQuan || restaurant.name;
  const address = (restaurant as any).diaChi || restaurant.address;
  const priceRange = (restaurant as any).priceRange || restaurant.priceRange;
  const openingTime = (restaurant as any).openingTime || restaurant.openingTime;


  
  let cuisineTags: string[] = [];
  const dbTags = (restaurant as any).tags || restaurant.cuisine;
  
  if (dbTags) {
    cuisineTags = dbTags.split(',').map((t: string) => t.trim());
  } else {
    cuisineTags = ['Nhà hàng'];
  }

  const rating = (restaurant as any).diemTrungBinh ? Number((restaurant as any).diemTrungBinh) : restaurant.rating_avg ? (Number(restaurant.rating_avg) / 2) : null;

  return (
    <Link href={`/restaurant/${rId}`} className="block h-full group">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={name}
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

          {rating && (
            <div className="absolute bottom-3 left-3 text-white flex items-center bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-gray-900 line-clamp-1 flex-1">{name}</h3>
          </div>
          
          {cuisineTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {cuisineTags.map((tag: string, idx: number) => (
                <span 
                  key={idx}
                  className="inline-flex px-2 py-0.5 text-xs font-medium rounded-md border border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-start text-sm text-slate-600 font-medium mt-2">
            <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0 mt-0.5 text-slate-400" />
            <span className="line-clamp-1">{address || 'Đang cập nhật địa chỉ'}</span>
          </div>

          {(openingTime || priceRange) && (
            <div className="flex flex-col gap-2 text-sm text-slate-600 font-medium mt-2">
              {openingTime && (
                <div className="flex items-start">
                  <Clock className="w-4 h-4 mr-1.5 flex-shrink-0 mt-0.5 text-slate-400" />
                  <span className="line-clamp-1">{openingTime}</span>
                </div>
              )}
              {priceRange && (
                <div className="flex items-start">
                  <DollarSign className="w-4 h-4 mr-1.5 flex-shrink-0 mt-0.5 text-slate-400" />
                  <span className="line-clamp-1">{priceRange}</span>
                </div>
              )}
            </div>
          )}
          
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
