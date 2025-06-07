'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingElements } from '@/components/landing/floating-elements';
import { HeroMockup } from '@/components/landing/hero-mockup';
import VideoPlayer from '@/components/features/ui/video-player';
import { ScrambleText } from '@/components/features/ui/scramble-text';
import Link from 'next/link';

export function HeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Scroll-based animations */}
      <motion.div
        className="absolute top-0 left-0 w-full h-screen pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-primary/10 blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </motion.div>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-teal-500/5" />
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: 'reverse' }}
      />

      <FloatingElements />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powered by Advanced AI</span>
          </motion.div>

          <motion.div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight"
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Unlock Your
              </motion.span>
              <ScrambleText
                text="Learning Superpower"
                className="block bg-gradient-to-r from-primary via-purple-600 to-teal-500 bg-clip-text text-transparent pb-3"
                delay={0.4}
                duration={2.5}
              />
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl mt-8 text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Transform any document into interactive study materials with AI. Summarize, organize, and master everything
            you learn.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              type: 'spring',
              stiffness: 100,
              damping: 10,
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { type: 'spring', stiffness: 400, damping: 10 },
              }}
              whileTap={{
                scale: 0.98,
                transition: { type: 'spring', stiffness: 400, damping: 20 },
              }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full text-base sm:text-lg px-6 sm:px-8 py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 relative overflow-hidden group"
                asChild
              >
                <Link href="/sign-up">
                  <span className="relative z-10 flex items-center justify-center">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button
                onClick={() => setIsVideoOpen(true)}
                variant="outline"
                size="lg"
                className="w-full text-base sm:text-lg px-6 sm:px-8 py-4 border-2 hover:bg-primary/5 group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <HeroMockup />
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-10 right-0 text-white hover:bg-white/10"
                onClick={() => setIsVideoOpen(false)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close video</span>
              </Button>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <VideoPlayer src="https://youtu.be/YJ8vvIAxcss?si=4TEXSx28lVV7OcUp" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
