"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const problems = [
  "Studying alone = low motivation",
  "Notes scattered across apps",
  "Group chats are noisy & unfocused",
  "No structure, no accountability",
];

const solutions = [
  "Dedicated study groups with purpose",
  "One shared space for notes + chat",
  "Scheduled sessions that keep you consistent",
  "AI that helps you understand, not just read",
];

export default function ProblemSolution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-20 md:py-32 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16">
          Studying alone{" "}
          <span className="text-slate-500">doesn&apos;t work anymore.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Problems */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="text-sm font-medium text-red-400/80 mb-4 uppercase tracking-wider">
              The Problem
            </div>
            {problems.map((problem, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-center gap-3 p-4 rounded-xl glass-subtle"
                style={{ borderColor: "rgba(239, 68, 68, 0.15)" }}
              >
                <div className="w-2 h-2 rounded-full bg-red-400/60 shrink-0" />
                <span className="text-slate-300">{problem}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Solutions */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="text-sm font-medium text-green-400 mb-4 uppercase tracking-wider">
              The Solution
            </div>
            {solutions.map((solution, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-center gap-3 p-4 rounded-xl glass-subtle"
                style={{ borderColor: "rgba(34, 197, 94, 0.15)" }}
              >
                <Check className="w-5 h-5 text-green-400 shrink-0" />
                <span className="text-slate-300">{solution}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
