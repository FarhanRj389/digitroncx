"use client"

import { useEffect, useRef } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Contact from "@/components/contact"
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Sparkles,
  Rocket,
  Heart,
  Globe,
  Award,
  MessageCircle,
  Calendar,
  Users,
  Shield,
  CheckCircle,
} from "lucide-react"
import FloatingParticles from "@/components/FloatingParticles"

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const offices = [
    {
      country: "New Zealand (Headquarters)",
      city: "Auckland",
      address: "Level 15, Sky Tower, Auckland CBD",
      phone: "+64 220 706 330",
      email: "info@digitroncx.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM NZST",
      timezone: "NZST (UTC+12)",
      gradient: "from-blue-500 to-cyan-500",
      flag: "🇳🇿",
    },
    {
      country: "Australia",
      city: "Sydney",
      address: "Level 20, Sydney Tower, CBD",
      phone: "+64 220 706 330",
      email: "au@digitroncx.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM AEST",
      timezone: "AEST (UTC+10)",
      gradient: "from-green-500 to-emerald-500",
      flag: "🇦🇺",
    },
    {
      country: "Pakistan (Development Hub)",
      city: "Karachi",
      address: "Tech City, Clifton Block 9",
      phone: "+64 220 706 330",
      email: "pk@digitroncx.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM PKT",
      timezone: "PKT (UTC+5)",
      gradient: "from-purple-500 to-pink-500",
      flag: "🇵🇰",
    },
    {
      country: "China (Innovation Lab)",
      city: "Shanghai",
      address: "Pudong Financial District",
      phone: "+64 220 706 330",
      email: "cn@digitroncx.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM CST",
      timezone: "CST (UTC+8)",
      gradient: "from-red-500 to-orange-500",
      flag: "🇨🇳",
    },
  ]

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Live Chat Support",
      description: "Get instant answers from our expert team",
      action: "Start Chat",
      gradient: "from-blue-500 to-cyan-500",
      available: "24/7",
    },
    {
      icon: Calendar,
      title: "Schedule Consultation",
      description: "Book a free 30-minute strategy session",
      action: "Book Now",
      gradient: "from-purple-500 to-pink-500",
      available: "Free",
    },
    {
      icon: Phone,
      title: "Direct Phone Call",
      description: "Speak directly with our project managers",
      action: "Call Now",
      gradient: "from-green-500 to-emerald-500",
      available: "Business Hours",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Detailed project discussions and quotes",
      action: "Send Email",
      gradient: "from-orange-500 to-red-500",
      available: "24h Response",
    },
  ]

  const faqs = [
    {
      question: "What's your typical project timeline and process?",
      answer:
        "Our projects typically range from 2-12 weeks depending on complexity. We follow a proven 4-step process: Discovery & Strategy → Design & Prototype → Development & Testing → Launch & Optimize. Each phase includes client collaboration and regular updates.",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer:
        "We offer comprehensive post-launch support including maintenance, updates, security monitoring, and technical assistance. Our support packages are tailored to your specific needs with 24/7 emergency support available.",
      gradient: "from-green-500 to-blue-600",
    },
    {
      question: "What technologies and platforms do you specialize in?",
      answer:
        "We work with cutting-edge technologies including React/Next.js, Node.js, React Native, AI/ML, Blockchain, and cloud platforms (AWS, Azure). We choose the best technology stack based on your project requirements and business goals.",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      question: "How do you handle projects across different time zones?",
      answer:
        "With offices in New Zealand, Australia, Pakistan, and China, we provide true 24/7 coverage. Our distributed team ensures continuous progress on your project and real-time support regardless of your location.",
      gradient: "from-orange-500 to-red-600",
    },
    {
      question: "What makes DigitronCX different from other agencies?",
      answer:
        "We combine technical excellence with creative innovation, offering transparent pricing, guaranteed results, and personalized service. Our global presence, proven track record of 500+ successful projects, and commitment to your success sets us apart.",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      question: "Can you work within our budget and timeline constraints?",
      answer:
        "Yes! We offer flexible solutions for every budget, from our $300 startup branding packages to enterprise-level solutions. We'll work with you to prioritize features and create a phased approach that fits your budget and timeline.",
      gradient: "from-pink-500 to-purple-600",
    },
  ]

  const guarantees = [
    { icon: Shield, text: "100% Satisfaction Guarantee", gradient: "from-green-400 to-emerald-500" },
    { icon: Clock, text: "On-Time Delivery Promise", gradient: "from-blue-400 to-cyan-500" },
    { icon: Award, text: "Quality Assurance Certified", gradient: "from-purple-400 to-pink-500" },
    { icon: Users, text: "Dedicated Project Manager", gradient: "from-orange-400 to-red-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Floating Particles */}
        <FloatingParticles count={20} color="bg-green-400/60" />
      </div>

      <Header />

      {/* Hero Section */}
      <section ref={sectionRef} className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-lg font-medium mb-10 animate-bounce-in glass-effect">
              <Heart className="h-6 w-6 mr-3 animate-pulse text-pink-400" />💬 Let's Create Something Amazing Together
              <Sparkles className="h-6 w-6 ml-3 animate-spin text-yellow-400" />
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 animate-fade-in-up">
              Get In
              <span className="text-gradient animate-shimmer block">Touch</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                Start Your Journey
              </span>
            </h1>

            <p className="text-2xl text-gray-300 mb-12 animate-fade-in-up animation-delay-200 leading-relaxed">
              🚀 Ready to transform your digital presence? Our expert team is here to turn your vision into reality.
              <span className="text-green-400 font-semibold"> Let's discuss your project</span> and create something
              extraordinary together.
            </p>

            {/* Quick Contact Methods */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-fade-in-up animation-delay-400">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <div
                    key={index}
                    className="animate-on-scroll bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-3 card-hover group relative overflow-hidden"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                    ></div>

                    <div className="relative z-10 text-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 animate-pulse-glow`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                        {method.title}
                      </h3>

                      <p className="text-gray-300 text-sm mb-4 group-hover:text-gray-200 transition-colors duration-300">
                        {method.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-cyan-400 font-medium">{method.available}</span>
                        <button
                          className={`px-4 py-2 bg-gradient-to-r ${method.gradient} text-white rounded-full text-sm font-semibold hover:scale-105 transition-transform duration-300`}
                        >
                          {method.action}
                        </button>
                      </div>

                      {/* Hover Effect Line */}
                      <div
                        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${method.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full`}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up animation-delay-600">
              {guarantees.map((guarantee, index) => {
                const Icon = guarantee.icon
                return (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover-lift group"
                  >
                    <Icon
                      className={`h-6 w-6 mx-auto mb-2 bg-gradient-to-r ${guarantee.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
                    />
                    <div className="text-white text-sm font-medium text-center group-hover:text-gradient transition-all duration-300">
                      {guarantee.text}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-8 glass-effect">
              <Globe className="h-4 w-4 mr-2 animate-spin" />
              Our Global Presence
            </div>

            <h2 className="text-5xl font-bold text-white mb-8">
              <span className="text-gradient">Worldwide</span> Offices
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Local Expertise, Global Reach
              </span>
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              🌍 With strategically located offices across four countries, we provide round-the-clock support and local
              expertise wherever you are.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offices.map((office, index) => (
              <div
                key={index}
                className="animate-on-scroll bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-3 card-hover group relative overflow-hidden"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${office.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                ></div>

                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-4">{office.flag}</div>

                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${office.gradient} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 animate-pulse-glow`}
                  >
                    <MapPin className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                    {office.country}
                  </h3>

                  <div className="space-y-3 text-gray-300 text-sm">
                    <div className="flex items-center justify-center">
                      <MapPin className="h-4 w-4 mr-2 text-cyan-400" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Phone className="h-4 w-4 mr-2 text-green-400" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Mail className="h-4 w-4 mr-2 text-purple-400" />
                      <span>{office.email}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Clock className="h-4 w-4 mr-2 text-orange-400" />
                      <span>{office.hours}</span>
                    </div>
                    <div className="text-xs text-cyan-400 font-medium">{office.timezone}</div>
                  </div>

                  {/* Hover Effect Line */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${office.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      <Contact/>

     

      {/* FAQ Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-8 glass-effect">
              <MessageCircle className="h-4 w-4 mr-2 animate-pulse" />
              Frequently Asked Questions
            </div>

            <h2 className="text-5xl font-bold text-white mb-8">
              <span className="text-gradient">Got Questions?</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
                We Have Answers
              </span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="animate-on-scroll bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 card-hover group relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${faq.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
                ></div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300 flex items-center">
                    <CheckCircle className="h-6 w-6 mr-3 text-green-400" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {faq.answer}
                  </p>

                  {/* Hover Effect Line */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${faq.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto animate-on-scroll">
            <div className="bg-gradient-to-br from-green-500/10 to-blue-600/10 backdrop-blur-lg rounded-3xl p-16 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-6xl font-bold text-white mb-8">
                  Ready to Start Your
                  <span className="text-gradient block"> Digital Transformation?</span>
                </h2>

                <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
                  🚀 Don't wait - your competitors aren't. Let's create something amazing together and dominate your
                  market.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button className="btn-gradient text-white px-12 py-6 text-xl font-bold rounded-full hover-lift group transition-all duration-300">
                    <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                    Get Free Consultation
                    <Sparkles className="ml-3 h-6 w-6 group-hover:animate-spin" />
                  </button>
                  <button className="glass-effect text-white border-white/30 px-12 py-6 text-xl font-bold rounded-full hover-glow group border-2 transition-all duration-300">
                    <Calendar className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                    Schedule Meeting
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
