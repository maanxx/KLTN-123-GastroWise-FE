import { axiosClient } from './axiosClient';
import type { User } from '@/stores/useAuthStore';

export interface UpdateProfilePayload {
  full_name?: string;
  phone?: string;
  password?: string;
}

export const profileApi = {
  getProfile: async (): Promise<User> => {
    return await axiosClient.get<any, User>('/users/profile');
  },

  updateProfile: async (payload: UpdateProfilePayload): Promise<User> => {
    return await axiosClient.put<any, User>('/users/profile', payload);
  }
};
