import { useCallback, useState, type ReactElement } from 'react';
import { Link } from 'wouter';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { DecorativeGrid } from '@/components/home/DecorativeGrid';
import { PortfolioOverlay } from '@/components/portfolio/PortfolioOverlay';
import { About, Projects, Writing, Contact } from '@/components/portfolio/content';

type Id = 'about' | 'projects' | 'writing' | 'contact';
const NAV: { id: Id; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
];
const VIEWS: Record<Id, () => ReactElement> = { about: About, projects: Projects, writing: Writing, contact: Contact };

export default function Portfolio() {
  const [active, setActive] = useState<Id | null>(null);
  const reduce = useReducedMotion();
  const close = useCallback(() => setActive(null), []);
  const View = active ? VIEWS[active] : null;
  const t = { duration: reduce ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div className="portfolio-page relative w-full h-[100dvh] overflow-hidden bg-background text-foreground font-sans selection:bg-foreground selection:text-background">
      <DecorativeGrid />
      <header className="fixed top-0 left-0 right-0 z-20 flex items-start justify-between px-6 py-6 md:px-12 md:py-8">
        <div className="flex flex-col select-none">
          <span className="text-xl md:text-2xl font-bold tracking-tight">AS</span>
          <span className="text-[9px] md:text-[10px] tracking-widest font-medium uppercase mt-1 text-muted-foreground">Aaron Shenny / Lab</span>
        </div>
        <nav aria-label="Portfolio sections" className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => setActive(n.id)} data-testid={`nav-${n.id}`}
              className="text-micro hover:opacity-60 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">
              {n.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10">
        <motion.div initial={{ opacity: 0, y: reduce ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={t} className="max-w-4xl">
          <p className="text-micro text-muted-foreground mb-6">Backend / APIs / Automation / AI agents</p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            AARON SHENNY<br />BUILDS BACKENDS<br />AND TESTS AGENTS.
          </h1>
          <p className="text-sm md:text-base text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
            A personal window into experiments with Python, Node.js, Django and AI workflows.
          </p>
        </motion.div>
        <nav aria-label="Sections" className="md:hidden grid grid-cols-2 gap-3 mt-10 w-full max-w-xs">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => setActive(n.id)} data-testid={`button-${n.id}`}
              className="border border-border py-3 text-xs font-semibold tracking-widest uppercase hover:bg-muted transition-colors">
              {n.label}
            </button>
          ))}
        </nav>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-20 flex justify-center px-6 py-6 md:px-12 md:py-8">
        <Link href="/work" data-testid="link-studio"
          className="group flex items-center gap-3 text-micro text-muted-foreground hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">
          Looking for the web studio? Extapano Web Studio
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </footer>

      <AnimatePresence>
        {active && View && (
          <PortfolioOverlay key={active} id={active} title={NAV.find((n) => n.id === active)!.label} onClose={close}>
            <View />
          </PortfolioOverlay>
        )}
      </AnimatePresence>
    </div>
  );
}
