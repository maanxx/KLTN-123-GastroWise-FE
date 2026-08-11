'use client';

import React, { useState, useRef } from 'react';
import { useGetRestaurants, useGetRecommendations } from '@/hooks/queries/useRestaurants';
import { useAuthStore } from '@/stores/useAuthStore';
import { RestaurantCard } from './RestaurantCard';
import { Input, Button } from '@/components/ui';
import { Search, Loader2, Camera, Upload } from 'lucide-react';
import { restaurantApi } from '@/lib/api/restaurant.api';

export const RestaurantList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const { isAuthenticated } = useAuthStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageResults, setImageResults] = useState<any[] | null>(null);
  const [isSearchingImage, setIsSearchingImage] = useState(false);

  const isSearching = debouncedSearch.length > 0 || imageResults !== null;

  const { data: searchResults, isLoading: isSearchLoading, isError: isSearchError } = useGetRestaurants({
    search: debouncedSearch,
  });

  const { data: recommendations, isLoading: isRecLoading, isError: isRecError } = useGetRecommendations(
    { page, limit: 8 },
    isAuthenticated && !isSearching
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedSearch(searchTerm);
    setImageResults(null);
    setPage(1); // Reset page on search
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

  const displayRestaurants = imageResults !== null 
    ? imageResults
    : (isSearching 
      ? searchResults 
      : (isAuthenticated ? recommendations : searchResults));

  const isLoading = isSearchingImage ? true : (isSearching ? isSearchLoading : (isAuthenticated ? isRecLoading : isSearchLoading));
  const isError = isSearchingImage ? false : (isSearching ? isSearchError : (isAuthenticated ? isRecError : isSearchError));

  const finalRestaurants = Array.isArray(displayRestaurants) ? displayRestaurants : (displayRestaurants as any)?.data || [];
  const pagination = (displayRestaurants as any)?.pagination;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isSearching ? 'Kết quả tìm kiếm' : (isAuthenticated ? 'Gợi ý dành cho bạn' : 'Tất cả quán ăn')}
            </h2>
            <p className="text-gray-600">
              {imageResults !== null ? 'Kết quả tìm kiếm qua hình ảnh AI' : (isSearching ? `Kết quả cho "${debouncedSearch}"` : (isAuthenticated ? 'Dựa trên sở thích của bạn' : 'Những địa điểm ẩm thực được đánh giá cao nhất'))}
            </p>
          </div>
          
          <form onSubmit={handleSearch} className="flex w-full md:w-auto max-w-sm gap-2">
            <Input
              type="text"
              placeholder="Tìm quán ăn, món ăn..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value === '') {
                  setDebouncedSearch('');
                  setPage(1);
                }
              }}
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

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary-600 mb-4" />
            <p className="text-gray-500">Đang tải danh sách quán ăn...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-red-50 rounded-xl border border-red-100">
            <p className="text-red-500 font-medium">Đã có lỗi xảy ra khi tải dữ liệu từ máy chủ.</p>
          </div>
        ) : finalRestaurants && finalRestaurants.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {finalRestaurants.map((restaurant: any) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
            
            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2 flex-wrap">
                <Button 
                  variant="outline" 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="mr-2"
                >
                  Trước
                </Button>
                
                {(() => {
                  const getPageNumbers = (currentPage: number, totalPages: number) => {
                    if (totalPages <= 5) {
                      return Array.from({ length: totalPages }, (_, i) => i + 1);
                    }
                    if (currentPage <= 3) {
                      return [1, 2, 3, 4, '...', totalPages];
                    }
                    if (currentPage >= totalPages - 2) {
                      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                    }
                    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
                  };
                  
                  return getPageNumbers(page, pagination.totalPages).map((pageNum, idx) => {
                    if (pageNum === '...') {
                      return <span key={`ellipsis-${idx}`} className="px-2 text-slate-400">...</span>;
                    }
                    return (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? "primary" : "outline"}
                        onClick={() => setPage(pageNum as number)}
                        className={`w-10 h-10 p-0 rounded-full ${page === pageNum ? 'shadow-md shadow-primary-500/20' : ''}`}
                      >
                        {pageNum}
                      </Button>
                    );
                  });
                })()}

                <Button 
                  variant="outline" 
                  onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                  className="ml-2"
                >
                  Sau
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 font-medium">Không tìm thấy quán ăn nào phù hợp với tìm kiếm của bạn.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setDebouncedSearch('');
                setPage(1);
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
