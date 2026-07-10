import type { Timestamp } from 'firebase/firestore';

export type ContactMessageStatus = 'unread' | 'read';
export type ContactMessageLocale = 'id' | 'en';

export type ContactMessageInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale: ContactMessageLocale;
};

export type ContactMessage = ContactMessageInput & {
  id: string;
  status: ContactMessageStatus;
  createdAt: Timestamp | null;
  readAt: Timestamp | null;
};

export const contactMessageLimits = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { min: 3, max: 150 },
  message: { min: 10, max: 3000 },
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const normalizeContactMessageInput = (input: ContactMessageInput): ContactMessageInput => ({
  name: input.name.trim(),
  email: input.email.trim().toLowerCase(),
  subject: input.subject.trim(),
  message: input.message.trim(),
  locale: input.locale,
});

export const isValidContactMessageInput = (input: ContactMessageInput) => {
  const normalizedInput = normalizeContactMessageInput(input);

  return (
    normalizedInput.name.length >= contactMessageLimits.name.min
    && normalizedInput.name.length <= contactMessageLimits.name.max
    && normalizedInput.email.length <= contactMessageLimits.email.max
    && emailPattern.test(normalizedInput.email)
    && normalizedInput.subject.length >= contactMessageLimits.subject.min
    && normalizedInput.subject.length <= contactMessageLimits.subject.max
    && normalizedInput.message.length >= contactMessageLimits.message.min
    && normalizedInput.message.length <= contactMessageLimits.message.max
    && (normalizedInput.locale === 'id' || normalizedInput.locale === 'en')
  );
};
