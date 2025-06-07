// app/dash/components/pomodoro-timer.tsx
'use client';

import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import AnimatedWrapper from './animated-wrapper';

interface PomodoroTimerProps {
  currentSessionType: 'Study' | 'Break';
  formattedTime: string;
  sessionProgress: number;
  isSessionActive: boolean;
  onStartTimer: () => void;
  onPauseTimer: () => void;
  onResetTimer: () => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  currentSessionType,
  formattedTime,
  sessionProgress,
  isSessionActive,
  onStartTimer,
  onPauseTimer,
  onResetTimer,
}) => {
  return (
    <AnimatedWrapper
      delay={100}
      className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-slate-700/50"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-100">Focus Timer</h2>
        <span className="text-sm text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
          {currentSessionType} Session
        </span>
      </div>
      <div className="text-center mb-6">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgb(51 65 85)" strokeWidth="8" />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="rgb(20 184 166)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 54}`}
              strokeDashoffset={`${2 * Math.PI * 54 * (1 - sessionProgress / 100)}`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-slate-100">{formattedTime}</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          {!isSessionActive ? (
            <button
              onClick={onStartTimer}
              className="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full transition-colors shadow-lg hover:shadow-teal-500/30"
              aria-label="Start timer"
            >
              <Play size={24} />
            </button>
          ) : (
            <button
              onClick={onPauseTimer}
              className="bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full transition-colors shadow-lg hover:shadow-amber-500/30"
              aria-label="Pause timer"
            >
              <Pause size={24} />
            </button>
          )}
          <button
            onClick={onResetTimer}
            className="bg-slate-600 hover:bg-slate-700 text-white p-3 rounded-full transition-colors shadow-lg"
            aria-label="Reset timer"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </div>
    </AnimatedWrapper>
  );
};

export default PomodoroTimer;
