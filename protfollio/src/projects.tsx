import { useEffect, useState } from 'react';
import { client } from '../public/lib/sanity';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  projectLink: string;
  githubLink: string;
  category: {
    title: string;
    slug: string;
  };
}

const DESC_PREVIEW_LIMIT = 160;

function formatTechs(technologies: Project['technologies'], limit?: number) {
  if (!Array.isArray(technologies)) return [];
  const list = technologies
    .map((tech: unknown) =>
      typeof tech === 'string'
        ? tech
        : (tech as { title?: string; name?: string })?.title ||
          (tech as { name?: string })?.name ||
          ''
    )
    .filter(Boolean);
  return typeof limit === 'number' ? list.slice(0, limit) : list;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const reversed = index % 2 === 1;
  const description = project.description || '';
  const canExpand = description.length > DESC_PREVIEW_LIMIT;
  const techs = formatTechs(project.technologies, expanded ? undefined : 4);
  const allTechs = formatTechs(project.technologies);
  const showMoreTechs = !expanded && allTechs.length > 4;
  const number = String(index + 1).padStart(2, '0');

  return (
    <article
      className={`group grid grid-cols-1 items-center gap-x-8 gap-y-6 border-t border-line py-12 first:border-t-0 first:pt-0 sm:gap-y-8 sm:py-16 lg:grid-cols-12 lg:gap-x-14 lg:py-20`}
    >
      {/* Number row — always at top */}
      <div className="order-1 flex items-baseline gap-3 lg:col-span-12">
        <span className="font-display text-2xl text-muted/40 sm:text-3xl">{number}</span>
        <span className="h-px flex-1 bg-line" />
        <span className="hidden font-sans text-[0.65rem] font-medium uppercase tracking-elegant text-muted sm:inline">
          {project.category?.title || 'Project'}
        </span>
      </div>

      {/* Framed gallery image */}
      <div
        className={`relative order-2 lg:col-span-7 ${
          reversed ? 'lg:order-3' : ''
        }`}
      >
        <div
          className={`pointer-events-none absolute -inset-x-4 -inset-y-6 -z-10 sm:-inset-x-6 sm:-inset-y-8 ${
            reversed
              ? 'bg-[radial-gradient(ellipse_at_80%_40%,rgba(47,74,63,0.08),transparent_60%)]'
              : 'bg-[radial-gradient(ellipse_at_20%_40%,rgba(47,74,63,0.08),transparent_60%)]'
          }`}
          aria-hidden
        />

        <figure className="border border-line bg-surface">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5 sm:px-5">
            <span className="font-sans text-[0.65rem] font-medium uppercase tracking-elegant text-muted">
              {project.category?.title || 'Project'}
            </span>
            <span className="font-display text-sm text-muted/60">{number}</span>
          </div>

          <div className="p-3 sm:p-4">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#E8E4DC]">
              {project.image ? (
                <>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover object-top transition-all duration-700 ease-out [filter:saturate(0.88)_contrast(1.03)] group-hover:scale-[1.03] group-hover:[filter:saturate(0.96)_contrast(1.02)]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F3F1ED]/35 via-transparent to-[#2F4A3F]/12 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-40"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/[0.06]"
                    aria-hidden
                  />
                </>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-canvas">
                  <span className="font-display text-5xl text-line sm:text-6xl">
                    {project.title?.charAt(0) || 'P'}
                  </span>
                  <span className="font-sans text-[0.65rem] uppercase tracking-elegant text-muted/50">
                    Preview soon
                  </span>
                </div>
              )}
            </div>
          </div>
        </figure>
      </div>

      {/* Copy */}
      <div
        className={`flex flex-col order-3 lg:col-span-5 ${
          reversed ? 'lg:order-2' : ''
        }`}
      >
        <h3 className="font-display text-[1.85rem] font-medium leading-[1.15] text-ink sm:text-4xl lg:text-[2.5rem]">
          {project.title}
        </h3>

        <p
          className={`mt-4 font-sans text-[0.95rem] font-light leading-relaxed text-muted sm:text-base ${
            expanded ? '' : 'line-clamp-3'
          }`}
        >
          {description}
        </p>

        {canExpand && (
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="mt-3 self-start font-sans text-[0.7rem] font-medium uppercase tracking-elegant text-ink transition-colors hover:text-accent"
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}

        {techs.length > 0 && (
          <p className="mt-5 font-sans text-xs font-light leading-relaxed tracking-wide text-muted/75">
            {techs.join('  ·  ')}
            {showMoreTechs ? `  ·  +${allTechs.length - 4}` : ''}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-5">
          {project.projectLink && (
            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 font-sans text-[0.7rem] font-medium uppercase tracking-elegant text-ink transition-colors hover:text-accent"
            >
              <svg
                className="h-3.5 w-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5M10.5 13.5L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
              View Live
              <span className="h-px w-5 bg-current transition-all duration-300 group-hover/link:w-9" />
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 font-sans text-[0.7rem] font-medium uppercase tracking-elegant text-muted transition-colors hover:text-accent"
            >
              <svg
                className="h-3.5 w-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Source
              <span className="h-px w-5 bg-current transition-all duration-300 group-hover/link:w-9" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const query = `*[_type == "project"]{
      _id,
      title,
      description,
      technologies,
      "image": image.asset->url,
      projectLink,
      githubLink,
      category->{
        title,
        slug
      }
    }`;

    client
      .fetch(query)
      .then((data) => setProjects(data))
      .catch(console.error);
  }, []);

  return (
    <section id="projects" className="relative overflow-hidden bg-canvas py-20 sm:py-28 lg:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(47,74,63,0.05),transparent_70%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-line pb-10 sm:flex-row sm:items-end sm:justify-between sm:pb-12">
          <div className="max-w-xl">
            <p className="font-sans text-[0.7rem] font-medium uppercase tracking-elegant text-accent">
              Selected Work
            </p>
            <h2 className="mt-3 font-display text-4xl font-medium leading-tight text-ink sm:text-5xl lg:text-6xl">
              Projects
            </h2>
            <p className="mt-5 max-w-md font-sans text-base font-light text-muted sm:text-lg">
              A curated collection of thoughtful digital solutions.
            </p>
          </div>
          <p className="hidden font-display text-sm italic text-muted/70 sm:block">
            {projects.length > 0
              ? `${String(projects.length).padStart(2, '0')} pieces`
              : '—'}
          </p>
        </div>

        <div className="mt-2">
          {projects.length === 0 && (
            <div className="py-16 text-center">
              <p className="font-sans text-sm text-muted">Loading projects…</p>
            </div>
          )}

          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
