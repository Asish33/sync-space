"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductPreview from "./ProductPreview";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function HeroSection() {
  return (
    <section className="relative pt-28 md:pt-40 pb-16 md:pb-28 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="space-y-6"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card tag-brutal text-sm text-blue-400 font-medium">
              <Sparkles className="w-4 h-4" />
              Powered by AI
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.08] tracking-tight"
          >
            Study better. <span className="gradient-text-hero">Together.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Create focused study groups, collaborate live on notes, schedule
            sessions, and use AI to learn faster — together.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4"
          >
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
          </motion.div>
        </motion.div>

        {/* Product Preview */}
        <ProductPreview />
      </div>

      {/* Hero radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/[0.06] rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
