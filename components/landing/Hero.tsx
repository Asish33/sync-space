"use client";

import { motion } from "framer-motion";
import ProductPreview from "./ProductPreview";
import CTAContainer from "./CTAContainer";

export default function Hero() {
  return (
    <section className="relative pt-36 pb-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
              AI-Powered • Study Smarter
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-[1.05] tracking-tight">
            Study better.{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary/70 bg-clip-text text-transparent">
              Together.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Create focused study groups, collaborate on notes in real-time,
            schedule sessions, and let AI help you learn faster.
          </p>

          <CTAContainer />

          <div className="mt-10">
            <ProductPreview />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
