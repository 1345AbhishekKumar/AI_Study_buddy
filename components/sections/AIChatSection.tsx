'use client';

import { MessageCircle, User, Bot, Lightbulb, BookOpen, Target } from 'lucide-react';

// import { useState } from 'react';

export function AIChatSection() {
  // const [activeChat, setActiveChat] = useState(0);

  const chatMessages = [
    {
      type: 'user',
      message: 'Can you explain the concept of photosynthesis in simple terms?',
      time: '2:34 PM',
    },
    {
      type: 'ai',
      message:
        "Photosynthesis is how plants make their own food using sunlight! Think of it like a plant's kitchen where they combine sunlight, water, and carbon dioxide to create sugar (glucose) for energy. The green substance called chlorophyll helps capture the sunlight.",
      time: '2:34 PM',
      highlights: ['sunlight', 'chlorophyll', 'glucose'],
    },
    {
      type: 'user',
      message: "What's the chemical equation for this process?",
      time: '2:35 PM',
    },
    {
      type: 'ai',
      message:
        'The chemical equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. This shows that 6 molecules of carbon dioxide plus 6 molecules of water, with light energy, produce 1 molecule of glucose and 6 molecules of oxygen.',
      time: '2:35 PM',
      equation: true,
    },
  ];

  return (
    <section className="bg-gradient-to-br from-[#1a1f2e] to-[#0B0F19] px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6B46C1]/30 bg-gradient-to-r from-[#6B46C1]/20 to-[#3A8EF6]/20 px-4 py-2">
            <MessageCircle className="h-4 w-4 text-[#6B46C1]" />
            <span className="text-sm text-[#A0A6B2]">AI Chat in Action</span>
          </div>

          <h2 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
            Your Personal
            <span className="block bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] bg-clip-text text-transparent">
              Study Companion
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-[#A0A6B2]">
            Experience interactive learning like never before. Chat with your AI study buddy to get instant
            explanations, clarifications, and personalized insights from any document.
          </p>
        </div>

        {/* Chat Interface Mockup */}
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Document Panel */}
            <div className="lg:col-span-1">
              <div className="h-full rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl">
                <div className="mb-6 flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-[#3A8EF6]" />
                  <span className="font-semibold text-white">Biology Chapter 5</span>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="rounded-lg border-l-2 border-[#5CF4A0] bg-white/5 p-3">
                    <p className="leading-relaxed text-white">
                      <span className="rounded bg-[#5CF4A0]/30 px-1">Photosynthesis</span> is the process by which green
                      plants and some other organisms use <span className="rounded bg-[#5CF4A0]/30 px-1">sunlight</span>{' '}
                      to synthesize foods with the help of{' '}
                      <span className="rounded bg-[#5CF4A0]/30 px-1">chlorophyll</span>.
                    </p>
                  </div>

                  <div className="rounded-lg bg-white/5 p-3">
                    <p className="leading-relaxed text-[#A0A6B2]">
                      The process involves the absorption of light energy by chlorophyll molecules located in the
                      chloroplasts of plant cells...
                    </p>
                  </div>

                  <div className="rounded-lg bg-white/5 p-3">
                    <p className="leading-relaxed text-[#A0A6B2]">
                      This process is fundamental to life on Earth as it produces oxygen and serves as the primary
                      source of energy...
                    </p>
                  </div>
                </div>

                {/* Suggested Questions */}
                <div className="mt-6 border-t border-white/10 pt-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-[#5CF4A0]" />
                    <span className="text-sm font-medium text-white">Suggested Questions</span>
                  </div>
                  <div className="space-y-2">
                    {['What is the role of chlorophyll?', 'Why is oxygen produced?', 'How does light energy help?'].map(
                      (question, index) => (
                        <button
                          key={index}
                          className="w-full rounded-lg p-2 text-left text-xs text-[#A0A6B2] transition-all duration-200 hover:bg-white/5 hover:text-[#3A8EF6]"
                        >
                          {question}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Panel */}
            <div className="lg:col-span-2">
              <div className="h-full rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1]">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-semibold text-white">AI Study Buddy</span>
                    <div className="h-2 w-2 animate-pulse rounded-full bg-[#5CF4A0]"></div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#A0A6B2]">
                    <Target className="h-3 w-3" />
                    <span>Context-aware responses</span>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="mb-6 max-h-96 space-y-4 overflow-y-auto">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          msg.type === 'user' ? 'bg-[#3A8EF6]' : 'bg-gradient-to-br from-[#6B46C1] to-[#3A8EF6]'
                        }`}
                      >
                        {msg.type === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>

                      <div className={`max-w-md flex-1 ${msg.type === 'user' ? 'text-right' : ''}`}>
                        <div
                          className={`rounded-2xl p-4 ${
                            msg.type === 'user'
                              ? 'bg-[#3A8EF6] text-white'
                              : 'border border-white/20 bg-white/10 text-white'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">
                            {msg.type === 'ai' && msg.highlights ? (
                              <>
                                {msg.message.split(new RegExp(`(${msg.highlights.join('|')})`, 'gi')).map((part, i) =>
                                  msg.highlights.some(highlight => part.toLowerCase() === highlight.toLowerCase()) ? (
                                    <span key={i} className="rounded bg-[#5CF4A0]/30 px-1">
                                      {part}
                                    </span>
                                  ) : (
                                    part
                                  )
                                )}
                              </>
                            ) : msg.equation ? (
                              <>
                                {msg.message.split('6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂').map((part, i) => (
                                  <span key={i}>
                                    {part}
                                    {i === 0 && (
                                      <span className="my-2 block rounded-lg bg-white/10 p-2 text-center font-mono text-[#5CF4A0]">
                                        6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂
                                      </span>
                                    )}
                                  </span>
                                ))}
                              </>
                            ) : (
                              msg.message
                            )}
                          </p>
                        </div>
                        <div className="mt-1 px-2 text-xs text-[#A0A6B2]">{msg.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="flex gap-3">
                  <div className="flex-1 rounded-xl border border-white/20 bg-white/5 p-3 backdrop-blur-sm">
                    <input
                      type="text"
                      placeholder="Ask anything about this document..."
                      className="w-full bg-transparent text-sm text-white placeholder-[#A0A6B2] outline-none"
                    />
                  </div>
                  <button className="rounded-xl bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] p-3 transition-all duration-300 hover:shadow-lg">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
