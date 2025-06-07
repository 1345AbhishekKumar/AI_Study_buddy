// app/dash/components/motivation-quote.tsx
'use client';

import React from 'react';
import { Lightbulb } from 'lucide-react';
import AnimatedWrapper from './animated-wrapper';

interface MotivationQuoteProps {
  quote: {
    text: string;
    author: string;
  };
}

const MotivationQuote: React.FC<MotivationQuoteProps> = ({ quote }) => {
  return (
    <AnimatedWrapper
      delay={450}
      className="bg-gradient-to-br from-teal-600/40 via-slate-800/50 to-purple-600/30 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-slate-700/50 text-center"
    >
      <Lightbulb size={28} className="mx-auto mb-3 text-yellow-300" />
      <p className="text-sm italic text-slate-200 mb-1">&ldquo;{quote.text}&rdquo;</p>
      <p className="text-xs text-slate-400">— {quote.author}</p>
    </AnimatedWrapper>
  );
};

export default MotivationQuote;
