'use client';

import { useState } from 'react';
import { Camera, Star, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

import { Button } from '@/components/ui';
import { useCreateReview } from '@/hooks/queries/useReviews';
import { useAuthStore } from '@/stores/useAuthStore';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
  restaurantId?: string;
}

export function ReviewModal({ isOpen, onClose, restaurantName, restaurantId }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState('');
  
  const { user } = useAuthStore();
  const createReviewMutation = useCreateReview(restaurantId || '');

  const handleSubmit = async () => {
    if (rating === 0 || !content.trim()) return;

    try {
      const userName = user 
        ? (user.fullName || `${(user as any).firstName || ''} ${(user as any).lastName || ''}`.trim() || user.username || user.email)
        : 'Khách hàng';

      await createReviewMutation.mutateAsync({
        restaurantId: restaurantId || '',
        diemReview: rating,
        noiDung: content,
        userName,
      });

      toast.success('Gửi đánh giá thành công! AI đang phân tích cảm xúc bài viết.');
      setRating(0);
      setContent('');
      onClose();
    } catch (err: any) {
      toast.error('Gửi đánh giá thất bại: ' + (err.response?.data?.message || err.message || 'Lỗi kết nối'));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative z-10 flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800">
              <h3 className="ml-2 font-heading font-bold text-slate-900 dark:text-white">
                Đánh giá quán ăn
              </h3>
              <button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              <h2 className="mb-4 truncate font-heading text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
                {restaurantName}
              </h2>

              {/* Star Rating (Google Maps Style) */}
              <div className="mb-5 flex flex-col items-center">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star 
                        className={`h-9 w-9 transition-colors duration-200 sm:h-10 sm:w-10 ${
                          star <= (hoverRating || rating) 
                            ? 'fill-amber-500 text-amber-500' 
                            : 'fill-transparent text-slate-300 dark:text-slate-700'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
                <span className="mt-2 text-xs font-medium text-slate-500 sm:text-sm">
                  {rating === 0 ? 'Bạn chấm quán này mấy sao?' : 
                   rating === 1 ? 'Rất tệ 😞' :
                   rating === 2 ? 'Tệ 🙁' :
                   rating === 3 ? 'Bình thường 😐' :
                   rating === 4 ? 'Tốt 🙂' : 'Tuyệt vời! 😍'}
                </span>
              </div>

              {/* Textarea */}
              <div className="mb-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Chia sẻ trải nghiệm ẩm thực của bạn (không gian, phục vụ, mùi vị...)"
                  className="min-h-[100px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition-colors focus:border-primary-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:focus:bg-slate-900"
                />
              </div>

              {/* Upload Zone */}
              <div className="mb-5">
                <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 py-3 transition-colors hover:border-primary-400 hover:bg-primary-50/50 dark:border-slate-800 dark:bg-slate-900/50">
                  <div className="rounded-full bg-primary-100 p-1.5 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                    <Camera className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 sm:text-sm">Thêm ảnh (Không bắt buộc)</span>
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={onClose}>
                  Huỷ bỏ
                </Button>
                <Button 
                  className="flex-1 rounded-xl" 
                  disabled={rating === 0 || !content.trim() || createReviewMutation.isPending} 
                  onClick={handleSubmit}
                >
                  {createReviewMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Đang gửi...
                    </span>
                  ) : (
                    'Gửi đánh giá'
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
