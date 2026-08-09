'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Navigation, DollarSign, Calendar, Clock, Loader2 } from 'lucide-react';
import { Input, Button, Card } from '@/components/ui';
import { useGenerateItinerary } from '@/hooks/queries/useItinerary';
import { useAuthStore } from '@/stores/useAuthStore';
import { ItineraryTimeline } from '@/components/features/itinerary/ItineraryTimeline';
import type { Itinerary } from '@/lib/api/itinerary.api';

export default function AiPlannerPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const generateMutation = useGenerateItinerary();

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');

  const [budget, setBudget] = useState('500000');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  
  const [result, setResult] = useState<Itinerary | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để sử dụng tính năng tạo lộ trình thông minh.');
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleGetLocation = () => {
    setIsLocating(true);
    setLocationError('');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Lấy toạ độ thật
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setIsLocating(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Fallback location (Trung tâm TP.HCM)
          setLat(10.7769);
          setLng(106.7009);
          setLocationError('Không thể lấy vị trí thật, đang sử dụng vị trí mặc định (Trung tâm TP.HCM).');
          setIsLocating(false);
        }
      );
    } else {
      setLat(10.7769);
      setLng(106.7009);
      setLocationError('Trình duyệt không hỗ trợ Geolocation, dùng vị trí mặc định.');
      setIsLocating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lat || !lng) {
      alert('Vui lòng lấy vị trí hiện tại trước khi tạo lộ trình.');
      return;
    }

    if (!startTime || !endTime) {
      alert('Vui lòng nhập thời gian.');
      return;
    }

    const payload = {
      start_time: new Date(startTime).toISOString(),
      end_time: new Date(endTime).toISOString(),
      budget: Number(budget),
      lat,
      lng
    };

    generateMutation.mutate(payload, {
      onSuccess: (data) => {
        setResult(data);
      },
      onError: (error: any) => {
        alert(error.message || 'Không tìm thấy quán ăn nào phù hợp với yêu cầu của bạn.');
      }
    });
  };

  if (!isAuthenticated) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">GastroWise AI Planner</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ứng dụng thuật toán tối ưu lộ trình kết hợp dữ liệu không gian, giúp bạn lên kế hoạch ăn uống hoàn hảo dựa trên vị trí, ngân sách và thời gian rảnh.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form nhập liệu */}
        <div className="lg:col-span-5">
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Navigation className="w-5 h-5 mr-2 text-primary-600" />
              Thông số chuyến đi
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vị trí hiện tại của bạn</label>
                <div className="flex flex-col gap-2">
                  <Button 
                    type="button" 
                    variant={lat ? "outline" : "primary"}
                    className="w-full justify-center"
                    onClick={handleGetLocation}
                    disabled={isLocating}
                  >
                    {isLocating ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Đang lấy vị trí...</>
                    ) : (
                      <><MapPin className="w-4 h-4 mr-2" /> {lat ? 'Cập nhật lại vị trí' : 'Lấy vị trí tự động'}</>
                    )}
                  </Button>
                  
                  {lat && lng && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        Đã xác định: {lat.toFixed(4)}, {lng.toFixed(4)}
                        {locationError && <p className="text-amber-600 mt-1 text-xs">{locationError}</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ngân sách dự kiến (VNĐ)</label>
                <div className="relative">
                  <DollarSign className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input 
                    type="number" 
                    className="pl-10" 
                    placeholder="Ví dụ: 500000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bắt đầu lúc</label>
                  <div className="relative">
                    <Calendar className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input 
                      type="datetime-local" 
                      className="pl-10" 
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kết thúc lúc</label>
                  <div className="relative">
                    <Clock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input 
                      type="datetime-local" 
                      className="pl-10" 
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full text-lg py-6"
                isLoading={generateMutation.isPending}
                disabled={!lat}
              >
                Tạo lộ trình ngay
              </Button>
            </form>
          </Card>
        </div>

        {/* Kết quả hiển thị Timeline */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[500px]">
            <h2 className="text-xl font-bold mb-6 text-gray-900 border-b pb-4">Kết quả Lộ trình của bạn</h2>
            
            {!result && !generateMutation.isPending && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Navigation className="w-12 h-12 mb-4 text-gray-300" />
                <p>Nhập thông tin bên trái và bấm "Tạo lộ trình"</p>
                <p className="text-sm">để xem đề xuất từ AI Planner</p>
              </div>
            )}

            {generateMutation.isPending && (
              <div className="flex flex-col items-center justify-center h-64 text-primary-600">
                <Loader2 className="w-12 h-12 mb-4 animate-spin" />
                <p className="font-medium animate-pulse">Thuật toán đang tính toán lộ trình tối ưu...</p>
              </div>
            )}

            {result && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-6 p-4 bg-primary-50 rounded-lg text-primary-800">
                  <h3 className="font-bold text-lg mb-2">{result.title}</h3>
                  <p className="text-sm flex flex-wrap gap-x-4 gap-y-2">
                    <span><strong>Ngân sách:</strong> {Number(result.budget).toLocaleString()} VNĐ</span>
                    <span><strong>Tổng điểm đến:</strong> {result.stops?.length || 0} nhà hàng</span>
                  </p>
                </div>
                
                <ItineraryTimeline itinerary={result} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
