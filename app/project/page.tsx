'use client';

import React, { useEffect, useState } from 'react';
import { SkeletonProjectPage } from '@/components/Molecules/Skeleton';
import { CardProject } from '@/components/Molecules/Card';

const Project = () => {

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <SkeletonProjectPage />;
  }

  return (
    <div className='w-full flex flex-wrap items-center sm:justify-center lg:justify-start gap-10'>
      {/* Card Project */}
      <CardProject />
    </div>
  );
};

export default Project;
