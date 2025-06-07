// app/dash/components/progress-streak.tsx
'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import AnimatedWrapper from './animated-wrapper';

interface WeeklyHoursData {
  day: string;
  hours: number;
}

interface ProgressStreakProps {
  totalWeeklyHours: number;
  weeklyHoursData: WeeklyHoursData[];
  studyStreak: number;
}

const ProgressStreak: React.FC<ProgressStreakProps> = ({ totalWeeklyHours, weeklyHoursData, studyStreak }) => {
  return (
    <AnimatedWrapper
      delay={350}
      className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-slate-700/50"
    >
      <h2 className="text-xl font-semibold text-slate-100 mb-4">Weekly Momentum</h2>
      <div className="mb-4">
        <div className="flex justify-between items-baseline mb-1">
          <p className="text-sm text-slate-300">Hours Logged:</p>
          <p className="text-2xl font-bold text-teal-400">
            {totalWeeklyHours.toFixed(1)} <span className="text-sm font-normal text-slate-400">hrs</span>
          </p>
        </div>
        <div className="flex h-10 gap-1 items-end">
          {weeklyHoursData.map((item, idx) => (
            <div
              key={`${item.day}-${idx}`}
              className="flex-1 bg-slate-700 rounded-sm group relative"
              title={`${item.day}: ${item.hours} hrs`}
            >
              <div
                className="bg-teal-500/70 group-hover:bg-teal-400 transition-all duration-300 rounded-sm"
                style={{
                  height: `${Math.max((item.hours / Math.max(...weeklyHoursData.map(d => d.hours), 1)) * 100, 5)}%`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-700/50 p-4 rounded-lg flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-300">Current Study Streak</p>
          <p className="text-2xl font-bold text-amber-400">{studyStreak} days</p>
        </div>
        <Sparkles size={32} className="text-amber-400 opacity-70 animate-subtlePulse" />
      </div>
    </AnimatedWrapper>
  );
};

export default ProgressStreak;
