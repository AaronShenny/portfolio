import { OverlayBase } from '../ui/OverlayBase';
import { useOverlay } from '@/context/OverlayContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, X as XIcon } from 'lucide-react';

const TABS = [
  { id: 'care', label: 'BASIC CARE' },
  { id: 'domain', label: 'DOMAIN & HOSTING' },
  { id: 'payment', label: 'PAYMENT TERMS' },
];

export function CareOverlay() {
  const { close } = useOverlay();
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <OverlayBase title="POLICIES & CARE" onClose={close}>
      <div className="max-w-4xl mx-auto pt-8 md:pt-16">
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-border pb-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300",
                activeTab === tab.id 
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="min-h-[40vh]">
          <AnimatePresence mode="wait">
            
            {activeTab === 'care' && (
              <motion.div
                key="care"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row gap-12"
              >
                <div className="w-full md:w-1/3">
                  <h3 className="text-2xl font-bold tracking-tight mb-2">EWS BASIC CARE</h3>
                  <span className="inline-block px-3 py-1 bg-muted text-xs font-semibold tracking-widest mb-6">
                    ₹1,000 / MONTH
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A basic maintenance and support plan for completed websites. Ensures your digital presence remains operational and up-to-date.
                  </p>
                </div>
                
                <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs font-bold tracking-widest text-muted-foreground mb-4">INCLUDES</h4>
                    <ul className="flex flex-col gap-3">
                      {[
                        'Minor content updates',
                        'Small text and image changes',
                        'Basic bug fixes',
                        'Basic website monitoring',
                        'Deployment assistance',
                        'Routine maintenance',
                        'General technical support'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <Check className="w-4 h-4 text-foreground/50 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-widest text-muted-foreground mb-4">NOT INCLUDED</h4>
                    <ul className="flex flex-col gap-3">
                      {[
                        'New pages',
                        'Major redesigns',
                        'New features',
                        'Backend development',
                        'New integrations',
                        'Large-scale content changes',
                        'Third-party service or API costs'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <XIcon className="w-4 h-4 text-muted-foreground/50 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="w-full mt-8 pt-8 border-t border-border">
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground text-center">
                    Additional work outside the scope of Basic Care will be quoted separately.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'domain' && (
              <motion.div
                key="domain"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl"
              >
                <h3 className="text-2xl font-bold tracking-tight mb-8">DOMAIN & HOSTING</h3>
                
                <div className="space-y-6 text-sm leading-relaxed">
                  <p>
                    Domain registration, hosting, paid APIs, premium assets, and other third-party services are <strong className="font-semibold text-foreground">not included</strong> in package prices unless explicitly stated in the project quotation.
                  </p>
                  
                  <div className="p-6 bg-muted border border-border">
                    <p className="font-semibold tracking-tight">Deployment setup and assistance are included in all packages.</p>
                  </div>
                  
                  <p className="text-muted-foreground">
                    Where possible, the client should own and maintain their own domain and hosting accounts to ensure full control over their digital assets. We provide full technical assistance during the setup process.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl"
              >
                <h3 className="text-2xl font-bold tracking-tight mb-8">PAYMENT TERMS</h3>
                
                <div className="space-y-12">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold tracking-widest text-muted-foreground">PROJECTS UNDER ₹10,000</h4>
                    <div className="flex items-center gap-2 font-medium">
                      <span className="px-4 py-2 border border-border">50% advance</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="px-4 py-2 border border-border">50% before final deployment</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold tracking-widest text-muted-foreground">PROJECTS ₹10,000+</h4>
                    <div className="flex flex-wrap items-center gap-2 font-medium">
                      <span className="px-4 py-2 border border-border">50% advance</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="px-4 py-2 border border-border">30% during development</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="px-4 py-2 border border-border">20% before final handover</span>
                    </div>
                  </div>

                  <div className="p-6 border border-border bg-foreground text-background mt-8">
                    <p className="text-xs font-semibold tracking-widest uppercase text-center">
                      Development begins after the agreed advance payment has been received.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </OverlayBase>
  );
}
