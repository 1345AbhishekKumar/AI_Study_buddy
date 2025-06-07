// app/dash/components/ai-chat-interface.tsx
'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedWrapper from './animated-wrapper';
import { ChatMessage } from '@/lib/types';

interface AiChatInterfaceProps {
  chatMessages: ChatMessage[];
  chatInput: string;
  userInitials: string;
  onChatInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const AiChatInterface: React.FC<AiChatInterfaceProps> = ({
  chatMessages,
  chatInput,
  userInitials,
  onChatInputChange,
  onSendMessage,
  onKeyPress,
}) => {
  return (
    <AnimatedWrapper
      delay={200}
      className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-slate-700/50"
    >
      <h2 className="text-xl font-semibold text-slate-100 mb-4">StudyOS Assistant</h2>
      <div className="h-64 mb-4 overflow-y-auto custom-scrollbar bg-slate-900/50 rounded-lg p-4 space-y-3">
        {chatMessages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            {msg.sender === 'ai' && (
              <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                AI
              </div>
            )}
            <div
              className={`max-w-[70%] p-3 rounded-lg text-sm ${
                msg.sender === 'user' ? 'bg-teal-500 text-white' : 'bg-slate-700 text-slate-200'
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-xs opacity-60 mt-1 text-right">{msg.timestamp}</p>
            </div>
            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-full bg-slate-600 flex items-center justify-center text-slate-200 font-bold text-xs flex-shrink-0">
                {userInitials}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={chatInput}
          onChange={onChatInputChange}
          onKeyPress={onKeyPress}
          placeholder="Ask about anything..."
          className="flex-grow bg-slate-700/80 border border-slate-600 text-slate-200 placeholder-slate-500 text-sm rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
        />
        <button
          onClick={onSendMessage}
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold p-2.5 rounded-lg transition-colors flex items-center justify-center shadow-md hover:shadow-teal-500/30"
          aria-label="Send message"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </AnimatedWrapper>
  );
};

export default AiChatInterface;
