import { axiosClient } from './axiosClient';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  type: string;
  created_at: string;
}

export const notificationApi = {
  getUserNotifications: async (): Promise<Notification[]> => {
    return await axiosClient.get<any, Notification[]>('/notifications');
  },

  markAsRead: async (id: string): Promise<any> => {
    return await axiosClient.patch(`/notifications/${id}/read`);
  }
};
