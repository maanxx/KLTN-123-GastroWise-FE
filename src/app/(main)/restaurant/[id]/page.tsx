'use client';

import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  RestaurantHero,
  RestaurantInfo,
  RestaurantMenu,
  RestaurantReviews,
  RestaurantVouchers,
} from '@/components/features/restaurant';
import { MOCK_RESTAURANTS } from '@/lib/mock/restaurant';
import { useGetRestaurantById, useGetRestaurantMenu } from '@/hooks/queries/useRestaurants';
import { useGetReviews } from '@/hooks/queries/useReviews';

export default function RestaurantDetailPage({ params }: { params: { id: string } }) {
  const { data: restaurantResponse, isLoading: isResLoading, isError: isResError } = useGetRestaurantById(params.id);
  const { data: menuData, isLoading: isMenuLoading } = useGetRestaurantMenu(params.id);
  const { data: reviewsData, isLoading: isReviewsLoading } = useGetReviews(params.id);

  // Extract from Axios Response
  const apiRestaurant: any = (restaurantResponse as any)?.data || restaurantResponse;
  const menu: any[] = (menuData as any)?.data || menuData || [];
  const reviews: any[] = (reviewsData as any)?.data || reviewsData || [];

  const isLoading = isResLoading || isMenuLoading || isReviewsLoading;
  const isError = isResError;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (isError || !apiRestaurant || !apiRestaurant.id) {
    notFound();
  }

  // Map API data to the UI expected type
  const mockFallback = MOCK_RESTAURANTS.find(r => r.id === params.id) || MOCK_RESTAURANTS[0];
  const restaurant: any = {
    ...mockFallback,
    id: apiRestaurant.id,
    name: apiRestaurant.name,
    address: apiRestaurant.address,
    lat: apiRestaurant.lat,
    lng: apiRestaurant.lng,
    coverImage: apiRestaurant.cover_image || mockFallback.coverImage,
    rating: apiRestaurant.rating_avg ? (Number(apiRestaurant.rating_avg) / 2).toFixed(1) : mockFallback.rating,
    cuisineTypes: apiRestaurant.cuisine ? [apiRestaurant.cuisine] : mockFallback.cuisineTypes,
    description: apiRestaurant.description || mockFallback.description || '',
    phone: apiRestaurant.phone || mockFallback.phone,
    menu: menu.length > 0 ? menu.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: Number(item.price),
      image: item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
    })) : mockFallback.menu,
    reviews: reviews.length > 0 ? reviews.map((rev: any) => ({
      id: rev.id,
      author: rev.full_name || 'Người dùng',
      userAvatar: rev.avatar_url || `https://ui-avatars.com/api/?name=${rev.full_name || 'U'}`,
      rating: Number(rev.rating),
      date: new Date(rev.created_at).toLocaleDateString('vi-VN'),
      content: rev.comment,
    })) : [],
  };

  return (
    <div className="min-h-screen bg-primary-50/30 pb-24 dark:bg-transparent">
      {/* Nút Back về quá khứ */}
      <div className="absolute left-4 top-24 z-20 sm:left-8">
        <Link 
          href="/explore" 
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/40 border border-white/30 shadow-lg"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </div>

      <RestaurantHero restaurant={restaurant} />
      
      <div className="container-app relative z-10 -mt-8 max-w-5xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content (Trái 2 phần) */}
          <div className="lg:col-span-2">
            <RestaurantVouchers />
            <RestaurantMenu menu={restaurant.menu} />
            <RestaurantReviews reviews={restaurant.reviews} />
          </div>

          {/* Sidebar Info (Phải 1 phần) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <RestaurantInfo restaurant={restaurant} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
