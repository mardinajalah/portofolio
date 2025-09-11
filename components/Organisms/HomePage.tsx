'use client';

import Image from 'next/image';
import { CodeXml, Settings } from 'lucide-react';
import { faHtml5, faCss3Alt, faJs, faReact, faNodeJs, faNpm, faGitAlt, faGithub, faDocker, faBootstrap } from '@fortawesome/free-brands-svg-icons';
import { IconSkillsLeft, IconSkillsRight } from '../Atoms/IconSkills';
import Ability from '../Atoms/Ability';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SkeletonHomePage } from '../Molecules/Skeleton';

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
  const [ mounted, setMounted ] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <SkeletonHomePage />
    );
  }

  return (
    <>
      {/* Header */}
      <div
        className={`
          w-full h-[200px] p-6 rounded-2xl flex items-center justify-between
          ${isDark ? 'bg-gray-800/20 border-gray-700/40' : 'bg-white/20 border-white/30'}
          backdrop-blur-xl
          border  
          shadow-lg
          overflow-hidden
        `}>
        <div className='w-max'>
          <h1 className='text-3xl font-bold capitalize drop-shadow-md'>Hi, Iam Mardin</h1>
          <p className='capitalize drop-shadow-sm'>I am a fullstack web developer</p>
          <button className='font-semibold mt-4 px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all shadow-md cursor-pointer hover:scale-105 duration-300'>Download CV</button>
        </div>
        <div className='w-max'>
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero commodi hic aut iure, ut impedit cum placeat saepe dignissimos provident distinctio quae expedita laborum nam quaerat explicabo nisi ea, atque quis ratione. Consequatur
        assumenda maiores dolore eligendi nulla aut consequuntur veritatis quae incidunt in, possimus rem perspiciatis, provident doloribus accusantium repellendus officia iste nam fuga unde sit minus nostrum quaerat eum. Optio laudantium
        hic
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
          <Settings size={25} />
          <h1 className='text-2xl font-bold capitalize'>ability</h1>
        </div>

        <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Ability title='UI/UX Design' target='50%' />
          <Ability title='Frontend Development' target='90%' />
          <Ability title='Backend Development' target='80%' />
        </div>
      </div>
    </>
  );
};

export default HomePage;
