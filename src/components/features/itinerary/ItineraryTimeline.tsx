'use client';

import React from 'react';
import { MapPin, Navigation, Clock, CheckCircle2 } from 'lucide-react';
import type { Itinerary } from '@/lib/api/itinerary.api';

interface ItineraryTimelineProps {
  itinerary: Itinerary;
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ itinerary }) => {
  const stops = itinerary.stops || [];

  if (stops.length === 0) {
    return <div className="text-gray-500 italic p-4 text-center">Chưa có điểm dừng nào trong lộ trình này.</div>;
  }

  const handleOpenGoogleMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  return (
    <div className="relative border-l-2 border-primary-200 ml-4 md:ml-6 mt-6 pb-4">
      {stops.map((stop, index) => (
        <div key={stop.stop_id} className="mb-10 ml-8 relative group">
          {/* Marker timeline */}
          <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full -left-12 ring-4 ring-white">
            <CheckCircle2 className="w-5 h-5 text-primary-600" />
          </span>
          
          <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
            {stop.restaurant_name}
            {index === 0 && <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ml-3">Điểm xuất phát</span>}
          </h3>
          
          <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-gray-400" />
              Điểm dừng thứ {stop.order_index}
            </span>
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-gray-400" />
              Tọa độ: {stop.restaurant_lat.toFixed(4)}, {stop.restaurant_lng.toFixed(4)}
            </span>
          </div>
          
          <p className="mb-4 text-base font-normal text-gray-600">
            Hãy thưởng thức bữa ăn tuyệt vời tại {stop.restaurant_name}. Nằm trong ngân sách và khoảng cách tối ưu dựa trên vị trí của bạn.
          </p>
          
          <button 
            onClick={() => handleOpenGoogleMaps(stop.restaurant_lat, stop.restaurant_lng)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 bg-white border border-primary-200 rounded-lg hover:bg-primary-50 hover:text-primary-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-primary-100 transition-colors"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Chỉ đường bằng Google Maps
          </button>
        </div>
      ))}
      
      {/* End point */}
      <div className="ml-8 relative">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-12 ring-4 ring-white">
          <MapPin className="w-5 h-5 text-gray-500" />
        </span>
        <h3 className="text-lg font-semibold text-gray-600">Kết thúc lộ trình</h3>
        <p className="text-sm text-gray-500 mt-1">Chúc bạn có một trải nghiệm ẩm thực vui vẻ!</p>
      </div>
    </div>
  );
};
