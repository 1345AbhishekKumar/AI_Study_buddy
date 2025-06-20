'use client';

import { motion } from 'framer-motion';
import { Brain, Target, BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';

type Position = {
  left: string;
  top: string;
  duration: number;
  delay: number;
};

export default function ScienceBackedSection() {
  const [particles, setParticles] = useState<Position[]>([]);

  useEffect(() => {
    // Generate random positions on client side only
    setParticles(
      Array.from({ length: 10 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-20 sm:px-6 lg:px-8">
      {/* Floating Particles */}
      <div className="absolute inset-0 opacity-30">
        {particles.map(({ left, top, duration, delay }, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6]"
            style={{
              left,
              top,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <h2 className="mb-6 text-5xl font-bold text-white">
          Built on{' '}
          <span className="bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6] bg-clip-text text-transparent">
            cognitive science
          </span>
          , powered by AI
        </h2>
        <p className="mx-auto mb-16 max-w-3xl text-xl text-gray-300">
          Our learning methods are based on proven scientific principles that maximize retention and understanding.
        </p>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#3A8EF6]/30 bg-[#3A8EF6]/20 backdrop-blur-sm">
              <Brain className="h-10 w-10 text-[#3A8EF6]" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">Spaced Repetition</h3>
            <p className="leading-relaxed text-gray-300">
              AI schedules review sessions at optimal intervals to move information from short-term to long-term memory.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#5CF4A0]/30 bg-[#5CF4A0]/20 backdrop-blur-sm">
              <Target className="h-10 w-10 text-[#5CF4A0]" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">Active Recall</h3>
            <p className="leading-relaxed text-gray-300">
              Interactive quizzes and questions force your brain to actively retrieve information, strengthening neural
              pathways.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#6B46C1]/30 bg-[#6B46C1]/20 backdrop-blur-sm">
              <BookOpen className="h-10 w-10 text-[#6B46C1]" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">Multimodal Learning</h3>
            <p className="leading-relaxed text-gray-300">
              Combine text, video, and interactive elements to engage different learning styles and improve
              comprehension.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
