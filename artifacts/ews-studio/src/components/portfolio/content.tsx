import { ArrowUpRight } from 'lucide-react';
import { ReactNode } from 'react';

export function Ext({ href, children, id }: { href: string; children: ReactNode; id: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" data-testid={id}
      className="group inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase border-b border-foreground/30 pb-1 hover:border-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">
      {children}
      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

const projects = [
  { n: '01', name: 'eventAgent', tags: 'Multi-agent / Python', href: 'https://github.com/AaronShenny/eventAgent',
    d: 'A personal experiment in multi-agent design: an assistant for conversational discovery of events and locations.' },
  { n: '02', name: 'Pixora', tags: 'Django', href: 'https://github.com/AaronShenny/pixora',
    d: 'A Django photo-sharing project with albums, uploads and favorites.' },
  { n: '03', name: 'ObjectEye', tags: 'Python / OpenCV', href: 'https://github.com/AaronShenny/objectEye',
    d: 'A Python and OpenCV experiment in live detection, specifically face detection.' },
];

export function About() {
  return (
    <div className="space-y-8 text-sm md:text-base leading-relaxed text-muted-foreground">
      <p className="text-foreground text-lg md:text-2xl font-medium leading-snug">
        I build backend things with Python and Node.js, and test how far APIs, automation and AI agents can be pushed.
      </p>
      <p>This space holds personal experiments: Django applications, integrations, and small workflows where agents do part of the work.</p>
      <ul className="flex flex-wrap gap-2 pt-2">
        {['Python', 'Node.js', 'Django', 'APIs', 'Integrations', 'Automation', 'AI agents'].map((t) => (
          <li key={t} className="text-micro border border-border px-3 py-2 text-foreground">{t}</li>
        ))}
      </ul>
    </div>
  );
}

export function Projects() {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-8">Personal projects and experiments, published as open repositories.</p>
      <ul className="border-t border-border">
        {projects.map((p) => (
          <li key={p.name} data-testid={`card-project-${p.name}`} className="border-b border-border py-7 grid gap-3 md:grid-cols-[3rem_1fr]">
            <span className="text-micro text-muted-foreground">{p.n}</span>
            <div className="space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-bold tracking-tight">{p.name}</h3>
                <span className="text-micro text-muted-foreground">{p.tags}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              <Ext href={p.href} id={`link-project-${p.name}`}>View repository</Ext>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Writing() {
  return (
    <div className="space-y-6">
      <article className="border border-border p-6 md:p-8 space-y-4 bg-background/60">
        <span className="text-micro text-muted-foreground">Article on DEV</span>
        <h3 className="text-xl md:text-2xl font-bold tracking-tight">School Chatbot: Revolutionizing Communication with AI</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">A write-up on a school-information chatbot prototype using Django and Google AI.</p>
        <Ext href="https://dev.to/aaronshenny/school-chatbot-revolutionizing-communication-with-ai-1ea1" id="link-article-school-chatbot">Read the article</Ext>
      </article>
      <Ext href="https://dev.to/aaronshenny" id="link-dev-profile">DEV profile</Ext>
    </div>
  );
}

export function Contact() {
  const rows = [
    ['Email', 'extapano@gmail.com', 'mailto:extapano@gmail.com', 'email'],
    ['GitHub', 'github.com/AaronShenny', 'https://github.com/AaronShenny', 'github'],
    ['LinkedIn', 'linkedin.com/in/aaron-shenny', 'https://www.linkedin.com/in/aaron-shenny', 'linkedin'],
  ];
  return (
    <ul className="border-t border-border">
      {rows.map(([l, t, h, id]) => (
        <li key={id} className="border-b border-border py-6 flex flex-wrap items-center justify-between gap-3">
          <span className="text-micro text-muted-foreground">{l}</span>
          <Ext href={h} id={`link-contact-${id}`}>{t}</Ext>
        </li>
      ))}
    </ul>
  );
}
