'use client';

import { useEffect, useState } from 'react';
import { BookOpen, CodeXml, MapPin, Sparkles, Target, UserRound, Wrench } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import Ability from '@/components/Atoms/Ability';
import AboutHero from '@/components/Molecules/AboutHero';
import AboutInfoCard from '@/components/Molecules/AboutInfoCard';
import AboutTimeline from '@/components/Molecules/AboutTimeline';
import { SkeletonAboutPage } from '@/components/Molecules/Skeleton';

interface AboutInfo {
  label: string;
  value: string;
}

interface TimelineItem {
  title: string;
  description: string;
}

const About = () => {
  const t = useTranslations('AboutPage');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mounted, setMounted] = useState(false);
  const quickFacts = (t.raw('quickFacts') as AboutInfo[]).map((item, index) => ({
    ...item,
    icon: [UserRound, Target, MapPin, Sparkles][index],
  }));
  const timelineItems = t.raw('timeline') as TimelineItem[];

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <SkeletonAboutPage />;
  }

  return (
    <div className='w-full'>
      <AboutHero isDark={isDark} />

      <section className='mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
        {quickFacts.map((item) => (
          <AboutInfoCard
            key={item.label}
            icon={item.icon}
            isDark={isDark}
            label={item.label}
            value={item.value}
          />
        ))}
      </section>

      <section className='mt-10 border-b-2 border-gray-300 dark:border-gray-700/40 pb-8'>
        <div className='flex items-center gap-2 justify-start'>
          <BookOpen size={25} />
          <h1 className='text-2xl font-bold capitalize'>{t('storyTitle')}</h1>
        </div>

        <div className='mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div
            className={`
              p-5 rounded-xl backdrop-blur-xl border shadow-md
              ${isDark ? 'bg-gray-800/20 border-gray-700/40' : 'bg-white/20 border-white/30'}
            `}
          >
            <p className='text-sm md:text-base leading-7 text-justify'>{t('storyParagraphOne')}</p>
            <p className='mt-4 text-sm md:text-base leading-7 text-justify'>{t('storyParagraphTwo')}</p>
          </div>

          <AboutTimeline
            isDark={isDark}
            items={timelineItems}
          />
        </div>
      </section>

      <section className='mt-10'>
        <div className='flex items-center gap-2 justify-start'>
          <Wrench size={25} />
          <h1 className='text-2xl font-bold capitalize'>{t('mainFocus')}</h1>
        </div>

        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
          <Ability
            title={t('frontendDevelopment')}
            target='90%'
          />
          <Ability
            title={t('backendDevelopment')}
            target='80%'
          />
          <Ability
            title={t('uiUxDesign')}
            target='50%'
          />
          <Ability
            title={t('deployment')}
            target='70%'
          />
        </div>
      </section>

      <section className='mt-10'>
        <div className='flex items-center gap-2 justify-start'>
          <CodeXml size={25} />
          <h1 className='text-2xl font-bold capitalize'>{t('whatIBuild')}</h1>
        </div>

        <div
          className={`
            mt-5 p-5 rounded-xl backdrop-blur-xl border shadow-md
            ${isDark ? 'bg-gray-800/20 border-gray-700/40' : 'bg-white/20 border-white/30'}
          `}
        >
          <p className='text-sm md:text-base leading-7'>{t('whatIBuildDescription')}</p>
        </div>
      </section>
    </div>
  );
};

export default About;
