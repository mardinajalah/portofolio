import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

export const CardProject = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [seeImage, setSeeImage] = useState(false);
  return (
    <>
      <div className='w-full sm:w-[350px] overflow-hidden rounded-lg shadow-md'>
        {/* Image */}
        <div className='w-full cursor-pointer'>
          <Image
            src='/assets/image-projects/dashboard-web-kasir.png'
            alt='dashboard web kasir'
            width={400}
            height={400}
            priority
            className='object-cover'
            onClick={() => setSeeImage(true)}
          />
        </div>

        {/* Content */}
        <div className={`p-4 border ${isDark ? 'bg-gray-800/20 border-gray-700/40' : 'bg-white/20 border-white/30'}`}>
          <h1 className='font-semibold text-xl mb-1 cursor-pointer'>Dashboard Web Kasir</h1>
          <p className='text-sm text-gray-400'>React TS, Tailwind CSS, Express JS, MySQL</p>
          <p className='text-sm text-gray-500 mt-1'>Web aplikasi kasir untuk usaha kecil dan menengah.</p>

          {/* Buttons */}
          <div className='flex flex-wrap gap-2 mt-3'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer'>Demo</button>
            <button className={`px-4 py-2 rounded-lg hover:bg-gray-600 transition cursor-pointer ${isDark ? 'bg-gray-700 text-white hover:bg-gray-800' :'bg-gray-500 text-white hover:bg-gray-600'}`}>Code</button>
          </div>
        </div>
      </div>

      {/* Modal Image */}
      {seeImage && (
        <div className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4'>
          <div className='relative p-10'>
            <X size={20} className='absolute top-4 right-4 font-bold cursor-pointer text-white' onClick={() => setSeeImage(false)} />
              <div className='relative'>
                <div>
                  <Image
                    src='/assets/image-projects/dashboard-web-kasir.png'
                    alt='dashboard web kasir'
                    width={850}
                    height={850}
                    className='object-contain max-h-[80vh] rounded-xl'
                  />
                </div>
                <div className='absolute inset-0 flex items-center justify-between px-4'>
                  <ChevronLeft size={30} className='absolute top-1/2 left-4 -translate-y-1/2 text-gray-700 cursor-pointer hover:scale-110 transition' />
                  <ChevronRight size={30} className='absolute top-1/2 right-4 -translate-y-1/2 text-gray-700 cursor-pointer hover:scale-110 transition' />
                </div>
              </div>
          </div>
        </div>
      )}
    </>
  );
};
