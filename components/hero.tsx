"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Zap, Globe2, Rocket } from "lucide-react"
import FloatingParticles from "@/components/FloatingParticles"
import Link from "next/link"

export default function Hero() {
  const globeRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return

    let rotation = 0
    const animate = () => {
      rotation += 0.5
      globe.style.transform = `rotateY(${rotation}deg) rotateX(${Math.sin(rotation * 0.01) * 5}deg)`
      requestAnimationFrame(animate)
    }
    animate()

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden overflow-x-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        {/* Floating Particles */}
        <FloatingParticles count={20} color="particle" />

        {/* Interactive Light Effect */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-blue-400/20 to-transparent rounded-full pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>
{/* 🚀 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-36 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:pt-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left ">
            <div className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-8 animate-fade-in glass-effect">
              <Sparkles className="h-4 w-4 mr-2 animate-pulse" />New Zealand's Premier Digital Innovation Hub
              <Zap className="h-4 w-4 ml-2 animate-bounce" />
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in-up">
              Transform Your
              <span className="block text-gradient animate-shimmer">Digital Dreams</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Into Reality
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-10 max-w-2xl animate-fade-in-up animation-delay-200 leading-relaxed">
              Crafting extraordinary digital experiences with cutting-edge technology. From stunning websites to
              powerful mobile apps - we bring your vision to life with
              <span className="text-cyan-400 font-semibold"> innovation, creativity, and excellence</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-fade-in-up animation-delay-400 mb-12">
              <Link href="/demo">
              <Button
                size="lg"
                className="btn-gradient text-white px-10 py-6 text-lg font-semibold rounded-full hover-lift group"
                >
                <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                Get Your Free Demo
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
                </Link>
              <Button
                size="lg"
                variant="outline"
                className="glass-effect text-white border-white/30 px-10 py-6 text-lg font-semibold rounded-full hover-glow group"
              >
                <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Watch Our Story
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 animate-fade-in-up animation-delay-600 text-center">
              <div className="text-center group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                40+
                </div>
                <div className="text-gray-400 text-sm">Projects Delivered</div>
                <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  4
                </div>
                <div className="text-gray-400 text-sm">Countries Served</div>
                <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                  24/7
                </div>
                <div className="text-gray-400 text-sm">Expert Support</div>
                <div className="w-full h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Globe Animation */}
          <div className="hidden lg:flex justify-center lg:justify-end mt-10 lg:mt-0">
            <div className="relative w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] animate-fade-in animation-delay-800">
              {/* Orbital Rings */}
              <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-rotate"></div>
              <div
                className="absolute inset-4 border border-purple-400/20 rounded-full animate-rotate"
                style={{ animationDirection: "reverse", animationDuration: "15s" }}
              ></div>
              <div
                className="absolute inset-8 border border-pink-400/10 rounded-full animate-rotate"
                style={{ animationDuration: "25s" }}
              ></div>

              {/* Main Globe */}
              <div
                ref={globeRef}
                className="absolute inset-12 rounded-full bg-gradient-to-br from-blue-400 via-blue-600 to-purple-700 shadow-2xl relative overflow-hidden animate-pulse-glow"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Globe Grid Lines */}
                <div className="absolute inset-0 opacity-40">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute border-white/30"
                      style={{
                        left: "50%",
                        top: "0",
                        width: "1px",
                        height: "100%",
                        transform: `translateX(-50%) rotateZ(${i * 15}deg)`,
                        borderLeft: "1px solid currentColor",
                      }}
                    />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute border-white/30 rounded-full"
                      style={{
                        left: "50%",
                        top: "50%",
                        width: `${(i + 1) * 40}px`,
                        height: `${(i + 1) * 40}px`,
                        transform: "translate(-50%, -50%)",
                        border: "1px solid currentColor",
                      }}
                    />
                  ))}
                </div>

                {/* Continents with Glow */}
                <div className="absolute top-1/4 left-1/3 w-12 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg opacity-90 animate-pulse"></div>
                <div className="absolute top-1/2 right-1/4 w-8 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg opacity-90 animate-pulse animation-delay-1000"></div>
                <div className="absolute bottom-1/3 left-1/2 w-14 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg opacity-90 animate-pulse animation-delay-2000"></div>

                {/* Inner Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>

                {/* Outer Glow */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-xl"></div>
              </div>

              {/* Floating Tech Icons */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-float flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-float animation-delay-1000 flex items-center justify-center">
                <Globe2 className="h-6 w-6 text-white" />
              </div>
              <div className="absolute top-1/2 -left-12 w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full animate-float animation-delay-2000 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="absolute top-1/4 -right-6 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-float animation-delay-3000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
