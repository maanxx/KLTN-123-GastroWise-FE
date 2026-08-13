import React from 'react';
import { RestaurantCard } from './RestaurantCard';
import { PaginationControls } from './PaginationControls';
import { Button } from '@/components/ui';
import Link from 'next/link';

async function fetchAllRestaurants(page: number, search: string, tags?: string, rating?: string, openNow?: string, sortBy?: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const url = new URL(`${API_URL}/restaurants`);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', '20');
    url.searchParams.append('sortBy', sortBy || 'diemTrungBinh');
    url.searchParams.append('order', 'desc');
    if (search) url.searchParams.append('search', search);
    if (tags) url.searchParams.append('tags', tags);
    if (rating) url.searchParams.append('rating', rating);
    if (openNow) url.searchParams.append('openNow', openNow);

    const res = await fetch(url.toString(), {
      cache: "no-store", 
    });

    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return {
      restaurants: data?.data || [],
      pagination: { totalPages: data?.totalPages || 1 }
    };
  } catch (error) {
    console.error("Lỗi khi lấy danh sách quán ăn SSR:", error);
    return { restaurants: [], pagination: { totalPages: 1 } };
  }
}

export const AllRestaurantsSSR = async ({ page, search, tags, rating, openNow, sortBy }: { page: number, search: string, tags?: string, rating?: string, openNow?: string, sortBy?: string }) => {
  const { restaurants, pagination } = await fetchAllRestaurants(page, search, tags, rating, openNow, sortBy);

  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-500 font-medium mb-4">Không tìm thấy quán ăn nào phù hợp với tìm kiếm của bạn.</p>
        <Link href="/">
          <Button variant="outline">Xóa tìm kiếm</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {restaurants.map((restaurant: any) => (
          <RestaurantCard key={restaurant.id || restaurant._id} restaurant={restaurant} />
        ))}
      </div>
      <PaginationControls totalPages={pagination.totalPages} />
    </>
  );
};
