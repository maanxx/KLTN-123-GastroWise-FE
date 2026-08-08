'use client';

import { useState } from 'react';
import { Camera, Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
}

export function ReviewModal({ isOpen, onClose, restaurantName }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800">
              <h3 className="font-heading font-bold text-slate-900 dark:text-white ml-2">
                Đánh giá quán ăn
              </h3>
              <button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white truncate mb-6">
                {restaurantName}
              </h2>

              {/* Star Rating (Google Maps Style) */}
              <div className="mb-6 flex flex-col items-center">
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
                        className={`h-10 w-10 transition-colors duration-200 ${
                          star <= (hoverRating || rating) 
                            ? 'fill-amber-500 text-amber-500' 
                            : 'fill-transparent text-slate-300 dark:text-slate-700'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
                <span className="mt-2 text-sm font-medium text-slate-500">
                  {rating === 0 ? 'Bạn chấm quán này mấy sao?' : 
                   rating === 1 ? 'Rất tệ' :
                   rating === 2 ? 'Tệ' :
                   rating === 3 ? 'Bình thường' :
                   rating === 4 ? 'Tốt' : 'Tuyệt vời!'}
                </span>
              </div>

              {/* Textarea */}
              <div className="mb-6">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Chia sẻ trải nghiệm ẩm thực của bạn (không gian, phục vụ, mùi vị...)"
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition-colors focus:border-primary-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:focus:bg-slate-900 min-h-[120px]"
                />
              </div>

              {/* Upload Zone */}
              <div className="mb-6">
                <button className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 py-8 transition-colors hover:border-primary-400 hover:bg-primary-50/50 dark:border-slate-800 dark:bg-slate-900/50">
                  <div className="rounded-full bg-primary-100 p-3 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                    <Camera className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Thêm ảnh (Không bắt buộc)</span>
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={onClose}>
                  Huỷ bỏ
                </Button>
                <Button className="flex-1 rounded-xl" disabled={rating === 0 || !content.trim()} onClick={onClose}>
                  Gửi đánh giá
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
