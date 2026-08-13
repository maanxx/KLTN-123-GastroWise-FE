'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Flame, Sparkles, Map } from 'lucide-react';

interface SectionTitleProps {
  translationKey: string;
  defaultText: string;
  iconType: 'flame' | 'sparkles' | 'map';
  subtitle?: string;
  subtitleTranslationKey?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ 
  translationKey, 
  defaultText, 
  iconType,
  subtitle,
  subtitleTranslationKey
}) => {
  const { t } = useTranslation();

  const getIcon = () => {
    switch (iconType) {
      case 'flame': return <Flame className="w-8 h-8 text-orange-500 fill-orange-500" />;
      case 'sparkles': return <Sparkles className="w-8 h-8 text-primary-500" />;
      case 'map': return <Map className="w-8 h-8 text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2">
        {getIcon()}
        <h2 className="text-3xl font-bold text-gray-900">
          {t(translationKey, defaultText)}
        </h2>
      </div>
      {subtitleTranslationKey && subtitle && (
        <p className="mt-2 text-sm text-slate-500 ml-10">
          {t(subtitleTranslationKey, subtitle)}
        </p>
      )}
    </div>
  );
};
