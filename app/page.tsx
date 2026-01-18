"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BookOpen, MessageSquare, BarChart3, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Gradient background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg text-foreground">StudyHub</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" className="text-foreground hover:bg-secondary rounded-lg transition-smooth">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="rounded-lg bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg transition-smooth">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center pt-40 pb-32 space-y-8 relative z-10">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground leading-tight tracking-tight text-balance">
            Study{" "}
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              together
            </span>
            ,
            <br />
            learn{" "}
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              better
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The modern platform for collaborative learning. Connect with peers, organize shared notes, and achieve
            academic excellence together.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6">
          <Link href="/register">
            <Button
              size="lg"
              className="rounded-lg gap-2 bg-gradient-to-r from-primary to-primary/90 hover:shadow-xl transition-smooth"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="rounded-lg border-border/60 hover:bg-secondary/50 transition-smooth bg-transparent"
          >
            Explore Features
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mb-32 relative z-10">
        {[
          {
            icon: MessageSquare,
            title: "Smart Collaboration",
            desc: "Real-time note editing with your study group. Keep everyone synchronized and focused.",
          },
          {
            icon: Users,
            title: "Study Groups",
            desc: "Build communities around subjects. Connect with peers who share your learning goals.",
          },
          {
            icon: BarChart3,
            title: "Progress Insights",
            desc: "Track your study patterns. Visualize growth and celebrate achievements with data.",
          },
        ].map((feature, i) => {
          const Icon = feature.icon
          return (
            <div
              key={i}
              className="group p-8 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm hover:border-primary/30 hover:bg-card/60 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          )
        })}
      </div>

      {/* CTA Section */}
      <div className="max-w-3xl mx-auto text-center mb-32 relative z-10">
        <div className="p-12 rounded-2xl border border-border/60 bg-gradient-to-b from-primary/5 via-card/50 to-card/30 backdrop-blur-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to transform your studies?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of students already collaborating smarter.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="rounded-lg bg-gradient-to-r from-primary to-primary/90 hover:shadow-xl transition-smooth"
            >
              Start Free Today
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 w-full py-12 text-center text-sm text-muted-foreground relative z-10">
        <p>&copy; 2026 StudyHub. Crafted with care for collaborative learning.</p>
      </footer>
    </div>
  )
}
