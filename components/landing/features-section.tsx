'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Zap, Sparkles, BookOpen, Brain, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Smart Study Assistant',
      description: 'Get instant answers to your study questions with our advanced AI-powered assistant.',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Personalized Learning',
      description: 'Adaptive learning paths tailored to your study style and progress.',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Knowledge Retention',
      description: 'Spaced repetition and active recall techniques to help you remember more.',
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with AI-generated quizzes and practice tests.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Feedback',
      description: 'Get detailed explanations and feedback on your answers in real-time.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Study Groups',
      description: 'Collaborate with classmates and share study materials seamlessly.',
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden bg-background dark:bg-gradient-to-b dark:from-black dark:to-gray-900 transition-colors duration-500"
    >
      {/* Floating blobs */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 0.8, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute -top-20 -right-20 w-96 h-96 rounded-3xl bg-gradient-to-br from-purple-400/20 to-transparent dark:from-purple-500/20 backdrop-blur-lg border border-purple-300/30 dark:border-purple-500/30 rotate-12"
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 0.8, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className="absolute -bottom-20 -left-20 w-96 h-96 rounded-3xl bg-gradient-to-br from-emerald-400/20 to-transparent dark:from-emerald-500/20 backdrop-blur-lg border border-emerald-300/30 dark:border-emerald-500/30 -rotate-12"
      />

      <div className="relative z-10 container px-4 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
            <Sparkles className="w-4 h-4 mr-1" />
            Why choose us
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Built for the modern web
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Experience the next generation of web performance with our cutting-edge technology stack.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 * index,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.3,
                  ease: 'easeOut',
                },
              }}
            >
              <Card className="group relative overflow-hidden transition-all hover:shadow-lg h-full bg-muted/50 backdrop-blur-sm border-border hover:border-primary/30 dark:hover:border-primary/50">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-8">
                  <motion.div
                    className="flex items-center mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <motion.div
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary"
                      whileHover={{ rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {feature.icon}
                    </motion.div>
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.1 * features.length,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -8,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            }}
          >
            <Card className="group relative overflow-hidden bg-gradient-to-br from-primary to-primary/90 text-white border-transparent">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent" />
              <CardContent className="p-8 h-full flex flex-col justify-center relative z-10">
                <h3 className="text-xl font-semibold mb-3">Ready to study smarter?</h3>
                <p className="mb-6 opacity-90">
                  Join thousands of students already improving their grades with AI Study Buddy.
                </p>
                <Button
                  variant="secondary"
                  className="button-color bg-white text-foreground dark:text-white hover:bg-white/90 transition-colors"
                >
                  Start free trial
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
