import React from 'react';

export const SkeletonSidebar = () => {
  return (
    <div className='w-[250px] mx-2 h-full animate-pulse mt-6'>
      <div className='rounded-full bg-gray-300 w-[150px] h-[150px] mx-auto mb-6' />
      <div className='space-y-4'>
        <div className='h-10 bg-gray-300 rounded-full w-24 mx-auto' />
        <div className='h-8 bg-gray-300 rounded-full w-full' />
        <div className='h-8 bg-gray-300 rounded-full w-full' />
        <div className='h-8 bg-gray-300 rounded-full w-full' />
        <div className='h-8 bg-gray-300 rounded-full w-full' />
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
