export type AvailabilityIcon = 'sparkles' | 'message' | 'clock' | 'calendar' | 'briefcase';

export type AvailabilityText = {
  en: string;
  id: string;
};

export type AvailabilityItem = {
  id: string;
  icon: AvailabilityIcon;
  title: AvailabilityText;
  description: AvailabilityText;
  isActive: boolean;
  order: number;
};

export type ContactAvailability = {
  items: AvailabilityItem[];
};

export const availabilityIconOptions: { value: AvailabilityIcon; label: string }[] = [
  { value: 'sparkles', label: 'Sparkles' },
  { value: 'message', label: 'Message' },
  { value: 'clock', label: 'Clock' },
  { value: 'calendar', label: 'Calendar' },
  { value: 'briefcase', label: 'Briefcase' },
];

export const fallbackAvailabilityItems: AvailabilityItem[] = [
  {
    id: 'collaboration',
    icon: 'sparkles',
    title: {
      en: 'Collaboration',
      id: 'Kolaborasi',
    },
    description: {
      en: 'Open for portfolio, dashboard, and fullstack web project discussions.',
      id: 'Terbuka untuk diskusi project portofolio, dashboard, dan aplikasi web fullstack.',
    },
    isActive: true,
    order: 1,
  },
  {
    id: 'project-talk',
    icon: 'message',
    title: {
      en: 'Project Talk',
      id: 'Diskusi Project',
    },
    description: {
      en: 'Ready to discuss UI flow, frontend implementation, and backend structure.',
      id: 'Siap berdiskusi tentang alur UI, implementasi frontend, dan struktur backend.',
    },
    isActive: true,
    order: 2,
  },
  {
    id: 'response',
    icon: 'clock',
    title: {
      en: 'Response',
      id: 'Respons',
    },
    description: {
      en: 'I usually review messages and follow up as soon as possible.',
      id: 'Saya biasanya meninjau pesan dan membalas secepat mungkin.',
    },
    isActive: true,
    order: 3,
  },
];

export const fallbackContactAvailability: ContactAvailability = {
  items: fallbackAvailabilityItems,
};

export const createBlankAvailabilityItem = (order: number): AvailabilityItem => ({
  id: `availability-${Date.now()}`,
  icon: 'sparkles',
  title: {
    en: '',
    id: '',
  },
  description: {
    en: '',
    id: '',
  },
  isActive: true,
  order,
});

export const sortAvailabilityItems = (items: AvailabilityItem[]) => {
  return [...items].sort((firstItem, secondItem) => firstItem.order - secondItem.order);
};

export const getLocalizedAvailabilityText = (value: AvailabilityText, locale: string) => {
  return locale === 'id' ? value.id || value.en : value.en || value.id;
};
