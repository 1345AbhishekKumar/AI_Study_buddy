'use client';

import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const productLinks = ['Features', 'Pricing', 'Blog', 'Changelog'];
  const companyLinks = ['About Us', 'Careers', 'Contact Us', 'Privacy Policy'];
  const socialLinks = ['Twitter', 'LinkedIn', 'GitHub'];

  return (
    <footer className="bg-muted/50 border-t border-border/50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-6">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <Brain className="h-8 w-8 text-primary" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                AI Study Buddy
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Empowering students and lifelong learners with AI-powered study tools that make learning more effective
              and enjoyable.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/10 cursor-pointer transition-colors border border-border/50"
                >
                  <span className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                    {social[0]}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {productLinks.map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                    {link}
                    <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                    {link}
                    <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-muted-foreground text-sm">© 2024 AI Study Buddy. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((link, index) => (
              <motion.a
                key={link}
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors relative group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                {link}
                <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
