import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase/client';
import {
  ContactCard,
  ContactCardIcon,
  ContactInfo,
  fallbackContactCards,
  fallbackContactInfo,
  sortContactCards,
} from '@/lib/contact-info-utils';

export type { ContactCard, ContactInfo } from '@/lib/contact-info-utils';
export { fallbackContactInfo } from '@/lib/contact-info-utils';

const contactInfoCollection = 'siteContent';
const contactInfoDocument = 'contactInfo';
const allowedIcons: ContactCardIcon[] = ['facebook', 'whatsapp', 'telegram', 'github', 'location', 'link', 'mail', 'phone'];

const asString = (value: unknown, fallback = '') => {
  return typeof value === 'string' ? value.trim() : fallback;
};

const asBoolean = (value: unknown, fallback = true) => {
  return typeof value === 'boolean' ? value : fallback;
};

const asNumber = (value: unknown, fallback: number) => {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
};

const asIcon = (value: unknown): ContactCardIcon => {
  return typeof value === 'string' && allowedIcons.includes(value as ContactCardIcon)
    ? (value as ContactCardIcon)
    : 'link';
};

const normalizeLocalizedText = (value: unknown, fallback: ContactCard['label']) => {
  const data = value && typeof value === 'object' ? (value as Partial<ContactCard['label']>) : {};

  return {
    en: asString(data.en, fallback.en),
    id: asString(data.id, fallback.id),
  };
};

const contactCardFromLegacyField = (
  id: string,
  icon: ContactCardIcon,
  label: ContactCard['label'],
  value: ContactCard['value'],
  href: string,
  order: number,
): ContactCard => ({
  id,
  icon,
  label,
  value,
  href,
  isActive: true,
  order,
});

const migrateLegacyContactInfo = (data: Record<string, unknown>): ContactInfo => {
  const fallbackById = Object.fromEntries(fallbackContactCards.map((card) => [card.id, card]));

  return {
    cards: [
      contactCardFromLegacyField(
        'facebook',
        'facebook',
        fallbackById.facebook.label,
        { en: asString(data.facebookUrl, fallbackById.facebook.value.en), id: asString(data.facebookUrl, fallbackById.facebook.value.id) },
        asString(data.facebookUrl, fallbackById.facebook.href),
        1,
      ),
      contactCardFromLegacyField(
        'whatsapp',
        'whatsapp',
        fallbackById.whatsapp.label,
        { en: asString(data.whatsapp, fallbackById.whatsapp.value.en), id: asString(data.whatsapp, fallbackById.whatsapp.value.id) },
        asString(data.whatsapp, fallbackById.whatsapp.href),
        2,
      ),
      contactCardFromLegacyField(
        'telegram',
        'telegram',
        fallbackById.telegram.label,
        { en: asString(data.telegram, fallbackById.telegram.value.en), id: asString(data.telegram, fallbackById.telegram.value.id) },
        asString(data.telegram, fallbackById.telegram.href),
        3,
      ),
      contactCardFromLegacyField(
        'github',
        'github',
        fallbackById.github.label,
        { en: asString(data.githubUrl, fallbackById.github.value.en), id: asString(data.githubUrl, fallbackById.github.value.id) },
        asString(data.githubUrl, fallbackById.github.href),
        4,
      ),
      contactCardFromLegacyField(
        'location',
        'location',
        fallbackById.location.label,
        normalizeLocalizedText(data.location, fallbackById.location.value),
        '',
        5,
      ),
    ],
  };
};

const normalizeContactCard = (value: unknown, index: number): ContactCard => {
  const fallbackCard = fallbackContactCards[index] ?? fallbackContactCards[0];
  const data = value && typeof value === 'object' ? (value as Partial<ContactCard>) : {};

  return {
    id: asString(data.id, `contact-${index + 1}`),
    icon: asIcon(data.icon),
    label: normalizeLocalizedText(data.label, fallbackCard.label),
    value: normalizeLocalizedText(data.value, fallbackCard.value),
    href: asString(data.href, ''),
    isActive: asBoolean(data.isActive, true),
    order: asNumber(data.order, index + 1),
  };
};

export const normalizeContactInfo = (value: unknown): ContactInfo => {
  const data = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};

  if (Array.isArray(data.cards)) {
    return {
      cards: sortContactCards(data.cards.map((card, index) => normalizeContactCard(card, index))),
    };
  }

  if (Object.keys(data).length) {
    return migrateLegacyContactInfo(data);
  }

  return fallbackContactInfo;
};

export const getContactInfo = async () => {
  if (!isFirebaseConfigured) {
    return fallbackContactInfo;
  }

  try {
    const snapshot = await getDoc(doc(getFirebaseDb(), contactInfoCollection, contactInfoDocument));

    if (!snapshot.exists()) {
      return fallbackContactInfo;
    }

    return normalizeContactInfo(snapshot.data());
  } catch {
    return fallbackContactInfo;
  }
};

export const saveContactInfo = async (contactInfo: ContactInfo) => {
  const normalizedContactInfo = normalizeContactInfo(contactInfo);

  await setDoc(
    doc(getFirebaseDb(), contactInfoCollection, contactInfoDocument),
    {
      ...normalizedContactInfo,
      updatedAt: new Date().toISOString(),
    },
  );

  return normalizedContactInfo;
};
