'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Molecules/Sidebar';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';

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
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <title>Portofolio</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          <div className="flex h-screen w-full overflow-hidden flex-row relative">
            {/* Sidebar */}
            <Sidebar isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />

            {/* Konten utama geser jika sidebar terbuka */}
            <div
              className={`flex-1 py-6 px-4 md:px-10 w-full overflow-y-auto overflow-x-hidden transition-all duration-300
              ${isOpenSidebar ? 'md:ml-[250px]' : 'ml-0'}`}
            >
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}