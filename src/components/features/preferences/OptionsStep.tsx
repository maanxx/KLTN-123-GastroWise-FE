'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { Button, Input } from '@/components/ui';
import { DIETARY_OPTIONS } from '@/lib/constants';
import { usePreferenceStore } from '@/stores/usePreferenceStore';
import { useGenerateItinerary } from '@/hooks/queries/useItinerary';
import { useAuthStore } from '@/stores/useAuthStore';

export function OptionsStep() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { data, updateData, prevStep } = usePreferenceStore();
  const dietary = data.dietaryOptions || [];
  
  const { mutate: generateItinerary, isPending } = useGenerateItinerary();

  const toggleDietary = (id: string) => {
    if (dietary.includes(id)) {
      updateData({ dietaryOptions: dietary.filter((d) => d !== id) });
    } else {
      updateData({ dietaryOptions: [...dietary, id] });
    }
  };

  const handleSubmit = () => {
    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập để tạo lộ trình!");
      router.push('/login');
      return;
    }

    const payload = {
      title: data.notes ? data.notes.substring(0, 50) : 'Lộ trình từ Preferences',
      start_time: new Date().toISOString(),
      end_time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      budget: data.maxBudget || 500000,
      lat: 10.7769, // Default to center of HCMC
      lng: 106.7009
    };

    generateItinerary(payload, {
      onSuccess: (res: any) => {
        const itineraryId = res?.id || res?.data?.id;
        if (itineraryId) {
          router.push(`/itinerary/${itineraryId}`);
        } else {
          alert('Không tạo được lộ trình, vui lòng thử lại!');
        }
      },
      onError: () => {
        alert('Lỗi khi kết nối với máy chủ AI. Vui lòng thử lại sau!');
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
          Chút yêu cầu nhỏ
        </h2>
        <p className="mt-2 text-slate-500">
          Hãy cho chúng tôi biết nếu bạn có kiêng kị gì.
        </p>
      </div>

      <div className="mx-auto max-w-md space-y-8">
        <div>
          <label className="mb-3 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Tuỳ chọn ăn uống (không bắt buộc)
          </label>
          <div className="flex flex-wrap gap-2">
            {DIETARY_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => toggleDietary(opt.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  dietary.includes(opt.id)
                    ? 'bg-secondary-500 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Khoảng cách di chuyển tối đa
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={50}
              value={data.maxDistance}
              onChange={(e) => updateData({ maxDistance: Number(e.target.value) })}
              className="h-2 w-full appearance-none rounded-full bg-slate-200 accent-primary-500 dark:bg-slate-700"
            />
            <span className="w-16 whitespace-nowrap text-sm font-semibold text-primary-600">
              {data.maxDistance} km
            </span>
          </div>
        </div>

        <div>
          <Input
            label="Ghi chú thêm cho AI"
            placeholder="Ví dụ: Tôi muốn quán ăn có không gian yên tĩnh, bàn ngoài trời..."
            value={data.notes}
            onChange={(e) => updateData({ notes: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
        <Button variant="ghost" onClick={prevStep} disabled={isPending}>
          Quay lại
        </Button>
        <Button 
          onClick={handleSubmit}
          isLoading={isPending}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-xl"
        >
          ✨ AI Ơi, Tạo Lộ Trình!
        </Button>
      </div>
    </motion.div>
  );
}
