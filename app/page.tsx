'use client';

import Image from 'next/image';
import { CodeXml, Wrench } from 'lucide-react';
import { faHtml5, faCss3Alt, faJs, faReact, faNodeJs, faNpm, faGitAlt, faGithub, faDocker, faBootstrap } from '@fortawesome/free-brands-svg-icons';
import { IconSkillsLeft, IconSkillsRight } from '../components/Atoms/IconSkills';
import Ability from '@/components/Atoms/Ability';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SkeletonHomePage } from '@/components/Molecules/Skeleton';

const HomePage = () => {
  const dataSkillsLeft = [
    { title: 'HTML', icon: faHtml5, style: 'text-orange-500' },
    { title: 'CSS', icon: faCss3Alt, style: 'text-blue-500' },
    { title: 'JavaScript', icon: faJs, style: 'text-yellow-500' },
    { title: 'Bootstrap', icon: faBootstrap, style: 'text-purple-600' },
    { title: 'Node Js', icon: faNodeJs, style: 'text-green-500' },
    { title: 'React', icon: faReact, style: 'text-blue-400' },
    { title: 'Npm', icon: faNpm, style: 'text-red-600' },
    { title: 'Git', icon: faGitAlt, style: 'text-red-400' },
    { title: 'Git Hub', icon: faGithub, style: 'text-black' },
    { title: 'Docker', icon: faDocker, style: 'text-blue-600' },
  ];

  const dataSkillsRight = [
    { title: 'Express', icon: 'express' },
    { title: 'Tailwind Css', icon: 'tailwindcss' },
    { title: 'Next', icon: 'next' },
    { title: 'Xampp', icon: 'xampp' },
    { title: 'Vercel', icon: 'vercel' },
    { title: 'Typescripy', icon: 'typescript' },
    { title: 'Mysql', icon: 'mysql' },
    { title: 'Vite', icon: 'vite' },
    { title: 'Figma', icon: 'figma' },
  ];

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <SkeletonHomePage />;
  }

  return (
    <>
      {/* Header */}
      <div
        className={`
          w-full min-h-[200px] p-6 rounded-2xl flex flex-col md:flex-row items-center md:items-center justify-between
          ${isDark ? 'bg-gray-800/20 border-gray-700/40' : 'bg-white/20 border-white/30'}
          backdrop-blur-xl border shadow-lg overflow-hidden
        `}
      >
        <div className='text-center md:text-left w-full md:w-1/2'>
          <h1 className='text-2xl md:text-3xl font-bold capitalize drop-shadow-md'>Hi, I am Mardin</h1>
          <p className='capitalize drop-shadow-sm'>I am a fullstack web developer</p>
          <button className='font-semibold mt-4 px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all shadow-md cursor-pointer hover:scale-105 duration-300'>Download CV</button>
        </div>
        <div className='mt-6 md:mt-0 w-[180px] md:w-[250px]'>
          <Image
            alt='header'
            src='/header.png'
            width={250}
            height={250}
          />
        </div>
      </div>

      {/* text */}
      <p className='mt-6 text-justify border-b-2 border-gray-300 dark:border-gray-700/40 pb-6'>
        Hello, my name is <span className='font-semibold'>Mardin</span>, a <span className='font-semibold'>Fullstack Web Developer</span> passionate about building modern, responsive, and scalable web applications. I have hands-on
        experience working with technologies such as <span className='font-semibold'>React, Next.js, Node.js, TypeScript, Tailwind CSS</span>, and <span className='font-semibold'>Docker</span> for deployment. Throughout my journey, I’ve
        developed interactive frontend features while also managing backend services and databases using <span className='font-semibold'>Express.js and MySQL</span>. In addition, I have a strong understanding of{' '}
        <span className='font-semibold'>UI/UX design</span> with tools like Figma, allowing me to bridge technical solutions with great user experiences. Currently, I am pursuing my studies in{' '}
        <span className='font-semibold'>Information Technology</span> while actively building personal and team-based projects. This portfolio serves as a place to document my journey, skills, and projects I’ve created. With a strong
        passion for continuous learning and growth, I am always open to new challenges in the tech industry.
      </p>

      {/* skills */}
      <div className='mt-10 border-b-2 border-gray-300 dark:border-gray-700/40 pb-6'>
        <div className='flex items-center gap-2 justify-start'>
          <CodeXml size={25} />
          <h1 className='text-2xl font-bold capitalize'>Skills</h1>
        </div>

        {/* Icon dengan efek glassmorphism berjalan */}
        <div className='relative w-full overflow-hidden mt-6 p-2 flex flex-col gap-4'>
          {/* Left → berjalan kanan ke kiri */}
          <div className='animate-marquee flex gap-4'>
            {[...dataSkillsLeft, ...dataSkillsLeft].map((skill, index) => (
              <IconSkillsLeft
                key={`left-${index}`}
                title={skill.title}
                icon={skill.icon}
                style={skill.style}
              />
            ))}
          </div>

          {/* Right → berjalan kiri ke kanan */}
          <div className='animate-marquee-reverse flex gap-4'>
            {[...dataSkillsRight, ...dataSkillsRight].map((skill, index) => (
              <IconSkillsRight
                key={`right-${index}`}
                title={skill.title}
                icon={skill.icon}
              />
            ))}
          </div>
        </div>
      </div>

      {/* skils */}
      <div className='mt-10'>
        <div className='flex items-center gap-2 justify-start'>
          <Wrench size={25} />
          <h1 className='text-2xl font-bold capitalize'>ability</h1>
        </div>

        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          <Ability
            title='UI/UX Design'
            target='50%'
          />
          <Ability
            title='Frontend Development'
            target='90%'
          />
          <Ability
            title='Backend Development'
            target='80%'
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
