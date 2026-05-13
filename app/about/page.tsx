'use client';

import { useEffect, useState } from 'react';
import { BookOpen, CodeXml, MapPin, Sparkles, Target, UserRound, Wrench } from 'lucide-react';
import { useTheme } from 'next-themes';
import Ability from '@/components/Atoms/Ability';
import AboutHero from '@/components/Molecules/AboutHero';
import AboutInfoCard from '@/components/Molecules/AboutInfoCard';
import AboutTimeline from '@/components/Molecules/AboutTimeline';
import { SkeletonAboutPage } from '@/components/Molecules/Skeleton';

const quickFacts = [
  {
    label: 'Role',
    value: 'Fullstack Developer',
    icon: UserRound,
  },
  {
    label: 'Focus',
    value: 'React, Next.js, Node.js',
    icon: Target,
  },
  {
    label: 'Location',
    value: 'Indonesia',
    icon: MapPin,
  },
  {
    label: 'Status',
    value: 'Open to Collaborate',
    icon: Sparkles,
  },
];

const timelineItems = [
  {
    title: 'Learning the foundation',
    description: 'Started from core web technologies and built a strong base with HTML, CSS, JavaScript, Git, and responsive layout patterns.',
  },
  {
    title: 'Building real projects',
    description: 'Explored frontend and backend workflows by creating portfolio pages, dashboard interfaces, authentication flows, and database-driven applications.',
  },
  {
    title: 'Growing as a fullstack developer',
    description: 'Currently improving with React, Next.js, TypeScript, Node.js, MySQL, Tailwind CSS, and deployment workflows for production-ready projects.',
  },
];

const About = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mounted, setMounted] = useState(false);

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
          <h1 className='text-2xl font-bold capitalize'>My Story</h1>
        </div>

        <div className='mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div
            className={`
              p-5 rounded-xl backdrop-blur-xl border shadow-md
              ${isDark ? 'bg-gray-800/20 border-gray-700/40' : 'bg-white/20 border-white/30'}
            `}
          >
            <p className='text-sm md:text-base leading-7 text-justify text-gray-500 dark:text-gray-300'>
              I enjoy turning ideas into useful web applications. My work usually starts from understanding the interface, shaping a clean user flow, and then connecting it with backend logic that keeps the application reliable.
            </p>
            <p className='mt-4 text-sm md:text-base leading-7 text-justify text-gray-500 dark:text-gray-300'>
              This portfolio is a place to document my learning journey, projects, and the technologies I use while growing as a fullstack web developer.
            </p>
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
          <h1 className='text-2xl font-bold capitalize'>Main Focus</h1>
        </div>

        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
          <Ability
            title='Frontend Development'
            target='90%'
          />
          <Ability
            title='Backend Development'
            target='80%'
          />
          <Ability
            title='UI/UX Design'
            target='50%'
          />
          <Ability
            title='Deployment'
            target='70%'
          />
        </div>
      </section>

      <section className='mt-10'>
        <div className='flex items-center gap-2 justify-start'>
          <CodeXml size={25} />
          <h1 className='text-2xl font-bold capitalize'>What I Build</h1>
        </div>

        <div
          className={`
            mt-5 p-5 rounded-xl backdrop-blur-xl border shadow-md
            ${isDark ? 'bg-gray-800/20 border-gray-700/40' : 'bg-white/20 border-white/30'}
          `}
        >
          <p className='text-sm md:text-base leading-7 text-gray-500 dark:text-gray-300'>
            I focus on modern portfolio sites, internal dashboards, CRUD applications, and fullstack web systems that combine clear interfaces with maintainable application logic.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
