export type IslandState = "idle" | "compact" | "expanded";
export type ActiveApp = "none" | "music" | "timer" | "call" | "ai_sirig" | "weather" | "tasks";

export interface IslandContextType {
  state: IslandState;
  setState: (state: IslandState) => void;
  activeApp: ActiveApp;
  setActiveApp: (app: ActiveApp) => void;
  // Specific App States
  timerSeconds: number;
  setTimerSeconds: (s: number) => void;
  isTimerRunning: boolean;
  setIsTimerRunning: (r: boolean) => void;
  // AI State
  aiQuery: string;
  setAiQuery: (q: string) => void;
  aiResponse: string;
  setAiResponse: (r: string) => void;
  aiThinking: boolean;
  setAiThinking: (t: boolean) => void;
  aiLevel: "high" | "flash" | "quick";
  setAiLevel: (l: "high" | "flash" | "quick") => void;
}
