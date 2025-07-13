"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Lock } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [message, setMessage] = useState("Please check your email for the password reset link.")

  useEffect(() => {
    const mode = searchParams.get("mode")
    const oobCode = searchParams.get("oobCode") // Firebase action code
    const continueUrl = searchParams.get("continueUrl")

    if (mode === "resetPassword" && oobCode) {
      // In a real application, you would use Firebase's confirmPasswordReset(auth, oobCode, newPassword) here.
      // For this simplified demo, we assume the user will follow the link to Firebase's hosted page
      // or that the email itself is sufficient.
      setMessage("You have received a password reset link. Please follow the instructions in your email.")
    } else if (mode === "verifyEmail" && oobCode) {
      setMessage("Your email has been verified. You can now log in.")
    } else if (mode === "recoverEmail" && oobCode) {
      setMessage("You have received an email recovery link. Please follow the instructions in your email.")
    } else {
      setMessage("Invalid or missing action. Please return to the login page.")
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/25">
              <Lock className="h-10 w-10 text-white" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Password Reset / Account Action</h1>
          <p className="text-gray-400">Information regarding your account action.</p>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-cyan-400" />
              Action Status
            </CardTitle>
            <CardDescription className="text-gray-400">{message}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <Button
                onClick={() => router.push("/login")}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                Go to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
