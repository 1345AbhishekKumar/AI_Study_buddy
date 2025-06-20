'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

// Predefined positions for consistent rendering
const PREDEFINED_POSITIONS: Omit<Sparkle, 'size' | 'delay'>[] = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.floor(Math.sin(i) * 40 + 50),
  y: Math.floor(Math.cos(i) * 40 + 50),
}));

export function SparklesAnimation() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const animationRef = useRef<number | null>(null); // ✅ Corrected useRef

  // Generate sparkle values with slight random variation
  const generateSparkles = useCallback(() => {
    return PREDEFINED_POSITIONS.map((pos, i) => ({
      id: pos.id,
      x: pos.x + (Math.random() * 2 - 1),
      y: pos.y + (Math.random() * 2 - 1),
      size: (i % 4) + 2 + (Math.random() * 1.5 - 0.75),
      delay: (i * 0.15) % 3,
    }));
  }, []);

  useEffect(() => {
    setIsMounted(true);
    setSparkles(generateSparkles());

    const animate = () => {
      setSparkles(generateSparkles());
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [generateSparkles]);

  if (!isMounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-[-1]">
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            className="absolute"
            style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              delay: sparkle.delay,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            <div
              className="rounded-full bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6]"
              style={{
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                boxShadow: `0 0 ${sparkle.size * 2}px rgba(92, 244, 160, 0.5)`,
                willChange: 'transform, opacity',
              }}
              aria-hidden="true"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
