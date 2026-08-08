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
    <Link href={`/itinerary/${itinerary.id}`} className="block group">
      <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-800">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
              {itinerary.title}
            </h3>
            <div className="mt-2 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{new Date(itinerary.date).toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Map className="h-4 w-4" />
                <span>{itinerary.stops.length} điểm đến ({itinerary.totalDistance} km)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
            <Wallet className="h-4 w-4" />
            {formatCurrency(itinerary.totalBudget)}
          </div>
        </div>
      </Card>
    </Link>
  );
}
