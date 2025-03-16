import React from 'react'

const Hero = () => {
  return (
    <div className="bg-[#b71620] text-neutral-900 min-h-screen relative overflow-hidden">
      <div className='flex flex-row items-center'>
        <div className='w-1/2 flex flex-col'>

        </div>
        <div className='w-1/2 flex flex-col justify-center items-center min-h-screen pr-5'>
            <h1 className="text-4xl md:text-6xl text-center font-bold text-white mb-4 zilla-slab-bold"></h1>

            <p className='mt-8 text-xl text-neutral-200 zilla-slab-regular'></p>
        </div>
      </div>
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] aspect-[4/1] rounded-t-full bg-gradient-to-t from-[#fef490] via-yellow-500 to-orange-500"
        style={{
          transform: 'translateX(-50%)',
          opacity: 0.7,
          boxShadow: '0 0 40px 10px rgba(255, 204, 0, 0.5)',
          filter: 'drop-shadow(0 0 15px rgba(255, 165, 0, 0.6))'
        }}
      />
    </div>
  )
}

export default Hero