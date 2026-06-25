import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import AppShell from '@/components/Molecules/AppShell';
import { routing } from '@/i18n/routing';
import { getMessages, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    metadataBase: new URL('https://mardin-portofolio.vercel.app'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://mardin-portofolio.vercel.app',
      siteName: 'Mardin Portofolio',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    }
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const message = await getMessages();

  return (
    <NextIntlClientProvider messages={message}>
      <AppShell>{children}</AppShell>
    </NextIntlClientProvider>
  );
}
