import {
  FeatureSection,
  HeroSection,
  HowItWorksSection,
} from '@/components/features/landing';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeatureSection />
      <HowItWorksSection />
    </div>
  );
}
