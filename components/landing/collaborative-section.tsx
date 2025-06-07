'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, BookOpen, Users as UsersIcon } from 'lucide-react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

const benefits = [
  {
    text: 'Real-time collaboration on notes and flashcards',
    icon: MessageSquare,
  },
  {
    text: 'Group study sessions with shared progress tracking',
    icon: UsersIcon,
  },
  {
    text: 'AI-powered study group recommendations',
    icon: BookOpen,
  },
] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export function CollaborativeSection() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <section
      ref={ref}
      id="collaboration"
      aria-labelledby="collaboration-heading"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-purple-500/5 to-teal-500/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div initial="hidden" animate={controls} variants={staggerContainer} className="space-y-8">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight"
              id="collaboration-heading"
            >
              Create, Learn, and{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Grow Together
              </span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Collaborate with friends, join study groups, and conquer your goals as a team.
            </motion.p>

            <motion.div variants={staggerContainer} className="space-y-4">
              {benefits.map(({ text, icon: Icon }, _index) => (
                <motion.div
                  key={text}
                  variants={fadeInUp}
                  className="group flex items-start space-x-4 p-3 -m-3 rounded-lg transition-colors hover:bg-accent/50"
                  whileHover={{ x: 4 }}
                >
                  <div className="bg-primary/10 group-hover:bg-primary/20 p-2 rounded-lg transition-colors">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-foreground leading-relaxed">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-600/20 to-teal-500/20 rounded-2xl blur-2xl -z-10"
              animate={{
                scale: [1, 1.03, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
              aria-hidden="true"
            />

            <Card
              className="shadow-2xl relative bg-background/80 backdrop-blur-xl border-border/50 overflow-hidden"
              role="region"
              aria-label="Study group preview"
            >
              <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,white,transparent)]" />

              <CardContent className="p-6 sm:p-8 relative">
                <div className="space-y-6">
                  <motion.div
                    className="flex items-center space-x-4"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full opacity-75 blur"></div>
                      <div className="relative w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" aria-hidden="true" />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Physics Study Group</p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <span className="relative flex h-2 w-2 mr-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        5 members active
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-muted/50 rounded-lg p-4 border border-border/50"
                    whileHover={{
                      y: -2,
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <p className="text-sm text-muted-foreground mb-2">Sarah shared a summary:</p>
                    <p className="font-medium text-foreground">&ldquo;Quantum Mechanics Chapter 3&rdquo;</p>
                    <div className="mt-3 flex items-center text-xs text-muted-foreground">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                      Updated 2 minutes ago
                    </div>
                  </motion.div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        className="w-full"
                        aria-label="Join discussion about Quantum Mechanics Chapter 3"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Join Discussion
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        aria-label="View summary of Quantum Mechanics Chapter 3"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Summary
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
