export type ContactInfo = {
  facebookUrl: string;
  whatsapp: string;
  telegram: string;
  githubUrl: string;
  location: {
    en: string;
    id: string;
  };
};

export const fallbackContactInfo: ContactInfo = {
  facebookUrl: 'https://www.facebook.com/mardinajalah',
  whatsapp: 'https://wa.me/',
  telegram: 'https://t.me/',
  githubUrl: 'https://github.com/mardinajalah',
  location: {
    en: 'Indonesia',
    id: 'Indonesia',
  },
};

export const formatContactLinkValue = (value: string, fallback: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return fallback;
  }

  try {
    const url = new URL(trimmedValue);
    return url.host + url.pathname.replace(/\/$/, '');
  } catch {
    return trimmedValue;
  }
};

export const getSocialContactHref = (type: 'facebook' | 'github' | 'telegram' | 'whatsapp', value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return undefined;
  }

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  if (type === 'whatsapp') {
    return `https://wa.me/${trimmedValue.replace(/[^\d]/g, '')}`;
  }

  if (type === 'telegram') {
    return `https://t.me/${trimmedValue.replace(/^@/, '')}`;
  }

  return `https://${trimmedValue}`;
};
