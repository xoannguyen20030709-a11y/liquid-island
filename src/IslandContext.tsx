import React, { createContext, useContext, useState, useEffect } from 'react';
import { IslandContextType, IslandState, ActiveApp } from './types';

const IslandContext = createContext<IslandContextType | undefined>(undefined);

export function IslandProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<IslandState>('idle');
  const [activeApp, setActiveApp] = useState<ActiveApp>('none');
  
  // Timer State
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // AI State
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiThinking, setAiThinking] = useState(false);
  const [aiLevel, setAiLevel] = useState<"high" | "flash" | "quick">('flash');

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      // Optional: Maybe trigger an alarm or notification here
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Derive state based on active app if currently 'idle'
  useEffect(() => {
    if (activeApp !== 'none' && state === 'idle') {
      setState('compact');
    } else if (activeApp === 'none') {
      setState('idle');
    }
  }, [activeApp]);


  return (
    <IslandContext.Provider value={{
      state, setState,
      activeApp, setActiveApp,
      timerSeconds, setTimerSeconds,
      isTimerRunning, setIsTimerRunning,
      aiQuery, setAiQuery,
      aiResponse, setAiResponse,
      aiThinking, setAiThinking,
      aiLevel, setAiLevel
    }}>
      {children}
    </IslandContext.Provider>
  );
}

export function useIsland() {
  const context = useContext(IslandContext);
  if (!context) throw new Error('useIsland must be used within IslandProvider');
  return context;
}
