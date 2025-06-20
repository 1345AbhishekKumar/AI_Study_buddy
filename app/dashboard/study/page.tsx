'use client';

import AnimatedBackground from '@/components/animations/AnimatedBackground';
import { motion } from 'framer-motion';
// highlight-end
import {
  MessageCircle,
  User,
  Bot,
  Send,
  Mic,
  FileText,
  Lightbulb,
  BookOpen,
  Search,
  Maximize2,
  Settings,
} from 'lucide-react';
import { useState } from 'react';
// highlight-start
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

const chatModes = [
  {
    id: 'explain',
    label: 'Explain',
    icon: Lightbulb,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'quiz',
    label: 'Quiz Me',
    icon: MessageCircle,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'summarize',
    label: 'Summarize',
    icon: FileText,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'flashcards',
    label: 'Flashcards',
    icon: BookOpen,
    color: 'from-green-500 to-emerald-500',
  },
];

const suggestedQuestions = [
  'What are the main concepts in this chapter?',
  'Can you create a quiz on photosynthesis?',
  'Explain this diagram in simple terms',
  'What are the key takeaways?',
];

const chatHistory = [
  {
    type: 'ai',
    message:
      "Hi! I'm your AI study buddy. I've analyzed your Biology Chapter 5 document. What would you like to explore today?",
    time: 'Just now',
    suggestions: ['Explain photosynthesis', 'Create flashcards', 'Quiz me on this chapter'],
  },
  {
    type: 'user',
    message: 'Can you explain the process of photosynthesis in simple terms?',
    time: '2 minutes ago',
  },
  {
    type: 'ai',
    message:
      "Absolutely! Photosynthesis is like a plant's kitchen where they make their own food. Here's how it works:\n\n🌱 **Ingredients needed:**\n- Sunlight (energy source)\n- Water (H₂O) from roots\n- Carbon dioxide (CO₂) from air\n\n🧪 **The process:**\n1. Chlorophyll in leaves captures sunlight\n2. Water and CO₂ combine using this energy\n3. Plants create glucose (sugar) for food\n4. Oxygen is released as a bonus!\n\n**Simple equation:** 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂\n\nThink of it as solar-powered cooking! 🌞",
    time: '2 minutes ago',
    highlights: ['chlorophyll', 'glucose', 'oxygen'],
  },
];

export default function StudyModePage() {
  const [activeMode, setActiveMode] = useState('explain');
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would add the new message to the chatHistory state
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Handle voice input logic
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    // highlight-start
    <PanelGroup direction="horizontal" className="h-[calc(100vh-8rem)]">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 dark:from-gray-900/50 dark:via-transparent dark:to-gray-900/50 pointer-events-none z-0">
        <AnimatedBackground />
      </div>
      {/* Document Viewer Panel */}
      <Panel defaultSize={65} minSize={30}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          // Ensure the div fills the panel and lays out its children correctly
          className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl"
        >
          {/* Document Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1]">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="max-w-[250px] truncate font-semibold text-white sm:max-w-md">
                  Biology Chapter 5: Photosynthesis
                </h3>
                <p className="text-xs text-[#A0A6B2]">Page 1 of 24</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20">
                <Search className="h-4 w-4 text-[#A0A6B2]" />
              </button>
              <button className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20">
                <Maximize2 className="h-4 w-4 text-[#A0A6B2]" />
              </button>
              <button className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20">
                <Settings className="h-4 w-4 text-[#A0A6B2]" />
              </button>
            </div>
          </div>

          {/* Document Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="prose prose-invert max-w-none">
              <h2 className="mb-4 text-2xl font-bold text-white">Chapter 5: Photosynthesis</h2>

              <div className="space-y-4 leading-relaxed text-[#A0A6B2]">
                <p>
                  <span className="rounded bg-[#5CF4A0]/30 px-1 text-white">Photosynthesis</span> is the process by
                  which green plants and some other organisms use{' '}
                  <span className="rounded bg-[#5CF4A0]/30 px-1 text-white">sunlight</span> to synthesize foods with the
                  help of <span className="rounded bg-[#5CF4A0]/30 px-1 text-white">chlorophyll</span>.
                </p>
                <p>
                  The process involves the absorption of light energy by chlorophyll molecules located in the
                  chloroplasts of plant cells. This energy is then used to convert carbon dioxide and water into glucose
                  and oxygen.
                </p>
                <p>The overall equation for photosynthesis can be written as:</p>
                <div className="my-4 rounded-lg border-l-4 border-[#3A8EF6] bg-white/10 p-4">
                  <code className="font-mono text-[#5CF4A0]">6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂</code>
                </div>
                <p>
                  This process is fundamental to life on Earth as it produces oxygen and serves as the primary source of
                  energy for most living organisms through the food chain.
                </p>
                <h3 className="mb-3 mt-6 text-xl font-semibold text-white">Key Components</h3>
                <ul className="list-none space-y-2 p-0">
                  <li>
                    • <strong className="text-white">Chloroplasts:</strong> The organelles where photosynthesis occurs
                  </li>
                  <li>
                    • <strong className="text-white">Chlorophyll:</strong> The green pigment that captures light energy
                  </li>
                  <li>
                    • <strong className="text-white">Stomata:</strong> Pores in leaves that allow gas exchange
                  </li>
                  <li>
                    • <strong className="text-white">Thylakoids:</strong> Membrane structures within chloroplasts
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
        {/* highlight-start */}
      </Panel>

      <PanelResizeHandle className="group flex w-2.5 items-center justify-center">
        <div className="h-10 w-1 rounded-full bg-white/10 transition-colors group-hover:bg-white/20" />
      </PanelResizeHandle>

      {/* AI Chat Panel */}
      <Panel defaultSize={35} minSize={25}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          // Ensure the div fills the panel
          className="flex h-full flex-col rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl"
        >
          {/* highlight-end */}
          {/* Chat Header */}
          <div className="shrink-0 border-b border-white/10 p-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1]">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Study Buddy</h3>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-[#5CF4A0]"></div>
                  <span className="text-xs text-[#A0A6B2]">Online & Ready</span>
                </div>
              </div>
            </div>

            {/* Chat Modes */}
            <div className="grid grid-cols-2 gap-2">
              {chatModes.map(mode => (
                <motion.button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`flex items-center justify-center gap-2 rounded-lg p-2 text-xs font-medium transition-all duration-300 ${
                    activeMode === mode.id
                      ? 'bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] text-white'
                      : 'bg-white/10 text-[#A0A6B2] hover:bg-white/20 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <mode.icon className="h-3 w-3" />
                  {mode.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {chatHistory.map((chat, index) => (
              <motion.div
                key={index}
                className={`flex gap-3 ${chat.type === 'user' ? 'flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    chat.type === 'user' ? 'bg-[#3A8EF6]' : 'bg-gradient-to-br from-[#6B46C1] to-[#3A8EF6]'
                  }`}
                >
                  {chat.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>

                <div className={`flex-1 ${chat.type === 'user' ? 'flex flex-col items-end' : ''}`}>
                  <div
                    className={`rounded-2xl p-3 ${
                      chat.type === 'user'
                        ? 'rounded-br-none bg-[#3A8EF6] text-white'
                        : 'rounded-bl-none border border-white/20 bg-white/10 text-white'
                    }`}
                  >
                    <p className="whitespace-pre-line text-sm leading-relaxed">{chat.message}</p>
                  </div>

                  {chat.suggestions && (
                    <div className="mt-2 space-y-1">
                      {chat.suggestions.map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block text-xs text-[#3A8EF6] transition-colors hover:text-[#5CF4A0]"
                        >
                          💡 {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="mt-1 text-xs text-[#A0A6B2]">{chat.time}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Suggested Questions */}
          <div className="shrink-0 border-t border-white/10 p-4">
            <div className="mb-3">
              <div className="mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-[#5CF4A0]" />
                <span className="text-sm font-medium text-white">Quick Questions</span>
              </div>
              <div className="space-y-1">
                {suggestedQuestions.slice(0, 2).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(question)}
                    className="block w-full rounded-lg p-2 text-left text-xs text-[#A0A6B2] transition-colors hover:bg-white/5 hover:text-[#3A8EF6]"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="shrink-0 border-t border-white/10 p-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask anything..."
                  className="w-full rounded-lg border border-white/20 bg-white/10 py-2 pl-3 pr-10 text-sm text-white placeholder-[#A0A6B2] transition-colors focus:border-[#3A8EF6]/50 focus:outline-none"
                />
                <motion.button
                  onClick={handleVoiceInput}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 transition-all duration-300 ${
                    isListening ? 'bg-red-500/50 text-white' : 'text-[#A0A6B2] hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mic className="h-4 w-4" />
                </motion.button>
              </div>
              <motion.button
                onClick={handleSendMessage}
                className="aspect-square rounded-lg bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] p-2 text-white transition-all duration-300 hover:from-[#2563eb] hover:to-[#5b21b6] disabled:opacity-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={!message.trim()}
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Panel>
    </PanelGroup>
  );
}
