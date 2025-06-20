'use client';

import { Button } from '@/components/ui/button';
import { Check, Zap, Crown, Star } from 'lucide-react';
import { useState } from 'react';

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const pricingPlans = [
    {
      name: 'Free',
      icon: Zap,
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      color: 'from-gray-500 to-gray-600',
      borderColor: 'border-gray-500/30',
      features: [
        '5 document uploads per month',
        'Basic AI chat (50 messages)',
        'Simple progress tracking',
        'Study reminders',
        'Community support',
      ],
      limitations: ['Limited analytics', 'No goal setting', 'No advanced AI features'],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Pro',
      icon: Star,
      price: { monthly: 19, yearly: 15 },
      description: 'For serious learners',
      color: 'from-[#3A8EF6] to-[#6B46C1]',
      borderColor: 'border-[#3A8EF6]/50',
      features: [
        'Unlimited document uploads',
        'Advanced AI chat & analysis',
        'Comprehensive analytics',
        'Smart goal setting & tracking',
        'Personalized study plans',
        'Priority support',
        'Export capabilities',
        'Integration with popular tools',
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true,
      savings: isYearly ? 'Save $48/year' : null,
    },
    {
      name: 'Ultimate',
      icon: Crown,
      price: { monthly: 39, yearly: 29 },
      description: 'Maximum learning potential',
      color: 'from-[#5CF4A0] to-[#3A8EF6]',
      borderColor: 'border-[#5CF4A0]/50',
      features: [
        'Everything in Pro',
        'Advanced AI tutoring modes',
        'Custom AI personality',
        'Team collaboration features',
        'Priority AI processing',
        'Advanced integrations',
        'Custom branding',
        '1-on-1 success coaching',
        'Early access to new features',
      ],
      limitations: [],
      cta: 'Go Ultimate',
      popular: false,
      savings: isYearly ? 'Save $120/year' : null,
    },
  ];

  return (
    <section id="pricing" className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3A8EF6]/30 bg-gradient-to-r from-[#3A8EF6]/20 to-[#5CF4A0]/20 px-4 py-2">
            <Crown className="h-4 w-4 text-[#3A8EF6]" />
            <span className="text-sm text-[#A0A6B2]">Choose Your Plan</span>
          </div>

          <h2 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
            Invest in Your
            <span className="block bg-gradient-to-r from-[#3A8EF6] to-[#5CF4A0] bg-clip-text text-transparent">
              Learning Success
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-[#A0A6B2]">
            Choose the perfect plan for your learning journey. Start free, upgrade when you&apos;re ready to unlock your
            full potential.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mb-12 flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-[#A0A6B2]'}`}>Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative h-7 w-14 rounded-full transition-all duration-300 ${
              isYearly ? 'bg-gradient-to-r from-[#3A8EF6] to-[#5CF4A0]' : 'bg-white/20'
            }`}
          >
            <div
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
                isYearly ? 'left-8' : 'left-1'
              }`}
            ></div>
          </button>
          <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-[#A0A6B2]'}`}>Yearly</span>
          {isYearly && (
            <div className="rounded-full bg-[#5CF4A0] px-3 py-1 text-xs font-semibold text-[#0B0F19]">
              Save up to 25%
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative border bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl ${plan.borderColor} rounded-3xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'shadow-2xl ring-2 ring-[#3A8EF6]/30' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] px-6 py-2 text-sm font-semibold text-white shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-8 text-center">
                <div
                  className={`h-16 w-16 bg-gradient-to-br ${plan.color} mx-auto mb-4 flex items-center justify-center rounded-2xl`}
                >
                  <plan.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="mb-2 text-2xl font-bold text-white">{plan.name}</h3>
                <p className="mb-4 text-sm text-[#A0A6B2]">{plan.description}</p>

                <div className="mb-2">
                  <span className="text-4xl font-bold text-white">
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-sm text-[#A0A6B2]">/{isYearly ? 'month' : 'month'}</span>
                  )}
                </div>

                {plan.savings && isYearly && <div className="text-sm font-medium text-[#5CF4A0]">{plan.savings}</div>}
              </div>

              {/* Features */}
              <div className="mb-8 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#5CF4A0]" />
                    <span className="text-sm leading-relaxed text-[#F5F5F7]">{feature}</span>
                  </div>
                ))}

                {plan.limitations.map((limitation, limitIndex) => (
                  <div key={limitIndex} className="flex items-start gap-3 opacity-60">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                      <div className="h-1 w-1 rounded-full bg-[#A0A6B2]"></div>
                    </div>
                    <span className="text-sm leading-relaxed text-[#A0A6B2] line-through">{limitation}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                className={`w-full rounded-xl py-4 font-semibold transition-all duration-300 ${
                  plan.name === 'Free'
                    ? 'border border-white/30 bg-white/10 text-white hover:bg-white/20'
                    : plan.popular
                      ? 'bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] text-white shadow-lg hover:from-[#2563eb] hover:to-[#5b21b6] hover:shadow-xl'
                      : 'bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6] text-white shadow-lg hover:from-[#4ade80] hover:to-[#2563eb] hover:shadow-xl'
                }`}
              >
                {plan.cta}
              </Button>

              {/* Glow Effect */}
              {plan.popular && (
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#3A8EF6]/10 to-[#6B46C1]/10"></div>
              )}
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-16 space-y-4 text-center">
          <div className="flex items-center justify-center gap-8 text-sm text-[#A0A6B2]">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#5CF4A0]" />
              <span>No credit card needed</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#5CF4A0]" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#5CF4A0]" />
              <span>30-day money back</span>
            </div>
          </div>

          <p className="text-sm text-[#A0A6B2]">Over 20,000 students trust StudySphere with their learning journey</p>
        </div>
      </div>
    </section>
  );
}
