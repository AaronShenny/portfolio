import { Link } from 'wouter';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Download, Github } from 'lucide-react';
import { DecorativeGrid } from '@/components/home/DecorativeGrid';

const RELEASES = 'https://github.com/AaronShenny/College-Record/releases';
const SOURCE = 'https://github.com/AaronShenny/College-Record';
const REPLIT = 'https://replit.com/@extcollege/Windows-College-Record-Maker';
const focus = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground';

const FLOW = [
  { n: '01', t: 'Sign in', d: 'Use your allowed college Google account.' },
  { n: '02', t: 'Bring your content', d: 'Your own record content and your own Word templates.' },
  { n: '03', t: 'Generate', d: 'Recordly assembles the document from what you provided.' },
  { n: '04', t: 'Keep it yours', d: "Records are stored in your own Google Drive." },
];

const STACK = [
  ['Platform', 'Windows 10 / 11 desktop'],
  ['Shell', 'Tauri + React'],
  ['Services', 'Bundled Node services'],
  ['Documents', 'Python worker, loaded on demand'],
  ['License', 'AGPL-3.0-or-later'],
];

const STEPS = [
  'Open the GitHub releases page.',
  'Choose a release. Current builds are marked beta pre-release.',
  'Download the Windows installer from that release\u2019s assets.',
  'Install Microsoft Word separately if you need PDF export.',
];

export default function Recordly() {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const up = (d = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.01 : 0.8, delay: reduce ? 0 : d, ease },
  });
  const inView = (d = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: reduce ? 0.01 : 0.7, delay: reduce ? 0 : d, ease },
  });

  return (
    <div className="relative min-h-[100dvh] bg-background text-foreground font-sans selection:bg-foreground selection:text-background">
      <div className="fixed inset-0 pointer-events-none"><DecorativeGrid /></div>

      <header className="relative z-20 flex items-start justify-between px-6 py-6 md:px-12 md:py-8">
        <Link href="/" data-testid="link-portfolio" className={`group flex items-center gap-3 ${focus}`}>
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold tracking-tight leading-none">AS</span>
            <span className="text-[9px] md:text-[10px] tracking-widest font-medium uppercase mt-1 text-muted-foreground">Back to portfolio</span>
          </span>
        </Link>
        <span className="text-micro text-muted-foreground text-right">Project / 001<br />Windows application</span>
      </header>

      <main className="relative z-10 px-6 md:px-12 pb-16">
        {/* Hero */}
        <section className="max-w-6xl mx-auto pt-10 md:pt-20 pb-20 grid md:grid-cols-12 gap-10 md:gap-6 items-end">
          <div className="md:col-span-8">
            <motion.p {...up(0)} className="text-micro text-muted-foreground mb-6">
              Independent / Open source / Beta pre-release
            </motion.p>
            <motion.h1 {...up(0.08)} className="text-6xl sm:text-7xl md:text-[9rem] font-bold tracking-tighter leading-[0.9]" data-testid="text-title">
              RECORDLY
            </motion.h1>
            <motion.p {...up(0.16)} className="mt-8 text-lg md:text-2xl font-semibold tracking-tight max-w-2xl leading-snug">
              Turn your own content and Word templates into finished college records, on your Windows PC.
            </motion.p>
          </div>
          <motion.div {...up(0.26)} className="md:col-span-4 flex flex-col gap-3">
            <a href={RELEASES} target="_blank" rel="noopener noreferrer" data-testid="button-download"
              className={`group flex items-center justify-between bg-foreground text-background px-6 py-5 ${focus}`}>
              <span className="flex flex-col">
                <span className="text-sm font-bold tracking-widest uppercase">Download</span>
                <span className="text-[10px] tracking-widest uppercase opacity-60 mt-1">Choose a release on GitHub</span>
              </span>
              <Download className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a href={SOURCE} target="_blank" rel="noopener noreferrer" data-testid="link-source"
              className={`group flex items-center justify-between border border-border px-6 py-4 hover:bg-muted transition-colors ${focus}`}>
              <span className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase"><Github className="w-4 h-4" />Source code</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href={REPLIT} target="_blank" rel="noopener noreferrer" data-testid="link-replit"
              className={`group flex items-center justify-between border border-border px-6 py-4 hover:bg-muted transition-colors ${focus}`}>
              <span className="text-xs font-semibold tracking-widest uppercase">Replit project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">
              Windows 10 / 11. Microsoft Word is required for PDF export and is not included.
            </p>
          </motion.div>
        </section>

        {/* Flow */}
        <section aria-labelledby="flow-h" className="max-w-6xl mx-auto border-t border-foreground py-14">
          <div className="flex items-baseline justify-between mb-10">
            <h2 id="flow-h" className="text-micro">How it works</h2>
            <span className="text-micro text-muted-foreground">04 steps</span>
          </div>
          <ol className="grid sm:grid-cols-2 md:grid-cols-4 border-l border-t border-border">
            {FLOW.map((f, i) => (
              <motion.li key={f.n} {...inView(i * 0.07)} data-testid={`card-flow-${f.n}`}
                className="group relative border-r border-b border-border p-6 md:p-8 min-h-[200px] flex flex-col justify-between bg-background/70 overflow-hidden">
                <span className="absolute left-0 top-0 h-[2px] w-full bg-foreground origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <span className="text-micro text-muted-foreground">{f.n}</span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight mb-2">{f.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </section>

        {/* Stack + Install */}
        <section className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 py-14 border-t border-border">
          <motion.div {...inView()} className="md:col-span-5">
            <h2 className="text-micro mb-8">Under the hood</h2>
            <dl>
              {STACK.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-3 border-b border-border text-sm">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-semibold text-right" data-testid={`text-stack-${k.toLowerCase()}`}>{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
          <motion.div {...inView(0.1)} className="md:col-span-6 md:col-start-7">
            <h2 className="text-micro mb-8">Getting it</h2>
            <ol className="space-y-5">
              {STEPS.map((s, i) => (
                <li key={i} className="flex gap-5 text-sm leading-relaxed">
                  <span className="font-bold tabular-nums w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <a href={RELEASES} target="_blank" rel="noopener noreferrer" data-testid="link-releases"
              className={`group inline-flex items-center gap-3 mt-8 text-micro border-b border-foreground pb-1 ${focus}`}>
              Go to releases <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </section>

        {/* Notes */}
        <motion.section {...inView()} className="max-w-6xl mx-auto border-t border-border py-14 grid md:grid-cols-12 gap-8">
          <h2 className="text-micro md:col-span-3">Good to know</h2>
          <div className="md:col-span-9 grid sm:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
            <p><span className="text-foreground font-semibold">Independent.</span> Recordly is independently developed and operated. It is not officially affiliated with Rajagiri College of Social Science.</p>
            <p><span className="text-foreground font-semibold">Your content.</span> Recordly works from content and templates you supply. Accuracy and submission remain your responsibility.</p>
            <p><span className="text-foreground font-semibold">Beta.</span> Releases are pre-release software. Check the release notes on GitHub before installing.</p>
            <p><span className="text-foreground font-semibold">Open source.</span> Licensed AGPL-3.0-or-later. Read, audit or contribute on GitHub.</p>
          </div>
        </motion.section>
      </main>

      <footer className="relative z-10 flex flex-col sm:flex-row gap-4 items-center justify-between px-6 py-8 md:px-12 border-t border-border">
        <Link href="/" data-testid="link-portfolio-footer" className={`group flex items-center gap-3 text-micro text-muted-foreground hover:text-foreground transition-colors ${focus}`}>
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" /> Aaron Shenny / Lab
        </Link>
        <span className="text-micro text-muted-foreground">Recordly / AGPL-3.0-or-later</span>
      </footer>
    </div>
  );
}
