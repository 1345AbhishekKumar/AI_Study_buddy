'use client';

import { FileText, Globe, BookOpen, Brain, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

export function IntegrationsSection() {
  const integrations = [
    { icon: FileText, label: 'PDF' },
    { icon: FileText, label: 'DOCX' },
    { icon: FileText, label: 'TXT' },
    { icon: Globe, label: 'Web' },
    { icon: BookOpen, label: 'Notion' },
    { icon: FileText, label: 'OneNote' },
    { icon: Brain, label: 'Obsidian' },
    { icon: Upload, label: 'Drive' },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Every Question.{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Answered.</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-16">
            Support for all your study materials and favorite tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {integrations.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="flex flex-col items-center space-y-3 group cursor-pointer"
            >
              <motion.div
                className="w-16 h-16 bg-background rounded-2xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow border border-border/50"
                whileHover={{ rotate: 5 }}
              >
                <item.icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
