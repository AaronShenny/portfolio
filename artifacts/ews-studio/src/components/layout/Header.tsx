import { useOverlay, OverlayType } from '@/context/OverlayContext';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS: { label: string; id: OverlayType }[] = [
  { label: 'WORK', id: 'work' },
  { label: 'SERVICES', id: 'services' },
  { label: 'PRICING', id: 'pricing' },
  { label: 'CARE', id: 'care' },
  { label: 'CONTACT', id: 'contact' },
];

export function Header() {
  const { active, open, close } = useOverlay();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-start justify-between px-6 py-6 md:px-12 md:py-8 mix-blend-difference text-white pointer-events-none">
      {/* Brand */}
      <div className="flex flex-col select-none z-50 pointer-events-auto">
        <motion.button 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={close}
          className="text-xl md:text-2xl font-bold tracking-tight text-left"
        >
          EWS
        </motion.button>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[9px] md:text-[10px] tracking-widest font-medium uppercase mt-1 opacity-70"
        >
          Extapano Web Studio
        </motion.span>
      </div>

      {/* Nav Desktop */}
      <AnimatePresence>
        {!active && (
          <motion.nav 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hidden md:flex flex-col items-end gap-1 z-50 pointer-events-auto"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                id={`studio-nav-${item.id}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i, ease: "easeOut" }}
                onClick={() => open(item.id)}
                className="text-xs font-semibold tracking-[0.2em] uppercase py-1 relative group overflow-hidden transition-colors text-white/60 hover:text-white"
              >
                {item.label}
                <span className="absolute bottom-0 right-0 h-[1px] bg-white transition-all duration-300 ease-out origin-right w-0 group-hover:w-full" />
              </motion.button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Nav Toggle */}
      <div className="md:hidden z-50 flex items-center pointer-events-auto">
        {(!active || active === 'menu') && (
          <motion.button 
            id="studio-menu-trigger"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={() => active === 'menu' ? close() : open('menu')} 
            className="text-xs font-semibold tracking-widest uppercase text-white hover:text-white/80 py-2"
          >
            {active === 'menu' ? 'CLOSE' : 'MENU'}
          </motion.button>
        )}
      </div>
    </header>
  );
}
