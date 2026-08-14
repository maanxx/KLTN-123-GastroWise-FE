'use client';
import { useTranslation } from '@/hooks/useTranslation';

export const Translate = ({ translationKey }: { translationKey: string }) => {
  const { t } = useTranslation();
  return <>{t(translationKey)}</>;
};
