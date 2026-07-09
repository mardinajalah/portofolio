export type ContactCardIcon = 'facebook' | 'whatsapp' | 'telegram' | 'linkedin' | 'github' | 'location' | 'link' | 'mail' | 'phone';

export type ContactCard = {
  id: string;
  icon: ContactCardIcon;
  label: {
    en: string;
    id: string;
  };
  value: {
    en: string;
    id: string;
  };
  href: string;
  isActive: boolean;
  order: number;
};

export type ContactInfo = {
  cards: ContactCard[];
};

export const contactIconOptions: { value: ContactCardIcon; label: string }[] = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'github', label: 'Github' },
  { value: 'location', label: 'Location' },
];

export const fallbackContactCards: ContactCard[] = [
  {
    id: 'facebook',
    icon: 'facebook',
    label: { en: 'Facebook', id: 'Facebook' },
    value: { en: 'www.facebook.com/mardinajalah', id: 'www.facebook.com/mardinajalah' },
    href: 'https://www.facebook.com/mardinajalah',
    isActive: true,
    order: 1,
  },
  {
    id: 'whatsapp',
    icon: 'whatsapp',
    label: { en: 'WhatsApp', id: 'WhatsApp' },
    value: { en: 'wa.me', id: 'wa.me' },
    href: 'https://wa.me/',
    isActive: true,
    order: 2,
  },
  {
    id: 'telegram',
    icon: 'telegram',
    label: { en: 'Telegram', id: 'Telegram' },
    value: { en: 't.me', id: 't.me' },
    href: 'https://t.me/',
    isActive: true,
    order: 3,
  },
  {
    id: 'github',
    icon: 'github',
    label: { en: 'GitHub', id: 'GitHub' },
    value: { en: 'github.com/mardinajalah', id: 'github.com/mardinajalah' },
    href: 'https://github.com/mardinajalah',
    isActive: true,
    order: 4,
  },
  {
    id: 'location',
    icon: 'location',
    label: { en: 'Location', id: 'Lokasi' },
    value: { en: 'Indonesia', id: 'Indonesia' },
    href: '',
    isActive: true,
    order: 5,
  },
];

export const fallbackContactInfo: ContactInfo = {
  cards: fallbackContactCards,
};

export const createBlankContactCard = (order: number): ContactCard => ({
  id: `contact-${Date.now()}`,
  icon: 'facebook',
  label: {
    en: 'New Contact',
    id: 'Kontak Baru',
  },
  value: {
    en: '',
    id: '',
  },
  href: '',
  isActive: true,
  order,
});

export const sortContactCards = (cards: ContactCard[]) => {
  return [...cards].sort((firstCard, secondCard) => firstCard.order - secondCard.order);
};

export const getLocalizedContactText = (value: ContactCard['label'] | ContactCard['value'], locale: string) => {
  return locale === 'id' ? value.id || value.en : value.en || value.id;
};
