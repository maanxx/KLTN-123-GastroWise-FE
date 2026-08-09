import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi, type UpdateProfilePayload } from '@/lib/api/profile.api';
import { useAuthStore } from '@/stores/useAuthStore';

export const useGetProfile = () => {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['profile'],
    queryFn: profileApi.getProfile,
    enabled: isAuthenticated,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const setLoginState = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => profileApi.updateProfile(payload),
    onSuccess: (updatedUser) => {
      // Cập nhật cache React Query
      queryClient.setQueryData(['profile'], updatedUser);
      // Cập nhật Zustand Store (chứa thông tin header, vv)
      setLoginState(updatedUser);
    },
  });
};
