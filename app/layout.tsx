import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

// Optimize font loading with display swap
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: 'AI Study Buddy - Unlock Your Learning Superpower',
    template: '%s | AI Study Buddy',
  },
  description:
    'Transform any document into interactive study materials with AI. Summarize, organize, and master everything you learn with our intelligent study assistant.',
  keywords: [
    'AI study assistant',
    'learning platform',
    'study tools',
    'education technology',
    'AI tutor',
    'study materials',
    'learning management system',
    'student productivity',
  ],
  authors: [{ name: 'AI Study Buddy Team' }],
  creator: 'AI Study Buddy',
  publisher: 'AI Study Buddy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://aistudybuddy.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'AI Study Buddy - Unlock Your Learning Superpower',
    description:
      'Transform any document into interactive study materials with AI. Summarize, organize, and master everything you learn.',
    siteName: 'AI Study Buddy',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Study Buddy - Unlock Your Learning Superpower',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Study Buddy - Unlock Your Learning Superpower',
    description: 'Transform any document into interactive study materials with AI.',
    images: ['/og-image.png'],
    creator: '@aistudybuddy',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
        <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            enableColorScheme
            disableTransitionOnChange
            storageKey="theme"
            themes={['light', 'dark', 'system']}
          >
            <TooltipProvider>
              {children}
              <Toaster position="top-center" richColors />
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
