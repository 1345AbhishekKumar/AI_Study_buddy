import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

// Floating particles component
function FloatingParticles() {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; left: number; top: number }>>([]);

  useEffect(() => {
    setIsMounted(true);
    setParticles(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
      }))
    );
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      {particles.map(particle => {
        const duration = 4 + Math.random() * 3;
        const delay = Math.random() * 2;
        const yOffset = -20 - Math.random() * 15;

        return (
          <motion.div
            key={particle.id}
            className="absolute h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6]"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            initial={{ y: 0, opacity: 0.3, scale: 1 }}
            animate={{
              y: yOffset,
              opacity: 1,
              scale: 1.5,
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
                duration: duration * 0.7,
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

// Animated gradient background
export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#3A8EF6]/5 via-transparent to-[#6B46C1]/5 dark:from-[#3A8EF6]/10 dark:via-transparent dark:to-[#6B46C1]/10" />
      <motion.div
        className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-[#5CF4A0]/20 to-[#3A8EF6]/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-[#6B46C1]/20 to-[#5CF4A0]/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <FloatingParticles />
    </div>
  );
}
