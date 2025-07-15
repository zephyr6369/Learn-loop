"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface AuthFormsProps {
  isSignUp?: boolean
}

export function AuthForms({ isSignUp = false }: AuthFormsProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const success = await login(email, password, isSignUp ? name : undefined)
      if (!success) {
        setError("Authentication failed. Please check your credentials.")
      }
    } catch (err) {
      setError("Authentication failed. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">{isSignUp ? "Sign Up" : "Login"}</CardTitle>
        <CardDescription className="text-center">
          {isSignUp ? "Create your account to get started" : "Enter your email and password to access your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {isSignUp && (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isSignUp ? "Signing Up..." : "Logging In..."}
              </>
            ) : isSignUp ? (
              "Sign Up"
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <Link href="/login" className="underline text-primary" prefetch={false}>
                Login
              </Link>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline text-primary" prefetch={false}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
