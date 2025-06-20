'use client';

import { Calendar, Target, Clock, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export function StudyPlanSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [weekData, setWeekData] = useState<Array<{ day: string; hours: number; completed: boolean }>>([]);

  useEffect(() => {
    // Only run on client side
    setIsMounted(true);

    // Initialize with static data on client side
    setWeekData([
      { day: 'Mon', hours: 2.5, completed: true },
      { day: 'Tue', hours: 1.8, completed: true },
      { day: 'Wed', hours: 3.2, completed: true },
      { day: 'Thu', hours: 2.1, completed: false },
      { day: 'Fri', hours: 0, completed: false },
      { day: 'Sat', hours: 0, completed: false },
      { day: 'Sun', hours: 0, completed: false },
    ]);
  }, []);

  // Don't render anything during SSR or before client-side hydration
  if (!isMounted) {
    return null;
  }

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5CF4A0]/30 bg-gradient-to-r from-[#5CF4A0]/20 to-[#3A8EF6]/20 px-4 py-2">
            <Target className="h-4 w-4 text-[#5CF4A0]" />
            <span className="text-sm text-[#A0A6B2]">Smart Study Planning</span>
          </div>

          <h2 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
            Smarter Planning.
            <span className="block text-[#5CF4A0]">Higher Retention.</span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-[#A0A6B2]">
            Let AI create personalized study plans that adapt to your learning pace, track your progress, and keep you
            motivated with intelligent reminders.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Study Plan Generator */}
          <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#3A8EF6]/50">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1]">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Smart Study Plan</h3>
                <p className="text-sm text-[#A0A6B2]">AI-generated schedules</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-white">Biology Chapter 5</span>
                  <span className="text-xs text-[#5CF4A0]">Due in 3 days</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#A0A6B2]">
                  <Clock className="h-3 w-3" />
                  <span>Est. 4.5 hours</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-[#3A8EF6] to-[#5CF4A0]"></div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-white">Math Practice Set</span>
                  <span className="text-xs text-[#5CF4A0]">Today</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#A0A6B2]">
                  <Clock className="h-3 w-3" />
                  <span>Est. 2 hours</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-1/2 rounded-full bg-gradient-to-r from-[#3A8EF6] to-[#5CF4A0]"></div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-white">History Essay</span>
                  <span className="text-xs text-[#A0A6B2]">Next week</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#A0A6B2]">
                  <Clock className="h-3 w-3" />
                  <span>Est. 6 hours</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-1/4 rounded-full bg-gradient-to-r from-[#3A8EF6] to-[#5CF4A0]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#5CF4A0]/50">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#5CF4A0] to-[#3A8EF6]">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Progress Tracking</h3>
                <p className="text-sm text-[#A0A6B2]">Daily & weekly insights</p>
              </div>
            </div>

            {/* Weekly Progress */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="relative mx-auto mb-4 h-32 w-32">
                  <svg className="h-32 w-32 -rotate-90 transform">
                    <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(7.5 / 15) * 351.86} 351.86`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#5CF4A0" />
                        <stop offset="100%" stopColor="#3A8EF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">7.5</div>
                      <div className="text-xs text-[#A0A6B2]">hrs this week</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Breakdown */}
              <div className="grid grid-cols-7 gap-1">
                {weekData.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-1 text-xs text-[#A0A6B2]">{day.day}</div>
                    <div
                      className={`mx-auto h-12 w-6 rounded-sm ${
                        day.completed
                          ? 'bg-gradient-to-t from-[#5CF4A0] to-[#3A8EF6]'
                          : day.hours > 0
                            ? 'bg-gradient-to-t from-[#3A8EF6]/50 to-[#6B46C1]/50'
                            : 'bg-white/10'
                      }`}
                      style={{
                        height: `${Math.max(12, (day.hours / 3.5) * 48)}px`,
                      }}
                    ></div>
                    <div className="mt-1 text-xs text-[#A0A6B2]">{day.hours > 0 ? `${day.hours}h` : '-'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Reminders */}
          <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#6B46C1]/50">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6B46C1] to-[#5CF4A0]">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Nudges</h3>
                <p className="text-sm text-[#A0A6B2]">Smart reminders</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-[#5CF4A0]/30 bg-gradient-to-r from-[#5CF4A0]/20 to-[#3A8EF6]/20 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#5CF4A0]" />
                  <span className="text-sm font-medium text-white">Study Streak: 5 days! 🔥</span>
                </div>
                <p className="text-xs text-[#A0A6B2]">Keep it up! You&apos;re building great habits.</p>
              </div>

              <div className="rounded-xl border border-[#3A8EF6]/30 bg-gradient-to-r from-[#3A8EF6]/20 to-[#6B46C1]/20 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#3A8EF6]" />
                  <span className="text-sm font-medium text-white">Optimal Study Time</span>
                </div>
                <p className="text-xs text-[#A0A6B2]">Based on your patterns, 3-5 PM works best for you.</p>
              </div>

              <div className="rounded-xl border border-[#6B46C1]/30 bg-gradient-to-r from-[#6B46C1]/20 to-[#5CF4A0]/20 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-[#6B46C1]" />
                  <span className="text-sm font-medium text-white">Focus Reminder</span>
                </div>
                <p className="text-xs text-[#A0A6B2]">Biology exam in 5 days. Suggested: 30 min review.</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#A0A6B2]" />
                  <span className="text-sm font-medium text-white">Weekly Goal</span>
                </div>
                <p className="text-xs text-[#A0A6B2]">15 hours total - you&apos;re 50% there!</p>
                <div className="mt-2 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-1/2 rounded-full bg-gradient-to-r from-[#3A8EF6] to-[#5CF4A0]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
