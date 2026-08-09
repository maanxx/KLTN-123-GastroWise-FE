import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { favoriteApi } from '@/lib/api/favorite.api';
import { useAuthStore } from '@/stores/useAuthStore';

export const useGetFavorites = () => {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['favorites'],
    queryFn: favoriteApi.getUserFavorites,
    enabled: isAuthenticated,
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (restaurant_id: string) => favoriteApi.toggleFavorite(restaurant_id),
    onSuccess: () => {
      // Invalidate both favorites list and general restaurants list 
      // if we want to reflect the heart icon changes globally
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};
