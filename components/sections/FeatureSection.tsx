'use client';

import { SparklesAnimation } from '@/components/animations/SparklesAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Zap, Sparkles, BookOpen, Brain, MessageSquare } from 'lucide-react';

import { useRef, useState, useEffect } from 'react';

export function FeaturesSection() {
  const ref = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'Smart Study Assistant',
      description: 'Get instant answers to your study questions with our advanced AI-powered assistant.',
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Personalized Learning',
      description: 'Adaptive learning paths tailored to your study style and progress.',
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: 'Knowledge Retention',
      description: 'Spaced repetition and active recall techniques to help you remember more.',
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with AI-generated quizzes and practice tests.',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Instant Feedback',
      description: 'Get detailed explanations and feedback on your answers in real-time.',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Study Groups',
      description: 'Collaborate with classmates and share study materials seamlessly.',
    },
  ];

  return (
    <section id="features" ref={ref} className="relative overflow-hidden py-24">
      {/* Sparkles Animation */}
      {isClient && <SparklesAnimation />}

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 dark:from-gray-900/50 dark:via-transparent dark:to-gray-900/50">
        <div className="absolute inset-0 opacity-20">
          {/* Static Particles */}
          {isClient &&
            [...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.5,
                }}
              />
            ))}
        </div>
      </div>

      {/* Floating blobs */}
      <div className="absolute -right-20 -top-20 h-96 w-96 rotate-12 rounded-3xl border border-[#6B46C1]/30 bg-gradient-to-br from-[#6B46C1]/20 to-transparent opacity-80 backdrop-blur-lg" />
      <div className="absolute -bottom-20 -left-20 h-96 w-96 -rotate-12 rounded-3xl border border-[#5CF4A0]/30 bg-gradient-to-br from-[#5CF4A0]/20 to-transparent opacity-80 backdrop-blur-lg" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-[#3A8EF6]/30 bg-gradient-to-r from-[#5CF4A0]/20 to-[#3A8EF6]/20 px-4 py-2 text-sm font-medium text-[#3A8EF6] backdrop-blur-sm transition-transform duration-200 hover:scale-105">
            <Sparkles className="mr-2 h-4 w-4" />
            Why choose us
          </span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Built for{' '}
            <span className="bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] bg-clip-text text-transparent">
              modern learning
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Experience the next generation of learning with our cutting-edge AI technology stack.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <Card className="relative h-full overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#3A8EF6]/50 hover:shadow-xl dark:border-gray-700/30 dark:bg-gray-800/30 dark:hover:border-[#3A8EF6]/50">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3A8EF6]/5 to-[#6B46C1]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CardContent className="relative z-10 p-8">
                  <div className="mb-6 flex items-center transition-transform duration-300 group-hover:scale-110">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#3A8EF6]/30 bg-gradient-to-r from-[#3A8EF6]/20 to-[#6B46C1]/20 text-[#3A8EF6] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}

          {/* CTA Card */}
          <div className="group">
            <Card className="relative overflow-hidden border-transparent bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1] text-white shadow-xl transition-transform duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent" />
              <CardContent className="relative z-10 flex h-full flex-col justify-center p-8">
                <div className="mb-4 flex items-center transition-transform duration-300 group-hover:scale-110">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <Sparkles className="h-6 w-6" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="mb-4 text-2xl font-bold">Ready to get started?</h3>
                  <p className="mb-6 text-white/90">Join thousands of students already improving their study habits</p>
                  <Button
                    size="lg"
                    className="bg-white text-[#3A8EF6] transition-transform hover:scale-105 hover:bg-white/90"
                  >
                    Get Started for Free
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
