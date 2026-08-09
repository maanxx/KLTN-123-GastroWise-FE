import { axiosClient } from './axiosClient';
import type { Restaurant } from './restaurant.api';

export const favoriteApi = {
  getUserFavorites: async (): Promise<Restaurant[]> => {
    return await axiosClient.get<any, Restaurant[]>('/favorites');
  },

  toggleFavorite: async (restaurant_id: string): Promise<{ message: string, isFavorite: boolean }> => {
    return await axiosClient.post('/favorites/toggle', { restaurant_id });
  }
};
