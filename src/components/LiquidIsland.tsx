import { motion, AnimatePresence } from "motion/react";
import { useIsland } from "../IslandContext";
import { Phone, Timer, Music, CloudRain, ListTodo, Sparkles, Wand2, Pause, Play, SkipForward, SkipBack, X, Mic } from "lucide-react";
import { cn } from "../lib/utils";
import React, { useState, useEffect } from "react";

export default function LiquidIsland() {
  const { state, setState, activeApp, timerSeconds, isTimerRunning, setIsTimerRunning, aiThinking, setAiThinking, aiQuery, aiResponse, setAiResponse, aiLevel, setActiveApp } = useIsland();

  // Animation values based on state
  const islandVariants = {
    idle: { width: 140, height: 42, borderRadius: 24, padding: 0.5 },
    compact: { width: 280, height: 42, borderRadius: 24, padding: 4 },
    expanded: { width: 400, height: 230, borderRadius: 48, padding: 8 } // iOS style deep curves
  };

  if (activeApp === 'ai_sirig' && state === 'expanded') {
      islandVariants.expanded.height = 380; // AI needs more room
      islandVariants.expanded.width = 460;
  } else if (activeApp === 'call' && state === 'expanded') {
      islandVariants.expanded.height = 120;
  } else if (activeApp === 'timer' && state === 'expanded') {
      islandVariants.expanded.height = 200;
  } else if (activeApp === 'weather' && state === 'expanded') {
      islandVariants.expanded.height = 220;
  }

  // Format Timer
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const toggleExpand = () => {
    if (state === 'idle') return;
    setState(state === 'expanded' ? 'compact' : 'expanded');
  };

  const closeApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveApp('none');
    setState('idle');
  }

  return (
    <div className="absolute top-2 sm:top-6 left-1/2 -translate-x-1/2 z-50 flex justify-center items-start pt-2 cursor-pointer group" onClick={toggleExpand}>
        {/* Dynamic AI Glow */}
        {activeApp === 'ai_sirig' && aiThinking && (
            <motion.div 
               layout
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[44px] blur-[30px] opacity-60 mix-blend-screen pointer-events-none z-[-1]"
            />
        )}
      <motion.div
        layout
        variants={islandVariants}
        initial="idle"
        animate={state}
        transition={{ type: "spring", stiffness: 450, damping: 36, mass: 0.9, bounce: 0.2 }}
        className="bg-black origin-top overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center text-white ring-1 ring-white/10 backdrop-blur-3xl"
        style={{ originY: 0 }}
      >
        {/* Hardware Camera Cutout Simulator (always there faintly in background if we wanted, but not needed on pure black) */}
        {/* <div className="absolute w-[10px] h-[10px] rounded-full bg-[#111] right-[28px] top-[16px] shadow-inner" /> */}

        <AnimatePresence mode="wait">
          {/* ---------------------------------
              IDLE MODE
              --------------------------------- */}
          {state === 'idle' && (
            <motion.div
              layoutId="island-content"
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-full flex justify-end items-center px-6"
            >
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse relative">
                   <div className="absolute inset-0 bg-emerald-500 blur-[2px]" />
               </div>
            </motion.div>
          )}

          {/* ---------------------------------
              COMPACT MODE
              --------------------------------- */}
          {state === 'compact' && activeApp === 'music' && (
            <CompactView leftIcon={<Music className="w-4 h-4 text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" />} rightText={<div className="flex gap-0.5 items-center justify-center h-4"><span className="w-1 h-2/3 bg-pink-500 rounded-full animate-bounce [animation-duration:800ms]"></span><span className="w-1 h-full bg-pink-500 rounded-full animate-bounce [animation-duration:1100ms] delay-75"></span><span className="w-1 h-1/2 bg-pink-500 rounded-full animate-bounce [animation-duration:900ms] delay-150"></span></div>} />
          )}
          {state === 'compact' && activeApp === 'timer' && (
            <CompactView leftIcon={<Timer className="w-4 h-4 text-orange-500 animate-spin-slow drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />} rightText={<span className="text-orange-500 font-mono text-[15px] font-medium tracking-tighter drop-shadow-sm">{formatTime(timerSeconds)}</span>} />
          )}
          {state === 'compact' && activeApp === 'call' && (
            <CompactView leftIcon={<Phone className="w-4 h-4 text-green-500 animate-pulse drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />} rightText={<span className="text-green-500 font-medium text-[15px] tracking-tighter drop-shadow-sm">00:12</span>} />
          )}
          {state === 'compact' && activeApp === 'ai_sirig' && (
            <CompactView leftIcon={<Sparkles className="w-4 h-4 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />} rightText={<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 font-semibold text-[15px] pr-1 tracking-tight drop-shadow-sm">{aiThinking ? "Thinking..." : "Listening..."}</span>} />
          )}
          {state === 'compact' && activeApp === 'weather' && (
            <CompactView leftIcon={<CloudRain className="w-4 h-4 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />} rightText={<span className="text-blue-400 font-semibold text-[15px] drop-shadow-sm">24°C</span>} />
          )}
          {state === 'compact' && activeApp === 'tasks' && (
            <CompactView leftIcon={<ListTodo className="w-4 h-4 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />} rightText={<span className="text-yellow-400 font-medium text-sm">2 left</span>} />
          )}

          {/* ---------------------------------
              EXPANDED MODE
              --------------------------------- */}
          {state === 'expanded' && activeApp === 'music' && (
            <ExpandedMusic closeApp={closeApp} />
          )}
          {state === 'expanded' && activeApp === 'timer' && (
            <ExpandedTimer formatTime={formatTime} timerSeconds={timerSeconds} isRunning={isTimerRunning} toggle={() => setIsTimerRunning(!isTimerRunning)} closeApp={closeApp} />
          )}
          {state === 'expanded' && activeApp === 'call' && (
            <ExpandedCall closeApp={closeApp} />
          )}
          {state === 'expanded' && activeApp === 'ai_sirig' && (
            <ExpandedAI closeApp={closeApp} />
          )}
          {state === 'expanded' && activeApp === 'weather' && (
            <ExpandedWeather closeApp={closeApp} />
          )}
          {state === 'expanded' && activeApp === 'tasks' && (
             <ExpandedTasks closeApp={closeApp} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// Sub-components for better organization

function CompactView({ leftIcon, rightText }: { leftIcon: React.ReactNode, rightText: React.ReactNode }) {
  return (
    <motion.div
      layoutId="island-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-full flex justify-between items-center px-4"
    >
      <div className="flex items-center space-x-2">
         {leftIcon}
      </div>
      <div className="flex items-center">
         {rightText}
      </div>
    </motion.div>
  );
}

// Expanded Views
function ExpandedTimer({ formatTime, timerSeconds, isRunning, toggle, closeApp }: any) {
  return (
     <motion.div initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 0.95 }} transition={{ ease: "easeOut", duration: 0.3 }} className="w-full h-full p-6 flex flex-col justify-between">
      <div className="flex justify-between items-start">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Timer className="w-5 h-5 text-orange-500" />
            </div>
            <span className="text-orange-400 font-semibold tracking-wider text-sm mt-0.5">SMART TIMER</span>
         </div>
         <button onClick={closeApp} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors active:scale-95"><X className="w-4 h-4 text-white/70" /></button>
      </div>
      <div className="flex justify-between items-end pb-2 px-2">
         <span className="text-7xl font-extralight tracking-tighter text-white tabular-nums drop-shadow-md">{formatTime(timerSeconds)}</span>
         <div className="flex gap-4 pb-1">
             <button className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-orange-400 font-semibold active:scale-95 transition-all outline-none" onClick={() => {}}>Stop</button>
             <button className={cn("w-14 h-14 rounded-full flex items-center justify-center font-semibold active:scale-95 transition-all outline-none shadow-lg", isRunning ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500 text-black')} onClick={(e) => { e.stopPropagation(); toggle(); }}>
                 {isRunning ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current translate-x-0.5" />}
             </button>
         </div>
      </div>
    </motion.div>
  )
}

function ExpandedMusic({ closeApp }: any) {
    return (
        <motion.div initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 0.95 }} transition={{ ease: "easeOut", duration: 0.3 }} className="w-full h-full p-6 flex flex-col justify-between">
             <div className="flex gap-5">
                 <div className="w-20 h-20 rounded-[20px] bg-gradient-to-br from-pink-500 to-rose-600 shadow-[0_10px_30px_rgba(225,29,72,0.4)] flex items-center justify-center relative overflow-hidden">
                     <Music className="w-10 h-10 text-white/50" />
                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
                 </div>
                 <div className="flex flex-col justify-center gap-1.5 flex-1 relative">
                     <span className="text-gray-400 text-xs font-bold uppercase tracking-widest flex justify-between">Now Playing <button onClick={closeApp} className="absolute -top-1 -right-1 p-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"><X className="w-4 h-4 text-white/70" /></button></span>
                     <span className="font-semibold text-2xl leading-tight truncate max-w-[220px] drop-shadow-md">Midnight City</span>
                     <span className="text-pink-400 text-base font-medium truncate drop-shadow-sm">M83</span>
                 </div>
             </div>
             <div className="flex flex-col gap-2 my-1">
                 <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 font-mono font-medium">1:24</span>
                    <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden relative">
                        <motion.div initial={{ width: 0 }} animate={{ width: "33%" }} transition={{ duration: 1 }} className="absolute left-0 top-0 bottom-0 bg-white rounded-full shadow-[0_0_10px_white]" />
                    </div>
                    <span className="text-xs text-gray-400 font-mono font-medium">-2:40</span>
                 </div>
             </div>
             <div className="flex justify-center items-center gap-10 pb-2">
                 <SkipBack className="w-8 h-8 fill-white text-white opacity-70 hover:opacity-100 hover:scale-105 active:scale-95 transition-all cursor-pointer" />
                 <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer">
                    <Pause className="w-6 h-6 fill-black text-black" />
                 </div>
                 <SkipForward className="w-8 h-8 fill-white text-white opacity-70 hover:opacity-100 hover:scale-105 active:scale-95 transition-all cursor-pointer" />
             </div>
        </motion.div>
    )
}

function ExpandedCall({ closeApp }: any) {
    return (
       <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="w-full h-full px-6 py-4 flex items-center justify-between">
             <div className="flex items-center gap-4">
                 <div className="w-14 h-14 rounded-full bg-gradient-to-b from-gray-700 to-gray-900 border border-gray-600 shadow-xl flex items-center justify-center">
                    <span className="text-2xl drop-shadow-md">👤</span>
                 </div>
                 <div className="flex flex-col">
                     <span className="text-gray-400 text-[11px] font-bold uppercase tracking-widest leading-tight">mobile</span>
                     <span className="font-semibold text-xl leading-tight">Mom Calling</span>
                 </div>
             </div>
             <div className="flex gap-4">
                 <button className="w-14 h-14 rounded-full bg-red-500/90 hover:bg-red-500 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-95 transition-all" onClick={closeApp}>
                     <Phone className="w-6 h-6 text-white fill-white rotate-[135deg]" />
                 </button>
                 <button className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] active:scale-95 transition-all" onClick={(e) => { e.stopPropagation(); }}>
                     <Phone className="w-6 h-6 text-black fill-black" />
                 </button>
             </div>
        </motion.div>
    )
}

import Markdown from 'react-markdown';

function ExpandedAI({ closeApp }: any) {
    const { aiQuery, aiResponse, aiThinking, aiLevel } = useIsland();
    
    return (
       <motion.div initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 0.95 }} transition={{ ease: "easeOut", duration: 0.4 }} className="w-full h-full p-6 flex flex-col gap-4 overflow-hidden relative">
            <div className="absolute top-0 right-0 left-0 h-24 bg-gradient-to-b from-purple-900/40 to-transparent pointer-events-none z-0 rounded-t-[40px]" />
             <div className="flex justify-between items-center z-10 pt-1">
                 <div className="flex gap-2.5 items-center">
                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                        <Wand2 className={cn("w-4 h-4 text-white", aiThinking && "animate-pulse")} />
                     </div>
                     <span className={cn("font-bold tracking-tighter text-base bg-clip-text text-transparent bg-gradient-to-r", aiLevel === 'high' ? 'from-gray-100 to-gray-400' : 'from-indigo-200 to-purple-300')}>
                         Galaxy AI Ultra
                     </span>
                 </div>
                  <button onClick={closeApp} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors active:scale-95"><X className="w-4 h-4 text-white/70" /></button>
             </div>
             
             <div className="flex-1 bg-black/40 border border-white/10 rounded-[28px] p-4 overflow-y-auto custom-scrollbar flex flex-col gap-4 text-sm leading-relaxed z-10 relative shadow-inner">
                 {aiQuery && (
                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-gray-100 self-end bg-gradient-to-r from-purple-600 to-indigo-600 font-medium px-5 py-3 rounded-[24px] rounded-tr-sm max-w-[85%] break-words shadow-md">
                         {aiQuery}
                     </motion.div>
                 )}
                 {aiThinking ? (
                     <div className="flex items-center gap-2 text-purple-400 self-start mt-2 px-3 py-2 bg-white/5 rounded-full border border-white/10 w-fit">
                         <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                         <span className="text-xs font-semibold uppercase tracking-widest pl-1 opacity-80">Processing...</span>
                     </div>
                 ) : aiResponse ? (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-gray-100 self-start text-[15px] bg-white/10 backdrop-blur-md border border-white/10 px-5 py-4 rounded-[24px] rounded-tl-sm max-w-[95%] shadow-lg">
                          <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-headings:mb-2 prose-headings:mt-3 prose-a:text-purple-400 prose-strong:text-white">
                              <Markdown>{aiResponse}</Markdown>
                          </div>
                      </motion.div>
                 ) : (
                     <div className="h-full flex flex-col items-center justify-center opacity-40">
                         <span className="font-mono text-sm tracking-tight font-medium mt-3">Ready to assist.</span>
                     </div>
                 )}
             </div>
        </motion.div>
    )
}

function ExpandedWeather({ closeApp }: any) {
   return (
       <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="w-full h-full p-6 flex flex-col justify-between relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-cyan-900/40 z-0 pointer-events-none" />
           <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full" />

           <div className="flex justify-between items-start z-10">
                <span className="text-blue-100 text-sm font-bold tracking-widest uppercase">San Francisco</span>
                <button onClick={closeApp} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors active:scale-95"><X className="w-4 h-4 text-blue-100" /></button>
           </div>
           <div className="flex justify-between items-end z-10 pb-1 px-1">
               <div className="flex flex-col drop-shadow-lg">
                   <span className="text-7xl font-extralight text-white tracking-tighter">24°</span>
                   <span className="text-blue-200 font-semibold tracking-wide mt-1">Clear • H:28° L:14°</span>
               </div>
               <CloudRain className="w-20 h-20 text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] mb-3" />
           </div>
   </motion.div>
   )
}

function ExpandedTasks({ closeApp }: any) {
  return (
       <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="w-full h-full p-6 flex flex-col gap-3">
           <div className="flex justify-between items-center mb-2">
                <span className="text-yellow-400 font-bold tracking-widest text-sm flex items-center gap-2"><ListTodo className="w-4 h-4" /> TASKS <span className="text-[10px] bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full ml-1 border border-yellow-500/30">2 LEFT</span></span>
                <button onClick={closeApp} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors active:scale-95"><X className="w-4 h-4 text-yellow-100" /></button>
           </div>
           
           <div className="flex flex-col gap-2.5 flex-1 pt-1 justify-center">
               <div className="flex items-center gap-4 bg-white/5 p-3 rounded-[16px] border border-white/5">
                   <div className="w-5 h-5 rounded-full border-2 border-yellow-500 flex-shrink-0 relative overflow-hidden before:absolute before:inset-0 before:bg-yellow-500/20" />
                   <span className="text-white text-[15px] font-medium truncate">Strategic Planning Session</span>
               </div>
               <div className="flex items-center gap-4 bg-white/5 p-3 rounded-[16px] border border-white/5 opacity-60">
                   <div className="w-5 h-5 rounded-full border-2 border-emerald-500 bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                       <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                   </div>
                   <span className="text-gray-300 line-through text-[15px] font-medium truncate">Update Liquid Island Max Core</span>
               </div>
               <div className="flex items-center gap-4 bg-white/5 p-3 rounded-[16px] border border-white/5 opacity-40">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex-shrink-0" />
                   <span className="text-gray-400 text-[15px] font-medium truncate">Deep Work Blocks</span>
               </div>
           </div>
       </motion.div>
  )
}
