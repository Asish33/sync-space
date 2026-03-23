"use client";

import FeatureCard from "./FeatureCard";

export default function FeaturesGrid({ features }: { features: any[] }) {
  return (
    <section className="py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Everything serious students need.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tools designed for focused learning, not endless scrolling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard
              key={i}
              icon={f.icon}
              title={f.title}
              description={f.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
("use client");

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, FileText, Calendar, Sparkles, Zap } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

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

export default function FeaturesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-20 md:py-32 px-4 relative"
    >
      {/* Subtle section glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Everything serious students need.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Tools designed for focused learning, not endless scrolling.
          </p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative p-6 rounded-2xl glass-card hover:shadow-glow transition-all duration-300 cursor-default"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-purple-500/20 transition-all duration-300">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold text-lg text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/[0.03] to-purple-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
