import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ProgramsSection } from "@/components/programs-section"
import { BootcampSection } from "@/components/bootcamp-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { RegistrationModal } from "@/components/registration/registration-modal"

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Header />
      <HeroSection />
      <ServicesSection />
      <ProgramsSection />
      <BootcampSection />
      <TechStackSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
      <RegistrationModal />
    </main>
  )
}
