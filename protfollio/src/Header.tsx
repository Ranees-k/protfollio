import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
] as const;

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 24);

      if (menuOpen) return;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 72;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${
          menuOpen || isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div
          className={`border-b transition-colors duration-500 ${
            scrolled || menuOpen
              ? 'border-line bg-canvas/95 backdrop-blur-md'
              : 'border-transparent bg-transparent'
          }`}
        >
          <nav className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="relative z-[60] font-display text-2xl font-semibold tracking-wide text-ink transition-colors hover:text-accent sm:text-[1.65rem]"
            >
              Ranees<span className="text-accent">.</span>K
            </button>

            <div className="hidden items-center gap-10 md:flex">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="group relative font-sans text-[0.7rem] font-medium uppercase tracking-elegant text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            <button
              type="button"
              className="relative z-[60] flex h-11 w-11 items-center justify-center text-ink md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">Menu</span>
              <div className="flex w-6 flex-col gap-1.5">
                <span
                  className={`h-px w-full bg-ink transition-transform duration-300 ${
                    menuOpen ? 'translate-y-[7px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`h-px w-full bg-ink transition-opacity duration-300 ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`h-px w-full bg-ink transition-transform duration-300 ${
                    menuOpen ? '-translate-y-[7px] -rotate-45' : ''
                  }`}
                />
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* Outside header so transform does not clip/shrink the overlay */}
      <div
        className={`fixed inset-0 z-40 bg-canvas transition-[opacity,visibility] duration-400 md:hidden ${
          menuOpen
            ? 'visible pointer-events-auto opacity-100'
            : 'invisible pointer-events-none opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <nav
          className="flex h-[100dvh] w-full flex-col px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[5.5rem]"
          aria-label="Mobile"
        >
          <div className="flex flex-1 flex-col items-stretch justify-center gap-2 sm:gap-3">
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="flex min-h-[3.25rem] items-center justify-center rounded-sm px-4 py-3 font-display text-[clamp(1.75rem,8vw,2.75rem)] font-medium leading-none text-ink transition-colors active:text-accent"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
                  transition: `opacity 0.35s ease ${80 + index * 50}ms, transform 0.35s ease ${80 + index * 50}ms, color 0.2s`,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
