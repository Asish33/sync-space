"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronDown,
  ArrowRight,
  MessageSquare,
  FileText,
  Calendar,
  Sparkles,
  Zap,
  Check,
} from "lucide-react";

export default function SyncSpaceLandingPage() {
  return (
    <div className="min-h-screen bg-[#05070D] selection:bg-[#3DE1A1]/30 text-white overflow-hidden relative">

<div className="fixed inset-0 z-0 pointer-events-none">

<div className="absolute inset-0 bg-gradient-to-br from-[#05070D] via-[#070A14] to-[#0B1020]" />

<div className="absolute inset-0 z-0">

<div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

<motion.div
            initial={{ top: "-20%" }}
            animate={{ top: "120%" }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-[200px] w-[1px] h-[150px] bg-gradient-to-b from-transparent via-[#3DE1A1]/15 to-transparent drop-shadow-[0_0_2px_rgba(61,225,161,0.15)]"
          />
          <motion.div
            initial={{ top: "-20%" }}
            animate={{ top: "120%" }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
              delay: 1,
            }}
            className="absolute left-[560px] w-[1px] h-[200px] bg-gradient-to-b from-transparent via-[#3DE1A1]/15 to-transparent drop-shadow-[0_0_2px_rgba(61,225,161,0.15)]"
          />
          <motion.div
            initial={{ top: "-20%" }}
            animate={{ top: "120%" }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "linear",
              delay: 2.5,
            }}
            className="absolute right-[320px] w-[1px] h-[120px] bg-gradient-to-b from-transparent via-[#3DE1A1]/15 to-transparent drop-shadow-[0_0_2px_rgba(61,225,161,0.15)]"
          />

<motion.div
            initial={{ left: "-20%" }}
            animate={{ left: "120%" }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
              delay: 0.5,
            }}
            className="absolute top-[280px] h-[1px] w-[250px] bg-gradient-to-r from-transparent via-[#3DE1A1]/15 to-transparent drop-shadow-[0_0_2px_rgba(61,225,161,0.15)]"
          />
          <motion.div
            initial={{ right: "-20%" }}
            animate={{ right: "120%" }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "linear",
              delay: 3,
            }}
            className="absolute top-[640px] h-[1px] w-[200px] bg-gradient-to-l from-transparent via-[#3DE1A1]/15 to-transparent drop-shadow-[0_0_2px_rgba(61,225,161,0.15)]"
          />
        </div>

<motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[30%] -right-[10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[#4F8CFF]/10 blur-[120px]"
        />

<div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent blur-[2px]" />
      </div>

<nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#05070D]/40 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-12">

<Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7CFFB2] to-[#3DE1A1] flex items-center justify-center">
              <div className="w-3 h-3 bg-[#05070D] rounded-full" />
            </div>
            <span className="font-bold text-lg tracking-tight">Sync Space</span>
          </Link>

<div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#A0A8B8]">
            <Link href="#" className="hover:text-white transition-colors">
              Why Sync Space
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
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-[#A0A8B8] hover:text-white hover:bg-white/5 rounded-xl font-medium"
            >
              Log in
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-white text-black hover:bg-gray-200 rounded-xl font-semibold px-6">
              Join now
            </Button>
          </Link>
        </div>
      </nav>

<main className="relative z-10 pt-32 md:pt-48 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-start min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >

<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 backdrop-blur-md">
            <span className="text-sm font-medium text-[#A0A8B8]">
              Brand new release: v1.2 Professional
            </span>
          </div>

<h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tight leading-[1.1] mb-6">
            Study{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7CFFB2] to-[#3DE1A1]">
              Smarter Together
            </span>
            , <br className="hidden md:block" />
            in Real Time
          </h1>

<p className="text-lg md:text-xl text-[#A0A8B8] font-medium max-w-2xl mb-10 leading-relaxed">
            Seamless group collaboration, live notes, AI assistance, and video
            sessions — all in one place.
          </p>
        </motion.div>

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

<section className="relative z-10 py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.05]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Everything you need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7CFFB2] to-[#3DE1A1]">
              succeed
            </span>
          </h2>
          <p className="text-[#A0A8B8] text-lg max-w-2xl mx-auto">
            A comprehensive suite of tools built for modern study groups and
            developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.04] transition-all hover:border-[#3DE1A1]/30 hover:shadow-[0_0_30px_rgba(61,225,161,0.1)]"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7CFFB2]/10 to-[#3DE1A1]/5 flex items-center justify-center mb-6 group-hover:from-[#7CFFB2]/20 group-hover:to-[#3DE1A1]/10 transition-all border border-[#3DE1A1]/20">
                <feature.icon className="w-6 h-6 text-[#3DE1A1]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-[#A0A8B8] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

<section className="relative z-10 py-24 px-6 max-w-5xl mx-auto border-t border-white/[0.05]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Loved by focused{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7CFFB2] to-[#3DE1A1]">
              Students
            </span>
          </h2>
          <p className="text-[#A0A8B8] text-lg max-w-2xl mx-auto">
            See what others are saying about their experience with Sync Space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.04] transition-all"
            >
              <div className="absolute top-4 left-6 text-7xl text-[#3DE1A1]/10 font-serif font-bold pointer-events-none">
                "
              </div>
              <p className="text-white text-lg leading-relaxed mb-8 relative z-10">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7CFFB2]/20 to-[#3DE1A1]/10 border border-[#3DE1A1]/20 flex items-center justify-center text-[#3DE1A1] font-bold text-xl">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{testimonial.author}</h4>
                  <p className="text-[#A0A8B8] text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

<section className="relative z-10 py-32 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative p-8 md:p-12 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md text-center overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Start your next study session today.
            </h2>
            <p className="text-lg text-[#A0A8B8] mb-8 max-w-xl mx-auto">
              Free to start. No pressure. No credit card.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 relative z-10">
              <Link href="/dashboard">
                <Button className="w-full sm:w-auto rounded-xl gap-2 bg-gradient-to-r from-[#7CFFB2] to-[#3DE1A1] hover:from-[#6be6a0] hover:to-[#31c98e] text-black font-semibold shadow-[0_0_20px_rgba(124,255,178,0.3)] hover:shadow-[0_0_30px_rgba(124,255,178,0.5)] transition-all text-base px-10 h-14">
                  Continue
                  <ArrowRight className="w-5 h-5 text-black" />
                </Button>
              </Link>
            </div>

<div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[#A0A8B8] relative z-10 font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#3DE1A1]" />
                Free forever plan
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#3DE1A1]" />
                No spam
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#3DE1A1]" />
                Instant access
              </div>
            </div>

<div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#7CFFB2]/10 rounded-full blur-[80px] pointer-events-none" />
          </div>
        </motion.div>
      </section>

<footer className="relative z-10 border-t border-white/[0.05] py-12 px-6 text-center backdrop-blur-md bg-[#05070D]/60 mt-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7CFFB2] to-[#3DE1A1] flex items-center justify-center">
            <div className="w-3 h-3 bg-[#05070D] rounded-full" />
          </div>
          <span className="font-bold text-lg text-white tracking-tight">
            Sync Space
          </span>
        </div>
        <p className="text-sm text-[#A0A8B8] font-medium">
          © 2026 Sync Space. Crafted with care for students who want to learn
          together.
        </p>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: MessageSquare,
    title: "Real-Time Group Chat",
    description:
      "Focused discussions without distractions. Stay connected with your study group.",
  },
  {
    icon: FileText,
    title: "Collaborative Notes",
    description:
      "Edit together. See live cursors. Stay aligned on every concept.",
  },
  {
    icon: Calendar,
    title: "Study Session Scheduling",
    description:
      "Plan sessions. Get reminders. Stay accountable to your goals.",
  },
  {
    icon: Sparkles,
    title: "AI Study Assistant",
    description:
      "Summaries, explanations, and smart study help when you need it.",
  },
  {
    icon: Zap,
    title: "Instant Group Creation",
    description: "Create or join a group in seconds. Zero setup friction.",
  },
];

const testimonials = [
  {
    quote:
      "This is the first time group study actually worked for me. The real-time collaboration changed everything.",
    author: "Priya S.",
    role: "CS Student, IIT Delhi",
  },
  {
    quote:
      "The AI summaries save me hours every week. It's like having a study partner who never sleeps.",
    author: "Rahul M.",
    role: "CAT Aspirant",
  },
];
