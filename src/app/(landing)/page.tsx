import { Metadata } from "next";
import { BackgroundPattern } from "@/components/landing/BackgroundPattern";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/Hero";
import { ShowcaseSection } from "@/components/landing/Showcase";
import { FeaturesSection } from "@/components/landing/Features";
import { HowItWorksSection } from "@/components/landing/HowItWorks";
import { TestimonialsSection } from "@/components/landing/Testimonials";
import { CtaSection } from "@/components/landing/Cta";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Home",
};

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground min-h-screen font-sans transition-colors duration-300">
      <BackgroundPattern />
      <Navbar />
      <main>
        <HeroSection />
        <ShowcaseSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
