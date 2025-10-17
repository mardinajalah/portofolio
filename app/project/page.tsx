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
    <div className='w-full flex flex-wrap items-center sm:justify-center lg:justify-start gap-10'>
      {/* Card Project */}
      <CardProject images={imageKasir} title='Dashboard Web Kasir' techStack='React TS, DaisyUI, Tailwind CSS, Express JS, MySQL, Prisma' description='Web aplikasi kasir untuk usaha kecil dan menengah.' />
      <CardProject images={imageSimpanPinjam} title='Dashboard Simpan Pinjam' techStack='React TS, DaisyUI, Tailwind CSS, Express JS, MySQL, Prisma' description='Web aplikasi simpan pinjam dan memiliki aplikasi mobilenya juga untuk usaha kecil dan menengah' />
    </div>
  );
};

export default Project;
