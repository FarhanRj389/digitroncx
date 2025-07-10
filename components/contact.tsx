"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    company: "",
    budget: "",
    timeline: "",
    priority: "",
    platforms: [],
    features: [],
    technicalRequirements: "",
    source: "",
    contactMethod: "",
  })
  const [currentStep, setCurrentStep] = useState(1)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        toast({
          title: 'Message Sent!',
          description: "We'll get back to you within 24 hours.",
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
          company: "",
          budget: "",
          timeline: "",
          priority: "",
          platforms: [],
          features: [],
          technicalRequirements: "",
          source: "",
          contactMethod: "",
        })
        setCurrentStep(1)
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to send message.',
          variant: 'destructive',
        })
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to send message.',
        variant: 'destructive',
      })
    }
  }

  const handleChange = (e: any) => {
    if (Array.isArray(e.target.value)) {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value as string[],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get in touch with our team of experts. We're here to help bring your digital vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-blue-400 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-gray-300">info@digitroncx.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-blue-400 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-gray-300">+64 220 706 330</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-blue-400 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Locations</h4>
                  <p className="text-gray-300">
                    New Zealand (HQ)
                    <br />
                    Australia • China • Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-6 w-6 text-blue-400 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Business Hours</h4>
                  <p className="text-gray-300">
                    Mon - Fri: 9:00 AM - 6:00 PM NZST
                    <br />
                    24/7 Support Available
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Business Information</h4>
              <p className="text-sm text-gray-300">
                DigitronCX - A subsidiary of Eracus BPO Limited
                <br />
                NZBN: 9429052521980
                <br />
                NTN: 8347860
                <br />
                Legally registered in New Zealand
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white text-gray-900 p-8 rounded-2xl">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Send us a Message</h3>
              <p className="text-gray-600">Step {currentStep} of 4 - Tell us about your project needs</p>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step}
                    </div>
                  ))}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input name="name" value={formData.name} onChange={handleChange} required className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input name="phone" value={formData.phone} onChange={handleChange} className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <Input name="company" value={formData.company || ""} onChange={handleChange} className="w-full" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Project Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Service Interest *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a service</option>
                      <option value="website-development">Website Development</option>
                      <option value="ecommerce-website">E-commerce Website</option>
                      <option value="mobile-app">Mobile App Development</option>
                      <option value="web-application">Custom Web Application</option>
                      <option value="startup-branding">Startup Branding Package</option>
                      <option value="seo-services">SEO & Digital Marketing</option>
                      <option value="cloud-solutions">Cloud Solutions</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select budget range</option>
                      <option value="300-1500">$300 - $1,500 NZD</option>
                      <option value="1500-3000">$1,500 - $3,000 NZD</option>
                      <option value="3000-5000">$3,000 - $5,000 NZD</option>
                      <option value="5000-10000">$5,000 - $10,000 NZD</option>
                      <option value="10000-20000">$10,000 - $20,000 NZD</option>
                      <option value="20000+">$20,000+ NZD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Timeline</label>
                    <select
                      name="timeline"
                      value={formData.timeline || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-2weeks">1-2 weeks</option>
                      <option value="1month">1 month</option>
                      <option value="2-3months">2-3 months</option>
                      <option value="3-6months">3-6 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Priority Level</label>
                    <select
                      name="priority"
                      value={formData.priority || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Technical Requirements */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Technical Requirements</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Platforms Needed</label>
                    <div className="space-y-2">
                      {["Web", "iOS", "Android", "Desktop"].map((platform) => (
                        <label key={platform} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.platforms?.includes(platform) || false}
                            onChange={(e) => {
                              const platforms = formData.platforms || []
                              if (e.target.checked) {
                                handleChange({ target: { name: "platforms", value: [...platforms, platform] } })
                              } else {
                                handleChange({
                                  target: { name: "platforms", value: platforms.filter((p) => p !== platform) },
                                })
                              }
                            }}
                            className="mr-2"
                          />
                          {platform}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Key Features</label>
                    <div className="space-y-2">
                      {[
                        "User Authentication",
                        "Payment Integration",
                        "Admin Panel",
                        "API Integration",
                        "Real-time Chat",
                        "Push Notifications",
                      ].map((feature) => (
                        <label key={feature} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.features?.includes(feature) || false}
                            onChange={(e) => {
                              const features = formData.features || []
                              if (e.target.checked) {
                                handleChange({ target: { name: "features", value: [...features, feature] } })
                              } else {
                                handleChange({
                                  target: { name: "features", value: features.filter((f) => f !== feature) },
                                })
                              }
                            }}
                            className="mr-2"
                          />
                          {feature}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Additional Technical Requirements</label>
                  <Textarea
                    name="technicalRequirements"
                    value={formData.technicalRequirements || ""}
                    onChange={handleChange}
                    placeholder="Describe any specific technical requirements, integrations, or features needed..."
                    rows={3}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Project Details & Message */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Project Details & Message</h4>
                <div>
                  <label className="block text-sm font-medium mb-2">Project Description *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full"
                    placeholder="Tell us about your project in detail. What are your goals, target audience, and any specific requirements?"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">How did you hear about us?</label>
                    <select
                      name="source"
                      value={formData.source || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select source</option>
                      <option value="google-search">Google Search</option>
                      <option value="social-media">Social Media</option>
                      <option value="referral">Referral</option>
                      <option value="advertising">Online Advertising</option>
                      <option value="networking">Networking Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Contact Method</label>
                    <select
                      name="contactMethod"
                      value={formData.contactMethod || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select preference</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone Call</option>
                      <option value="video-call">Video Call</option>
                      <option value="in-person">In-Person Meeting</option>
                    </select>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-900 mb-2">What happens next?</h5>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• We'll review your requirements within 24 hours</li>
                    <li>• Our team will prepare a detailed proposal</li>
                    <li>• We'll schedule a consultation call to discuss your project</li>
                    <li>• Get a custom quote tailored to your needs</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="bg-white text-gray-900 border-gray-300"
              >
                ← Previous
              </Button>

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Next →
                </Button>
              ) : (
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Send Message
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
