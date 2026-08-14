'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useGetReviews, useCreateReview } from '@/hooks/queries/useReviews';
import { Button } from '@/components/ui';
import { useTranslation } from '@/hooks/useTranslation';
import { Star, Loader2, User as UserIcon } from 'lucide-react';
import Link from 'next/link';

interface ReviewSectionProps {
  restaurantId: string;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ restaurantId }) => {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuthStore();
  const { data: reviews, isLoading } = useGetReviews(restaurantId);
  const createReviewMutation = useCreateReview(restaurantId);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    createReviewMutation.mutate(
      { restaurant_id: restaurantId, rating, comment },
      {
        onSuccess: () => {
          setComment('');
          setRating(5);
          alert(t('alert.review_success'));
        },
        onError: (err: any) => {
          alert(t('alert.review_error'));
        },
      }
    );
  };

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Đánh giá từ Cộng đồng</h2>

      {/* Form viết đánh giá */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl mb-8">
          <h3 className="font-semibold text-lg mb-4">Viết đánh giá của bạn</h3>
          <div className="flex items-center mb-4">
            <span className="mr-3 text-sm font-medium">Đánh giá:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 cursor-pointer transition-colors ${
                  star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <div className="mb-4">
            <textarea
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={4}
              placeholder="Chia sẻ trải nghiệm của bạn về món ăn, không gian, phục vụ..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <Button type="submit" isLoading={createReviewMutation.isPending} disabled={!comment.trim()}>
            Gửi đánh giá
          </Button>
        </form>
      ) : (
        <div className="bg-gray-50 p-6 rounded-xl mb-8 flex flex-col items-center justify-center text-center">
          <p className="text-gray-600 mb-4">Bạn cần đăng nhập để viết đánh giá</p>
          <Link href="/login">
            <Button variant="outline">Đăng nhập ngay</Button>
          </Link>
        </div>
      )}

      {/* Danh sách đánh giá */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
        </div>
      ) : reviews && reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm flex gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                {review.avatar_url ? (
                  <img src={review.avatar_url} alt={review.full_name} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-6 h-6 text-gray-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.full_name}</h4>
                    <p className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-gray-700 text-sm leading-relaxed">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic text-center py-8">Chưa có đánh giá nào cho quán ăn này. Hãy là người đầu tiên!</p>
      )}
    </div>
  );
};
