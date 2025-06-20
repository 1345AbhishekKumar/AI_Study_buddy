'use client';

import { Upload, FileText, Youtube, Globe, Sparkles, ArrowRight } from 'lucide-react';

export function SmartUploadSection() {
  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left - Visual Mockup */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-2xl backdrop-blur-xl">
              {/* Upload Interface Mockup */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Smart Upload</h3>
                  <div className="h-3 w-3 animate-pulse rounded-full bg-[#5CF4A0]"></div>
                </div>

                {/* Upload Zones */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="group cursor-pointer rounded-xl border border-red-500/30 bg-gradient-to-br from-red-500/20 to-red-600/10 p-4 transition-all duration-300 hover:border-red-400/50">
                    <Youtube className="mb-2 h-6 w-6 text-red-400" />
                    <div className="text-sm font-medium text-white">YouTube Videos</div>
                    <div className="text-xs text-[#A0A6B2]">Extract transcripts & key points</div>
                  </div>

                  <div className="group cursor-pointer rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-blue-600/10 p-4 transition-all duration-300 hover:border-blue-400/50">
                    <FileText className="mb-2 h-6 w-6 text-blue-400" />
                    <div className="text-sm font-medium text-white">PDF Documents</div>
                    <div className="text-xs text-[#A0A6B2]">Analyze & summarize content</div>
                  </div>

                  <div className="group cursor-pointer rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/20 to-green-600/10 p-4 transition-all duration-300 hover:border-green-400/50">
                    <Globe className="mb-2 h-6 w-6 text-green-400" />
                    <div className="text-sm font-medium text-white">Web Articles</div>
                    <div className="text-xs text-[#A0A6B2]">Scrape & process articles</div>
                  </div>

                  <div className="group cursor-pointer rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-purple-600/10 p-4 transition-all duration-300 hover:border-purple-400/50">
                    <Upload className="mb-2 h-6 w-6 text-purple-400" />
                    <div className="text-sm font-medium text-white">Any File</div>
                    <div className="text-xs text-[#A0A6B2]">Drag & drop support</div>
                  </div>
                </div>

                {/* Processing Preview */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="mb-3 flex items-center gap-3">
                    <Sparkles className="h-5 w-5 animate-pulse text-[#5CF4A0]" />
                    <span className="text-sm font-medium text-white">AI Processing...</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#A0A6B2]">Extracting key concepts</span>
                      <span className="text-[#5CF4A0]">Complete</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#A0A6B2]">Generating flashcards</span>
                      <span className="text-[#3A8EF6]">In progress</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#A0A6B2]">Creating summary</span>
                      <span className="text-[#A0A6B2]">Queued</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -right-6 -top-6 rounded-full bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] p-3 shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 space-y-8 lg:order-2">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#3A8EF6]/30 bg-gradient-to-r from-[#3A8EF6]/20 to-[#6B46C1]/20 px-4 py-2">
                <Upload className="h-4 w-4 text-[#3A8EF6]" />
                <span className="text-sm text-[#A0A6B2]">Smart Content Processing</span>
              </div>

              <h2 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
                Upload Anything,
                <span className="block text-[#3A8EF6]">Learn Everything</span>
              </h2>

              <p className="text-xl leading-relaxed text-[#A0A6B2]">
                Transform any content into personalized learning experiences. Our AI understands context, extracts key
                insights, and creates tailored study materials just for you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#3A8EF6]">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Extract Summaries & Key Points</h3>
                  <p className="text-[#A0A6B2]">
                    AI automatically identifies the most important concepts and creates concise summaries for faster
                    comprehension.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#6B46C1]">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Generate Smart Flashcards</h3>
                  <p className="text-[#A0A6B2]">
                    Automatically create interactive flashcards and quizzes based on your uploaded content for active
                    recall practice.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#5CF4A0]">
                  <ArrowRight className="h-4 w-4 text-[#0B0F19]" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Interactive AI Chat</h3>
                  <p className="text-[#A0A6B2]">
                    Ask questions, get explanations, and dive deeper into any topic with your personal AI study
                    companion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
