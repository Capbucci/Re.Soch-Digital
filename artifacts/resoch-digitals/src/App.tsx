import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";
import ClientsSection from "@/components/ClientsSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import CTASection from "@/components/CTASection";
import TrustedBySection from "@/components/TrustedBySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppButton from "@/components/WhatsAppButton";
import MarqueeBanner from "@/components/MarqueeBanner";
import RevealSection from "@/components/RevealSection";
import MouseTrailParticles from "@/components/MouseTrailParticles";

function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black cursor-none">
      <CustomCursor />
      <MouseTrailParticles />
      <Navbar />

      <main>
        {/* Hero — no reveal wrapper, it's the first thing users see */}
        <HeroSection />

        <MarqueeBanner
          phrases={["RETHINK", "·", "RE.SOCH", "·", "REIMAGINE", "·", "REINVENT", "·"]}
          direction="left"
          speed={30}
        />

        <RevealSection>
          <AboutSection />
        </RevealSection>

        <RevealSection>
          <ProcessSection />
        </RevealSection>

        <MarqueeBanner
          phrases={["STRATEGY", "·", "CREATIVITY", "·", "GROWTH", "·", "DATA", "·", "CULTURE", "·", "BRAND", "·"]}
          direction="right"
          speed={25}
        />

        <RevealSection>
          <ServicesSection />
        </RevealSection>

        <RevealSection>
          <ClientsSection />
        </RevealSection>

        <MarqueeBanner
          phrases={["DOMINATE", "·", "DISRUPT", "·", "DEFINE", "·", "DELIVER", "·"]}
          direction="left"
          speed={35}
        />

        <RevealSection>
          <WhatWeDoSection />
        </RevealSection>

        <RevealSection>
          <CTASection />
        </RevealSection>

        <RevealSection>
          <TrustedBySection />
        </RevealSection>

        <RevealSection>
          <ContactSection />
        </RevealSection>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
