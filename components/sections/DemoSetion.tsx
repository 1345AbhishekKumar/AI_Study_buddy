'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

import { Play } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { SparklesAnimation } from '@/components/animations/SparklesAnimation';

export function DemoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(error => {
          console.error('Error playing video:', error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      {/* Sparkles Animation */}
      {isClient && <SparklesAnimation />}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 dark:from-gray-900/50 dark:via-transparent dark:to-gray-900/50">
        <div className="absolute inset-0 opacity-30">
          {/* Floating Particles */}
          {isClient &&
            [...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            See AI Study Buddy in{' '}
            <span className="bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] bg-clip-text text-transparent">Action</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Watch how our AI transforms your study materials into powerful learning tools.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#3A8EF6]/30 to-[#6B46C1]/30 blur-3xl"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />
          <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl backdrop-blur-xl dark:border-gray-700/30 dark:from-gray-800/50 dark:to-gray-900/50">
            <div className="aspect-video w-full">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full rounded-lg object-cover"
                poster="https://assets-in.bmscdn.com/discovery-catalog/events/et00003702-jmncvntevk-landscape.jpg"
                onClick={togglePlayPause}
              >
                <source
                  src={process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/don.mp4` : '/don.mp4'}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="absolute">
                  <Button
                    size="lg"
                    className="border-2 border-white/50 bg-white/90 px-8 py-4 text-lg text-gray-900 shadow-lg backdrop-blur-sm hover:bg-white"
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      togglePlayPause();
                    }}
                  >
                    <Play className="h-6 w-6" />
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute left-4 top-4 h-3 w-3 rounded-full bg-red-400 shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute left-12 top-4 h-3 w-3 rounded-full bg-yellow-400 shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute left-20 top-4 h-3 w-3 rounded-full bg-green-400 shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 1,
              }}
            />
          </div>
        </motion.div>

        {/* Additional decorative elements */}
        <motion.div
          className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-r from-[#5CF4A0]/20 to-[#3A8EF6]/20 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 h-16 w-16 rounded-full bg-gradient-to-r from-[#6B46C1]/20 to-[#5CF4A0]/20 blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>
    </section>
  );
}
