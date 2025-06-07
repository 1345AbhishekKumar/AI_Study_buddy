'use client';

import { motion } from 'framer-motion';
import { TestimonialsColumn } from '@/components/features/ui/testimonials-column';

const testimonials = [
  {
    text: 'AI Study Buddy has completely changed how I learn. I can now summarize complex textbooks into flashcards in minutes instead of hours!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    name: 'Sarah Martinez',
    role: 'Pre-med Student, Harvard',
  },
  {
    text: 'The collaborative features are amazing. My study group uses it to share notes and quiz each other. Our grades have improved significantly!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    name: 'James Chen',
    role: 'Computer Science, MIT',
  },
  {
    text: 'As a working professional going back to school, AI Study Buddy helps me maximize my limited study time. The personalized study plans are perfect!',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    name: 'Emily Rodriguez',
    role: 'MBA Student, Stanford',
  },
  {
    text: 'The AI-powered study recommendations have helped me focus on my weak areas and improve my test scores dramatically.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    name: 'Alex Johnson',
    role: 'Engineering Student, UC Berkeley',
  },
  {
    text: 'Being able to study on the go with the mobile app has been a game-changer for my busy schedule.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    name: 'Maria Garcia',
    role: 'Law Student, NYU',
  },
  {
    text: 'The spaced repetition algorithm is incredibly effective. I remember more in less time than with traditional study methods.',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&auto=format&fit=crop',
    name: 'David Kim',
    role: 'Medical Student, Johns Hopkins',
  },
  {
    text: 'I love how the platform adapts to my learning style. It feels like having a personal tutor available 24/7.',
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop',
    name: 'Sophia Chen',
    role: 'Computer Science, Stanford',
  },
  {
    text: "The progress tracking helps me stay motivated and see how far I've come in my studies.",
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
    name: 'Michael Brown',
    role: 'Business Student, Wharton',
  },
  {
    text: "The community features make studying feel less isolating. I've connected with study partners from around the world.",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    name: 'Olivia Wilson',
    role: 'Psychology Student, UCLA',
  },
];

export function TestimonialsSection() {
  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section className="bg-background py-24 relative overflow-hidden">
      <div className="container z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Loved by{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              students worldwide
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See how AI Study Buddy is transforming learning experiences across the globe.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[800px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
