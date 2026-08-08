import { Clock, MapPin, Navigation, Utensils } from 'lucide-react';

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
              <div className="absolute -top-6 left-12 flex items-center gap-2 text-xs font-medium text-slate-400 md:left-16">
                <Navigation className="h-3 w-3" />
                <span>{stop.distanceFromPrevious} km</span>
              </div>
            )}

            <div className="flex items-start gap-4 md:gap-6">
              {/* Timeline Node (Green Dot) */}
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-white bg-primary-500 shadow-md dark:border-slate-900">
                <Utensils className="h-5 w-5 text-white" />
              </div>

              {/* Stop Content Card */}
              <div className="flex-1 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                      {stop.restaurantName}
                    </h4>
                    <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {stop.cuisine}
                    </span>
                  </div>
                  <div className="flex flex-col items-start gap-1 sm:items-end">
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400">
                      <Clock className="h-4 w-4" />
                      {stop.time}
                    </div>
                    <div className="text-sm text-slate-500">
                      ~ {formatCurrency(stop.estimatedCost)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <span>{stop.address}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
