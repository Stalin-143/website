"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Github, ExternalLink, Filter, Brain, Shield, PenToolIcon as Tool, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const githubProjects = [
    {
      title: "ZeroX",
      description:
        "Advanced Python-based security tool for penetration testing and vulnerability assessment with comprehensive exploit capabilities.",
      tags: ["Security", "Python", "Penetration Testing"],
      github: "https://github.com/Stalin-143/ZeroX",
      category: "Security",
      language: "Python",
    },
    {
      title: "Advanced Keylogger",
      description:
        "Sophisticated keylogger software that monitors and records keystrokes for security research and testing purposes. Includes stealth mode and data encryption.",
      tags: ["Security", "Python", "Monitoring", "Research"],
      github: "https://github.com/Stalin-143/Keylogger",
      category: "Security",
      language: "Python",
    },
    {
      title: "Ztor",
      description:
        "Network security tool built with Makefile for advanced system operations, network analysis, and security testing in enterprise environments.",
      tags: ["Security", "Tools", "Network", "Enterprise"],
      github: "https://github.com/Stalin-143/Ztor",
      category: "Tools",
      language: "Makefile",
    },
    {
      title: "NexTOR IP Changer",
      description:
        "Automated IP address changing tool for enhanced privacy and security. Provides seamless IP rotation capabilities with TOR integration for anonymous browsing.",
      tags: ["Security", "Python", "Privacy", "TOR"],
      github: "https://github.com/Stalin-143/NexTOR_IP_CHANGER",
      category: "Security",
      language: "Python",
    },
  ]

  const huggingFaceModels = [
    {
      title: "AI Security Model Collection",
      description:
        "Collection of machine learning models focused on cybersecurity applications, threat detection, and behavioral analysis for enterprise security.",
      tags: ["AI", "Security", "ML", "Threat Detection"],
      github: "https://huggingface.co/5t4l1n",
      demo: "https://huggingface.co/5t4l1n",
      category: "AI",
      language: "Python",
    },
  ]

  const allProjects = [...githubProjects, ...huggingFaceModels]

  const filters = ["All", "AI", "Security", "Tools"]

  const filteredProjects =
    selectedFilter === "All" ? allProjects : allProjects.filter((project) => project.category === selectedFilter)

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      toast({
        title: "Configuration error",
        description: "Contact form is not configured. Please reach out directly on LinkedIn.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    const formData = new FormData(e.currentTarget)
    formData.append("access_key", accessKey)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for your interest. I'll get back to you soon.",
        })
        ;(e.target as HTMLFormElement).reset()
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly on LinkedIn.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Security <span className="text-cyan-400">Arsenal</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore my collection of cybersecurity tools, AI models, and penetration testing utilities. Each project
            demonstrates expertise in ethical hacking, security research, and advanced threat detection.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              asChild
              variant="outline"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black bg-transparent"
            >
              <a href="https://github.com/Stalin-143" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                GitHub Profile
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black bg-transparent"
            >
              <a href="https://huggingface.co/5t4l1n" target="_blank" rel="noopener noreferrer">
                <Brain className="h-4 w-4 mr-2" />
                Hugging Face
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-transparent"
            >
              <a href="https://www.linkedin.com/in/stalin-s-a310882a0/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                LinkedIn
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Filter className="h-5 w-5 text-cyan-400 mt-2" />
          {filters.map((filter) => (
            <Button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              variant={selectedFilter === filter ? "default" : "outline"}
              className={
                selectedFilter === filter
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  : "border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400"
              }
            >
              {filter}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="bg-gray-800/50 border-gray-700 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {project.category === "AI" && <Brain className="h-5 w-5 text-purple-400" />}
                      {project.category === "Security" && <Shield className="h-5 w-5 text-red-400" />}
                      {project.category === "Tools" && <Tool className="h-5 w-5 text-yellow-400" />}
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                        {project.language}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-cyan-900/30 text-cyan-300 border-cyan-700 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 bg-transparent flex-1"
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        {project.github.includes("huggingface") ? (
                          <Brain className="h-4 w-4 mr-2" />
                        ) : (
                          <Github className="h-4 w-4 mr-2" />
                        )}
                        {project.github.includes("huggingface") ? "Models" : "Code"}
                      </a>
                    </Button>
                    {project.demo && (
                      <Button
                        asChild
                        size="sm"
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 flex-1"
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's <span className="text-cyan-400">Collaborate</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Interested in working together on cybersecurity projects or need consultation? Get in touch!
            </p>
          </div>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">Contact Me</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email *
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-300">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    required
                    className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400"
                    placeholder="Project collaboration, consultation, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="bg-gray-700 border-gray-600 text-white focus:border-cyan-400"
                    placeholder="Tell me about your project, security needs, or how we can work together..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-lg py-3"
                >
                  {isSubmitting ? (
                    "Sending Message..."
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                <p className="text-gray-400 mb-4">Or connect with me directly:</p>
                <div className="flex justify-center space-x-6">
                  <a
                    href="https://github.com/Stalin-143"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/stalin-s-a310882a0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink className="h-6 w-6" />
                  </a>
                  <a
                    href="https://huggingface.co/5t4l1n"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <Brain className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
