"use client"

import { useState, useRef } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ChevronLeft, ChevronRight, Upload, Gift, Sparkles, Rocket, Star, Zap, Crown, Diamond } from "lucide-react"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { submitDemoForm } from "@/lib/firebase-db"
import FloatingParticles from "@/components/FloatingParticles"

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Contact Details
    name: "",
    email: "",
    phone: "",
    company: "",
    websiteType: "",
    industry: "",
    pages: "",
    goal: "",
    features: [],
    domain: "",
    socialmedia: "",
    timeline: "",
    // Step 4: File Upload
    files: [],
  })

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    websiteType: '',
    industry: '',
    pages: '',
    goal: '',
    features: '',
    timeline: '',
  });

  const { toast } = useToast()

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleNext = () => {
    if (!validateStep()) return;
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsSubmitting(true)

    try {
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        website_type: formData.websiteType,
        industry: formData.industry,
        pages: formData.pages,
        features: formData.features,
        socialmedia: formData.socialmedia,
        domain: formData.domain,
        timeline: formData.timeline,
        files: uploadedFiles,
      };

      // 1. Save to Firebase
      await submitDemoForm(dataToSend);

      // 2. Send email
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      toast({
        title: "🎉 Application Submitted Successfully!",
        description: "We'll create your stunning demo website and contact you within 48 hours with something amazing!",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        websiteType: "",
        industry: "",
        pages: "",
        goal: "",
        features: [],
        domain: "",
        socialmedia: "",
        timeline: "",
        files: [],
      });
      setUploadedFiles([]);
      setCurrentStep(1);
    } catch (error) {
      console.error('Error submitting demo form:', error);
      toast({ 
        title: "Error", 
        description: "Failed to submit application. Please try again.",
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false)
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setFieldErrors((prev: any) => ({ ...prev, [field]: '' }));
  }

  const handleFilesUpload = async (files: File[]) => {
    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const url = await uploadToCloudinary(files[i]);
        urls.push(url);
      } catch (error) {
        console.error('Error uploading file:', error);
        toast({
          title: "Upload Error",
          description: `Failed to upload ${files[i].name}`,
          variant: 'destructive'
        });
      }
    }
    setUploadedFiles(prev => [...prev, ...urls]);
  };

  const steps = [
    { number: 1, title: "Contact Magic", description: "Tell us about yourself", icon: Star },
    { number: 2, title: "Dream Website", description: "Describe your vision", icon: Rocket },
    { number: 3, title: "Tech Wizardry", description: "Technical preferences", icon: Zap },
    { number: 4, title: "Creative Assets", description: "Upload inspiration", icon: Diamond },
  ]

  const validateEmail = (email: string) => {
    // Accepts any email with a domain (e.g. @gmail.com, @yahoo.com, etc)
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    // Must start with + and have 8-15 digits (country code required)
    return /^\+[0-9]{8,15}$/.test(phone.replace(/\s/g, ''));
  };

  const validateStep = () => {
    let errors: any = {};
    if (currentStep === 1) {
      if (!formData.name) errors.name = 'Name is required.';
      if (!formData.email) {
        errors.email = 'Email is required.';
      } else if (!validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email address with domain (e.g. @gmail.com, @yahoo.com).';
      }
      if (!formData.phone) {
        errors.phone = 'Phone is required.';
      } else if (!validatePhone(formData.phone)) {
        errors.phone = 'Phone must start with country code (e.g. +92...) and contain 8-15 digits.';
      }
      if (!formData.company) errors.company = 'Company/Business Name is required.';
    } else if (currentStep === 2) {
      if (!formData.websiteType) errors.websiteType = 'Website type is required.';
      if (!formData.industry) errors.industry = 'Industry is required.';
      if (!formData.pages) errors.pages = 'Number of pages is required.';
      if (!formData.goal) errors.goal = 'Main goal of website is required.';
      if (!formData.features.length || (Array.isArray(formData.features) && !formData.features[0])) errors.features = 'Please describe your business and what you offer.';
    } else if (currentStep === 3) {
      if (!formData.timeline) errors.timeline = 'Timeline is required.';
    }
    setFieldErrors((prev: any) => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
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
        <section className="pt-32 pb-20 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-5xl mx-auto">
              <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-lg font-medium mb-10 animate-bounce-in glass-effect">
                <Crown className="h-6 w-6 mr-3 animate-pulse text-yellow-400" /> EXCLUSIVE LIMITED OFFER - 100% FREE
                DEMO WEBSITE!
                <Gift className="h-6 w-6 ml-3 animate-bounce text-green-400" />
              </div>

              <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 animate-fade-in-up">
                Get Your
                <span className="text-gradient animate-shimmer block">FREE Dream Website</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                  No Strings Attached!
                </span>
              </h1>

              <p className="text-2xl text-gray-300 mb-12 animate-fade-in-up animation-delay-200 leading-relaxed">
                 Experience our world-class quality with a completely FREE demo website!
                <br />
                <span className="text-green-400 font-semibold">Zero cost, zero commitment</span> - just pure digital magic
                to showcase our incredible capabilities.
              </p>

              {/* Value Propositions */}
              <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in-up animation-delay-400">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover-lift">
                  <Sparkles className="h-8 w-8 text-yellow-400 mx-auto mb-3 animate-spin" />
                  <h3 className="text-xl font-bold text-white mb-2">Professional Design</h3>
                  <p className="text-gray-300">Custom-crafted, pixel-perfect design</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover-lift animation-delay-200">
                  <Rocket className="h-8 w-8 text-blue-400 mx-auto mb-3 animate-bounce" />
                  <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
                  <p className="text-gray-300">Optimized for speed and performance</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover-lift animation-delay-400">
                  <Crown className="h-8 w-8 text-purple-400 mx-auto mb-3 animate-pulse" />
                  <h3 className="text-xl font-bold text-white mb-2">Premium Quality</h3>
                  <p className="text-gray-300">Enterprise-grade development standards</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Step Form */}
        <section className="pb-20 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            {/* Enhanced Progress Steps */}
            <div className="mb-16">
              <div className="flex items-center justify-between relative">
                {/* Progress Line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/20 rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                  />
                </div>

                {steps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div key={step.number} className="flex flex-col items-center relative z-10">
                      <div
                        className={`flex items-center justify-center w-16 h-16 rounded-full border-4 transition-all duration-500 ${
                          currentStep >= step.number
                            ? "bg-gradient-to-r from-green-400 to-blue-500 border-white text-white shadow-lg shadow-blue-500/50"
                            : "border-white/30 text-white/50 bg-white/10"
                        }`}
                      >
                        <Icon className="h-8 w-8" />
                      </div>
                      <div className="mt-4 text-center">
                        <p className={`text-lg font-bold ${currentStep >= step.number ? "text-white" : "text-white/50"}`}>
                          {step.title}
                        </p>
                        <p className={`text-sm ${currentStep >= step.number ? "text-gray-300" : "text-white/30"}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20 relative overflow-hidden">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>

              <div className="relative z-10">
                {/* Step 1: Contact Details */}
                {currentStep === 1 && (
                  <div className="space-y-8 animate-fade-in-up">
                    <div className="text-center mb-8">
                      <h2 className="text-4xl font-bold text-white mb-4"> Let's Get to Know You!</h2>
                      <p className="text-xl text-gray-300">
                        Tell us about yourself so we can create something amazing together
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="block text-lg font-semibold text-white mb-3">Your Amazing Name</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          required
                          className="bg-white/10 border-white/30 text-white placeholder-gray-200 text-lg p-4 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                        {fieldErrors.name && <div className="text-red-400 text-sm mt-1">{fieldErrors.name}</div>}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-lg font-semibold text-white mb-3">Email Address</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                          required
                          className="bg-white/10 border-white/30 text-white placeholder-gray-400 text-lg p-4 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                        {fieldErrors.email && <div className="text-red-400 text-sm mt-1">{fieldErrors.email}</div>}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-lg font-semibold text-white mb-3">Phone Number</label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+64 21 XXX XXXX"
                          className="bg-white/10 border-white/30 text-white placeholder-gray-400 text-lg p-4 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                        {fieldErrors.phone && <div className="text-red-400 text-sm mt-1">{fieldErrors.phone}</div>}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-lg font-semibold text-white mb-3">Company/Business Name</label>
                        <Input
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          placeholder="Your awesome company name"
                          className="bg-white/10 border-white/30 text-white placeholder-gray-400 text-lg p-4 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                        {fieldErrors.company && <div className="text-red-400 text-sm mt-1">{fieldErrors.company}</div>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Website Details */}
                {currentStep === 2 && (
                  <div className="space-y-8 animate-fade-in-up">
                    <div className="text-center mb-8">
                      <h2 className="text-4xl font-bold text-white mb-4"> Your Dream Website Vision</h2>
                      <p className="text-xl text-gray-300">
                        Share your vision and let us bring it to life with stunning design
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="block text-lg font-semibold text-white mb-3">Website Type </label>
                        <select
                          value={formData.websiteType}
                          onChange={(e) => handleInputChange("websiteType", e.target.value)}
                          className="w-full bg-white/10 border-white/30 text-white text-lg p-4 rounded-xl focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="" className="text-gray-900">
                            Select your website type
                          </option>
                          <option value="business" className="text-gray-900">
                            Business Website
                          </option>
                          <option value="ecommerce" className="text-gray-900">
                            E-commerce Store
                          </option>
                          <option value="portfolio" className="text-gray-900">
                            Portfolio Showcase
                          </option>
                          <option value="blog" className="text-gray-900">
                            Blog/Magazine
                          </option>
                          <option value="landing" className="text-gray-900">
                            Landing Page
                          </option>
                          <option value="other" className="text-gray-900">
                            Something Unique
                          </option>
                        </select>
                        {fieldErrors.websiteType && <div className="text-red-400 text-sm mt-1">{fieldErrors.websiteType}</div>}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-lg font-semibold text-white mb-3">Industry </label>
                        <Input
                          value={formData.industry}
                          onChange={(e) => handleInputChange("industry", e.target.value)}
                          placeholder="e.g., Healthcare, Technology, Retail"
                          className="bg-white/10 border-white/30 text-white placeholder-gray-400 text-lg p-4 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                        {fieldErrors.industry && <div className="text-red-400 text-sm mt-1">{fieldErrors.industry}</div>}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-lg font-semibold text-white mb-3">Number of Pages </label>
                        <select
                          value={formData.pages}
                          onChange={(e) => handleInputChange("pages", e.target.value)}
                          className="w-full bg-white/10 border-white/30 text-white text-lg p-4 rounded-xl focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="" className="text-gray-900">
                            Select page count
                          </option>
                          <option value="1-5" className="text-gray-900">
                            1-5 pages (Perfect start)
                          </option>
                          <option value="6-10" className="text-gray-900">
                            6-10 pages (Growing business)
                          </option>
                          <option value="11-20" className="text-gray-900">
                            11-20 pages (Established)
                          </option>
                          <option value="20+" className="text-gray-900">
                            20+ pages (Enterprise)
                          </option>
                        </select>
                        {fieldErrors.pages && <div className="text-red-400 text-sm mt-1">{fieldErrors.pages}</div>}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-lg font-semibold text-white mb-3">Main Goal of Website</label>
                        <select
                          value={formData.goal}
                          onChange={(e) => handleInputChange("goal", e.target.value)}
                          className="w-full bg-white/10 border-white/30 text-white text-lg p-4 rounded-xl focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="" className="text-gray-900">
                            Select the main goal of website
                          </option>
                          <option value="leads" className="text-gray-900">
                          Get Leads / Inquiries
                          </option>
                          <option value="sales" className="text-gray-900">
                          Sell Products / Services
                          </option>
                          <option value="portfolio" className="text-gray-900">
                          Show Portfolio / Work
                          </option>
                          <option value="presence" className="text-gray-900">
                          Build Online Presence
                          </option>
                          <option value="other" className="text-gray-900">
                          Other
                          </option>
                        </select>
                        {fieldErrors.goal && <div className="text-red-400 text-sm mt-1">{fieldErrors.goal}</div>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-lg font-semibold text-white mb-3">Briefly describe your business and what you offer</label>
                      <Textarea
                        value={formData.features.join(", ")}
                        onChange={(e) => handleInputChange("features", e.target.value.split(", "))}
                        placeholder="e.g., Contact forms, Online booking, Payment integration, Blog, Gallery, Live chat"
                        rows={4}
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400 text-lg p-4 rounded-xl focus:ring-2 focus:ring-blue-500"
                      />
                      {fieldErrors.features && <div className="text-red-400 text-sm mt-1">{fieldErrors.features}</div>}
                    </div>
                  </div>
                )}

                {/* Step 3: Technical Requirements */}
                {currentStep === 3 && (
                  <div className="space-y-8 animate-fade-in-up">
                    <div className="text-center mb-8">
                      <h2 className="text-4xl font-bold text-white mb-4"> Technical Magic Preferences</h2>
                      <p className="text-xl text-gray-300">
                        Let us know your technical preferences (or leave it to our experts!)
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* <div className="space-y-2">
                        <label className="block text-lg font-semibold text-white mb-3">Preferred Platform </label>
                        <select
                          value={formData.platform}
                          onChange={(e) => handleInputChange("platform", e.target.value)}
                          className="w-full bg-white/10 border-white/30 text-white text-lg p-4 rounded-xl focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="" className="text-gray-900">
                            Let our experts decide
                          </option>
                          <option value="wordpress" className="text-gray-900">
                            WordPress (User-friendly)
                          </option>
                          <option value="react" className="text-gray-900">
                            React/Next.js (Modern)
                          </option>
                          <option value="shopify" className="text-gray-900">
                            Shopify (E-commerce)
                          </option>
                          <option value="custom" className="text-gray-900">
                            Custom Development
                          </option>
                        </select>
                      </div> */}
                      {/* <div className="space-y-2">
                        <label className="block text-lg font-semibold text-white mb-3">Hosting Preference </label>
                        <select
                          value={formData.hosting}
                          onChange={(e) => handleInputChange("hosting", e.target.value)}
                          className="w-full bg-white/10 border-white/30 text-white text-lg p-4 rounded-xl focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="" className="text-gray-900">
                            Recommend the best option
                          </option>
                          <option value="cloud" className="text-gray-900">
                            Cloud Hosting (AWS/Azure)
                          </option>
                          <option value="shared" className="text-gray-900">
                            Shared Hosting (Budget-friendly)
                          </option>
                          <option value="vps" className="text-gray-900">
                            VPS Hosting (Balanced)
                          </option>
                          <option value="managed" className="text-gray-900">
                            Managed Hosting (Hassle-free)
                          </option>
                        </select>
                      </div> */}
                      <div className="space-y-2">
                        <label className="block text-lg font-semibold text-white mb-3">Websites You Like (URLs) (Optional)</label>
                        <Input
                          value={formData.domain}
                          onChange={(e) => handleInputChange("domain", e.target.value)}
                          placeholder="Do you have a domain? (we can help!)"
                          className="bg-white/10 border-white/30 text-white placeholder-gray-400 text-lg p-4 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-lg font-semibold text-white mb-3">Social Media (URLs) (Optional)</label>
                        <Input
                          value={formData.socialmedia}
                          onChange={(e) => handleInputChange("socialmedia", e.target.value)}
                          placeholder="Do you have a domain? (we can help!)"
                          className="bg-white/10 border-white/30 text-white placeholder-gray-400 text-lg p-4 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                     
                      <div className="space-y-2">
                        <label className="block text-lg font-semibold text-white mb-3">Timeline </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => handleInputChange("timeline", e.target.value)}
                          className="w-full bg-white/10 border-white/30 text-white text-lg p-4 rounded-xl focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="" className="text-gray-900">
                            When do you need it?
                          </option>
                          <option value="asap" className="text-gray-900">
                            ASAP (Rush job)
                          </option>
                          <option value="1-2weeks" className="text-gray-900">
                            1-2 weeks (Quick turnaround)
                          </option>
                          <option value="1month" className="text-gray-900">
                            1 month (Standard)
                          </option>
                          <option value="2-3months" className="text-gray-900">
                            2-3 months (Detailed project)
                          </option>
                          <option value="flexible" className="text-gray-900">
                            Flexible (Quality first)
                          </option>
                        </select>
                        {fieldErrors.timeline && <div className="text-red-400 text-sm mt-1">{fieldErrors.timeline}</div>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: File Upload */}
                {currentStep === 4 && (
                  <div className="space-y-8 animate-fade-in-up">
                    <div className="text-center mb-8">
                      <h2 className="text-4xl font-bold text-white mb-4">Share Your Creative Vision</h2>
                      <p className="text-xl text-gray-300">
                        Upload any inspiration, logos, or materials to help us create your perfect website
                      </p>
                    </div>
                    <div
                      className="border-2 border-dashed border-white/30 rounded-2xl p-12 text-center bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-white/50"
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
                      onDrop={async e => {
                        e.preventDefault();
                        e.stopPropagation();
                        const files = Array.from(e.dataTransfer.files);
                        await handleFilesUpload(files);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <Upload className="h-16 w-16 text-blue-400 mx-auto mb-6 animate-bounce" />
                      <h3 className="text-2xl font-bold text-white mb-4">Drop Your Creative Assets Here</h3>
                      <p className="text-gray-300 mb-6 text-lg">
                        Upload logos, inspiration images, brand guidelines, or any materials that represent your vision.
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.ai,.psd"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={e => handleFilesUpload(Array.from(e.target.files || []))}
                      />
                      <Button
                        type="button"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl"
                        onClick={e => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        Choose Amazing Files
                      </Button>
                      <p className="text-sm text-gray-400 mt-4">
                        Supported: JPG, PNG, PDF, DOC, DOCX, AI, PSD (Max 10MB each)
                      </p>
                      {/* Show previews */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {uploadedFiles.map((url, idx) => (
                          <a key={idx} href={url} target="_blank" rel="noopener noreferrer">
                            <img src={url} alt="Uploaded" className="w-16 h-16 object-cover rounded" />
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 rounded-2xl border border-white/20">
                      <h4 className="font-bold text-white mb-4 text-xl flex items-center">
                        {/* <Sparkles className="h-6 w-6 mr-2 text-yellow-400" /> */}
                        What Happens Next?
                      </h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        <ul className="text-gray-300 space-y-3">
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                            We review your vision within 24 hours
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse animation-delay-200"></div>
                            Our design wizards create your custom demo
                          </li>
                        </ul>
                        <ul className="text-gray-300 space-y-3">
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse animation-delay-400"></div>
                            You receive your demo link within 48 hours
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 animate-pulse animation-delay-600"></div>
                            100% FREE - No payment required ever!
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-12 pt-8 border-t border-white/20">
                  <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-xl disabled:opacity-50"
                  >
                    <ChevronLeft className="h-5 w-5 mr-2" />
                    Previous
                  </Button>

                  {currentStep < 4 ? (
                    <Button
                      onClick={handleNext}
                      className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl hover-lift"
                    >
                      Continue the Magic
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 hover:from-green-600 hover:via-blue-600 hover:to-purple-700 text-white px-12 py-4 text-xl font-bold rounded-xl hover-lift animate-pulse-glow"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <>
                          <Gift className="h-6 w-6 mr-3" />
                          Get My FREE Website!
                          <Sparkles className="h-6 w-6 ml-3 animate-spin" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {error && (
          <div className="text-red-400 text-center mb-4 font-semibold">{error}</div>
        )}

        <Footer />
      </div>
    </>
  )
}
