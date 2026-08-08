import { ArrowLeft, Map, Share2, Star } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ItineraryTimeline } from '@/components/features/itinerary';
import { Button } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { MOCK_ITINERARIES } from '@/lib/mock/itinerary';

export default function ItineraryDetailPage({ params }: { params: { id: string } }) {
  const itinerary = MOCK_ITINERARIES.find((i) => i.id === params.id);

  if (!itinerary) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-24 pt-8">
      <div className="container-app max-w-3xl">
        <Link 
          href="/itinerary" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại danh sách
        </Link>

        {/* Header Overview */}
        <div className="rounded-3xl bg-primary-50 p-6 sm:p-8 dark:bg-primary-900/10 mb-8 border border-primary-100 dark:border-primary-900/30">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                {itinerary.title}
              </h1>
              <div className="mt-2 text-primary-600 dark:text-primary-400 font-medium">
                {new Date(itinerary.date).toLocaleDateString('vi-VN')}
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:items-end shrink-0">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(itinerary.totalBudget)}</span>
                <span className="text-sm">ước tính</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white">{itinerary.totalDistance} km</span>
                <span className="text-sm">di chuyển</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button size="sm">
              <Map className="mr-2 h-4 w-4" />
              Mở bản đồ
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Chia sẻ
            </Button>
            <Button variant="ghost" size="sm">
              <Star className="mr-2 h-4 w-4" />
              Lưu yêu thích
            </Button>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-6">
          <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
            Chi tiết lộ trình
          </h2>
          <ItineraryTimeline itinerary={itinerary} />
        </div>
      </div>
    </div>
  );
}
