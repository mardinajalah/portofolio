'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface AboutHeroProps {
  isDark: boolean;
}

const AboutHero = ({ isDark }: AboutHeroProps) => {
  const t = useTranslations('AboutPage.hero');

  return (
    <section
      className={`
        w-full min-h-60 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8
        ${isDark ? 'bg-gray-800/20 border-gray-700/40' : 'bg-white/20 border-white/30'}
        backdrop-blur-xl border shadow-lg overflow-hidden
      `}
    >
      <div className='w-full md:w-3/5 text-center md:text-left'>
        <p className='font-semibold text-blue-500 capitalize mb-2'>{t('eyebrow')}</p>
        <h1 className='text-2xl md:text-3xl font-bold capitalize drop-shadow-md'>{t('title')}</h1>
        <p className='mt-4 text-sm md:text-base leading-7'>{t('description')}</p>
      </div>

      <div className='w-35 h-35 md:w-45 md:h-45 rounded-full overflow-hidden border border-white/30 shadow-md bg-white/10 flex items-center justify-center'>
        <Image
          alt='Mardin profile'
          src='/profile/profile.png'
          width={220}
          height={220}
          priority
          className='w-full h-full object-cover'
        />
      </div>
    </section>
  );
};

export default AboutHero;
