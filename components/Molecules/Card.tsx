import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

export const CardProject = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [seeImage, setSeeImage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images: string[] = [];

  for (let i = 1; i <= 22; i++) {
    images.push(`/assets/image-projects/toko-kasir/kasir${i}.png`);
  }

  const modalRef = useRef<HTMLDivElement>(null);

  // Fungsi klik di luar gambar
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setSeeImage(false);
    }
  };

  // Navigasi gambar
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className='w-full sm:w-[350px] overflow-hidden rounded-lg shadow-md'>
        {/* Image */}
        <div className='w-full cursor-pointer'>
          <Image
            src='/assets/image-projects/toko-kasir/kasir2.png'
            alt='dashboard web kasir'
            width={400}
            height={400}
            priority
            className='object-cover'
            onClick={() => setSeeImage(true)}
          />
        </div>

        {/* Content */}
        <div
          className={`p-4 border ${
            isDark
              ? 'bg-gray-800/20 border-gray-700/40'
              : 'bg-white/20 border-white/30'
          }`}
        >
          <h1 className='font-semibold text-xl mb-1 cursor-pointer'>
            Dashboard Web Kasir
          </h1>
          <p className='text-sm text-gray-400'>
            React TS, Tailwind CSS, Express JS, MySQL
          </p>
          <p className='text-sm text-gray-500 mt-1'>
            Web aplikasi kasir untuk usaha kecil dan menengah.
          </p>

          {/* Buttons */}
          <div className='flex flex-wrap gap-2 mt-3'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer'>
              Demo
            </button>
            <button
              className={`px-4 py-2 rounded-lg hover:bg-gray-600 transition cursor-pointer ${
                isDark
                  ? 'bg-gray-700 text-white hover:bg-gray-800'
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              Code
            </button>
          </div>
        </div>
      </div>

      {/* Modal Image */}
      {seeImage && (
        <div
          className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4'
          onClick={handleOutsideClick}
        >
          <div ref={modalRef} className='relative p-10'>
            <X
              size={24}
              className='absolute top-4 right-4 font-bold cursor-pointer text-white hover:scale-110 transition'
              onClick={() => setSeeImage(false)}
            />
            <div className='relative flex items-center justify-center'>
              <Image
                src={images[currentIndex]}
                alt={`image ${currentIndex + 1}`}
                width={850}
                height={850}
                className='object-contain max-h-[80vh] rounded-xl transition-all duration-300'
              />

              {/* Tombol Navigasi */}
              <button
                onClick={handlePrev}
                className='absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer'
              >
                <ChevronLeft size={30} className='text-black' />
              </button>

              <button
                onClick={handleNext}
                className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
              >
                <ChevronRight size={30} className='text-black' />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
