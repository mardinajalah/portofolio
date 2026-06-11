'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SkeletonProjectPage } from '@/components/Molecules/Skeleton';
import { CardProject } from '@/components/Molecules/Card';

interface ProjectCopy {
  title: string;
  description: string;
}

const Project = () => {
  const t = useTranslations('ProjectPage');
  const [mounted, setMounted] = useState(false);
  const imageKasir: string[] = [];
  const imageSimpanPinjam: string[] = [];
  const imageCatatanKeuangan: string[] = [];
  const projects = t.raw('items') as ProjectCopy[];

  for (let i = 1; i <= 22; i++) {
    imageKasir.push(`/assets/image-projects/toko-kasir/kasir${i}.png`);
  }

  for (let i = 1; i <= 13; i++) {
    imageSimpanPinjam.push(`/assets/image-projects/simpan-pinjam/simpan${i}.png`);
  }

  for (let i = 1; i <= 7; i++) {
    imageCatatanKeuangan.push(`/assets/image-projects/catatan-keuangan/catkeu${i}.png`);
  }

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <SkeletonProjectPage />;
  }

  return (
    <div className='w-full'>
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold capitalize'>{t('title')}</h1>
        <p className='mt-2 text-sm md:text-base'>{t('subtitle')}</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
        <CardProject
          handleOpenCode={() => window.open('https://github.com/mardinajalah/commit_frontend', '_blank')}
          images={imageKasir}
          title={projects[0].title}
          techStack='React TS, DaisyUI, Tailwind CSS, Express JS, MySQL, Prisma'
          description={projects[0].description}
        />
        <CardProject
          handleOpenCode={() => window.open('https://github.com/mardinajalah/commit_frontend', '_blank')}
          images={imageSimpanPinjam}
          title={projects[1].title}
          techStack='React TS, DaisyUI, Tailwind CSS, Express JS, MySQL, Prisma'
          description={projects[1].description}
        />
        <CardProject
          handleOpenCode={() => window.open('https://github.com/mardinajalah/catatan-keuangan', '_blank')}
          images={imageCatatanKeuangan}
          title={projects[2].title}
          techStack='React Native TS, expo router, Tailwind CSS, Express TS, Firebase'
          description={projects[2].description}
        />
      </div>
    </div>
  );
};

export default Project;
