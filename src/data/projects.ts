import { Project } from "../types";

// Ordered from the biggest project down (the showcase and footer follow this order).
// Projects with an `image` appear in the Portfolio showcase.
export const projectsData: Project[] = [
  {
    id: "pandawa-ai",
    title: "Pandawa.AI",
    description:
      "A web system built with Spring Boot that runs the whole media workflow, from client brief to performance, in four stages: Discover, Plan, Activity and Measures. AI is built into the flow: it reads and rewrites briefs, helps draft media plans and powers the performance dashboards, all behind company single sign-on.",
    image: "/images/work/pandawa-ai.jpg",
    gallery: [
      { src: "/images/work/pandawa-ai/01.jpg", caption: "One flow, four stages: Discover, Plan, Activity, Measures" },
      { src: "/images/work/pandawa-ai/02.jpg", caption: "Voice assistant: ask Pandawa in any language" },
    ],
    features: [
      "Four-stage workflow: Discover, Plan, Activity and Measures",
      "AI service that reads, summarises and rewrites client briefs (PDF, Excel, PowerPoint)",
      "Media plan builder backed by its own Spring Boot API",
      "Performance and BI dashboards per client and campaign",
      "Voice assistant that answers questions about plans, people and workload in any language",
      "Company single sign-on (Okta), notifications and file storage services",
    ],
    stack: ["Java 17", "Spring Boot 3", "Spring Cloud Config", "React 18", "MUI", "Redux Toolkit", "Python", "FastAPI", "OpenAI", "Next.js", "DuckDB", "Google Cloud Storage", "Docker", "Okta SSO"],
    tags: ["Spring Boot", "AI", "SSO", "Microservices"],
    status: "completed",
    link: "#",
  },
  {
    id: "tembi-attendance",
    title: "Tembi Attendance App",
    description:
      "Attendance system for the staff of Rumah Budaya Tembi. Employees clock in from the Tembi Hadir mobile app with face recognition and a location check, request leave from their phone, and HR runs shifts, locations and payroll from one admin panel.",
    image: "/images/work/tembi.jpg",
    gallery: [
      { src: "/images/work/tembi-attendance/01.jpg", caption: "Landing page with app downloads" },
      { src: "/images/work/tembi-attendance/02.jpg", caption: "Features overview" },
      { src: "/images/work/tembi-attendance/03.jpg", caption: "Admin dashboard" },
      { src: "/images/work/tembi-attendance/04.jpg", caption: "Attendance records" },
      { src: "/images/work/tembi-attendance/05.jpg", caption: "Shift management" },
    ],
    features: [
      "Clock in and out with face recognition and a geofence radius per location",
      "Day and night shifts per job position, including shifts that cross midnight",
      "Leave and permit requests with approval status",
      "Attendance statistics: present, late, on leave and absent",
      "Payroll components and monthly payroll",
      "iOS and Android app, plus a landing page for downloads",
    ],
    stack: ["Laravel 12", "Filament 4", "PHP", "MySQL", "Mobile App (iOS & Android)", "Face Recognition", "Geolocation", "Filament Excel"],
    tags: ["Laravel", "Mobile App", "Face Recognition", "Geolocation"],
    status: "completed",
    link: "#",
    client: "Rumah Budaya Tembi",
  },
  {
    id: "undang-in",
    title: "Undang.in",
    description:
      "Digital wedding invitation platform. Couples pick one of five print-inspired themes, fill in their details and send every guest a link with their own name on it. Guests RSVP, leave wishes and send gifts from that one link, and everything lands in the couple's dashboard.",
    image: "/images/work/undang-in/01.jpg",
    gallery: [
      { src: "/images/work/undang-in/01.jpg", caption: "Landing page" },
      { src: "/images/work/undang-in/02.jpg", caption: "Features: named links, RSVP, digital envelope" },
      { src: "/images/work/undang-in/03.jpg", caption: "An invitation's journey, from day 1 to the big day" },
      { src: "/images/work/undang-in/04.jpg", caption: "Theme preview: Sketsa Kebun" },
      { src: "/images/work/undang-in/05.jpg", caption: "Invitation editor with live preview" },
    ],
    features: [
      "Five invitation themes designed like printed cards",
      "Named guest links (Kepada Yth. …) for every guest",
      "RSVP and wishes without a guest account",
      "Digital gift envelope",
      "Editor with live mobile preview: couple, time and venue, photos and music, love story",
      "Admin dashboard for orders, payment checks, invitations and themes",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "NextAuth v5", "Prisma 7", "SQLite", "Tailwind CSS 4", "GSAP", "Lenis", "Three.js"],
    tags: ["Next.js", "React", "Prisma", "RSVP"],
    status: "completed",
    link: "#",
    client: "Undang.in",
  },
  {
    id: "lisa-home-stay",
    title: "Lisa Home Stay",
    description:
      "Website for a homestay in Gili Trawangan, Lombok. Guests browse rooms, rentals and island activities, read the homestay's story and reach the owner on WhatsApp. The owner edits every page, room and rental from a Filament admin panel.",
    image: "/images/work/lisa-home-stay.jpg",
    gallery: [
      { src: "/images/work/lisa-home-stay/01.jpg", caption: "Room detail: Double Room With Balcony" },
      { src: "/images/work/lisa-home-stay/02.jpg", caption: "Room photo gallery" },
      { src: "/images/work/lisa-home-stay/03.jpg", caption: "Rentals & activities: Snorkeling Trip 3 Gili" },
      { src: "/images/work/lisa-home-stay/04.jpg", caption: "Check availability via WhatsApp" },
      { src: "/images/work/lisa-home-stay/05.jpg", caption: "Admin: rooms" },
    ],
    features: [
      "Room pages with type, size, capacity, view and price",
      "Rentals and activities such as snorkeling trips and bike tours",
      "Landing page content editable from the admin (home, story, rental, contact, footer)",
      "Floating WhatsApp button for bookings",
      "Image uploads with Spatie Media Library",
    ],
    stack: ["Laravel 10", "Filament 3", "PHP", "MySQL", "Spatie Media Library", "Tailwind CSS", "Lenis"],
    tags: ["Laravel", "Filament", "PHP", "Tailwind CSS"],
    status: "completed",
    link: "#",
    client: "Lisa Home Stay",
  },
  {
    id: "rama-tani",
    title: "Rama Tani",
    description:
      "One-page website for Rama Tani, a farm supply store in Bunga Mayang, OKU Timur: its products, the crops it serves, how to order and pay, opening hours and a direct WhatsApp line. A fast static site, with the cashier app (SaaS POS) linked from the footer.",
    image: "/images/work/tanikasir-storefront.jpg",
    gallery: [
      { src: "/images/work/rama-tani/01.jpg", caption: "Hero" },
      { src: "/images/work/rama-tani/02.jpg", caption: "Products" },
      { src: "/images/work/rama-tani/03.jpg", caption: "Crops served" },
      { src: "/images/work/rama-tani/04.jpg", caption: "How to order and pay" },
      { src: "/images/work/rama-tani/05.jpg", caption: "Contact and location" },
    ],
    features: [
      "Products, crops served, ordering and payment info in one page",
      "WhatsApp contact and store hours",
      "Scroll animations with GSAP ScrollTrigger",
      "Static build: no server or database, deploys to any static host",
      "Shares design tokens with the SaaS POS app",
    ],
    stack: ["Astro", "GSAP", "ScrollTrigger", "CSS", "Playwright"],
    tags: ["Astro", "GSAP", "Static Site"],
    status: "completed",
    link: "#",
    client: "Rama Tani",
  },
  {
    id: "saas-pos",
    title: "SaaS POS",
    description:
      "Point-of-sale and store management SaaS for farm and electrical supply shops, whose customers are often farmers who pay after harvest. One account can run several stores, each with a cashier, stock, customer credit, suppliers and reports.",
    image: "/images/work/tanikasir.jpg",
    gallery: [
      { src: "/images/work/saas-pos/01.jpg", caption: "Store summary" },
      { src: "/images/work/saas-pos/02.jpg", caption: "Cashier" },
      { src: "/images/work/saas-pos/03.jpg", caption: "Stock & prices" },
      { src: "/images/work/saas-pos/04.jpg", caption: "Customer credit with WhatsApp reminders" },
      { src: "/images/work/saas-pos/05.jpg", caption: "Sales reports" },
    ],
    features: [
      "Multi-store, subscription-based (SaaS)",
      "Cashier with shifts, barcode search and invoices",
      "Stock with sale units, wholesale prices, batches and expiry dates",
      "Customer credit with limits, due dates and WhatsApp reminders",
      "Sales and profit reports with insights, exported to Excel and PDF",
      "Roles, permissions and an activity log",
    ],
    stack: ["Laravel 13", "Filament 5", "Livewire 4", "PHP 8.4", "Tailwind CSS 4", "MySQL 8", "Pest", "Spatie Permission", "DomPDF"],
    tags: ["Laravel", "SaaS", "POS", "Inventory"],
    status: "completed",
    link: "#",
  },
  {
    id: "photobooth-saas",
    title: "Photobooth SaaS",
    description:
      "Photobooth SaaS. Each booth gets its own branded kiosk site, like Snappy Photo Corner: guests pay with QRIS, pick a layout and frame, shoot in HD with a countdown and retakes, choose a filter, then print 4R photos on the spot and take home a digital copy.",
    image: "/images/work/photobooth-saas.jpg",
    gallery: [
      { src: "/images/work/photobooth-saas/01.jpg", caption: "Kiosk landing page" },
      { src: "/images/work/photobooth-saas/02.jpg", caption: "How it works" },
      { src: "/images/work/photobooth-saas/03.jpg", caption: "QRIS payment" },
      { src: "/images/work/photobooth-saas/04.jpg", caption: "Admin dashboard and booth status" },
      { src: "/images/work/photobooth-saas/05.jpg", caption: "Frame themes" },
    ],
    features: [
      "Kiosk flow: pay, choose layout and frame, shoot, filter, print",
      "QRIS payment through Midtrans",
      "Layouts from 1 to 6 photos, and colour or pattern frame themes",
      "7 photo filters, 4R printing and a digital copy via QR",
      "Booth status: printer, camera, paper roll and revenue",
    ],
    stack: ["Laravel 13", "Filament 4", "PHP", "Alpine.js", "React", "Fabric.js", "Three.js", "GSAP", "Intervention Image", "Midtrans"],
    tags: ["Laravel", "SaaS", "Photobooth", "Kiosk"],
    status: "in-progress",
    link: "#",
  },
];

/** Projects with a cover image: used by the hero, the showcase and the footer. */
export const SHOWCASE_PROJECTS = projectsData.filter(
  (p): p is Project & { image: string } => Boolean(p.image)
);
