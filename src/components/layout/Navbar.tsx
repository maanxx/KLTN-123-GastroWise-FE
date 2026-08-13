'use client';

import { Menu, UtensilsCrossed, Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import { useLangStore } from '@/stores/useLangStore';

import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/useAuthStore';
import { useGetNotifications, useMarkNotificationAsRead } from '@/hooks/queries/useNotification';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { t } = useTranslation();
  const toggleLang = useLangStore((state) => state.toggleLang);
  const currentLang = useLangStore((state) => state.lang);
  
  const { data: notifications } = useGetNotifications();
  const markAsReadMutation = useMarkNotificationAsRead();
  
  const unreadCount = notifications?.filter(n => !n.is_read).length || 0;

  const handleMarkAllAsRead = () => {
    markAsReadMutation.mutate('all');
  };

  // Xử lý hiệu ứng scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('navbar.home'), href: ROUTES.HOME },
    { name: t('navbar.ai_planner'), href: '/ai-planner' },
    { name: t('navbar.explore'), href: '/explore' },
    { name: t('navbar.itinerary'), href: ROUTES.ITINERARY },
    { name: t('navbar.favorites'), href: '/favorites' },
    { name: t('navbar.about_us'), href: '/about' },
    { name: t('navbar.profile'), href: '/profile' },
  ];

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 py-3 shadow-sm backdrop-blur-xl dark:bg-slate-950/80'
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

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary-500',
                pathname === link.href
                  ? 'text-primary-500'
                  : 'text-slate-600 dark:text-slate-300',
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <div className="relative hidden sm:block">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative text-gray-600 hover:bg-gray-100"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                  )}
                </Button>
                
                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <h3 className="font-bold text-gray-800">{t('navbar.notifications')} {unreadCount > 0 && <span className="ml-1 bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs">{unreadCount} mới</span>}</h3>
                      {unreadCount > 0 && (
                        <button onClick={handleMarkAllAsRead} className="text-xs text-primary-600 hover:underline font-medium">{t('navbar.mark_all_read')}</button>
                      )}
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {!notifications || notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-gray-500 text-sm">
                          {t('navbar.no_notifications')}
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${!notif.is_read ? 'bg-blue-50/30' : ''}`}
                            onClick={() => !notif.is_read && markAsReadMutation.mutate(notif.id)}
                          >
                            <p className={`text-sm ${!notif.is_read ? 'text-gray-900 font-semibold' : 'text-gray-600 font-medium'}`}>{notif.title}</p>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notif.message}</p>
                            <p className="text-xs text-gray-400 mt-2">{new Date(notif.created_at).toLocaleString('vi-VN')}</p>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100 text-center bg-gray-50/50">
                      <button className="text-xs text-primary-600 font-medium hover:underline">{t('navbar.view_all_notifications')}</button>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/profile" className="hidden sm:flex items-center gap-2 group" title="Hồ sơ cá nhân">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold overflow-hidden transition-transform group-hover:scale-105">
                  {user?.picture ? (
                    <img src={user.picture} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span>{user?.full_name ? user.full_name.charAt(0).toUpperCase() : (user?.username || user?.email || 'U').charAt(0).toUpperCase()}</span>
                  )}
                </div>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden sm:block text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => {
                  logout();
                  localStorage.removeItem('token');
                  toast.success(t('navbar.logout_success') as string);
                  router.push('/');
                }}
              >
                {t('navbar.logout')}
              </Button>
            </>
          ) : (
            <Link href={ROUTES.LOGIN} className="hidden sm:block">
              <Button variant="ghost" size="sm">
                {t('navbar.login')}
              </Button>
            </Link>
          )}

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleLang}
            className="w-10 hover:bg-slate-100 transition-colors rounded-full overflow-hidden p-2"
            title="Đổi ngôn ngữ / Change language"
          >
            <img 
              src={currentLang === 'vi' ? 'https://flagcdn.com/w40/vn.png' : 'https://flagcdn.com/w40/gb.png'} 
              alt={currentLang === 'vi' ? 'Tiếng Việt' : 'English'} 
              className="w-full h-auto rounded-sm object-cover"
            />
          </Button>

          <Link href={ROUTES.PREFERENCES}>
            <Button size="sm" className="hidden sm:flex">
              {t('navbar.create_itinerary')}
            </Button>
          </Link>
          
          {/* Mobile menu toggle button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6 text-slate-600 dark:text-slate-300" />
          </Button>
        </div>
      </div>
    </header>
  );
}
