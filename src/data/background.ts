// Source: LinkedIn profile (linkedin.com/in/ramasoniravictor), read Nov 2026,
// rewritten as short stories. `image` is shown in the hover preview; items
// without one get a branded card built from `badge`, `org` and `meta`.
export type BackgroundItem = {
  /** Small tag above the headline, e.g. "Work". */
  badge: string;
  /** Place, dates, type. */
  meta: string;
  /** Story-style headline. */
  title: string;
  /** One casual sentence. */
  story: string;
  /** Organisation, used on the fallback preview card. */
  org: string;
  image?: string;
};

export const BACKGROUND_GROUPS: { label: string; items: BackgroundItem[] }[] = [
  {
    label: "Chapter 01 · Work",
    items: [
      {
        badge: "Work",
        meta: "Jakarta · Feb 2026 — now · Full-time",
        title: "Moved to Jakarta and joined WPP Media",
        story:
          "These days I'm an Executive Full Stack Developer, shipping products with Spring Framework and React.",
        org: "WPP Media",
        image: "/images/work/pandawa-ai.jpg",
      },
      {
        badge: "Teaching",
        meta: "Yogyakarta · Sep 2022 — Jan 2026 · Part-time",
        title: "Teaching back at my old campus",
        story:
          "For more than three years I taught part-time at UMY, the same campus where I earned my degree.",
        org: "Universitas Muhammadiyah Yogyakarta",
      },
    ],
  },
  {
    label: "Chapter 02 · School",
    items: [
      {
        badge: "Master's",
        meta: "Yogyakarta · Aug 2023 — Jul 2025",
        title: "Going back to school for a master's at UGM",
        story:
          "Two years of data analysis and pervasive intelligence, with my research focused on VANET.",
        org: "Universitas Gadjah Mada",
        image: "/images/ugm-preview.jpg",
      },
      {
        badge: "Bachelor's",
        meta: "Yogyakarta · Sep 2018 — Aug 2022",
        title: "Where it all started: Information Technology at UMY",
        story: "Four years of my bachelor's at UMY, wrapped up with a 3.52 GPA.",
        org: "Universitas Muhammadiyah Yogyakarta",
        image: "/images/umy-preview.jpg",
      },
    ],
  },
  {
    label: "Chapter 03 · Certified",
    items: [
      {
        badge: "Certification",
        meta: "Amazon Web Services · 2024",
        title: "Learning to architect for the cloud",
        story: "Completed AWS Academy Cloud Architecting to get serious about how apps run in production.",
        org: "AWS Academy",
      },
    ],
  },
];
