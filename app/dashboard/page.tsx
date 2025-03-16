"use client";

import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BarChart3, BookOpen, Users, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import Leaderboard from '@/components/Leaderboard';
import Games from '@/components/games';
import Compare from '@/components/Compare';
const Dashboard = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('games');

  const handleLogout = async () => {
    router.replace('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'leaderboard':
        //return <Leaderboard />;
      case 'games':
        //return <Games />;
      case 'compare':
        //return <Compare />;
      default:
        return <div className="p-6"><h2 className="text-2xl font-bold mb-4">Games</h2><p>Games history will appear here</p></div>;
    }
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <div className={`bg-[#b71620] text-white transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        {/* Logo and toggle */}
        <div className="p-4 flex items-center justify-between border-b border-white/20">
          {isSidebarOpen && (
            <div className="flex items-center space-x-2">
              <Image 
                src="/catantrackerlogo.png" 
                alt="Catan Tracker Logo" 
                width={40} 
                height={40}
                className="object-contain"
              />
              <h1 className="font-bold text-xl zilla-slab-bold">Catan Tracker</h1>
            </div>
          )}
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-white/10"
          >
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
                onClick={() => setActiveTab('games')}
                className={`w-full flex items-center p-3 rounded-md transition-colors ${activeTab === 'games' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                <BookOpen className="h-6 w-6" />
                {isSidebarOpen && <span className="ml-3 zilla-slab-medium">Games</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('leaderboard')}
                className={`w-full flex items-center p-3 rounded-md transition-colors ${activeTab === 'leaderboard' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                <BarChart3 className="h-6 w-6" />
                {isSidebarOpen && <span className="ml-3 zilla-slab-medium">Leaderboard</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('compare')}
                className={`w-full flex items-center p-3 rounded-md transition-colors ${activeTab === 'compare' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                <Users className="h-6 w-6" />
                {isSidebarOpen && <span className="ml-3 zilla-slab-medium">Compare</span>}
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
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;