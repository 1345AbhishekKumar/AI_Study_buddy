'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed top-0 z-50 flex w-full justify-center px-4 py-6">
      <div className="relative flex w-full max-w-4xl items-center justify-between rounded-full border border-white/20 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-xl dark:border-gray-800/20 dark:bg-gray-900/80">
        <div className="flex items-center">
          <motion.div
            // className="mr-6 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1]"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Image src="/logo.png" alt="Logo" width={24} height={24} className="h-20 w-20 object-contain" priority />
          </motion.div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">StudySphere</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center space-x-8 md:flex">
          {navLinks.map(item => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href={item.href}
                className="text-sm font-medium text-gray-900 transition-colors hover:text-[#3A8EF6] dark:text-gray-100"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {mounted && (
            <motion.button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              )}
            </motion.button>
          )}

          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] px-6 py-2 text-sm text-white transition-all duration-300 hover:shadow-lg"
            >
              Get Started
            </Link>
          </motion.div>

          <motion.button className="flex items-center md:hidden" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
            <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-white px-6 pt-24 dark:bg-gray-900 md:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute right-6 top-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6 text-gray-900 dark:text-white" />
            </motion.button>
            <div className="flex flex-col space-y-6">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Link
                    href={item.href}
                    scroll={false}
                    className="text-base font-medium text-gray-900 dark:text-white"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6"
              >
                <Link
                  href="/sign-in"
                  className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] px-5 py-3 text-base text-white transition-all duration-300 hover:shadow-lg"
                  onClick={toggleMenu}
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Navbar1 };
