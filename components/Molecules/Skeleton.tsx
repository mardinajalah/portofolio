import React from 'react';

export const SkeletonSidebar = () => {
  return (
    <div className='w-[250px] h-full p-4 bg-gray-300 rounded-lg animate-pulse'>
      <div className='rounded-full bg-gray-400 w-[100px] h-[100px] mx-auto mb-4' />
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
      <div className='w-full h-[250px] bg-gray-300 rounded-2xl animate-pulse mb-5' />
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

export const SkeletonGithubPage = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-full h-[250px] bg-gray-300 rounded-2xl animate-pulse' />
    </div>
  );
}

export const SkeletonProjectPage = () => {
  return (
    <div className='w-full flex flex-col items-start gap-10'>
      <div className='w-[400px] overflow-hidden rounded-lg animate-pulse'>
        <div className='h-[200px] bg-gray-300 w-full' />
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
