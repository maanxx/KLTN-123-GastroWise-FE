'use client';

import { Menu, UtensilsCrossed, Bell, Heart, Sparkles, ChevronDown, User as UserIcon, LogOut, Compass, Camera, Sliders } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import { useLangStore } from '@/stores/useLangStore';

import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/useAuthStore';
import { useGetNotifications, useMarkNotificationAsRead } from '@/hooks/queries/useNotification';
import { removeAuthToken, broadcastAuthEvent } from '@/lib/utils/storage';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAiMenu, setShowAiMenu] = useState(false);

  const { isAuthenticated, user, logout } = useAuthStore();
  const { t } = useTranslation();
  const toggleLang = useLangStore((state) => state.toggleLang);
  const currentLang = useLangStore((state) => state.lang);

  const { data: notifications } = useGetNotifications();
  const markAsReadMutation = useMarkNotificationAsRead();

  const unreadCount = notifications?.filter(n => !n.is_read).length || 0;

  const userMenuRef = useRef<HTMLDivElement>(null);
  const aiMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  const handleMarkAllAsRead = () => {
    markAsReadMutation.mutate('all');
  };

  // Xử lý hiệu ứng scroll & Click outside dropdown
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
      if (aiMenuRef.current && !aiMenuRef.current.contains(e.target as Node)) {
        setShowAiMenu(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: t('navbar.home'), href: ROUTES.HOME },
    { name: t('navbar.explore'), href: '/explore' },
    { name: t('navbar.itinerary'), href: ROUTES.ITINERARY },
    { name: t('navbar.about_us'), href: '/about' },
  ];

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/85 py-3 shadow-sm backdrop-blur-xl dark:bg-slate-950/85'
          : 'bg-transparent py-5',
      )}
    >
      <div className="container-app flex items-center justify-between">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 transition-transform group-hover:scale-105 dark:bg-primary-900/30 dark:text-primary-500">
            <UtensilsCrossed className="h-6 w-6" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Gastro<span className="text-primary-500">Wise</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href={ROUTES.HOME}
            className={cn(
              'text-sm font-semibold transition-colors hover:text-primary-500',
              pathname === ROUTES.HOME ? 'text-primary-500' : 'text-slate-700 dark:text-slate-300',
            )}
          >
            {t('navbar.home')}
          </Link>

          {/* GastroAI Dropdown */}
          <div className="relative" ref={aiMenuRef}>
            <button
              onClick={() => setShowAiMenu(!showAiMenu)}
              className={cn(
                'flex items-center gap-1.5 rounded-full border border-amber-200/80 bg-amber-50/70 px-3.5 py-1 text-sm font-extrabold text-amber-700 transition-all hover:bg-amber-100 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-300',
                (pathname === '/ai-planner' || pathname === '/ai-nutri') && 'ring-2 ring-amber-400'
              )}
            >
              <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
              <span>GastroAI</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${showAiMenu ? 'rotate-180' : ''}`} />
            </button>

            {showAiMenu && (
              <div className="absolute left-0 mt-2 w-64 rounded-2xl border border-amber-100 bg-white p-2 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900 z-50">
                <Link
                  href="/ai-planner"
                  onClick={() => setShowAiMenu(false)}
                  className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-amber-50 dark:hover:bg-amber-950/40"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs">AI Planner</h4>
                    <p className="text-[11px] text-slate-500">Lên lộ trình ẩm thực & ngân sách</p>
                  </div>
                </Link>

                <Link
                  href="/ai-nutri"
                  onClick={() => setShowAiMenu(false)}
                  className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-orange-50 dark:hover:bg-orange-950/40"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/20">
                    <Camera className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs">AI NutriCam</h4>
                    <p className="text-[11px] text-slate-500">Quét ảnh món ăn & tính Calo</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/explore"
            className={cn(
              'text-sm font-semibold transition-colors hover:text-primary-500',
              pathname === '/explore' ? 'text-primary-500' : 'text-slate-700 dark:text-slate-300',
            )}
          >
            {t('navbar.explore')}
          </Link>

          <Link
            href={ROUTES.ITINERARY}
            className={cn(
              'text-sm font-semibold transition-colors hover:text-primary-500',
              pathname === ROUTES.ITINERARY ? 'text-primary-500' : 'text-slate-700 dark:text-slate-300',
            )}
          >
            {t('navbar.itinerary')}
          </Link>

          <Link
            href="/about"
            className={cn(
              'text-sm font-semibold transition-colors hover:text-primary-500',
              pathname === '/about' ? 'text-primary-500' : 'text-slate-700 dark:text-slate-300',
            )}
          >
            {t('navbar.about_us')}
          </Link>
        </nav>

        {/* Actions Zone */}
        <div className="flex items-center gap-3">

          {/* Favorites Icon Button (Next to Bell) */}
          <Link href="/favorites" title="Danh sách yêu thích">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'relative text-slate-600 hover:bg-rose-50 hover:text-rose-500 dark:text-slate-300 dark:hover:bg-rose-950/30',
                pathname === '/favorites' && 'text-rose-500 bg-rose-50 dark:bg-rose-950/40'
              )}
            >
              <Heart className="h-5 w-5" />
            </Button>
          </Link>

          {/* Notifications Bell */}
          {isAuthenticated && (
            <div className="relative" ref={notifMenuRef}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </Button>
              
              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
                  <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/50">
                    <h3 className="font-bold text-slate-800 dark:text-white text-sm">
                      {t('navbar.notifications')} {unreadCount > 0 && <span className="ml-1 bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs">{unreadCount} mới</span>}
                    </h3>
                    {unreadCount > 0 && (
                      <button onClick={handleMarkAllAsRead} className="text-xs text-primary-600 hover:underline font-medium">{t('navbar.mark_all_read')}</button>
                    )}
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {!notifications || notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-slate-500 text-sm">
                        {t('navbar.no_notifications')}
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          className={`px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors dark:border-slate-800 dark:hover:bg-slate-800/50 ${!notif.is_read ? 'bg-blue-50/30' : ''}`}
                          onClick={() => !notif.is_read && markAsReadMutation.mutate(notif.id)}
                        >
                          <p className={`text-sm ${!notif.is_read ? 'text-slate-900 font-semibold dark:text-white' : 'text-slate-600 font-medium dark:text-slate-300'}`}>{notif.title}</p>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2 dark:text-slate-400">{notif.message}</p>
                          <p className="text-[10px] text-slate-400 mt-1.5">{new Date(notif.created_at).toLocaleString('vi-VN')}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Language Flag Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleLang}
            className="w-9 h-9 hover:bg-slate-100 transition-colors rounded-full overflow-hidden p-1.5"
            title="Đổi ngôn ngữ / Change language"
          >
            <img 
              src={currentLang === 'vi' ? 'https://flagcdn.com/w40/vn.png' : 'https://flagcdn.com/w40/gb.png'} 
              alt={currentLang === 'vi' ? 'Tiếng Việt' : 'English'} 
              className="w-full h-full rounded-full object-cover"
            />
          </Button>

          {/* User Profile Avatar Dropdown (Hình số 2) */}
          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1 rounded-full p-0.5 transition-transform hover:scale-105 ring-2 ring-primary-500/20"
                title="Hồ sơ cá nhân"
              >
                <div className="h-9 w-9 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold overflow-hidden shadow-sm">
                  {user?.picture ? (
                    <img src={user.picture} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span>{user?.full_name ? user.full_name.charAt(0).toUpperCase() : (user?.username || user?.email || 'U').charAt(0).toUpperCase()}</span>
                  )}
                </div>
              </button>

              {/* User Profile Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900 z-50">
                  <div className="px-3 py-3 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white truncate text-sm">
                      {user?.full_name || user?.username || 'Người dùng'}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                    >
                      <UserIcon className="h-4 w-4 text-primary-500" />
                      Trang hồ sơ cá nhân
                    </Link>

                    <Link
                      href="/favorites"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Heart className="h-4 w-4 text-rose-500" />
                      Danh sách yêu thích
                    </Link>

                    <Link
                      href={ROUTES.PREFERENCES}
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Sliders className="h-4 w-4 text-amber-500" />
                      Thiết lập khẩu vị AI
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 pt-1 dark:border-slate-800">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                        removeAuthToken();
                        broadcastAuthEvent('LOGOUT');
                        toast.success(t('navbar.logout_success') as string);
                        router.push('/');
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      {t('navbar.logout')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href={ROUTES.LOGIN} className="hidden sm:block">
              <Button variant="ghost" size="sm">
                {t('navbar.login')}
              </Button>
            </Link>
          )}

          {/* Primary CTA */}
          <Link href={ROUTES.PREFERENCES}>
            <Button size="sm" className="hidden sm:flex rounded-full bg-gradient-to-r from-primary-500 to-emerald-500 font-bold text-white shadow-md shadow-primary-500/20 hover:from-primary-600 hover:to-emerald-600">
              {t('navbar.create_itinerary')}
            </Button>
          </Link>
          
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6 text-slate-600 dark:text-slate-300" />
          </Button>
        </div>
      </div>
    </header>
  );
}
