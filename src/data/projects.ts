import { Project } from "../types";

// TODO: cek ulang deskripsi, tag, tahun, status, dan tim untuk 4 project teratas.
// Isinya saya tulis dari apa yang terlihat di screenshot.
export const projectsData: Project[] = [
  {
    id: "lisa-home-stay",
    title: "Lisa Home Stay",
    description:
      "Website for a homestay in Gili Trawangan, Lombok, with room listings, rentals, story and contact pages, plus a Filament admin panel to manage the content.",
    image: "/images/work/lisa-home-stay.jpg",
    tags: ["Laravel", "Filament", "PHP", "Tailwind CSS"],
    status: "completed",
    link: "#",
    client: "Lisa Home Stay",
  },
  {
    id: "undang-in",
    title: "Undang.in",
    description:
      "Digital wedding invitation platform with curated themes, RSVP and digital guest book, digital gift envelopes, and invitations that go live within minutes once the couple's details are complete.",
    image: "/images/work/undang-in.jpg",
    tags: ["Next.js", "React", "Tailwind CSS", "RSVP"],
    status: "completed",
    link: "#",
    client: "Undang.in",
  },
  {
    id: "tembi-hadir",
    title: "Tembi Hadir — Rumah Tembi Attendance",
    description:
      "Attendance system for employees of Rumah Budaya Tembi, using face recognition and location verification, with iOS and Android apps and a landing page for downloads.",
    image: "/images/work/tembi.jpg",
    tags: ["Laravel", "Mobile App", "Face Recognition", "Geolocation"],
    status: "completed",
    link: "#",
    client: "Rumah Budaya Tembi",
  },
  {
    id: "tanikasir",
    title: "TaniKasir",
    description:
      "Point-of-sale and store management platform for farm supply shops. Owners track daily revenue, gross profit, customer credit with WhatsApp reminders, low stock and expiring batches, while each store gets a public storefront listing its products, crops served, ordering and payment info.",
    image: "/images/work/tanikasir.jpg",
    gallery: [
      { src: "/images/work/tanikasir.jpg", caption: "Store dashboard" },
      { src: "/images/work/tanikasir-storefront.jpg", caption: "Public storefront" },
    ],
    tags: ["Laravel", "Filament", "PHP", "POS", "Inventory"],
    status: "completed",
    link: "#",
  },
  {
    id: "pandawa-ai",
    title: "Pandawa.AI",
    description:
      "Operating console for the whole media workflow, in four stages from client brief to performance: Discover, Plan, Activity and Measures. AI processes read and rewrite briefs, support media planning and power performance dashboards, behind single sign-on for company accounts.",
    image: "/images/work/pandawa-ai.jpg",
    tags: ["AI", "Predictive Analytics", "SSO", "Cloud Run"],
    status: "completed",
    link: "#",
  },
  {
    id: "photobooth-saas",
    title: "Photobooth SaaS",
    description:
      "Photobooth SaaS. Each booth gets its own branded kiosk site, like Snappy Photo Corner: guests pick a frame, shoot in HD with a countdown and retakes, choose from 7 filters, then print 4R photos on the spot and take home a digital copy.",
    image: "/images/work/photobooth-saas.jpg",
    tags: ["Laravel", "SaaS", "Photobooth", "Kiosk"],
    status: "in-progress",
    link: "#",
  },
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
