import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/landing/theme-provider';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Providers } from '../lib/providers';

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
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                try {
                  // Check for saved theme preference or use system preference
                  const savedTheme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
                  
                  console.log('Initial theme setup:', { savedTheme, systemPrefersDark, theme });
                  
                  // Apply theme class immediately to prevent flash of default theme
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  
                  // Add a class to the body to indicate that we've applied the theme
                  document.body.classList.add('theme-initialized');
                  
                  // Listen for system theme changes when using 'system' preference
                  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                  const handleSystemThemeChange = (e) => {
                    if (localStorage.getItem('theme') === 'system') {
                      console.log('System theme changed to:', e.matches ? 'dark' : 'light');
                      document.documentElement.classList.toggle('dark', e.matches);
                    }
                  };
                  mediaQuery.addEventListener('change', handleSystemThemeChange);
                  
                  // Cleanup
                  return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
                } catch (e) {
                  console.error('Error initializing theme:', e);
                }
              })();
            `,
            }}
          />
        </head>
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
              <Providers>
                {children}
                <Toaster position="top-center" richColors />
                <SpeedInsights />
                {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
                  <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
                )}
              </Providers>
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
