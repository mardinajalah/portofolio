'use client';

import { useEffect, useState } from 'react';
import { BriefcaseBusiness, CalendarDays, CalendarX2, Clock, Github, Inbox, MapPin, MessageSquareText, Sparkles, type LucideIcon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useTheme } from 'next-themes';
import { useLocale, useTranslations } from 'next-intl';
import ContactHero from '@/components/Molecules/ContactHero';
import ContactInfoCard from '@/components/Molecules/ContactInfoCard';
import { PublicContactMessages } from '@/components/Molecules/PublicContactMessages';
import { SkeletonContactPage } from '@/components/Molecules/Skeleton';
import { SectionEmptyState } from '@/components/shared/SectionEmptyState';
import { AvailabilityIcon, ContactAvailability, fallbackContactAvailability, getLocalizedAvailabilityText, sortAvailabilityItems } from '@/lib/contact-availability-utils';
import { ContactCard, ContactInfo, fallbackContactInfo, getLocalizedContactText, sortContactCards } from '@/lib/contact-info-utils';

type ContactPageContentProps = {
  contactAvailability: ContactAvailability;
  contactInfo: ContactInfo;
};

const availabilityIcons: Record<AvailabilityIcon, LucideIcon> = {
  briefcase: BriefcaseBusiness,
  calendar: CalendarDays,
  clock: Clock,
  message: MessageSquareText,
  sparkles: Sparkles,
};

const getContactCardIcon = (card: ContactCard) => {
  if (card.icon === 'facebook') {
    return (
      <FontAwesomeIcon
        icon={faFacebook}
        className='text-xl'
      />
    );
  }

  if (card.icon === 'whatsapp') {
    return (
      <FontAwesomeIcon
        icon={faWhatsapp}
        className='text-xl'
      />
    );
  }

  if (card.icon === 'telegram') {
    return (
      <FontAwesomeIcon
        icon={faTelegram}
        className='text-xl'
      />
    );
  }

  if (card.icon === 'linkedin') {
    return (
      <FontAwesomeIcon
        icon={faLinkedin}
        className='text-xl'
      />
    );
  }

  if (card.icon === 'github') {
    return <Github size={20} />;
  }

  return <MapPin size={20} />;
};

const ContactPageContent = ({ contactAvailability, contactInfo }: ContactPageContentProps) => {
  const t = useTranslations('ContactPage');
  const locale = useLocale();
  const { resolvedTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const isDark = isMounted ? (resolvedTheme ?? theme ?? 'dark') === 'dark' : true;
  const safeContactInfo = contactInfo ?? fallbackContactInfo;
  const safeContactAvailability = contactAvailability ?? fallbackContactAvailability;
  const contactCards = sortContactCards(safeContactInfo.cards).filter((card) => card.isActive);
  const availabilityItems = sortAvailabilityItems(safeContactAvailability.items).filter((item) => item.isActive);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

          {contactCards.length === 0 ? (
            <div className='mt-5'>
              <SectionEmptyState
                description={t('emptyStates.contactInfo.description')}
                icon={Inbox}
                isDark={isDark}
                title={t('emptyStates.contactInfo.title')}
              />
            </div>
          ) : (
            <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1'>
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
          )}
        </div>

        <div className='lg:col-span-2'>
          <div className='flex items-center gap-2 justify-start'>
            <MessageSquareText size={25} />
            <h1 className='text-2xl font-bold capitalize'>{t('sendMessageTitle')}</h1>
          </div>

          <div className='mt-5'>
            <PublicContactMessages isDark={isDark} />
          </div>
        </div>
      </section>

      <section className='mt-10 border-t-2 border-gray-300 pt-8 dark:border-gray-700/40'>
        <div className='flex items-center justify-start gap-2'>
          <Sparkles size={25} />
          <h1 className='text-2xl font-bold capitalize'>{t('availability')}</h1>
        </div>

        {availabilityItems.length === 0 ? (
          <div className='mt-5'>
            <SectionEmptyState
              description={t('emptyStates.availability.description')}
              icon={CalendarX2}
              isDark={isDark}
              title={t('emptyStates.availability.title')}
            />
          </div>
        ) : (
          <div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-3'>
            {availabilityItems.map((item) => {
              const AvailabilityItemIcon = availabilityIcons[item.icon];

              return (
                <div
                  key={item.id}
                  className={`rounded-xl border p-5 shadow-md backdrop-blur-xl ${isDark ? 'border-gray-700/40 bg-gray-800/20' : 'border-white/30 bg-white/20'}`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isDark ? 'bg-blue-400/10 text-blue-400' : 'bg-blue-500/10 text-blue-500'}`}>
                    <AvailabilityItemIcon size={20} />
                  </div>
                  <h2 className='mt-4 font-semibold'>{getLocalizedAvailabilityText(item.title, locale)}</h2>
                  <p className='mt-2 text-sm leading-6'>{getLocalizedAvailabilityText(item.description, locale)}</p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default ContactPageContent;
