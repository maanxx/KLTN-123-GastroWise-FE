'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Heart, User, Mail, Phone, Lock, Save, Loader2 } from 'lucide-react';

import { Input, Button, Card } from '@/components/ui';
import { useGetProfile, useUpdateProfile } from '@/hooks/queries/useProfile';
import { useAuthStore } from '@/stores/useAuthStore';

// Tạo schema riêng cho form profile
const profileSchema = z.object({
  full_name: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
  phone: z.string().optional(),
  password: z.string().optional().refine((val) => !val || val.length >= 6, {
    message: 'Mật khẩu mới (nếu đổi) phải có ít nhất 6 ký tự',
  }),
  preferences: z.array(z.string()).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const PREFERENCE_TAGS = ['Phở', 'Bún Bò', 'Cơm Tấm', 'Lẩu', 'Đồ Nướng', 'Hải Sản', 'Trà Sữa', 'Ăn Vặt', 'Đồ Chay'];

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { data: profileData, isLoading: isLoadingProfile } = useGetProfile();
  const updateProfileMutation = useUpdateProfile();

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      preferences: [],
    }
  });

  const selectedPrefs = watch('preferences') || [];

  // Redirect nếu chưa login
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Đổ dữ liệu vào form khi API trả về
  useEffect(() => {
    if (profileData) {
      reset({
        full_name: profileData.full_name,
        phone: profileData.phone || '',
        password: '', // Không bao giờ hiện password cũ
        preferences: ['Phở', 'Cơm Tấm'], // Tạm hardcode chờ BE hỗ trợ, hoặc lấy từ profileData.preferences nếu có
      });
    }
  }, [profileData, reset]);

  const togglePreference = (tag: string) => {
    if (selectedPrefs.includes(tag)) {
      setValue('preferences', selectedPrefs.filter(p => p !== tag), { shouldDirty: true });
    } else {
      setValue('preferences', [...selectedPrefs, tag], { shouldDirty: true });
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    const payload = { ...data };
    // Nếu không nhập pass mới thì bỏ trường đó đi để BE khỏi update pass
    if (!payload.password) delete payload.password;

    updateProfileMutation.mutate(payload, {
      onSuccess: () => {
        alert('Cập nhật thông tin thành công!');
        reset({ ...data, password: '' }); // Xoá trường password đi cho an toàn
      },
      onError: (err: any) => {
        alert(err.message || 'Có lỗi xảy ra khi cập nhật.');
      }
    });
  };

  if (!isAuthenticated || isLoadingProfile) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Tài Khoản</h1>
        <p className="text-gray-600 mt-2">Cập nhật thông tin cá nhân và quản lý bảo mật</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cột trái: Avatar & Thông tin chung */}
        <div className="md:col-span-1">
          <Card className="p-6 flex flex-col items-center text-center">
            <div className="w-32 h-32 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-4xl font-bold mb-4">
              {profileData?.full_name ? profileData.full_name.charAt(0).toUpperCase() : 'U'}
            </div>
            <h2 className="text-xl font-bold mb-1">{profileData?.full_name}</h2>
            <div className="flex items-center text-gray-500 text-sm mb-1">
              <Mail className="w-4 h-4 mr-1" />
              {profileData?.email}
            </div>
            <div className="mt-4 pt-4 border-t w-full text-sm text-gray-500">
              Thành viên từ: {profileData?.created_at ? new Date(profileData.created_at).toLocaleDateString('vi-VN') : ''}
            </div>
          </Card>
        </div>

        {/* Cột phải: Form cập nhật */}
        <div className="md:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-primary-600" />
              Thông tin cá nhân
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Họ và tên</label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      className="pl-10"
                      placeholder="Nhập họ tên"
                      {...register('full_name')}
                      error={errors.full_name?.message}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Số điện thoại</label>
                  <div className="relative">
                    <Phone className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      className="pl-10"
                      placeholder="Nhập số điện thoại"
                      {...register('phone')}
                      error={errors.phone?.message}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t mt-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-primary-600" />
                  Đổi mật khẩu (Tuỳ chọn)
                </h3>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Mật khẩu mới</label>
                  <Input
                    type="password"
                    placeholder="Bỏ trống nếu không muốn đổi"
                    {...register('password')}
                    error={errors.password?.message}
                  />
                  <p className="text-xs text-gray-500 mt-1">Để trống nếu bạn muốn giữ nguyên mật khẩu cũ.</p>
                </div>
              </div>

              {/* Preferences Section */}
              <div className="pt-6 border-t mt-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-primary-600" />
                  Sở thích ẩm thực
                </h3>
                <p className="text-sm text-gray-600 mb-3">Chọn các món bạn yêu thích để AI đề xuất lộ trình tốt hơn:</p>
                <div className="flex flex-wrap gap-2">
                  {PREFERENCE_TAGS.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => togglePreference(tag)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                        selectedPrefs.includes(tag) 
                          ? 'bg-primary-500 text-white border-primary-500 shadow-md' 
                          : 'bg-white text-gray-600 border-gray-300 hover:border-primary-400 hover:text-primary-500'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  className="flex items-center"
                  isLoading={updateProfileMutation.isPending}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
