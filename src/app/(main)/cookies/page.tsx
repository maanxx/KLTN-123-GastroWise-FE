'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function CookiesPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">{t('footer.cookies')}</h1>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-slate-600 leading-relaxed mb-4">
            This is a placeholder for {t('footer.cookies')}.
          </p>
        </div>
      </div>
    </div>
  );
}
