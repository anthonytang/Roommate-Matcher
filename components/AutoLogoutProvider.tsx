"use client";

import useInactivityTimeout from '@/components/useInactivityTimeout';

const AutoLogoutProvider = () => {
  useInactivityTimeout();
  return null;
};

export default AutoLogoutProvider;
