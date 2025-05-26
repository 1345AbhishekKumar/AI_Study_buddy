'use client';

import { motion } from 'framer-motion';

export function TrustedBySection() {
  const logos = ['Harvard', 'MIT', 'Stanford', 'Oxford', 'Cambridge', 'Yale'];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-muted-foreground mb-8"
        >
          Trusted by students at top universities worldwide
        </motion.p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, opacity: 1 }}
              className="text-2xl font-bold text-muted-foreground/60 hover:text-foreground transition-colors cursor-pointer"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
