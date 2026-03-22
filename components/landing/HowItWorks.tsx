"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const steps = [
  {
    title: "Create or Join",
    description: "Start a new group or join with a code from your friend.",
  },
  {
    title: "Collaborate Live",
    description: "Schedule sessions and work on notes together in real-time.",
  },
  {
    title: "Learn with AI",
    description: "Use AI to revise, summarize, and stay ahead of the curve.",
  },
];

export default function HowItWorks() {
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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Start studying in under{" "}
            <span className="gradient-text-hero">60 seconds.</span>
          </h2>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-8 md:gap-4"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="flex-1 text-center px-4"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-glow-sm"
              >
                {i + 1}
              </motion.div>
              <h3 className="font-semibold text-lg text-white mb-2">
                {step.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
