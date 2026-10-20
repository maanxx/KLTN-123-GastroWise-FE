'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { Button, Input } from '@/components/ui';
import { DIETARY_OPTIONS } from '@/lib/constants';
import { usePreferenceStore } from '@/stores/usePreferenceStore';
import { useGenerateItinerary } from '@/hooks/queries/useItinerary';
import { useAuthStore } from '@/stores/useAuthStore';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from 'sonner';

export function OptionsStep() {
  const { t } = useTranslation();
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
      toast.warning(t('alert.login_required') || 'Vui lòng đăng nhập để tạo lộ trình!', {
        description: 'Đăng nhập giúp lưu trữ và quản lý các chuyến đi ẩm thực của bạn.',
        action: {
          label: 'Đăng nhập',
          onClick: () => router.push('/login'),
        },
      });
      setTimeout(() => router.push('/login'), 1200);
      return;
    }

    const toastId = toast.loading('Đang khởi tạo lộ trình theo sở thích cá nhân...', {
      description: 'GastroAI đang phân tích khẩu vị, kiêng kỵ và ngân sách...',
    });

    const payload = {
      title: data.notes ? data.notes.substring(0, 50) : 'Lộ trình từ Preferences',
      prompt: data.notes || 'Lộ trình ẩm thực theo sở thích cá nhân',
      start_time: new Date().toISOString(),
      end_time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      budget: data.maxBudget || 500000,
      lat: 10.7769, // Default to center of HCMC
      lng: 106.7009
    };

    generateItinerary(payload, {
      onSuccess: (res: any) => {
        const itineraryId = res?.id || res?.data?.id || res?._id || res?.data?._id;
        if (itineraryId) {
          toast.success('Tạo lộ trình ẩm thực thành công!', {
            id: toastId,
            description: 'Đang mở trang chi tiết lộ trình...',
          });
          router.push(`/itinerary/${itineraryId}`);
        } else {
          toast.error(t('alert.itinerary_create_error') || 'Không tạo được lộ trình, vui lòng thử lại!', {
            id: toastId,
          });
        }
      },
      onError: (err: any) => {
        toast.error(t('alert.ai_server_error') || 'Lỗi khi kết nối với máy chủ AI. Vui lòng thử lại sau!', {
          id: toastId,
          description: err?.response?.data?.message || err?.message || 'Hệ thống đang bận',
        });
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
