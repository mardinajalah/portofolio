import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase/client';
import {
  AvailabilityIcon,
  AvailabilityItem,
  AvailabilityText,
  ContactAvailability,
  fallbackAvailabilityItems,
  fallbackContactAvailability,
  sortAvailabilityItems,
} from '@/lib/contact-availability-utils';

export type { AvailabilityItem, ContactAvailability } from '@/lib/contact-availability-utils';
export { fallbackContactAvailability } from '@/lib/contact-availability-utils';

const contactAvailabilityCollection = 'siteContent';
const contactAvailabilityDocument = 'contactAvailability';
const allowedIcons: AvailabilityIcon[] = ['sparkles', 'message', 'clock', 'calendar', 'briefcase'];

const asString = (value: unknown, fallback = '') => {
  return typeof value === 'string' ? value.trim() : fallback;
};

const asBoolean = (value: unknown, fallback = true) => {
  return typeof value === 'boolean' ? value : fallback;
};

const asNumber = (value: unknown, fallback: number) => {
  return typeof value === 'number' && Number.isFinite(value) ? Math.max(1, value) : fallback;
};

const asIcon = (value: unknown, fallback: AvailabilityIcon): AvailabilityIcon => {
  return typeof value === 'string' && allowedIcons.includes(value as AvailabilityIcon)
    ? (value as AvailabilityIcon)
    : fallback;
};

const normalizeLocalizedText = (value: unknown, fallback: AvailabilityText) => {
  const data = value && typeof value === 'object' ? (value as Partial<AvailabilityText>) : {};

  return {
    en: asString(data.en, fallback.en),
    id: asString(data.id, fallback.id),
  };
};

const normalizeAvailabilityItem = (value: unknown, index: number): AvailabilityItem => {
  const fallbackItem = fallbackAvailabilityItems[index] ?? {
    id: `availability-${index + 1}`,
    icon: 'sparkles' as const,
    title: { en: 'Availability', id: 'Ketersediaan' },
    description: { en: '', id: '' },
    isActive: true,
    order: index + 1,
  };
  const data = value && typeof value === 'object' ? (value as Partial<AvailabilityItem>) : {};

  return {
    id: asString(data.id, fallbackItem.id),
    icon: asIcon(data.icon, fallbackItem.icon),
    title: normalizeLocalizedText(data.title, fallbackItem.title),
    description: normalizeLocalizedText(data.description, fallbackItem.description),
    isActive: asBoolean(data.isActive, true),
    order: asNumber(data.order, index + 1),
  };
};

export const normalizeContactAvailability = (value: unknown): ContactAvailability => {
  const data = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};

  if (Array.isArray(data.items)) {
    return {
      items: sortAvailabilityItems(data.items.map((item, index) => normalizeAvailabilityItem(item, index))),
    };
  }

  return fallbackContactAvailability;
};

const readContactAvailability = async () => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase client environment variables are not configured.');
  }

  const snapshot = await getDoc(doc(getFirebaseDb(), contactAvailabilityCollection, contactAvailabilityDocument));

  if (!snapshot.exists()) {
    return fallbackContactAvailability;
  }

  return normalizeContactAvailability(snapshot.data());
};

export const getContactAvailabilityForAdmin = readContactAvailability;

export const getContactAvailability = async () => {
  try {
    return await readContactAvailability();
  } catch {
    return fallbackContactAvailability;
  }
};

export const saveContactAvailability = async (contactAvailability: ContactAvailability) => {
  const normalizedContactAvailability = normalizeContactAvailability(contactAvailability);

  await setDoc(
    doc(getFirebaseDb(), contactAvailabilityCollection, contactAvailabilityDocument),
    {
      ...normalizedContactAvailability,
      updatedAt: new Date().toISOString(),
    },
  );

  return normalizedContactAvailability;
};
