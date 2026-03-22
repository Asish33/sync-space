"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FileText, Calendar, Sparkles } from "lucide-react";

export default function ProductPreview() {
  const [typingText, setTypingText] = useState("");
  const fullText = "Let's review chapter 5...";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypingText(fullText.slice(0, i));
        i++;
      } else {
        i = 0;
      }
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      whileHover={{ scale: 1.01 }}
      className="relative w-full max-w-4xl mx-auto mt-14 md:mt-20 group"
    >
      {/* Gradient border glow */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-blue-500/30 blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Main container */}
      <div className="relative rounded-2xl glass-card overflow-hidden noise-overlay">
        {/* Window Header */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          <div className="flex-1 text-center text-xs text-slate-500 font-medium">
            CS101 Study Group
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[320px]">
          {/* Chat Panel */}
          <div
            className="md:col-span-3 border-r border-white/[0.06] p-3"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <div className="text-xs font-medium text-slate-500 mb-3">
              Group Chat
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] font-medium text-blue-400">
                  A
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-medium text-slate-300">
                    Alex
                  </div>
                  <div className="text-[10px] text-slate-500 bg-white/[0.04] rounded-lg px-2 py-1 mt-0.5">
                    Ready for today&apos;s session?
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-[10px] font-medium text-green-400">
                  M
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-medium text-slate-300">
                    Maya
                  </div>
                  <div className="text-[10px] text-slate-500 bg-white/[0.04] rounded-lg px-2 py-1 mt-0.5">
                    Yes! Starting the notes now
                  </div>
                </div>
              </div>
              {/* Typing indicator */}
              <div className="flex items-center gap-2 mt-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px] font-medium text-purple-400">
                  J
                </div>
                <div className="flex items-center gap-1 bg-white/[0.04] rounded-lg px-3 py-1.5">
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-500" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-500" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Notes Panel */}
          <div className="md:col-span-6 p-4 relative">
            <div className="text-xs font-medium text-slate-500 mb-3 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              Shared Notes
            </div>
            <div className="space-y-2 text-sm">
              <div className="font-semibold text-white">
                Chapter 5: Data Structures
              </div>
              <div className="text-slate-500 text-xs leading-relaxed">
                <p className="mb-2">• Arrays: Fixed-size, contiguous memory</p>
                <p className="mb-2">
                  • Linked Lists: Dynamic size, pointer-based
                </p>
                <p className="relative">
                  • {typingText}
                  <span className="cursor-blink inline-block w-0.5 h-3.5 bg-blue-500 ml-0.5 align-middle" />
                </p>
              </div>
            </div>
            {/* Live cursors */}
            <motion.div
              animate={{ x: [0, 10, 5], y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-16 pointer-events-none"
            >
              <div className="w-3 h-3 border-l-2 border-t-2 border-green-400 rotate-[-45deg]" />
              <span className="text-[9px] bg-green-500 text-white px-1.5 py-0.5 rounded ml-1 font-medium">
                Maya
              </span>
            </motion.div>
            <motion.div
              animate={{ x: [0, -8, 0], y: [0, 8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute bottom-16 left-32 pointer-events-none"
            >
              <div className="w-3 h-3 border-l-2 border-t-2 border-purple-400 rotate-[-45deg]" />
              <span className="text-[9px] bg-purple-500 text-white px-1.5 py-0.5 rounded ml-1 font-medium">
                Jordan
              </span>
            </motion.div>
          </div>

          {/* Session Panel */}
          <div
            className="md:col-span-3 border-l border-white/[0.06] p-3"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <div className="text-xs font-medium text-slate-500 mb-3 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Upcoming
            </div>
            <div className="space-y-2">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2">
                <div className="text-[11px] font-medium text-blue-400">
                  Live Now
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Data Structures Review
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  <div className="flex -space-x-1">
                    <div className="w-4 h-4 rounded-full bg-blue-500/30 border border-[#0a0e1a]" />
                    <div className="w-4 h-4 rounded-full bg-green-500/30 border border-[#0a0e1a]" />
                    <div className="w-4 h-4 rounded-full bg-purple-500/30 border border-[#0a0e1a]" />
                  </div>
                  <span className="text-[9px] text-slate-600">3 members</span>
                </div>
              </div>
              <div className="bg-white/[0.03] rounded-lg p-2">
                <div className="text-[10px] text-slate-600">
                  Tomorrow, 4:00 PM
                </div>
                <div className="text-[11px] font-medium text-slate-300 mt-0.5">
                  Algorithms Practice
                </div>
              </div>
            </div>

            {/* AI Tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="mt-4"
            >
              <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/5 border border-blue-500/20 rounded-lg p-2 shadow-glow-sm">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-blue-400">
                  <Sparkles className="w-3 h-3" />
                  Summary ready
                </div>
                <div className="text-[9px] text-slate-500 mt-1">
                  Click to view AI-generated notes
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ambient glow below preview */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-blue-500/[0.04] rounded-full blur-3xl" />
    </motion.div>
  );
}
