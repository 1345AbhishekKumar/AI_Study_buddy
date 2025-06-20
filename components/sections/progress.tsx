'use client';

import { motion } from 'framer-motion';
import { Clock, TrendingUp, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

type Particle = {
  left: string;
  top: string;
  duration: number;
  delay: number;
};

export default function ProgressAnalyticsSection() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random positions on client side only
    setParticles(
      Array.from({ length: 10 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-20 sm:px-6 lg:px-8">
      {/* Floating Particles */}
      <div className="absolute inset-0 opacity-30">
        {particles.map(({ left, top, duration, delay }, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6]"
            style={{
              left,
              top,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
            <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-xl font-bold text-white">Learning Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-gray-300">Quantum Mechanics</span>
                    <span className="font-medium text-white">85%</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-white/10">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1]"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-gray-300">Thermodynamics</span>
                    <span className="font-medium text-white">62%</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-white/10">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6]"
                      style={{ width: '62%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                <Clock className="mx-auto mb-2 h-6 w-6 text-[#3A8EF6]" />
                <div className="text-2xl font-bold text-white">24h</div>
                <div className="text-sm text-gray-300">This week</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                <TrendingUp className="mx-auto mb-2 h-6 w-6 text-[#5CF4A0]" />
                <div className="text-2xl font-bold text-white">+15%</div>
                <div className="text-sm text-gray-300">Improvement</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-5xl font-bold text-white">
              See your progress.{' '}
              <span className="bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6] bg-clip-text text-transparent">
                Stay motivated.
              </span>
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-gray-300">
              StudyBuddy learns with you, showing how far you&apos;ve come and adapting to help you reach your goals
              faster.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-[#5CF4A0]" />
                <span className="text-lg text-gray-300">Real-time progress tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-[#5CF4A0]" />
                <span className="text-lg text-gray-300">Adaptive difficulty adjustment</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-[#5CF4A0]" />
                <span className="text-lg text-gray-300">Personalized insights & tips</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
