"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmail } from "@/lib/sign-in";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validations, setValidations] = useState({
    email: false,
    password: false,
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setValidations((prev) => ({
      ...prev,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setValidations((prev) => ({
      ...prev,
      password: value.length >= 8,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!validations.email || !validations.password) {
      setError("Please check your inputs");
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmail({
        email,
        password,
      });

      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070D] font-sans selection:bg-[#3DE1A1]/30 text-white flex flex-col items-center justify-center relative overflow-hidden py-12 px-4">

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
        </div>

<motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[30%] -right-[10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[#4F8CFF]/10 blur-[120px]"
        />

<div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">

<div className="mb-10 text-center">
          <Link href="/">
            <div className="inline-flex items-center justify-center gap-3 mb-8 p-3 px-5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.05] transition-all cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7CFFB2] to-[#3DE1A1] flex items-center justify-center">
                <div className="w-3 h-3 bg-[#05070D] rounded-full" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                Sync Space
              </span>
            </div>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
            Welcome back
          </h1>
          <p className="text-[#A0A8B8] text-lg">
            Sign in to continue your session
          </p>
        </div>

<motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative p-8 md:p-10 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl shadow-2xl overflow-hidden group"
        >

<div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#3DE1A1]/0 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#3DE1A1]/10 transition-colors duration-500" />

          <form onSubmit={handleLogin} className="w-full space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-[#A0A8B8] font-medium ml-1"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={handleEmailChange}
                disabled={isLoading}
                required
                className="h-14 w-full rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-[#A0A8B8]/50 focus-visible:ring-1 focus-visible:ring-[#7CFFB2] focus-visible:border-[#7CFFB2] focus:bg-white/[0.05] backdrop-blur-md px-5 text-base transition-all"
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="password"
                className="text-[#A0A8B8] font-medium ml-1"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoading}
                required
                minLength={8}
                className="h-14 w-full rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-[#A0A8B8]/50 focus-visible:ring-1 focus-visible:ring-[#7CFFB2] focus-visible:border-[#7CFFB2] focus:bg-white/[0.05] backdrop-blur-md px-5 text-base transition-all"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={
                isLoading || !validations.email || !validations.password
              }
              className="w-full h-14 rounded-xl bg-gradient-to-r from-[#7CFFB2] to-[#3DE1A1] hover:from-[#6be6a0] hover:to-[#31c98e] text-black font-semibold text-lg transition-all shadow-[0_0_20px_rgba(124,255,178,0.3)] hover:shadow-[0_0_30px_rgba(124,255,178,0.5)] mt-4 disabled:opacity-50 disabled:shadow-none"
            >
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
            <p className="text-[#A0A8B8]">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#3DE1A1] hover:text-[#7CFFB2] transition-colors inline-flex items-center gap-1 group"
              >
                Create one
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </p>
          </div>
        </motion.div>

<p className="mt-8 text-sm text-[#A0A8B8]/70 text-center font-medium">
          Enterprise-grade security. Your data is always protected.
        </p>
      </div>
    </div>
  );
}
