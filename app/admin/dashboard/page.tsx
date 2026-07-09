'use client';

import { Award, ContactRound, Home, LayoutDashboard, PanelsTopLeft, UserRound } from 'lucide-react';
import { useTheme } from 'next-themes';

export const dynamic = 'force-dynamic';

const adminModules = [
  {
    title: 'Contact Info',
    description: 'Kelola Facebook, WhatsApp, Telegram, GitHub, dan lokasi.',
    icon: ContactRound,
    status: 'Tahap berikutnya',
  },
  {
    title: 'Projects',
    description: 'CRUD project bilingual lengkap dengan screenshot.',
    icon: PanelsTopLeft,
    status: 'Coming soon',
  },
  {
    title: 'Certificates',
    description: 'Kelola sertifikat dan gambar dari dashboard admin.',
    icon: Award,
    status: 'Coming soon',
  },
  {
    title: 'Home Page',
    description: 'Atur headline, intro, dan teks skill di halaman utama.',
    icon: Home,
    status: 'Coming soon',
  },
  {
    title: 'About Page',
    description: 'Kelola story, timeline, quick facts, dan fokus kerja.',
    icon: UserRound,
    status: 'Coming soon',
  },
];

const AdminDashboardPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className='mx-auto max-w-5xl'>
      <section className={`rounded-2xl border p-5 shadow-lg md:p-7 ${isDark ? 'border-gray-800 bg-gray-900/40' : 'border-white/30 bg-white/20'}`}>
        <div className='flex flex-col gap-5 md:flex-row md:items-start md:justify-between'>
          <div>
            <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${isDark ? 'bg-blue-400/10 text-blue-400' : 'bg-blue-500/10 text-blue-500'}`}>
              <LayoutDashboard size={24} />
            </div>
            <p className={`text-sm font-semibold uppercase tracking-[0.16em] ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>Admin Dashboard</p>
            <h1 className='mt-2 text-2xl font-bold md:text-3xl'>Pusat kontrol portofolio</h1>
            <p className={`mt-3 max-w-2xl text-sm leading-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Area ini menjadi fondasi untuk mengelola konten portfolio. Tahap pertama sudah menyiapkan proteksi route,
              shell admin, dan navigasi awal untuk modul yang akan dibuat bertahap.
            </p>
          </div>
        </div>
      </section>

      <section className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {adminModules.map((module) => {
          const Icon = module.icon;

          return (
            <article
              key={module.title}
              className={`rounded-xl border p-5 shadow-md transition ${
                isDark
                  ? 'border-gray-800 bg-gray-900/35 hover:border-gray-700 hover:bg-gray-900/55'
                  : 'border-white/30 bg-white/20 hover:border-blue-500/40 hover:bg-white/40'
              }`}
            >
              <div className='flex items-start justify-between gap-4'>
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${isDark ? 'bg-blue-400/10 text-blue-400' : 'bg-blue-500/10 text-blue-500'}`}>
                  <Icon size={21} />
                </div>
                <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${isDark ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-600'}`}>
                  {module.status}
                </span>
              </div>
              <h2 className='mt-5 text-lg font-bold'>{module.title}</h2>
              <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{module.description}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default AdminDashboardPage;
