'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

export function ComparisonSection() {
  const features = [
    { feature: 'AI-powered summaries', ours: true, notion: false, anki: false, traditional: false },
    { feature: 'Auto-generated flashcards', ours: true, notion: false, anki: false, traditional: false },
    { feature: 'Personalized study plans', ours: true, notion: false, anki: false, traditional: false },
    { feature: 'Progress analytics', ours: true, notion: false, anki: true, traditional: false },
    { feature: 'Collaboration features', ours: true, notion: true, anki: false, traditional: false },
    { feature: 'Mobile app', ours: true, notion: true, anki: true, traditional: false },
  ];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why choose{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              AI Study Buddy?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">See how we compare to traditional study tools.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="overflow-hidden shadow-xl bg-background/80 backdrop-blur-xl border-border/50">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-primary">AI Study Buddy</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">Notion</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">Anki</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                        Traditional Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {features.map((row, index) => (
                      <motion.tr
                        key={row.feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-background hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium">{row.feature}</td>
                        <td className="px-6 py-4 text-center">
                          <motion.div whileHover={{ scale: 1.2 }} className="flex justify-center">
                            {row.ours ? (
                              <Check className="h-5 w-5 text-green-600" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground/30" />
                            )}
                          </motion.div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <motion.div whileHover={{ scale: 1.2 }} className="flex justify-center">
                            {row.notion ? (
                              <Check className="h-5 w-5 text-green-600" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground/30" />
                            )}
                          </motion.div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <motion.div whileHover={{ scale: 1.2 }} className="flex justify-center">
                            {row.anki ? (
                              <Check className="h-5 w-5 text-green-600" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground/30" />
                            )}
                          </motion.div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <motion.div whileHover={{ scale: 1.2 }} className="flex justify-center">
                            {row.traditional ? (
                              <Check className="h-5 w-5 text-green-600" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground/30" />
                            )}
                          </motion.div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
