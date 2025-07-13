"use client"

import { motion } from "framer-motion"
import { Shield, Code, Eye, Lock, Zap, Wrench, ArrowRight, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: Shield,
      title: "Digital Forensics",
      description:
        "Advanced investigation techniques to uncover digital evidence and trace cyber attacks with precision.",
      features: [
        "Incident Response & Analysis",
        "Data Recovery & Preservation",
        "Network Traffic Analysis",
        "Mobile Device Forensics",
        "Expert Witness Testimony",
      ],
      price: "Starting at $2,500",
    },
    {
      icon: Code,
      title: "Reverse Engineering",
      description: "Deep analysis of software and systems to understand functionality and identify vulnerabilities.",
      features: [
        "Binary Analysis & Disassembly",
        "Malware Analysis",
        "Protocol Reverse Engineering",
        "Vulnerability Research",
        "Code Obfuscation Analysis",
      ],
      price: "Starting at $3,000",
    },
    {
      icon: Lock,
      title: "Penetration Testing",
      description: "Comprehensive security assessments to identify and fix vulnerabilities before attackers do.",
      features: [
        "Web Application Testing",
        "Network Penetration Testing",
        "Wireless Security Assessment",
        "Social Engineering Tests",
        "Detailed Remediation Reports",
      ],
      price: "Starting at $4,000",
    },
    {
      icon: Eye,
      title: "Threat Intelligence",
      description: "Real-time monitoring and analysis of emerging threats and attack patterns.",
      features: [
        "24/7 Threat Monitoring",
        "IOC Analysis & Tracking",
        "Dark Web Monitoring",
        "Threat Actor Profiling",
        "Custom Intelligence Reports",
      ],
      price: "Starting at $1,500/month",
    },
    {
      icon: Zap,
      title: "Custom AI Tools",
      description: "Bespoke artificial intelligence solutions tailored to your security and business needs.",
      features: [
        "Machine Learning Models",
        "Automated Threat Detection",
        "Behavioral Analysis Systems",
        "Predictive Security Analytics",
        "Custom AI Integration",
      ],
      price: "Starting at $5,000",
    },
    {
      icon: Wrench,
      title: "Secure App Development",
      description: "Building applications with security-first principles and best practices from the ground up.",
      features: [
        "Secure Code Development",
        "Security Architecture Design",
        "DevSecOps Implementation",
        "Compliance Integration",
        "Ongoing Security Maintenance",
      ],
      price: "Starting at $10,000",
    },
  ]

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
            Our <span className="text-cyan-400">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive cybersecurity solutions designed to protect and enhance your digital infrastructure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="bg-gray-800/50 border-gray-700 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm h-full">
                <CardHeader>
                  <service.icon className="h-12 w-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-300">{service.description}</p>

                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <p className="text-lg font-semibold text-cyan-400 mb-4">{service.price}</p>
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    >
                      <Link href="/contact">
                        Get Quote <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-2xl p-12 border border-cyan-400/20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Need a Custom Solution?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Every organization has unique security challenges. Let's discuss how we can create a tailored solution that
            fits your specific needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              <Link href="/contact">Schedule Consultation</Link>
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
    </div>
  )
}
