"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signInWithEmail } from "@/lib/sign-in"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [validations, setValidations] = useState({ email: false, password: false })

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setValidations((prev) => ({
      ...prev,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    setValidations((prev) => ({
      ...prev,
      password: value.length >= 8,
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!validations.email || !validations.password) {
       setError("Please check your inputs")
       setIsLoading(false)
       return
    }

    try {
      await signInWithEmail({
        email,
        password,
      })

      router.push("/dashboard")
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

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
          <h1 className="text-4xl font-bold text-foreground mb-3">Welcome back</h1>
          <p className="text-muted-foreground">Continue your collaborative learning journey</p>
        </div>

        {/* Login Card */}
        <Card className="border border-border/50 shadow-xl backdrop-blur-sm bg-card/95 hover:shadow-2xl transition-all duration-300">
          <CardHeader className="space-y-3 pb-6">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            
            <form onSubmit={handleLogin} className="w-full space-y-5">
              {/* Email Field */}
              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-foreground/70">
                  Email Address
                </Label>
                <div className="relative group">
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isLoading}
                    required
                    className="h-11 border border-border bg-input px-3.5 pr-10 text-sm transition-all duration-200 placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 group-hover:border-primary/30"
                  />
                  {validations.email && email && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/70 animate-in fade-in duration-300" />
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2.5">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-foreground/70">
                  Password
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={isLoading}
                    required
                    minLength={8}
                    className="h-11 border border-border bg-input px-3.5 pr-10 text-sm transition-all duration-200 placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 group-hover:border-primary/30"
                  />
                  {validations.password && password && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/70 animate-in fade-in duration-300" />
                  )}
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert className="border border-destructive/20 bg-destructive/5 text-destructive animate-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <AlertDescription className="ml-2 text-xs font-medium">{error}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || !validations.email || !validations.password}
                className="h-11 w-full text-sm font-semibold transition-all duration-200 hover:shadow-lg active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 border-t border-border/50 pt-6 text-center text-sm space-y-4">
              <div className="text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 group transition-colors"
                >
                  Create one <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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
  )
}
