import { OverlayBase } from '../ui/OverlayBase';
import { useOverlay } from '@/context/OverlayContext';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    id: '01',
    title: 'WEBSITE DEVELOPMENT',
    price: '₹3,000+',
    desc: 'Websites for businesses, professionals, brands and organizations.',
  },
  {
    id: '02',
    title: 'WEB APPLICATION DEVELOPMENT',
    price: '₹25,000+',
    desc: 'Custom web applications, dashboards, systems and workflows.',
  },
  {
    id: '03',
    title: 'WEBSITE MAINTENANCE',
    price: '₹1,000/month',
    desc: 'Ongoing maintenance and technical support for completed websites.',
  }
];

export function ServicesOverlay() {
  const { close, open } = useOverlay();

  return (
    <OverlayBase title="SERVICES" onClose={close}>
      <div className="max-w-6xl mx-auto pt-12 md:pt-24 flex flex-col h-full">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-16"
        >
          CORE EXPERTISE
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
          {SERVICES.map((srv, i) => (
            <motion.div 
              key={srv.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              className="flex flex-col border-t border-foreground/10 pt-6 group"
            >
              <div className="flex justify-between items-baseline mb-6">
                <span className="text-micro text-muted-foreground">{srv.id}</span>
                <span className="text-sm font-semibold tracking-widest">{srv.price}</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-4 group-hover:text-muted-foreground transition-colors duration-300">
                {srv.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mt-auto">
                {srv.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-auto border-t border-foreground/10 pt-8 flex items-center justify-between"
        >
          <p className="text-sm text-muted-foreground max-w-sm hidden md:block">
            Every project is built with technical precision and modern standards.
          </p>
          <button 
            onClick={() => open('contact')}
            className="group flex items-center gap-3 text-xs font-semibold tracking-widest uppercase"
          >
            Discuss your project
            <span className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300">
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>
        </motion.div>
      </div>
    </OverlayBase>
  );
}
