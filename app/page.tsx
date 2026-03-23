"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  BookOpen,
  MessageSquare,
  FileText,
  Calendar,
  Sparkles,
  Zap,
  Users,
  Check,
  Moon,
  Sun,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BackgroundEffects from "@/components/landing/BackgroundEffects";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Section wrapper with scroll animation
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, delay, ease: "easeOut" },
        },
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Hero UI Mock component
function HeroUIMock() {
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
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-full max-w-4xl mx-auto mt-12 md:mt-16"
    >
      {/* Main UI Container */}
      <Card className="rounded-2xl border-border/60 bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden border">
        {/* Window Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-muted/30">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          <div className="flex-1 text-center text-xs text-muted-foreground font-medium">
            CS101 Study Group
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[320px]">
          {/* Chat Panel */}
          <div className="md:col-span-3 border-r border-border/40 p-3 bg-muted/10">
            <div className="text-xs font-medium text-muted-foreground mb-3">
              Group Chat
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-medium text-primary">
                  A
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-medium">Alex</div>
                  <div className="text-[10px] text-muted-foreground bg-muted/50 rounded-lg px-2 py-1 mt-0.5">
                    Ready for today's session?
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-[10px] font-medium text-green-600">
                  M
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-medium">Maya</div>
                  <div className="text-[10px] text-muted-foreground bg-muted/50 rounded-lg px-2 py-1 mt-0.5">
                    Yes! Starting the notes now
                  </div>
                </div>
              </div>
              {/* Typing indicator */}
              <div className="flex items-center gap-2 mt-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px] font-medium text-purple-600">
                  J
                </div>
                <div className="flex items-center gap-1 bg-muted/50 rounded-lg px-3 py-1.5">
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
                </div>
              </div>
            </div>
          </div>

          {/* Notes Panel */}
          <div className="md:col-span-6 p-4 relative">
            <div className="text-xs font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              Shared Notes
            </div>
            <div className="space-y-2 text-sm">
              <div className="font-semibold text-foreground">
                Chapter 5: Data Structures
              </div>
              <div className="text-muted-foreground text-xs leading-relaxed">
                <p className="mb-2">• Arrays: Fixed-size, contiguous memory</p>
                <p className="mb-2">
                  • Linked Lists: Dynamic size, pointer-based
                </p>
                <p className="relative">
                  • {typingText}
                  <span className="cursor-blink inline-block w-0.5 h-3.5 bg-primary ml-0.5 align-middle" />
                </p>
              </div>
            </div>
            {/* Live cursors */}
            <motion.div
              animate={{ x: [0, 10, 5], y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-16 pointer-events-none"
            >
              <div className="w-3 h-3 border-l-2 border-t-2 border-green-500 rotate-[-45deg]" />
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
              <div className="w-3 h-3 border-l-2 border-t-2 border-purple-500 rotate-[-45deg]" />
              <span className="text-[9px] bg-purple-500 text-white px-1.5 py-0.5 rounded ml-1 font-medium">
                Jordan
              </span>
            </motion.div>
          </div>

          {/* Session Panel */}
          <div className="md:col-span-3 border-l border-border/40 p-3 bg-muted/10">
            <div className="text-xs font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Upcoming
            </div>
            <div className="space-y-2">
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-2">
                <div className="text-[11px] font-medium text-primary">
                  Live Now
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  Data Structures Review
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  <div className="flex -space-x-1">
                    <div className="w-4 h-4 rounded-full bg-primary/30 border border-background" />
                    <div className="w-4 h-4 rounded-full bg-green-500/30 border border-background" />
                    <div className="w-4 h-4 rounded-full bg-purple-500/30 border border-background" />
                  </div>
                  <span className="text-[9px] text-muted-foreground">
                    3 members
                  </span>
                </div>
              </div>
              <div className="bg-muted/30 rounded-lg p-2">
                <div className="text-[10px] text-muted-foreground">
                  Tomorrow, 4:00 PM
                </div>
                <div className="text-[11px] font-medium mt-0.5">
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
              <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border border-primary/20 rounded-lg p-2 shadow-glow-sm">
                <CardContent className="p-0">
                  <div className="flex items-center gap-1.5 text-[10px] font-medium text-primary">
                    <Sparkles className="w-3 h-3" />
                    Summary ready
                  </div>
                  <div className="text-[9px] text-muted-foreground mt-1">
                    Click to view AI-generated notes
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </Card>

      {/* Floating glow effects */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-3xl" />
    </motion.div>
  );
}

// Feature card component
function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="group relative h-full rounded-2xl border-border/60 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 hover:shadow-glow-sm p-6">
        <CardContent className="p-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg text-foreground mb-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Step component
function Step({
  number,
  title,
  description,
  index,
}: {
  number: number;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="flex-1 text-center px-4"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-lg shadow-glow-sm">
        {number}
      </div>
      <h3 className="font-semibold text-lg text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

// Testimonial card
function TestimonialCard({
  quote,
  author,
  role,
  index,
}: {
  quote: string;
  author: string;
  role: string;
  index: number;
}) {
  return (
    <motion.div variants={scaleIn} custom={index}>
      <Card className="h-full p-6 rounded-2xl border-border/60 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-0">
          <p className="text-foreground/90 text-base leading-relaxed mb-4 italic">
            "{quote}"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-semibold">
              {author.charAt(0)}
            </div>
            <div>
              <div className="font-medium text-foreground text-sm">
                {author}
              </div>
              <div className="text-muted-foreground text-xs">{role}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function HomePage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
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

  const steps = [
    {
      title: "Create or Join",
      description: "Start a new group or join with a code from your friend.",
    },
    {
      title: "Collaborate Live",
      description: "Schedule sessions and work on notes together in real-time.",
    },
    {
      title: "Learn with AI",
      description: "Use AI to revise, summarize, and stay ahead of the curve.",
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

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background effects (radials + blobs) */}
      <BackgroundEffects />

      {/* Modular Navbar */}
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      {/* Hero (modular) */}
      <Hero />

      {/* Problem → Solution Section */}
      <AnimatedSection className="py-20 md:py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-16">
            Studying alone{" "}
            <span className="text-muted-foreground">doesn't work anymore.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Problems */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="text-sm font-medium text-destructive/80 mb-4 uppercase tracking-wider">
                The Problem
              </div>
              {[
                "Studying alone = low motivation",
                "Notes scattered across apps",
                "Group chats are noisy & unfocused",
                "No structure, no accountability",
              ].map((problem, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex items-center gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/10"
                >
                  <div className="w-2 h-2 rounded-full bg-destructive/60" />
                  <span className="text-foreground/80">{problem}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Solutions */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="text-sm font-medium text-green-600 mb-4 uppercase tracking-wider">
                The Solution
              </div>
              {[
                "Dedicated study groups with purpose",
                "One shared space for notes + chat",
                "Scheduled sessions that keep you consistent",
                "AI that helps you understand, not just read",
              ].map((solution, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex items-center gap-3 p-4 rounded-xl bg-green-500/5 border border-green-500/20"
                >
                  <Check className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-foreground/80">{solution}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection className="py-20 md:py-32 px-4 bg-gradient-to-b from-transparent via-muted/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Everything serious students need.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} index={i} />
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* How It Works Section */}
      <AnimatedSection className="py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Start studying in under{" "}
              <span className="text-primary">60 seconds.</span>
            </h2>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-8 md:gap-4"
          >
            {steps.map((step, i) => (
              <Step key={i} number={i + 1} {...step} index={i} />
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* AI Highlight Section */}
      <AnimatedSection className="py-20 md:py-32 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="mb-6">
                  <Badge
                    variant="outline"
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border-primary/20 text-sm text-primary font-medium hover:bg-primary/20"
                  >
                    <Sparkles className="w-4 h-4" />
                    AI-Powered
                  </Badge>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                  Your built-in AI study partner.
                </h2>
                <div className="space-y-4">
                  {[
                    "Instantly summarize shared notes",
                    "Generate study plans from sessions",
                    "Ask questions directly from your notes",
                    "Turn chaos into clarity",
                  ].map((capability, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-foreground/80">{capability}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* AI Demo Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Card className="rounded-2xl border-border/60 bg-card/80 backdrop-blur-xl p-6 shadow-glow">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        AI Assistant
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Ready to help
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-muted/50 rounded-xl p-3 text-sm text-muted-foreground">
                      "Summarize today's session"
                    </div>
                    <div className="bg-primary/10 rounded-xl p-3 text-sm">
                      <div className="text-primary font-medium mb-1">
                        Summary generated:
                      </div>
                      <div className="text-foreground/80 text-xs leading-relaxed">
                        Today we covered arrays, linked lists, and their
                        trade-offs. Key takeaway: arrays for fast access, linked
                        lists for fast insertion...
                      </div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-3 text-sm text-muted-foreground">
                      "Explain this concept simply"
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Social Proof Section */}
      <AnimatedSection className="py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Loved by focused students.
            </h2>
            <p className="text-lg text-muted-foreground">
              Used by students from{" "}
              <span className="text-primary font-semibold">50+ colleges</span>{" "}
              worldwide
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={i} {...testimonial} index={i} />
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Final CTA Section */}
      <AnimatedSection className="py-20 md:py-32 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Card className="p-8 md:p-12 rounded-3xl border-border/60 bg-gradient-to-b from-primary/5 via-card/50 to-card/30 backdrop-blur-sm text-center overflow-hidden">
              <CardContent className="p-0">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                  Start your next study session today.
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Free to start. No pressure. No credit card.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto rounded-xl gap-2 bg-gradient-to-r from-primary to-primary/80 hover:shadow-xl transition-all text-base px-8 h-12"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {/* Trust signals */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Free forever plan
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    No spam
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Instant access
                  </div>
                </div>

                {/* Background glow */}
                <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl" />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">StudyTogether</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 StudyTogether. Crafted with care for students who want to learn
          together.
        </p>
      </footer>
    </div>
  );
}
