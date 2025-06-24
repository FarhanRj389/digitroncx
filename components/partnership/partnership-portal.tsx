"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoginForm } from "./login-form"
import { ApplyNowModal } from "./apply-now-modal"
import { Shield, Users, UserCheck, TrendingUp, Sparkles, Award, Globe, Crown, DollarSign, Heart, Rocket, Handshake, Target } from "lucide-react"
import {
  Lock
} from "lucide-react"
export function PartnershipPortal() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const partnerStats = [
    { number: "150+", label: "Active Partners", icon: Users, gradient: "from-blue-400 to-cyan-500" },
    { number: "$2M+", label: "Partner Earnings", icon: DollarSign, gradient: "from-green-400 to-emerald-500" },
    { number: "500+", label: "Joint Projects", icon: Rocket, gradient: "from-purple-400 to-pink-500" },
    { number: "98%", label: "Partner Satisfaction", icon: Heart, gradient: "from-red-400 to-pink-500" },
  ]
  const partnerBenefits = [
    {
      icon: DollarSign,
      title: "Lucrative Commission Structure",
      description: "Earn up to 30% commission on every successful project referral",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Handshake,
      title: "Exclusive Partnership Support",
      description: "Dedicated account manager and priority technical support",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Award,
      title: "Co-Branding Opportunities",
      description: "Joint marketing materials and co-branded project presentations",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Target,
      title: "Lead Generation Tools",
      description: "Advanced CRM access and lead tracking dashboard",
      gradient: "from-orange-500 to-red-500",
    },
  ]

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br bg-gradient-to-r from-slate-900 via-blue-950 to-purple-900 pt-40 pb-20">
      
      <div className="container  mx-auto px-4 ">
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

    
      
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-lg font-medium mb-10 animate-bounce-in glass-effect">
          <Crown className="h-6 w-6 mr-3 animate-pulse text-yellow-400" />🤝 Exclusive Channel Partnership Portal
          <Sparkles className="h-6 w-6 ml-3 animate-spin text-purple-400" />
        </div>

        <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 animate-fade-in-up">
          Partner
          <span className="text-gradient animate-shimmer block">Portal</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-600">
            Unlock Success Together
          </span>
        </h1>

        <p className="text-2xl text-gray-300 mb-12 animate-fade-in-up animation-delay-200 leading-relaxed">
          🚀 Join our exclusive partner network and unlock
          <span className="text-purple-400 font-semibold"> lucrative opportunities</span> with secure access to
          manage client projects, track commissions, and access premium resources.
        </p>

        {/* Partner Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-fade-in-up animation-delay-400">
          {partnerBenefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={index}
                className="animate-on-scroll bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-3 card-hover group relative overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                ></div>

                <div className="relative z-10 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 animate-pulse-glow`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                    {benefit.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {benefit.description}
                  </p>

                  {/* Hover Effect Line */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${benefit.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full`}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Partner Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up animation-delay-600">
          {partnerStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover-lift group"
              >
                <Icon
                  className={`h-8 w-8 mx-auto mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
                />
                <div className="text-3xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            )
          })}
        </div>
        
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Login Form */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl hover-lift">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <Lock  className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl text-white">🔐 Partner Login</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Enter your credentials to access the exclusive partner dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <LoginForm />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">New to DigitronCX?</span>
                </div>
              </div>

              <Button
                onClick={() => setIsApplyModalOpen(true)}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white  font-semibold py-3 rounded-lg shadow-lg transform transition hover-lift"
                size="lg"
              >
                <Award className="h-5 w-5 mr-2" />
                Apply Now for Partnership
                <Handshake className="h-6 w-6 mr-3" />
              </Button>
            </CardContent>
          </Card>

          {/* Partnership Benefits */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Why Partner With Us?</h2>
              <p className="text-gray-300">Discover the exclusive benefits of joining our partnership program</p>
            </div>

            <div className="grid gap-6">
              <div className="flex items-start space-x-4 p-6 bg-white/10 backdrop-blur-lg  rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 text-lg">Exclusive Partnerships</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Access to exclusive partnership opportunities and collaborative projects with industry leaders and
                    Fortune 500 companies.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 text-lg">Revenue Growth</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Increase your revenue by up to 300% through our commission structure, referral programs, and
                    performance bonuses.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 text-lg">Dedicated Support</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Get access to dedicated account managers, technical support teams, and 24/7 priority assistance.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 text-lg">Enterprise Security</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Enterprise-grade security, compliance certifications, and data protection for all partnership
                    activities.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white shadow-lg">
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-blue-100">Active Partners</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl text-white shadow-lg">
                <div className="text-3xl font-bold mb-1">$2M+</div>
                <div className="text-green-100">Partner Revenue</div>
              </div>
            </div>

            <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="h-8 w-8" />
                  <h3 className="text-2xl font-bold">Global Opportunity</h3>
                </div>
                <p className="mb-6 opacity-90 text-lg leading-relaxed">
                  Join hundreds of partners who are already growing their business with DigitronCX across 50+ countries
                  worldwide.
                </p>
                <div className="text-sm opacity-75 bg-white/10 rounded-lg p-4">
                  <div className="font-semibold mb-2">Demo Credentials:</div>
                  <div>Admin: admin@digitroncx.com / admin123</div>
                  <div>Client: client@example.com / client123</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ApplyNowModal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} />
    </div>
  )
}
