import { createContext, useContext, useState, ReactNode } from 'react';

export type OverlayType = 'work' | 'services' | 'pricing' | 'care' | 'contact' | 'menu' | null;

interface OverlayContextType {
  active: OverlayType;
  open: (id: OverlayType) => void;
  close: () => void;
}

const OverlayContext = createContext<OverlayContextType | null>(null);

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<OverlayType>(null);

  return (
    <OverlayContext.Provider value={{ active, open: setActive, close: () => setActive(null) }}>
      {children}
    </OverlayContext.Provider>
  );
}

export const useOverlay = () => {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error('useOverlay must be used within an OverlayProvider');
  return ctx;
};
