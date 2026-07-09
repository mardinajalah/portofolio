'use client';

import { useEffect, useState } from 'react';
import { Clock, Github, MapPin, MessageSquareText, Sparkles } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useTheme } from 'next-themes';
import { useLocale, useTranslations } from 'next-intl';
import ContactForm from '@/components/Molecules/ContactForm';
import ContactHero from '@/components/Molecules/ContactHero';
import ContactInfoCard from '@/components/Molecules/ContactInfoCard';
import { SkeletonContactPage } from '@/components/Molecules/Skeleton';
import {
  ContactCard,
  ContactInfo,
  fallbackContactInfo,
  getLocalizedContactText,
  sortContactCards,
} from '@/lib/contact-info-utils';

interface AvailabilityCopy {
  title: string;
  description: string;
}

type ContactPageContentProps = {
  contactInfo: ContactInfo;
};

const getContactCardIcon = (card: ContactCard) => {
  if (card.icon === 'facebook') {
    return <FontAwesomeIcon icon={faFacebook} className='text-xl' />;
  }

  if (card.icon === 'whatsapp') {
    return <FontAwesomeIcon icon={faWhatsapp} className='text-xl' />;
  }

  if (card.icon === 'telegram') {
    return <FontAwesomeIcon icon={faTelegram} className='text-xl' />;
  }

  if (card.icon === 'linkedin') {
    return <FontAwesomeIcon icon={faLinkedin} className='text-xl' />;
  }

  if (card.icon === 'github') {
    return <Github size={20} />;
  }

  return <MapPin size={20} />;
};

const ContactPageContent = ({ contactInfo }: ContactPageContentProps) => {
  const t = useTranslations('ContactPage');
  const locale = useLocale();
  const { resolvedTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const isDark = isMounted ? (resolvedTheme ?? theme ?? 'dark') === 'dark' : true;
  const safeContactInfo = contactInfo ?? fallbackContactInfo;
  const contactCards = sortContactCards(safeContactInfo.cards).filter((card) => card.isActive);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const availabilityIcons = [Sparkles, MessageSquareText, Clock];
  const availabilityItems = (t.raw('availabilityItems') as AvailabilityCopy[]).map((item, index) => ({
    ...item,
    icon: availabilityIcons[index],
  }));

  if (!isMounted) {
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
            {contactCards.map((card) => (
              <ContactInfoCard
                key={card.id}
                href={card.href || undefined}
                icon={getContactCardIcon(card)}
                isDark={isDark}
                label={getLocalizedContactText(card.label, locale)}
                value={getLocalizedContactText(card.value, locale)}
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
