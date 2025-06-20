'use client';

import { Star, Quote, GraduationCap, Briefcase, BookOpen } from 'lucide-react';
// import { useState } from 'react'

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Medical Student',
      university: 'Stanford University',
      avatar: 'SC',
      rating: 5,
      quote:
        'StudySphere completely transformed how I study for med school. The AI chat feature helps me understand complex concepts instantly, and the analytics show me exactly where to focus my limited time.',
      icon: GraduationCap,
      color: 'from-[#3A8EF6] to-[#6B46C1]',
    },
    {
      name: 'Marcus Johnson',
      role: 'Software Engineer',
      university: 'Continuing Education',
      avatar: 'MJ',
      rating: 5,
      quote:
        "As a working professional, I needed flexible learning. The AI study buddy adapts to my schedule and keeps me motivated. I've completed 3 certifications in 6 months!",
      icon: Briefcase,
      color: 'from-[#5CF4A0] to-[#3A8EF6]',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Psychology Major',
      university: 'UC Berkeley',
      avatar: 'ER',
      rating: 5,
      quote:
        'The way StudySphere organizes my readings and creates personalized flashcards is incredible. My grades improved by a full letter grade this semester.',
      icon: BookOpen,
      color: 'from-[#6B46C1] to-[#5CF4A0]',
    },
    {
      name: 'David Park',
      role: 'High School Senior',
      university: 'College Prep',
      avatar: 'DP',
      rating: 5,
      quote:
        'SAT prep was stressing me out until I found StudySphere. The AI identifies my weak areas and creates targeted practice. Scored 1540 on my first try!',
      icon: GraduationCap,
      color: 'from-[#3A8EF6] to-[#5CF4A0]',
    },
    {
      name: 'Lisa Thompson',
      role: 'MBA Student',
      university: 'Wharton School',
      avatar: 'LT',
      rating: 5,
      quote:
        'Managing case studies and group projects became so much easier. The AI helps me extract key insights from massive documents in minutes instead of hours.',
      icon: Briefcase,
      color: 'from-[#6B46C1] to-[#3A8EF6]',
    },
    {
      name: 'Alex Kim',
      role: 'Language Learner',
      university: 'Self-Directed',
      avatar: 'AK',
      rating: 5,
      quote:
        'Learning Spanish with StudySphere feels like having a personal tutor. The AI conversations help me practice, and the spaced repetition keeps vocabulary fresh.',
      icon: BookOpen,
      color: 'from-[#5CF4A0] to-[#6B46C1]',
    },
  ];

  return (
    <section className="bg-gradient-to-br from-[#1a1f2e] to-[#0B0F19] px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5CF4A0]/30 bg-gradient-to-r from-[#5CF4A0]/20 to-[#6B46C1]/20 px-4 py-2">
            <Star className="h-4 w-4 text-[#5CF4A0]" />
            <span className="text-sm text-[#A0A6B2]">Student Success Stories</span>
          </div>

          <h2 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
            Loved by
            <span className="block bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6] bg-clip-text text-transparent">
              20,000+ Learners
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-[#A0A6B2]">
            See how students, professionals, and lifelong learners are achieving their goals with AI-powered study
            support.
          </p>
        </div>

        {/* Featured Testimony */}
        <div className="mx-auto mb-16 max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 text-center backdrop-blur-xl">
            <Quote className="mx-auto mb-6 h-16 w-16 text-[#3A8EF6]/30" />

            <blockquote className="mb-6 text-2xl font-medium leading-relaxed text-white lg:text-3xl">
              &quot;StudySphere is like having a brilliant study partner who never gets tired, always has the right
              answer, and keeps me motivated 24/7.&quot;
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1] text-lg font-bold text-white">
                AI
              </div>
              <div>
                <div className="font-semibold text-white">Generated by AI</div>
                <div className="text-sm text-[#A0A6B2]">Based on 20,000+ user reviews</div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="absolute right-6 top-6 rounded-full bg-[#5CF4A0] px-4 py-2 text-sm font-semibold text-[#0B0F19]">
              4.9/5 ⭐
            </div>

            {/* Background Glow */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#3A8EF6]/10 via-transparent to-[#6B46C1]/10"></div>
          </div>
        </div>

        {/* Individual Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="transform cursor-pointer rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-[#3A8EF6]/50"
            >
              {/* Header */}
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`h-12 w-12 bg-gradient-to-br ${testimonial.color} flex items-center justify-center rounded-full font-bold text-white`}
                >
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-[#A0A6B2]">{testimonial.role}</div>
                  <div className="text-xs text-[#A0A6B2]">{testimonial.university}</div>
                </div>
                <testimonial.icon className="h-5 w-5 text-[#A0A6B2]" />
              </div>

              {/* Rating */}
              <div className="mb-4 flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-[#5CF4A0]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm leading-relaxed text-[#A0A6B2]">
                &quot;{testimonial.quote}&quot;
              </blockquote>

              {/* Hover Glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3A8EF6]/5 to-[#6B46C1]/5 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] bg-clip-text text-3xl font-bold text-transparent">
              20K+
            </div>
            <div className="text-sm text-[#A0A6B2]">Active Learners</div>
          </div>
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6] bg-clip-text text-3xl font-bold text-transparent">
              4.9/5
            </div>
            <div className="text-sm text-[#A0A6B2]">Average Rating</div>
          </div>
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-[#6B46C1] to-[#5CF4A0] bg-clip-text text-3xl font-bold text-transparent">
              2.5M+
            </div>
            <div className="text-sm text-[#A0A6B2]">Study Sessions</div>
          </div>
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-[#3A8EF6] to-[#5CF4A0] bg-clip-text text-3xl font-bold text-transparent">
              94%
            </div>
            <div className="text-sm text-[#A0A6B2]">Goal Achievement</div>
          </div>
        </div>
      </div>
    </section>
  );
}
