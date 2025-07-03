"use client"

import { useEffect, useRef } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Services from "@/components/services"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Sparkles,
  Rocket,
  Star,
  Crown,
  Zap,
  Heart,
  Globe,
  Shield,
  Award,
  Target,
  TrendingUp,
  Users,
  Clock,
  Lightbulb,
  Link,
} from "lucide-react"

export default function ServicesPage() {
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

  const benefits = [
    {
      icon: TrendingUp,
      text: "500% average ROI increase for our clients",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: Users,
      text: "Expert team with 50+ years combined experience",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: Globe,
      text: "Serving 4 countries with 24/7 global support",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: Clock,
      text: "Lightning-fast delivery with agile methodology",
      gradient: "from-orange-400 to-red-500",
    },
    {
      icon: Shield,
      text: "Enterprise-grade security and compliance",
      gradient: "from-indigo-400 to-purple-500",
    },
    {
      icon: Award,
      text: "Award-winning designs and development",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: Target,
      text: "100% client satisfaction guarantee",
      gradient: "from-pink-400 to-rose-500",
    },
    {
      icon: Lightbulb,
      text: "Cutting-edge AI and modern tech integration",
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      icon: Heart,
      text: "Passionate about your success and growth",
      gradient: "from-red-400 to-pink-500",
    },
  ]

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description: "Deep dive into your vision, goals, and market to craft the perfect digital strategy.",
      icon: Lightbulb,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      step: "02",
      title: "Design & Prototype",
      description: "Create stunning designs and interactive prototypes that bring your vision to life.",
      icon: Sparkles,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Build with cutting-edge technology and rigorous testing for flawless performance.",
      icon: Zap,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      step: "04",
      title: "Launch & Optimize",
      description: "Deploy your project and continuously optimize for maximum impact and growth.",
      icon: Rocket,
      gradient: "from-orange-500 to-red-500",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart NZ",
      text: "DigitronCX transformed our startup vision into a stunning reality. Our website now converts 300% better!",
      rating: 5,
      gradient: "from-blue-500 to-purple-600",
    },
    {
      name: "Michael Chen",
      company: "Global Retail Corp",
      text: "The mobile app they built revolutionized our customer experience. Sales increased by 250% in 3 months!",
      rating: 5,
      gradient: "from-green-500 to-blue-600",
    },
    {
      name: "Emma Williams",
      company: "Creative Agency AU",
      text: "Their branding package was incredible value. We look like a million-dollar company for just $300!",
      rating: 5,
      gradient: "from-pink-500 to-purple-600",
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
          {[...Array(30)].map((_, i) => (
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
              <Crown className="h-6 w-6 mr-3 animate-pulse text-yellow-400" />Premium Digital Solutions That Deliver
              Results
              <Sparkles className="h-6 w-6 ml-3 animate-spin text-purple-400" />
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 animate-fade-in-up">
              <span className="text-gradient animate-shimmer">Extraordinary</span> Digital
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Solutions & Services
              </span>
            </h1>

            <p className="text-2xl text-gray-300 mb-12 animate-fade-in-up animation-delay-200 leading-relaxed">
              From startup dreams to enterprise excellence - we craft digital masterpieces that
              <span className="text-cyan-400 font-semibold"> captivate audiences, drive conversions,</span> and deliver
              extraordinary results across every touchpoint.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-400 mb-16">
              <Button
                size="lg"
                className="btn-gradient text-white px-12 py-6 text-xl font-bold rounded-full hover-lift group"
              >
                <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                Get Free Consultation
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="glass-effect text-white border-white/30 px-12 py-6 text-xl font-bold rounded-full hover-glow group"
              >
                <Star className="mr-3 h-6 w-6 group-hover:animate-spin" />
                View Our Portfolio
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up animation-delay-600">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover-lift">
                <div className="text-3xl font-bold text-cyan-400 mb-2">40+</div>
                <div className="text-white text-sm">Projects Delivered</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover-lift animation-delay-100">
                <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
                <div className="text-white text-sm">Client Satisfaction</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover-lift animation-delay-200">
                <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
                <div className="text-white text-sm">Global Support</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover-lift animation-delay-300">
                <div className="text-3xl font-bold text-yellow-400 mb-2">4</div>
                <div className="text-white text-sm">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Component */}
      <Services />

      {/* Our Process Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-8 glass-effect">
              <Target className="h-4 w-4 mr-2 animate-pulse" />
              Our Proven Process
            </div>

            <h2 className="text-5xl font-bold text-white mb-8">
              <span className="text-gradient">From Concept</span> to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
                Digital Masterpiece
              </span>
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our battle-tested 4-step process ensures every project exceeds expectations and delivers measurable
              results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={index}
                  className="animate-on-scroll bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-3 card-hover group relative overflow-hidden"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                  ></div>

                  <div className="relative z-10">
                    {/* Step Number */}
                    <div className="text-6xl font-bold text-white/20 mb-4">{step.step}</div>

                    {/* Icon */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 animate-pulse-glow`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                      {step.title}
                    </h3>

                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {step.description}
                    </p>

                    {/* Hover Effect Line */}
                    <div
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${step.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full`}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-8 glass-effect">
              <Award className="h-4 w-4 mr-2 animate-pulse" />
              Why Choose DigitronCX?
            </div>

            <h2 className="text-5xl font-bold text-white mb-8">
              <span className="text-gradient">Unmatched Excellence</span> in
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Every Digital Solution
              </span>
            </h2>

            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
               We don't just deliver projects - we create digital experiences that transform businesses and exceed
              expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  key={index}
                  className="animate-on-scroll flex items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 card-hover group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white font-medium group-hover:text-gradient transition-all duration-300">
                    {benefit.text}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-8 glass-effect">
              <Heart className="h-4 w-4 mr-2 animate-pulse" />
              Client Success Stories
            </div>

            <h2 className="text-5xl font-bold text-white mb-8">
              <span className="text-gradient">Real Results</span> from
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
                Happy Clients
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="animate-on-scroll bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-3 card-hover group relative overflow-hidden"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                ></div>

                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current animate-pulse"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-300 text-lg leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div>
                    <div className="font-bold text-white text-lg group-hover:text-gradient transition-all duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-cyan-400 font-medium">{testimonial.company}</div>
                  </div>

                  {/* Hover Effect Line */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${testimonial.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full`}
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
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-lg rounded-3xl p-16 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-6xl font-bold text-white mb-8">
                  Ready to Transform
                  <span className="text-gradient block"> Your Digital Presence?</span>
                </h2>

                <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
                   Let's create something extraordinary together. Your success story starts with a single click.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button
                    size="lg"
                    className="btn-gradient text-white px-12 py-6 text-xl font-bold rounded-full hover-lift group"
                  >
                    <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                    Start Your Project Today
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                
                  <Button
                    size="lg"
                    variant="outline"
                    className="glass-effect text-white border-white/30 px-12 py-6 text-xl font-bold rounded-full hover-glow group"
                  >
                    <Star className="mr-3 h-6 w-6 group-hover:animate-spin" />
                    Get Free Consultation
                  </Button>
                 
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
