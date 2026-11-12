import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import { SITE_CONFIG } from "@/lib/constants";
import {
  STATUS_LABEL,
  formatIndex,
  formatTeam,
  hasExternalLink,
} from "@/lib/project-meta";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.id === slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${SITE_CONFIG.name}`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projectsData.findIndex((p) => p.id === slug);
  if (index === -1) notFound();

  const project = projectsData[index];
  const next = projectsData[(index + 1) % projectsData.length];
  const number = formatIndex(index);

  const meta = [
    { label: "Client", value: project.client },
    { label: "Year", value: project.year },
    { label: "Team", value: formatTeam(project.teamSize) },
    { label: "Status", value: STATUS_LABEL[project.status] },
  ].filter((m) => m.value);

  return (
    <main id="main">
      <article className="shell pb-24 pt-28 md:pb-40 md:pt-40">
        <Reveal className="label flex items-center justify-between text-muted">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 transition-colors hover:text-ink"
          >
            <ArrowIcon className="-rotate-[135deg] transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />
            All work
          </Link>
          <span>(Case {number})</span>
        </Reveal>

        <h1 className="mt-12 max-w-[18ch] text-[clamp(2.5rem,7vw,7rem)] font-extrabold leading-[0.95] tracking-[-0.045em] md:mt-20">
          <RevealLines immediate delay={0.1} lines={[project.title]} />
        </h1>

        <Reveal delay={0.3}>
          <dl className="label mt-14 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-line pt-6 md:mt-20 md:grid-cols-4 md:gap-x-6">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-muted">{m.label}</dt>
                <dd className="mt-2">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.4} className="mt-10 md:mt-16">
          <div className="relative aspect-[4/3] overflow-hidden bg-line md:aspect-[16/9]">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                priority
                sizes="(min-width: 1440px) 1360px, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full flex-col justify-between p-6 md:p-10">
                <span className="label text-muted">
                  {project.tags.slice(0, 3).join(" / ")}
                </span>
                <span className="self-end text-[clamp(6rem,24vw,22rem)] font-extrabold leading-[0.8] tracking-tighter text-paper">
                  {number}
                </span>
              </div>
            )}
          </div>
        </Reveal>

        {project.gallery && project.gallery.length > 1 && (
          <div className="mt-6 grid gap-6 md:mt-10 md:grid-cols-2">
            {project.gallery
              .filter((g) => g.src !== project.image)
              .map((g, i) => (
                <Reveal key={g.src} delay={i * 0.1}>
                  <figure>
                    <div className="relative aspect-[16/10] overflow-hidden bg-line">
                      <Image
                        src={g.src}
                        alt={g.caption ?? `${project.title} screenshot`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                    {g.caption && (
                      <figcaption className="label mt-3 text-muted">
                        {g.caption}
                      </figcaption>
                    )}
                  </figure>
                </Reveal>
              ))}
          </div>
        )}

        <div className="mt-20 grid grid-cols-12 gap-x-4 gap-y-8 md:mt-32 md:gap-x-6">
          <Reveal className="col-span-12 md:col-span-3">
            <p className="label text-muted">(Overview)</p>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-9 lg:col-span-8" delay={0.1}>
            <p className="text-2xl font-medium leading-snug tracking-tight md:text-4xl">
              {project.description}
            </p>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-3 md:mt-10">
            <p className="label text-muted">(Stack)</p>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-9 md:mt-10 lg:col-span-8" delay={0.1}>
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-line px-3 py-1.5 text-sm">
                  {tag}
                </li>
              ))}
            </ul>
            {hasExternalLink(project) && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group label mt-10 inline-flex items-center gap-3 border-b border-ink pb-1"
              >
                Visit project
                <ArrowIcon className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </Reveal>
        </div>
      </article>

      {next.id !== project.id && (
        <Link
          href={`/work/${next.id}`}
          data-cursor="Next"
          className="group block border-t border-line"
        >
          <div className="shell py-20 md:py-32">
            <p className="label text-muted">Next project</p>
            <p className="mt-6 flex items-end justify-between gap-6 text-[clamp(2rem,6vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.045em] transition-colors duration-500 group-hover:text-accent">
              <span className="max-w-[18ch]">{next.title}</span>
              <ArrowIcon className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-2 group-hover:translate-x-2" />
            </p>
          </div>
        </Link>
      )}
    </main>
  );
}
