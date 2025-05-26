'use client';

import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

export function DemoSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See AI Study Buddy in{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Action</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Watch how our AI transforms your study materials into powerful learning tools.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-3xl blur-3xl"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-border/20">
            <div className="aspect-video flex items-center justify-center">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4">
                  <Play className="mr-3 h-6 w-6" />
                  Play Demo Video
                </Button>
              </motion.div>
            </div>
            {/* Decorative elements */}
            <motion.div
              className="absolute top-4 left-4 w-3 h-3 bg-red-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute top-4 left-12 w-3 h-3 bg-yellow-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
            />
            <motion.div
              className="absolute top-4 left-20 w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
