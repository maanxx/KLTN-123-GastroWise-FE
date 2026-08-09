import { axiosClient } from './axiosClient';

export interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  full_name: string;
  avatar_url?: string;
}

export interface CreateReviewPayload {
  restaurant_id: string;
  rating: number;
  comment: string;
}

export const reviewApi = {
  getReviewsByRestaurant: async (restaurantId: string): Promise<Review[]> => {
    return await axiosClient.get<any, Review[]>(`/reviews/restaurant/${restaurantId}`);
  },

  createReview: async (payload: CreateReviewPayload): Promise<Review> => {
    return await axiosClient.post<any, Review>('/reviews', payload);
  }
};
