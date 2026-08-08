import { UtensilsCrossed } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-slate-950/80">
      <div className="relative flex flex-col items-center">
        {/* Vòng sáng nhấp nháy bên ngoài */}
        <div className="absolute inset-0 h-24 w-24 animate-ping rounded-full bg-primary-100 dark:bg-primary-900/50" />
        
        {/* Icon Logo ở giữa */}
        <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-primary-400 to-primary-600 shadow-xl shadow-primary-500/30">
          <UtensilsCrossed className="h-10 w-10 text-white animate-pulse" />
        </div>
        
        <p className="mt-6 animate-pulse font-heading text-lg font-semibold text-primary-600 dark:text-primary-400">
          Đang chuẩn bị món ngon...
        </p>
      </div>
    </div>
  );
}
