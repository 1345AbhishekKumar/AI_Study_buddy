'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { useState, useEffect } from 'react';

export function FinalCTASection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#1a1f2e] to-[#0B0F19]">
        <div className="absolute inset-0 opacity-40">
          {/* Floating Particles */}
          <div className="absolute left-20 top-20 h-2 w-2 animate-pulse rounded-full bg-[#5CF4A0]"></div>
          <div className="absolute right-32 top-40 h-1 w-1 animate-pulse rounded-full bg-[#3A8EF6] delay-1000"></div>
          <div className="delay-2000 absolute bottom-32 left-1/4 h-1.5 w-1.5 animate-pulse rounded-full bg-[#6B46C1]"></div>
          <div className="delay-3000 absolute bottom-20 right-20 h-2 w-2 animate-pulse rounded-full bg-[#5CF4A0]"></div>
          <div className="delay-4000 absolute left-10 top-1/2 h-1 w-1 animate-pulse rounded-full bg-[#3A8EF6]"></div>
          <div className="delay-5000 absolute right-10 top-60 h-1.5 w-1.5 animate-pulse rounded-full bg-[#6B46C1]"></div>
        </div>

        {/* Aurora Effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-[#3A8EF6]/20 to-transparent blur-3xl"></div>
          <div className="delay-2000 absolute bottom-0 right-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-tl from-[#6B46C1]/20 to-transparent blur-3xl"></div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div
          className={`space-y-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5CF4A0]/30 bg-gradient-to-r from-[#5CF4A0]/20 to-[#3A8EF6]/20 px-6 py-3 backdrop-blur-sm">
            <Sparkles className="h-5 w-5 text-[#5CF4A0]" />
            <span className="font-medium text-[#A0A6B2]">Ready to Transform Your Learning?</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-5xl font-bold leading-tight text-white lg:text-7xl">
            Let AI Guide Your
            <span className="block bg-gradient-to-r from-[#3A8EF6] via-[#6B46C1] to-[#5CF4A0] bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h2>

          {/* Subheading */}
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-[#A0A6B2] lg:text-2xl">
            Join 20,000+ students who are already learning smarter, faster, and more effectively with their AI study
            companion.
          </p>

          {/* Benefits Quick List */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[#A0A6B2]">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#5CF4A0]" />
              <span>Instant AI feedback</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-[#3A8EF6]" />
              <span>Personalized study plans</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#6B46C1]" />
              <span>Smart progress tracking</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
            <Button
              size="lg"
              className="hover:shadow-3xl group rounded-2xl bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] px-12 py-6 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-[#2563eb] hover:to-[#5b21b6]"
            >
              Start Learning Smarter
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-2xl border-2 border-[#3A8EF6]/50 px-12 py-6 text-lg font-bold text-[#3A8EF6] backdrop-blur-sm transition-all duration-300 hover:bg-[#3A8EF6]/10"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="space-y-4 pt-8">
            <div className="flex items-center justify-center gap-8 text-sm text-[#A0A6B2]">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#5CF4A0]"></div>
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#3A8EF6]"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#6B46C1]"></div>
                <span>Setup in 2 minutes</span>
              </div>
            </div>

            <p className="text-sm text-[#A0A6B2]">Join the learning revolution. Your AI study buddy is waiting.</p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div
        className={`absolute left-20 top-20 transition-all delay-500 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#3A8EF6]/20 to-[#6B46C1]/20 backdrop-blur-sm">
          <Sparkles className="h-8 w-8 text-[#3A8EF6]" />
        </div>
      </div>

      <div
        className={`absolute bottom-20 right-20 transition-all delay-700 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#5CF4A0]/20 to-[#3A8EF6]/20 backdrop-blur-sm">
          <Target className="h-8 w-8 text-[#5CF4A0]" />
        </div>
      </div>
    </section>
  );
}
