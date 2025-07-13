"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  User,
  Clock,
  FileText,
  Download,
  Calendar,
  Mail,
  Activity,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader2,
  RefreshCw,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast" // Import useToast

interface HistoryItem {
  id: string
  type: "form_submission" | "login" | "password_reset" | "document_access"
  title: string
  description: string
  timestamp: string
  status: "completed" | "pending" | "failed"
  details?: any
}

export default function DashboardPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const { user, loading, sendVerificationEmail } = useAuth() // Get sendVerificationEmail
  const router = useRouter()
  const { toast } = useToast() // Initialize useToast

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    // Simulate loading user history - replace with actual API call
    if (user) {
      const mockHistory: HistoryItem[] = [
        {
          id: "1",
          type: "form_submission",
          title: "Security Assessment Request",
          description: "Submitted secure form for penetration testing consultation",
          timestamp: "2024-01-15T10:30:00Z",
          status: "completed",
          details: {
            serviceType: "penetration-testing",
            budget: "10k-25k",
            timeline: "1-month",
          },
        },
        {
          id: "2",
          type: "login",
          title: "Portal Access",
          description: "Logged into secure portal",
          timestamp: "2024-01-15T09:15:00Z",
          status: "completed",
        },
        {
          id: "3",
          type: "document_access",
          title: "Security Report Downloaded",
          description: "Downloaded preliminary security assessment report",
          timestamp: "2024-01-14T16:45:00Z",
          status: "completed",
        },
        {
          id: "4",
          type: "form_submission",
          title: "AI Security Consultation",
          description: "Requested consultation for AI-powered threat detection",
          timestamp: "2024-01-12T14:20:00Z",
          status: "pending",
          details: {
            serviceType: "custom-ai-tools",
            budget: "25k-50k",
            timeline: "2-3-months",
          },
        },
        {
          id: "5",
          type: "password_reset",
          title: "Password Reset",
          description: "Requested password reset via email",
          timestamp: "2024-01-10T11:30:00Z",
          status: "completed",
        },
      ]
      setHistory(mockHistory)
    }
  }, [user])

  const formatDate = (timestamp: string | null) => {
    if (!timestamp) return "N/A"
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-400" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "form_submission":
        return <FileText className="h-5 w-5 text-cyan-400" />
      case "login":
        return <Shield className="h-5 w-5 text-green-400" />
      case "password_reset":
        return <Mail className="h-5 w-5 text-blue-400" />
      case "document_access":
        return <Download className="h-5 w-5 text-purple-400" />
      default:
        return <Activity className="h-5 w-5 text-gray-400" />
    }
  }

  const handleResendVerification = async () => {
    try {
      await sendVerificationEmail()
      toast({
        title: "Verification email sent!",
        description: "Please check your inbox (and spam folder) for the verification link.",
      })
    } catch (error) {
      console.error("Error resending verification email:", error)
      toast({
        title: "Failed to send verification email",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Security <span className="text-cyan-400">Dashboard</span>
                </h1>
                <p className="text-xl text-gray-300">Welcome back, {user.email}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                >
                  <a href="/secure-form">New Request</a>
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
              <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-600">
                Overview
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-cyan-600">
                Activity History
              </TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-cyan-600">
                Profile
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Requests</p>
                        <p className="text-2xl font-bold text-white">
                          {history.filter((h) => h.type === "form_submission").length}
                        </p>
                      </div>
                      <FileText className="h-8 w-8 text-cyan-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Completed</p>
                        <p className="text-2xl font-bold text-white">
                          {history.filter((h) => h.status === "completed").length}
                        </p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Pending</p>
                        <p className="text-2xl font-bold text-white">
                          {history.filter((h) => h.status === "pending").length}
                        </p>
                      </div>
                      <AlertCircle className="h-8 w-8 text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Last Login</p>
                        <p className="text-sm font-medium text-white">
                          {formatDate(
                            history.find((h) => h.type === "login")?.timestamp || user.metadata.lastSignInTime,
                          )}
                        </p>
                      </div>
                      <Shield className="h-8 w-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-cyan-400" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {history.slice(0, 5).map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg">
                        <div className="flex-shrink-0">{getTypeIcon(item.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium">{item.title}</p>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                          <p className="text-gray-500 text-xs">{formatDate(item.timestamp)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(item.status)}
                          <Badge
                            variant="secondary"
                            className={`${
                              item.status === "completed"
                                ? "bg-green-900/30 text-green-300"
                                : item.status === "pending"
                                  ? "bg-yellow-900/30 text-yellow-300"
                                  : "bg-red-900/30 text-red-300"
                            }`}
                          >
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-cyan-400" />
                    Complete Activity History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {history.map((item) => (
                      <div key={item.id} className="border-l-2 border-cyan-400 pl-6 pb-6 relative">
                        <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-400 rounded-full"></div>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              {getTypeIcon(item.type)}
                              <h3 className="text-white font-semibold">{item.title}</h3>
                              <Badge
                                variant="secondary"
                                className={`${
                                  item.status === "completed"
                                    ? "bg-green-900/30 text-green-300"
                                    : item.status === "pending"
                                      ? "bg-yellow-900/30 text-yellow-300"
                                      : "bg-red-900/30 text-red-300"
                                }`}
                              >
                                {item.status}
                              </Badge>
                            </div>
                            <p className="text-gray-300 mb-2">{item.description}</p>
                            <p className="text-gray-500 text-sm">{formatDate(item.timestamp)}</p>
                            {item.details && (
                              <div className="mt-3 p-3 bg-gray-700/30 rounded-lg">
                                <p className="text-gray-400 text-sm mb-2">Details:</p>
                                <div className="space-y-1">
                                  {Object.entries(item.details).map(([key, value]) => (
                                    <div key={key} className="flex justify-between text-sm">
                                      <span className="text-gray-400 capitalize">
                                        {key.replace(/([A-Z])/g, " $1")}:
                                      </span>
                                      <span className="text-gray-300">{value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <User className="h-5 w-5 mr-2 text-cyan-400" />
                      Account Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Account Created</p>
                        <p className="text-white">{formatDate(user.metadata.creationTime)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Last Sign In</p>
                        <p className="text-white">{formatDate(user.metadata.lastSignInTime)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-cyan-400" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Email Verified</p>
                        <p className="text-gray-400 text-sm">
                          {user.emailVerified
                            ? "Your email address is verified."
                            : "Your email address is not verified."}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`${
                          user.emailVerified ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"
                        }`}
                      >
                        {user.emailVerified ? "Verified" : "Unverified"}
                      </Badge>
                    </div>
                    {!user.emailVerified && (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white">Resend Verification</p>
                          <p className="text-gray-400 text-sm">Send a new verification email to your inbox.</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-cyan-400 text-cyan-400 bg-transparent hover:bg-cyan-400 hover:text-black"
                          onClick={handleResendVerification}
                        >
                          <RefreshCw className="h-4 w-4 mr-2" /> Resend
                        </Button>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Two-Factor Authentication</p>
                        <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-cyan-400 text-cyan-400 bg-transparent">
                        Enable
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Password</p>
                        <p className="text-gray-400 text-sm">Change your password</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-cyan-400 text-cyan-400 bg-transparent">
                        Change
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
