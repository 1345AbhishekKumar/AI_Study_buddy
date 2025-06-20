'use client';

import { motion, Variants } from 'framer-motion'; // 1. Import Variants
import {
  BookOpen,
  Brain,
  Calendar,
  BarChart3,
  Clock,
  Target,
  TrendingUp,
  Award,
  Zap,
  Users,
  FileText,
  Star,
  ChevronRight,
  Activity,
  Play,
  Pause,
  RotateCcw,
  Send,
  Plus,
  MessageCircle,
  Lightbulb,
} from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import AnimatedBackground from '@/components/animations/AnimatedBackground';

// ... (rest of the interfaces and utility functions are correct)
// Types
interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface ToastInfo {
  message: string;
  type: 'success' | 'info' | 'error' | 'warning';
  show: boolean;
}

interface StudyGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
}

interface Session {
  id: string;
  subject: string;
  topic: string;
  time: string;
  tagColor: string;
  type: string;
  isCurrent?: boolean;
}

interface ActivityItem {
  type: 'study' | 'chat' | 'goal' | 'resource';
  title: string;
  time: string;
  icon: React.ElementType;
  status: 'completed' | 'active' | 'achieved' | 'uploaded';
}

// Utility functions
const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Toast Component
const Toast: React.FC<{
  message: string;
  show: boolean;
  type: 'success' | 'info' | 'error' | 'warning';
  onClose: () => void;
}> = ({ message, show, type, onClose }) => {
  if (!show) return null;

  const bgColor = {
    success: 'from-green-500/20 to-green-600/20',
    info: 'from-blue-500/20 to-blue-600/20',
    error: 'from-red-500/20 to-red-600/20',
    warning: 'from-yellow-500/20 to-yellow-600/20',
  }[type];

  const borderColor = {
    success: 'border-green-500/40',
    info: 'border-blue-500/40',
    error: 'border-red-500/40',
    warning: 'border-yellow-500/40',
  }[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed right-4 top-4 z-50 bg-gradient-to-r p-4 ${bgColor} border backdrop-blur-xl ${borderColor} rounded-2xl shadow-2xl`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-medium text-white">{message}</span>
        <button onClick={onClose} className="text-white/70 hover:text-white" aria-label="Close toast">
          ×
        </button>
      </div>
    </motion.div>
  );
};

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isClient, setIsClient] = useState(false);
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
      text: 'Welcome! What complex concept can we unravel today?',
      timestamp: '10:00 AM',
    },
    {
      id: 'c2',
      sender: 'user',
      text: "I'm studying quantum computing basics.",
      timestamp: '10:01 AM',
    },
  ]);
  const [toastInfo, setToastInfo] = useState<ToastInfo>({
    message: '',
    type: 'info',
    show: false,
  });

  const greeting = getGreeting();
  const userName =
    isLoaded && isSignedIn && user
      ? user.firstName || user.username || user.primaryEmailAddress?.emailAddress || 'User'
      : '';

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const displayToast = useCallback((message: string, type: 'success' | 'info' | 'error' | 'warning' = 'info'): void => {
    setToastInfo({ message, type, show: true });
    setTimeout(() => setToastInfo(prev => ({ ...prev, show: false })), 3000);
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
  }, [isSessionActive, sessionTimeLeft, currentSessionType, displayToast]);

  const stats = [
    {
      icon: Clock,
      label: 'Study Hours',
      value: '24.5',
      change: '+12%',
      color: 'from-[#3A8EF6] to-[#6B46C1]',
      bgGlow: 'shadow-[#3A8EF6]/20',
    },
    {
      icon: Target,
      label: 'Goals Completed',
      value: '8/10',
      change: '+25%',
      color: 'from-[#5CF4A0] to-[#3A8EF6]',
      bgGlow: 'shadow-[#5CF4A0]/20',
    },
    {
      icon: Brain,
      label: 'AI Chats',
      value: '156',
      change: '+8%',
      color: 'from-[#6B46C1] to-[#5CF4A0]',
      bgGlow: 'shadow-[#6B46C1]/20',
    },
    {
      icon: Award,
      label: 'Streak Days',
      value: '12',
      change: '+3',
      color: 'from-[#5CF4A0] to-[#6B46C1]',
      bgGlow: 'shadow-[#5CF4A0]/20',
    },
  ];

  const recentActivity: ActivityItem[] = [
    {
      type: 'study',
      title: 'Completed Biology Chapter 5',
      time: '2 hours ago',
      icon: BookOpen,
      status: 'completed',
    },
    {
      type: 'chat',
      title: 'AI Chat: Photosynthesis Questions',
      time: '3 hours ago',
      icon: Brain,
      status: 'active',
    },
    {
      type: 'goal',
      title: 'Weekly Study Goal Achieved',
      time: '1 day ago',
      icon: Target,
      status: 'achieved',
    },
    {
      type: 'resource',
      title: 'Uploaded Chemistry Notes PDF',
      time: '2 days ago',
      icon: FileText,
      status: 'uploaded',
    },
  ];

  const quickActions = [
    {
      icon: BookOpen,
      label: 'Browse Resources',
      href: '/dashboard/resources',
      color: 'from-blue-500 to-blue-600',
      description: 'Access study materials',
      action: () => displayToast('Opening Resource Library...', 'info'),
    },
    {
      icon: Brain,
      label: 'Start AI Chat',
      href: '/dashboard/study',
      color: 'from-purple-500 to-purple-600',
      description: 'Get instant help',
      action: () => displayToast('Opening AI Assistant...', 'info'),
    },
    {
      icon: Calendar,
      label: 'Plan Study Session',
      href: '/dashboard/planner',
      color: 'from-green-500 to-green-600',
      description: 'Schedule your time',
      action: () => displayToast('Launching Study Planner...', 'info'),
    },
    {
      icon: BarChart3,
      label: 'View Analytics',
      href: '/dashboard/analytics',
      color: 'from-orange-500 to-orange-600',
      description: 'Track progress',
      action: () => displayToast('Opening Analytics Dashboard...', 'info'),
    },
  ];

  const studyGoals: StudyGoal[] = [
    {
      id: '1',
      title: 'Study Hours This Week',
      current: 8,
      target: 15,
      unit: 'hours',
    },
    {
      id: '2',
      title: 'Topics Mastered',
      current: 12,
      target: 25,
      unit: 'topics',
    },
  ];

  const upcomingSessions: Session[] = [
    {
      id: '1',
      subject: 'Quantum Computing',
      topic: 'Introduction to Qubits',
      time: '2:30 PM - 3:15 PM',
      tagColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      type: 'Lecture',
      isCurrent: true,
    },
    {
      id: '2',
      subject: 'Neural Networks',
      topic: 'Backpropagation Algorithm',
      time: '4:00 PM - 5:00 PM',
      tagColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      type: 'Practice',
    },
  ];

  const currentQuote = {
    text: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
  };

  const weeklyProgress = [
    {
      label: 'Study Goals',
      percentage: 75,
      startColor: '#3A8EF6',
      endColor: '#6B46C1',
      id: 'gradient1',
    },
    {
      label: 'Focus Score',
      percentage: 90,
      startColor: '#5CF4A0',
      endColor: '#3A8EF6',
      id: 'gradient2',
    },
    {
      label: 'Retention Rate',
      percentage: 65,
      startColor: '#6B46C1',
      endColor: '#5CF4A0',
      id: 'gradient3',
    },
  ];

  // 2. Apply the Variants type
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  // 2. Apply the Variants type to the problematic constant
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const handleStartTimer = useCallback((): void => setIsSessionActive(true), []);
  const handlePauseTimer = useCallback((): void => setIsSessionActive(false), []);
  const handleResetTimer = useCallback((): void => {
    setIsSessionActive(false);
    setSessionTimeLeft(currentSessionType === 'Study' ? 25 * 60 : 5 * 60);
    setSessionProgress(0);
  }, [currentSessionType]);

  const closeToast = useCallback((): void => setToastInfo(prev => ({ ...prev, show: false })), []);

  const handleAddNewGoal = useCallback((): void => {
    displayToast('Goal setting module activated!', 'success');
  }, [displayToast]);

  const handleSendChatMessage = useCallback((): void => {
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "That's a great question! Let's explore that...",
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  }, [chatInput]);

  const formattedTime = formatTime(sessionTimeLeft);

  // Optionally, show a loading or sign-in message if not loaded or not signed in
  if (!isLoaded) {
    return <div className="text-white p-8">Loading...</div>;
  }
  if (!isSignedIn || !user) {
    return <div className="text-white p-8">Sign in to view your dashboard</div>;
  }

  return (
    <motion.div className="min-h-screen space-y-10 p-6" variants={containerVariants} initial="hidden" animate="visible">
      <Toast message={toastInfo.message} show={toastInfo.show} type={toastInfo.type} onClose={closeToast} />
      {/* ... (rest of the JSX is correct and remains unchanged) */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 dark:from-gray-900/50 dark:via-transparent dark:to-gray-900/50">
        <AnimatedBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-[#3A8EF6]/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-[#5CF4A0]/10 blur-3xl delay-1000"></div>
        <div className="absolute left-1/2 top-1/2 h-64 w-64 animate-pulse rounded-full bg-[#6B46C1]/10 blur-3xl delay-500"></div>
      </div>

      <motion.header variants={itemVariants} className="relative space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-3">
            <motion.h1
              className="bg-gradient-to-r from-white via-white to-[#3A8EF6] bg-clip-text text-4xl font-bold text-transparent lg:text-5xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {greeting}, {userName}!
              <motion.span
                className="ml-2 inline-block text-white"
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{
                  duration: 1.5,
                  delay: 1,
                  times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                👋
              </motion.span>
            </motion.h1>
            <motion.p
              className="max-w-md text-lg text-[#A0A6B2]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {formatDate(currentTime)} - Ready to continue your learning journey?
            </motion.p>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={handleAddNewGoal}
              className="flex items-center gap-2 rounded-xl border border-[#3A8EF6]/40 bg-gradient-to-r from-[#3A8EF6]/20 to-[#6B46C1]/20 px-4 py-2 shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="h-4 w-4 text-[#3A8EF6]" />
              <span className="font-medium text-[#3A8EF6]">New Goal</span>
            </motion.button>

            <motion.div
              className="flex items-center gap-3 rounded-2xl border border-[#5CF4A0]/40 bg-gradient-to-r from-[#5CF4A0]/20 to-[#3A8EF6]/20 px-6 py-3 shadow-lg shadow-[#5CF4A0]/10 backdrop-blur-xl"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="relative">
                <Zap className="h-5 w-5 text-[#5CF4A0]" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#5CF4A0] opacity-30 blur-md"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#5CF4A0]">12-day streak!</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <motion.section variants={itemVariants} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="hover:shadow-3xl group relative cursor-pointer overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-[#3A8EF6]/60 hover:shadow-lg"
            whileHover={{ scale: 1.03, y: -5 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 + index * 0.1 }}
          >
            <div className="relative z-10">
              <div className="mb-6 flex items-center justify-between">
                <motion.div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg transition-all duration-300 group-hover:shadow-xl`}
                  whileHover={{ rotate: 10 }}
                >
                  <stat.icon className="h-7 w-7 text-white" />
                </motion.div>
                <div className="text-right">
                  <motion.div
                    className="mb-1 text-3xl font-bold text-white"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="flex items-center justify-end gap-1">
                    <TrendingUp className="h-3 w-3 text-[#5CF4A0]" />
                    <span className="text-sm font-medium text-[#5CF4A0]">{stat.change}</span>
                  </div>
                </div>
              </div>
              <div className="font-medium text-[#A0A6B2]">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.section>

      <main className="grid gap-8 lg:grid-cols-3">
        <motion.div variants={itemVariants} className="space-y-6 lg:col-span-1">
          {/* ... Pomodoro Timer ... */}
          <section className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Pomodoro Timer</h3>
              <Clock className="h-6 w-6 text-[#3A8EF6]" />
            </div>
            <div className="space-y-6 text-center">
              <div className="mb-4 font-mono text-6xl font-bold text-white">{formattedTime}</div>
              <div className="mb-6 h-3 w-full rounded-full bg-white/10">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-[#3A8EF6] to-[#5CF4A0] transition-all duration-300"
                  style={{ width: `${sessionProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-center gap-3">
                {!isSessionActive ? (
                  <motion.button
                    onClick={handleStartTimer}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="h-4 w-4" /> Start
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handlePauseTimer}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Pause className="h-4 w-4" /> Pause
                  </motion.button>
                )}
                <motion.button
                  onClick={handleResetTimer}
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-gradient-to-r from-white/10 to-white/5 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="h-4 w-4" /> Reset
                </motion.button>
              </div>
              <div className="text-sm text-[#A0A6B2]">{currentSessionType} Session</div>
            </div>
          </section>

          {/* ... Quick Actions ... */}
          <section className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Quick Actions</h3>
              <Activity className="h-6 w-6 text-[#3A8EF6]" />
            </div>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.label}
                  onClick={action.action}
                  className="group flex w-full items-center gap-4 rounded-2xl border border-transparent bg-white/5 p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <motion.div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} shadow-lg transition-all duration-300 group-hover:shadow-xl`}
                    whileHover={{ rotate: 5 }}
                  >
                    <action.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-white transition-colors group-hover:text-[#3A8EF6]">
                      {action.label}
                    </div>
                    <div className="text-sm text-[#A0A6B2] transition-colors group-hover:text-[#3A8EF6]/70">
                      {action.description}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#A0A6B2] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#3A8EF6]" />
                </motion.button>
              ))}
            </div>
          </section>

          {/* ... Study Goals ... */}
          <section className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Study Goals</h3>
              <Target className="h-6 w-6 text-[#3A8EF6]" />
            </div>
            <div className="space-y-6">
              {studyGoals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="font-medium text-white">{goal.title}</span>
                    <span className="text-[#A0A6B2]">
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-white/10">
                    <motion.div
                      className="h-3 rounded-full bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6]"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(goal.current / goal.target) * 100}%`,
                      }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6 lg:col-span-2">
          {/* ... Upcoming Sessions ... */}
          <section className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Upcoming Sessions</h3>
              <Calendar className="h-6 w-6 text-[#3A8EF6]" />
            </div>
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  className={`rounded-2xl border p-6 transition-all duration-300 ${session.isCurrent ? 'border-[#3A8EF6]/40 bg-gradient-to-r from-[#3A8EF6]/20 to-[#6B46C1]/20' : 'border-white/20 bg-white/5'}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 0 15px rgba(58, 142, 246, 0.3)',
                  }}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-white">{session.subject}</h4>
                      <p className="text-sm text-[#A0A6B2]">{session.topic}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${session.tagColor}`}>
                      {session.type}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#3A8EF6]">{session.time}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ... AI Chat ... */}
          <section className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">AI Study Assistant</h3>
              <MessageCircle className="h-6 w-6 text-[#3A8EF6]" />
            </div>
            <div className="space-y-4">
              <div className="h-64 space-y-4 overflow-y-auto rounded-2xl bg-black/20 p-4">
                {chatMessages.map(msg => (
                  <motion.div
                    key={msg.id}
                    className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {msg.sender === 'ai' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1]">
                        <Brain className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.sender === 'user' ? 'rounded-br-none bg-blue-600 text-white' : 'rounded-bl-none bg-white/10 text-white/90'}`}
                    >
                      {msg.text}
                    </div>
                    {msg.sender === 'user' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSendChatMessage()}
                    placeholder="Ask me anything..."
                    className="w-full rounded-xl border border-white/20 bg-white/5 py-3 pl-4 pr-12 text-white placeholder:text-[#A0A6B2]/70 focus:outline-none focus:ring-2 focus:ring-[#3A8EF6]"
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0A6B2] hover:text-[#3A8EF6]"
                    aria-label="Get a suggestion"
                    type="button"
                  >
                    <Lightbulb className="h-5 w-5" />
                  </button>
                </div>
                <motion.button
                  onClick={handleSendChatMessage}
                  className="rounded-xl bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] p-3 text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </section>

          {/* ... Recent Activity & Motivation Quote ... */}
          <div className="grid gap-6 md:grid-cols-2">
            <section className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                <Activity className="h-5 w-5 text-[#3A8EF6]" />
              </div>
              <div className="space-y-4">
                {recentActivity.slice(0, 3).map((activity, index) => (
                  <motion.div
                    key={activity.title}
                    className="group flex items-center gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                      <activity.icon className="h-5 w-5 text-[#A0A6B2] group-hover:text-[#3A8EF6]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{activity.title}</p>
                      <p className="text-xs text-[#A0A6B2]">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
            <section className="flex flex-col items-center justify-center rounded-3xl border border-white/20 bg-gradient-to-br from-[#6B46C1]/20 to-[#3A8EF6]/20 p-8 text-center shadow-2xl backdrop-blur-xl">
              <blockquote className="text-md mb-3 italic text-white/90">&quot;{currentQuote.text}&quot;</blockquote>
              <cite className="text-sm text-white/60">— {currentQuote.author}</cite>
            </section>
          </div>
        </motion.div>
      </main>

      <motion.section
        variants={itemVariants}
        className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur-xl"
      >
        {/* ... Enhanced Progress Overview ... */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-2xl font-bold text-white">This Week&apos;s Progress</h3>
          <div className="flex items-center gap-3 rounded-full border border-[#5CF4A0]/30 bg-gradient-to-r from-[#5CF4A0]/20 to-[#3A8EF6]/20 px-4 py-2">
            <TrendingUp className="h-5 w-5 text-[#5CF4A0]" />
            <span className="font-semibold text-[#5CF4A0]">+15% from last week</span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {weeklyProgress.map((item, index) => (
            <motion.div
              key={item.label}
              className="group text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
            >
              <div className="relative mx-auto mb-6 h-32 w-32">
                {isClient && (
                  <motion.svg
                    viewBox="0 0 128 128"
                    className="h-32 w-32 -rotate-90 transition-transform duration-300 group-hover:scale-105"
                  >
                    <circle cx="64" cy="64" r="52" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="52"
                      stroke={`url(#${item.id})`}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="326.73"
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 326.73 }}
                      animate={{
                        strokeDashoffset: 326.73 - (item.percentage / 100) * 326.73,
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 1 + index * 0.2,
                        ease: 'easeOut',
                      }}
                      className="drop-shadow-lg"
                    />
                    <defs>
                      <linearGradient id={item.id} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={item.startColor} />
                        <stop offset="100%" stopColor={item.endColor} />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-2xl font-bold text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.5 + index * 0.2,
                      type: 'spring',
                    }}
                  >
                    {item.percentage}%
                  </motion.span>
                </div>
              </div>
              <div className="text-lg font-medium text-[#A0A6B2]">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
