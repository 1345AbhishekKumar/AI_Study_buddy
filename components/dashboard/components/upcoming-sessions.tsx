// app/dash/components/upcoming-sessions.tsx
'use client';

import React from 'react';
import AnimatedWrapper from './animated-wrapper';
import { Session } from '@/lib/types';

interface UpcomingSessionsProps {
  sessions: Session[];
}

const UpcomingSessions: React.FC<UpcomingSessionsProps> = ({ sessions }) => {
  return (
    <AnimatedWrapper
      delay={150}
      className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-slate-700/50"
    >
      <h2 className="text-xl font-semibold text-slate-100 mb-4">Today&apos;s Sessions</h2>
      <div className="space-y-3">
        {sessions.map(session => (
          <div
            key={session.id}
            className={`p-4 rounded-lg border transition-all hover:border-teal-500/70 ${
              session.isCurrent ? 'bg-teal-500/10 border-teal-500/50' : 'bg-slate-700/50 border-slate-600/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-100">{session.subject}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${session.tagColor}`}>{session.type}</span>
                </div>
                <p className="text-sm text-slate-300 mb-1">{session.topic}</p>
                <p className="text-xs text-slate-400">{session.time}</p>
              </div>
              {session.isCurrent && (
                <div className="ml-4">
                  <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </AnimatedWrapper>
  );
};

export default UpcomingSessions;
