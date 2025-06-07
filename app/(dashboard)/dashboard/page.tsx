// app/dash/page.tsx
'use client';

import React, { useState, useEffect, useRef, JSX } from 'react';
import { CalendarDays, MessageCircle, BarChart3, Lightbulb } from 'lucide-react';

// Import the DashboardLayout
import { DashboardLayout } from '@/components/dashboard/dashboard_layout';
import Toast from '@/components/dashboard/components/toast';
// AppHeader is removed as it's part of DashboardLayout now
// import AppHeader from '../../components/dashboard/components/app-header';
import WelcomeSection from '@/components/dashboard/components/welcome-section';
import PomodoroTimer from '@/components/dashboard/components/pomodoro-timer';
import UpcomingSessions from '@/components/dashboard/components/upcoming-sessions';
import AiChatInterface from '@/components/dashboard/components/ai-chat-interface';
import QuickActions from '@/components/dashboard/components/quick-actions';
import ProgressStreak from '@/components/dashboard/components/progress-streak';
import MotivationQuote from '@/components/dashboard/components/motivation-quote';
import { Session, ChatMessage, QuickActionItem } from '@/lib/types';
import { getGreeting, formatDate } from '@/lib/utils';

// --- Main Dashboard Component ---
export default function DashboardPage(): JSX.Element {
  const greeting = getGreeting();
  const userInitials = 'AI';
  const userName = 'Abhishek';
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [currentSessionType] = useState<'Study' | 'Break'>('Study');
  const [sessionTimeLeft, setSessionTimeLeft] = useState(25 * 60);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionProgress, setSessionProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'c1',
      sender: 'ai',
      text: 'Welcome, Alex! What complex concept can we unravel today?',
      timestamp: '10:00 AM',
    },
    {
      id: 'c2',
      sender: 'user',
      text: "I'm struggling with understanding quantum entanglement.",
      timestamp: '10:01 AM',
    },
  ]);
  const [toastInfo, setToastInfo] = useState<{
    message: string;
    type: 'success' | 'info' | 'error' | 'warning';
    show: boolean;
  }>({
    message: '',
    type: 'info',
    show: false,
  });
  const [upcomingSessions] = useState<Session[]>([
    {
      id: '1',
      subject: 'Quantum Computing',
      topic: 'Introduction to Qubits',
      time: '2:30 PM - 3:15 PM',
      tagColor: 'bg-purple-500/20 text-purple-300',
      type: 'Lecture',
      isCurrent: true,
    },
    {
      id: '2',
      subject: 'Neural Networks',
      topic: 'Backpropagation Algorithm',
      time: '4:00 PM - 5:00 PM',
      tagColor: 'bg-sky-500/20 text-sky-300',
      type: 'Practice',
    },
  ]);
  const [quickActions] = useState<QuickActionItem[]>([
    {
      id: 'new_topic',
      label: 'Explore New Concept',
      icon: Lightbulb,
      action: () => displayToast('Opening Concept Explorer...', 'info'),
    },
    {
      id: 'plan_day',
      label: 'Plan My Day',
      icon: CalendarDays,
      action: () => displayToast('Launching Daily Planner...', 'info'),
    },
    {
      id: 'ask_ai',
      label: 'Ask StudyOS',
      icon: MessageCircle,
      action: () => displayToast('Opening AI Assistant...', 'info'),
    },
    {
      id: 'view_map',
      label: 'Learning Map',
      icon: BarChart3,
      action: () => displayToast('Showing Learning Map...', 'info'),
    },
  ]);
  const [currentQuote] = useState({
    text: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
  });
  const [studyStreak] = useState(12);

  // Data for charts
  const weeklyHoursData = [
    { day: 'M', hours: 2.5 },
    { day: 'T', hours: 3 },
    { day: 'W', hours: 1.5 },
    { day: 'T', hours: 4 },
    { day: 'F', hours: 2 },
    { day: 'S', hours: 0.5 },
    { day: 'S', hours: 0 },
  ];

  const totalWeeklyHours = weeklyHoursData.reduce((sum, day) => sum + day.hours, 0);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Timer logic
  useEffect(() => {
    if (isSessionActive && sessionTimeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setSessionTimeLeft(prev => {
          const newTime = prev - 1;
          const totalTime = currentSessionType === 'Study' ? 25 * 60 : 5 * 60;
          setSessionProgress(((totalTime - newTime) / totalTime) * 100);
          return newTime;
        });
      }, 1000);
    } else if (sessionTimeLeft === 0) {
      setIsSessionActive(false);
      displayToast(`${currentSessionType} session completed!`, 'success');
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isSessionActive, sessionTimeLeft, currentSessionType]);

  // Format time for display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formattedTime = formatTime(sessionTimeLeft);

  // Timer handlers
  const handleStartTimer = (): void => {
    setIsSessionActive(true);
  };

  const handlePauseTimer = (): void => {
    setIsSessionActive(false);
  };

  const handleResetTimer = (): void => {
    setIsSessionActive(false);
    setSessionTimeLeft(currentSessionType === 'Study' ? 25 * 60 : 5 * 60);
    setSessionProgress(0);
  };

  // Toast handlers
  const displayToast = (message: string, type: 'success' | 'info' | 'error' | 'warning' = 'info'): void => {
    setToastInfo({ message, type, show: true });
    setTimeout(() => setToastInfo(prev => ({ ...prev, show: false })), 3000);
  };

  const closeToast = (): void => setToastInfo(prev => ({ ...prev, show: false }));

  // Event handlers - keeping these for future implementation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleNotificationClick = (): void => displayToast('You have 3 new insights from StudyOS!', 'info');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAvatarClick = (): void => displayToast('User Profile & Settings (coming soon)', 'info');

  const handleAddNewGoal = (): void => displayToast('Goal setting module activated!', 'success');

  const handleSendChatMessage = (): void => {
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: `c${chatMessages.length + 1}`,
      sender: 'user',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `c${chatMessages.length + 2}`,
        sender: 'ai',
        text: "Entanglement is fascinating! Let's break it down with an analogy...",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    // Wrap content with DashboardLayout
    <DashboardLayout>
      {/* The main div with gradient background and AppHeader are removed as DashboardLayout handles them */}
      {/* The main tag's max-width and centering are kept, padding might be adjusted by DashboardLayout's main tag */}
      <div className="max-w-screen-xl mx-auto">
        <WelcomeSection
          greeting={greeting}
          userName={userName}
          currentDate={`Today is ${formatDate(currentTime)}`}
          onAddNewGoal={handleAddNewGoal}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <PomodoroTimer
              currentSessionType={currentSessionType}
              formattedTime={formattedTime}
              sessionProgress={sessionProgress}
              isSessionActive={isSessionActive}
              onStartTimer={handleStartTimer}
              onPauseTimer={handlePauseTimer}
              onResetTimer={handleResetTimer}
            />
            <UpcomingSessions sessions={upcomingSessions} />
            <AiChatInterface
              chatMessages={chatMessages}
              chatInput={chatInput}
              userInitials={userInitials}
              onChatInputChange={e => setChatInput(e.target.value)}
              onSendMessage={handleSendChatMessage}
              onKeyPress={e => e.key === 'Enter' && handleSendChatMessage()}
            />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <QuickActions actions={quickActions} />
            <ProgressStreak
              totalWeeklyHours={totalWeeklyHours}
              weeklyHoursData={weeklyHoursData}
              studyStreak={studyStreak}
            />
            <MotivationQuote quote={currentQuote} />
          </div>
        </div>
      </div>
      {/* Toast remains, consider integrating it into the layout or a global provider later */}
      <Toast message={toastInfo.message} show={toastInfo.show} type={toastInfo.type} onClose={closeToast} />
    </DashboardLayout>
  );
}
