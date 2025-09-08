'use client';

const HomePage = () => {
  return (
    <>
      <div
        className='
          w-full h-[200px] p-6 rounded-2xl flex items-center
          bg-white/20 dark:bg-gray-800/20
          backdrop-blur-xl
          border border-white/30 dark:border-gray-700/40
          shadow-lg
        '
      >
        <div className='w-max'>
          <h1 className='text-3xl font-bold capitalize drop-shadow-md'>Hi, Iam Mardin</h1>
          <p className='capitalize drop-shadow-sm'>I am a fullstack web developer</p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
