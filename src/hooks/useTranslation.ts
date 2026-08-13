import { useCallback } from 'react';
import { useLangStore } from '@/stores/useLangStore';
import vi from '@/locales/vi.json';
import en from '@/locales/en.json';

const dictionaries = {
  vi,
  en,
};

type DictionaryKey = keyof typeof vi;

export const useTranslation = () => {
  const lang = useLangStore((state) => state.lang);

  const t = useCallback(
    (key: DictionaryKey | string, fallback?: string) => {
      const dictionary = dictionaries[lang] as any;
      return dictionary[key] || fallback || key;
    },
    [lang]
  );

  return { t, lang };
};
