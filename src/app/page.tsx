import { Hero } from "@/components/sections/Hero";
import { PortfolioShowcase } from "@/components/sections/PortfolioShowcase";
import { Experience } from "@/components/sections/Experience";
import { Services } from "@/components/sections/Services";
import { ClientBlur } from "@/components/sections/ClientBlur";
import { FAQ } from "@/components/sections/FAQ";

export default function HomePage() {
  return (
    <main id="main" className="overflow-x-clip bg-[#070707]">
      <Hero />
      <PortfolioShowcase />
      <Experience />
      <Services />
      <ClientBlur />
      <FAQ />
    </main>
  );
}
