"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, CheckCircle2 } from "lucide-react"

interface AuthFormProps {
  onSubmit: (email: string, password: string) => Promise<void>
  isLoading?: boolean
  error?: string
  submitButtonText: string
}

export function AuthForm({ onSubmit, isLoading = false, error, submitButtonText }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [localError, setLocalError] = useState<string | null>(null)
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
      password: value.length >= 6,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    if (!email || !password) {
      setLocalError("Please fill in all fields")
      return
    }

    if (!validations.email) {
      setLocalError("Please enter a valid email address")
      return
    }

    if (!validations.password) {
      setLocalError("Password must be at least 6 characters")
      return
    }

    try {
      await onSubmit(email, password)
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const displayError = error || localError

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
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
            className="h-11 border border-border bg-input px-3.5 pr-10 text-sm transition-all duration-200 placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 group-hover:border-primary/30"
          />
          {validations.password && password && (
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/70 animate-in fade-in duration-300" />
          )}
        </div>
      </div>

      {/* Error Alert */}
      {displayError && (
        <Alert className="border border-destructive/20 bg-destructive/5 text-destructive animate-in slide-in-from-top-2 duration-300">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <AlertDescription className="ml-2 text-xs font-medium">{displayError}</AlertDescription>
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
            Processing...
          </>
        ) : (
          submitButtonText
        )}
      </Button>
    </form>
  )
}
