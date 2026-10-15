import { useOverlay, OverlayType } from '@/context/OverlayContext';
import { motion } from 'framer-motion';
import { OverlayBase } from '@/components/ui/OverlayBase';

const NAV_ITEMS: { label: string; id: OverlayType }[] = [
  { label: 'WORK', id: 'work' },
  { label: 'SERVICES', id: 'services' },
  { label: 'PRICING', id: 'pricing' },
  { label: 'CARE', id: 'care' },
  { label: 'CONTACT', id: 'contact' },
];

export function MobileMenuOverlay() {
  const { open, close } = useOverlay();

  return (
    <OverlayBase title="STUDIO MENU" onClose={close}>
      
      <nav className="flex flex-col gap-6 items-start relative z-10">
        {NAV_ITEMS.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
            onClick={() => open(item.id)}
            className="text-3xl font-bold tracking-tight uppercase hover:text-muted-foreground transition-colors"
          >
            {item.label}
          </motion.button>
        ))}
      </nav>

      <div className="relative mt-12 flex justify-between items-end border-t border-border pt-6">
        <p className="text-[10px] tracking-widest uppercase opacity-50">
          SYS.01 // EWS BASE
        </p>
        <p className="text-[10px] tracking-widest uppercase opacity-50">
          © 2026
        </p>
      </div>
    </OverlayBase>
  );
}
