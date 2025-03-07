"use client";

import React from 'react';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="flex h-screen">
      {/* Left half - White with sign in */}
      <div className="w-2/5 bg-white flex items-center justify-center">
        <div className="max-w-md w-full px-8">
          <div className="flex items-center justify-center mb-8">
            <Image 
              src="/catan-logo.svg" 
              alt="Catan Tracker Logo" 
              width={50} 
              height={50}
              className="object-contain"
            />
            <h1 className="font-bold text-3xl ml-3 zilla-slab-bold">Catan Tracker</h1>
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center zilla-slab-bold">Sign in to your account</h2>
          <button 
            onClick={handleSignInWithGoogle}
            className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Image 
              src="/google_svg.png" 
              alt="Google logo" 
              width={20} 
              height={20} 
              className="mr-2"
            />
            Sign in with Google
          </button>
        </div>
      </div>
      
      {/* Right half - Red with dashboard preview */}
      <div className="w-3/5 bg-[#b71620] flex items-center justify-center p-8">
        <div className="max-w-lg w-full">
          <h2 className="text-3xl font-bold text-white mb-6 text-center zilla-slab-bold">Track your Catan games</h2>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-lg">
            <Image 
              src="/app-preview.png" 
              alt="Dashboard Preview" 
              width={600} 
              height={400}
              className="rounded-md w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;