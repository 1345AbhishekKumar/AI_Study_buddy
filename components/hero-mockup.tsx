'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="relative max-w-6xl mx-auto"
    >
      <div className="relative">
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-3xl blur-3xl"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Main mockup container */}
        <motion.div
          className="relative bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50 shadow-2xl"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Browser header */}
          <div className="bg-muted/50 px-6 py-4 rounded-t-xl border-b border-border/50 flex items-center space-x-2 mb-6">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full" />
              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
              <div className="w-3 h-3 bg-green-400 rounded-full" />
            </div>
            <div className="ml-4 text-sm text-muted-foreground">AI Study Buddy Dashboard</div>
          </div>

          {/* Dashboard content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}>
              <Card className="border-dashed border-2 border-primary/30 hover:border-primary/50 transition-colors cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <motion.div whileHover={{ scale: 1.1 }} className="group-hover:text-primary transition-colors">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4 group-hover:text-primary transition-colors" />
                  </motion.div>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                    Upload PDF, DOCX, or TXT
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Chapter 5 Summary</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Quantum mechanics principles and wave-particle duality...
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="sm" variant="outline" className="w-full">
                      Create Flashcards
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6 }}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Study Progress</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Physics</span>
                      <span className="text-primary font-medium">75%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        transition={{ delay: 2, duration: 1 }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Mathematics</span>
                      <span className="text-primary font-medium">92%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '92%' }}
                        transition={{ delay: 2.2, duration: 1 }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
