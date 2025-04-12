"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs'; // Replace with your logout function if different

const useInactivityTimeout = (timeout = 20 * 60 * 1000) => {
    const clerk = useClerk();
    const router = useRouter();

    const handleLogout = async () => {
        try {
          await clerk.signOut();
          router.push('/');
        } catch (error) {
          console.error('Error signing out:', error);
        }
    };

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimer = () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        console.log("Timer reset");
        timerRef.current = setTimeout(() => {
          console.log("Inactivity timeout reached, logging out...");
          handleLogout();
        }, timeout);
      };

    useEffect(() => {
        // List of events to detect user activity
        const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];

        // Add event listeners to reset timer on any activity
        events.forEach((event) => window.addEventListener(event, resetTimer));

        // Start the timer initially
        resetTimer();

        // Clean up event listeners and timer on unmount
        return () => {
            events.forEach((event) => window.removeEventListener(event, resetTimer));
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [timeout]);
};

export default useInactivityTimeout;
