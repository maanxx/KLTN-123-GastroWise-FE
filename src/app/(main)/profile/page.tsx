'use client';

import { Map, Navigation, Settings, Trophy, Wallet, Loader2, LogOut, X, Check } from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import { useGetProfile, useUpdateProfile, useUploadAvatar } from '@/hooks/queries/useProfile';
import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

export default function ProfilePage() {
  const { data: profileResponse, isLoading, isError } = useGetProfile();
  const updateMutation = useUpdateProfile();
  const { isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({ full_name: '', phone: '', picture: '' });
  const [isUploading, setIsUploading] = useState(false);
  
  const uploadAvatarMutation = useUploadAvatar();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const user = (profileResponse as any)?.data || profileResponse;

  useEffect(() => {
    if (user && !isEditing) {
      setFormData({
        full_name: user.full_name || user.username || '',
        phone: user.phone || '',
        picture: user.picture || ''
      });
    }
  }, [user, isEditing]);

  const handleUpdate = () => {
    updateMutation.mutate(formData, {
      onSuccess: () => {
        toast.success(t('profile.update_success') as string);
        setIsEditing(false);
      },
      onError: () => {
        toast.error(t('profile.update_fail') as string);
      }
    });
  };

  const handleLogout = () => {
    logout();
    toast.success(t('profile.logout_success') as string);
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
          <p>{t('profile.loading')}</p>
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        {t('profile.error')}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50/30 pb-24 pt-8 dark:bg-transparent">
      <div className="container-app max-w-5xl">
        
        {/* Cover & Avatar Header */}
        <div className="relative mb-16 rounded-b-3xl bg-white shadow-sm dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="h-48 w-full rounded-t-3xl bg-primary-100 dark:bg-primary-900/20 overflow-hidden relative">
             {/* Decorative patterns */}
             <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-white/20 blur-2xl"></div>
             <div className="absolute top-10 left-10 h-24 w-24 rounded-full bg-white/20 blur-xl"></div>
          </div>
          
          <div className="px-8 pb-8 pt-0 flex flex-col md:flex-row md:items-end md:justify-between gap-6 relative">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col md:flex-row gap-6 md:items-end -mt-12 md:-mt-16 z-10">
              <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-white text-5xl font-bold shadow-xl border-4 border-white dark:border-slate-900 text-primary-500 uppercase overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-slate-800 dark:to-slate-700"></div>
                {user.picture ? (
                  <img src={user.picture} alt="Avatar" className="relative z-10 w-full h-full object-cover" />
                ) : (
                  <span className="relative z-10 drop-shadow-md">
                    {(user.full_name || user.username || user.email || 'U').charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              
              <div className="mb-2">
                <h1 className="mt-4 md:mt-0 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white drop-shadow-sm">
                  {user.full_name || user.username || t('navbar.guest')}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-sm">
                    ✉️ {user.email || t('profile.member')}
                  </span>
                  {user.phone && (
                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-sm">
                      📞 {user.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="rounded-full font-semibold border-slate-200 hover:bg-slate-50 shadow-sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <><X className="h-4 w-4 mr-2" /> {t('profile.edit_close')}</> : <><Settings className="h-4 w-4 mr-2" /> {t('profile.edit_open')}</>}
              </Button>
              <Button 
                variant="destructive" 
                className="rounded-full shadow-sm shadow-red-500/20"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" /> {t('navbar.logout')}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        {isEditing && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mb-8">
            <Card className="p-8 border-none shadow-xl shadow-slate-200/50 rounded-3xl bg-white/80 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                <Settings className="text-primary-500" /> {t('profile.settings')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">{t('profile.fullname')}</label>
                  <Input 
                    className="bg-slate-50 focus:bg-white"
                    placeholder={t('profile.fullname') as string} 
                    value={formData.full_name} 
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">{t('profile.phone')}</label>
                  <Input 
                    className="bg-slate-50 focus:bg-white"
                    placeholder={t('profile.phone') as string} 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">{t('profile.avatar_new')}</label>
                  <div className="flex items-center gap-4">
                    <Input 
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setIsUploading(true);
                          uploadAvatarMutation.mutate(file, {
                            onSuccess: (data: any) => {
                              // Cập nhật picture trong form
                              setFormData(prev => ({ ...prev, picture: data?.data?.picture || data?.picture }));
                              toast.success(t('profile.upload_success') as string);
                            },
                            onError: () => {
                              toast.error(t('profile.upload_fail') as string);
                            },
                            onSettled: () => {
                              setIsUploading(false);
                            }
                          });
                        }
                      }}
                      className="bg-slate-50 focus:bg-white file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                    />
                    {isUploading && <Loader2 className="w-5 h-5 animate-spin text-primary-500" />}
                  </div>
                  {formData.picture && (
                    <p className="text-xs text-green-600 font-medium">{t('profile.avatar_ready')}</p>
                  )}
                </div>
              </div>
              <div className="mt-8 flex gap-3">
                <Button className="rounded-full px-8 shadow-md shadow-primary-500/20" onClick={handleUpdate} isLoading={updateMutation.isPending}>
                  {t('profile.save')}
                </Button>
                <Button variant="ghost" className="rounded-full px-6" onClick={() => setIsEditing(false)}>
                  {t('profile.cancel')}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide px-2">
          {['overview', 'achievements', 'vouchers'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30 -translate-y-0.5' 
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {tab === 'overview' && t('profile.overview')}
              {tab === 'achievements' && t('profile.achievements')}
              {tab === 'vouchers' && t('profile.vouchers')}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="mb-6 font-heading text-2xl font-extrabold text-slate-900 dark:text-white">
              Thống kê cá nhân
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              
              <Card className="relative overflow-hidden p-8 border-none bg-gradient-to-br from-white to-primary-50/50 shadow-sm hover:shadow-md transition-all group">
                <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-10 transition-opacity group-hover:scale-110 duration-500">
                  <Navigation className="h-32 w-32 text-primary-900" />
                </div>
                <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-primary-100 p-3 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 shadow-inner">
                  <Navigation className="h-6 w-6" />
                </div>
                <div className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  12.5 <span className="text-xl font-semibold text-slate-400">km</span>
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  Quãng đường tiết kiệm
                </div>
              </Card>

              <Card className="relative overflow-hidden p-8 border-none bg-gradient-to-br from-white to-secondary-50/50 shadow-sm hover:shadow-md transition-all group">
                <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-10 transition-opacity group-hover:scale-110 duration-500">
                  <Map className="h-32 w-32 text-secondary-900" />
                </div>
                <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-secondary-100 p-3 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400 shadow-inner">
                  <Map className="h-6 w-6" />
                </div>
                <div className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  5
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  Lộ trình hoàn thành
                </div>
              </Card>

              <Card className="relative overflow-hidden p-8 border-none bg-gradient-to-br from-white to-blue-50/50 shadow-sm hover:shadow-md transition-all group">
                <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-10 transition-opacity group-hover:scale-110 duration-500">
                  <Wallet className="h-32 w-32 text-blue-900" />
                </div>
                <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shadow-inner">
                  <Wallet className="h-6 w-6" />
                </div>
                <div className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  ~2.4M
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  Tổng chi tiêu ước tính
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'eco' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="mb-6 font-heading text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              Thành tích Eco <span className="text-2xl">🌱</span>
            </h2>
            <Card className="p-8 border-none bg-white shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-lg shadow-green-500/30 relative">
                  <Trophy className="h-10 w-10 relative z-10" />
                  <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-2xl text-slate-900 dark:text-white mb-2">Huy hiệu "Chân Đi Nhẹ Nhàng"</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Bạn đã tiết kiệm lượng khí thải tương đương <strong className="text-green-600">1.5kg CO2</strong> nhờ việc chọn lộ trình ẩm thực được AI tối ưu khoảng cách. Tiếp tục phát huy nhé!
                  </p>
                  <div className="mt-6 flex items-center justify-between text-sm font-bold text-slate-700 mb-2">
                    <span>Tiến độ Level 2</span>
                    <span className="text-green-600">75%</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 shadow-inner overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
    </div>
    </div>
  );
}
