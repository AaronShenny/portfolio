import { OverlayBase } from '../ui/OverlayBase';
import { useOverlay } from '@/context/OverlayContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Check } from 'lucide-react';

const PACKAGES = [
  {
    id: 'starter',
    title: 'STARTER',
    price: '₹3,000',
    subtitle: 'Simple one-page websites.',
    features: [
      'Responsive design',
      'Modern UI',
      'Basic animations and interactions',
      'Business information',
      'Contact / WhatsApp CTA',
      'Google Maps integration, where required',
      'Basic SEO setup',
      'Deployment',
      '1 revision'
    ],
    note: ''
  },
  {
    id: 'business',
    title: 'BUSINESS',
    price: '₹7,500',
    subtitle: '3–5 page professional websites.',
    features: [
      'Custom responsive design',
      'Animations and interactions',
      'Contact / lead form',
      'WhatsApp integration',
      'Google Maps integration, where required',
      'Basic SEO setup',
      'Performance optimization',
      'Deployment',
      '2 revision rounds'
    ],
    note: ''
  },
  {
    id: 'premium',
    title: 'PREMIUM',
    price: '₹15,000+',
    subtitle: 'Custom-designed websites.',
    features: [
      'Fully custom UI/UX',
      'Advanced animations and interactions',
      'Custom sections and components',
      'Third-party integrations, where required',
      'Advanced forms',
      'SEO optimization',
      'Performance optimization',
      'Analytics setup',
      'Deployment'
    ],
    note: 'Final pricing depends on project scope and requirements.'
  },
  {
    id: 'webapp',
    title: 'WEB APP',
    price: '₹25,000+',
    subtitle: 'Custom web applications.',
    features: [
      'Authentication',
      'Database integration',
      'Backend / API development',
      'Dashboards & Admin panels',
      'User roles and permissions',
      'Third-party integrations',
      'Custom workflows',
      'Deployment'
    ],
    note: 'Final pricing depends on project scope, complexity, and requirements.'
  }
];

export function PricingOverlay() {
  const { close, open } = useOverlay();
  const [activePkg, setActivePkg] = useState(PACKAGES[0]);

  return (
    <OverlayBase title="PRICING & PACKAGES" onClose={close}>
      <div className="max-w-6xl mx-auto pt-12 md:pt-16 flex flex-col md:flex-row gap-12 md:gap-24 h-full min-h-[60vh]">
        
        {/* Left column - Selector */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/3 flex flex-col gap-2"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-8">PACKAGES</h2>
          <div className="flex flex-col gap-2">
            {PACKAGES.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setActivePkg(pkg)}
                className={cn(
                  "text-left py-4 px-6 text-sm font-semibold tracking-widest uppercase transition-all duration-300 border",
                  activePkg.id === pkg.id 
                    ? "border-foreground bg-foreground text-background" 
                    : "border-border hover:border-foreground/30 text-muted-foreground"
                )}
              >
                {pkg.title}
              </button>
            ))}
          </div>
          
          <div className="mt-12 hidden md:block">
            <p className="text-xs text-muted-foreground leading-relaxed mb-6">
              Need something completely different? We build custom solutions tailored to specific business needs.
            </p>
            <button 
              onClick={() => open('contact')}
              className="text-xs font-semibold tracking-widest uppercase flex items-center gap-2 group hover:text-muted-foreground transition-colors"
            >
              Start custom project
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Right column - Details */}
        <motion.div 
          className="w-full md:w-2/3 relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activePkg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full bg-muted/30 border border-border p-8 md:p-12"
            >
              <div className="flex justify-between items-start mb-8 pb-8 border-b border-border">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">{activePkg.title}</h3>
                  <p className="text-muted-foreground text-sm">{activePkg.subtitle}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl md:text-2xl font-semibold tracking-tight">{activePkg.price}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
                {activePkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-foreground/50 mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground max-w-xs">
                  {activePkg.note || "Standard delivery timeline applies. Domain and hosting costs not included."}
                </p>
                <button 
                  onClick={() => open('contact')}
                  className="bg-foreground text-background px-6 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-foreground/90 transition-colors w-full sm:w-auto text-center shrink-0"
                >
                  Select Package
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </OverlayBase>
  );
}
