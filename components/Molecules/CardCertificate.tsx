'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import ProjectImageModal from '@/components/Molecules/ProjectImageModal';

interface CardCertificateProps {
  imageUrl: string;
  title: string;
  description: string;
}

export const CardCertificate: React.FC<CardCertificateProps> = ({ imageUrl, title, description }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [seeImage, setSeeImage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpenImage = () => {
    setCurrentIndex(0);
    setSeeImage(true);
  };

  return (
    <>
      <article
        className={`
          w-full overflow-hidden rounded-xl backdrop-blur-xl border shadow-md transition-all duration-300
          ${isDark ? 'bg-gray-800/20 border-gray-700/40 hover:border-blue-400/40' : 'bg-white/20 border-white/30 hover:border-blue-500/40'}
        `}
      >
        <button
          type='button'
          aria-label={`Buka sertifikat ${title}`}
          onClick={handleOpenImage}
          className='group relative w-full aspect-[4/3] overflow-hidden cursor-pointer bg-gray-300/20'
        >
          <Image
            src={imageUrl}
            alt={`Sertifikat ${title}`}
            width={800}
            height={600}
            priority
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors' />
          <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <div className='bg-black/60 text-white p-3 rounded-full'>
              <Maximize2 size={24} />
            </div>
          </div>
        </button>

        <div className='p-4'>
          <h1 className='font-semibold text-xl leading-7'>{title}</h1>
          <p className='text-sm mt-3 leading-6'>{description}</p>
        </div>
      </article>

      {seeImage && (
        <ProjectImageModal
          currentIndex={currentIndex}
          images={[imageUrl]}
          onClose={() => setSeeImage(false)}
          setCurrentIndex={setCurrentIndex}
          title={title}
        />
      )}
    </>
  );
};
