'use client';

import { motion } from 'framer-motion';

import { Button, Card } from '@/components/ui';
import { CUISINE_TYPES } from '@/lib/constants';
import { usePreferenceStore } from '@/stores/usePreferenceStore';

export function CuisineStep() {
  const { data, updateData, nextStep } = usePreferenceStore();
  const selectedCuisines = data.cuisineTypes || [];

  const toggleCuisine = (id: string) => {
    if (selectedCuisines.includes(id as any)) {
      updateData({
        cuisineTypes: selectedCuisines.filter((c) => c !== id) as any[],
      });
    } else {
      if (selectedCuisines.length >= 5) return; // Max 5
      updateData({
        cuisineTypes: [...selectedCuisines, id] as any[],
      });
    }
  };

  const isNextDisabled = selectedCuisines.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
          Bạn đang thèm ăn gì?
        </h2>
        <p className="mt-2 text-slate-500">
          Chọn tối đa 5 loại ẩm thực bạn muốn khám phá hôm nay.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {CUISINE_TYPES.map((cuisine) => {
          const isSelected = selectedCuisines.includes(cuisine.id as any);
          return (
            <Card
              key={cuisine.id}
              onClick={() => toggleCuisine(cuisine.id)}
              className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500 dark:bg-primary-900/20'
                  : 'hover:border-primary-200 dark:hover:border-primary-800'
              }`}
            >
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <div className="mb-4 text-primary-500">{cuisine.icon}</div>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {cuisine.label}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
        <span className="text-sm text-slate-500">
          Đã chọn {selectedCuisines.length}/5
        </span>
        <Button onClick={nextStep} disabled={isNextDisabled}>
          Tiếp tục
        </Button>
      </div>
    </motion.div>
  );
}
