import { Clock, MapPin, Navigation, Utensils } from 'lucide-react';
import Link from 'next/link';

import { formatCurrency } from '@/lib/utils';
import type { Itinerary } from '@/lib/mock/itinerary';

interface ItineraryTimelineProps {
  itinerary: Itinerary;
}

export function ItineraryTimeline({ itinerary }: ItineraryTimelineProps) {
  return (
    <div className="relative py-8">
      {/* Vertical Connecting Line */}
      <div className="absolute left-6 top-8 bottom-8 w-1 rounded-full bg-primary-100 dark:bg-primary-900/30 md:left-8" />

      <div className="space-y-8">
        {itinerary.stops.map((stop, idx) => (
          <div key={stop.id} className="relative">
            {/* Travel Distance Indicator (shows above all stops except the first one) */}
            {idx > 0 && (
              <div className="absolute -top-6 left-12 flex items-center gap-2 text-xs font-semibold text-slate-500 md:left-16 bg-white dark:bg-slate-950 px-2 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm z-20">
                <Navigation className="h-3 w-3 text-primary-500" />
                <span>{stop.distanceFromPrevious} km</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-primary-600 dark:text-primary-400">~ 15 phút lái xe</span>
              </div>
            )}

            <div className="flex items-start gap-4 md:gap-6">
              {/* Timeline Node (Green Dot) */}
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg dark:border-slate-950">
                <Utensils className="h-5 w-5 text-white" />
              </div>

              {/* Stop Content Card */}
              <div className="flex-1 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-primary-100 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-primary-900/50 group">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Link href={`/restaurant/1`} className="font-heading text-lg font-bold text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {stop.restaurantName}
                    </Link>
                    <div className="mt-1">
                      <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {stop.cuisine}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-1 sm:items-end">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2.5 py-1 rounded-lg">
                      <Clock className="h-4 w-4" />
                      {stop.time}
                    </div>
                    <div className="text-sm font-medium text-slate-500 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      ~ {formatCurrency(stop.estimatedCost)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <span>{stop.address}</span>
                </div>
                
                {/* AI Note (M14 Upgrade) */}
                <div className="mt-4 p-3 rounded-xl bg-accent-50/50 border border-accent-100/50 text-sm text-accent-700 dark:bg-accent-950/30 dark:border-accent-900/30 dark:text-accent-400 flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-accent-500 shrink-0" />
                  <p className="leading-relaxed">AI gợi ý: Quán thường rất đông vào giờ này, bạn nên tranh thủ đến sớm 10 phút hoặc đặt bàn trước qua ứng dụng nhé.</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
