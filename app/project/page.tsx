'use client';

import React, { useEffect, useState } from 'react';
import { SkeletonProjectPage } from '@/components/Molecules/Skeleton';
import { CardProject } from '@/components/Molecules/Card';

const Project = () => {
  const [mounted, setMounted] = useState(false);
  const imageKasir: string[] = [];

  for (let i = 1; i <= 22; i++) {
    imageKasir.push(`/assets/image-projects/toko-kasir/kasir${i}.png`);
  }

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <SkeletonProjectPage />;
  }

  return (
    <div className='w-full flex flex-wrap items-center sm:justify-center lg:justify-start gap-10'>
      {/* Card Project */}
      <CardProject images={imageKasir} title='Dashboard Web Kasir' techStack='React TS, Tailwind CSS, Express JS, MySQL, Prisma' description='Web aplikasi kasir untuk usaha kecil dan menengah.' />
    </div>
  );
};

export default Project;
