import { useEffect, useState } from 'react';
import { client } from '../public/lib/sanity';

interface AboutData {
  summary: string;
  frontend: string[];
  backend: string[];
  tools: string[];
  focus: string[];
}

export default function About() {
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "about"][0]`)
      .then((data) => setAbout(data))
      .catch(console.error);
  }, []);

  if (!about) {
    return (
      <section
        id="about"
        className="flex min-h-[50vh] items-center justify-center bg-canvas px-4 py-24"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border border-line border-t-accent" />
          <p className="font-sans text-sm text-muted">Loading…</p>
        </div>
      </section>
    );
  }

  const groups = [
    { name: 'Frontend', items: about.frontend },
    { name: 'Backend', items: about.backend },
    { name: 'Tools', items: about.tools },
    { name: 'Focus', items: about.focus },
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-surface py-20 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(ellipse_at_right,rgba(47,74,63,0.05),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-sans text-[0.7rem] font-medium uppercase tracking-elegant text-accent">
            About
          </p>
          <h2 className="mt-3 font-display text-4xl font-medium leading-tight text-ink sm:text-5xl lg:text-6xl">
            A quiet devotion to craft
          </h2>
          <div className="mt-5 h-px w-14 bg-accent" />
        </div>

        <p className="mt-10 max-w-3xl font-display text-xl font-normal italic leading-relaxed text-muted sm:text-2xl lg:text-[1.65rem]">
          {about.summary}
        </p>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {groups.map((group) => (
            <div key={group.name}>
              <h3 className="font-sans text-[0.7rem] font-medium uppercase tracking-elegant text-ink">
                {group.name}
              </h3>
              <ul className="mt-4 space-y-2">
                {(group.items || []).map((item, index) => (
                  <li
                    key={`${group.name}-${index}`}
                    className="font-sans text-sm font-light leading-relaxed text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
