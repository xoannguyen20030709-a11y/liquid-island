import React, { useState } from 'react';
import { useIsland } from '../IslandContext';
import { ActiveApp } from '../types';
import { Timer, Music, Phone, CloudRain, ListTodo, Sparkles, Send, BrainCircuit, Zap, Mic, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function Dashboard() {
  const { setActiveApp, setState, setAiQuery, setAiResponse, setAiThinking, aiLevel, setAiLevel } = useIsland();
  const [inputText, setInputText] = useState('');

  const triggerApp = (app: ActiveApp) => {
    setActiveApp(app);
    setState('expanded');
  };

  const handleAISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    triggerApp('ai_sirig');
    setAiQuery(inputText);
    setAiResponse('');
    setAiThinking(true);
    setInputText('');

    try {
      const response = await fetch(`/api/ai/${aiLevel}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputText })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      setAiResponse(data.text);
    } catch (error: any) {
      setAiResponse("Error: " + error.message);
    } finally {
      setAiThinking(false);
    }
  };

  return (
    <div className="p-6 md:p-12 flex flex-col gap-10 flex-1 w-full max-w-5xl mx-auto z-10 pb-32">
      
      <div className="space-y-4 pt-4 sm:pt-10 md:pt-20 max-w-2xl text-center mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
        <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#e2e2e2] to-[#888888] drop-shadow-2xl"
        >
          Liquid Ultra
        </motion.h2>
        <motion.p 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.3 }}
           className="text-[#a1a1aa] text-lg font-medium tracking-wide max-w-lg mx-auto uppercase letter-spacing-[0.2em]"
        >
          Titanium Space Edition
        </motion.p>
      </div>

      {/* App Launchers */}
      <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.6, delay: 0.4 }}
         className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6 w-full"
      >
        <LauncherCard icon={<Music />} label="Music Player" onClick={() => triggerApp('music')} color="pink" />
        <LauncherCard icon={<Timer />} label="Smart Timer" onClick={() => triggerApp('timer')} color="orange" />
        <LauncherCard icon={<Phone />} label="Incoming Call" onClick={() => triggerApp('call')} color="green" />
        <LauncherCard icon={<CloudRain />} label="Weather Live" onClick={() => triggerApp('weather')} color="blue" />
        <LauncherCard icon={<ListTodo />} label="Live Tasks" onClick={() => triggerApp('tasks')} color="yellow" />
      </motion.div>

      {/* AI Assistant Control */}
      <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-[#050508]/60 backdrop-blur-3xl rounded-[48px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/5 space-y-8 relative overflow-hidden flex flex-col lg:flex-row gap-8 lg:gap-16 items-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-pink-500/5 pointer-events-none" />
        
        <div className="flex-1 space-y-8 z-10 w-full">
            <div className="flex items-center gap-5 border-b border-white/5 pb-8">
            <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3),inset_0_2px_10px_rgba(255,255,255,0.2)]">
                <Sparkles className="w-8 h-8 text-white drop-shadow-md" />
            </div>
            <div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 tracking-tight">Galaxy AI Ultra</h3>
                <p className="text-[#a1a1aa] font-medium tracking-wide">Powered by Gemini Deep Reasoning</p>
            </div>
            </div>

            <form onSubmit={handleAISubmit} className="relative group">
            <div className="absolute inset-y-0 left-6 flex items-center -ml-1 pointer-events-none text-gray-400 group-focus-within:text-indigo-400 transition-colors z-10">
                <Mic className="w-6 h-6" />
            </div>
            <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={"Ask for deep analysis, summaries..."}
                className="w-full bg-[#0a0a0c]/80 text-white rounded-[32px] py-6 pl-16 pr-20 outline-none border border-white/10 focus:border-indigo-500/50 focus:bg-black/60 focus:ring-[6px] focus:ring-indigo-500/10 transition-all font-medium backdrop-blur-xl shadow-inner text-lg placeholder:text-gray-500"
            />
            <button 
                type="submit" 
                disabled={!inputText.trim()}
                className="absolute right-3 top-3 bottom-3 aspect-square rounded-full bg-gradient-to-br from-gray-100 to-gray-300 text-black flex items-center justify-center disabled:opacity-30 disabled:hover:scale-100 hover:scale-105 active:scale-95 transition-all shadow-xl border border-white/20 z-10"
            >
                <ArrowRight className="w-6 h-6" />
            </button>
            </form>

            {/* Level Selector */}
            <div className="flex gap-2 bg-[#0a0a0c]/80 backdrop-blur-xl p-2 rounded-[24px] w-full border border-white/5 shadow-inner">
                <LevelButton active={aiLevel === 'quick'} onClick={() => setAiLevel('quick')} icon={<Zap className="w-4 h-4" />} label="Flash" />
                <LevelButton active={aiLevel === 'flash'} onClick={() => setAiLevel('flash')} icon={<Sparkles className="w-4 h-4" />} label="Smart" />
                <LevelButton active={aiLevel === 'high'} onClick={() => setAiLevel('high')} icon={<BrainCircuit className="w-4 h-4" />} label="Deep Think" />
            </div>
        </div>

        <div className="w-full lg:w-[380px] z-10 flex flex-col gap-3.5">
            <h4 className="text-[#71717a] text-xs font-bold uppercase tracking-[0.2em] mb-2 px-2">System Integrations</h4>
            <MacroButton icon={<Zap className="w-5 h-5" />} text="Summarize my day" desc="Schedule, weather & updates" onClick={() => { setAiLevel('high'); setInputText('What is on my schedule today, how is the weather, and what should I focus on? Please give a comprehensive summary.'); }} />
            <MacroButton icon={<ListTodo className="w-5 h-5" />} text="Optimize routine" desc="Review current task habits" onClick={() => { setAiLevel('high'); setInputText('Review my current task habits and suggest an optimized daily routine based on deep productivity principles.'); }} />
            <MacroButton icon={<BrainCircuit className="w-5 h-5" />} text="Deep Code Review" desc="Analyze complex codebase" onClick={() => { setAiLevel('high'); setInputText('Please act as a senior software architect and write a deep review of standard React performance best practices with code examples.'); }} />
        </div>

      </motion.div>

    </div>
  );
}

function LauncherCard({ icon, label, onClick, color }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center gap-4 p-5 sm:p-6 rounded-[36px] bg-[#0a0a0c]/40 backdrop-blur-3xl border border-white/5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:bg-white/10 hover:-translate-y-2 hover:border-white/20 transition-all duration-500 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className={cn("w-14 h-14 sm:w-16 sm:h-16 rounded-[22px] flex items-center justify-center shadow-inner group-active:scale-95 transition-transform duration-300 relative z-10", 
        color === 'pink' && 'bg-gradient-to-br from-pink-500/20 to-rose-600/10 text-pink-400 border border-pink-500/20 shadow-[inset_0_2px_15px_rgba(236,72,153,0.4)]',
        color === 'orange' && 'bg-gradient-to-br from-orange-500/20 to-amber-600/10 text-orange-400 border border-orange-500/20 shadow-[inset_0_2px_15px_rgba(249,115,22,0.4)]',
        color === 'green' && 'bg-gradient-to-br from-green-500/20 to-emerald-600/10 text-green-400 border border-green-500/20 shadow-[inset_0_2px_15px_rgba(34,197,94,0.4)]',
        color === 'blue' && 'bg-gradient-to-br from-blue-500/20 to-cyan-600/10 text-blue-400 border border-blue-500/20 shadow-[inset_0_2px_15px_rgba(59,130,246,0.4)]',
        color === 'yellow' && 'bg-gradient-to-br from-yellow-500/20 to-amber-500/10 text-yellow-400 border border-yellow-500/20 shadow-[inset_0_2px_15px_rgba(250,204,21,0.4)]'
      )}>
        {React.cloneElement(icon, { className: "w-7 h-7 sm:w-8 sm:h-8 drop-shadow-lg" })}
      </div>
      <span className="text-[13px] sm:text-sm font-semibold text-[#e4e4e7] tracking-wide relative z-10">{label}</span>
    </button>
  );
}

function LevelButton({ active, onClick, icon, label }: any) {
  return (
    <button 
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 py-3 rounded-[16px] text-sm font-semibold transition-all duration-300",
        active 
          ? "bg-white text-black shadow-lg shadow-white/10" 
          : "text-gray-400 hover:text-white hover:bg-white/5"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function MacroButton({ text, desc, onClick, icon }: any) {
    return (
        <button type="button" onClick={onClick} className="w-full text-left bg-white/5 border border-white/5 p-4 flex gap-4 items-center rounded-[20px] hover:bg-white/10 transition-all group">
            <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-white font-medium text-sm drop-shadow-sm">{text}</span>
                <span className="text-gray-500 text-xs font-medium tracking-wide">{desc}</span>
            </div>
        </button>
    )
}
