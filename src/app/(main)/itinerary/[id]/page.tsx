'use client';

import { ArrowLeft, Map, Share2, Star, Navigation, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ItineraryTimeline } from '@/components/features/itinerary';
import { Button } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { useGetItineraryById } from '@/hooks/queries/useItinerary';

export default function ItineraryDetailPage({ params }: { params: { id: string } }) {
  const { data: response, isLoading, isError } = useGetItineraryById(params.id);
  const itinerary = (response as any)?.data || response;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (isError || !itinerary) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-24 pt-8 bg-slate-50 dark:bg-slate-950">
      <div className="container-app max-w-3xl">
        <Link 
          href="/itinerary" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại danh sách
        </Link>

        {/* Bản đồ lộ trình toàn cảnh */}
        <div className="relative mb-8 h-[30vh] min-h-[250px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-80">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-primary-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
              <div className="h-1 w-16 border-t-2 border-dashed border-primary-500/50" />
              <div className="h-4 w-4 rounded-full bg-accent-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
              <div className="h-1 w-16 border-t-2 border-dashed border-accent-500/50" />
              <div className="h-4 w-4 rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-500 uppercase tracking-widest">Bản đồ lộ trình tương tác</p>
          </div>
        </div>

        {/* Header Overview */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 dark:bg-slate-900 mb-8 border border-slate-100 shadow-sm dark:border-slate-800">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 mb-3">
                <Star className="h-3.5 w-3.5" /> Lộ trình AI đề xuất
              </div>
              <h1 className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white leading-snug">
                {itinerary.title || 'Lộ trình khám phá ẩm thực'}
              </h1>
              <div className="mt-2 text-slate-500 font-medium">
                Khởi hành: {itinerary.start_time ? new Date(itinerary.start_time).toLocaleDateString('vi-VN') : 'Sắp tới'}
              </div>
            </div>
            <div className="flex flex-row gap-4 sm:flex-col sm:items-end shrink-0">
              <div className="flex flex-col items-start sm:items-end">
                <span className="text-xs font-semibold text-slate-400 uppercase">Ngân sách dự kiến</span>
                <span className="font-bold text-lg text-primary-600 dark:text-primary-400">{formatCurrency(itinerary.budget || 0)}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap items-center gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" className="rounded-full">
              <Share2 className="mr-2 h-4 w-4" />
              Chia sẻ
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Star className="mr-2 h-4 w-4" />
              Lưu lộ trình
            </Button>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
            <Map className="h-5 w-5 text-primary-500" />
            Chi tiết các điểm dừng
          </h2>
          <ItineraryTimeline itinerary={itinerary} />
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 w-[90%] max-w-sm">
          <Button size="lg" className="w-full h-14 rounded-full text-lg shadow-xl shadow-primary-500/30 hover:scale-105 active:scale-95 transition-all bg-gradient-to-r from-primary-500 to-primary-600 animate-in slide-in-from-bottom-10 duration-700">
            <Navigation className="mr-2 h-5 w-5" /> Bắt đầu di chuyển
          </Button>
        </div>

      </div>
    </div>
  );
}
