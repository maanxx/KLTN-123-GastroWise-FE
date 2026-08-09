import { useMutation, useQuery } from '@tanstack/react-query';
import { itineraryApi, type GenerateItineraryPayload } from '@/lib/api/itinerary.api';
import { useAuthStore } from '@/stores/useAuthStore';

export const useGenerateItinerary = () => {
  return useMutation({
    mutationFn: (payload: GenerateItineraryPayload) => itineraryApi.generate(payload),
  });
};

export const useGetItineraries = () => {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['itineraries'],
    queryFn: itineraryApi.getItineraries,
    enabled: isAuthenticated,
  });
};

export const useGetItineraryById = (id: string) => {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['itineraries', id],
    queryFn: () => itineraryApi.getItineraryById(id),
    enabled: isAuthenticated && !!id,
  });
};
