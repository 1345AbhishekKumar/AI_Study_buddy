'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Martinez',
      role: 'Pre-med Student, Harvard',
      content:
        'AI Study Buddy has completely changed how I learn. I can now summarize complex textbooks into flashcards in minutes instead of hours!',
      initials: 'SM',
      gradient: 'from-blue-400 to-purple-500',
    },
    {
      name: 'James Chen',
      role: 'Computer Science, MIT',
      content:
        'The collaborative features are amazing. My study group uses it to share notes and quiz each other. Our grades have improved significantly!',
      initials: 'JC',
      gradient: 'from-green-400 to-blue-500',
    },
    {
      name: 'Emily Rodriguez',
      role: 'MBA Student, Stanford',
      content:
        'As a working professional going back to school, AI Study Buddy helps me maximize my limited study time. The personalized study plans are perfect!',
      initials: 'ER',
      gradient: 'from-purple-400 to-pink-500',
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              students worldwide
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">See how AI Study Buddy is transforming learning experiences.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-gradient-to-br from-background to-muted/20">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 flex-grow group-hover:text-foreground transition-colors">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-semibold`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {testimonial.initials}
                    </motion.div>
                    <div>
                      <p className="font-semibold group-hover:text-primary transition-colors">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
