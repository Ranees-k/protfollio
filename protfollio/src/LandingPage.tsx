import { useEffect, useState } from 'react';
import { client } from '../public/lib/sanity';

function formatIstTime(date: Date) {
  const time = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);

  return `${time} IST (GMT+5:30)`;
}

function StatusBar() {
  const [istTime, setIstTime] = useState(() => formatIstTime(new Date()));

  useEffect(() => {
    const tick = () => setIstTime(formatIstTime(new Date()));
    tick();

    const now = new Date();
    const msUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      tick();
      intervalId = window.setInterval(tick, 60_000);
    }, msUntilNextMinute);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      className="flex w-full flex-col gap-2 border-t border-line bg-canvas/80 px-4 py-3.5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-5 lg:px-8"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
            <span className="absolute inset-0 animate-status-ring rounded-full bg-[#3F7A4C]" />
            <span className="relative h-2 w-2 animate-status-pulse rounded-full bg-[#3F7A4C]" />
          </span>
          <span className="font-sans text-[0.65rem] font-medium tracking-wide text-ink sm:text-[0.7rem]">
            Available for freelance
          </span>
        </div>

        <time
          dateTime={new Date().toISOString()}
          className="pl-4 font-sans text-[0.65rem] font-light tabular-nums tracking-wide text-muted sm:pl-0 sm:text-[0.7rem]"
        >
          {istTime}
        </time>
      </div>
    </div>
  );
}

export default function Landing() {
  const [resume, setResume] = useState<{ title?: string; fileUrl?: string } | null>(null);

  useEffect(() => {
    const query = `*[_type == "resume"][0]{
      title,
      "fileUrl": file.asset->url
    }`;

    client
      .fetch(query)
      .then((data) => setResume(data))
      .catch(console.error);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      const headerHeight = 80;
      window.scrollTo({
        top: element.offsetTop - headerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative flex w-full flex-col overflow-hidden sm:min-h-[100svh]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 top-0 h-[70%] w-[55%] bg-[radial-gradient(ellipse_at_center,rgba(47,74,63,0.09),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 h-[55%] w-[50%] bg-[radial-gradient(ellipse_at_center,rgba(28,27,26,0.05),transparent_70%)]" />
      </div>

      {/* Mobile: compact stack. Desktop: fills viewport & centers */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-start px-4 pb-6 pt-20 sm:flex-1 sm:justify-center sm:px-6 sm:pb-12 sm:pt-28 lg:px-8 lg:pt-32">
        <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <p className="animate-fade-up font-sans text-[0.7rem] font-medium uppercase tracking-elegant text-accent">
              Engineering
            </p>

            <h1 className="animate-fade-up delay-200 mt-3 max-w-3xl font-display text-[clamp(2.15rem,6.2vw,4.15rem)] font-medium leading-[1.08] tracking-tight text-ink sm:mt-4">
              Full-Stack &amp; AI Systems Developer
            </h1>

            <div
              className="mt-4 h-px w-16 origin-left animate-line-grow bg-accent sm:mt-5 sm:w-20"
              style={{ animationDelay: '350ms' }}
            />

            <p className="animate-fade-up delay-400 mt-5 max-w-md font-sans text-[0.95rem] font-light leading-relaxed text-muted sm:mt-6 sm:text-lg">
              Building web applications &amp; intelligent interfaces with clarity,
              care, and lasting craft.
            </p>

            <div className="animate-fade-up delay-600 mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={scrollToProjects}
                className="inline-flex h-12 items-center justify-center bg-accent px-8 font-sans text-[0.7rem] font-medium uppercase tracking-elegant text-surface transition-colors duration-300 hover:bg-accent-soft"
              >
                View My Work
              </button>

              {resume?.fileUrl && (
                <a
                  href={resume.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center border border-ink/20 px-8 font-sans text-[0.7rem] font-medium uppercase tracking-elegant text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  Download Resume
                </a>
              )}
            </div>
          </div>

          <div className="animate-fade-up delay-600 hidden lg:col-span-4 lg:flex lg:flex-col lg:items-end lg:justify-end lg:pb-2">
            <p className="max-w-[13rem] text-right font-display text-lg font-normal italic leading-snug text-muted/80">
              Quiet precision across product, systems, and interface.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: sits under content. Desktop: pinned to viewport bottom */}
      <div className="relative z-10 mt-4 animate-fade-up delay-800 sm:mt-auto">
        <StatusBar />
      </div>
    </section>
  );
}
