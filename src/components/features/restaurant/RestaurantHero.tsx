'use client';

import { Heart, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui';
import type { Restaurant } from '@/types/restaurant';
import { useAuthStore } from '@/stores/useAuthStore';
import { useGetFavorites, useToggleFavorite } from '@/hooks/queries/useFavorite';

interface RestaurantHeroProps {
  restaurant: Restaurant;
}

export function RestaurantHero({ restaurant }: RestaurantHeroProps) {
  const { isAuthenticated } = useAuthStore();
  const { data: favorites } = useGetFavorites();
  const toggleMutation = useToggleFavorite();
  
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (favorites) {
      setIsFavorited(favorites.some((f: any) => f.id === restaurant.id || f.id === (restaurant as any)._id));
    }
  }, [favorites, restaurant]);

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      toast.info('Vui lòng đăng nhập để lưu quán ăn!');
      return;
    }
    
    setIsFavorited(!isFavorited);
    const rId = (restaurant as any)._id || restaurant.id;
    toggleMutation.mutate(rId, {
      onSuccess: (data) => {
        if (data.isFavorite) {
          toast.success(data.message || 'Đã thêm vào mục yêu thích');
        } else {
          toast.success(data.message || 'Đã bỏ lưu quán ăn');
        }
      },
      onError: () => {
        setIsFavorited(isFavorited);
        toast.error('Có lỗi xảy ra khi lưu quán ăn.');
      }
    });
  };
  return (
    <div className="relative h-[40vh] min-h-[300px] w-full lg:h-[50vh]">
      {/* Cover Image */}
      <Image
        src={restaurant.coverImage}
        alt={restaurant.name}
        fill
        priority
        className="object-cover object-center"
      />
      
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full pb-8 pt-12">
        <div className="container-app flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="text-white">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {restaurant.cuisineTypes.map((type, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-primary-500/20 px-3 py-1 text-xs font-semibold text-primary-300 backdrop-blur-md border border-primary-500/30"
                >
                  {type}
                </span>
              ))}
            </div>
            
            <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {restaurant.name}
            </h1>
            
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-200">
              <div className="flex items-center gap-1.5 font-medium text-secondary-400">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-base text-white">{restaurant.rating}</span>
                <span className="text-slate-300">({restaurant.reviewCount} đánh giá)</span>
              </div>
              <div className="hidden h-1.5 w-1.5 rounded-full bg-slate-500 sm:block" />
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-1 max-w-[250px]">{restaurant.address}</span>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <Button 
              onClick={handleToggleFavorite}
              className={`backdrop-blur-md border border-white/20 transition-all ${
                isFavorited 
                  ? 'bg-white text-red-500 hover:bg-slate-100 hover:text-red-600' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Heart className={`mr-2 h-5 w-5 ${isFavorited ? 'fill-red-500' : ''}`} />
              {isFavorited ? 'Đã lưu' : 'Lưu quán'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
