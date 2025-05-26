import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { TrustedBySection } from '@/components/trusted-by-section';
import { FeaturesSection } from '@/components/features-section';
import { CollaborativeSection } from '@/components/collaborative-section';
import { DemoSection } from '@/components/demo-section';
import { AppPreviewsSection } from '@/components/app-previews-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { IntegrationsSection } from '@/components/integrations-section';
import { ComparisonSection } from '@/components/comparison-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
// import { AIAssistantSection } from '@/components/ai-assistant-section';
import AIAssistantSection from '@/components/ai-assistant-section';

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
