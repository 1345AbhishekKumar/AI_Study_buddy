// lib/types.ts

export interface Session {
  id: string;
  subject: string;
  topic: string;
  time: string;
  tagColor: string;
  type: 'Lecture' | 'Practice' | 'Review' | 'Project';
  isCurrent?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface QuickActionItem {
  id: string;
  label: string;
  icon: React.ElementType;
  action: () => void;
}
