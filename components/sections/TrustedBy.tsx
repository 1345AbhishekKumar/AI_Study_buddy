'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Particle {
  id: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
}

export function TrustedBySection() {
  const logos = ['Harvard', 'MIT', 'Stanford', 'Oxford', 'Cambridge', 'Yale'];
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on client side
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 dark:bg-[#0B0F19] sm:px-6 lg:px-8">
      <div className="absolute inset-0 h-full w-full">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 dark:from-gray-900/50 dark:via-transparent dark:to-gray-900/50">
          <div className="absolute inset-0 opacity-30">
            {/* Floating Particles */}
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6]"
                style={{
                  left: particle.left,
                  top: particle.top,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-muted-foreground"
        >
          Trusted by students at top universities worldwide
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, opacity: 1 }}
              className="cursor-pointer text-2xl font-bold text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-transparent via-background/30 to-transparent" />
    </section>
  );
}
