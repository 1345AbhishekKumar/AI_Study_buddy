'use client';

import type React from 'react';

import { BookOpen, MessageCircle, TrendingUp, Home, Target, FileText } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import { TooltipProvider } from '@/components/ui/tooltip';
import { EnhancedSidebar } from '../ui/enhanced-sidebar';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Study Plan', href: '/study-plan', icon: BookOpen },
  { name: 'AI Tutor', href: '/chat', icon: MessageCircle },
  { name: 'Progress', href: '/progress', icon: TrendingUp },
  { name: 'Resources', href: '/resources', icon: FileText },
  { name: 'Quiz', href: '/quiz', icon: Target },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-900 text-slate-100">
        {/* Enhanced Sidebar - it will handle its own positioning */}
        <EnhancedSidebar items={navigationItems} open={isSidebarOpen} setOpen={setIsSidebarOpen}>
          {/* Main Content Container */}
          <div className="min-h-screen flex flex-col">
            {/* Top navigation */}
            <header className="sticky top-0 z-30 bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50">
              <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center">
                  <h1 className="text-lg font-semibold text-white">
                    {navigationItems.find(item => pathname === item.href)?.name || 'Dashboard'}
                  </h1>
                </div>

                <div className="flex items-center space-x-3">
                  <ThemeToggle className="p-2 rounded-full hover:bg-slate-700/50 text-slate-300 hover:text-white transition-colors" />
                  <div className="h-8 w-px bg-slate-700/50"></div>
                  <div className="flex items-center">
                    <UserButton
                      userProfileProps={{
                        appearance: {
                          elements: {
                            // Main card container
                            card: {
                              backgroundColor: '#1e293b',
                              color: '#ffffff',
                            },

                            // Primary name text - make it blue
                            userPreviewMainIdentifier: {
                              color: '#3b82f6',
                              fontWeight: 500,
                            },

                            // Email address section - make "Primary" text blue
                            emailAddressPrimaryBadge: {
                              color: '#3b82f6',
                              backgroundColor: 'rgba(59, 130, 246, 0.1)',
                              border: '1px solid rgba(59, 130, 246, 0.3)',
                            },

                            // Header elements
                            headerTitle: {
                              color: '#ffffff',
                            },
                            headerSubtitle: {
                              color: '#94a3b8',
                            },

                            // Navigation
                            navbar: {
                              backgroundColor: '#0f172a',
                            },
                            navbarButton: {
                              color: '#ffffff',
                              '&:hover': {
                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                color: '#3b82f6',
                              },
                            },

                            // Form elements
                            formFieldLabel: {
                              color: '#ffffff',
                            },
                            formFieldInput: {
                              backgroundColor: '#334155',
                              color: '#ffffff',
                              borderColor: '#475569',
                            },

                            // Footer
                            footer: {
                              backgroundColor: '#0f172a',
                            },
                          },
                          variables: {
                            colorPrimary: '#3b82f6',
                            colorBackground: '#1e293b',
                            colorText: '#ffffff',
                          },
                        },
                      }}
                      appearance={{
                        elements: {
                          // Avatar container
                          userButtonAvatarBox: {
                            width: '2.5rem',
                            height: '2.5rem',
                            border: '2px solid rgba(59, 130, 246, 0.2)',
                            '&:hover': {
                              borderColor: 'rgba(59, 130, 246, 0.4)',
                            },
                            transition: 'border-color 0.2s ease-in-out',
                          },

                          // Popover card
                          userButtonPopoverCard: {
                            backgroundColor: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '0.5rem',
                            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                          },

                          // User info
                          userPreviewMainIdentifier: {
                            color: '#ffffff',
                            fontWeight: 500,
                          },
                          userPreviewSecondaryIdentifier: {
                            color: '#ffffff',
                          },

                          // Action buttons
                          userButtonPopoverActionButton: {
                            color: '#ffffff',
                            '&:hover': {
                              backgroundColor: 'rgba(59, 130, 246, 0.1)',
                              color: '#3b82f6',
                            },
                          },

                          // Icons
                          userButtonPopoverActionButtonIcon: {
                            color: '#3b82f6',
                          },

                          // Footer
                          userButtonPopoverFooter: {
                            borderTop: '1px solid #334155',
                            backgroundColor: '#0f172a',
                          },
                        },
                        variables: {
                          colorPrimary: '#3b82f6',
                          colorBackground: '#1e293b',
                          colorText: '#ffffff',
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </header>

            {/* Page content */}
            <main className="flex-1 overflow-y-auto p-6">
              <div className="max-w-7xl mx-auto w-full">{children}</div>
            </main>
          </div>
        </EnhancedSidebar>
      </div>
    </TooltipProvider>
  );
}
