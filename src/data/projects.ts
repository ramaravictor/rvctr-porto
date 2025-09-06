import { Project } from "../types";

export const projectsData: Project[] = [
  {
    id: "face-recognition-attendance",
    title: "Face Recognition Attendance System for SDN Sukatani VI",
    description:
      "A mobile and web-based attendance system using face recognition for teachers at SDN Sukatani VI built with React Native, Next.js, and Python. The system includes real-time monitoring models to enhance accuracy and efficiency.",
    tags: [
      "React Native",
      "Next.js",
      "Python",
      "Face Recognition",
      "Machine Learning",
    ],
    status: "completed",
    teamSize: 1,
    link: "#",
    year: "2024",
    client: "SDN Sukatani VI",
  },
  {
    id: "loista-company-profile",
    title: "Loista Company Profile",
    description:
      "LOISTA Company Profile built as a Content Management System (CMS) using Laravel to showcase their furniture and interior design services.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&q=80",
    tags: ["Laravel", "CMS", "Web Design", "PHP", "MySQL"],
    status: "completed",
    teamSize: 3,
    link: "#",
    year: "2024",
    client: "Loista Furniture",
  },
  {
    id: "medical-student-app",
    title: "Medical Student Attendance App",
    description:
      "A facial recognition-based attendance tracking application for the Faculty of Medicine and Health Sciences, Universitas Muhammadiyah Yogyakarta.",
    tags: ["Mobile App", "Face Recognition", "React Native", "Firebase"],
    status: "completed",
    teamSize: 1,
    link: "#",
    year: "2023",
    client: "Universitas Muhammadiyah Yogyakarta",
  },
];
