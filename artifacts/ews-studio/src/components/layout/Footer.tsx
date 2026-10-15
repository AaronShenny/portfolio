import { motion } from 'framer-motion';
import { Link } from 'wouter';

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="fixed bottom-0 left-0 right-0 z-30 flex items-end justify-between px-6 py-6 md:px-12 md:py-8 pointer-events-none mix-blend-difference text-white"
    >
      <div className="w-2/3 md:w-1/3 pointer-events-auto">
        <Link href="/" className="inline-block mb-2 text-[10px] tracking-widest uppercase opacity-70 hover:opacity-100">
          Aaron Shenny / Personal portfolio
        </Link>
        <p className="text-[10px] tracking-widest uppercase opacity-50 hidden md:block">
          SYS.01 // EWS BASE
        </p>
      </div>

      <div className="w-1/3 text-center hidden md:flex flex-col items-center gap-1 opacity-70">
        {/* Prices removed from fixed footer as requested */}
      </div>

      <div className="w-1/3 text-right">
        <p className="text-[10px] tracking-widest uppercase">
          © 2026 EWS
        </p>
      </div>
    </motion.footer>
  );
}
