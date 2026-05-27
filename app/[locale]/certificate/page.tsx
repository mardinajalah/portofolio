'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SkeletonCertificatePage } from '@/components/Molecules/Skeleton';
import { CardCertificate } from '@/components/Molecules/CardCertificate';

interface CertificateCopy {
  title: string;
  description: string;
}

const Certificate = () => {
  const t = useTranslations('CertificatePage');
  const [mounted, setMounted] = useState(false);

  const certificateImages = [
    '/assets/image-projects/certificate/Sertifikat_TOEP_page-0001.jpg',
    '/assets/image-projects/certificate/BTQ - MARDIN_page-0001.jpg',
    '/assets/image-projects/certificate/FA - MARDIN_page-0001.jpg',
    '/assets/image-projects/certificate/SERTIFIKAT OSPEKTREN 2022_page-0001.jpg',
  ];
  const certificates = t.raw('items') as CertificateCopy[];

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <SkeletonCertificatePage />;
  }

  return (
    <div className='w-full'>
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold capitalize'>{t('title')}</h1>
        <p className='mt-2 text-sm md:text-base'>{t('subtitle')}</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
        {certificates.map((cert, index) => (
          <CardCertificate
            key={cert.title}
            imageUrl={certificateImages[index]}
            title={cert.title}
            description={cert.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Certificate;
