import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, ReactNode } from 'react';

interface OverlayBaseProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

export function OverlayBase({ title, onClose, children }: OverlayBaseProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: '10%' }}
      animate={{ opacity: 1, y: '0%' }}
      exit={{ opacity: 0, y: '5%' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-30 flex flex-col bg-background/95 backdrop-blur-md"
    >
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      
      {/* Overlay Header */}
      <header className="relative z-10 flex items-center justify-end px-6 py-6 md:px-12 md:py-8 pointer-events-none">
        <div className="flex items-center gap-6 pointer-events-auto">
          {title && (
            <span className="text-micro text-muted-foreground tracking-widest hidden sm:block">
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
      <main className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden">
        <div className="h-full px-6 pb-24 md:px-12 pt-8">
          {children}
        </div>
      </main>
    </motion.div>
  );
}
