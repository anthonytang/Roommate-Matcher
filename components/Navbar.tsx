import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className="bg-neutral-50 text-neutral-900 px-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image 
            src="/catan-logo.svg" 
            alt="Catan Tracker Logo" 
            width={40} 
            height={40}
            className="object-contain"
          />
          <h1 className="font-bold text-3xl zilla-slab-bold">Catan Tracker</h1>
        </div>
        <button className="bg-[#b71620] text-white px-4 py-2 rounded-md hover:bg-[#a01319] transition-colors zilla-slab-medium">
          Login
        </button>
      </div>
    </nav>
  )
}

export default Navbar