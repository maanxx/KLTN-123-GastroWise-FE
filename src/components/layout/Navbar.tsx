'use client';

import { Menu, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Xử lý hiệu ứng scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang chủ', href: ROUTES.HOME },
    { name: 'Khám phá', href: '/explore' },
    { name: 'Lộ trình', href: ROUTES.ITINERARY },
    { name: 'Yêu thích', href: '/favorites' },
    { name: 'Hồ sơ', href: '/profile' },
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
          <Link href={ROUTES.LOGIN} className="hidden sm:block">
            <Button variant="ghost" size="sm">
              Đăng nhập
            </Button>
          </Link>
          <Link href={ROUTES.PREFERENCES}>
            <Button size="sm" className="hidden sm:flex">
              Tạo lộ trình ngay
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
