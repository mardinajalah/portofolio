'use client';

import { Languages, Moon, Sun } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from '@/i18n/navigation';

export const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type='button'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`relative flex items-center w-24 h-10 rounded-full transition-colors duration-500 overflow-hidden border shadow-md cursor-pointer ${
        isDark ? 'bg-gray-800/20 border-gray-700/40 pl-4' : 'bg-white/20 border-white/30 pl-12'
      }`}
    >
      <div
        className={`absolute top-1 left-1 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-md transform transition-transform duration-500 ${
          isDark ? 'translate-x-14' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <Moon
            className='text-gray-800'
            size={18}
          />
        ) : (
          <Sun
            className='text-yellow-500'
            size={18}
          />
        )}
      </div>

      <span className={`text-xs font-bold transition-colors ${isDark ? 'text-white' : 'text-gray-700'}`}>
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};

export const LanguageToggle = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isEnglish = locale === 'en';

  const handleChangeLanguage = () => {
    router.replace(pathname, { locale: isEnglish ? 'id' : 'en' });
  };

  return (
    <button
      type='button'
      onClick={handleChangeLanguage}
      aria-label='Change language'
      className={`relative flex items-center w-24 h-10 rounded-full transition-colors duration-500 overflow-hidden border shadow-md cursor-pointer ${
        isEnglish ? (isDark ? 'bg-gray-800/20 border-gray-700/40 pl-11' : 'bg-white/20 border-white/30 pl-11') : 'bg-blue-500/70 border-blue-600/40 pl-4'
      }`}
    >
      <div
        className={`absolute top-1 left-1 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-md transform transition-transform duration-500 ${
          isEnglish ? 'translate-x-0' : 'translate-x-14'
        }`}
      >
        <Languages
          size={18}
          className={isEnglish ? 'text-gray-700' : 'text-blue-500'}
        />
      </div>

      <span className={`text-xs font-bold transition-colors duration-500 ${isEnglish ? (isDark ? 'text-white' : 'text-gray-700') : 'text-white'}`}>
        {isEnglish ? 'EN' : 'ID'}
      </span>
    </button>
  );
};
