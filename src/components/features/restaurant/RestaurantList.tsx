'use client';

import React, { useState } from 'react';
import { useGetRestaurants } from '@/hooks/queries/useRestaurants';
import { RestaurantCard } from './RestaurantCard';
import { Input, Button } from '@/components/ui';
import { Search, Loader2 } from 'lucide-react';

export const RestaurantList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Lấy dữ liệu với React Query
  const { data: restaurants, isLoading, isError } = useGetRestaurants({
    search: debouncedSearch,
  });

  // Handle submit search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedSearch(searchTerm);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Khám phá Quán ăn nổi bật</h2>
            <p className="text-gray-600">Những địa điểm ẩm thực được đánh giá cao nhất dành cho bạn</p>
          </div>
          
          <form onSubmit={handleSearch} className="flex w-full md:w-auto max-w-sm gap-2">
            <Input
              type="text"
              placeholder="Tìm quán ăn, món ăn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white"
            />
            <Button type="submit" variant="primary" className="px-3">
              <Search className="w-5 h-5" />
            </Button>
          </form>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary-600 mb-4" />
            <p className="text-gray-500">Đang tải danh sách quán ăn...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-red-50 rounded-xl border border-red-100">
            <p className="text-red-500 font-medium">Đã có lỗi xảy ra khi tải dữ liệu từ máy chủ.</p>
          </div>
        ) : restaurants && restaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 font-medium">Không tìm thấy quán ăn nào phù hợp với tìm kiếm của bạn.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setDebouncedSearch('');
              }}
            >
              Xóa tìm kiếm
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
