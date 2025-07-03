"use client"

import { useEffect, useRef } from "react"
import { Code, Smartphone, Palette, Zap, Shield, Headphones, Sparkles, Rocket, Globe, Star } from "lucide-react"

const features = [
  {
    icon: Code,
    title: "Next-Gen Development",
    description:
      "Cutting-edge web solutions built with the latest technologies, AI integration, and future-proof architecture.",
    gradient: "from-blue-500 to-cyan-500",
    delay: "animation-delay-100",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Excellence",
    description: "Stunning responsive designs that deliver flawless experiences across all devices and platforms.",
    gradient: "from-purple-500 to-pink-500",
    delay: "animation-delay-200",
  },
  {
    icon: Palette,
    title: "Creative Brand Identity",
    description:
      "Transformative branding solutions starting from $300 NZD - where creativity meets strategic thinking.",
    gradient: "from-pink-500 to-rose-500",
    delay: "animation-delay-300",
  },
  {
    icon: Zap,
    title: "Lightning Performance",
    description:
      "Blazing-fast applications optimized for speed, SEO, and user engagement with advanced caching strategies.",
    gradient: "from-yellow-500 to-orange-500",
    delay: "animation-delay-400",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level security protocols, data encryption, and compliance standards to protect your digital assets.",
    gradient: "from-green-500 to-emerald-500",
    delay: "animation-delay-500",
  },
  {
    icon: Headphones,
    title: "24/7 Global Support",
    description: "Round-the-clock expert assistance across multiple time zones with dedicated account management.",
    gradient: "from-indigo-500 to-purple-500",
    delay: "animation-delay-600",
  },
]

export default function CoreFeatures() {
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

    const elements = sectionRef.current?.querySelectorAll(".feature-card")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium mb-8 animate-bounce-in">
            <Star className="h-4 w-4 mr-2 animate-spin" />What Makes DigitronCX Extraordinary
            <Sparkles className="h-4 w-4 ml-2 animate-pulse" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 animate-fade-in-up">
            <span className="text-gradient">Innovation</span> Meets
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Excellence
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto animate-fade-in-up animation-delay-200 leading-relaxed">
            We don't just build websites and apps - we craft digital masterpieces that captivate, engage, and
            convert. Every pixel, every interaction, every line of code is designed to deliver extraordinary results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`feature-card group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 card-hover ${feature.delay} relative overflow-hidden`}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                ></div>

                {/* Icon Container */}
                <div
                  className={`relative w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 animate-pulse-glow`}
                >
                  <Icon className="h-10 w-10 text-white" />

                  {/* Icon Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500`}
                  ></div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover Effect Line */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full`}
                ></div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center animate-fade-in-up animation-delay-800">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full font-medium text-lg hover-lift animate-gradient">
            <Rocket className="h-5 w-5 mr-3 animate-bounce" />Trusted by 60+ businesses across 4 countries
            <Globe className="h-5 w-5 ml-3 animate-spin" />
          </div>
        </div>
      </div>
    </section>
  )
}
