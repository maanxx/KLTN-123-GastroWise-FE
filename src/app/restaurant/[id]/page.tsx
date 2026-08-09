'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useGetRestaurantById } from '@/hooks/queries/useRestaurants';
import { ReviewSection } from '@/components/features/restaurant/ReviewSection';
import { Loader2, MapPin, Clock, Phone, Globe, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function RestaurantDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: restaurant, isLoading, isError } = useGetRestaurantById(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
      </div>
    );
  }

  if (isError || !restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Lỗi: Không tìm thấy quán ăn</h1>
        <Link href="/" className="text-primary-600 hover:underline">Về trang chủ</Link>
      </div>
    );
  }

  const placeholderImage = `https://picsum.photos/seed/${restaurant.id}/1200/600`;
  const imageSrc = restaurant.cover_image || placeholderImage;

  return (
    <main className="pb-16">
      {/* Cover Image */}
      <div className="relative w-full h-[400px]">
        <Image
          src={imageSrc}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 text-white container mx-auto">
          <div className="flex items-center gap-3 mb-2">
            {restaurant.cuisine && (
              <span className="bg-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                {restaurant.cuisine}
              </span>
            )}
            {restaurant.rating_avg && (
              <span className="flex items-center bg-yellow-400/20 backdrop-blur-md text-yellow-400 px-3 py-1 rounded-full text-sm font-bold border border-yellow-400/50">
                <Star className="w-4 h-4 fill-yellow-400 mr-1" />
                {Number(restaurant.rating_avg).toFixed(1)}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{restaurant.name}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Thông tin chi tiết</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>{restaurant.address || 'Đang cập nhật địa chỉ'}</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <Clock className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>{restaurant.opening_hours || 'Đang cập nhật giờ mở cửa'}</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>{restaurant.phone || 'Đang cập nhật số điện thoại'}</span>
              </div>
              {restaurant.website && (
                <div className="flex items-start gap-3 text-gray-700">
                  <Globe className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <a href={restaurant.website.startsWith('http') ? restaurant.website : `https://${restaurant.website}`} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline break-all">
                    {restaurant.website}
                  </a>
                </div>
              )}
            </div>

            {/* Review Section */}
            <ReviewSection restaurantId={restaurant.id} />
          </div>

          {/* Sidebar / Mini Map Placeholder */}
          <div>
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24 border border-gray-200">
              <h3 className="font-bold text-lg mb-4">Bản đồ</h3>
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center flex-col text-gray-500 relative overflow-hidden">
                {/* Tạm thời hiển thị placeholder, sau này tích hợp leaflet/mapbox */}
                <MapPin className="w-8 h-8 mb-2 opacity-50" />
                <span className="text-sm">Bản đồ đang được phát triển</span>
                <div className="absolute inset-0 bg-blue-100/30"></div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p><strong>Vĩ độ:</strong> {restaurant.lat.toFixed(6)}</p>
                <p><strong>Kinh độ:</strong> {restaurant.lng.toFixed(6)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
