import { Plus } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

import { ItineraryCard } from '@/components/features/itinerary';
import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import { MOCK_ITINERARIES } from '@/lib/mock/itinerary';

export const metadata: Metadata = {
  title: 'Lộ trình của bạn',
};

export default function ItineraryListPage() {
  return (
    <div className="min-h-screen pb-24 pt-8">
      <div className="container-app">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Lộ trình của bạn
            </h1>
            <p className="mt-2 text-slate-500">
              Quản lý các chuyến đi ẩm thực bạn đã tạo bằng AI.
            </p>
          </div>
          <Link href={ROUTES.PREFERENCES}>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-5 w-5" />
              Tạo lộ trình mới
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_ITINERARIES.map((itinerary) => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </div>
      </div>
    </div>
  );
}
