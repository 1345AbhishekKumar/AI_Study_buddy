'use client';

import { AnimatedText, TypewriterText, GradientText } from '@/components/animations/TextAnimation';
import { WebGLGradient } from '@/components/animations/WebGLGradient';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Brain, FileText, Youtube, Globe, Zap, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

function FloatingParticles() {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; left: number; top: number }>>([]);

  useEffect(() => {
    setIsMounted(true);
    // Generate particles on client side only
    setParticles(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
      }))
    );
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 opacity-30">
      {particles.map(particle => {
        // Generate random values for animation
        const duration = 3 + Math.random() * 2;
        const delay = Math.random() * 2;
        const yOffset = -15 - Math.random() * 10; // Random height between -15 and -25

        return (
          <motion.div
            key={particle.id}
            className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6]"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            initial={{ y: 0, opacity: 0.3, scale: 1 }}
            animate={{
              y: yOffset,
              opacity: 1,
              scale: 1.2,
            }}
            transition={{
              y: {
                duration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay,
              },
              opacity: {
                duration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay,
              },
              scale: {
                duration: duration * 0.75,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay,
              },
            }}
          />
        );
      })}
    </div>
  );
}

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 dark:from-gray-900/50 dark:via-transparent dark:to-gray-900/50" />
      </section>
    );
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
      {/* WebGL Background */}
      <div className="absolute inset-0">
        <WebGLGradient />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 dark:from-gray-900/50 dark:via-transparent dark:to-gray-900/50">
        <FloatingParticles />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <AnimatedText delay={0.2}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm dark:border-gray-700/30 dark:bg-gray-800/30">
                <Zap className="h-4 w-4 text-[#5CF4A0]" />
                <span className="text-sm text-gray-700 dark:text-gray-300">AI-Powered Learning Revolution</span>
              </div>
            </AnimatedText>

            <div className="space-y-4">
              <AnimatedText delay={0.4}>
                <h1 className="text-5xl font-bold leading-tight text-gray-900 dark:text-white lg:text-7xl">
                  Your Personalized
                </h1>
              </AnimatedText>
              <AnimatedText delay={0.6}>
                <h1 className="text-5xl font-bold leading-tight lg:text-7xl">
                  <GradientText>AI Study Buddy</GradientText>
                </h1>
              </AnimatedText>
            </div>

            <AnimatedText delay={0.8}>
              <TypewriterText
                text="Learn faster, retain better, and stay accountable — all powered by smart AI that adapts to your unique learning style."
                className="max-w-lg text-xl leading-relaxed text-gray-600 dark:text-gray-300"
                delay={1}
              />
            </AnimatedText>
          </div>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="rounded-xl bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:from-[#2563eb] hover:to-[#5b21b6] hover:shadow-xl"
              >
                Try for Free
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl border-2 border-[#3A8EF6]/50 px-8 py-4 font-semibold text-[#3A8EF6] backdrop-blur-sm transition-all duration-300 hover:bg-[#3A8EF6]/10"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center gap-6 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1] dark:border-gray-900"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.2 + i * 0.1, duration: 0.3 }}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Trusted by 20K+ learners</span>
            </div>
          </motion.div>
        </div>

        {/* Right Visual */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="relative">
            <motion.div
              className="relative rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl dark:border-gray-700/20 dark:bg-gray-800/10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Central AI Brain */}
              <div className="mb-8 flex items-center justify-center">
                <div className="relative">
                  <div className="flex h-32 w-32 animate-pulse items-center justify-center rounded-full bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1] shadow-2xl">
                    <Brain className="h-16 w-16 text-white" />
                  </div>
                  {/* Orbiting Icons */}
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-500/30 bg-red-500/20 backdrop-blur-sm">
                        <Youtube className="h-6 w-6 text-red-400" />
                      </div>
                    </div>
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/20 backdrop-blur-sm">
                        <FileText className="h-6 w-6 text-blue-400" />
                      </div>
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-green-500/30 bg-green-500/20 backdrop-blur-sm">
                        <Globe className="h-6 w-6 text-green-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: 'Smart Analysis',
                    desc: 'AI extracts key insights',
                    color: 'from-[#5CF4A0] to-[#3A8EF6]',
                  },
                  {
                    title: 'Progress Tracking',
                    desc: 'Monitor your growth',
                    color: 'from-[#3A8EF6] to-[#6B46C1]',
                  },
                  {
                    title: 'Goal Setting',
                    desc: 'Personalized targets',
                    color: 'from-[#6B46C1] to-[#5CF4A0]',
                  },
                  {
                    title: 'AI Chat',
                    desc: 'Interactive learning',
                    color: 'from-[#5CF4A0] to-[#6B46C1]',
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#3A8EF6]/50"
                  >
                    <div
                      className={`mb-1 bg-gradient-to-r text-sm font-semibold ${feature.color} bg-clip-text text-transparent`}
                    >
                      {feature.title}
                    </div>
                    <div className="text-xs text-gray-400">{feature.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating Badges */}
            <motion.div
              className="absolute -right-4 -top-4 rounded-full bg-[#5CF4A0] px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg"
              animate={{ y: [0, -5] }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 2,
                  ease: 'easeInOut',
                },
              }}
            >
              AI-Powered
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 rounded-full bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] px-4 py-2 text-sm font-semibold text-white shadow-lg"
              animate={{ y: [0, 5] }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 2,
                  ease: 'easeInOut',
                  delay: 1,
                },
              }}
            >
              Fast & Secure
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
