import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="fixed bottom-0 left-0 right-0 z-30 flex items-end justify-between px-6 py-6 md:px-12 md:py-8 pointer-events-none mix-blend-difference text-white"
    >
      <div className="w-1/3">
        <p className="text-[10px] tracking-widest uppercase opacity-50 hidden md:block">
          SYS.01 // EWS BASE
        </p>
      </div>

      <div className="w-1/3 text-center hidden md:flex flex-col items-center gap-1 opacity-70">
        <p className="text-[9px] uppercase tracking-[0.15em]">Website Development ₹3,000+</p>
        <p className="text-[9px] uppercase tracking-[0.15em]">Web Applications ₹25,000+</p>
        <p className="text-[9px] uppercase tracking-[0.15em]">Maintenance ₹1,000/month</p>
      </div>

      <div className="w-1/3 text-right">
        <p className="text-[10px] tracking-widest uppercase">
          © 2026 EWS
        </p>
      </div>
    </motion.footer>
  );
}
