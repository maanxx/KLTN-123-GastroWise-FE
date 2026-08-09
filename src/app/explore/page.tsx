'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Star, Utensils, Coffee, Pizza, Loader2 } from 'lucide-react';
import { useGetAllRestaurants } from '@/hooks/queries/useRestaurants';
import { RestaurantCard } from '@/components/features/restaurant/RestaurantCard';
import { Input, Button } from '@/components/ui';

const CATEGORIES = [
  { id: 'all', name: 'Tất cả', icon: Utensils },
  { id: 'pho', name: 'Phở', icon: Utensils },
  { id: 'cafe', name: 'Cafe & Trà', icon: Coffee },
  { id: 'fastfood', name: 'Đồ ăn nhanh', icon: Pizza },
  { id: 'bbq', name: 'Lẩu & Nướng', icon: Utensils },
  { id: 'vegetarian', name: 'Đồ chay', icon: Utensils },
];

export default function ExplorePage() {
  const { data: restaurants, isLoading } = useGetAllRestaurants();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredRestaurants = restaurants?.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (restaurant.address && restaurant.address.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || 
                            (restaurant.cuisine && restaurant.cuisine.toLowerCase().includes(activeCategory.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20">
      {/* Header Section */}
      <div className="bg-white border-b sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto"
          >
            <div className="relative w-full flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                placeholder="Tìm kiếm món ăn, nhà hàng, địa điểm..." 
                className="pl-12 h-14 text-lg rounded-2xl shadow-sm border-gray-200 focus:border-primary-500 focus:ring-primary-500 bg-gray-50/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-14 px-6 rounded-2xl md:w-auto w-full flex items-center gap-2 border-gray-200">
              <Filter className="w-5 h-5" />
              Bộ lọc
            </Button>
          </motion.div>

          {/* Categories */}
          <div className="flex overflow-x-auto gap-3 py-4 mt-4 scrollbar-hide max-w-4xl mx-auto">
            {CATEGORIES.map((cat, index) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary-600 text-white shadow-md' 
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-primary-500'}`} />
                  <span className="font-medium text-sm">{cat.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Khám phá địa điểm ẩm thực</h1>
            <p className="text-gray-500 mt-2 text-lg">Tìm thấy {filteredRestaurants?.length || 0} kết quả phù hợp</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="w-10 h-10 animate-spin text-primary-500 mb-4" />
            <p className="text-gray-500">Đang tìm kiếm món ngon cho bạn...</p>
          </div>
        ) : filteredRestaurants && filteredRestaurants.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredRestaurants.map((restaurant, index) => (
              <motion.div 
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <Utensils className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-800">Không tìm thấy quán ăn nào!</h3>
            <p className="text-gray-500 mt-2">Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác nhé.</p>
            <Button 
              className="mt-6" 
              variant="outline"
              onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
