"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import {
  Users,
  FileText,
  Eye,
  Lock,
  Plus,
  LogOut,
  BarChart3,
  Settings,
  User,
  Sparkles,
  Rocket,
  Star,
  Crown,
  Heart,
  Award,
  Target,
  DollarSign,
  Handshake,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from '@/lib/supabase';

// Mock partner data with your specified credentials
const mockPartners = [
  { id: 1, username: "digitconp1", password: "digitron12345!", name: "DigitronCX Admin", role: "admin" },
  { id: 2, username: "partner1", password: "pass123", name: "TechCorp Solutions", role: "partner" },
  { id: 3, username: "partner2", password: "pass456", name: "Digital Innovations Ltd", role: "partner" },
]

const mockFiles = [
  { id: 1, name: "Client Requirements.docx", type: "document", size: "2.4 MB", date: "2024-01-15", partnerId: null },
  { id: 2, name: "Project Timeline.xlsx", type: "spreadsheet", size: "1.8 MB", date: "2024-01-14", partnerId: 2 },
  { id: 3, name: "Brand Guidelines.pdf", type: "pdf", size: "5.2 MB", date: "2024-01-13", partnerId: 3 },
  {
    id: 4,
    name: "Technical Specifications.docx",
    type: "document",
    size: "3.1 MB",
    date: "2024-01-12",
    partnerId: null,
  },
]

const mockSubmissions = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    company: "ABC Corp",
    service: "Web Development",
    date: "2024-01-15",
    status: "New",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    company: "XYZ Ltd",
    service: "Mobile App",
    date: "2024-01-14",
    status: "In Progress",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    company: "Tech Startup",
    service: "Branding",
    date: "2024-01-13",
    status: "Completed",
  },
]

const mockLeads = [
  {
    id: 1,
    clientName: "Sarah Wilson",
    company: "Tech Innovations Ltd",
    email: "sarah@techinnovations.com",
    phone: "+64 21 123 4567",
    projectType: "E-commerce Website",
    budget: "$5,000 - $10,000 NZD",
    timeline: "2-3 months",
    status: "Hot Lead",
    source: "Referral",
    notes: "Looking for complete e-commerce solution with payment integration",
    submittedBy: "partner1",
    date: "2024-01-16",
  },
  {
    id: 2,
    clientName: "Michael Chen",
    company: "StartupXYZ",
    email: "mike@startupxyz.com",
    phone: "+64 21 987 6543",
    projectType: "Mobile App",
    budget: "$15,000+ NZD",
    timeline: "3-4 months",
    status: "Warm Lead",
    source: "Website",
    notes: "iOS and Android app for food delivery service",
    submittedBy: "partner2",
    date: "2024-01-15",
  },
]

export default function PartnershipPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [partners, setPartners] = useState(mockPartners)
  const [leads, setLeads] = useState(mockLeads)
  const [showCreatePartner, setShowCreatePartner] = useState(false)
  const [newPartner, setNewPartner] = useState({ username: "", password: "", name: "", role: "partner" })
  const [editingPartner, setEditingPartner] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showClientForm, setShowClientForm] = useState(false)
  const [currentFormStep, setCurrentFormStep] = useState(1)
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [showPartnershipForm, setShowPartnershipForm] = useState(false)
  const [partnershipApplications, setPartnershipApplications] = useState([
    {
      id: 1,
      personalInfo: {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@techcorp.com",
        phone: "+64 21 123 4567",
        position: "Business Development Manager",
        experience: "5+ years",
      },
      businessInfo: {
        companyName: "TechCorp Solutions",
        website: "https://techcorp.com",
        industry: "Technology",
        companySize: "50-100 employees",
        location: "Auckland, New Zealand",
        registrationNumber: "NZBN123456789",
      },
      partnershipInfo: {
        partnershipType: "Referral Partner",
        expectedVolume: "5-10 projects per month",
        targetMarkets: ["Small Business", "Startups"],
        experience: "We have 5 years of experience in business development",
        motivation: "Looking to expand our service offerings to clients",
      },
      servicesOffered: ["Lead Generation", "Client Consultation", "Project Management", "Marketing Support"],
      status: "Pending Review",
      submittedDate: "2024-01-15",
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      personalInfo: {
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah@digitalinnovations.com",
        phone: "+64 21 987 6543",
        position: "CEO",
        experience: "10+ years",
      },
      businessInfo: {
        companyName: "Digital Innovations Ltd",
        website: "https://digitalinnovations.com",
        industry: "Digital Marketing",
        companySize: "20-50 employees",
        location: "Wellington, New Zealand",
        registrationNumber: "NZBN987654321",
      },
      partnershipInfo: {
        partnershipType: "Reseller Partner",
        expectedVolume: "10-20 projects per month",
        targetMarkets: ["Enterprise", "Mid-Market"],
        experience: "10 years in digital marketing and web development",
        motivation: "Want to offer comprehensive digital solutions to our clients",
      },
      servicesOffered: [
        "Sales & Marketing",
        "Client Relationship Management",
        "Technical Consultation",
        "After-sales Support",
      ],
      status: "Approved",
      submittedDate: "2024-01-10",
      lastUpdated: "2024-01-12",
    },
  ])

  const [partnershipFormData, setPartnershipFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
    },
    businessInfo: {
      companyName: "",
      website: "",
      industry: "",
      companySize: "",
      location: "",
      registrationNumber: "",
    },
    partnershipInfo: {
      partnershipType: "",
      expectedVolume: "",
      targetMarkets: [],
      experience: "",
      motivation: "",
    },
    servicesOffered: [],
  })

  const [editingApplication, setEditingApplication] = useState(null)
  const [currentPartnershipStep, setCurrentPartnershipStep] = useState(1)
  const [editingLead, setEditingLead] = useState(null)

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

  // Client form data
  const [clientFormData, setClientFormData] = useState({
    // Step 1: Client Information
    clientName: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    website: "",

    // Step 2: Project Details
    projectType: "",
    projectDescription: "",
    budget: "",
    timeline: "",
    priority: "",

    // Step 3: Technical Requirements
    platforms: [],
    features: [],
    integrations: [],
    hosting: "",

    // Step 4: Business Information
    industry: "",
    targetAudience: "",
    competitors: "",
    goals: "",

    // Step 5: Additional Information
    source: "",
    notes: "",
    followUpDate: "",
    status: "New Lead",
  })

  const { toast } = useToast()

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

  const partnerStats = [
    { number: "150+", label: "Active Partners", icon: Users, gradient: "from-blue-400 to-cyan-500" },
    { number: "$2M+", label: "Partner Earnings", icon: DollarSign, gradient: "from-green-400 to-emerald-500" },
    { number: "500+", label: "Joint Projects", icon: Rocket, gradient: "from-purple-400 to-pink-500" },
    { number: "98%", label: "Partner Satisfaction", icon: Heart, gradient: "from-red-400 to-pink-500" },
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const partner = partners.find((p) => p.username === loginData.username && p.password === loginData.password)

    if (partner) {
      setIsLoggedIn(true)
      setCurrentUser(partner)
      toast({
        title: "🎉 Login Successful!",
        description: `Welcome back, ${partner.name}! Ready to create digital magic?`,
      })
    } else {
      toast({
        title: "❌ Login Failed",
        description: "Invalid credentials. Please check your username and password.",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setLoginData({ username: "", password: "" })
    setActiveTab("dashboard")
    setShowClientForm(false)
    setCurrentFormStep(1)
    toast({
      title: "👋 Logged Out Successfully",
      description: "Thank you for using our partner portal. See you soon!",
    })
  }

  const handleCreatePartner = (e: React.FormEvent) => {
    e.preventDefault()

    if (partners.some((p) => p.username === newPartner.username)) {
      toast({
        title: "❌ Username Exists",
        description: "This username is already taken. Please choose another one.",
        variant: "destructive",
      })
      return
    }

    const partner = {
      id: Math.max(...partners.map((p) => p.id)) + 1,
      ...newPartner,
    }

    setPartners([...partners, partner])
    setNewPartner({ username: "", password: "", name: "", role: "partner" })
    setShowCreatePartner(false)

    toast({
      title: "🎉 Partner Created Successfully!",
      description: `Welcome ${partner.name} to our partner network!`,
    })
  }

  const handleEditPartner = (partner: any) => {
    setEditingPartner({ ...partner })
  }

  const handleUpdatePartner = (e: React.FormEvent) => {
    e.preventDefault()

    setPartners(partners.map((p) => (p.id === editingPartner.id ? editingPartner : p)))
    setEditingPartner(null)

    toast({
      title: "✅ Partner Updated",
      description: "Partner information has been updated successfully.",
    })
  }

  const handleDeletePartner = (partnerId: number) => {
    if (partnerId === currentUser.id) {
      toast({
        title: "⚠️ Cannot Delete",
        description: "You cannot delete your own account.",
        variant: "destructive",
      })
      return
    }

    setPartners(partners.filter((p) => p.id !== partnerId))
    toast({
      title: "🗑️ Partner Deleted",
      description: "Partner has been removed from the system.",
    })
  }

  const handleDownload = (fileName: string) => {
    toast({
      title: "📥 Download Started",
      description: `Downloading ${fileName}...`,
    })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        type:
          file.type.includes("sheet") || file.name.includes(".xlsx") || file.name.includes(".xls")
            ? "spreadsheet"
            : file.type.includes("document") || file.name.includes(".docx") || file.name.includes(".doc")
              ? "document"
              : "file",
        date: new Date().toISOString().split("T")[0],
        file: file,
      }))

      setUploadedFiles([...uploadedFiles, ...newFiles])
      toast({
        title: "📁 Files Uploaded Successfully!",
        description: `${newFiles.length} file(s) uploaded and ready to use.`,
      })
    }
  }

  const handleClientFormSubmit = () => {
    const newLead = {
      id: Math.max(...leads.map((l) => l.id)) + 1,
      clientName: clientFormData.clientName,
      company: clientFormData.company,
      email: clientFormData.email,
      phone: clientFormData.phone,
      projectType: clientFormData.projectType,
      budget: clientFormData.budget,
      timeline: clientFormData.timeline,
      status: clientFormData.status,
      source: clientFormData.source,
      notes: clientFormData.notes,
      submittedBy: currentUser.username,
      date: new Date().toISOString().split("T")[0],
    }

    setLeads([...leads, newLead])
    setShowClientForm(false)
    setCurrentFormStep(1)
    setClientFormData({
      clientName: "",
      company: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      projectType: "",
      projectDescription: "",
      budget: "",
      timeline: "",
      priority: "",
      platforms: [],
      features: [],
      integrations: [],
      hosting: "",
      industry: "",
      targetAudience: "",
      competitors: "",
      goals: "",
      source: "",
      notes: "",
      followUpDate: "",
      status: "New Lead",
    })

    toast({
      title: "🎉 Lead Submitted Successfully!",
      description: "Client information has been saved and our team will follow up soon.",
    })
  }

  const exportUserData = () => {
    const data = {
      partners: partners.filter((p) => p.role !== "admin"),
      submissions: mockSubmissions,
      files: mockFiles,
      leads: leads,
      uploadedFiles: uploadedFiles.map((f) => ({ ...f, file: undefined })), // Remove file object for export
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "partner-data.json"
    a.click()

    toast({
      title: "📊 Data Exported Successfully!",
      description: "All partner data has been exported to JSON format.",
    })
  }

  const exportLeadsToExcel = () => {
    // Create CSV content
    const headers = [
      "Client Name",
      "Company",
      "Email",
      "Phone",
      "Project Type",
      "Budget",
      "Timeline",
      "Status",
      "Source",
      "Submitted By",
      "Date",
    ]
    const csvContent = [
      headers.join(","),
      ...leads.map((lead) =>
        [
          lead.clientName,
          lead.company,
          lead.email,
          lead.phone,
          lead.projectType,
          lead.budget,
          lead.timeline,
          lead.status,
          lead.source,
          lead.submittedBy,
          lead.date,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "leads-export.csv"
    a.click()

    toast({
      title: "📈 Leads Exported to Excel!",
      description: "Lead data has been exported to CSV format successfully.",
    })
  }

  const handlePartnershipFormSubmit = async () => {
    // Prepare data for Supabase
    const data = {
      firstName: partnershipFormData.personalInfo.firstName,
      lastName: partnershipFormData.personalInfo.lastName,
      email: partnershipFormData.personalInfo.email,
      phone: partnershipFormData.personalInfo.phone,
      position: partnershipFormData.personalInfo.position,
      experience: partnershipFormData.personalInfo.experience,
      companyName: partnershipFormData.businessInfo.companyName,
      website: partnershipFormData.businessInfo.website,
      industry: partnershipFormData.businessInfo.industry,
      companySize: partnershipFormData.businessInfo.companySize,
      location: partnershipFormData.businessInfo.location,
      registrationNumber: partnershipFormData.businessInfo.registrationNumber,
      partnershipType: partnershipFormData.partnershipInfo.partnershipType,
      expectedVolume: partnershipFormData.partnershipInfo.expectedVolume,
      targetMarkets: Array.isArray(partnershipFormData.partnershipInfo.targetMarkets) ? partnershipFormData.partnershipInfo.targetMarkets.join(',') : partnershipFormData.partnershipInfo.targetMarkets,
      experienceDetails: partnershipFormData.partnershipInfo.experience,
      motivation: partnershipFormData.partnershipInfo.motivation,
      servicesOffered: Array.isArray(partnershipFormData.servicesOffered) ? partnershipFormData.servicesOffered.join(',') : partnershipFormData.servicesOffered,
      status: 'Pending Review',
      submittedDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    const { error } = await supabase
      .from('partnership_applications')
      .insert([data]);

    if (error) {
      toast({
        title: '❌ Submission Failed',
        description: 'There was an error submitting your application. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    setShowPartnershipForm(false);
    setCurrentPartnershipStep(1);
    setPartnershipFormData({
      personalInfo: { firstName: '', lastName: '', email: '', phone: '', position: '', experience: '' },
      businessInfo: { companyName: '', website: '', industry: '', companySize: '', location: '', registrationNumber: '' },
      partnershipInfo: { partnershipType: '', expectedVolume: '', targetMarkets: [], experience: '', motivation: '' },
      servicesOffered: [],
    });
    toast({
      title: '🎉 Partnership Application Submitted!',
      description: "Thank you for your interest! We'll review your application and get back to you within 48 hours.",
    });
  };

  const handleUpdateApplication = (applicationId, updatedData) => {
    setPartnershipApplications(
      partnershipApplications.map((app) =>
        app.id === applicationId
          ? { ...app, ...updatedData, lastUpdated: new Date().toISOString().split("T")[0] }
          : app,
      ),
    )
    setEditingApplication(null)
    toast({
      title: "✅ Application Updated",
      description: "Partnership application has been updated successfully.",
    })
  }

  const handleDeleteApplication = (applicationId) => {
    setPartnershipApplications(partnershipApplications.filter((app) => app.id !== applicationId))
    toast({
      title: "🗑️ Application Deleted",
      description: "Partnership application has been removed successfully.",
    })
  }

  const handleUpdateLead = (leadId, updatedData) => {
    setLeads(leads.map((lead) => (lead.id === leadId ? { ...lead, ...updatedData } : lead)))
    setEditingLead(null)
    toast({
      title: "✅ Lead Updated Successfully!",
      description: "Client lead information has been updated.",
    })
  }

  const handleDeleteLead = (leadId) => {
    setLeads(leads.filter((lead) => lead.id !== leadId))
    toast({
      title: "🗑️ Lead Deleted Successfully!",
      description: "Client lead has been removed from the system.",
    })
  }

  // If logged in, show full dashboard layout
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        {/* Dashboard Header */}
        <header className="bg-slate-900/95 backdrop-blur-md shadow-2xl border-b border-white/10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse-glow">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    {currentUser.role === "admin" ? "🔧 Admin Command Center" : "🚀 Partner Portal"}
                  </h1>
                  <p className="text-cyan-400 font-medium">Welcome back, {currentUser.name} ✨</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setShowClientForm(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl hover-lift"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Client Lead
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold px-6 py-3 rounded-xl"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Enhanced Sidebar Navigation */}
          <nav className="w-72 bg-slate-900/50 backdrop-blur-sm min-h-screen border-r border-white/10">
            <div className="p-6">
              <div className="space-y-3">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center px-6 py-4 text-left rounded-2xl transition-all duration-300 font-medium ${
                    activeTab === "dashboard"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <BarChart3 className="h-6 w-6 mr-4" />
                  Dashboard
                </button>

                <button
                  onClick={() => setActiveTab("leads")}
                  className={`w-full flex items-center px-6 py-4 text-left rounded-2xl transition-all duration-300 font-medium ${
                    activeTab === "leads"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <User className="h-6 w-6 mr-4" />
                  Client Leads
                  <span className="ml-auto bg-green-500 text-white text-xs px-2 py-1 rounded-full">{leads.length}</span>
                </button>

                <button
                  onClick={() => setActiveTab("files")}
                  className={`w-full flex items-center px-6 py-4 text-left rounded-2xl transition-all duration-300 font-medium ${
                    activeTab === "files"
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <FileText className="h-6 w-6 mr-4" />
                  Files & Documents
                </button>

                {currentUser.role === "admin" && (
                  <>
                    <button
                      onClick={() => setActiveTab("partners")}
                      className={`w-full flex items-center px-6 py-4 text-left rounded-2xl transition-all duration-300 font-medium ${
                        activeTab === "partners"
                          ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Users className="h-6 w-6 mr-4" />
                      Partner Management
                    </button>

                    <button
                      onClick={() => setActiveTab("submissions")}
                      className={`w-full flex items-center px-6 py-4 text-left rounded-2xl transition-all duration-300 font-medium ${
                        activeTab === "submissions"
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Eye className="h-6 w-6 mr-4" />
                      User Submissions
                    </button>

                    <button
                      onClick={() => setActiveTab("settings")}
                      className={`w-full flex items-center px-6 py-4 text-left rounded-2xl transition-all duration-300 font-medium ${
                        activeTab === "settings"
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Settings className="h-6 w-6 mr-4" />
                      Settings
                    </button>
                    <button
                      onClick={() => setActiveTab("applications")}
                      className={`w-full flex items-center px-6 py-4 text-left rounded-2xl transition-all duration-300 font-medium ${
                        activeTab === "applications"
                          ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Handshake className="h-6 w-6 mr-4" />
                      Partnership Applications
                      <span className="ml-auto bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                        {partnershipApplications.length}
                      </span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>

          {/* Main Content with enhanced styling */}
          <main className="flex-1 p-8 bg-gradient-to-br from-slate-900/50 to-blue-900/30">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2">📊 Dashboard Overview</h2>
                  <p className="text-gray-300 text-lg">Your partnership performance at a glance</p>
                </div>

                {/* Enhanced Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6">
                  <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border-white/20 hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-white">{leads.length}</p>
                          <p className="text-gray-300">Total Leads</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border-white/20 hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-white">{mockFiles.length + uploadedFiles.length}</p>
                          <p className="text-gray-300">Total Files</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-white/20 hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-white">
                            {partners.filter((p) => p.role === "partner").length}
                          </p>
                          <p className="text-gray-300">Active Partners</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm border-white/20 hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                          <Eye className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-white">{mockSubmissions.length}</p>
                          <p className="text-gray-300">Submissions</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Leads with enhanced styling */}
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center">
                      <Star className="h-6 w-6 mr-3 text-yellow-400" />
                      Recent Leads
                    </CardTitle>
                    <CardDescription className="text-gray-300">Latest client leads and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leads.slice(0, 5).map((lead) => (
                        <div
                          key={lead.id}
                          className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover-lift"
                        >
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                              <User className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold text-white text-lg">{lead.clientName}</h4>
                              <p className="text-gray-300">
                                {lead.company} • {lead.projectType}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span
                              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                lead.status === "Hot Lead"
                                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                                  : lead.status === "Warm Lead"
                                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                                    : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                              }`}
                            >
                              {lead.status}
                            </span>
                            <p className="text-gray-400 text-sm mt-2">{lead.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Other tabs remain the same but with enhanced styling... */}
            {/* I'll continue with the remaining tabs in the same enhanced style */}
            {/* Leads Tab */}
            {activeTab === "leads" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-2 flex items-center">
                      <User className="h-10 w-10 mr-4 text-green-400" />
                      Client Leads
                    </h2>
                    <p className="text-gray-300 text-lg">Manage your client leads and track their progress</p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={exportLeadsToExcel}
                      variant="outline"
                      className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Export to Excel
                    </Button>
                    <Button
                      onClick={() => setShowClientForm(true)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Lead
                    </Button>
                  </div>
                </div>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center">
                      <Star className="h-6 w-6 mr-3 text-yellow-400" />
                      All Client Leads
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Manage and track all client leads and opportunities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-white/20">
                        <thead>
                          <tr>
                            <th className="p-4 text-left text-gray-300 font-semibold">Client</th>
                            <th className="p-4 text-left text-gray-300 font-semibold">Company</th>
                            <th className="p-4 text-left text-gray-300 font-semibold">Contact</th>
                            <th className="p-4 text-left text-gray-300 font-semibold">Project</th>
                            <th className="p-4 text-left text-gray-300 font-semibold">Budget</th>
                            <th className="p-4 text-left text-gray-300 font-semibold">Status</th>
                            <th className="p-4 text-left text-gray-300 font-semibold">Date</th>
                            <th className="p-4 text-left text-gray-300 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leads.map((lead) => (
                            <tr
                              key={lead.id}
                              className="hover:bg-white/5 transition-colors duration-300 border-b border-white/10"
                            >
                              <td className="p-4">
                                <div>
                                  <p className="font-medium text-white">{lead.clientName}</p>
                                  <p className="text-sm text-gray-400">by {lead.submittedBy}</p>
                                </div>
                              </td>
                              <td className="p-4 text-gray-300">{lead.company}</td>
                              <td className="p-4">
                                <div className="text-sm">
                                  <p className="text-gray-300">{lead.email}</p>
                                  <p className="text-gray-400">{lead.phone}</p>
                                </div>
                              </td>
                              <td className="p-4">
                                <div>
                                  <p className="font-medium text-white">{lead.projectType}</p>
                                  <p className="text-sm text-gray-400">{lead.timeline}</p>
                                </div>
                              </td>
                              <td className="p-4 text-gray-300">{lead.budget}</td>
                              <td className="p-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    lead.status === "Hot Lead"
                                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                                      : lead.status === "Warm Lead"
                                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                                        : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                                  }`}
                                >
                                  {lead.status}
                                </span>
                              </td>
                              <td className="p-4 text-gray-300">{lead.date}</td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => setEditingLead(lead)}
                                    size="sm"
                                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    onClick={() => handleDeleteLead(lead.id)}
                                    size="sm"
                                    variant="outline"
                                    className="bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Files Tab */}
            {activeTab === "files" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2 flex items-center">
                    <FileText className="h-10 w-10 mr-4 text-purple-400" />
                    Files & Documents
                  </h2>
                  <p className="text-gray-300 text-lg">Manage your files and documents</p>
                </div>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center">
                      <Star className="h-6 w-6 mr-3 text-yellow-400" />
                      All Files
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Manage files and documents and track their status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-xl hover-lift"
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Upload Files
                          <input
                            id="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={handleFileUpload}
                          />
                        </label>
                        <p className="text-gray-300">Total Files: {mockFiles.length + uploadedFiles.length}</p>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...mockFiles, ...uploadedFiles].map((file) => (
                          <div
                            key={file.id}
                            className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                {file.type === "document" ? (
                                  <FileText className="h-6 w-6 mr-3 text-blue-400" />
                                ) : file.type === "spreadsheet" ? (
                                  <FileText className="h-6 w-6 mr-3 text-green-400" />
                                ) : (
                                  <FileText className="h-6 w-6 mr-3 text-gray-400" />
                                )}
                                <div>
                                  <h4 className="font-bold text-white">{file.name}</h4>
                                  <p className="text-gray-300 text-sm">{file.size}</p>
                                </div>
                              </div>
                              <Button
                                onClick={() => handleDownload(file.name)}
                                size="sm"
                                variant="outline"
                                className="bg-white/10 text-white border-white/30"
                              >
                                Download
                              </Button>
                            </div>
                            <p className="text-gray-400 text-sm">Uploaded: {file.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Partner Management Tab (Admin Only) */}
            {activeTab === "partners" && currentUser.role === "admin" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-2 flex items-center">
                      <Users className="h-10 w-10 mr-4 text-orange-400" />
                      Partner Management
                    </h2>
                    <p className="text-gray-300 text-lg">Manage partners and their access levels</p>
                  </div>
                  <Button
                    onClick={() => setShowCreatePartner(true)}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-xl hover-lift"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create Partner
                  </Button>
                </div>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center">
                      <Star className="h-6 w-6 mr-3 text-yellow-400" />
                      All Partners
                    </CardTitle>
                    <CardDescription className="text-gray-300">Manage partner accounts and permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-white/20">
                        <thead>
                          <tr>
                            <th className="p-4 text-left text-gray-300 font-semibold">Name</th>
                            <th className="p-4 text-left text-gray-300 font-semibold">Username</th>
                            <th className="p-4 text-left text-gray-300 font-semibold">Role</th>
                            <th className="p-4 text-left text-gray-300 font-semibold">Status</th>
                            <th className="p-4 text-left text-gray-300 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {partners.map((partner) => (
                            <tr
                              key={partner.id}
                              className="hover:bg-white/5 transition-colors duration-300 border-b border-white/10"
                            >
                              <td className="p-4">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-3">
                                    <User className="h-5 w-5 text-white" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-white">{partner.name}</p>
                                    <p className="text-sm text-gray-400">ID: {partner.id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 text-gray-300">@{partner.username}</td>
                              <td className="p-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    partner.role === "admin"
                                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                      : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                                  }`}
                                >
                                  {partner.role.charAt(0).toUpperCase() + partner.role.slice(1)}
                                </span>
                              </td>
                              <td className="p-4">
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                                  Active
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleEditPartner(partner)}
                                    size="sm"
                                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                                  >
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                  </Button>
                                  <Button
                                    onClick={() => handleDeletePartner(partner.id)}
                                    size="sm"
                                    variant="outline"
                                    className="bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                                    disabled={partner.id === currentUser.id}
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* User Submissions Tab (Admin Only) */}
            {activeTab === "submissions" && currentUser.role === "admin" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2 flex items-center">
                    <Eye className="h-10 w-10 mr-4 text-cyan-400" />
                    User Submissions
                  </h2>
                  <p className="text-gray-300 text-lg">View user submissions and feedback</p>
                </div>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center">
                      <Star className="h-6 w-6 mr-3 text-yellow-400" />
                      All Submissions
                    </CardTitle>
                    <CardDescription className="text-gray-300">View user submissions and feedback</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-white/20">
                        <thead>
                          <tr>
                            <th className="p-3 text-left text-gray-300 font-semibold">Name</th>
                            <th className="p-3 text-left text-gray-300 font-semibold">Email</th>
                            <th className="p-3 text-left text-gray-300 font-semibold">Company</th>
                            <th className="p-3 text-left text-gray-300 font-semibold">Service</th>
                            <th className="p-3 text-left text-gray-300 font-semibold">Date</th>
                            <th className="p-3 text-left text-gray-300 font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockSubmissions.map((submission) => (
                            <tr key={submission.id} className="hover:bg-white/5 transition-colors duration-300">
                              <td className="p-3 text-white">{submission.name}</td>
                              <td className="p-3 text-gray-300">{submission.email}</td>
                              <td className="p-3 text-gray-300">{submission.company}</td>
                              <td className="p-3 text-gray-300">{submission.service}</td>
                              <td className="p-3 text-gray-300">{submission.date}</td>
                              <td className="p-3">
                                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-500 text-white">
                                  {submission.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Settings Tab (Admin Only) */}
            {activeTab === "settings" && currentUser.role === "admin" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2 flex items-center">
                    <Settings className="h-10 w-10 mr-4 text-indigo-400" />
                    Settings
                  </h2>
                  <p className="text-gray-300 text-lg">Manage system settings and configurations</p>
                </div>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center">
                      <Star className="h-6 w-6 mr-3 text-yellow-400" />
                      System Settings
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Manage system settings and configurations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button
                        onClick={exportUserData}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover-lift"
                      >
                        Export User Data
                      </Button>
                      <Button
                        onClick={exportLeadsToExcel}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover-lift"
                      >
                        Export Leads to Excel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Partnership Applications Tab (Admin Only) */}
            {activeTab === "applications" && currentUser.role === "admin" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-2 flex items-center">
                      <Handshake className="h-10 w-10 mr-4 text-pink-400" />
                      Partnership Applications
                    </h2>
                    <p className="text-gray-300 text-lg">Review and manage partnership applications</p>
                  </div>
                </div>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center">
                      <Star className="h-6 w-6 mr-3 text-yellow-400" />
                      All Applications
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Manage partnership applications and approvals
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {partnershipApplications.map((application) => (
                        <div
                          key={application.id}
                          className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-white mb-2">
                                {application.personalInfo.firstName} {application.personalInfo.lastName}
                              </h3>
                              <p className="text-gray-300 mb-1">{application.businessInfo.companyName}</p>
                              <p className="text-gray-400 text-sm">{application.personalInfo.position}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span
                                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                  application.status === "Approved"
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                                    : application.status === "Pending Review"
                                      ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                                      : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                                }`}
                              >
                                {application.status}
                              </span>
                              <Button
                                onClick={() => setEditingApplication(application)}
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                onClick={() => handleDeleteApplication(application.id)}
                                size="sm"
                                variant="outline"
                                className="bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-3 gap-6">
                            <div>
                              <h4 className="font-semibold text-white mb-2">Contact Information</h4>
                              <div className="text-sm text-gray-300 space-y-1">
                                <p>📧 {application.personalInfo.email}</p>
                                <p>📱 {application.personalInfo.phone}</p>
                                <p>🏢 {application.businessInfo.location}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white mb-2">Partnership Details</h4>
                              <div className="text-sm text-gray-300 space-y-1">
                                <p>Type: {application.partnershipInfo.partnershipType}</p>
                                <p>Volume: {application.partnershipInfo.expectedVolume}</p>
                                <p>Experience: {application.personalInfo.experience}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white mb-2">Services Offered</h4>
                              <div className="flex flex-wrap gap-2">
                                {application.servicesOffered.map((service, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs"
                                  >
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-gray-400 text-sm">
                              Submitted: {application.submittedDate} | Last Updated: {application.lastUpdated}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    )
  }

  // Login page layout (when not logged in) with enhanced styling
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-400/10 to-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Floating Particles */}
        <div className="particles">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/60 rounded-full animate-float"
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
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-lg font-medium mb-10 animate-bounce-in glass-effect">
              <Crown className="h-6 w-6 mr-3 animate-pulse text-yellow-400" />Exclusive Channel Partnership Portal
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
              Join our exclusive partner network and unlock
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
            <div className="mt-16 animate-fade-in-up animation-delay-800">
              <Button
                onClick={() => setShowPartnershipForm(true)}
                className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold px-12 py-6 text-xl rounded-2xl hover-lift shadow-2xl"
              >
                <Handshake className="h-6 w-6 mr-3" />
                Apply for Partnership
                <Sparkles className="h-6 w-6 ml-3" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Login Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl hover-lift">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <Lock className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl text-white">🔐 Partner Login</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Enter your credentials to access the exclusive partner dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-white mb-3">Username</label>
                  <Input
                    value={loginData.username}
                    onChange={(e) => setLoginData((prev) => ({ ...prev, username: e.target.value }))}
                    placeholder="Enter your username"
                    required
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400 text-lg p-4 rounded-xl focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold text-white mb-3">Password</label>
                  <Input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter your password"
                    required
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400 text-lg p-4 rounded-xl focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white py-4 text-lg font-bold rounded-xl hover-lift"
                >
                  🚀 Access Partner Dashboard
                </Button>
              </form>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/20">
                <h4 className="font-bold text-white mb-4 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-400" />
                  Demo Credentials:
                </h4>
                <div className="text-sm text-gray-300 space-y-2">
                  <p className="flex items-center">
                    <Crown className="h-4 w-4 mr-2 text-yellow-400" />
                    <strong className="text-white">Admin:</strong> digitconp1 / digitron12345!
                  </p>
                  <p className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-400" />
                    <strong className="text-white">Partner:</strong> partner1 / pass123
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
      {/* Partnership Registration Form Modal */}
      {showPartnershipForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="p-6 border-b border-white/20">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white flex items-center">
                    <Handshake className="h-8 w-8 mr-3 text-pink-400" />
                    Partnership Application
                  </h2>
                  <p className="text-gray-300 mt-2">Step {currentPartnershipStep} of 4</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPartnershipForm(false)
                    setCurrentPartnershipStep(1)
                  }}
                  className="bg-white/10 text-white border-white/30"
                >
                  ✕
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        currentPartnershipStep >= step
                          ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                          : "bg-gray-600 text-gray-300"
                      }`}
                    >
                      {step}
                    </div>
                  ))}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentPartnershipStep / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Step 1: Personal Information */}
              {currentPartnershipStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                      <Input
                        value={partnershipFormData.personalInfo.firstName}
                        onChange={(e) =>
                          setPartnershipFormData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, firstName: e.target.value },
                          }))
                        }
                        placeholder="Enter your first name"
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                      <Input
                        value={partnershipFormData.personalInfo.lastName}
                        onChange={(e) =>
                          setPartnershipFormData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, lastName: e.target.value },
                          }))
                        }
                        placeholder="Enter your last name"
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                      <Input
                        type="email"
                        value={partnershipFormData.personalInfo.email}
                        onChange={(e) =>
                          setPartnershipFormData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, email: e.target.value },
                          }))
                        }
                        placeholder="Enter your email address"
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                      <Input
                        value={partnershipFormData.personalInfo.phone}
                        onChange={(e) =>
                          setPartnershipFormData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, phone: e.target.value },
                          }))
                        }
                        placeholder="Enter your phone number"
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Position/Title *</label>
                      <Input
                        value={partnershipFormData.personalInfo.position}
                        onChange={(e) =>
                          setPartnershipFormData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, position: e.target.value },
                          }))
                        }
                        placeholder="Your position in the company"
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience *</label>
                      <select
                        value={partnershipFormData.personalInfo.experience}
                        onChange={(e) =>
                          setPartnershipFormData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, experience: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                      >
                        <option value="">Select experience level</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5-10 years">5-10 years</option>
                        <option value="10+ years">10+ years</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Business Information */}
              {currentPartnershipStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6">Business Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
                      <Input
                        value={partnershipFormData.businessInfo.companyName}
                        onChange={(e) =>
                          setPartnershipFormData((prev) => ({
                            ...prev,
                            businessInfo: { ...prev.businessInfo, companyName: e.target.value },
                          }))
                        }
                        placeholder="Enter your company name"
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company Website</label>
                      <Input
                        value={partnershipFormData.businessInfo.website}
                        onChange={(e) =>
                          setPartnershipFormData((prev) => ({
                            ...prev,
                            businessInfo: { ...prev.businessInfo, website: e.target.value },
                          }))
                        }
                        placeholder="https://yourcompany.com"
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Industry *</label>
                      <select
                        value={partnershipFormData.businessInfo.industry}
                        onChange={(e) =>
                          setPartnershipFormData((prev) => ({
                            ...prev,
                            businessInfo: { ...prev.businessInfo, industry: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                      >
                        <option value="">Select industry</option>
                        <option value="Technology">Technology</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Consulting">Consulting</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Finance">Finance</option>
                        <option value="Education">Education</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company Size *</label>
                      <select
                        value={partnershipFormData.businessInfo.companySize}
                        onChange={(e) =>
                          setPartnershipFormData((prev) => ({
                            ...prev,
                            businessInfo: { ...prev.businessInfo, companySize: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                      >
                        <option value="">Select company size</option>
                        <option value="1-10 employees">1-10 employees</option>
                        <option value="11-50 employees">11-50 employees</option>
                        <option value="51-100 employees">51-100 employees</option>
                        <option value="101-500 employees">101-500 employees</option>
                        <option value="500+ employees">500+ employees</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Location *</label>
                      <Input
                        value={partnershipFormData.businessInfo.location}
                        onChange={(e) =>
                          setPartnershipFormData((prev) => ({
                            ...prev,
                            businessInfo: { ...prev.businessInfo, location: e.target.value },
                          }))
                        }
                        placeholder="City, Country"
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Business Registration Number
                      </label>
                      <Input
                        value={partnershipFormData.businessInfo.registrationNumber}
                        onChange={(e) =>
                          setPartnershipFormData((prev) => ({
                            ...prev,
                            businessInfo: { ...prev.businessInfo, registrationNumber: e.target.value },
                          }))
                        }
                        placeholder="NZBN or equivalent"
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Partnership Information */}
              {currentPartnershipStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6">Partnership Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Partnership Type *</label>
                      <select
                        value={partnershipFormData.partnershipInfo.partnershipType}
                        onChange={(e) =>
                          setPartnershipFormData((prev) => ({
                            ...prev,
                            partnershipInfo: { ...prev.partnershipInfo, partnershipType: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                      >
                        <option value="">Select partnership type</option>
                        <option value="Referral Partner">Referral Partner</option>
                        <option value="Reseller Partner">Reseller Partner</option>
                        <option value="Technology Partner">Technology Partner</option>
                        <option value="Strategic Partner">Strategic Partner</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Expected Monthly Volume *</label>
                      <select
                        value={partnershipFormData.partnershipInfo.expectedVolume}
                        onChange={(e) =>
                          setPartnershipFormData((prev) => ({
                            ...prev,
                            partnershipInfo: { ...prev.partnershipInfo, expectedVolume: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                      >
                        <option value="">Select expected volume</option>
                        <option value="1-5 projects per month">1-5 projects per month</option>
                        <option value="5-10 projects per month">5-10 projects per month</option>
                        <option value="10-20 projects per month">10-20 projects per month</option>
                        <option value="20+ projects per month">20+ projects per month</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Target Markets</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {["Small Business", "Startups", "Mid-Market", "Enterprise", "Non-Profit", "Government"].map(
                        (market) => (
                          <label key={market} className="flex items-center text-gray-300">
                            <input
                              type="checkbox"
                              checked={partnershipFormData.partnershipInfo.targetMarkets.includes(market)}
                              onChange={(e) => {
                                const markets = partnershipFormData.partnershipInfo.targetMarkets
                                if (e.target.checked) {
                                  setPartnershipFormData((prev) => ({
                                    ...prev,
                                    partnershipInfo: {
                                      ...prev.partnershipInfo,
                                      targetMarkets: [...markets, market],
                                    },
                                  }))
                                } else {
                                  setPartnershipFormData((prev) => ({
                                    ...prev,
                                    partnershipInfo: {
                                      ...prev.partnershipInfo,
                                      targetMarkets: markets.filter((m) => m !== market),
                                    },
                                  }))
                                }
                              }}
                              className="mr-2"
                            />
                            {market}
                          </label>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Experience & Expertise</label>
                    <Textarea
                      value={partnershipFormData.partnershipInfo.experience}
                      onChange={(e) =>
                        setPartnershipFormData((prev) => ({
                          ...prev,
                          partnershipInfo: { ...prev.partnershipInfo, experience: e.target.value },
                        }))
                      }
                      placeholder="Tell us about your experience in your industry and relevant expertise..."
                      rows={4}
                      className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Why do you want to partner with us?
                    </label>
                    <Textarea
                      value={partnershipFormData.partnershipInfo.motivation}
                      onChange={(e) =>
                        setPartnershipFormData((prev) => ({
                          ...prev,
                          partnershipInfo: { ...prev.partnershipInfo, motivation: e.target.value },
                        }))
                      }
                      placeholder="Explain your motivation for this partnership and how it aligns with your business goals..."
                      rows={4}
                      className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Services You'll Provide */}
              {currentPartnershipStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6">Services You'll Provide</h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-4">
                      Select the services you can provide to support our partnership:
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Lead Generation",
                        "Client Consultation",
                        "Sales & Marketing",
                        "Project Management",
                        "Technical Consultation",
                        "Client Relationship Management",
                        "After-sales Support",
                        "Marketing Support",
                        "Training & Education",
                        "Quality Assurance",
                        "Business Development",
                        "Strategic Planning",
                      ].map((service) => (
                        <label
                          key={service}
                          className="flex items-center text-gray-300 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={partnershipFormData.servicesOffered.includes(service)}
                            onChange={(e) => {
                              const services = partnershipFormData.servicesOffered
                              if (e.target.checked) {
                                setPartnershipFormData((prev) => ({
                                  ...prev,
                                  servicesOffered: [...services, service],
                                }))
                              } else {
                                setPartnershipFormData((prev) => ({
                                  ...prev,
                                  servicesOffered: services.filter((s) => s !== service),
                                }))
                              }
                            }}
                            className="mr-3"
                          />
                          <span className="font-medium">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 p-6 rounded-2xl border border-pink-500/20">
                    <h4 className="font-bold text-white mb-3 flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-400" />
                      Partnership Benefits You'll Receive:
                    </h4>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Up to 30% commission on successful referrals</li>
                      <li>• Dedicated account manager and priority support</li>
                      <li>• Co-branding opportunities and marketing materials</li>
                      <li>• Access to exclusive partner resources and training</li>
                      <li>• Monthly performance reports and analytics</li>
                      <li>• Early access to new services and features</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Form Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-white/20">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPartnershipStep(Math.max(1, currentPartnershipStep - 1))}
                  disabled={currentPartnershipStep === 1}
                  className="bg-white/10 text-white border-white/30"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentPartnershipStep < 4 ? (
                  <Button
                    onClick={() => setCurrentPartnershipStep(Math.min(4, currentPartnershipStep + 1))}
                    className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handlePartnershipFormSubmit}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    Submit Application
                    <Handshake className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Edit Application Modal */}
      {editingApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white">Edit Partnership Application</h2>
              <p className="text-gray-300">Update application details and status</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={editingApplication.status}
                    onChange={(e) => setEditingApplication((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="Pending Review">Pending Review</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                  <Input
                    value={editingApplication.businessInfo.companyName}
                    onChange={(e) =>
                      setEditingApplication((prev) => ({
                        ...prev,
                        businessInfo: { ...prev.businessInfo, companyName: e.target.value },
                      }))
                    }
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <Input
                    value={editingApplication.personalInfo.email}
                    onChange={(e) =>
                      setEditingApplication((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, email: e.target.value },
                      }))
                    }
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Partnership Type</label>
                  <select
                    value={editingApplication.partnershipInfo.partnershipType}
                    onChange={(e) =>
                      setEditingApplication((prev) => ({
                        ...prev,
                        partnershipInfo: { ...prev.partnershipInfo, partnershipType: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="Referral Partner">Referral Partner</option>
                    <option value="Reseller Partner">Reseller Partner</option>
                    <option value="Technology Partner">Technology Partner</option>
                    <option value="Strategic Partner">Strategic Partner</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button
                  onClick={() => handleUpdateApplication(editingApplication.id, editingApplication)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Update Application
                </Button>
                <Button
                  onClick={() => setEditingApplication(null)}
                  variant="outline"
                  className="bg-white/10 text-white border-white/30"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Edit Lead Modal */}
      {editingLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white">Edit Client Lead</h2>
              <p className="text-gray-300">Update lead details and status</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={editingLead.status}
                    onChange={(e) => setEditingLead((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="New Lead">New Lead</option>
                    <option value="Hot Lead">Hot Lead</option>
                    <option value="Warm Lead">Warm Lead</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Client Name</label>
                  <Input
                    value={editingLead.clientName}
                    onChange={(e) => setEditingLead((prev) => ({ ...prev, clientName: e.target.value }))}
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                  <Input
                    value={editingLead.company}
                    onChange={(e) => setEditingLead((prev) => ({ ...prev, company: e.target.value }))}
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <Input
                    value={editingLead.email}
                    onChange={(e) => setEditingLead((prev) => ({ ...prev, email: e.target.value }))}
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
                  <Input
                    value={editingLead.projectType}
                    onChange={(e) => setEditingLead((prev) => ({ ...prev, projectType: e.target.value }))}
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Budget</label>
                  <Input
                    value={editingLead.budget}
                    onChange={(e) => setEditingLead((prev) => ({ ...prev, budget: e.target.value }))}
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Timeline</label>
                  <Input
                    value={editingLead.timeline}
                    onChange={(e) => setEditingLead((prev) => ({ ...prev, timeline: e.target.value }))}
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button
                  onClick={() => handleUpdateLead(editingLead.id, editingLead)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Update Lead
                </Button>
                <Button
                  onClick={() => setEditingLead(null)}
                  variant="outline"
                  className="bg-white/10 text-white border-white/30"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Create Partner Modal */}
      {showCreatePartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-md border border-white/20">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white">Create New Partner</h2>
              <p className="text-gray-300">Add a new partner to the system</p>
            </div>
            <div className="p-6">
              <form onSubmit={handleCreatePartner} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Partner Name *</label>
                  <Input
                    value={newPartner.name}
                    onChange={(e) => setNewPartner((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter partner name"
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Username *</label>
                  <Input
                    value={newPartner.username}
                    onChange={(e) => setNewPartner((prev) => ({ ...prev, username: e.target.value }))}
                    placeholder="Enter username"
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password *</label>
                  <Input
                    type="password"
                    value={newPartner.password}
                    onChange={(e) => setNewPartner((prev) => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter password"
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Role *</label>
                  <select
                    value={newPartner.role}
                    onChange={(e) => setNewPartner((prev) => ({ ...prev, role: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="partner">Partner</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    Create Partner
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowCreatePartner(false)}
                    variant="outline"
                    className="bg-white/10 text-white border-white/30"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Partner Modal */}
      {editingPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-md border border-white/20">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white">Edit Partner</h2>
              <p className="text-gray-300">Update partner information</p>
            </div>
            <div className="p-6">
              <form onSubmit={handleUpdatePartner} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Partner Name *</label>
                  <Input
                    value={editingPartner.name}
                    onChange={(e) => setEditingPartner((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter partner name"
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Username *</label>
                  <Input
                    value={editingPartner.username}
                    onChange={(e) => setEditingPartner((prev) => ({ ...prev, username: e.target.value }))}
                    placeholder="Enter username"
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password *</label>
                  <Input
                    type="password"
                    value={editingPartner.password}
                    onChange={(e) => setEditingPartner((prev) => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter password"
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Role *</label>
                  <select
                    value={editingPartner.role}
                    onChange={(e) => setEditingPartner((prev) => ({ ...prev, role: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="partner">Partner</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                  >
                    Update Partner
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setEditingPartner(null)}
                    variant="outline"
                    className="bg-white/10 text-white border-white/30"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Client Lead Form Modal */}
      {showClientForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="p-6 border-b border-white/20">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white flex items-center">
                    <User className="h-8 w-8 mr-3 text-green-400" />
                    Add Client Lead
                  </h2>
                  <p className="text-gray-300 mt-2">Step {currentFormStep} of 5</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowClientForm(false)
                    setCurrentFormStep(1)
                  }}
                  className="bg-white/10 text-white border-white/30"
                >
                  ✕
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div
                      key={step}
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        currentFormStep >= step
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : "bg-gray-600 text-gray-300"
                      }`}
                    >
                      {step}
                    </div>
                  ))}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentFormStep / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Step 1: Client Information */}
              {currentFormStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6">Client Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Client Name *</label>
                      <Input
                        value={clientFormData.clientName}
                        onChange={(e) => setClientFormData((prev) => ({ ...prev, clientName: e.target.value }))}
                        placeholder="Enter client name"
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company *</label>
                      <Input
                        value={clientFormData.company}
                        onChange={(e) => setClientFormData((prev) => ({ ...prev, company: e.target.value }))}
                        placeholder="Enter company name"
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                      <Input
                        type="email"
                        value={clientFormData.email}
                        onChange={(e) => setClientFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter email address"
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                      <Input
                        value={clientFormData.phone}
                        onChange={(e) => setClientFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter phone number"
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                      <Input
                        value={clientFormData.address}
                        onChange={(e) => setClientFormData((prev) => ({ ...prev, address: e.target.value }))}
                        placeholder="Enter address"
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                      <Input
                        value={clientFormData.website}
                        onChange={(e) => setClientFormData((prev) => ({ ...prev, website: e.target.value }))}
                        placeholder="Enter website URL"
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Project Details */}
              {currentFormStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6">Project Details</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Project Type *</label>
                      <select
                        value={clientFormData.projectType}
                        onChange={(e) => setClientFormData((prev) => ({ ...prev, projectType: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      >
                        <option value="">Select project type</option>
                        <option value="Website Development">Website Development</option>
                        <option value="E-commerce Website">E-commerce Website</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="Web Application">Web Application</option>
                        <option value="Branding">Branding</option>
                        <option value="SEO Services">SEO Services</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Budget *</label>
                      <select
                        value={clientFormData.budget}
                        onChange={(e) => setClientFormData((prev) => ({ ...prev, budget: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      >
                        <option value="">Select budget range</option>
                        <option value="$1,000 - $5,000 NZD">$1,000 - $5,000 NZD</option>
                        <option value="$5,000 - $10,000 NZD">$5,000 - $10,000 NZD</option>
                        <option value="$10,000 - $20,000 NZD">$10,000 - $20,000 NZD</option>
                        <option value="$20,000+ NZD">$20,000+ NZD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Timeline *</label>
                      <select
                        value={clientFormData.timeline}
                        onChange={(e) => setClientFormData((prev) => ({ ...prev, timeline: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      >
                        <option value="">Select timeline</option>
                        <option value="1-2 weeks">1-2 weeks</option>
                        <option value="1 month">1 month</option>
                        <option value="2-3 months">2-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="6+ months">6+ months</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                      <select
                        value={clientFormData.priority}
                        onChange={(e) => setClientFormData((prev) => ({ ...prev, priority: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Project Description</label>
                    <Textarea
                      value={clientFormData.projectDescription}
                      onChange={(e) => setClientFormData((prev) => ({ ...prev, projectDescription: e.target.value }))}
                      placeholder="Describe the project requirements..."
                      rows={4}
                      className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Technical Requirements */}
              {currentFormStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6">Technical Requirements</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Platforms</label>
                      <div className="space-y-2">
                        {["Web", "iOS", "Android", "Desktop"].map((platform) => (
                          <label key={platform} className="flex items-center text-gray-300">
                            <input
                              type="checkbox"
                              checked={clientFormData.platforms.includes(platform)}
                              onChange={(e) => {
                                const platforms = clientFormData.platforms
                                if (e.target.checked) {
                                  setClientFormData((prev) => ({ ...prev, platforms: [...platforms, platform] }))
                                } else {
                                  setClientFormData((prev) => ({
                                    ...prev,
                                    platforms: platforms.filter((p) => p !== platform),
                                  }))
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
                      <label className="block text-sm font-medium text-gray-300 mb-2">Features</label>
                      <div className="space-y-2">
                        {[
                          "User Authentication",
                          "Payment Integration",
                          "Admin Panel",
                          "API Integration",
                          "Real-time Chat",
                          "Push Notifications",
                        ].map((feature) => (
                          <label key={feature} className="flex items-center text-gray-300">
                            <input
                              type="checkbox"
                              checked={clientFormData.features.includes(feature)}
                              onChange={(e) => {
                                const features = clientFormData.features
                                if (e.target.checked) {
                                  setClientFormData((prev) => ({ ...prev, features: [...features, feature] }))
                                } else {
                                  setClientFormData((prev) => ({
                                    ...prev,
                                    features: features.filter((f) => f !== feature),
                                  }))
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
                    <label className="block text-sm font-medium text-gray-300 mb-2">Hosting Requirements</label>
                    <select
                      value={clientFormData.hosting}
                      onChange={(e) => setClientFormData((prev) => ({ ...prev, hosting: e.target.value }))}
                      className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select hosting preference</option>
                      <option value="Shared Hosting">Shared Hosting</option>
                      <option value="VPS Hosting">VPS Hosting</option>
                      <option value="Dedicated Server">Dedicated Server</option>
                      <option value="Cloud Hosting">Cloud Hosting</option>
                      <option value="Client Managed">Client Managed</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4: Business Information */}
              {currentFormStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6">Business Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
                      <select
                        value={clientFormData.industry}
                        onChange={(e) => setClientFormData((prev) => ({ ...prev, industry: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select industry</option>
                        <option value="Technology">Technology</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Finance">Finance</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Education">Education</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Target Audience</label>
                      <Input
                        value={clientFormData.targetAudience}
                        onChange={(e) => setClientFormData((prev) => ({ ...prev, targetAudience: e.target.value }))}
                        placeholder="Describe target audience"
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Competitors</label>
                    <Textarea
                      value={clientFormData.competitors}
                      onChange={(e) => setClientFormData((prev) => ({ ...prev, competitors: e.target.value }))}
                      placeholder="List main competitors..."
                      rows={3}
                      className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Business Goals</label>
                    <Textarea
                      value={clientFormData.goals}
                      onChange={(e) => setClientFormData((prev) => ({ ...prev, goals: e.target.value }))}
                      placeholder="Describe business goals and objectives..."
                      rows={3}
                      className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Additional Information */}
              {currentFormStep === 5 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6">Additional Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Lead Source</label>
                      <select
                        value={clientFormData.source}
                        onChange={(e) => setClientFormData((prev) => ({ ...prev, source: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select source</option>
                        <option value="Website">Website</option>
                        <option value="Referral">Referral</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Google Search">Google Search</option>
                        <option value="Networking">Networking</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Lead Status</label>
                      <select
                        value={clientFormData.status}
                        onChange={(e) => setClientFormData((prev) => ({ ...prev, status: e.target.value }))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="New Lead">New Lead</option>
                        <option value="Hot Lead">Hot Lead</option>
                        <option value="Warm Lead">Warm Lead</option>
                        <option value="Cold Lead">Cold Lead</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Follow-up Date</label>
                      <Input
                        type="date"
                        value={clientFormData.followUpDate}
                        onChange={(e) => setClientFormData((prev) => ({ ...prev, followUpDate: e.target.value }))}
                        className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes</label>
                    <Textarea
                      value={clientFormData.notes}
                      onChange={(e) => setClientFormData((prev) => ({ ...prev, notes: e.target.value }))}
                      placeholder="Any additional notes or requirements..."
                      rows={4}
                      className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
              )}

              {/* Form Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-white/20">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentFormStep(Math.max(1, currentFormStep - 1))}
                  disabled={currentFormStep === 1}
                  className="bg-white/10 text-white border-white/30"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentFormStep < 5 ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentFormStep(Math.min(5, currentFormStep + 1))}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleClientFormSubmit}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    Submit Lead
                    <User className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Edit Application Modal */}
      {editingApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white">Edit Partnership Application</h2>
              <p className="text-gray-300">Update application details and status</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={editingApplication.status}
                    onChange={(e) => setEditingApplication((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="Pending Review">Pending Review</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                  <Input
                    value={editingApplication.businessInfo.companyName}
                    onChange={(e) =>
                      setEditingApplication((prev) => ({
                        ...prev,
                        businessInfo: { ...prev.businessInfo, companyName: e.target.value },
                      }))
                    }
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <Input
                    value={editingApplication.personalInfo.email}
                    onChange={(e) =>
                      setEditingApplication((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, email: e.target.value },
                      }))
                    }
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Partnership Type</label>
                  <select
                    value={editingApplication.partnershipInfo.partnershipType}
                    onChange={(e) =>
                      setEditingApplication((prev) => ({
                        ...prev,
                        partnershipInfo: { ...prev.partnershipInfo, partnershipType: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="Referral Partner">Referral Partner</option>
                    <option value="Reseller Partner">Reseller Partner</option>
                    <option value="Technology Partner">Technology Partner</option>
                    <option value="Strategic Partner">Strategic Partner</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button
                  onClick={() => handleUpdateApplication(editingApplication.id, editingApplication)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Update Application
                </Button>
                <Button
                  onClick={() => setEditingApplication(null)}
                  variant="outline"
                  className="bg-white/10 text-white border-white/30"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Edit Lead Modal */}
      {editingLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white">Edit Client Lead</h2>
              <p className="text-gray-300">Update lead details and status</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={editingLead.status}
                    onChange={(e) => setEditingLead((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="New Lead">New Lead</option>
                    <option value="Hot Lead">Hot Lead</option>
                    <option value="Warm Lead">Warm Lead</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Client Name</label>
                  <Input
                    value={editingLead.clientName}
                    onChange={(e) => setEditingLead((prev) => ({ ...prev, clientName: e.target.value }))}
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                  <Input
                    value={editingLead.company}
                    onChange={(e) => setEditingLead((prev) => ({ ...prev, company: e.target.value }))}
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <Input
                    value={editingLead.email}
                    onChange={(e) => setEditingLead((prev) => ({ ...prev, email: e.target.value }))}
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
                  <Input
                    value={editingLead.projectType}
                    onChange={(e) => setEditingLead((prev) => ({ ...prev, projectType: e.target.value }))}
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Budget</label>
                  <Input
                    value={editingLead.budget}
                    onChange={(e) => setEditingLead((prev) => ({ ...prev, budget: e.target.value }))}
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Timeline</label>
                  <Input
                    value={editingLead.timeline}
                    onChange={(e) => setEditingLead((prev) => ({ ...prev, timeline: e.target.value }))}
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button
                  onClick={() => handleUpdateLead(editingLead.id, editingLead)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Update Lead
                </Button>
                <Button
                  onClick={() => setEditingLead(null)}
                  variant="outline"
                  className="bg-white/10 text-white border-white/30"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
