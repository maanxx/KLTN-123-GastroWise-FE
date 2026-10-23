'use client';

import React from 'react';
import { useGetItineraries } from '@/hooks/queries/useItinerary';
import { MOCK_ITINERARIES } from '@/lib/mock/itinerary';
import { ItineraryCard } from './ItineraryCard';
import { Loader2 } from 'lucide-react';

export function ItineraryList() {
  const { data: response, isLoading } = useGetItineraries();
  const apiItineraries = (response as any)?.data || response;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  const hasApiItineraries = Array.isArray(apiItineraries) && apiItineraries.length > 0;
  const items = hasApiItineraries ? apiItineraries : MOCK_ITINERARIES;

  return (
    <div>
      {hasApiItineraries ? (
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
          Lộ trình của bạn ({apiItineraries.length})
        </div>
      ) : (
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          Lộ trình mẫu đề xuất
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((itinerary: any) => (
          <ItineraryCard key={itinerary._id || itinerary.id} itinerary={itinerary} />
        ))}
      </div>
    </div>
  );
}
