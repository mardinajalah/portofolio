'use client';

import { useEffect, useState } from 'react';
import { Clock, Github, Linkedin, Mail, MapPin, MessageSquareText, Sparkles } from 'lucide-react';
import { useTheme } from 'next-themes';
import ContactForm from '@/components/Molecules/ContactForm';
import ContactHero from '@/components/Molecules/ContactHero';
import ContactInfoCard from '@/components/Molecules/ContactInfoCard';
import { SkeletonContactPage } from '@/components/Molecules/Skeleton';

const contactItems = [
  {
    label: 'Email',
    value: 'mardin@example.com',
    icon: Mail,
    href: 'mailto:mardin@example.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/mardinajalah',
    icon: Github,
    href: 'https://github.com/mardinajalah',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/mardin',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/mardin',
  },
  {
    label: 'Location',
    value: 'Indonesia',
    icon: MapPin,
  },
];

const availabilityItems = [
  {
    title: 'Collaboration',
    description: 'Open for portfolio, dashboard, and fullstack web project discussions.',
    icon: Sparkles,
  },
  {
    title: 'Project Talk',
    description: 'Ready to discuss UI flow, frontend implementation, and backend structure.',
    icon: MessageSquareText,
  },
  {
    title: 'Response',
    description: 'I usually review messages and follow up as soon as possible.',
    icon: Clock,
  },
];

const Contact = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <SkeletonContactPage />;
  }

  return (
    <div className='w-full'>
      <ContactHero isDark={isDark} />

      <section className='mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div>
          <div className='flex items-center gap-2 justify-start'>
            <Mail size={25} />
            <h1 className='text-2xl font-bold capitalize'>Contact Info</h1>
          </div>

          <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4'>
            {contactItems.map((item) => (
              <ContactInfoCard
                key={item.label}
                href={item.href}
                icon={item.icon}
                isDark={isDark}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </div>

        <div className='lg:col-span-2'>
          <div className='flex items-center gap-2 justify-start'>
            <MessageSquareText size={25} />
            <h1 className='text-2xl font-bold capitalize'>Send Message</h1>
          </div>

          <div className='mt-5'>
            <ContactForm isDark={isDark} />
          </div>
        </div>
      </section>

      <section className='mt-10 border-t-2 border-gray-300 dark:border-gray-700/40 pt-8'>
        <div className='flex items-center gap-2 justify-start'>
          <Sparkles size={25} />
          <h1 className='text-2xl font-bold capitalize'>Availability</h1>
        </div>

        <div className='mt-5 grid grid-cols-1 md:grid-cols-3 gap-4'>
          {availabilityItems.map((item) => (
            <div
              key={item.title}
              className={`
                p-5 rounded-xl backdrop-blur-xl border shadow-md
                ${isDark ? 'bg-gray-800/20 border-gray-700/40' : 'bg-white/20 border-white/30'}
              `}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-blue-400/10 text-blue-400' : 'bg-blue-500/10 text-blue-500'}`}>
                <item.icon size={20} />
              </div>
              <h2 className='mt-4 font-semibold'>{item.title}</h2>
              <p className='mt-2 text-sm leading-6'>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
