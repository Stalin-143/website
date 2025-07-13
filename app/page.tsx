"use client"

import { motion } from "framer-motion"
import {
  Shield,
  Zap,
  Code,
  Eye,
  Lock,
  ArrowRight,
  Github,
  Linkedin,
  Brain,
  Users,
  Award,
  Target,
  Star,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const stats = [
    { number: "50+", label: "Security Projects", icon: Shield },
    { number: "100+", label: "Vulnerabilities Found", icon: Target },
    { number: "25+", label: "AI Models Trained", icon: Brain },
    { number: "99%", label: "Client Satisfaction", icon: Award },
  ]

  const expertise = [
    {
      title: "Ethical Hacking",
      description: "Certified ethical hacker with expertise in penetration testing and vulnerability assessment.",
      icon: Shield,
      skills: ["OWASP Top 10", "Network Penetration", "Web App Security", "Social Engineering"],
    },
    {
      title: "AI & Machine Learning",
      description: "Developing AI-powered security solutions and threat detection systems.",
      icon: Brain,
      skills: ["Deep Learning", "Threat Detection", "Behavioral Analysis", "Computer Vision"],
    },
    {
      title: "Digital Forensics",
      description: "Advanced digital investigation techniques for incident response and evidence analysis.",
      icon: Eye,
      skills: ["Memory Analysis", "Network Forensics", "Mobile Forensics", "Malware Analysis"],
    },
    {
      title: "Secure Development",
      description: "Building secure applications with security-first development practices.",
      icon: Code,
      skills: ["Secure Coding", "DevSecOps", "Code Review", "Security Architecture"],
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CISO, TechCorp",
      content:
        "Exceptional security expertise. The penetration testing revealed critical vulnerabilities we never knew existed.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Security Manager, DataFlow",
      content:
        "Professional, thorough, and incredibly knowledgeable. The AI-powered threat detection system is outstanding.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "CTO, SecureStart",
      content:
        "Top-tier cybersecurity consultant. Delivered comprehensive security solutions that exceeded our expectations.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(0,255,255,0.05)_50%,transparent_70%)]" />

        <motion.div
          className="container mx-auto px-6 text-center z-10"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">
              NEXULEAN
            </h1>
            <p className="text-xl md:text-2xl text-cyan-300 font-light tracking-wide mb-4">
              Redefining Digital Intelligence & Security
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Ethical Hacker | AI Enthusiast | Cybersecurity Specialist | Penetration Tester
            </p>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Combining advanced AI with cutting-edge cybersecurity expertise to protect digital assets and identify
            vulnerabilities before malicious actors do. Specialized in ethical hacking, penetration testing, and
            AI-powered security solutions.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 text-lg"
            >
              <Link href="/projects">
                View Security Arsenal <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-3 text-lg bg-transparent"
            >
              <Link href="/services">Security Services</Link>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeInUp} className="flex justify-center space-x-6">
            <a
              href="https://github.com/Stalin-143"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Github className="h-8 w-8" />
            </a>
            <a
              href="https://www.linkedin.com/in/stalin-s-a310882a0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Linkedin className="h-8 w-8" />
            </a>
            <a
              href="https://huggingface.co/5t4l1n"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Brain className="h-8 w-8" />
            </a>
          </motion.div>
        </motion.div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Proven <span className="text-cyan-400">Track Record</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-800/50 border-gray-700 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm text-center">
                  <CardContent className="p-6">
                    <stat.icon className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-white mb-2">{stat.number}</h3>
                    <p className="text-gray-300">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Core <span className="text-cyan-400">Expertise</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Specialized skills in cybersecurity, ethical hacking, and AI-powered security solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {expertise.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-800/50 border-gray-700 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm h-full">
                  <CardContent className="p-6">
                    <area.icon className="h-12 w-12 text-cyan-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-3">{area.title}</h3>
                    <p className="text-gray-300 mb-4">{area.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {area.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-cyan-900/30 text-cyan-300 text-sm rounded-full border border-cyan-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Client <span className="text-cyan-400">Testimonials</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              What security professionals say about working with me.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-cyan-400 text-sm">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Security <span className="text-cyan-400">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive cybersecurity solutions to protect your digital assets and infrastructure.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Penetration Testing",
                description: "Comprehensive security assessments to identify vulnerabilities before attackers do.",
              },
              {
                icon: Code,
                title: "Reverse Engineering",
                description: "Deep analysis of software and systems to understand functionality and find weaknesses.",
              },
              {
                icon: Lock,
                title: "Digital Forensics",
                description: "Advanced investigation techniques to uncover digital evidence and trace cyber attacks.",
              },
              {
                icon: Eye,
                title: "Threat Intelligence",
                description: "Real-time monitoring and analysis of emerging threats and attack patterns.",
              },
              {
                icon: Zap,
                title: "AI Security Tools",
                description: "Custom artificial intelligence solutions for automated threat detection and response.",
              },
              {
                icon: Users,
                title: "Security Consulting",
                description: "Expert guidance on security architecture, compliance, and risk management.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-800/50 border-gray-700 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm h-full">
                  <CardContent className="p-6">
                    <service.icon className="h-12 w-12 text-cyan-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-300">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to <span className="text-cyan-400">Secure</span> Your Digital Assets?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Let's discuss how I can help protect your organization from cyber threats and enhance your security
              posture.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                <Link href="/contact">Get Security Assessment</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black bg-transparent"
              >
                <a href="https://monitor.nexulean.tech" target="_blank" rel="noopener noreferrer">
                  View Live Monitoring
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">NEXULEAN</h3>
              <p className="text-gray-400">Redefining Digital Intelligence & Security</p>
              <p className="text-gray-500 text-sm mt-1">Ethical Hacker | AI Enthusiast | Security Specialist</p>
            </div>
            <div className="flex space-x-6">
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
                <Linkedin className="h-6 w-6" />
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
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Nexulean. All rights reserved. | Ethical Hacking & AI Security Solutions</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
