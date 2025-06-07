import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 5) return 'Burning the midnight oil';
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
  return date.toLocaleDateString(
    'en-US',
    options || {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }
  );
};
