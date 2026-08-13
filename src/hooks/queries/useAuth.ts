import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '@/lib/api/axiosClient';
import type { LoginFormData, RegisterFormData } from '@/lib/validation/auth.schema';
import type { User } from '@/stores/useAuthStore';

interface LoginResponse {
  user: User;
  token: string;
}

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      return await axiosClient.post<any, LoginResponse>('/auth/login', credentials);
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (credentials: any) => {
      return await axiosClient.post<any, LoginResponse>('/auth/register', credentials);
    },
  });
};
