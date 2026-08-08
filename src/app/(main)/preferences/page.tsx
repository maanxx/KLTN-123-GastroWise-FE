import type { Metadata } from 'next';

import { PreferenceWizard } from '@/components/features/preferences';

export const metadata: Metadata = {
  title: 'Tạo lộ trình',
  description: 'Nhập sở thích ẩm thực của bạn để AI gợi ý lộ trình phù hợp nhất.',
};

export default function PreferencesPage() {
  return (
    <div className="min-h-screen bg-primary-50/30 dark:bg-transparent pt-12 pb-24">
      <div className="container-app">
        <div className="mx-auto max-w-2xl text-center mb-8">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Tạo Lộ Trình Của Riêng Bạn
          </h1>
          <p className="mt-4 text-slate-500 dark:text-slate-400">
            Chỉ mất 2 phút để hoàn thành form dưới đây. GastroWise sẽ lo phần còn lại.
          </p>
        </div>
        
        <PreferenceWizard />
      </div>
    </div>
  );
}
