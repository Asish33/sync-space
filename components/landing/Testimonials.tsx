"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const testimonials = [
  {
    quote:
      "This is the first time group study actually worked for me. The real-time collaboration changed everything.",
    author: "Priya S.",
    role: "CS Student, IIT Delhi",
  },
  {
    quote:
      "The AI summaries save me hours every week. It's like having a study partner who never sleeps.",
    author: "Rahul M.",
    role: "CAT Aspirant",
  },
];

export default function Testimonials() {
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
            Loved by focused students.
          </h2>
          <p className="text-lg text-slate-400">
            Used by students from{" "}
            <span className="text-blue-400 font-semibold">50+ colleges</span>{" "}
            worldwide
          </p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl glass-card"
            >
              <p className="text-slate-300 text-base leading-relaxed mb-4 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/20 flex items-center justify-center text-blue-400 font-semibold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-white text-sm">
                    {testimonial.author}
                  </div>
                  <div className="text-slate-500 text-xs">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
