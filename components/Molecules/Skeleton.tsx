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

export const SkeletonGithubPage = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-full h-62.5 bg-gray-300 rounded-2xl animate-pulse' />
    </div>
  );
}

export const SkeletonProjectPage = () => {
  return (
    <div className='w-full flex flex-col items-start gap-10'>
      <div className='w-100 overflow-hidden rounded-lg animate-pulse'>
        <div className='h-50 bg-gray-300 w-full' />
        <div className='p-2 bg-gray-300/20 border border-gray-300/40'>
          <div className='h-6 bg-gray-300 rounded-full w-1/2 mt-2' />
          <div className='h-4 bg-gray-300 rounded-full w-full mt-2' />
          <div className='h-4 bg-gray-300 rounded-full w-full mt-2' />
          <div className='h-4 bg-gray-300 rounded-full w-full mt-2' />
          <div className='flex gap-2 mt-4'>
            <div className='h-8 bg-gray-300 rounded-lg w-20' />
            <div className='h-8 bg-gray-300 rounded-lg w-20' />
          </div>
        </div>
      </div>
    </div>
  );
}
