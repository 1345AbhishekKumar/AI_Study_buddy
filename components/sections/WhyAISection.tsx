'use client';

import { User, Bot, ArrowRight, Heart, Zap, Target, BookOpen } from 'lucide-react';

export function WhyAISection() {
  return (
    <section id="about" className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6B46C1]/30 bg-gradient-to-r from-[#6B46C1]/20 to-[#5CF4A0]/20 px-4 py-2">
            <Heart className="h-4 w-4 text-[#6B46C1]" />
            <span className="text-sm text-[#A0A6B2]">The AI Advantage</span>
          </div>

          <h2 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
            Why Study Alone When You Can Have
            <span className="block bg-gradient-to-r from-[#6B46C1] to-[#5CF4A0] bg-clip-text text-transparent">
              An AI Companion?
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-[#A0A6B2]">
            Transform your learning experience from isolated studying to interactive, personalized education with your
            dedicated AI study buddy.
          </p>
        </div>

        {/* Timeline Comparison */}
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Before - Study Alone */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="mb-4 inline-flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-500 to-gray-600">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Studying Alone</h3>
                </div>
                <p className="text-[#A0A6B2]">The traditional, isolated learning experience</p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: BookOpen,
                    title: 'Manual Organization',
                    description: 'Struggle to organize notes and materials across different subjects and sources.',
                    color: 'gray',
                  },
                  {
                    icon: Target,
                    title: 'Guessing Learning Gaps',
                    description: 'Difficult to identify weak areas without clear feedback and analysis.',
                    color: 'gray',
                  },
                  {
                    icon: Zap,
                    title: 'Inconsistent Motivation',
                    description: 'No personalized reminders or encouragement to maintain study habits.',
                    color: 'gray',
                  },
                ].map((item, index) => (
                  <div key={index} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-500/30">
                        <item.icon className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold text-white">{item.title}</h4>
                        <p className="text-sm leading-relaxed text-[#A0A6B2]">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* After - With AI Buddy */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="mb-4 inline-flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1]">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">With AI Buddy</h3>
                </div>
                <p className="text-[#A0A6B2]">Intelligent, personalized learning companion</p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: BookOpen,
                    title: 'Smart Auto-Organization',
                    description: 'AI automatically categorizes, summarizes, and connects your learning materials.',
                    color: 'blue',
                    gradient: 'from-[#3A8EF6] to-[#6B46C1]',
                  },
                  {
                    icon: Target,
                    title: 'Precision Gap Analysis',
                    description: 'AI identifies exactly where you need improvement with actionable recommendations.',
                    color: 'green',
                    gradient: 'from-[#5CF4A0] to-[#3A8EF6]',
                  },
                  {
                    icon: Zap,
                    title: 'Adaptive Motivation System',
                    description: 'Personalized encouragement, streaks, and reminders that adapt to your schedule.',
                    color: 'purple',
                    gradient: 'from-[#6B46C1] to-[#5CF4A0]',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-[#3A8EF6]/50"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`h-10 w-10 bg-gradient-to-br ${item.gradient} flex shrink-0 items-center justify-center rounded-xl`}
                      >
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold text-white">{item.title}</h4>
                        <p className="text-sm leading-relaxed text-[#A0A6B2]">{item.description}</p>
                      </div>
                    </div>

                    {/* Glow effect */}
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#3A8EF6]/10 to-[#6B46C1]/10 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Central Arrow */}
          <div className="my-12 flex justify-center">
            <div className="rounded-full bg-gradient-to-r from-[#3A8EF6] to-[#5CF4A0] p-4 shadow-lg">
              <ArrowRight className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Benefits Summary */}
          <div className="mt-16 text-center">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-3">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1]">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">Personalized Support</h4>
                <p className="text-[#A0A6B2]">
                  AI adapts to your learning style, pace, and preferences for optimal results.
                </p>
              </div>

              <div className="space-y-3">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5CF4A0] to-[#3A8EF6]">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">Real-time Feedback</h4>
                <p className="text-[#A0A6B2]">Get instant insights, corrections, and suggestions as you learn.</p>
              </div>

              <div className="space-y-3">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6B46C1] to-[#5CF4A0]">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">Goal Achievement</h4>
                <p className="text-[#A0A6B2]">Stay on track with smart planning and motivation that never stops.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
