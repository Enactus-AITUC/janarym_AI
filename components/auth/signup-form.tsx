// <NEW> Sign up form component
"use client"

import type React from "react"

import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SignupFormProps {
  onSignupSuccess: () => void
}

export default function SignupForm({ onSignupSuccess }: SignupFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      onSignupSuccess()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Signup failed. Please try again."
      setError(errorMessage)
      console.log("[v0] Signup error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 overflow-y-auto pb-24 flex items-center justify-center">
      <Card className="p-6 border-2 border-primary bg-card w-full max-w-md m-4">
        <h1 className="text-3xl font-bold mb-6 text-center high-contrast-text">Create Account</h1>

        {error && (
          <Alert className="mb-6 border-2 border-destructive bg-destructive/10">
            <AlertDescription className="text-destructive font-semibold">{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2 high-contrast-text">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-background text-foreground border-2 border-border rounded-lg p-3 font-semibold placeholder-muted-foreground touch-target"
              required
              aria-label="Email address"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2 high-contrast-text">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-background text-foreground border-2 border-border rounded-lg p-3 font-semibold placeholder-muted-foreground touch-target"
              required
              aria-label="Password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2 high-contrast-text">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-background text-foreground border-2 border-border rounded-lg p-3 font-semibold placeholder-muted-foreground touch-target"
              required
              aria-label="Confirm password"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 high-contrast-text touch-target disabled:opacity-50"
            aria-label="Create account"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
      </Card>
    </div>
  )
}
