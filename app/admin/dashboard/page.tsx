'use client';

import { Award, ContactRound, Home, LayoutDashboard, PanelsTopLeft, UserRound } from 'lucide-react';

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

  return (
    <div className='mx-auto max-w-5xl'>
      <section className='rounded-2xl border border-gray-800 bg-gray-900/40 p-5 shadow-lg md:p-7'>
        <div className='flex flex-col gap-5 md:flex-row md:items-start md:justify-between'>
          <div>
            <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300'>
              <LayoutDashboard size={24} />
            </div>
            <p className='text-sm font-semibold uppercase tracking-[0.16em] text-blue-300'>Admin Dashboard</p>
            <h1 className='mt-2 text-2xl font-bold md:text-3xl'>Pusat kontrol portofolio</h1>
            <p className='mt-3 max-w-2xl text-sm leading-6 text-gray-400'>
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
              className='rounded-xl border border-gray-800 bg-gray-900/35 p-5 shadow-md transition hover:border-gray-700 hover:bg-gray-900/55'
            >
              <div className='flex items-start justify-between gap-4'>
                <div className='flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300'>
                  <Icon size={21} />
                </div>
                <span className='rounded-full border border-gray-700 px-2.5 py-1 text-[11px] font-semibold text-gray-400'>
                  {module.status}
                </span>
              </div>
              <h2 className='mt-5 text-lg font-bold'>{module.title}</h2>
              <p className='mt-2 text-sm leading-6 text-gray-400'>{module.description}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default AdminDashboardPage;
