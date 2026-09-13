import { useOverlay } from '@/context/OverlayContext';
import { AnimatePresence } from 'framer-motion';
import { ServicesOverlay } from './ServicesOverlay';
import { PricingOverlay } from './PricingOverlay';
import { CareOverlay } from './CareOverlay';
import { ContactOverlay } from './ContactOverlay';
import { WorkOverlay } from './WorkOverlay';
import { MobileMenuOverlay } from './MobileMenuOverlay';

export function OverlayManager() {
  const { active } = useOverlay();

  return (
    <AnimatePresence mode="wait">
      {active === 'services' && <ServicesOverlay key="services" />}
      {active === 'pricing' && <PricingOverlay key="pricing" />}
      {active === 'care' && <CareOverlay key="care" />}
      {active === 'contact' && <ContactOverlay key="contact" />}
      {active === 'work' && <WorkOverlay key="work" />}
      {active === 'menu' && <MobileMenuOverlay key="menu" />}
    </AnimatePresence>
  );
}
