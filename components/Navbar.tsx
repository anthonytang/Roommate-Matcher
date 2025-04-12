import React from 'react'
import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-neutral-50 text-neutral-900 px-6 py-1 shadow-sm z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image 
            src="/logo.png" 
            alt="Owl Match Logo" 
            width={100} 
            height={100}
            className="object-contain"
          />
          <h1 className="font-bold text-3xl zilla-slab-bold">Owl Match</h1>
        </div>
        <div className = "flex items-center space-x-4">
          <SignedOut>
            <SignInButton>
              <button className = "bg-[#012168] text-white px-4 py-2 rounded-md hover:bg-[#01143e] transition-colors zilla-slab-medium">
                Login
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
