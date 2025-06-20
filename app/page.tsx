'use client';

import { SparklesAnimation } from '@/components/animations/SparklesAnimation';
import { AIChatSection } from '@/components/sections/AIChatSection';
import { AnalyticsSection } from '@/components/sections/AnalyticsSection';
import { DemoSection } from '@/components/sections/DemoSetion';
import { FeaturesSection } from '@/components/sections/FeatureSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { Footer } from '@/components/sections/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { PricingSection } from '@/components/sections/PricingSection';
import ScienceBackedSection from '@/components/sections/science';
import { SmartUploadSection } from '@/components/sections/SmartUploadSection';
import { StudyPlanSection } from '@/components/sections/StudyPlanSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { TrustedBySection } from '@/components/sections/TrustedBy';
import { WhyAISection } from '@/components/sections/WhyAISection';
import { Navbar1 } from '@/components/sections/navbar-1';
import StudyPlan from '@/components/sections/plan';
import ProgressAnalyticsSection from '@/components/sections/progress';

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-[#0B0F19] dark:text-[#F5F5F7]">
      <SparklesAnimation />
      <Navbar1 />
      <HeroSection />
      <TrustedBySection />
      <DemoSection />
      <FeaturesSection />
      <SmartUploadSection />
      <AIChatSection />
      <StudyPlanSection />
      <StudyPlan />
      <AnalyticsSection />
      <WhyAISection />
      <TestimonialsSection />
      <ScienceBackedSection />
      <ProgressAnalyticsSection />
      <PricingSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
