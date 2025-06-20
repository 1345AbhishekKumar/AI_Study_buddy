'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Brain, Calendar, BarChart3, Settings, LogOut, Menu, X, Search, Bell } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useClerk, SignedIn, UserButton } from '@clerk/nextjs';
import AnimatedBackground from '@/components/animations/AnimatedBackground';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: BookOpen, label: 'Resources', href: '/dashboard/resources' },
  { icon: Brain, label: 'Study Mode', href: '/dashboard/study' },
  { icon: Calendar, label: 'Planner', href: '/dashboard/planner' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk();

  const handleNavigation = (href: string) => {
    router.push(href);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F5F5F7] relative">
      {/* Background gradient + animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 dark:from-gray-900/50 dark:via-transparent dark:to-gray-900/50 pointer-events-none z-0">
        <AnimatedBackground />
      </div>
      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 z-30 hidden h-full flex-col border-r border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl transition-all duration-300 lg:flex ${
          sidebarExpanded ? 'w-72' : 'w-20'
        }`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 dark:from-gray-900/50 dark:via-transparent dark:to-gray-900/50 pointer-events-none z-0">
          <AnimatedBackground />
        </div>
        <div className="shrink-0 border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1]">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <AnimatePresence>
              {sidebarExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <h1 className="text-xl font-bold text-white">StudySphere</h1>
                  <p className="text-xs text-[#A0A6B2]">Learn with AI</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {sidebarItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <motion.button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className={`group flex w-full items-center gap-3 rounded-xl p-3 transition-all ${
                  isActive
                    ? 'border border-[#3A8EF6]/30 bg-gradient-to-r from-[#3A8EF6]/20 to-[#6B46C1]/20 text-[#3A8EF6]'
                    : 'text-[#A0A6B2] hover:bg-white/10 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className={`h-5 w-5 ${isActive ? 'text-[#3A8EF6]' : 'group-hover:text-[#5CF4A0]'}`} />
                <AnimatePresence>
                  {sidebarExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <SignedIn>
            <motion.button
              onClick={() => signOut(() => router.push('/'))}
              className="group flex w-full items-center gap-3 rounded-xl p-3 text-[#A0A6B2] hover:bg-red-500/20 hover:text-red-400"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="h-5 w-5 group-hover:text-red-400" />
              <AnimatePresence>
                {sidebarExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </SignedIn>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarExpanded ? 'lg:ml-72' : 'lg:ml-20'}`}>
        <header className="relative z-40 border-b border-white/20 bg-gradient-to-r from-white/10 to-white/5 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-xl bg-white/10 p-2 hover:bg-white/20 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="relative mx-4 flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A0A6B2]" />
              <input
                type="text"
                placeholder="Search study resources..."
                className="w-full rounded-xl border border-white/20 bg-white/10 py-2 pl-10 pr-4 text-white placeholder-[#A0A6B2] focus:border-[#3A8EF6]/50 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-5 pr-4">
              <button className="relative rounded-xl bg-white/10 p-2 hover:bg-white/20">
                <Bell className="h-4 w-4" />
                <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#5CF4A0]" />
              </button>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 dark:from-gray-900/50 dark:via-transparent dark:to-gray-900/50 pointer-events-none z-0">
                <AnimatedBackground />
              </div>
              <UserButton
                userProfileProps={{
                  appearance: {
                    elements: {
                      card: {
                        background: 'linear-gradient(135deg, #1e293b 20%, #334155 60%, rgba(58, 142, 246, 0.15) 100%)',
                        color: '#ffffff',
                        border: '1px solid rgba(58, 142, 246, 0.3)',
                      },
                      userPreviewMainIdentifier: {
                        color: '#5CF4A0',
                        fontWeight: 600,
                      },
                      emailAddressPrimaryBadge: {
                        color: '#5CF4A0',
                        backgroundColor: 'rgba(92, 244, 160, 0.15)',
                        border: '1px solid rgba(92, 244, 160, 0.4)',
                      },
                      headerTitle: {
                        color: '#ffffff',
                        fontWeight: 600,
                      },
                      headerSubtitle: {
                        color: '#cbd5e1',
                      },
                      navbar: {
                        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                        borderBottom: '1px solid rgba(58, 142, 246, 0.3)',
                      },
                      navbarButton: {
                        color: '#e2e8f0',
                        '&:hover': {
                          backgroundColor: 'rgba(92, 244, 160, 0.15)',
                          color: '#5CF4A0',
                        },
                      },
                      formFieldLabel: {
                        color: '#e2e8f0',
                      },
                      formFieldInput: {
                        backgroundColor: 'rgba(51, 65, 85, 0.8)',
                        color: '#ffffff',
                        borderColor: 'rgba(58, 142, 246, 0.4)',
                        '&:focus': {
                          borderColor: '#5CF4A0',
                        },
                      },
                      footer: {
                        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                        borderTop: '1px solid rgba(58, 142, 246, 0.3)',
                      },
                    },
                    variables: {
                      colorPrimary: '#5CF4A0',
                      colorBackground: '#1e293b',
                      colorText: '#ffffff',
                      colorNeutral: '#3A8EF6',
                    },
                  },
                }}
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: '2.5rem',
                      height: '2.5rem',
                      border: '2px solid rgba(92, 244, 160, 0.4)',
                      background: 'linear-gradient(135deg, rgba(58, 142, 246, 0.15) 0%, rgba(107, 70, 193, 0.15) 100%)',
                      '&:hover': {
                        borderColor: '#5CF4A0',
                        boxShadow: '0 0 20px rgba(92, 244, 160, 0.4)',
                      },
                      transition: 'all 0.3s ease-in-out',
                    },
                    userButtonPopoverCard: {
                      background: 'linear-gradient(135deg, #1e293b 20%, #334155 60%, rgba(58, 142, 246, 0.1) 100%)',
                      border: '1px solid rgba(58, 142, 246, 0.4)',
                      borderRadius: '0.75rem',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 30px rgba(58, 142, 246, 0.15)',
                      backdropFilter: 'blur(10px)',
                    },
                    userPreviewMainIdentifier: {
                      color: '#5CF4A0',
                      fontWeight: 600,
                    },
                    userPreviewSecondaryIdentifier: {
                      color: '#cbd5e1',
                    },
                    userButtonPopoverActionButton: {
                      color: '#e2e8f0',
                      '&:hover': {
                        backgroundColor: 'rgba(92, 244, 160, 0.15)',
                        color: '#5CF4A0',
                      },
                    },
                    userButtonPopoverActionButtonIcon: {
                      color: '#3A8EF6',
                    },
                    userButtonPopoverFooter: {
                      borderTop: '1px solid rgba(58, 142, 246, 0.3)',
                      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                    },
                  },
                  variables: {
                    colorPrimary: '#5CF4A0',
                    colorBackground: '#1e293b',
                    colorText: '#ffffff',
                    colorNeutral: '#3A8EF6',
                  },
                  layout: {
                    shimmer: true,
                  },
                }}
              />
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#0B0F19]/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1]">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">StudySphere</h1>
                    <p className="text-xs text-[#A0A6B2]">Learn with AI</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl bg-white/10 p-2 hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-3 p-6">
                {sidebarItems.map(item => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.button
                      key={item.href}
                      onClick={() => handleNavigation(item.href)}
                      className={`flex w-full items-center gap-4 rounded-xl p-4 ${
                        isActive
                          ? 'border border-[#3A8EF6]/30 bg-gradient-to-r from-[#3A8EF6]/20 to-[#6B46C1]/20 text-[#3A8EF6]'
                          : 'text-[#A0A6B2] hover:bg-white/10 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon className="h-6 w-6" />
                      <span className="text-lg font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>

              <div className="border-t border-white/10 p-6">
                <SignedIn>
                  <button
                    onClick={() => signOut(() => router.push('/'))}
                    className="flex w-full items-center gap-4 rounded-xl p-4 text-[#A0A6B2] hover:bg-red-500/20 hover:text-red-400"
                  >
                    <LogOut className="h-6 w-6" />
                    <span className="text-lg font-medium">Logout</span>
                  </button>
                </SignedIn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
