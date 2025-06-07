'use client';

import { useUser, UserButton } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        router.push('/sign-in');
      } else {
        setIsLoading(false);
      }
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            StudyBuddy AI
          </h1>
          <UserButton afterSignOutUrl="/" />
          <ThemeToggle />
        </div>
      </header> */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            StudyBuddy AI
          </h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your studies today.</p>
        </div>
        {/* <Link
          href="/dash"
          className="inline-block w-full text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out rounded-xl shadow-md py-3 px-6 text-center"
        >
          Dashboard_2
        </Link> */}
        <Link
          href="/dash"
          className="inline-block text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out rounded-lg shadow-md py-2 px-4 text-center"
        >
          Dashboard_2
        </Link>
      </main>
    </div>
  );
}
