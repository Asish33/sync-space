"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlassNavbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 h-16 z-50 glass"
      style={{
        background: "rgba(10, 14, 26, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-glow-sm transition-all group-hover:shadow-glow">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg text-white">
            StudyTogether
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-white/5 rounded-lg hidden md:inline-flex transition-colors"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white btn-brutal shadow-glow-sm hover:shadow-glow transition-all duration-200">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
