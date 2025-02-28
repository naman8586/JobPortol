import React from 'react';

function Header() {
  return (
    <div className='my-20 w-full max-w-7xl mx-auto flex flex-col gap-6 items-center justify-center text-center px-6 py-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl shadow-2xl transition-all duration-300 ease-in-out hover:shadow-yellow-500/50'>
      <h1 className='text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight text-white drop-shadow-xl tracking-wide'>
        Find Your Dream Job Today
      </h1>
      <p className='text-base sm:text-lg md:text-2xl max-w-3xl text-white font-medium drop-shadow-lg leading-relaxed'>
        Discover top job opportunities tailored to your skills and aspirations. Start your journey now!
      </p>
      <button className='mt-6 bg-white text-orange-600 hover:bg-orange-700 hover:text-white font-semibold py-4 px-12 sm:px-14 rounded-full shadow-xl transition-all transform hover:scale-105 hover:shadow-orange-600/50 focus:ring-4 focus:ring-orange-300'>
        Explore Jobs
      </button>
    </div>
  );
}

export default Header;
