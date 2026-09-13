import { motion } from 'framer-motion';
import { useOverlay } from '@/context/OverlayContext';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  const { open } = useOverlay();

  return (
    <main className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-4xl w-full flex flex-col items-center z-20">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            WE BUILD<br />
            DIGITAL EXPERIENCES<br />
            THAT WORK.
          </h1>
          
          <p className="text-sm md:text-base text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed px-2">
            Websites and web applications designed for businesses that want to look better, perform better, and grow online.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4 w-full sm:w-auto"
        >
          <button
            onClick={() => open('contact')}
            className="group flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-foreground/90 w-full sm:w-auto"
          >
            Start a project
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={() => open('services')}
            className="group flex items-center justify-center gap-2 bg-transparent text-foreground px-8 py-4 text-xs font-semibold tracking-widest uppercase border border-border transition-all duration-300 hover:bg-muted w-full sm:w-auto"
          >
            View Services
          </button>
        </motion.div>
      </div>
    </main>
  );
}
