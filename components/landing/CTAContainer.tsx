"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CTAContainer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4"
    >
      <Link href="/register">
        <Button
          size="lg"
          className="rounded-xl gap-2 bg-gradient-to-r from-primary to-primary/80 text-base px-8 h-12 shadow-[0_8px_30px_rgba(59,130,246,0.18)] hover:scale-105 transition-transform"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>

      <Link href="/about">
        <Button variant="ghost" className="rounded-xl">
          Learn more
        </Button>
      </Link>
    </motion.div>
  );
}
