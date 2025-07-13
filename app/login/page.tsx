"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Lock, Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [resetEmail, setResetEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const { signIn, resetPassword } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signIn(email, password)
      toast({
        title: "Login successful!",
        description: "Welcome back to Nexulean secure portal.",
      })
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Login error:", error)
      if (error.code === "auth/user-not-found") {
        setError("No account found with this email address.")
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.")
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email address format.")
      } else if (error.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.")
      } else if (error.code === "auth/invalid-credential") {
        setError("Invalid email or password. Please check your credentials.")
      } else {
        setError("Login failed. Please check your credentials and try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetLoading(true)

    try {
      await resetPassword(resetEmail)
      setResetSent(true)
      toast({
        title: "Password reset email sent!",
        description: "Check your email for password reset instructions.",
      })
    } catch (error: any) {
      console.error("Password reset error:", error)
      if (error.code === "auth/user-not-found") {
        toast({
          title: "Email not found",
          description: "No account found with this email address.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error sending reset email",
          description: "Please try again or contact support.",
          variant: "destructive",
        })
      }
    } finally {
      setResetLoading(false)
    }
  }

  const resetForm = () => {
    setShowForgotPassword(false)
    setResetSent(false)
    setResetEmail("")
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/25">
              <Shield className="h-10 w-10 text-white" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Nexulean Security Portal</h1>
          <p className="text-gray-400">
            {showForgotPassword ? "Reset your password" : "Login to access your dashboard"}
          </p>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center">
              <Lock className="h-5 w-5 mr-2 text-cyan-400" />
              {showForgotPassword ? "Password Reset" : "Authentication Required"}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {showForgotPassword
                ? resetSent
                  ? "Reset email sent successfully"
                  : "Enter your email to receive reset instructions"
                : "Enter your credentials to continue"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showForgotPassword ? (
              // Login Form
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert className="bg-red-900/20 border-red-800">
                    <AlertDescription className="text-red-400">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-2.5"
                  disabled={loading}
                >
                  {loading ? "Authenticating..." : "Sign In"}
                </Button>
              </form>
            ) : resetSent ? (
              // Reset Email Sent Confirmation
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="p-3 bg-green-900/20 rounded-full">
                    <CheckCircle className="h-12 w-12 text-green-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Reset Email Sent!</h3>
                  <p className="text-gray-300 text-sm">
                    We've sent password reset instructions to <strong className="text-cyan-400">{resetEmail}</strong>
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    Check your email and follow the link to reset your password.
                  </p>
                </div>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Button>
              </div>
            ) : (
              // Forgot Password Form
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="resetEmail" className="text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="resetEmail"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-4">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-2.5"
                    disabled={resetLoading}
                  >
                    {resetLoading ? (
                      "Sending Reset Email..."
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Reset Email
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Login
                  </Button>
                </div>
              </form>
            )}

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-gray-700/30 rounded-lg border border-gray-600">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300 font-medium mb-1">Secure Access</p>
                  <p className="text-xs text-gray-400">
                    This portal uses Firebase Authentication with enterprise-grade security. All communications are
                    encrypted and monitored for unauthorized access attempts.
                  </p>
                </div>
              </div>
            </div>

            {/* Support Contact */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Need help accessing your account?{" "}
                <a href="/contact" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Contact Support
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
