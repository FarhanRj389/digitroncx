"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  ArrowRight,
  Monitor,
  Smartphone,
  Palette,
  Database,
  Cloud,
  Search,
  Sparkles,
  Zap,
  Star,
  Rocket,
  Handshake,
} from "lucide-react"
import Price from "./price"
import FloatingParticles from "@/components/FloatingParticles"

const services = [
  {
    icon: Monitor,
    title: "Premium Website Development",
    description: "Stunning, high-performance websites that captivate your audience and drive conversions with cutting-edge design.",
    features: ["Custom-based Web Design", "Lightning Fast", "SEO Optimized", "Mobile Perfect"],
    price: "From $200 ",
    gradient: "from-blue-500 to-cyan-500",
    popular: false,
  },
  {
    icon: Smartphone,
    title: "Revolutionary Mobile Apps",
    description: "Next-generation mobile applications that redefine user experience across iOS and Android platforms.",
    features: ["Native Performance", "Cross-Platform", "App Store Ready", "24/7 Support"],
    price: "From $1,200 NZD",
    gradient: "from-purple-500 to-pink-500",
    popular: false,
  },
  {
    icon: Database,
    title: "Custom Web Solutions",
    description: "Scalable, secure web applications engineered for professional-level performance and reliability.",
    features: ["Custom Web Hub ","Cloud Architecture", "Realtime Database Integration", "API Integration"],
    price: "From $2,500 NZD",
    gradient: "from-emerald-500 to-teal-500",
    popular: false,
  },
  {
    icon: Palette,
    title: "Startup Branding Magic",
    description: "Complete brand transformation that makes your startup unforgettable and market-ready.",
    features: ["Logo & Visual Identity Design", "Brand Color & Typography", "Branded Templates & assets", "Business Collaterals Design"],
    price: "From $150 NZD",
    gradient: "from-pink-500 to-rose-500",
    popular: true,
  },
  {
    icon: Handshake,
    title: "Channel Partnership",
    description: "Promote our soultions strategically and grow with us.Earn Reward and Commissions on qualified Referrals and Sales",
    features: ["White-Labeled Soultions", "Dedicated Partner Portal", "Rewards & Commissions", "Strategic Alliance & Collaboration"],
    price: "Free",
    btn: "from-indigo-500 to-purple-500",
    popular: false,
  },
  {
    icon: Search,
    title: "Digital Marketing Mastery",
    description: "Data-driven marketing strategies that skyrocket your online presence and boost ROI.",
    features: ["Social Media Setup", "Performance Marketing", "Content Strategy & Design", "Result Driven Analytics"],
    price: "From $800 NZD",
    gradient: "from-orange-500 to-red-500",
    popular: false,
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-scale-in")
          }
        })
      },
       
    )

    const elements = sectionRef.current?.querySelectorAll(".service-card")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Floating Particles */}
        <FloatingParticles count={15} color="bg-blue-400/60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-8 animate-bounce-in glass-effect">
            <Rocket className="h-4 w-4 mr-2 animate-pulse" /> Premium Digital Services
            <Sparkles className="h-4 w-4 ml-2 animate-spin" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 animate-fade-in-up">
            <span className="text-gradient">Extraordinary</span> Solutions
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Exceptional Results
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-4xl mx-auto animate-fade-in-up animation-delay-200 leading-relaxed">
            Transform your business with our comprehensive suite of digital services. From startups to enterprises,
            we deliver solutions that exceed expectations and drive growth.
          </p>
        </div>

        <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className={` service-card relative px-8 py-14 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-3 card-hover group ${
                  service.popular ? "  ring-2 ring-yellow-400/50 shadow-2xl shadow-yellow-400/20" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {service.popular && (
                  <div className="relative">
                  <div className=" absolute -top-[74px] left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-sm font-bold flex items-center animate-pulse">
                      <Star className="h-4 w-4 mr-2" />
                      Most Popular
                      <Zap className="h-4 w-4 ml-2" />
                    </div>
                  </div>
                  </div>
                )}

                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                ></div>

                {/* Icon */}
                <div
                  className={`relative w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 animate-pulse-glow`}
                >
                  <Icon className="h-10 w-10 text-white" />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500`}
                  ></div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300"
                    >
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-3 animate-pulse`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                    {service.price === "Free"
                      ? "Free"
                      : <Price amount={parseInt(service.price.replace(/[^\d]/g, ""))} />}
                  </span>
                {service.gradient && (
                  <Link href="/contact" className="z-10">
                    <Button 
                      className={`${
                        service.popular
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600"
                          : `bg-gradient-to-r ${service.gradient} hover:scale-105`
                      } text-white border-0 rounded-full px-6 py-3 font-semibold transition-all duration-300 hover-lift group`}
                    >
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                )}
                {service.btn && (
                  <Link href="/contact" className="z-10">
                    <Button
                      className={` ${service.btn} hover:scale-105`} >
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                )}
                </div>
                {/* Hover Effect Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full`}
                ></div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center animate-fade-in-up animation-delay-800">
          <Link href="/services">
          <Button
            size="lg"
            className="btn-gradient text-white px-12 py-6 text-xl font-bold rounded-full hover-lift group"
          >
            <Sparkles className="mr-3 h-6 w-6 group-hover:animate-spin" />
            Explore All Services
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
          </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
