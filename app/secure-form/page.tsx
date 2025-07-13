"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Lock, Send, Loader2 } from "lucide-react" // Import Loader2
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

export default function SecureFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      clientName: formData.get("clientName"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      serviceType: formData.get("serviceType"),
      projectDescription: formData.get("projectDescription"),
      budget: formData.get("budget"),
      timeline: formData.get("timeline"),
      additionalInfo: formData.get("additionalInfo"),
      submittedAt: new Date().toISOString(),
      submittedBy: user?.email,
    }

    try {
      // Simulate form submission - replace with actual MongoDB integration
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Form submitted successfully!",
        description: "We'll review your request and get back to you within 24 hours.",
      })
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      toast({
        title: "Error submitting form",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-cyan-400 animate-spin mx-auto mb-4" /> {/* Enhanced spinner */}
          <p className="text-gray-300">Verifying access...</p>
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
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Secure Client <span className="text-cyan-400">Intake Form</span>
            </h1>
            <p className="text-xl text-gray-300">Confidential project consultation and quote request</p>
          </div>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Shield className="h-6 w-6 mr-2 text-cyan-400" />
                Project Details & Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Client Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-cyan-400 border-b border-gray-700 pb-2">
                    Client Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="clientName" className="text-gray-300">
                        Full Name *
                      </Label>
                      <Input
                        id="clientName"
                        name="clientName"
                        required
                        className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-300">
                        Company/Organization
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400"
                        placeholder="Your company"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-cyan-400 border-b border-gray-700 pb-2">
                    Project Requirements
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="serviceType" className="text-gray-300">
                      Service Type *
                    </Label>
                    <Select name="serviceType" required>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400">
                        <SelectValue placeholder="Select the primary service needed" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="digital-forensics">Digital Forensics</SelectItem>
                        <SelectItem value="reverse-engineering">Reverse Engineering</SelectItem>
                        <SelectItem value="penetration-testing">Penetration Testing</SelectItem>
                        <SelectItem value="threat-intelligence">Threat Intelligence</SelectItem>
                        <SelectItem value="custom-ai-tools">Custom AI Tools</SelectItem>
                        <SelectItem value="secure-development">Secure App Development</SelectItem>
                        <SelectItem value="consultation">General Consultation</SelectItem>
                        <SelectItem value="other">Other (specify in description)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectDescription" className="text-gray-300">
                      Project Description *
                    </Label>
                    <Textarea
                      id="projectDescription"
                      name="projectDescription"
                      required
                      rows={6}
                      className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400"
                      placeholder="Please provide a detailed description of your project, security concerns, specific requirements, and any relevant background information..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-gray-300">
                        Budget Range
                      </Label>
                      <Select name="budget">
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400">
                          <SelectValue placeholder="Select your budget range" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="under-5k">Under $5,000</SelectItem>
                          <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                          <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="over-100k">Over $100,000</SelectItem>
                          <SelectItem value="discuss">Prefer to discuss</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeline" className="text-gray-300">
                        Project Timeline
                      </Label>
                      <Select name="timeline">
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400">
                          <SelectValue placeholder="When do you need this completed?" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="urgent">Urgent (within 1 week)</SelectItem>
                          <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                          <SelectItem value="1-month">Within 1 month</SelectItem>
                          <SelectItem value="2-3-months">2-3 months</SelectItem>
                          <SelectItem value="flexible">Flexible timeline</SelectItem>
                          <SelectItem value="ongoing">Ongoing project</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-cyan-400 border-b border-gray-700 pb-2">
                    Additional Information
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo" className="text-gray-300">
                      Additional Notes
                    </Label>
                    <Textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      rows={4}
                      className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400"
                      placeholder="Any additional information, special requirements, compliance needs, or questions you'd like to discuss..."
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-700">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-lg py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting Secure Form...
                      </>
                    ) : (
                      <>
                        Submit Secure Request <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-gray-400 text-center mt-4">
                    This form is encrypted and securely transmitted. We'll respond within 24 hours.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
