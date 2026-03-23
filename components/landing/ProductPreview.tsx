"use client";

import { motion } from "framer-motion";

export default function ProductPreview({
  className = "",
}: {
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, boxShadow: "0 18px 60px rgba(0,0,0,0.45)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative rounded-2xl border border-white/10 bg-white/6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.45)] overflow-hidden ${className}`}
    >
      {/* inner gradient edge */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -inset-px rounded-2xl border border-white/6 opacity-60" />
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white/6 to-transparent opacity-50 mix-blend-screen" />
      </div>

      <div className="p-4 md:p-6 lg:p-8">
        <div className="w-full h-44 md:h-60 lg:h-72 bg-gradient-to-br from-primary/12 to-accent/8 rounded-lg" />
        <div className="mt-4 text-sm text-muted-foreground">
          Live collaborative notes • 4 users
        </div>
      </div>
    </motion.div>
  );
}
