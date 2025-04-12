"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User, LogOut, ChevronLeft, ChevronRight, CircleHelp, BrainCircuit } from 'lucide-react';
import Account from '@/components/Account';
import Questions from '@/components/Questions';
import Matches from '@/components/Matches';
import { useUser, useClerk, RedirectToSignIn } from '@clerk/nextjs';

const Dashboard = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  const clerk = useClerk();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('account');

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleLogout = async () => {
    try {
      await clerk.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return <Account />;
      case 'questions':
        return <Questions />;
      case 'matches':
        return <Matches />;
      default:
        return <Account />;
    }
  };

  return (
    <div className="h-screen bg-neutral-50">
      {/* Fixed Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[#012168] text-white transition-all duration-300 flex flex-col ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo and toggle */}
        <div className="p-4 flex items-center justify-between border-b border-white/20">
          {isSidebarOpen && (
            <div className="flex items-center space-x-2">
              <Image
                src="/logo-white.png"
                alt="Owl Match Logo"
                width={60}
                height={60}
                className="object-contain"
              />
              <h1 className="font-bold text-xl zilla-slab-bold">Owl Match</h1>
            </div>
          )}
          <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-white/10">
            {isSidebarOpen ? (
              <ChevronLeft className="h-6 w-6" />
            ) : (
              <ChevronRight className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 pt-6">
          <ul className="space-y-2 px-2">
            <li>
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === 'account' ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                <User className="h-6 w-6" />
                {isSidebarOpen && <span className="ml-3 zilla-slab-medium">Account</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('questions')}
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === 'questions' ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                <CircleHelp className="h-6 w-6" />
                {isSidebarOpen && <span className="ml-3 zilla-slab-medium">Questions</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('matches')}
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === 'matches' ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                <BrainCircuit className="h-6 w-6" />
                {isSidebarOpen && <span className="ml-3 zilla-slab-medium">Matches</span>}
              </button>
            </li>
          </ul>
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 rounded-md hover:bg-white/10 transition-colors"
          >
            <LogOut className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-3 zilla-slab-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main content with left margin equal to sidebar width */}
      <div className={`${isSidebarOpen ? 'ml-64' : 'ml-20'} h-screen overflow-auto`}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
