import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewApi, type CreateReviewPayload } from '@/lib/api/review.api';

export const useGetReviews = (restaurantId: string) => {
  return useQuery({
    queryKey: ['reviews', restaurantId],
    queryFn: () => reviewApi.getReviewsByRestaurant(restaurantId),
    enabled: !!restaurantId,
  });
};

export const useCreateReview = (restaurantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => reviewApi.createReview(payload),
    onSuccess: () => {
      // Invalidate query để tải lại danh sách review mới nhất
      queryClient.invalidateQueries({ queryKey: ['reviews', restaurantId] });
    },
  });
};
