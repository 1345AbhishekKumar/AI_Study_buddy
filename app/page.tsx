import { Navigation } from '@/components/landing/navigation';
import { HeroSection } from '@/components/landing/hero-section';
import { TrustedBySection } from '@/components/landing/trusted-by-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { CollaborativeSection } from '@/components/landing/collaborative-section';
import { DemoSection } from '@/components/landing/demo-section';
import { AppPreviewsSection } from '@/components/landing/app-previews-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { IntegrationsSection } from '@/components/landing/integrations-section';
import { ComparisonSection } from '@/components/landing/comparison-section';
import { CTASection } from '@/components/landing/cta-section';
import { Footer } from '@/components/landing/footer';
// import { AIAssistantSection } from '@/components/ai-assistant-section';
import AIAssistantSection from '@/components/landing/ai-assistant-section';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <CollaborativeSection />
      <DemoSection />
      <AppPreviewsSection />
      <TestimonialsSection />
      <IntegrationsSection />
      <AIAssistantSection />
      <ComparisonSection />
      <CTASection />
      <Footer />
    </div>
  );
}
