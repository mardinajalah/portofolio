'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ProjectImageModalProps {
  currentIndex: number;
  images: string[];
  onClose: () => void;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  title: string;
}

const ProjectImageModal = ({ currentIndex, images, onClose, setCurrentIndex, title }: ProjectImageModalProps) => {
  const t = useTranslations('Common');
  const hasMultipleImages = images.length > 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'ArrowLeft' && hasMultipleImages) {
        handlePrev();
      }

      if (event.key === 'ArrowRight' && hasMultipleImages) {
        handleNext();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasMultipleImages, onClose]);

  return (
    <div
      className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 sm:p-5'
      onClick={onClose}
    >
      <div
        className='w-full max-w-6xl max-h-[95vh] rounded-xl overflow-hidden bg-gray-950/95 border border-white/10 shadow-2xl flex flex-col'
        onClick={(event) => event.stopPropagation()}
      >
        <div className='flex items-center justify-between gap-4 px-4 py-3 border-b border-white/10'>
          <div className='min-w-0'>
            <h2 className='font-semibold text-white truncate'>{title}</h2>
            <p className='text-sm text-gray-400'>
              {currentIndex + 1} / {images.length}
            </p>
          </div>

          <button
            type='button'
            aria-label={t('closePreview')}
            onClick={onClose}
            className='w-9 h-9 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/20 transition cursor-pointer'
          >
            <X size={20} />
          </button>
        </div>

        <div className='relative flex-1 min-h-0 flex items-center justify-center p-3 sm:p-5'>
          <Image
            src={images[currentIndex]}
            alt={`${title} screenshot ${currentIndex + 1}`}
            width={1400}
            height={900}
            className='w-full h-auto max-h-[62vh] object-contain rounded-lg'
            priority
          />

          {hasMultipleImages && (
            <>
              <button
                type='button'
                aria-label={t('previousImage')}
                onClick={handlePrev}
                className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white bg-black/50 hover:bg-black/70 transition cursor-pointer'
              >
                <ChevronLeft size={26} />
              </button>

              <button
                type='button'
                aria-label={t('nextImage')}
                onClick={handleNext}
                className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white bg-black/50 hover:bg-black/70 transition cursor-pointer'
              >
                <ChevronRight size={26} />
              </button>
            </>
          )}
        </div>

        {hasMultipleImages && (
          <div className='px-4 pb-4 overflow-x-auto'>
            <div className='flex gap-3 min-w-max justify-center items-center'>
              {images.map((image, index) => (
                <button
                  key={image}
                  type='button'
                  aria-label={t('openScreenshot', { title, index: index + 1 })}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition cursor-pointer ${index === currentIndex ? 'border-blue-500' : 'border-white/10 opacity-70 hover:opacity-100'}`}
                >
                  <Image
                    src={image}
                    alt={`${title} thumbnail ${index + 1}`}
                    width={120}
                    height={80}
                    className='w-full h-full object-cover'
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectImageModal;
