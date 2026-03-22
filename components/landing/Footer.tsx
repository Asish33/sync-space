"use client";

import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 px-4 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-white">StudyTogether</span>
      </div>
      <p className="text-sm text-slate-500">
        © 2026 StudyTogether. Crafted with care for students who want to learn
        together.
      </p>
    </footer>
  );
}
