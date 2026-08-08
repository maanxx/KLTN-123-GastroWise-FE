import { Calendar, Map, Wallet } from 'lucide-react';
import Link from 'next/link';

import { Card } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import type { Itinerary } from '@/lib/mock/itinerary';

interface ItineraryCardProps {
  itinerary: Itinerary;
}

export function ItineraryCard({ itinerary }: ItineraryCardProps) {
  return (
    <Link href={`/itinerary/${itinerary.id}`} className="block group h-full">
      <Card className="h-full overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/20 border-slate-200/60 dark:border-slate-800/60">
        
        {/* Map Thumbnail Placeholder */}
        <div className="relative h-40 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out">
            <Map className="h-10 w-10 text-primary-500 mb-2 opacity-50" />
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary-500 animate-ping" />
              <div className="h-0.5 w-8 border-t-2 border-dashed border-primary-500" />
              <div className="h-2 w-2 rounded-full bg-accent-500" />
            </div>
          </div>
          
          {/* Glassmorphism Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-slate-800 shadow-sm dark:bg-slate-950/80 dark:text-slate-200">
            <Calendar className="h-3 w-3 text-primary-500" />
            {new Date(itinerary.date).toLocaleDateString('vi-VN')}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col justify-between h-[calc(100%-160px)] bg-white dark:bg-slate-950">
          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 line-clamp-2 leading-snug">
              {itinerary.title}
            </h3>
            
            <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Điểm đến</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {itinerary.stops.length} địa điểm
                </span>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Quãng đường</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {itinerary.totalDistance} km
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/60">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                <Wallet className="h-4 w-4" />
              </div>
              <span className="font-bold text-primary-600 dark:text-primary-400">
                {formatCurrency(itinerary.totalBudget)}
              </span>
            </div>
            
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-primary-500 group-hover:text-white transition-colors dark:bg-slate-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
