'use client';

import { motion } from 'framer-motion';

import { Button, Card, Input } from '@/components/ui';
import { TIME_SLOTS } from '@/lib/constants';
import { usePreferenceStore } from '@/stores/usePreferenceStore';

export function TimeStep() {
  const { data, updateData, nextStep, prevStep } = usePreferenceStore();
  const selectedSlots = data.timeSlots || [];

  const toggleSlot = (id: string) => {
    if (selectedSlots.includes(id as any)) {
      updateData({
        timeSlots: selectedSlots.filter((s) => s !== id) as any[],
      });
    } else {
      updateData({
        timeSlots: [...selectedSlots, id] as any[],
      });
    }
  };

  const isNextDisabled = !data.date || selectedSlots.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
          Khi nào bạn muốn đi?
        </h2>
        <p className="mt-2 text-slate-500">
          Lộ trình sẽ được tối ưu dựa trên thời gian thực tế.
        </p>
      </div>

      <div className="mx-auto max-w-md space-y-8">
        <div>
          <Input
            type="date"
            label="Ngày khởi hành"
            value={data.date || ''}
            onChange={(e) => updateData({ date: e.target.value })}
            min={new Date().toISOString().split('T')[0]} // Không chọn ngày quá khứ
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Khung giờ mong muốn
          </label>
          <div className="space-y-3">
            {TIME_SLOTS.map((slot) => {
              const isSelected = selectedSlots.includes(slot.id as any);
              return (
                <Card
                  key={slot.id}
                  onClick={() => toggleSlot(slot.id)}
                  className={`flex cursor-pointer items-center justify-between p-4 transition-all hover:border-primary-300 ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500 dark:bg-primary-900/20'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div>{slot.icon}</div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      {slot.label}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-500">
                    {slot.timeRange}
                  </span>
                </Card>
              );
            })}
          </div>
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
