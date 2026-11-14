# rvctr-porto

Personal portfolio of Rama Soni Ravictor, Software Engineer in Jakarta.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · GSAP + ScrollTrigger · Lenis

## Run

```bash
npm install
npm run dev      # http://localhost:3000 (use -p 3001 if 3000 is taken)
npm run build    # don't run while `next dev` is running: both write to .next/
npm run lint
```

## Structure

```
src/
  app/                  routes: home, /work/[slug] detail pages, page transition (template.tsx)
  components/
    layout/             Header, Footer
    sections/           home page sections, in page order (see app/page.tsx)
    ui/                 small reusable pieces: RevealText, FadeIn, Reveal, PluckString, Cursor, ArrowIcon
    providers/          SmoothScroll (Lenis synced with ScrollTrigger)
  data/                 all site content: projects, background, services, tech stack, FAQ, navigation
  hooks/                useMediaQuery, useFinePointer
  lib/                  gsap setup, lenis store, site config, helpers
  types/                shared types
public/images/          web-sized images only
  work/<project>/       detail-page galleries (01–05.jpg)
assets-source/          original photos (not in git, not served)
```

## Editing content

| What | Where |
|---|---|
| Name, title, location, email | `src/lib/constants.ts` |
| Social links, nav and footer links | `src/data/navigation.ts` |
| Projects (order = biggest first), detail pages | `src/data/projects.ts` |
| Experience / education stories | `src/data/background.ts` |
| Services, tech stack, FAQ | `src/data/*.ts` |

A project shows up in the hero, the showcase and the footer once it has an `image`.
