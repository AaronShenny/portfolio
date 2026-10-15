import { motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { type ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useModalFocus } from '@/components/ui/useModalFocus';

interface Props { id: string; title: string; onClose: () => void; children: ReactNode }

export function PortfolioOverlay({ id, title, onClose, children }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  useModalFocus(ref, onClose);

  return createPortal(
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`pf-${id}-title`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: '6%' }}
      animate={{ opacity: 1, y: '0%' }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: '3%' }}
      transition={{ duration: reduce ? 0.01 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      tabIndex={-1}
      className="fixed inset-0 z-60 flex flex-col bg-background/95 backdrop-blur-md"
    >
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <span className="text-micro text-muted-foreground">Aaron Shenny / {title}</span>
        <button
          onClick={onClose}
          aria-label="Close"
          data-testid="button-close-overlay"
          className="group flex items-center justify-center w-12 h-12 border border-border bg-background hover:bg-foreground hover:text-background transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          <X className="w-5 h-5" />
        </button>
      </header>
      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain">
        <div className="mx-auto max-w-3xl px-6 pb-24 pt-4 md:px-12">
          <h2 id={`pf-${id}-title`} className="text-3xl md:text-5xl font-bold tracking-tight mb-10 uppercase">{title}</h2>
          {children}
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}
