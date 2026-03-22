"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FinalCTA() {
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
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-8 md:p-12 rounded-3xl glass-card text-center overflow-hidden noise-overlay"
        >
          {/* Gradient border */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/15 to-blue-500/20 blur-sm opacity-50 -z-10" />

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Start your next study session today.
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Free to start. No pressure. No credit card.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Link href="/register">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-xl gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white text-base px-8 h-13 btn-brutal shadow-glow hover:shadow-glow-intense transition-all duration-300"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            {["Free forever plan", "No spam", "Instant access"].map(
              (signal, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  {signal}
                </div>
              ),
            )}
          </div>

          {/* Background glow */}
          <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/[0.06] rounded-full blur-3xl" />
        </motion.div>
      </div>
    </motion.section>
  );
}
