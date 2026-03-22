"use client";

import { motion } from "framer-motion";

const blobs = [
  {
    color: "bg-blue-500/[0.08]",
    size: "w-[500px] h-[500px]",
    position: "-top-40 -right-40",
    duration: 10,
    delay: 0,
  },
  {
    color: "bg-purple-500/[0.06]",
    size: "w-[600px] h-[600px]",
    position: "-bottom-60 -left-40",
    duration: 14,
    delay: 2,
  },
  {
    color: "bg-blue-600/[0.05]",
    size: "w-[400px] h-[400px]",
    position: "top-1/3 right-1/4",
    duration: 12,
    delay: 4,
  },
  {
    color: "bg-purple-600/[0.04]",
    size: "w-[350px] h-[350px]",
    position: "top-2/3 left-1/3",
    duration: 16,
    delay: 1,
  },
  {
    color: "bg-blue-400/[0.06]",
    size: "w-[450px] h-[450px]",
    position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    duration: 18,
    delay: 3,
  },
];

export default function FloatingBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Deep navy → black gradient base */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Floating blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-15, 15, -15],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: blob.delay,
          }}
          className={`absolute ${blob.position} ${blob.size} ${blob.color} rounded-full blur-3xl`}
        />
      ))}

      {/* Radial glow behind hero area */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-radial from-blue-500/[0.08] via-purple-500/[0.03] to-transparent rounded-full blur-3xl" />
    </div>
  );
}
