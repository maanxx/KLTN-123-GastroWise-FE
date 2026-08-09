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
    // Gọi đến GET /api/restaurants với query params
    return await axiosClient.get<any, Restaurant[]>('/restaurants', { params });
  },

  getRestaurantById: async (id: string): Promise<Restaurant> => {
    return await axiosClient.get<any, Restaurant>(`/restaurants/${id}`);
  }
};
