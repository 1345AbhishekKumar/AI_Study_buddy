'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button, ButtonProps } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function ThemeToggle({ className, ...props }: ButtonProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    let newTheme: string;

    // Cycle through themes: light -> dark -> system -> light
    if (!theme || theme === 'light') {
      newTheme = 'dark';
    } else if (theme === 'dark') {
      newTheme = 'system';
    } else {
      newTheme = 'light';
    }

    setTheme(newTheme);
    setShowTooltip(true);
    const timer = setTimeout(() => setShowTooltip(false), 1500);
    return () => clearTimeout(timer);
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={`h-10 w-10 rounded-full hover:bg-slate-700 transition-colors ${className || ''}`}
        aria-label="Toggle theme"
        {...props}
      />
    );
  }

  const isSystemTheme = theme === 'system';
  const displayTheme = isSystemTheme ? 'system' : theme;

  return (
    <Tooltip open={showTooltip}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          onMouseEnter={() => {
            setIsHovered(true);
            setShowTooltip(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            if (!showTooltip) setShowTooltip(false);
          }}
          className={`relative h-10 w-10 rounded-full hover:bg-slate-700 transition-colors ${className || ''}`}
          aria-label={`Toggle theme (current: ${displayTheme})`}
          {...props}
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === 'system' ? (
              <motion.div
                key="system"
                initial={{ rotate: 0, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="w-full h-full flex items-center justify-center"
              >
                <Monitor className={`h-5 w-5 ${isHovered ? 'text-purple-400' : 'text-purple-500'}`} />
              </motion.div>
            ) : resolvedTheme === 'light' ? (
              <motion.div
                key="light"
                initial={{ rotate: 0, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="w-full h-full flex items-center justify-center"
              >
                <Sun className={`h-5 w-5 ${isHovered ? 'text-yellow-400' : 'text-yellow-500'}`} />
              </motion.div>
            ) : (
              <motion.div
                key="dark"
                initial={{ rotate: 0, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="w-full h-full flex items-center justify-center"
              >
                <Moon className={`h-5 w-5 ${isHovered ? 'text-blue-300' : 'text-blue-400'}`} />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-slate-800 text-white border border-slate-700 rounded-md px-2 py-1 text-sm">
        {theme === 'system' ? 'System' : theme === 'light' ? 'Light' : 'Dark'} Theme
      </TooltipContent>
    </Tooltip>
  );
}
