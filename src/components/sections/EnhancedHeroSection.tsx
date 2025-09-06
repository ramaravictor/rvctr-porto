import { AnimatedSection } from "../ui/AnimatedSection";
import { Button } from "../ui/Button";
import { SITE_CONFIG } from "../../lib/constants";

export const EnhancedHeroSection = () => {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <AnimatedSection animation="fadeIn" delay={200}>
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Code with purpose.
              <br />
              Design with empathy.
              <br />
              Deliver with impact.
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Im {SITE_CONFIG.name}, a fullstack developer from{" "}
              {SITE_CONFIG.location}. I specialize in mobile application
              development with a strong foundation in fullstack tech.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={400}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">AK</span>
              </div>
              <span className="text-sm text-gray-600 font-medium">
                About - Adri Khamid
              </span>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={600}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={scrollToProjects} size="lg">
              View My Work
            </Button>
            <Button variant="secondary" size="lg">
              Download CV
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
