"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Sparkles } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const capabilities = [
  "Instantly summarize shared notes",
  "Generate study plans from sessions",
  "Ask questions directly from your notes",
  "Turn chaos into clarity",
];

export default function AIHighlight() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-20 md:py-32 px-4 relative"
    >
      {/* Section ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-500/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card tag-brutal text-sm text-purple-400 font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Your built-in AI study partner.
              </h2>
              <div className="space-y-4">
                {capabilities.map((capability, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <span className="text-slate-300">{capability}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: AI Demo Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-blue-500/10 blur-xl opacity-60" />

            <div className="relative rounded-2xl glass-card p-6 noise-overlay">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-glow-sm">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">AI Assistant</div>
                  <div className="text-xs text-slate-500">Ready to help</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-white/[0.04] rounded-xl p-3 text-sm text-slate-400">
                  &ldquo;Summarize today&apos;s session&rdquo;
                </div>
                <div className="bg-blue-500/10 border border-blue-500/15 rounded-xl p-3 text-sm">
                  <div className="text-blue-400 font-medium mb-1">
                    Summary generated:
                  </div>
                  <div className="text-slate-400 text-xs leading-relaxed">
                    Today we covered arrays, linked lists, and their trade-offs.
                    Key takeaway: arrays for fast access, linked lists for fast
                    insertion...
                  </div>
                </div>
                <div className="bg-white/[0.04] rounded-xl p-3 text-sm text-slate-400">
                  &ldquo;Explain this concept simply&rdquo;
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
