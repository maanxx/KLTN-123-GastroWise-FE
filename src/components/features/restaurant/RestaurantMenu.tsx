import { Flame } from 'lucide-react';

import { formatCurrency } from '@/lib/utils';
import type { MenuItem } from '@/lib/mock/restaurant';

interface RestaurantMenuProps {
  menu: MenuItem[];
}

export function RestaurantMenu({ menu }: RestaurantMenuProps) {
  return (
    <div className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
          Thực đơn nổi bật
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {menu.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-primary-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-primary-800"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-slate-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                  {item.name}
                  {item.isPopular && (
                    <span className="flex items-center gap-1 rounded-full bg-secondary-100 px-2 py-0.5 text-xs font-semibold text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400">
                      <Flame className="h-3 w-3" /> Hot
                    </span>
                  )}
                </h3>
                {item.description && (
                  <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
              <div className="shrink-0 font-semibold text-slate-900 dark:text-white">
                {formatCurrency(item.price)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
