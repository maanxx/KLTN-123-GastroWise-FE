'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input, Button } from '@/components/ui';
import { Search, Loader2, Camera } from 'lucide-react';
import { restaurantApi } from '@/lib/api/restaurant.api';
import { RestaurantCard } from './RestaurantCard';
import { useAuthStore } from '@/stores/useAuthStore';

interface SearchFilterBarProps {
  children: React.ReactNode;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [imageResults, setImageResults] = useState<any[] | null>(null);
  const [isSearchingImage, setIsSearchingImage] = useState(false);
  const { isAuthenticated } = useAuthStore();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchParams.get('search') !== searchTerm) {
    }
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm === currentSearch) return;

      setImageResults(null);
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm) {
        params.set('search', searchTerm);
      } else {
        params.delete('search');
      }
      params.set('page', '1'); 
      router.push(`/?${params.toString()}`, { scroll: false });
    }, 500); 

    return () => clearTimeout(handler);
  }, [searchTerm, currentSearch, router, searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsSearchingImage(true);
    try {
      const result = await restaurantApi.searchByImage(file);
      if (result && result.data) {
        setImageResults(result.data);
      }
    } catch (error) {
      alert("Lỗi khi tìm kiếm bằng hình ảnh!");
    } finally {
      setIsSearchingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const isSearching = currentSearch.length > 0 || imageResults !== null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {imageResults !== null ? 'Kết quả tìm kiếm AI' : (isSearching ? 'Kết quả tìm kiếm' : (isAuthenticated ? 'Gợi ý dành cho bạn' : 'Tất cả quán ăn'))}
            </h2>
            <p className="text-gray-600">
              {imageResults !== null ? 'Kết quả tìm kiếm qua hình ảnh AI' : (isSearching ? `Kết quả cho "${currentSearch}"` : (isAuthenticated ? 'Dựa trên sở thích của bạn' : 'Những địa điểm ẩm thực được đánh giá cao nhất'))}
            </p>
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
            <Button 
              type="button" 
              variant="outline" 
              className="px-3 border-slate-300 text-slate-600 hover:bg-slate-100" 
              title="Tìm bằng hình ảnh (AI)"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSearchingImage}
            >
              {isSearchingImage ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
            </Button>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </form>
        </div>

        {/* NẾU ĐANG TÌM KIẾM HÌNH ẢNH -> HIỂN THỊ KẾT QUẢ ẢNH, NẾU KHÔNG -> HIỂN THỊ CHILDREN (SSR) */}
        {isSearchingImage ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary-600 mb-4" />
            <p className="text-gray-500">AI đang phân tích hình ảnh...</p>
          </div>
        ) : imageResults !== null ? (
           imageResults.length > 0 ? (
             <>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {imageResults.map((restaurant: any) => (
                   <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                 ))}
               </div>
               <div className="mt-8 flex justify-center">
                  <Button variant="outline" onClick={() => setImageResults(null)}>Xóa kết quả tìm kiếm ảnh</Button>
               </div>
             </>
           ) : (
             <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
               <p className="text-gray-500 font-medium">Không tìm thấy quán ăn nào giống với ảnh.</p>
               <Button variant="outline" className="mt-4" onClick={() => setImageResults(null)}>Quay lại</Button>
             </div>
           )
        ) : (
          children
        )}
      </div>
    </section>
  );
};
