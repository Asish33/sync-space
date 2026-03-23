"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Large radial behind hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.12)_0%,_rgba(139,92,246,0.06)_40%,_transparent_60%)] rounded-full blur-[80px]"
      />

      {/* floating blobs */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [-1, 1, -1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-32 w-[360px] h-[360px] bg-gradient-to-br from-primary/8 to-accent/6 rounded-full blur-[100px] opacity-90"
      />

      <motion.div
        animate={{ y: [5, -5, 5], rotate: [0, -2, 0] }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -bottom-40 -left-40 w-[420px] h-[420px] bg-gradient-to-br from-accent/6 to-primary/6 rounded-full blur-[90px] opacity-80"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(11,26,42,0.5),_rgba(2,3,5,0.7)_60%)]" />
    </div>
  );
}
