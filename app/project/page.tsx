'use client';

import React, { useEffect, useState } from 'react';
import { SkeletonProjectPage } from '@/components/Molecules/Skeleton';
import { CardProject } from '@/components/Molecules/Card';

const Project = () => {
  const [mounted, setMounted] = useState(false);
  const imageKasir: string[] = [];
  const imageSimpanPinjam: string[] = [];

  for (let i = 1; i <= 22; i++) {
    imageKasir.push(`/assets/image-projects/toko-kasir/kasir${i}.png`);
  }

  for (let i = 1; i <= 13; i++) {
    imageSimpanPinjam.push(`/assets/image-projects/simpan-pinjam/simpan${i}.png`);
  }

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <SkeletonProjectPage />;
  }

  return (
    <div className='w-full'>
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold capitalize'>Projects</h1>
        <p className='mt-2 text-sm md:text-base'>A collection of web applications and dashboard projects I have built.</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
        <CardProject
          handleOpenCode={() => window.open('https://github.com/mardinajalah/commit_frontend', '_blank')}
          images={imageKasir}
          title='Dashboard Web Kasir'
          techStack='React TS, DaisyUI, Tailwind CSS, Express JS, MySQL, Prisma'
          description='Web aplikasi kasir untuk usaha kecil dan menengah.'
        />
        <CardProject
          handleOpenCode={() => window.open('https://github.com/mardinajalah/commit_frontend', '_blank')}
          images={imageSimpanPinjam}
          title='Dashboard Simpan Pinjam'
          techStack='React TS, DaisyUI, Tailwind CSS, Express JS, MySQL, Prisma'
          description='Web aplikasi simpan pinjam dan memiliki aplikasi mobilenya juga untuk usaha kecil dan menengah.'
        />
      </div>
    </div>
  );
};

export default Project;
