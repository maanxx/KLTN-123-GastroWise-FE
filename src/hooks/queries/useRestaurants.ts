import { useQuery } from '@tanstack/react-query';
import { restaurantApi, type GetRestaurantsParams } from '@/lib/api/restaurant.api';

export const useGetRestaurants = (params?: GetRestaurantsParams) => {
  return useQuery({
    queryKey: ['restaurants', params],
    queryFn: () => restaurantApi.getRestaurants(params),
    staleTime: 5 * 60 * 1000, // Cache data trong 5 phút
  });
};

export const useGetRestaurantById = (id: string) => {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => restaurantApi.getRestaurantById(id),
    enabled: !!id, 
  });
};

export const useGetRecommendations = (params?: { lat?: number, lng?: number, page?: number, limit?: number }, enabled = true) => {
  return useQuery({
    queryKey: ['recommendations', params],
    queryFn: () => restaurantApi.getRecommendations(params),
    enabled: enabled,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetRestaurantMenu = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ['restaurantMenu', id],
    queryFn: () => restaurantApi.getRestaurantMenu(id),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
  });
};
