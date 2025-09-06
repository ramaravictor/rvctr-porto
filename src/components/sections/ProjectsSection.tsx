import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "Face Recognition Attendance System for SDN Sukatani VI",
    description:
      "A mobile and web-based attendance system using face recognition for teachers at SDN Sukatani VI built with React Native, Next.js, and Python. The system includes real-time monitoring models to enhance accuracy and efficiency.",
    tags: ["React Native", "Next.js", "Python", "Face Recognition"],
    status: "completed" as const,
    teamSize: 1,
    link: "#",
  },
  {
    title: "Loista Company Profile",
    description:
      "LOISTA Company Profile built as a Content Management System (CMS) using Laravel to showcase their furniture and interior design services.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&q=80",
    tags: ["Laravel", "CMS", "Web Design"],
    status: "completed" as const,
    teamSize: 3,
    link: "#",
  },
  {
    title: "Medical Student Attendance App",
    description:
      "A facial recognition-based attendance tracking application for the Faculty of Medicine and Health Sciences, Universitas Muhammadiyah Yogyakarta.",
    tags: ["Mobile App", "Face Recognition", "React Native"],
    status: "completed" as const,
    teamSize: 1,
    link: "#",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A collection of projects that showcase my skills and experience in
            full-stack development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-12">
            <ProjectCard {...projects[0]} />
            <ProjectCard {...projects[2]} />
          </div>

          <div className="lg:pt-24">
            <ProjectCard {...projects[1]} />
          </div>
        </div>
      </div>
    </section>
  );
};
