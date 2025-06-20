'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CheckCircle, Target, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

function FloatingParticles({ count = 10 }: { count?: number }) {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ id: number; left: number; top: number; duration: number; delay: number }>
  >([]);

  useEffect(() => {
    setIsMounted(true);
    // Generate particles only on client side
    setParticles(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      }))
    );
  }, [count]);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 opacity-30">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6]"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function StudyPlan() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-20 sm:px-6 lg:px-8">
      <FloatingParticles count={10} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-5xl font-bold text-white">
            Turn goals into{' '}
            <span className="bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6] bg-clip-text text-transparent">
              personalized study plans
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            AI creates adaptive schedules that fit your life, learning pace, and goals. Stay motivated with smart
            reminders and progress tracking.
          </p>
        </div>

        <div className="mx-auto max-w-5xl rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="mb-6 text-2xl font-bold text-white">This Week&apos;s Study Plan</h3>
              <div className="space-y-4">
                {[
                  {
                    day: 'Monday',
                    topic: 'Quantum Wave Functions',
                    duration: '45 min',
                    status: 'completed',
                  },
                  {
                    day: 'Tuesday',
                    topic: 'Schrödinger Equation',
                    duration: '60 min',
                    status: 'completed',
                  },
                  {
                    day: 'Wednesday',
                    topic: 'Particle in a Box',
                    duration: '30 min',
                    status: 'current',
                  },
                  {
                    day: 'Thursday',
                    topic: 'Quantum Tunneling',
                    duration: '45 min',
                    status: 'upcoming',
                  },
                  {
                    day: 'Friday',
                    topic: 'Review & Practice',
                    duration: '90 min',
                    status: 'upcoming',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between rounded-xl p-4 backdrop-blur-sm ${
                      item.status === 'completed'
                        ? 'border border-[#5CF4A0]/30 bg-[#5CF4A0]/20'
                        : item.status === 'current'
                          ? 'border border-[#3A8EF6]/30 bg-[#3A8EF6]/20'
                          : 'border border-white/10 bg-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          item.status === 'completed'
                            ? 'bg-[#5CF4A0]'
                            : item.status === 'current'
                              ? 'bg-[#3A8EF6]'
                              : 'bg-gray-400'
                        }`}
                      />
                      <div>
                        <p className="font-medium text-white">{item.topic}</p>
                        <p className="text-sm text-gray-300">
                          {item.day} • {item.duration}
                        </p>
                      </div>
                    </div>
                    {item.status === 'completed' && <CheckCircle className="h-5 w-5 text-[#5CF4A0]" />}
                    {item.status === 'current' && (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] text-white hover:from-[#2563eb] hover:to-[#5b21b6]"
                      >
                        Continue
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border border-white/10 bg-white/5 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center space-x-3">
                    <Target className="h-6 w-6 text-[#3A8EF6]" />
                    <h4 className="font-semibold text-white">Daily Goals</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Study Time</span>
                      <span className="font-medium text-white">45/60 min</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1]"
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-white/10 bg-white/5 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center space-x-3">
                    <Zap className="h-6 w-6 text-[#5CF4A0]" />
                    <h4 className="font-semibold text-white">Streak</h4>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">12</div>
                    <div className="text-gray-300">days in a row</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
