import { motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useModalFocus } from './useModalFocus';

interface OverlayBaseProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

export function OverlayBase({ title, onClose, children }: OverlayBaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const reduce = useReducedMotion();
  useModalFocus(ref, onClose);

  return createPortal(
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-label={title ? undefined : 'Studio details'}
      tabIndex={-1}
      initial={{ opacity: 0, y: reduce ? 0 : '10%' }}
      animate={{ opacity: 1, y: '0%' }}
      exit={{ opacity: 0, y: reduce ? 0 : '5%' }}
      transition={{ duration: reduce ? 0.01 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-60 flex flex-col bg-background/95 backdrop-blur-md"
    >
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      
      {/* Overlay Header */}
      <header className="relative z-10 flex items-center justify-end px-6 py-6 md:px-12 md:py-8 pointer-events-none">
        <div className="flex items-center gap-6 pointer-events-auto">
          {title && (
            <span id={titleId} className="text-micro text-muted-foreground tracking-widest">
              {title}
            </span>
          )}
          
          <button
            onClick={onClose}
            className="group relative flex items-center justify-center w-12 h-12 border border-border bg-background hover:bg-foreground hover:text-background transition-colors duration-300"
            aria-label="Close"
          >
            <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>
      </header>

      {/* Overlay Content */}
      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain">
        <div className="min-h-full px-6 pb-24 md:px-12 pt-8">
          {children}
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}
