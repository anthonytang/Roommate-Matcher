"use client";

import React, { useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/signin');
      }
    };
    
    checkSession();
  }, [router, supabase.auth]);

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard