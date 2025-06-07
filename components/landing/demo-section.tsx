'use client';

import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

export function DemoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(error => {
          console.error('Error playing video:', error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  };
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
            <div className="aspect-video w-full">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-lg"
                poster="https://assets-in.bmscdn.com/discovery-catalog/events/et00003702-jmncvntevk-landscape.jpg"
                onClick={togglePlayPause}
              >
                <source src={`${process.env.NEXT_PUBLIC_BASE_URL || ''}/don.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="absolute">
                  <Button
                    size="lg"
                    className="bg-white/90 text-gray-900 hover:bg-white text-lg px-8 py-4 backdrop-blur-sm shadow-lg"
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      togglePlayPause();
                    }}
                  >
                    <Play className="h-6 w-6" />
                  </Button>
                </motion.div>
              </div>
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
