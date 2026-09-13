import { OverlayBase } from '../ui/OverlayBase';
import { useOverlay } from '@/context/OverlayContext';
import { motion } from 'framer-motion';

const PLACEHOLDERS = [
  { id: '01', title: 'SYSTEM UI', category: 'Web Application' },
  { id: '02', title: 'BRAND PLATFORM', category: 'Website' },
  { id: '03', title: 'COMMERCE ENGINE', category: 'Web Application' },
  { id: '04', title: 'PORTFOLIO', category: 'Website' },
];

export function WorkOverlay() {
  const { close } = useOverlay();

  return (
    <OverlayBase title="SELECTED WORK" onClose={close}>
      <div className="max-w-6xl mx-auto pt-8 md:pt-16 flex flex-col h-full">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">INDEX</h2>
          <p className="text-sm text-muted-foreground mt-4">Selected projects and technical implementations.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/50 border border-border/50">
          {PLACEHOLDERS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group relative bg-background aspect-video md:aspect-[4/3] flex flex-col justify-between p-6 md:p-8 overflow-hidden hover:bg-muted/50 transition-colors duration-500 cursor-default"
            >
              <div className="flex justify-between items-start">
                <span className="text-micro text-muted-foreground">{item.id}</span>
                <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Coming Soon
                </span>
              </div>
              
              <div className="z-10">
                <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground tracking-widest uppercase">
                  {item.category}
                </p>
              </div>

              {/* Decorative background element on hover */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-foreground/[0.02] rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 ease-out pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </OverlayBase>
  );
}
