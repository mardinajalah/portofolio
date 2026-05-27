'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState } from 'react';
import { Code2, ExternalLink, Images } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ProjectImageModal from '@/components/Molecules/ProjectImageModal';

interface CardProjectProps {
  images: string[];
  title: string;
  techStack: string;
  description: string;
  handleOpenCode?: () => void;
}

export const CardProject: React.FC<CardProjectProps> = ({ images, title, techStack, description, handleOpenCode }) => {
  const t = useTranslations('Common');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [seeImage, setSeeImage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const coverImage = images[0];

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
          aria-label={t('openScreenshots', { title })}
          onClick={handleOpenImage}
          className='group relative w-full aspect-[16/10] overflow-hidden cursor-pointer bg-gray-300/20'
        >
          <Image
            src={coverImage}
            alt={`${title} cover`}
            width={800}
            height={500}
            priority
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors' />
          <div className='absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/60 text-white px-3 py-1 text-xs font-semibold'>
            <Images size={14} />
            {images.length} {t('screenshots')}
          </div>
        </button>

        <div className='p-4'>
          <h1 className='font-semibold text-xl leading-7'>{title}</h1>
          <p className='text-sm text-blue-500 mt-2'>{techStack}</p>
          <p className='text-sm mt-3 leading-6'>{description}</p>

          <div className='flex flex-wrap gap-2 mt-5'>
            <button
              type='button'
              className='inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer'
            >
              <ExternalLink size={16} />
              {t('demo')}
            </button>
            <button
              type='button'
              onClick={handleOpenCode}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition cursor-pointer ${isDark ? 'bg-gray-700 text-white hover:bg-gray-800' : 'bg-gray-500 text-white hover:bg-gray-600'}`}
            >
              <Code2 size={16} />
              {t('code')}
            </button>
          </div>
        </div>
      </article>

      {seeImage && (
        <ProjectImageModal
          currentIndex={currentIndex}
          images={images}
          onClose={() => setSeeImage(false)}
          setCurrentIndex={setCurrentIndex}
          title={title}
        />
      )}
    </>
  );
};
