'use client';

import { BarChart3, TrendingUp, Brain, Clock, Award, ArrowUp, ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

type ChartData = {
  subject: string;
  thisWeek: number;
  lastWeek: number;
  color: string;
}[];

export function AnalyticsSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [chartData, setChartData] = useState<ChartData>([]);

  useEffect(() => {
    // Only run on client side
    setIsMounted(true);

    // Initialize chart data
    setChartData([
      {
        subject: 'Biology',
        thisWeek: 85,
        lastWeek: 70,
        color: '#3A8EF6',
      },
      {
        subject: 'Mathematics',
        thisWeek: 75,
        lastWeek: 80,
        color: '#5CF4A0',
      },
      {
        subject: 'History',
        thisWeek: 60,
        lastWeek: 65,
        color: '#6B46C1',
      },
      {
        subject: 'Chemistry',
        thisWeek: 45,
        lastWeek: 40,
        color: '#F97316',
      },
      {
        subject: 'Physics',
        thisWeek: 35,
        lastWeek: 30,
        color: '#EF4444',
      },
    ]);
  }, []);

  // Don't render anything during SSR or before client-side hydration
  if (!isMounted) {
    return (
      <section className="bg-gradient-to-br from-[#1a1f2e] to-[#0B0F19] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="h-[600px] w-full animate-pulse rounded-3xl bg-white/5"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-[#1a1f2e] to-[#0B0F19] px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3A8EF6]/30 bg-gradient-to-r from-[#3A8EF6]/20 to-[#6B46C1]/20 px-4 py-2">
            <BarChart3 className="h-4 w-4 text-[#3A8EF6]" />
            <span className="text-sm text-[#A0A6B2]">Advanced Analytics</span>
          </div>

          <h2 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
            Visualize Your
            <span className="block bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-[#A0A6B2]">
            Get deep insights into your learning patterns, track your progress across subjects, and identify areas for
            improvement with AI-powered analytics.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur-xl">
            {/* Dashboard Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Learning Dashboard</h3>
                <p className="text-[#A0A6B2]">Week of Dec 11-17, 2023</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-full border border-[#5CF4A0]/30 bg-[#5CF4A0]/20 px-4 py-2">
                  <Award className="h-4 w-4 text-[#5CF4A0]" />
                  <span className="text-sm font-medium text-[#5CF4A0]">5-day streak!</span>
                </div>
                <div className="h-3 w-3 animate-pulse rounded-full bg-[#5CF4A0]"></div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
              {/* Key Metrics */}
              <div className="space-y-4 lg:col-span-1">
                {/* Study Time */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#3A8EF6]/50">
                  <div className="mb-2 flex items-center justify-between">
                    <Clock className="h-5 w-5 text-[#3A8EF6]" />
                    <div className="flex items-center gap-1 text-sm text-[#5CF4A0]">
                      <ArrowUp className="h-3 w-3" />
                      <span>+12%</span>
                    </div>
                  </div>
                  <div className="mb-1 text-2xl font-bold text-white">32.5h</div>
                  <div className="text-xs text-[#A0A6B2]">Total study time</div>
                </div>

                {/* Focus Score */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#5CF4A0]/50">
                  <div className="mb-2 flex items-center justify-between">
                    <Brain className="h-5 w-5 text-[#5CF4A0]" />
                    <div className="flex items-center gap-1 text-sm text-[#5CF4A0]">
                      <ArrowUp className="h-3 w-3" />
                      <span>+8%</span>
                    </div>
                  </div>
                  <div className="mb-1 text-2xl font-bold text-white">87%</div>
                  <div className="text-xs text-[#A0A6B2]">Focus score</div>
                </div>

                {/* Completion Rate */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#6B46C1]/50">
                  <div className="mb-2 flex items-center justify-between">
                    <Award className="h-5 w-5 text-[#6B46C1]" />
                    <div className="flex items-center gap-1 text-sm text-red-400">
                      <ArrowDown className="h-3 w-3" />
                      <span>-5%</span>
                    </div>
                  </div>
                  <div className="mb-1 text-2xl font-bold text-white">92%</div>
                  <div className="text-xs text-[#A0A6B2]">Goal completion</div>
                </div>

                {/* Topics Mastered */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#3A8EF6]/50">
                  <div className="mb-2 flex items-center justify-between">
                    <TrendingUp className="h-5 w-5 text-[#3A8EF6]" />
                    <div className="flex items-center gap-1 text-sm text-[#5CF4A0]">
                      <ArrowUp className="h-3 w-3" />
                      <span>+3</span>
                    </div>
                  </div>
                  <div className="mb-1 text-2xl font-bold text-white">24</div>
                  <div className="text-xs text-[#A0A6B2]">Topics mastered</div>
                </div>
              </div>

              {/* Study Time Chart */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:col-span-2">
                <div className="mb-6 flex items-center justify-between">
                  <h4 className="font-semibold text-white">Study Time Breakdown</h4>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#3A8EF6]"></div>
                    <span className="text-xs text-[#A0A6B2]">This week</span>
                    <div className="ml-4 h-3 w-3 rounded-full bg-[#6B46C1]"></div>
                    <span className="text-xs text-[#A0A6B2]">Last week</span>
                  </div>
                </div>

                {/* Chart Bars */}
                <div className="space-y-4">
                  {chartData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-white">{item.subject}</span>
                        <span className="text-[#A0A6B2]">{Math.round((item.thisWeek / 85) * 100)}%</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: '100%',
                              transform: `scaleX(${item.thisWeek / 100})`,
                              transformOrigin: 'left',
                              background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`,
                              willChange: 'transform',
                            }}
                          />
                        </div>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-2 rounded-full bg-white/30 transition-all duration-1000 ease-out"
                            style={{
                              width: '100%',
                              transform: `scaleX(${item.lastWeek / 100})`,
                              transformOrigin: 'left',
                              willChange: 'transform',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Insights */}
              <div className="space-y-4 lg:col-span-1">
                {/* Weak Areas */}
                <div className="rounded-xl border border-red-500/30 bg-gradient-to-br from-red-500/20 to-orange-500/20 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-red-400" />
                    <span className="text-sm font-medium text-white">Needs Attention</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-red-300">Organic Chemistry</div>
                    <div className="text-xs text-red-300">Calculus Integration</div>
                    <div className="text-xs text-red-300">World War II Timeline</div>
                  </div>
                </div>

                {/* Strong Areas */}
                <div className="rounded-xl border border-[#5CF4A0]/30 bg-gradient-to-br from-[#5CF4A0]/20 to-[#3A8EF6]/20 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#5CF4A0]" />
                    <span className="text-sm font-medium text-white">Strengths</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-[#5CF4A0]">Cell Biology</div>
                    <div className="text-xs text-[#5CF4A0]">Algebra</div>
                    <div className="text-xs text-[#5CF4A0]">Renaissance Art</div>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="rounded-xl border border-[#6B46C1]/30 bg-gradient-to-br from-[#6B46C1]/20 to-[#3A8EF6]/20 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Brain className="h-4 w-4 text-[#6B46C1]" />
                    <span className="text-sm font-medium text-white">AI Suggests</span>
                  </div>
                  <div className="space-y-2 text-xs text-[#A0A6B2]">
                    <div>• Review organic chem basics</div>
                    <div>• Practice integration problems</div>
                    <div>• Use timeline visualization</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Over Time */}
            <div className="mt-8 border-t border-white/10 pt-8">
              <h4 className="mb-4 font-semibold text-white">Learning Progress (Last 30 Days)</h4>
              <div className="flex h-32 items-end gap-2">
                {Array.from({ length: 30 }, (_, i) => {
                  const height = Math.random() * 80 + 20;
                  const isToday = i === 29;
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-t transition-all duration-300 hover:opacity-80 ${
                        isToday
                          ? 'bg-gradient-to-t from-[#5CF4A0] to-[#3A8EF6]'
                          : 'bg-gradient-to-t from-white/20 to-white/10'
                      }`}
                      style={{ height: `${height}%` }}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
