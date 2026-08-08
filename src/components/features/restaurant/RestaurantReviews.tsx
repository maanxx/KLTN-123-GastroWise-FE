'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

import type { Review } from '@/lib/mock/restaurant';
import { Button, Card } from '@/components/ui';
import { ReviewModal } from './ReviewModal';

interface RestaurantReviewsProps {
  reviews: Review[];
}

export function RestaurantReviews({ reviews }: RestaurantReviewsProps) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const averageRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1);

  return (
    <>
      <Card className="mt-12 p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
              Đánh giá từ cộng đồng
            </h2>
            <div className="mt-1 flex items-center gap-2">
              <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
              <span className="font-bold text-slate-900 dark:text-white">{averageRating}</span>
              <span className="text-slate-500">({reviews.length} đánh giá)</span>
            </div>
          </div>
          <Button onClick={() => setIsReviewModalOpen(true)}>
            Viết đánh giá
          </Button>
        </div>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-slate-100 pb-6 dark:border-slate-800 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold dark:bg-primary-900/50 dark:text-primary-400">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {review.author}
                    </h4>
                    <span className="text-xs text-slate-500">
                      {new Date(review.date).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 rounded-lg bg-secondary-50 px-2 py-1 dark:bg-secondary-900/20">
                  <Star className="h-4 w-4 fill-secondary-500 text-secondary-500" />
                  <span className="font-semibold text-secondary-700 dark:text-secondary-400">{review.rating}</span>
                </div>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300">
                {review.content}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <ReviewModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
        restaurantName="Đánh giá nhà hàng" 
      />
    </>
  );
}
