import React from 'react';

export const SkeletonSidebar = () => {
  return (
    <div className='w-62.5 h-full p-4 bg-gray-300 rounded-lg animate-pulse'>
      <div className='rounded-full bg-gray-400 w-25 h-25 mx-auto mb-4' />
      <div className='h-4 bg-gray-400 rounded-full w-3/4 mx-auto mb-2' />
      <div className='h-4 bg-gray-400 rounded-full w-1/2 mx-auto mb-6' />
      <div className='space-y-3'>
        {[...Array(6)].map((_, index) => (
          <div key={index} className='h-4 bg-gray-400 rounded-full w-full' />
        ))}
      </div>
    </div>
  );
};

export const SkeletonHomePage = () => {
  return (
    <div>
      <div className='w-full h-62.5 bg-gray-300 rounded-2xl animate-pulse mb-5' />
      <div className='h-4 bg-gray-300 rounded-full w-full mt-2 animate-pulse' />
      <div className='h-4 bg-gray-300 rounded-full w-full mt-2 animate-pulse' />
      <div className='h-4 bg-gray-300 rounded-full w-full mt-2 animate-pulse' />
      <div className='h-4 bg-gray-300 rounded-full w-full mt-2 animate-pulse' />
      <div className='h-6 bg-gray-300 rounded-full w-1/3 mt-10 animate-pulse' />
      <div className='h-32 bg-gray-300 rounded-xl w-full mt-6 animate-pulse' />
      <div className='h-6 bg-gray-300 rounded-full w-1/3 mt-10 animate-pulse' />
      <div className='h-32 bg-gray-300 rounded-xl w-full mt-6 animate-pulse' />
    </div>
  );
};

export const SkeletonAboutPage = () => {
  return (
    <div>
      <div className='w-full h-60 bg-gray-300 rounded-2xl animate-pulse mb-8' />
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-10'>
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className='h-24 bg-gray-300 rounded-xl animate-pulse'
          />
        ))}
      </div>
      <div className='h-6 bg-gray-300 rounded-full w-1/3 animate-pulse' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-5'>
        <div className='h-56 bg-gray-300 rounded-xl animate-pulse' />
        <div className='h-56 bg-gray-300 rounded-xl animate-pulse' />
      </div>
    </div>
  );
};

export const SkeletonContactPage = () => {
  return (
    <div>
      <div className='w-full h-55 bg-gray-300 rounded-2xl animate-pulse mb-8' />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='space-y-4'>
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className='h-24 bg-gray-300 rounded-xl animate-pulse'
            />
          ))}
        </div>
        <div className='lg:col-span-2 h-115 bg-gray-300 rounded-xl animate-pulse' />
      </div>
    </div>
  );
};

export const SkeletonGithubPage = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-full h-62.5 bg-gray-300 rounded-2xl animate-pulse' />
    </div>
  );
}

export const SkeletonProjectPage = () => {
  return (
    <div className='w-full'>
      <div className='mb-8'>
        <div className='h-8 bg-gray-300 rounded-full w-40 animate-pulse' />
        <div className='h-4 bg-gray-300 rounded-full w-full max-w-md mt-3 animate-pulse' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className='overflow-hidden rounded-xl border border-gray-300/40 animate-pulse'
          >
            <div className='aspect-16/10 bg-gray-300 w-full' />
            <div className='p-4 bg-gray-300/20'>
              <div className='h-6 bg-gray-300 rounded-full w-2/3' />
              <div className='h-4 bg-gray-300 rounded-full w-full mt-4' />
              <div className='h-4 bg-gray-300 rounded-full w-5/6 mt-2' />
              <div className='flex gap-2 mt-5'>
                <div className='h-9 bg-gray-300 rounded-lg w-24' />
                <div className='h-9 bg-gray-300 rounded-lg w-24' />
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
  );
}

export const SkeletonCertificatePage = () => {
  return (
    <div className='w-full'>
      <div className='mb-8'>
        <div className='h-8 bg-gray-300 rounded-full w-48 animate-pulse' />
        <div className='h-4 bg-gray-300 rounded-full w-full max-w-md mt-3 animate-pulse' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className='overflow-hidden rounded-xl border border-gray-300/40 animate-pulse'
          >
            <div className='aspect-4/3 bg-gray-300 w-full' />
            <div className='p-4 bg-gray-300/20'>
              <div className='h-6 bg-gray-300 rounded-full w-3/4' />
              <div className='h-4 bg-gray-300 rounded-full w-full mt-3' />
              <div className='h-4 bg-gray-300 rounded-full w-5/6 mt-2' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

type SkeletonAdminDataTableProps = {
  isDark?: boolean;
  rows?: number;
};

export const SkeletonAdminDataTable = ({ isDark = true, rows = 5 }: SkeletonAdminDataTableProps) => {
  const blockClassName = isDark ? 'bg-gray-800' : 'bg-gray-300';
  const softBlockClassName = isDark ? 'bg-gray-900/70' : 'bg-white/40';

  return (
    <div className={`rounded-2xl border p-5 shadow-lg md:p-7 ${isDark ? 'border-gray-800 bg-gray-900/40' : 'border-white/30 bg-white/20'}`}>
      <div className='flex items-center justify-between gap-3 px-4 py-3'>
        <div>
          <div className={`h-7 w-56 rounded-full ${blockClassName} animate-pulse`} />
          <div className={`mt-3 h-4 w-32 rounded-full ${blockClassName} animate-pulse`} />
        </div>
        <div className={`h-12 w-28 rounded-lg ${blockClassName} animate-pulse`} />
      </div>

      <div className='mt-4 overflow-hidden rounded-xl'>
        <div className={`grid grid-cols-7 gap-4 px-4 py-4 ${softBlockClassName}`}>
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className={`h-4 rounded-full ${blockClassName} animate-pulse`}
            />
          ))}
        </div>

        <div className={isDark ? 'divide-y divide-gray-800/80' : 'divide-y divide-gray-300/80'}>
          {[...Array(rows)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid grid-cols-7 gap-4 px-4 py-5 ${rowIndex % 2 === 0 ? (isDark ? 'bg-black/10' : 'bg-white/20') : ''}`}
            >
              {[...Array(7)].map((_, columnIndex) => (
                <div
                  key={columnIndex}
                  className={`h-5 rounded-full ${blockClassName} animate-pulse ${columnIndex === 0 ? 'w-10' : 'w-full'}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
