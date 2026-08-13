'use client';

import { useState, useRef, useEffect } from 'react';
import { Star } from 'lucide-react';

import type { Review } from '@/types/restaurant';
import { Button, Card } from '@/components/ui';
import { ReviewModal } from './ReviewModal';

interface RestaurantReviewsProps {
  reviews: Review[];
}

function ReviewItem({ review }: { review: Review }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      // Check if the scroll height is greater than the client height (meaning it's truncated)
      setIsTruncated(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, [review.content]);
  
  return (
    <div className="border-b border-slate-100 pb-6 dark:border-slate-800 last:border-0 last:pb-0">
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
              {review.date}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 rounded-lg bg-secondary-50 px-2 py-1 dark:bg-secondary-900/20">
          <Star className="h-4 w-4 fill-secondary-500 text-secondary-500" />
          <span className="font-semibold text-secondary-700 dark:text-secondary-400">{review.rating}</span>
        </div>
      </div>
      
      <p 
        ref={textRef}
        className={`text-slate-600 dark:text-slate-300 ${!isExpanded ? 'line-clamp-3' : ''}`}
      >
        {review.content}
      </p>
      {(isTruncated || isExpanded) && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400"
        >
          {isExpanded ? 'Thu gọn' : 'Xem thêm'}
        </button>
      )}
    </div>
  );
}

export function RestaurantReviews({ reviews }: RestaurantReviewsProps) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

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
          {reviews.slice(0, visibleCount).map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>

        {reviews.length > visibleCount && (
          <div className="mt-8 flex justify-center border-t border-slate-100 pt-6 dark:border-slate-800">
            <Button variant="outline" onClick={() => setVisibleCount(prev => prev + 5)}>
              Xem thêm đánh giá
            </Button>
          </div>
        )}
      </Card>

      <ReviewModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
        restaurantName="Đánh giá nhà hàng" 
      />
    </>
  );
}
