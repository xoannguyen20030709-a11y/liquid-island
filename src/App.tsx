import React, { useEffect, useState } from 'react';
import { IslandProvider } from './IslandContext';
import LiquidIsland from './components/LiquidIsland';
import Dashboard from './components/Dashboard';

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <IslandProvider>
      <div className="min-h-screen relative flex flex-col font-sans selection:bg-purple-500/30 overflow-hidden bg-[#020203] text-white w-full border-[10px] border-[#020203]/0">
        
        {/* Presentation Background: Titanium Galaxy Vibe */}
        <div className="fixed inset-0 z-0 bg-[#020203]" />
        
        {/* Animated Nebulas */}
        <div className="fixed top-[-15%] left-[-10%] w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-purple-900/10 to-transparent rounded-full blur-[100px] mix-blend-screen pointer-events-none animate-pulse-slow" />
        <div className="fixed bottom-[-15%] right-[-10%] w-[900px] h-[900px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/30 via-pink-900/10 to-transparent rounded-full blur-[100px] mix-blend-screen pointer-events-none animate-pulse-slow [animation-delay:2s]" />
        
        {/* Deep Space Starfield Overlay */}
        <div className="fixed inset-0 bg-[url('https://transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none z-0" />
        
        {/* Premium Device Inner Shadow / Bezel Simulate */}
        <div className="fixed inset-0 pointer-events-none z-50 rounded-[44px] sm:rounded-[56px] shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] border-[1px] border-white/5" />

        {/* Status Bar Mock (Full Width Adaptive) */}
        <div className="w-full h-14 flex justify-between items-center px-8 sm:px-12 z-40 pointer-events-none relative pt-2">
           <span className="text-[16px] font-semibold tracking-tight text-white/90 pl-1 drop-shadow-md">
               {currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
           </span>
           <div className="flex items-center gap-2 pr-1 opacity-90 drop-shadow-md">
               <div className="w-4 h-3.5 flex gap-0.5 items-end justify-center">
                   <div className="w-[3px] h-1.5 bg-white rounded-sm" />
                   <div className="w-[3px] h-2 bg-white rounded-sm" />
                   <div className="w-[3px] h-2.5 bg-white rounded-sm" />
                   <div className="w-[3px] h-3 bg-white rounded-sm" />
               </div>
               <div className="w-5 h-4 flex items-center justify-center">
                   <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-2c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                   </svg>
               </div>
               <div className="w-[26px] h-[13px] border-[1.5px] border-white/80 rounded-[4px] p-[1px] relative flex items-center">
                   <div className="w-[80%] h-[8px] bg-white rounded-[1.5px] ml-[1px]" />
                   <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-[5px] bg-white/80 rounded-r-sm" />
               </div>
           </div>
        </div>

        {/* Liquid Island Component */}
        <LiquidIsland />

        {/* Main App Content Area */}
        <div className="flex-1 overflow-y-auto flex flex-col z-10 w-full relative custom-scrollbar mt-12 sm:mt-16">
           <Dashboard />
        </div>

      </div>
    </IslandProvider>
  );
}
