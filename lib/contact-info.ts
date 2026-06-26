import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase/client';
import { ContactInfo, fallbackContactInfo } from '@/lib/contact-info-utils';

export type { ContactInfo } from '@/lib/contact-info-utils';
export { fallbackContactInfo } from '@/lib/contact-info-utils';

const contactInfoCollection = 'siteContent';
const contactInfoDocument = 'contactInfo';

const asOptionalString = (value: unknown, fallback: string) => {
  return typeof value === 'string' ? value.trim() : fallback;
};

const asRequiredString = (value: unknown, fallback: string) => {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
};

export const normalizeContactInfo = (value: unknown): ContactInfo => {
  const data = value && typeof value === 'object' ? (value as Partial<ContactInfo>) : {};
  const location =
    data.location && typeof data.location === 'object'
      ? (data.location as Partial<ContactInfo['location']>)
      : {};

  return {
    facebookUrl: asOptionalString(data.facebookUrl, fallbackContactInfo.facebookUrl),
    whatsapp: asOptionalString(data.whatsapp, fallbackContactInfo.whatsapp),
    telegram: asOptionalString(data.telegram, fallbackContactInfo.telegram),
    githubUrl: asOptionalString(data.githubUrl, fallbackContactInfo.githubUrl),
    location: {
      en: asRequiredString(location.en, fallbackContactInfo.location.en),
      id: asRequiredString(location.id, fallbackContactInfo.location.id),
    },
  };
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
    { merge: true },
  );

  return normalizedContactInfo;
};
