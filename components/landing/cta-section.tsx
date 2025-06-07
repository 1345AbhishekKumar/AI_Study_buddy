'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

type Particle = {
  id: number;
  left: string;
  top: string;
  delay: number;
  duration: number;
};

export function CTASection() {
  const [isMounted, setIsMounted] = useState(false);

  // Generate consistent particle positions using useMemo
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 2,
    }));
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return a placeholder during SSR
  if (!isMounted) {
    return (
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center h-[600px]" />
      </section>
    );
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Join the{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Movement</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Join thousands of learners who are already transforming their study experience with AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-3xl blur-3xl"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-teal-500/5 backdrop-blur-xl relative">
            <CardContent className="p-12">
              {/* Floating particles - only render on client */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {particles.map(particle => (
                  <motion.div
                    key={particle.id}
                    className="absolute"
                    style={{
                      left: particle.left,
                      top: particle.top,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.1, 0.3, 0.1],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: particle.duration,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: particle.delay,
                    }}
                  >
                    <Sparkles className="h-4 w-4 text-primary/30" />
                  </motion.div>
                ))}
              </div>

              <div className="max-w-md mx-auto relative z-10">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold mb-6"
                >
                  Get Early Access
                </motion.h3>
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="text-center bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary transition-colors"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <Zap className="mr-2 h-5 w-5" />
                        Get Started for Free
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </Button>
                  </motion.div>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-sm text-muted-foreground mt-4"
                >
                  No credit card required. Start learning smarter today.
                </motion.p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
