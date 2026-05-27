'use client';

import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ContactHeroProps {
  isDark: boolean;
}

const ContactHero = ({ isDark }: ContactHeroProps) => {
  const t = useTranslations('ContactPage.hero');

  return (
    <section
      className={`
        w-full min-h-55 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6
        ${isDark ? 'bg-gray-800/20 border-gray-700/40' : 'bg-white/20 border-white/30'}
        backdrop-blur-xl border shadow-lg overflow-hidden
      `}
    >
      <div className='w-full md:w-3/5 text-center md:text-left'>
        <p className='font-semibold text-blue-500 capitalize mb-2'>{t('eyebrow')}</p>
        <h1 className='text-2xl md:text-3xl font-bold capitalize drop-shadow-md'>{t('title')}</h1>
        <p className='mt-4 text-sm md:text-base leading-7'>{t('description')}</p>
      </div>

      <div className={`w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center shadow-md ${isDark ? 'bg-blue-400/10 text-blue-400' : 'bg-blue-500/10 text-blue-500'}`}>
        <MessageCircle size={44} />
      </div>
    </section>
  );
};

export default ContactHero;
