'use client';

import { motion } from 'framer-motion';

import { Button, Input } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { usePreferenceStore } from '@/stores/usePreferenceStore';

export function BudgetStep() {
  const { data, updateData, nextStep, prevStep } = usePreferenceStore();

  const isNextDisabled =
    !data.minBudget ||
    !data.maxBudget ||
    !data.numberOfPeople ||
    data.minBudget >= data.maxBudget;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
          Ví bạn có bao nhiêu?
        </h2>
        <p className="mt-2 text-slate-500">
          Chúng tôi sẽ tìm các quán ăn ngon nhất trong ngân sách.
        </p>
      </div>

      <div className="mx-auto max-w-md space-y-8">
        <div>
          <label className="mb-4 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Khoảng ngân sách mong muốn (Tổng cộng)
          </label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                step={50000}
                value={data.minBudget}
                onChange={(e) => updateData({ minBudget: Number(e.target.value) })}
                helperText={formatCurrency(data.minBudget || 0)}
              />
            </div>
            <span className="text-slate-400">Đến</span>
            <div className="flex-1">
              <Input
                type="number"
                min={0}
                step={50000}
                value={data.maxBudget}
                onChange={(e) => updateData({ maxBudget: Number(e.target.value) })}
                helperText={formatCurrency(data.maxBudget || 0)}
                error={
                  data.maxBudget && data.minBudget && data.maxBudget <= data.minBudget
                    ? 'Phải lớn hơn'
                    : undefined
                }
              />
            </div>
          </div>
        </div>

        <div>
          <Input
            type="number"
            label="Số người tham gia"
            min={1}
            max={20}
            value={data.numberOfPeople}
            onChange={(e) => updateData({ numberOfPeople: Number(e.target.value) })}
            helperText="Để chúng tôi gợi ý quán có không gian phù hợp."
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
        <Button variant="ghost" onClick={prevStep}>
          Quay lại
        </Button>
        <Button onClick={nextStep} disabled={isNextDisabled}>
          Tiếp tục
        </Button>
      </div>
    </motion.div>
  );
}
