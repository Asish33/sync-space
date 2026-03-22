"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUpWithEmail } from "@/lib/sign-up";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookOpen, ArrowLeft, Loader2, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const [validations, setValidations] = useState({
    email: false,
    password: false,
    name: false,
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setValidations((prev) => ({
      ...prev,
      name: value.length > 0,
    }));
  };

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!validations.email || !validations.password || !validations.name) {
      setError("Please check your inputs");
      setIsLoading(false);
      return;
    }

    try {
      await signUpWithEmail({
        email,
        password,
        name,
        image: image || undefined,
      });

      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-8 p-3 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 backdrop-blur-sm border border-primary/20">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">StudyHub</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Join the community
          </h1>
          <p className="text-muted-foreground">
            Start collaborating with peers today
          </p>
        </div>

        {/* Register Card */}
        <Card className="border border-border/50 shadow-xl backdrop-blur-sm bg-card/95 hover:shadow-2xl transition-all duration-300">
          <CardHeader className="space-y-3 pb-6">
            <CardTitle className="text-2xl font-bold">Get Started</CardTitle>
            <CardDescription className="text-muted-foreground">
              Create your account and begin your learning journey
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <form onSubmit={handleRegister} className="w-full space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={handleNameChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Avatar URL (Optional)</Label>
                <Input
                  id="image"
                  type="url"
                  placeholder="https://example.com/avatar.png"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {error && (
                <Alert className="border border-destructive/20 bg-destructive/5 text-destructive animate-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <AlertDescription className="ml-2 text-xs font-medium">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={
                  isLoading ||
                  !validations.email ||
                  !validations.password ||
                  !validations.name
                }
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 border-t border-border/50 pt-6 text-center text-sm space-y-4">
              <div className="text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 group transition-colors"
                >
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />{" "}
                  Sign in
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="mt-8 text-xs text-muted-foreground text-center">
          Enterprise-grade security. Your data is always protected.
        </p>
      </div>
    </div>
  );
}
