import { axiosClient } from './axiosClient';

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  cuisine: string | null;
  opening_hours: string | null;
  phone: string | null;
  rating_avg: number | null;
  cover_image: string | null;
  lat: number;
  lng: number;
  distance_m?: number;
}

export interface GetRestaurantsParams {
  search?: string;
  cuisine?: string;
  lat?: number;
  lng?: number;
  radius?: number; // in meters
}

export const restaurantApi = {
  getRestaurants: async (params?: GetRestaurantsParams): Promise<Restaurant[]> => {
    const apiParams = {
      ...params,
      q: params?.search
    };
    delete apiParams.search;
    return await axiosClient.get<any, Restaurant[]>('/explore', { params: apiParams });
  },

  getRestaurantById: async (id: string): Promise<Restaurant> => {
    return await axiosClient.get<any, Restaurant>(`/restaurants/${id}`);
  },

  getRecommendations: async (params?: { lat?: number, lng?: number, page?: number, limit?: number }): Promise<{ data: Restaurant[], pagination: { total: number, page: number, limit: number, totalPages: number } }> => {
    return await axiosClient.get('/recommendations', { params });
  },

  getRestaurantMenu: async (id: string): Promise<any[]> => {
    return await axiosClient.get(`/menus/restaurant/${id}`);
  }
};
