import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { DecorativeGrid } from '@/components/home/DecorativeGrid';
import { OverlayManager } from '@/components/overlays/OverlayManager';
import { OverlayProvider } from '@/context/OverlayContext';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduceMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reduceMotion]);

  return (
    <OverlayProvider>
      <div className="relative w-full h-[100dvh] overflow-hidden bg-background text-foreground font-sans selection:bg-foreground selection:text-background flex flex-col">
        {/* Subtle cursor follower */}
        {!reduceMotion && <motion.div
          className="pointer-events-none fixed top-0 left-0 w-8 h-8 rounded-full border border-foreground/10 z-0 hidden md:block"
          animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
          transition={{ type: "spring", stiffness: 100, damping: 25, mass: 2 }}
        />}

        <DecorativeGrid />
        
        <Header />
        <Hero />
        <Footer />
        
        <OverlayManager />
      </div>
    </OverlayProvider>
  );
}
