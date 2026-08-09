import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationApi } from '@/lib/api/notification.api';
import { useAuthStore } from '@/stores/useAuthStore';

export const useGetNotifications = () => {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['notifications'],
    queryFn: notificationApi.getUserNotifications,
    enabled: isAuthenticated,
    refetchInterval: 30000, // Tự động refetch mỗi 30s để kiểm tra thông báo mới
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
