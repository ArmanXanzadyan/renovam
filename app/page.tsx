import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUs } from "@/components/sections/WhyUs";
import { CalculatorTeaser } from "@/components/sections/CalculatorTeaser";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesSection limit={8} />
      <WhyUs />
      <CalculatorTeaser />
      <PortfolioPreview />
      <TestimonialsSection />
      <FaqSection />
      <CtaBand />
    </>
  );
}
