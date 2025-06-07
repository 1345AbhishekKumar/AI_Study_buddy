'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  replay?: boolean;
  theme?: 'light' | 'dark';
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
}

function StarIcon({
  size = 12,
  rotation = 0,
  theme = 'dark',
}: {
  size?: number;
  rotation?: number;
  theme?: 'light' | 'dark';
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={theme === 'dark' ? 'white' : 'black'}
      style={{
        transform: `rotate(${rotation}deg)`,
        filter: `drop-shadow(0 0 ${theme === 'dark' ? '2' : '1'}px ${theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.5)'})`,
        opacity: 0.8,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L13.8 8.2H20L14.9 12.2L16.7 18.4L12 14.6L7.3 18.4L9.1 12.2L4 8.2H10.2L12 2Z" />
    </svg>
  );
}

export function ScrambleText({
  text,
  className = '',
  delay = 0,
  duration = 1.5,
  replay = true,
  theme = 'dark',
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  // Filter text to only include alphabetic characters and spaces
  const filteredText = text
    .split('')
    .map(char => (/[A-Za-z ]/.test(char) ? char : ' '))
    .join('');

  // Sparkle logic - more refined and smooth
  useEffect(() => {
    if (!isComplete) return;

    let sparkleId = 0;
    const addSparkle = () => {
      const newSparkle: Sparkle = {
        id: sparkleId++,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 6 + Math.random() * 6,
        rotation: Math.random() * 360,
        opacity: 0.5 + Math.random() * 0.5,
      };
      setSparkles(prev => [...prev.slice(-8), newSparkle]);
    };

    const interval = setInterval(addSparkle, 200);
    return () => clearInterval(interval);
  }, [isComplete]);

  // Scramble animation logic - only affects A-Z letters
  useEffect(() => {
    let frame: number;
    let frameOffset = 0;
    let startTime: number | null = null;
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];

    const updateFrame = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      if (frameOffset % 3 === 0 || progress > 0.7) {
        const newText = filteredText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (progress < 0.7) return randomLetter();
            const charProgress = (progress - 0.7) / 0.3;
            const shouldReveal = Math.random() < charProgress || index / filteredText.length < progress;
            return shouldReveal ? char : randomLetter();
          })
          .join('');
        setDisplayText(newText);
      }

      frameOffset++;
      if (progress < 1) {
        frame = requestAnimationFrame(updateFrame);
      } else {
        setDisplayText(filteredText);
        setIsComplete(true);
      }
    };

    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(updateFrame);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
      setIsComplete(false);
    };
  }, [filteredText, delay, duration, replay]);

  return (
    <span className="relative inline-block">
      {/* Text with smooth transition */}
      <motion.span
        className={`relative z-10 ${className}`}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isComplete ? 1 : 0.8,
          textShadow: isComplete
            ? theme === 'dark'
              ? '0 0 8px rgba(255,255,255,0.3)'
              : '0 0 4px rgba(0,0,0,0.2)'
            : 'none',
        }}
        transition={{
          opacity: { duration: 0.3 },
          textShadow: { duration: 0.5, delay: duration },
        }}
      >
        {displayText || '\u00A0'}
      </motion.span>

      {/* Sparkles - more refined animation */}
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.span
            key={sparkle.id}
            className="absolute pointer-events-none z-0"
            style={{
              top: `${sparkle.y}%`,
              left: `${sparkle.x}%`,
              width: sparkle.size,
              height: sparkle.size,
              opacity: sparkle.opacity,
            }}
            initial={{ opacity: 0, scale: 0.3, rotate: -30 }}
            animate={{
              opacity: sparkle.opacity,
              scale: [0.3, 1, 0.8],
              rotate: [sparkle.rotation - 30, sparkle.rotation + 30],
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              duration: 1.2,
              ease: 'easeOut',
              opacity: { duration: 0.8 },
            }}
          >
            <StarIcon size={sparkle.size} rotation={sparkle.rotation} theme={theme} />
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}
