"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function SparkedLandingPage() {
  return (
    <div className="min-h-screen bg-[#05070D] selection:bg-[#3DE1A1]/30 text-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Deep background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#05070D] via-[#070A14] to-[#0B1020]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Blurred gradient sphere (bottom-right) */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[30%] -right-[10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[#4F8CFF]/10 blur-[120px]"
        />

        {/* Planet/curve shape (top-left) */}
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent blur-[2px]" />

        {/* Light streak */}
        <motion.div
          animate={{ x: [-1000, 1000], opacity: [0, 1, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
          className="absolute top-[20%] left-0 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-[#7CFFB2]/50 to-transparent rotate-12"
        />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#05070D]/40 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7CFFB2] to-[#3DE1A1] flex items-center justify-center">
              <div className="w-3 h-3 bg-[#05070D] rounded-full" />
            </div>
            <span className="font-bold text-lg tracking-tight">Sparked</span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#A0A8B8]">
            <Link href="#" className="hover:text-white transition-colors">
              Why Sparked
            </Link>
            <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors group">
              Products{" "}
              <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors group">
              Solutions{" "}
              <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors group">
              Resources{" "}
              <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-[#A0A8B8] hover:text-white hover:bg-white/5 rounded-xl font-medium"
          >
            Log in
          </Button>
          <Button className="bg-white text-black hover:bg-gray-200 rounded-xl font-semibold px-6">
            Join now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 md:pt-48 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-start min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 backdrop-blur-md">
            <span className="text-sm">🚀</span>
            <span className="text-sm font-medium text-[#A0A8B8]">
              Brand new release: v1.2 Professional
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tight leading-[1.1] mb-6">
            Powerful version{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7CFFB2] to-[#3DE1A1]">
              control
            </span>
            , <br className="hidden md:block" />
            seamless{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7CFFB2] to-[#3DE1A1]">
              collaboration
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-[#A0A8B8] font-medium max-w-2xl mb-10 leading-relaxed">
            Sparked is an innovative platform designed to revolutionize
            collaborative software development and empower teams to achieve
            their goals with unmatched efficiency. Built with developers in
            mind.
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl w-full">
            <Button className="w-full sm:w-auto h-14 px-8 rounded-xl bg-gradient-to-r from-[#7CFFB2] to-[#3DE1A1] hover:from-[#6be6a0] hover:to-[#31c98e] text-black font-semibold text-lg hover:scale-[1.03] transition-all shadow-[0_0_20px_rgba(124,255,178,0.3)] hover:shadow-[0_0_30px_rgba(124,255,178,0.5)]">
              Start Trial
            </Button>

            <div className="relative flex-1 w-full sm:w-auto h-14 group">
              <Input
                type="email"
                placeholder="your email"
                className="h-full w-full rounded-xl bg-white/[0.03] border-white/[0.08] text-white placeholder:text-[#A0A8B8] focus-visible:ring-1 focus-visible:ring-[#7CFFB2] focus-visible:border-[#7CFFB2] backdrop-blur-md px-6 text-base transition-all group-focus-within:shadow-[0_0_15px_rgba(124,255,178,0.1)]"
              />
            </div>

            <Button
              variant="outline"
              className="w-full sm:w-auto h-14 px-8 rounded-xl bg-transparent border-white/[0.08] hover:bg-white/[0.05] text-white font-semibold text-lg backdrop-blur-md"
            >
              Subscribe
            </Button>
          </div>
        </motion.div>

        {/* Trust Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-32 w-full pt-12 border-t border-white/[0.08]"
        >
          <p className="text-center text-sm font-medium text-[#A0A8B8] mb-8 uppercase tracking-widest">
            Trusted by the world's leading engineering teams
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Logos - SVG paths for recognized brands */}
            <div className="flex items-center gap-2 font-bold text-xl">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path>
              </svg>{" "}
              GitHub
            </div>
            <div className="flex items-center gap-2 font-bold text-xl">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 015.1 2h1.41a.42.42 0 01.4.28L9.36 10h5.28l2.44-7.72a.42.42 0 01.4-.28h1.41a.42.42 0 01.4.28l2.44 7.51 1.22 3.78a.84.84 0 01-.3.94z"></path>
              </svg>{" "}
              GitLab
            </div>
            <div className="flex items-center gap-2 font-bold text-xl">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path>
              </svg>{" "}
              Google
            </div>
            <div className="flex items-center gap-2 font-bold text-xl">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"></path>
              </svg>{" "}
              Microsoft
            </div>
            <div className="flex items-center gap-2 font-bold text-xl tracking-widest">
              ORACLE
            </div>
            <div className="flex items-center gap-2 font-bold text-xl">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M11.53 12.42l-5.69 9.85a1.13 1.13 0 01-1.55.42L.05 20.25a2.6 2.6 0 01-1-3.56l5.7-9.85a1.12 1.12 0 011.54-.42l4.24 2.45a2.6 2.6 0 011 3.55zm.88-1L18.1 1.58A1.13 1.13 0 0119.65 1.16l4.24 2.45a2.6 2.6 0 011 3.56l-5.69 9.85a1.12 1.12 0 01-1.54.42l-4.25-2.45a2.61 2.61 0 01-1-3.57zM11.5 24h-.05a1.13 1.13 0 01-.89-.44l-5.59-7.5a2.6 2.6 0 013-3.81l4.28 1a2.61 2.61 0 012.3 3.12l-1.07 4.28a1.12 1.12 0 01-2 .35z"></path>
              </svg>{" "}
              Atlassian
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
