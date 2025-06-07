// app/dash/components/animated-wrapper.tsx
'use client';

import React, { useState, useEffect } from 'react';

// --- Animated Wrapper --- //
interface AnimatedWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({ children, className, delay = 0, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedWrapper;
