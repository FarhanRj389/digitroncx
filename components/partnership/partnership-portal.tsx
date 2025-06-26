"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoginForm } from "./login-form"
import { ApplyNowModal } from "./apply-now-modal"
import { Shield, Users, UserCheck, TrendingUp, Sparkles, Award, Globe } from "lucide-react"

export function PartnershipPortal() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Channel Partnership Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join our exclusive channel partnership program and unlock new opportunities for growth, collaboration, and
            success in the digital world.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Login Form */}
          <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-gray-900">Partner Login</CardTitle>
              <CardDescription className="text-gray-600">Access your partnership dashboard</CardDescription>
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
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition hover:scale-105"
                size="lg"
              >
                <Award className="h-5 w-5 mr-2" />
                Apply Now for Partnership
              </Button>
            </CardContent>
          </Card>

          {/* Partnership Benefits */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Why Partner With Us?</h2>
              <p className="text-gray-600">Discover the exclusive benefits of joining our partnership program</p>
            </div>

            <div className="grid gap-6">
              <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Exclusive Partnerships</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Access to exclusive partnership opportunities and collaborative projects with industry leaders and
                    Fortune 500 companies.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Revenue Growth</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Increase your revenue by up to 300% through our commission structure, referral programs, and
                    performance bonuses.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Dedicated Support</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Get access to dedicated account managers, technical support teams, and 24/7 priority assistance.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Enterprise Security</h3>
                  <p className="text-gray-600 leading-relaxed">
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
