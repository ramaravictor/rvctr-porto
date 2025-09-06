import { EnhancedNavigation } from "../components/layout/EnhancedNavigation";
import { HeroSection } from "../components/sections/HeroSection";
import { ComingSoonSection } from "../components/sections/ComingSoonSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { ContactSection } from "../components/sections/ContactSection";
import { Footer } from "../components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <ComingSoonSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
