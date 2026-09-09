import { axiosClient } from './axiosClient';

export interface Review {
  id?: string;
  _id?: string;
  rating?: number;
  diemReview?: number;
  comment?: string;
  noiDung?: string;
  createdAt?: string;
  created_at?: string;
  full_name?: string;
  userName?: string;
  author?: string;
  avatar_url?: string;
  aiSentimentLabel?: string;
  aiSentimentScore?: number;
}

export interface CreateReviewPayload {
  restaurantId: string;
  diemReview: number;
  noiDung: string;
  userName?: string;
  images?: string[];
}

export const reviewApi = {
  getReviewsByRestaurant: async (restaurantId: string): Promise<Review[]> => {
    return await axiosClient.get<any, Review[]>(`/reviews/restaurant/${restaurantId}`);
  },

  createReview: async (payload: CreateReviewPayload): Promise<Review> => {
    return await axiosClient.post<any, Review>('/reviews', payload);
  }
};
