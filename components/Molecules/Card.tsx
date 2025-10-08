import { useTheme } from 'next-themes';
import Image from 'next/image';

export const CardProject = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
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
  );
};
