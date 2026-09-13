export function DecorativeGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      <div className="absolute inset-0 bg-grid opacity-60 mix-blend-multiply dark:mix-blend-screen" />
      
      {/* Corner brackets */}
      <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-foreground/20" />
      <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-foreground/20" />
      <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-foreground/20" />
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-foreground/20" />
      
      {/* Subtle lines */}
      <div className="absolute top-1/2 left-0 w-8 h-[1px] bg-foreground/10 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-8 h-[1px] bg-foreground/10 -translate-y-1/2" />
      <div className="absolute top-0 left-1/2 w-[1px] h-8 bg-foreground/10 -translate-x-1/2" />
      <div className="absolute bottom-0 left-1/2 w-[1px] h-8 bg-foreground/10 -translate-x-1/2" />
    </div>
  );
}
