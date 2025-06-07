'use client';

import { motion } from 'framer-motion';
import { Brain, BookOpen, Zap, Target } from 'lucide-react';
import { useEffect, useState } from 'react';

// Predefined positions to ensure consistency between server and client
const FLOATING_ELEMENTS = [
  { icon: Brain, delay: 0, x: '10%', y: '20%' },
  { icon: BookOpen, delay: 1, x: '80%', y: '30%' },
  { icon: Zap, delay: 2, x: '15%', y: '70%' },
  { icon: Target, delay: 3, x: '85%', y: '80%' },
] as const;

export function FloatingElements() {
  const [isMounted, setIsMounted] = useState(false);

  // Only render on client-side to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none" suppressHydrationWarning>
      {FLOATING_ELEMENTS.map(({ icon: Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: delay * 0.5, duration: 1 }}
        >
          <motion.div
            initial={{ y: 0, rotate: 0 }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
            }}
            className="text-primary/20"
          >
            <Icon className="h-12 w-12" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
