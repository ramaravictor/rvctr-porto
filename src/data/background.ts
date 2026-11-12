// Source: LinkedIn profile (linkedin.com/in/ramasoniravictor), read Nov 2026.
// `image` is shown in the hover preview; items without one get a branded card.
export type BackgroundItem = { title: string; subtitle: string; detail?: string; image?: string };

export const BACKGROUND_GROUPS: { label: string; items: BackgroundItem[] }[] = [
  {
    label: "Work Experience",
    items: [
      {
        title: "Executive Full Stack Developer — WPP Media",
        subtitle: "Feb 2026 — Present · Jakarta · Full-time",
        detail: "Spring Framework • React.js",
        image: "/images/work/pandawa-ai.jpg",
      },
      {
        title: "Course Instructor — Universitas Muhammadiyah Yogyakarta",
        subtitle: "Sep 2022 — Jan 2026 · Yogyakarta · Part-time",
      },
    ],
  },
  {
    label: "Education",
    items: [
      {
        title: "Master of Information Technology — Universitas Gadjah Mada",
        subtitle: "Aug 2023 — Jul 2025",
        detail: "Data Analysis & Pervasive Intelligence · Research in VANET",
        image: "/images/ugm-preview.jpg",
      },
      {
        title: "Bachelor of Computer Science — Universitas Muhammadiyah Yogyakarta",
        subtitle: "Sep 2018 — Aug 2022",
        detail: "Information Technology · GPA 3.52",
        image: "/images/umy-preview.jpg",
      },
    ],
  },
  {
    label: "Certification",
    items: [
      {
        title: "AWS Academy Graduate — Cloud Architecting",
        subtitle: "Amazon Web Services · 2024",
      },
    ],
  },
];
