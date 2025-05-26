'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Smartphone, Monitor, Check, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export function AppPreviewsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Study{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              anywhere, anytime
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">Seamless experience across all your devices.</p>
        </motion.div>

        {/* Mobile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <Smartphone className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-2xl font-bold">Mobile App</h3>
            </div>
            <div className="space-y-2 mb-8">
              <p className="text-sm text-muted-foreground">Sarah&apos;s summary:</p>
              <p className="text-lg text-muted-foreground">
                Study on the go with our mobile app. Access your flashcards, get daily reminders, and track your
                progress wherever you are.
              </p>
            </div>
            <div className="space-y-3">
              {[
                'Offline access to your study materials',
                'Smart notifications and reminders',
                'Voice-to-text note taking',
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-center lg:justify-start space-x-3"
                >
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              className="bg-background rounded-3xl shadow-2xl p-4 max-w-sm mx-auto border border-border/50"
              whileHover={{ y: -5, rotateY: 5 }}
              style={{ perspective: 1000 }}
            >
              <div className="bg-muted/50 rounded-2xl p-6 space-y-4">
                <div className="text-center">
                  <h4 className="font-semibold">Today&apos;s Study Plan</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { subject: 'Physics Flashcards', time: '15 min' },
                    { subject: 'Math Quiz', time: '10 min' },
                    { subject: 'History Summary', time: '20 min' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.subject}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-background rounded-lg p-3 flex items-center justify-between"
                    >
                      <span className="text-sm">{item.subject}</span>
                      <Badge variant="secondary">{item.time}</Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Desktop Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-2xl blur-2xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />
            <Card className="shadow-2xl relative bg-background/80 backdrop-blur-xl border-border/50">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold">PDF Processor</h4>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Badge className="bg-primary/10 text-primary">Processing...</Badge>
                    </motion.div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="font-medium">Advanced_Physics_Textbook.pdf</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: '75%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" className="w-full">
                        Generate Summary
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" variant="outline" className="w-full">
                        Create Flashcards
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <Monitor className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-2xl font-bold">Desktop Experience</h3>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              Powerful desktop tools for processing large documents, creating comprehensive study materials, and
              managing your learning workflow.
            </p>
            <div className="space-y-3">
              {[
                'Bulk PDF processing and analysis',
                'Advanced flashcard customization',
                'Detailed analytics and reporting',
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-center lg:justify-start space-x-3"
                >
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
