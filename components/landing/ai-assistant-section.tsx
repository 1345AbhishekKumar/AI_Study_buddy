'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MessageCircle, Sparkles, Bot, Zap, Lightbulb } from 'lucide-react';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface Particle {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
}

const features: Feature[] = [
  {
    icon: Bot,
    title: '24/7 AI Tutor',
    description: 'Get instant help with any subject, anytime, anywhere.',
  },
  {
    icon: Lightbulb,
    title: 'Smart Explanations',
    description: 'Understand complex topics with clear, step-by-step guidance.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get accurate answers in seconds with our optimized AI models.',
  },
];

const AIAssistantSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Initialize particles on client side only
  useEffect(() => {
    setIsMounted(true);
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        size: 2 + Math.random() * 3,
      }))
    );
  }, []);

  // Handle intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Handle feature hover
  const handleFeatureMouseEnter = useCallback((index: number) => {
    setHoveredFeature(index);
  }, []);

  const handleFeatureMouseLeave = useCallback(() => {
    setHoveredFeature(null);
  }, []);

  // Handle button clicks
  const handleChatClick = useCallback(() => {
    console.log('Chat with AI Tutor clicked');
  }, []);

  const handleDemoClick = useCallback(() => {
    console.log('See How It Works clicked');
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ai-assistant"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      aria-labelledby="ai-assistant-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Animated background gradient */}
          <div
            className="absolute inset-0 rounded-3xl opacity-80 animate-pulse"
            style={{
              background:
                'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2), rgba(20, 184, 166, 0.2))',
              animationDuration: '6s',
            }}
          />

          {/* Main content container */}
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden shadow-2xl">
            {/* Floating particles animation - Only render on client side */}
            {isMounted && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                {particles.map(particle => (
                  <div
                    key={`particle-${particle.id}`}
                    className="absolute bg-white/20 rounded-full animate-bounce opacity-60"
                    style={{
                      left: `${particle.left}%`,
                      top: `${particle.top}%`,
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      animationDelay: `${particle.delay}s`,
                      animationDuration: `${particle.duration}s`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
              aria-hidden="true"
            />

            {/* Main content */}
            <div className="max-w-4xl mx-auto relative z-10">
              {/* Header section with staggered animations */}
              <div
                className={`space-y-8 transition-all duration-1000 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                {/* Icon and title */}
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="relative mb-6">
                    <div
                      className="absolute -inset-2 bg-white/30 rounded-full blur-xl opacity-75 animate-ping"
                      style={{ animationDuration: '3s' }}
                    />
                    <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20 shadow-lg hover:scale-110 transition-transform duration-300">
                      <Sparkles
                        className="h-8 w-8 md:h-10 md:w-10 text-white animate-spin"
                        style={{ animationDuration: '8s' }}
                      />
                    </div>
                  </div>

                  <h2
                    id="ai-assistant-heading"
                    className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white"
                  >
                    Your Personal <span className="text-yellow-300 inline-block">AI Tutor</span>
                  </h2>
                </div>

                {/* Description with delayed animation */}
                <p
                  className={`text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed text-white/90 transition-all duration-1000 delay-200 ${
                    isVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                >
                  Get instant, AI-powered answers to all your questions. From complex concepts to quick clarifications,
                  your 24/7 AI tutor is always ready to help you learn and understand.
                </p>

                {/* Action buttons with hover animations */}
                <div
                  className={`flex flex-wrap justify-center gap-4 mt-8 transition-all duration-1000 delay-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                >
                  <button
                    onClick={handleChatClick}
                    className="group bg-white text-blue-600 hover:bg-gray-50 transition-all duration-300 rounded-full px-8 py-4 text-lg font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border-2 border-transparent hover:border-blue-200"
                    type="button"
                  >
                    <MessageCircle className="h-5 w-5 group-hover:animate-bounce" />
                    Chat with AI Tutor
                  </button>

                  <button
                    onClick={handleDemoClick}
                    className="group border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 rounded-full px-8 py-4 text-lg font-semibold hover:scale-105 active:scale-95 hover:shadow-lg backdrop-blur-sm"
                    type="button"
                  >
                    <span className="group-hover:animate-pulse">See How It Works</span>
                  </button>
                </div>
              </div>

              {/* Features grid with individual animations */}
              <div
                className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  const isHovered = hoveredFeature === index;

                  return (
                    <div
                      key={feature.title}
                      className={`bg-white/10 backdrop-blur-sm p-6 rounded-xl text-left border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl ${
                        isHovered ? 'scale-105 shadow-xl' : ''
                      }`}
                      style={{
                        transitionDelay: `${index * 100}ms`,
                        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
                      }}
                      onMouseEnter={() => handleFeatureMouseEnter(index)}
                      onMouseLeave={handleFeatureMouseLeave}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleFeatureMouseEnter(index);
                        }
                      }}
                    >
                      <div
                        className={`bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${
                          isHovered ? 'bg-white/30 scale-110' : ''
                        }`}
                      >
                        <IconComponent
                          className={`h-6 w-6 text-white transition-transform duration-300 ${
                            isHovered ? 'scale-110 animate-pulse' : ''
                          }`}
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                      <p className="text-white/80 leading-relaxed">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistantSection;
