'use client';

import React, { useEffect, useState } from 'react';
import { SkeletonCertificatePage } from '@/components/Molecules/Skeleton';
import { CardCertificate } from '@/components/Molecules/CardCertificate';

const Certificate = () => {
  const [mounted, setMounted] = useState(false);

  const certificates = [
    {
      imageUrl: '/assets/image-projects/certificate/Sertifikat_TOEP_page-0001.jpg',
      title: 'Sertifikat TOEP',
      description: 'Sertifikat Test of English Proficiency (TOEP).',
    },
    {
      imageUrl: '/assets/image-projects/certificate/BTQ - MARDIN_page-0001.jpg',
      title: 'Sertifikat BTQ',
      description: 'Sertifikat kelulusan Baca Tulis Al-Quran (BTQ).',
    },
    {
      imageUrl: '/assets/image-projects/certificate/FA - MARDIN_page-0001.jpg',
      title: 'Sertifikat FA',
      description: 'Sertifikat pencapaian FA.',
    },
    {
      imageUrl: '/assets/image-projects/certificate/SERTIFIKAT OSPEKTREN 2022_page-0001.jpg',
      title: 'Sertifikat OSPEKTREN 2022',
      description: 'Sertifikat kepesertaan OSPEKTREN pada tahun 2022.',
    },
  ];

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <SkeletonCertificatePage />;
  }

  return (
    <div className='w-full'>
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold capitalize'>Certificates</h1>
        <p className='mt-2 text-sm md:text-base'>A collection of certificates I have earned.</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
        {certificates.map((cert, index) => (
          <CardCertificate
            key={index}
            imageUrl={cert.imageUrl}
            title={cert.title}
            description={cert.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Certificate;