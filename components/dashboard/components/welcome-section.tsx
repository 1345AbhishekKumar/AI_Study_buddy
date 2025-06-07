// app/dash/components/welcome-section.tsx
'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import AnimatedWrapper from './animated-wrapper'; // Assuming AnimatedWrapper is in the same directory

interface WelcomeSectionProps {
  greeting: string;
  userName: string;
  currentDate: string;
  onAddNewGoal: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ greeting, userName, currentDate, onAddNewGoal }) => {
  return (
    <AnimatedWrapper className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-2">
            {greeting}, {userName}
          </h1>
          <p className="text-slate-400 text-lg">{currentDate} • Let&apos;s make it count</p>
        </div>
        <button
          onClick={onAddNewGoal}
          className="bg-teal-500 hover:bg-teal-600 transition-colors text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-teal-500/30 flex items-center gap-2 w-fit"
        >
          <Plus size={20} />
          Set New Goal
        </button>
      </div>
    </AnimatedWrapper>
  );
};

export default WelcomeSection;
