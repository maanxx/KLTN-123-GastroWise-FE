import { Compass, Home } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary-100 dark:bg-primary-900/50" />
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/30">
          <Compass className="h-16 w-16 text-primary-500 animate-spin-slow" style={{ animationDuration: '4s' }} />
        </div>
      </div>
      
      <h1 className="mb-4 font-heading text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
        404 - Lạc đường rồi!
      </h1>
      
      <p className="mb-8 max-w-lg text-lg text-slate-600 dark:text-slate-400">
        Ôi không! Khu vực này có vẻ vắng vẻ và không có món ngon nào cả. 
        Hãy để GastroWise dẫn bạn về lại nơi có nhiều đồ ăn ngon nhé.
      </p>
      
      <Link href={ROUTES.HOME}>
        <Button size="lg" className="h-14 px-8 rounded-full shadow-lg shadow-primary-500/25">
          <Home className="mr-2 h-5 w-5" />
          Về lại Trang Chủ
        </Button>
      </Link>
    </div>
  );
}
