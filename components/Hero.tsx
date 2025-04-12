import React from 'react'

const Hero = () => {
  return (
    <div className="bg-[#012168] min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl md:text-6xl text-center font-bold text-white mb-4 zilla-slab-bold">
      Your Perfect Roommate Awaits
      </h1>
      <div className="w-215 h-1 bg-gray-500 mb-4"></div>
      <p className="mt-8 text-xl text-neutral-200 zilla-slab-regular">
        Let's face it. Finding a roommate can be hard.
      </p>
      <p className="text-xl text-neutral-200 zilla-slab-regular">
        That's where Owl Match comes in.
      </p>
      <p className="text-xl text-neutral-200 zilla-slab-regular">
        Use our cutting edge similarity algorithms to find your perfect roommate today.
      </p>
    </div>
  )
}

export default Hero



