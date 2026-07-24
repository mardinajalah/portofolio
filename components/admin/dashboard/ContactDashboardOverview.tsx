'use client';

import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarClock,
  CalendarDays,
  CircleAlert,
  Clock,
  ContactRound,
  Github,
  Link as LinkIcon,
  Mail,
  MailOpen,
  MapPin,
  MessageCircle,
  MessageSquareText,
  Phone,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faLinkedin,
  faTelegram,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import {
  DashboardSummaryCard,
} from '@/components/admin/dashboard/DashboardSummaryCard';
import { DashboardSummarySkeleton } from '@/components/admin/dashboard/DashboardSummarySkeleton';
import {
  getContactAvailabilityForAdmin,
} from '@/lib/contact-availability';
import {
  type AvailabilityIcon,
  type AvailabilityItem,
  sortAvailabilityItems,
} from '@/lib/contact-availability-utils';
import { getContactInfoForAdmin } from '@/lib/contact-info';
import {
  type ContactCard,
  type ContactCardIcon,
  sortContactCards,
} from '@/lib/contact-info-utils';
import {
  type ContactMessage,
  subscribeToContactMessages,
} from '@/lib/contact-messages';

type ContactDashboardOverviewProps = {
  isDark: boolean;
};

type DataState = 'loading' | 'ready' | 'error';

type PreviewRowProps = {
  children: ReactNode;
  isDark: boolean;
  showBorder: boolean;
};

const previewLimit = 3;

const messageDateFormatter = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const availabilityIcons: Record<AvailabilityIcon, LucideIcon> = {
  briefcase: BriefcaseBusiness,
  calendar: CalendarDays,
  clock: Clock,
  message: MessageSquareText,
  sparkles: Sparkles,
};

const PreviewRow = ({ children, isDark, showBorder }: PreviewRowProps) => (
  <div className={`flex min-w-0 items-center gap-3 py-3 ${showBorder ? (isDark ? 'border-t border-gray-800' : 'border-t border-gray-300/80') : ''}`}>
    {children}
  </div>
);

const PreviewEmptyState = ({ children, isDark }: { children: ReactNode; isDark: boolean }) => (
  <div className={`flex min-h-48 items-center justify-center text-center text-sm leading-6 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
    {children}
  </div>
);

const PreviewErrorState = ({ isDark }: { isDark: boolean }) => (
  <div className={`flex min-h-48 flex-col items-center justify-center text-center ${isDark ? 'text-red-200' : 'text-red-700'}`}>
    <CircleAlert
      aria-hidden='true'
      size={24}
    />
    <p className='mt-3 text-sm font-semibold'>Data tidak dapat dimuat</p>
    <p className={`mt-1 text-xs leading-5 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
      Periksa koneksi dan akses Firebase admin.
    </p>
  </div>
);

const getContactCardIcon = (icon: ContactCardIcon) => {
  const brandIconClassName = 'h-4 w-4';

  if (icon === 'facebook') {
    return <FontAwesomeIcon className={brandIconClassName} icon={faFacebook} />;
  }

  if (icon === 'whatsapp') {
    return <FontAwesomeIcon className={brandIconClassName} icon={faWhatsapp} />;
  }

  if (icon === 'telegram') {
    return <FontAwesomeIcon className={brandIconClassName} icon={faTelegram} />;
  }

  if (icon === 'linkedin') {
    return <FontAwesomeIcon className={brandIconClassName} icon={faLinkedin} />;
  }

  if (icon === 'github') {
    return <Github size={17} />;
  }

  if (icon === 'mail') {
    return <Mail size={17} />;
  }

  if (icon === 'phone') {
    return <Phone size={17} />;
  }

  if (icon === 'link') {
    return <LinkIcon size={17} />;
  }

  return <MapPin size={17} />;
};

const formatMessageDate = (message: ContactMessage) => {
  return message.createdAt
    ? messageDateFormatter.format(message.createdAt.toDate())
    : 'Baru saja';
};

export const ContactDashboardOverview = ({ isDark }: ContactDashboardOverviewProps) => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [contactCards, setContactCards] = useState<ContactCard[]>([]);
  const [availabilityItems, setAvailabilityItems] = useState<AvailabilityItem[]>([]);
  const [messageState, setMessageState] = useState<DataState>('loading');
  const [contactState, setContactState] = useState<DataState>('loading');
  const [availabilityState, setAvailabilityState] = useState<DataState>('loading');

  useEffect(() => {
    let isActive = true;
    let unsubscribeMessages: (() => void) | undefined;

    try {
      unsubscribeMessages = subscribeToContactMessages(
        (nextMessages) => {
          if (isActive) {
            setMessages(nextMessages);
            setMessageState('ready');
          }
        },
        () => {
          if (isActive) {
            setMessageState('error');
          }
        },
      );
    } catch {
      setMessageState('error');
    }

    void getContactInfoForAdmin()
      .then((contactInfo) => {
        if (isActive) {
          setContactCards(sortContactCards(contactInfo.cards));
          setContactState('ready');
        }
      })
      .catch(() => {
        if (isActive) {
          setContactState('error');
        }
      });

    void getContactAvailabilityForAdmin()
      .then((contactAvailability) => {
        if (isActive) {
          setAvailabilityItems(sortAvailabilityItems(contactAvailability.items));
          setAvailabilityState('ready');
        }
      })
      .catch(() => {
        if (isActive) {
          setAvailabilityState('error');
        }
      });

    return () => {
      isActive = false;
      unsubscribeMessages?.();
    };
  }, []);

  const unreadMessages = messages.filter((message) => message.status === 'unread').length;
  const activeContactCards = contactCards.filter((card) => card.isActive).length;
  const activeAvailabilityItems = availabilityItems.filter((item) => item.isActive).length;
  const contactPreview = contactCards.slice(0, previewLimit);
  const availabilityPreview = availabilityItems.slice(0, previewLimit);
  const messagePreview = messages.slice(0, previewLimit);

  return (
    <section className='space-y-4'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
            Modul Aktif
          </p>
          <h2 className='mt-1 text-2xl font-bold'>Ringkasan Contact</h2>
          <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Tiga sumber data Contact ditampilkan secara ringkas dan tetap dikelola dari halaman utamanya.
          </p>
        </div>
        <Link
          href='/admin/contact'
          className={`inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg border px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
            isDark
              ? 'border-blue-400/20 bg-blue-500/10 text-blue-100 hover:bg-blue-500/20 focus-visible:ring-offset-gray-950'
              : 'border-blue-500/20 bg-blue-50 text-blue-700 hover:bg-blue-100 focus-visible:ring-offset-white'
          }`}
        >
          Kelola Contact
          <ArrowUpRight
            aria-hidden='true'
            size={17}
          />
        </Link>
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3'>
        {messageState === 'loading' ? (
          <DashboardSummarySkeleton isDark={isDark} />
        ) : (
          <DashboardSummaryCard
            accent='blue'
            description={messageState === 'error' ? 'Status pesan tidak tersedia' : `${unreadMessages} belum dibaca`}
            icon={MessageSquareText}
            isDark={isDark}
            metric={messageState === 'error' ? '—' : String(messages.length)}
            title='Pesan Masuk'
          >
            {messageState === 'error' ? (
              <PreviewErrorState isDark={isDark} />
            ) : messagePreview.length === 0 ? (
              <PreviewEmptyState isDark={isDark}>Belum ada pesan masuk.</PreviewEmptyState>
            ) : (
              messagePreview.map((message, index) => (
                <PreviewRow
                  key={message.id}
                  isDark={isDark}
                  showBorder={index > 0}
                >
                  <div
                    aria-hidden='true'
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      message.status === 'unread'
                        ? isDark
                          ? 'bg-blue-500/10 text-blue-300'
                          : 'bg-blue-50 text-blue-700'
                        : isDark
                          ? 'bg-gray-950/70 text-gray-500'
                          : 'bg-white/60 text-gray-600'
                    }`}
                  >
                    {message.status === 'unread' ? <Mail size={17} /> : <MailOpen size={17} />}
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-semibold'>{message.name}</p>
                    <p className={`mt-1 truncate text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                      {message.subject}
                    </p>
                  </div>
                  <time
                    className={`max-w-24 shrink-0 text-right text-[11px] leading-4 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}
                    dateTime={message.createdAt?.toDate().toISOString()}
                  >
                    {formatMessageDate(message)}
                  </time>
                </PreviewRow>
              ))
            )}
          </DashboardSummaryCard>
        )}

        {contactState === 'loading' ? (
          <DashboardSummarySkeleton isDark={isDark} />
        ) : (
          <DashboardSummaryCard
            accent='emerald'
            description={contactState === 'error' ? 'Status card tidak tersedia' : `${activeContactCards} aktif · ${contactCards.length - activeContactCards} nonaktif`}
            icon={ContactRound}
            isDark={isDark}
            metric={contactState === 'error' ? '—' : String(contactCards.length)}
            title='Informasi Kontak'
          >
            {contactState === 'error' ? (
              <PreviewErrorState isDark={isDark} />
            ) : contactPreview.length === 0 ? (
              <PreviewEmptyState isDark={isDark}>Belum ada informasi kontak.</PreviewEmptyState>
            ) : (
              contactPreview.map((card, index) => (
                <PreviewRow
                  key={card.id}
                  isDark={isDark}
                  showBorder={index > 0}
                >
                  <div
                    aria-hidden='true'
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${isDark ? 'bg-emerald-400/10 text-emerald-300' : 'bg-emerald-50 text-emerald-700'}`}
                  >
                    {getContactCardIcon(card.icon)}
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-semibold'>{card.label.id || card.label.en}</p>
                    <p className={`mt-1 truncate text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                      Urutan {card.order}
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold ${card.isActive ? (isDark ? 'bg-emerald-500/10 text-emerald-200' : 'bg-emerald-50 text-emerald-700') : (isDark ? 'bg-gray-950/70 text-gray-500' : 'bg-gray-200/70 text-gray-600')}`}>
                    {card.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                </PreviewRow>
              ))
            )}
          </DashboardSummaryCard>
        )}

        {availabilityState === 'loading' ? (
          <DashboardSummarySkeleton isDark={isDark} />
        ) : (
          <DashboardSummaryCard
            accent='amber'
            description={availabilityState === 'error' ? 'Status ketersediaan tidak tersedia' : `${activeAvailabilityItems} aktif · ${availabilityItems.length - activeAvailabilityItems} nonaktif`}
            icon={CalendarClock}
            isDark={isDark}
            metric={availabilityState === 'error' ? '—' : String(availabilityItems.length)}
            title='Ketersediaan'
          >
            {availabilityState === 'error' ? (
              <PreviewErrorState isDark={isDark} />
            ) : availabilityPreview.length === 0 ? (
              <PreviewEmptyState isDark={isDark}>Belum ada data ketersediaan.</PreviewEmptyState>
            ) : (
              availabilityPreview.map((item, index) => {
                const AvailabilityIconComponent = availabilityIcons[item.icon] ?? MessageCircle;

                return (
                  <PreviewRow
                    key={item.id}
                    isDark={isDark}
                    showBorder={index > 0}
                  >
                    <div
                      aria-hidden='true'
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${isDark ? 'bg-amber-400/10 text-amber-300' : 'bg-amber-50 text-amber-700'}`}
                    >
                      <AvailabilityIconComponent size={17} />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <p className='truncate text-sm font-semibold'>{item.title.id || item.title.en}</p>
                      <p className={`mt-1 truncate text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                        Urutan {item.order}
                      </p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold ${item.isActive ? (isDark ? 'bg-amber-500/10 text-amber-200' : 'bg-amber-50 text-amber-700') : (isDark ? 'bg-gray-950/70 text-gray-500' : 'bg-gray-200/70 text-gray-600')}`}>
                      {item.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </PreviewRow>
                );
              })
            )}
          </DashboardSummaryCard>
        )}
      </div>
    </section>
  );
};
