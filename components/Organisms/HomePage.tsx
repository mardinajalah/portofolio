'use client';

import Image from 'next/image';
import { CodeXml } from 'lucide-react';
import {
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faNodeJs,
  faNpm,
  faGitAlt,
  faGithub,
  faDocker,
  faBootstrap
} from '@fortawesome/free-brands-svg-icons';
import IconSkills from '../Atoms/IconSkills';

const HomePage = () => {
  const skills = [
    { title: 'HTML', icon: faHtml5, style: 'text-orange-500' },
    { title: 'CSS', icon: faCss3Alt, style: 'text-blue-500' },
    { title: 'JavaScript', icon: faJs, style: 'text-yellow-500' },
    { title: 'Bootstrap', icon: faBootstrap, style: 'text-purple-600' },
    { title: 'Node Js', icon: faNodeJs, style: 'text-green-500' },
    { title: 'React', icon: faReact, style: 'text-blue-400' },
    { title: 'Npm', icon: faNpm, style: 'text-red-600' },
    { title: 'Git', icon: faGitAlt, style: 'text-red-400' },
    { title: 'Git Hub', icon: faGithub, style: 'text-gray-500' },
    { title: 'Docker', icon: faDocker, style: 'text-blue-600' },
  ];

  return (
    <>
      {/* Header */}
      <div
        className="
          w-full h-[200px] p-6 rounded-2xl flex items-center justify-between
          bg-white/20 dark:bg-gray-800/20
          backdrop-blur-xl
          border border-white/30 dark:border-gray-700/40
          shadow-lg
          overflow-hidden
        "
      >
        <div className="w-max">
          <h1 className="text-3xl font-bold capitalize drop-shadow-md">
            Hi, Iam Mardin
          </h1>
          <p className="capitalize drop-shadow-sm">
            I am a fullstack web developer
          </p>
        </div>
        <div className="w-max">
          <Image alt="header" src="/header.png" width={250} height={250} />
        </div>
      </div>

      {/* text */}
      <p className="mt-6 text-justify border-b border-gray-300 dark:border-gray-700/40 pb-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero commodi hic aut iure, ut impedit cum placeat saepe dignissimos provident distinctio quae expedita laborum nam quaerat explicabo nisi ea, atque quis ratione. Consequatur
        assumenda maiores dolore eligendi nulla aut consequuntur veritatis quae incidunt in, possimus rem perspiciatis, provident doloribus accusantium repellendus officia iste nam fuga unde sit minus nostrum quaerat eum. Optio laudantium
        hic consequuntur quis cumque eum laborum quibusdam ipsum nostrum voluptatem vero voluptas rem vitae molestiae, animi ratione, sunt magni ipsa ducimus. Voluptates adipisci sint, maiores voluptatum suscipit laboriosam vero aspernatur
        necessitatibus ullam, nisi explicabo, tempora vel cumque.
      </p>

      {/* skill */}
      <div>
        <div className="mt-6 flex items-center gap-2 justify-start">
          <CodeXml size={25} />
          <h1 className="text-2xl font-bold">Skills</h1>
        </div>
        <p className="font-semibold">- my professional skills -</p>

        {/* Icon dengan efek glassmorphism berjalan */}
        <div className="relative w-full overflow-hidden mt-6">
          <div className="animate-marquee flex gap-4">
            {[...skills, ...skills].map((skill, index) => (
              <IconSkills
                key={index}
                title={skill.title}
                icon={skill.icon}
                style={skill.style}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
