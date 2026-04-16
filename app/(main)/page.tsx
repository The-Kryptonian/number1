import { HeroSection } from "@/components/landing/hero-section"
import { OperationalHoursBanner } from "@/components/landing/operational-hours-banner"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { CalculatorSection } from "@/components/landing/calculator-section"
import { FaqSection } from "@/components/landing/faq-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OperationalHoursBanner />
      <HowItWorksSection />
      <CalculatorSection />
      <FaqSection />
    </>
  )
}
