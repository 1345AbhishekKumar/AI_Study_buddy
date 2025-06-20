'use client';

import { Brain, Twitter, Linkedin, Github, Mail, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0F19] px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1]">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">StudySphere</h3>
                <p className="text-sm text-[#A0A6B2]">Learn with AI</p>
              </div>
            </div>

            <p className="leading-relaxed text-[#A0A6B2]">
              Revolutionizing education through AI-powered personalized learning experiences. Your intelligent study
              companion for academic success.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-[#3A8EF6]/20"
              >
                <Twitter className="h-5 w-5 text-[#A0A6B2] hover:text-[#3A8EF6]" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-[#3A8EF6]/20"
              >
                <Linkedin className="h-5 w-5 text-[#A0A6B2] hover:text-[#3A8EF6]" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-[#3A8EF6]/20"
              >
                <Github className="h-5 w-5 text-[#A0A6B2] hover:text-[#3A8EF6]" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-[#3A8EF6]/20"
              >
                <Mail className="h-5 w-5 text-[#A0A6B2] hover:text-[#3A8EF6]" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Product</h4>
            <ul className="space-y-3">
              {[
                'Features',
                'AI Chat',
                'Analytics',
                'Study Plans',
                'Goal Tracking',
                'Integrations',
                'Mobile App',
                'API Access',
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-[#A0A6B2] transition-colors duration-200 hover:text-[#3A8EF6]"
                  >
                    {item}
                    <ExternalLink className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn Column */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Learn</h4>
            <ul className="space-y-3">
              {[
                'Documentation',
                'Tutorials',
                'Best Practices',
                'Case Studies',
                'Webinars',
                'Blog',
                'Help Center',
                'Community',
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-[#A0A6B2] transition-colors duration-200 hover:text-[#3A8EF6]"
                  >
                    {item}
                    <ExternalLink className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-3">
              {[
                'About Us',
                'Careers',
                'Press',
                'Partners',
                'Contact',
                'Privacy Policy',
                'Terms of Service',
                'Security',
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-[#A0A6B2] transition-colors duration-200 hover:text-[#3A8EF6]"
                  >
                    {item}
                    <ExternalLink className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-sm text-[#A0A6B2]">
              © 2024 StudySphere. All rights reserved. Built with ❤️ for learners worldwide.
            </div>

            <div className="flex items-center gap-6 text-sm text-[#A0A6B2]">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#5CF4A0]"></div>
                <span>All systems operational</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Powered by</span>
                <div className="flex items-center gap-1">
                  <div className="font-semibold text-[#3A8EF6]">GPT-4</div>
                  <span>&</span>
                  <div className="font-semibold text-[#6B46C1]">Claude</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
