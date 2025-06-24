"use client"

import { useEffect, useRef } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Users, Award, Globe, Target, Sparkles, Rocket, Star, Crown, Heart, Zap } from "lucide-react"

export default function AboutPage() {
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

  const stats = [
    { number: "500+", label: "Dreams Realized", icon: Star, gradient: "from-yellow-400 to-orange-500" },
    { number: "4", label: "Countries Conquered", icon: Globe, gradient: "from-blue-400 to-purple-500" },
    { number: "5+", label: "Years of Magic", icon: Crown, gradient: "from-purple-400 to-pink-500" },
    { number: "24/7", label: "Always Here", icon: Heart, gradient: "from-pink-400 to-red-500" },
  ]

  const team = [
    {
      name: "Alex Thompson",
      role: "Visionary CEO & Founder",
      image: "/placeholder.svg?height=400&width=400",
      description: "Digital transformation wizard with 12+ years of turning impossible dreams into reality",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      name: "Sarah Chen",
      role: "Chief Technology Oracle",
      image: "/placeholder.svg?height=400&width=400",
      description: "Technical mastermind architecting the future of scalable digital solutions",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Innovation Architect",
      image: "/placeholder.svg?height=400&width=400",
      description: "Full-stack genius crafting extraordinary experiences with cutting-edge frameworks",
      gradient: "from-green-500 to-blue-600",
    },
  ]

  const values = [
    {
      icon: Users,
      title: "Client Obsession",
      description:
        "Your success isn't just our goal—it's our obsession. We go beyond expectations to create digital magic.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Award,
      title: "Excellence Redefined",
      description: "We don't just meet standards—we shatter them. Every project is a masterpiece in the making.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Globe,
      title: "Global Vision",
      description:
        "Four countries, countless cultures, infinite possibilities. We bring global perspective to local dreams.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Target,
      title: "Innovation First",
      description: "We don't follow trends—we create them. Tomorrow's technology, available today.",
      gradient: "from-orange-500 to-red-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Floating Particles */}
        <div className="particles">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/60 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <Header />

      {/* Hero Section */}
      <section ref={sectionRef} className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-lg font-medium mb-10 animate-bounce-in glass-effect">
              <Crown className="h-6 w-6 mr-3 animate-pulse text-yellow-400" />🌟 Meet the Digital Dream Makers
              <Sparkles className="h-6 w-6 ml-3 animate-spin text-purple-400" />
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 animate-fade-in-up">
              About
              <span className="text-gradient animate-shimmer block">DigitronCX</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Where Dreams Become Digital Reality
              </span>
            </h1>

            <p className="text-2xl text-gray-300 mb-12 animate-fade-in-up animation-delay-200 leading-relaxed">
              🚀 We're not just a web development agency—we're digital alchemists transforming visions into
              <span className="text-cyan-400 font-semibold"> extraordinary digital experiences</span> that captivate,
              inspire, and deliver results across four countries.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-8 glass-effect">
                <Rocket className="h-4 w-4 mr-2 animate-bounce" />
                Our Incredible Journey
              </div>

              <h2 className="text-4xl font-bold text-white mb-8">
                <span className="text-gradient">From Vision</span> to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                  {" "}
                  Global Impact
                </span>
              </h2>

              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  🌟 DigitronCX emerged from a simple yet powerful belief: every business deserves a digital presence
                  that's not just functional, but absolutely extraordinary. As a proud subsidiary of Eracus BPO Limited,
                  we've built our foundation on legal excellence and unwavering trust.
                </p>
                <p>
                  🏢 <strong className="text-white">Legally Registered:</strong> NZBN: 9429052521980 | NTN: 8347860
                  <br />📍 <strong className="text-white">Global Presence:</strong> New Zealand HQ with development
                  powerhouses in Auckland and Karachi
                </p>
                <p>
                  🚀 From our headquarters in beautiful New Zealand to our innovation labs across Australia, China, and
                  Pakistan, we've created a 24/7 digital ecosystem that never sleeps, ensuring your dreams are always
                  being crafted into reality.
                </p>
              </div>
            </div>

            <div className="animate-on-scroll animation-delay-200">
              <div className="relative">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <div
                        key={index}
                        className={`bg-gradient-to-br ${stat.gradient} p-8 rounded-3xl text-center hover-lift group relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                        <Icon className="h-12 w-12 text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-4xl font-bold text-white mb-2 group-hover:animate-pulse">
                          {stat.number}
                        </div>
                        <div className="text-white/90 font-medium">{stat.label}</div>
                      </div>
                    )
                  })}
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-float flex items-center justify-center">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-float animation-delay-1000 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-8 glass-effect">
                  <Target className="h-4 w-4 mr-2 animate-pulse" />
                  Our Sacred Mission
                </div>

                <h3 className="text-4xl font-bold text-white mb-8">
                  <span className="text-gradient">Empowering Dreams</span> Through
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                    {" "}
                    Digital Excellence
                  </span>
                </h3>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  🌟 To revolutionize the digital landscape by crafting extraordinary experiences that don't just meet
                  expectations—they shatter them. We believe every click, every scroll, every interaction should spark
                  joy and drive meaningful results.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/5 rounded-2xl p-6 hover-lift">
                    <Target className="h-8 w-8 text-cyan-400 mx-auto mb-3 animate-pulse" />
                    <h4 className="text-white font-bold mb-2">Innovation-Driven</h4>
                    <p className="text-gray-400 text-sm">Tomorrow's solutions, today</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 hover-lift animation-delay-200">
                    <Globe className="h-8 w-8 text-purple-400 mx-auto mb-3 animate-spin" />
                    <h4 className="text-white font-bold mb-2">Global Reach</h4>
                    <p className="text-gray-400 text-sm">Local expertise, worldwide</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 hover-lift animation-delay-400">
                    <Award className="h-8 w-8 text-green-400 mx-auto mb-3 animate-bounce" />
                    <h4 className="text-white font-bold mb-2">Quality First</h4>
                    <p className="text-gray-400 text-sm">Excellence in every pixel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-8 glass-effect">
              <Users className="h-4 w-4 mr-2 animate-pulse" />
              Meet Our Dream Team
            </div>

            <h2 className="text-5xl font-bold text-white mb-8">
              <span className="text-gradient">Brilliant Minds</span> Behind
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                Digital Magic
              </span>
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              🌟 Our passionate team of digital artists, code wizards, and innovation architects work tirelessly to
              bring your wildest digital dreams to life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="animate-on-scroll bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-3 card-hover group relative overflow-hidden"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                ></div>

                <div className="relative z-10">
                  <div
                    className={`w-32 h-32 bg-gradient-to-br ${member.gradient} rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 animate-pulse-glow`}
                  >
                    <Users className="h-16 w-16 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                    {member.name}
                  </h3>

                  <p className="text-cyan-400 font-semibold mb-4 text-lg">{member.role}</p>

                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {member.description}
                  </p>

                  {/* Hover Effect Line */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${member.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-8 glass-effect">
              <Heart className="h-4 w-4 mr-2 animate-pulse" />
              Our Core Values
            </div>

            <h2 className="text-5xl font-bold text-white mb-8">
              <span className="text-gradient">Values That</span> Drive
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
                Digital Excellence
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="animate-on-scroll text-center p-8 bg-white/5 rounded-3xl border border-white/20 hover:bg-white/10 transition-all duration-500 hover:-translate-y-3 card-hover group relative overflow-hidden"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 animate-pulse-glow`}
                    >
                      <Icon className="h-10 w-10 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                      {value.title}
                    </h3>

                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {value.description}
                    </p>

                    {/* Hover Effect Line */}
                    <div
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${value.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full`}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto animate-on-scroll">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-5xl font-bold text-white mb-8">
                  Ready to Create
                  <span className="text-gradient block"> Digital Magic Together?</span>
                </h2>

                <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                  🚀 Let's transform your vision into an extraordinary digital reality that captivates, converts, and
                  conquers your market.
                </p>

                <Button
                  size="lg"
                  className="btn-gradient text-white px-12 py-6 text-xl font-bold rounded-full hover-lift group"
                >
                  <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                  Start Your Digital Journey Today
                  <Sparkles className="ml-3 h-6 w-6 group-hover:animate-spin" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
