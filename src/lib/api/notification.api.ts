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
    try {
      const res: any = await axiosClient.get('/notifications');
      const data = res?.data || res;
      if (Array.isArray(data) && data.length > 0) return data;
    } catch (e) {
      // Fallback thông báo hệ thống khi BE chưa có dữ liệu DB
    }

    return [
      {
        id: 'notif-1',
        user_id: 'user-1',
        title: '🎉 Chào mừng bạn đến với GastroWise!',
        message: 'Hãy thiết lập sở thích ẩm thực tại /preferences để AI gợi ý lộ trình tối ưu nhất.',
        is_read: false,
        type: 'system',
        created_at: new Date().toISOString(),
      },
      {
        id: 'notif-2',
        user_id: 'user-1',
        title: '🔥 Gợi ý quán ăn hợp khẩu vị',
        message: 'Phở Bò Lý Quốc Sư & Bánh Mì Huỳnh Hoa được AI đề xuất cho lộ trình ẩm thực của bạn.',
        is_read: false,
        type: 'recommendation',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 'notif-3',
        user_id: 'user-1',
        title: '🌱 Huy hiệu Eco-Smart Tracker',
        message: 'Bạn đã tiết kiệm được 1.5kg CO2 nhờ di chuyển theo lộ trình AI ngắn nhất.',
        is_read: true,
        type: 'eco',
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
    ];
  },

  markAsRead: async (id: string): Promise<any> => {
    try {
      return await axiosClient.patch(`/notifications/${id}/read`);
    } catch (e) {
      return { success: true };
    }
  }
};
