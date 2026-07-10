import { Geist, Geist_Mono } from 'next/font/google';
import { RouteProgressBar } from '@/components/shared/RouteProgressBar';
import { ScrollActivityManager } from '@/components/shared/ScrollActivityManager';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      data-auto-hide-scrollbar='document'
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RouteProgressBar />
        <ScrollActivityManager />
        {children}
      </body>
    </html>
  );
}
