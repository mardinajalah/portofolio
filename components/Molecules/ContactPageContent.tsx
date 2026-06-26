'use client';

import { useEffect, useState } from 'react';
import { Clock, Github, MapPin, MessageSquareText, Sparkles } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useTheme } from 'next-themes';
import { useLocale, useTranslations } from 'next-intl';
import ContactForm from '@/components/Molecules/ContactForm';
import ContactHero from '@/components/Molecules/ContactHero';
import ContactInfoCard from '@/components/Molecules/ContactInfoCard';
import { SkeletonContactPage } from '@/components/Molecules/Skeleton';
import {
  ContactInfo,
  fallbackContactInfo,
  formatContactLinkValue,
  getSocialContactHref,
} from '@/lib/contact-info-utils';

interface AvailabilityCopy {
  title: string;
  description: string;
}

type ContactPageContentProps = {
  contactInfo: ContactInfo;
};

const ContactPageContent = ({ contactInfo }: ContactPageContentProps) => {
  const t = useTranslations('ContactPage');
  const locale = useLocale();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mounted, setMounted] = useState(false);
  const [currentContactInfo, setCurrentContactInfo] = useState<ContactInfo>(contactInfo);

  useEffect(() => {
    let isMounted = true;

    const loadContactInfo = async () => {
      try {
        const response = await fetch('/api/contact-info', { cache: 'no-store' });

        if (!response.ok) {
          return;
        }

        const nextContactInfo = (await response.json()) as ContactInfo;

        if (isMounted) {
          setCurrentContactInfo(nextContactInfo);
        }
      } finally {
        if (isMounted) {
          setMounted(true);
        }
      }
    };

    loadContactInfo();

    return () => {
      isMounted = false;
    };
  }, []);

  const safeContactInfo = currentContactInfo ?? fallbackContactInfo;

  const contactItems = [
    {
      label: t('contactItems.facebook'),
      value: formatContactLinkValue(safeContactInfo.facebookUrl, 'Facebook'),
      icon: <FontAwesomeIcon icon={faFacebook} className='text-xl' />,
      href: getSocialContactHref('facebook', safeContactInfo.facebookUrl),
    },
    {
      label: t('contactItems.whatsapp'),
      value: formatContactLinkValue(safeContactInfo.whatsapp, 'WhatsApp'),
      icon: <FontAwesomeIcon icon={faWhatsapp} className='text-xl' />,
      href: getSocialContactHref('whatsapp', safeContactInfo.whatsapp),
    },
    {
      label: t('contactItems.telegram'),
      value: formatContactLinkValue(safeContactInfo.telegram, 'Telegram'),
      icon: <FontAwesomeIcon icon={faTelegram} className='text-xl' />,
      href: getSocialContactHref('telegram', safeContactInfo.telegram),
    },
    {
      label: t('contactItems.github'),
      value: formatContactLinkValue(safeContactInfo.githubUrl, 'GitHub'),
      icon: <Github size={20} />,
      href: getSocialContactHref('github', safeContactInfo.githubUrl),
    },
    {
      label: t('contactItems.location'),
      value: locale === 'id' ? safeContactInfo.location.id : safeContactInfo.location.en,
      icon: <MapPin size={20} />,
    },
  ];

  const availabilityIcons = [Sparkles, MessageSquareText, Clock];
  const availabilityItems = (t.raw('availabilityItems') as AvailabilityCopy[]).map((item, index) => ({
    ...item,
    icon: availabilityIcons[index],
  }));

  if (!mounted) {
    return <SkeletonContactPage />;
  }

  return (
    <div className='w-full'>
      <ContactHero isDark={isDark} />

      <section className='mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div>
          <div className='flex items-center gap-2 justify-start'>
            <MessageSquareText size={25} />
            <h1 className='text-2xl font-bold capitalize'>{t('contactInfo')}</h1>
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
            <h1 className='text-2xl font-bold capitalize'>{t('sendMessageTitle')}</h1>
          </div>

          <div className='mt-5'>
            <ContactForm isDark={isDark} />
          </div>
        </div>
      </section>

      <section className='mt-10 border-t-2 border-gray-300 dark:border-gray-700/40 pt-8'>
        <div className='flex items-center gap-2 justify-start'>
          <Sparkles size={25} />
          <h1 className='text-2xl font-bold capitalize'>{t('availability')}</h1>
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

export default ContactPageContent;
