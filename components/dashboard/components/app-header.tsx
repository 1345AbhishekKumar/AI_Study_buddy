// app/dash/components/app-header.tsx
'use client';

import React from 'react';
import { Brain, Bell } from 'lucide-react';

// --- Header Component --- //
interface AppHeaderProps {
  userName: string;
  userInitials: string;
  notificationCount: number;
  onNotifClick: () => void;
  onAvatarClick: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  userName,
  userInitials,
  notificationCount,
  onNotifClick,
  onAvatarClick,
}) => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-md py-3 px-4 sm:px-6 sticky top-0 z-50 border-b border-slate-700/50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-slate-100">
          <Brain size={28} className="text-teal-400" />
          <span>StudyOS</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onNotifClick}
            className="relative p-2 rounded-full hover:bg-slate-700/60 transition-colors text-slate-300 hover:text-slate-100"
            aria-label={`Notifications (${notificationCount})`}
          >
            <Bell size={22} />
            {notificationCount > 0 && (
              <div className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-slate-900">
                {notificationCount}
              </div>
            )}
          </button>
          <button
            onClick={onAvatarClick}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-semibold text-sm ring-2 ring-offset-2 ring-offset-slate-900 ring-teal-500/70 hover:opacity-90 transition-opacity"
            aria-label={`User profile for ${userName}`}
          >
            {userInitials}
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
