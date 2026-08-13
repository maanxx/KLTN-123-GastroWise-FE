import { axiosClient } from './axiosClient';
import type { User } from '@/stores/useAuthStore';

export interface UpdateProfilePayload {
  full_name?: string;
  phone?: string;
  password?: string;
  picture?: string;
}

export const profileApi = {
  getProfile: async (): Promise<User> => {
    return await axiosClient.get<any, User>('/auth/profile');
  },

  updateProfile: async (payload: UpdateProfilePayload): Promise<User> => {
    return await axiosClient.patch<any, User>('/auth/profile', payload);
  },

  uploadAvatar: async (file: File): Promise<{ picture: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    return await axiosClient.post<any, { picture: string }>('/auth/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};
