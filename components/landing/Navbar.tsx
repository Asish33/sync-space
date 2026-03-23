"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar({
  isDark,
  toggleTheme,
}: {
  isDark: boolean;
  toggleTheme: () => void;
}) {
  return (
    <motion.nav
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4 backdrop-blur-xl bg-white/6 border border-white/8 rounded-2xl px-4 py-2 shadow-[0_6px_24px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-glow-sm">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">StudyTogether</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleTheme}
              className="rounded-lg"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
            <Link href="/login">
              <Button variant="ghost" className="hidden md:inline-flex">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="rounded-lg bg-gradient-to-r from-primary to-primary/80">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
