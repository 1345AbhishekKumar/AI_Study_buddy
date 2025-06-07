// app/dash/components/quick-actions.tsx
'use client';

import React from 'react';
import AnimatedWrapper from './animated-wrapper';
import { QuickActionItem } from '@/lib/types';

interface QuickActionsProps {
  actions: QuickActionItem[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <AnimatedWrapper
      delay={250}
      className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-slate-700/50"
    >
      <h2 className="text-xl font-semibold text-slate-100 mb-4">Launchpad</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map(action => (
          <button
            key={action.id}
            onClick={action.action}
            className="bg-slate-700/50 hover:bg-slate-700 border border-slate-600/80 p-4 rounded-lg text-center group transition-all hover:border-teal-500/70"
          >
            <action.icon size={24} className="mx-auto mb-2 text-teal-400 group-hover:text-teal-300 transition-colors" />
            <span className="block text-xs font-medium text-slate-300 group-hover:text-slate-100 transition-colors">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </AnimatedWrapper>
  );
};

export default QuickActions;
