'use client';

import AnimatedBackground from '@/components/animations/AnimatedBackground';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Target,
  Brain,
  Award,
  Calendar,
  BookOpen,
  ArrowUp,
  ArrowDown,
  Activity,
  Coffee,
  Flame,
  ChevronRight,
  Star,
  CheckCircle,
  Circle,
} from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';

// --- Type Definitions for Data Structures ---
type Day = {
  date: string;
  duration: number;
  color: string;
  hoverColor: string;
  dayOfMonth: number;
  isCurrentDay: boolean;
};

type StatCard = {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
  bgColor: string;
  textColor: string;
};

type WeeklyDay = {
  day: string;
  hours: number;
  focus: number;
  sessions: number;
};

type Subject = {
  subject: string;
  hours: number;
  percentage: number;
  color: string;
};

type Goal = {
  id: number;
  title: string;
  progress: number;
  target: number;
  subject: string;
  completed: number;
  total: number;
  dueDate: string;
};

type Session = {
  id: number;
  subject: string;
  duration: number;
  date: string;
  xp: number;
  color: string;
};

type Insight = {
  type: 'strength' | 'improvement' | 'recommendation';
  title: string;
  items: string[];
  icon: React.ElementType;
  color: string;
  iconColor: string;
};

// --- Mock Data with Types ---
const statsCards: StatCard[] = [
  {
    icon: Clock,
    label: 'Total Study Time',
    value: '127.5h',
    change: '+12%',
    trend: 'up',
    color: 'from-[#3A8EF6] to-[#6B46C1]',
    bgColor: 'bg-blue-500/20',
    textColor: 'text-blue-400',
  },
  {
    icon: Calendar,
    label: 'Active Days',
    value: '23',
    change: '+8%',
    trend: 'up',
    color: 'from-[#5CF4A0] to-[#3A8EF6]',
    bgColor: 'bg-green-500/20',
    textColor: 'text-green-400',
  },
  {
    icon: Brain,
    label: 'AI Chat Sessions',
    value: '89',
    change: '+15%',
    trend: 'up',
    color: 'from-[#6B46C1] to-[#5CF4A0]',
    bgColor: 'bg-purple-500/20',
    textColor: 'text-purple-400',
  },
  {
    icon: BookOpen,
    label: 'Resources Studied',
    value: '34',
    change: '-3%',
    trend: 'down',
    color: 'from-[#F97316] to-[#EF4444]',
    bgColor: 'bg-orange-500/20',
    textColor: 'text-orange-400',
  },
];

const weeklyData: WeeklyDay[] = [
  { day: 'Mon', hours: 3.5, focus: 85, sessions: 2 },
  { day: 'Tue', hours: 2.8, focus: 78, sessions: 1 },
  { day: 'Wed', hours: 4.2, focus: 92, sessions: 3 },
  { day: 'Thu', hours: 3.1, focus: 88, sessions: 2 },
  { day: 'Fri', hours: 2.5, focus: 75, sessions: 1 },
  { day: 'Sat', hours: 1.8, focus: 70, sessions: 1 },
  { day: 'Sun', hours: 2.2, focus: 82, sessions: 2 },
];

const subjectData: Subject[] = [
  { subject: 'Biology', hours: 45, percentage: 35, color: '#3A8EF6' },
  { subject: 'Chemistry', hours: 32, percentage: 25, color: '#5CF4A0' },
  { subject: 'Physics', hours: 28, percentage: 22, color: '#6B46C1' },
  { subject: 'Mathematics', hours: 23, percentage: 18, color: '#F97316' },
];

const goals: Goal[] = [
  {
    id: 1,
    title: 'Complete 5 math exercises',
    progress: 80,
    target: 100,
    subject: 'Mathematics',
    completed: 4,
    total: 5,
    dueDate: '2 days left',
  },
  {
    id: 2,
    title: 'Read 3 research papers',
    progress: 33,
    target: 100,
    subject: 'Research',
    completed: 1,
    total: 3,
    dueDate: '5 days left',
  },
  {
    id: 3,
    title: 'Solve 10 physics problems',
    progress: 40,
    target: 100,
    subject: 'Physics',
    completed: 4,
    total: 10,
    dueDate: '1 week left',
  },
];

const recentSessions: Session[] = [
  {
    id: 1,
    subject: 'Biology',
    duration: 95,
    date: '2 hours ago',
    xp: 24,
    color: '#3A8EF6',
  },
  {
    id: 2,
    subject: 'Chemistry',
    duration: 130,
    date: '1 day ago',
    xp: 33,
    color: '#5CF4A0',
  },
  {
    id: 3,
    subject: 'Physics',
    duration: 60,
    date: '2 days ago',
    xp: 15,
    color: '#6B46C1',
  },
  {
    id: 4,
    subject: 'Mathematics',
    duration: 90,
    date: '3 days ago',
    xp: 23,
    color: '#F97316',
  },
];

const insights: Insight[] = [
  {
    type: 'strength',
    title: 'Strong Performance',
    items: ['Biology concepts mastery', 'Consistent study schedule', 'Excellent note organization'],
    icon: Award,
    color: 'border-[#5CF4A0]/30',
    iconColor: 'text-[#5CF4A0]',
  },
  {
    type: 'improvement',
    title: 'Areas for Growth',
    items: ['Physics formula retention', 'Time management skills', 'Regular review sessions'],
    icon: Target,
    color: 'border-red-400/30',
    iconColor: 'text-red-400',
  },
  {
    type: 'recommendation',
    title: 'AI Recommendations',
    items: ['Study physics 30min daily', 'Use spaced repetition method', 'Take breaks every 45 minutes'],
    icon: Brain,
    color: 'border-[#3A8EF6]/30',
    iconColor: 'text-[#3A8EF6]',
  },
];

// --- Components ---

const ActivityCalendar = () => {
  const [hoveredDay, setHoveredDay] = useState<Day | null>(null);

  const days = useMemo(() => {
    const dayArray: Day[] = [];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 34);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split('T')[0];
      const intensity = Math.random();
      const duration = Math.floor(intensity * 180);

      let color = 'bg-white/5';
      let hoverColor = 'hover:bg-white/10';

      if (duration > 0 && duration <= 60) {
        color = 'bg-[#5CF4A0]/30';
        hoverColor = 'hover:bg-[#5CF4A0]/40';
      }
      if (duration > 60 && duration <= 120) {
        color = 'bg-[#5CF4A0]/60';
        hoverColor = 'hover:bg-[#5CF4A0]/70';
      }
      if (duration > 120) {
        color = 'bg-[#5CF4A0]';
        hoverColor = 'hover:bg-[#5CF4A0]/90';
      }

      const dayOfMonth = d.getDate();
      const isCurrentDay = new Date().toDateString() === d.toDateString();

      dayArray.push({
        date: dateString,
        duration,
        color,
        hoverColor,
        dayOfMonth,
        isCurrentDay,
      });
    }
    return dayArray;
  }, []);

  const weekRows = [];
  for (let i = 0; i < days.length; i += 7) {
    weekRows.push(days.slice(i, i + 7));
  }

  return (
    <div className="space-y-6">
      <div className="mb-2 grid grid-cols-7 text-xs text-[#A0A6B2]">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {weekRows.map((week, weekIndex) => (
          <div key={`week-${weekIndex}`} className="grid grid-cols-7 gap-2">
            {week.map(day => (
              <motion.div
                key={day.date}
                className={`aspect-square rounded-lg ${day.color} ${day.hoverColor} relative cursor-pointer border border-white/10 transition-all duration-300 ${day.isCurrentDay ? 'ring-2 ring-[#3A8EF6] ring-offset-2 ring-offset-[#0A0A0A]' : ''}`}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute left-1 top-1 text-[10px] text-white opacity-60">{day.dayOfMonth}</span>
                <AnimatePresence>
                  {hoveredDay?.date === day.date && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -top-12 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black/90 px-2 py-1 text-xs text-white"
                    >
                      {day.duration > 0 ? `${day.duration} min` : 'No study'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 text-xs text-[#A0A6B2]">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="h-3 w-3 rounded bg-white/5"></div>
          <div className="h-3 w-3 rounded bg-[#5CF4A0]/30"></div>
          <div className="h-3 w-3 rounded bg-[#5CF4A0]/60"></div>
          <div className="h-3 w-3 rounded bg-[#5CF4A0]"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

const PerformanceMetrics = () => {
  const metrics = [
    {
      label: 'Current Streak',
      value: '12 days',
      icon: Flame,
      color: '#F97316',
    },
    {
      label: 'Longest Streak',
      value: '18 days',
      icon: Award,
      color: '#5CF4A0',
    },
    { label: 'Days Off', value: '3 days', icon: Coffee, color: '#A0A6B2' },
    { label: 'Consistency', value: '87%', icon: Activity, color: '#3A8EF6' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          className="rounded-xl border border-white/20 bg-gradient-to-br from-white/5 to-white/10 p-4 text-center backdrop-blur-xl transition-all duration-300 hover:border-[#3A8EF6]/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="mb-2 flex items-center justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <metric.icon className="h-4 w-4" style={{ color: metric.color }} />
            </div>
          </div>
          <div className="text-lg font-bold text-white">{metric.value}</div>
          <div className="text-xs text-[#A0A6B2]">{metric.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

const GoalsContent = () => (
  <div className="space-y-3">
    {goals.map((goal, index) => (
      <motion.div
        key={goal.id}
        className="rounded-xl bg-white/5 p-4"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {goal.progress >= 100 ? (
              <CheckCircle className="h-5 w-5 text-[#5CF4A0]" />
            ) : (
              <Circle className="h-5 w-5 text-[#A0A6B2]" />
            )}
            <span className="text-sm font-medium text-white">{goal.title}</span>
          </div>
          <div className="text-xs text-[#A0A6B2]">{goal.dueDate}</div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#A0A6B2]">
              {goal.completed}/{goal.total} completed
            </span>
            <span className="font-medium text-white">{goal.progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/10">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-[#3A8EF6] to-[#5CF4A0]"
              initial={{ width: 0 }}
              animate={{ width: `${goal.progress}%` }}
              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
            />
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

const RecentSessionsContent = () => (
  <div className="space-y-3">
    {recentSessions.map((session, index) => (
      <motion.div
        key={session.id}
        className="rounded-xl bg-white/5 p-4"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: session.color }} />
            <div>
              <div className="text-sm font-medium text-white">{session.subject}</div>
              <div className="text-xs text-[#A0A6B2]">{session.date}</div>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-sm font-medium text-white">{session.duration} min</div>
            <div className="flex items-center justify-end gap-1 text-xs text-[#A0A6B2]">
              <Star className="h-3 w-3 text-yellow-400" />
              <span>+{session.xp} XP</span>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

const TrackProgress = () => {
  const [activeTab, setActiveTab] = useState('goals');
  const tabs = [
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'sessions', label: 'Sessions', icon: Clock },
  ];

  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Track Progress</h3>
        <div className="flex rounded-xl bg-black/20 p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${activeTab === tab.id ? '' : 'text-[#A0A6B2] hover:bg-white/5'} relative rounded-lg px-3 py-1.5 text-sm font-medium text-white transition-colors duration-300`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute inset-0 rounded-lg bg-white/10"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <tab.icon className="h-4 w-4" /> {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'goals' ? <GoalsContent /> : <RecentSessionsContent />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function AnalyticsPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 dark:from-gray-900/50 dark:via-transparent dark:to-gray-900/50 pointer-events-none z-0">
        <AnimatedBackground />
      </div>
      <div className="mx-auto max-w-7xl space-y-8 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 text-center"
        >
          <div className="relative inline-block">
            <h1 className="bg-gradient-to-r from-[#3A8EF6] via-[#5CF4A0] to-[#6B46C1] bg-clip-text text-4xl font-bold text-transparent lg:text-5xl">
              Analytics Overview
            </h1>
            <div className="absolute inset-x-0 -bottom-2 h-1 rounded-full bg-gradient-to-r from-[#3A8EF6] via-[#5CF4A0] to-[#6B46C1] opacity-70"></div>
          </div>
          <p className="mx-auto max-w-2xl text-lg text-[#A0A6B2]">
            Track your learning progress with intelligent insights and beautiful visualizations
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <select className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-xl focus:border-[#3A8EF6]/50 focus:outline-none">
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#3A8EF6]/50"
              whileHover={{ scale: 1.02, y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={`h-12 w-12 bg-gradient-to-br ${stat.color} flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <motion.div
                  className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-[#5CF4A0]' : 'text-red-400'}`}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.trend === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  <span className="font-medium">{stat.change}</span>
                </motion.div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-[#A0A6B2]">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PerformanceMetrics />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl lg:col-span-2"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Weekly Study Pattern</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#3A8EF6]"></div>
                  <span className="text-[#A0A6B2]">Study Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#5CF4A0]"></div>
                  <span className="text-[#A0A6B2]">Focus Score</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <motion.div
                  key={day.day}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="w-12 font-medium text-white">{day.day}</span>
                    <span className="text-[#A0A6B2]">{day.hours}h</span>
                    <span className="text-[#5CF4A0]">{day.focus}%</span>
                    <span className="text-[#A0A6B2]">{day.sessions} sessions</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-2 flex-1 rounded-full bg-white/10">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1]"
                        initial={{ width: 0 }}
                        animate={{ width: `${(day.hours / 5) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                    <div className="h-2 flex-1 rounded-full bg-white/10">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6]"
                        initial={{ width: 0 }}
                        animate={{ width: `${day.focus}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl"
          >
            <h3 className="mb-6 text-xl font-bold text-white">Subject Distribution</h3>
            {/* <div className="relative w-40 h-40 mx-auto mb-6">
              {isClient && (
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="60" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="none" />
                  {subjectData.map((subject, index) => {
                    const circumference = 2 * Math.PI * 60;
                    const strokeDasharray = `${(subject.percentage / 100) * circumference} ${circumference}`;
                    const strokeDashoffset = -subjectData.slice(0, index).reduce((acc, s) => acc + (s.percentage / 100) * circumference, 0);
                    return (<motion.circle key={subject.subject} cx="80" cy="80" r="60" stroke={subject.color} strokeWidth="12" fill="none" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} strokeLinecap="round" initial={{ strokeDasharray: `0 ${circumference}` }} animate={{ strokeDasharray }} transition={{ duration: 1, delay: 0.5 + index * 0.2 }} />);
                  })}
                </svg>
              )}
              <div className="absolute inset-0 flex items-center justify-center"><div className="text-center"><div className="text-2xl font-bold text-white">128h</div><div className="text-xs text-[#A0A6B2]">Total</div></div></div>
            </div> */}
            <div className="relative mx-auto mb-6 h-40 w-40">
              {isClient && (
                <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160">
                  {/* Background Circle */}
                  <circle cx="80" cy="80" r="60" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="none" />
                  {/* Foreground Segments */}
                  {subjectData.map((subject, index) => {
                    const radius = 60;
                    const circumference = 2 * Math.PI * radius;
                    const dashLength = (subject.percentage / 100) * circumference;
                    const strokeDasharray = `${dashLength} ${circumference}`;
                    const offset = subjectData
                      .slice(0, index)
                      .reduce((acc, s) => acc + (s.percentage / 100) * circumference, 0);

                    return (
                      <motion.circle
                        key={subject.subject}
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke={subject.color}
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={-offset}
                        strokeLinecap="butt" // use "butt" to avoid visible spacing gaps
                        initial={{
                          strokeDasharray: `0 ${circumference}`,
                        }}
                        animate={{
                          strokeDasharray,
                        }}
                        transition={{
                          duration: 1,
                          delay: 0.5 + index * 0.2,
                        }}
                      />
                    );
                  })}
                </svg>
              )}

              {/* Centered Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">128h</div>
                  <div className="text-xs text-[#A0A6B2]">Total</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {subjectData.map((subject, index) => (
                <motion.div
                  key={subject.subject}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: subject.color }} />
                    <span className="text-sm text-white">{subject.subject}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{subject.hours}h</div>
                    <div className="text-xs text-[#A0A6B2]">{subject.percentage}%</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Activity Calendar and Unified Progress Tracker */}
        <div className="grid gap-8 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl lg:col-span-2"
          >
            <h3 className="mb-6 text-xl font-bold text-white">Study Activity</h3>
            <ActivityCalendar />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <TrackProgress />
          </motion.div>
        </div>

        {/* AI Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="mb-6 text-center text-2xl font-bold text-white">AI Generated Insights</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.type}
                className={`rounded-2xl border bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl ${insight.color} transition-all duration-300 hover:border-[#3A8EF6]/50`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/10`}>
                    <insight.icon className={`h-5 w-5 ${insight.iconColor}`} />
                  </div>
                  <h4 className="text-lg font-semibold text-white">{insight.title}</h4>
                </div>
                <ul className="space-y-2">
                  {insight.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm text-[#A0A6B2]">
                      <ChevronRight className={`mt-0.5 h-4 w-4 shrink-0 ${insight.iconColor}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
