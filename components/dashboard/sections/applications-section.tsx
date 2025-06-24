"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Building,
  Mail,
  Phone,
  Calendar,
  Target,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Application {
  id: string
  applicantName: string
  email: string
  company: string
  phone: string
  partnershipType: string
  expectedVolume: string
  status: "pending" | "under-review" | "approved" | "rejected"
  submittedDate: string
  reviewedBy?: string
  notes?: string
  companySize: string
  industry: string
  revenue: string
  experience: string
}

const mockApplications: Application[] = [
  {
    id: "1",
    applicantName: "Alex Rodriguez",
    email: "alex@innovatetech.com",
    company: "InnovateTech Solutions",
    phone: "+1 (555) 234-5678",
    partnershipType: "Reseller Partner",
    expectedVolume: "16-30 projects",
    status: "pending",
    submittedDate: "2024-01-20",
    companySize: "51-200",
    industry: "Technology",
    revenue: "$5M - $25M",
    experience: "5+ years in web development partnerships",
  },
  {
    id: "2",
    applicantName: "Maria Garcia",
    email: "maria@digitalfirst.com",
    company: "Digital First Agency",
    phone: "+1 (555) 345-6789",
    partnershipType: "Technology Partner",
    expectedVolume: "6-15 projects",
    status: "under-review",
    submittedDate: "2024-01-18",
    reviewedBy: "Admin User",
    companySize: "11-50",
    industry: "Marketing",
    revenue: "$1M - $5M",
    experience: "3+ years specializing in e-commerce solutions",
  },
  {
    id: "3",
    applicantName: "David Kim",
    email: "david@cloudexperts.com",
    company: "Cloud Experts Inc",
    phone: "+1 (555) 456-7890",
    partnershipType: "Strategic Alliance",
    expectedVolume: "30+ projects",
    status: "approved",
    submittedDate: "2024-01-15",
    reviewedBy: "Admin User",
    notes: "Excellent technical capabilities and strong client base",
    companySize: "201-1000",
    industry: "Technology",
    revenue: "$25M - $100M",
    experience: "10+ years in cloud infrastructure and development",
  },
  {
    id: "4",
    applicantName: "Jennifer Wilson",
    email: "jennifer@startupboost.com",
    company: "StartupBoost Consulting",
    phone: "+1 (555) 567-8901",
    partnershipType: "Referral Partner",
    expectedVolume: "1-5 projects",
    status: "rejected",
    submittedDate: "2024-01-12",
    reviewedBy: "Admin User",
    notes: "Limited technical expertise for our requirements",
    companySize: "1-10",
    industry: "Consulting",
    revenue: "Under $1M",
    experience: "2 years in business consulting",
  },
]

export function ApplicationsSection() {
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const { toast } = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "under-review":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleStatusChange = (id: string, newStatus: "approved" | "rejected" | "under-review") => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus, reviewedBy: "Admin User" } : app)),
    )

    toast({
      title: "Status updated",
      description: `Application has been ${newStatus}.`,
    })
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    pending: applications.filter((app) => app.status === "pending").length,
    underReview: applications.filter((app) => app.status === "under-review").length,
    approved: applications.filter((app) => app.status === "approved").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partnership Applications</h1>
          <p className="text-gray-600 mt-1">Review and manage partnership applications</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <FileText className="h-4 w-4 mr-2" />
          Export Applications
        </Button>
      </div>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600">{statusCounts.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Under Review</p>
                <p className="text-3xl font-bold text-blue-600">{statusCounts.underReview}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-600">{statusCounts.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{statusCounts.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="grid gap-6">
        {filteredApplications.map((application) => (
          <Card key={application.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {application.applicantName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{application.applicantName}</h3>
                      <Badge className={getStatusColor(application.status)}>
                        {application.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2" />
                        {application.company}
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {application.email}
                      </div>
                      <div className="flex items-center">
                        <Target className="h-4 w-4 mr-2" />
                        {application.partnershipType}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(application.submittedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Application Details</DialogTitle>
                        <DialogDescription>
                          Complete application information for {application.applicantName}
                        </DialogDescription>
                      </DialogHeader>

                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="company">Company Info</TabsTrigger>
                          <TabsTrigger value="partnership">Partnership Details</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h4 className="font-semibold text-gray-900">Contact Information</h4>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                                  <span>{application.email}</span>
                                </div>
                                <div className="flex items-center">
                                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                                  <span>{application.phone}</span>
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                  <span>Applied: {new Date(application.submittedDate).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <h4 className="font-semibold text-gray-900">Application Status</h4>
                              <div className="space-y-2">
                                <Badge className={getStatusColor(application.status)} size="lg">
                                  {application.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                </Badge>
                                {application.reviewedBy && (
                                  <p className="text-sm text-gray-600">Reviewed by: {application.reviewedBy}</p>
                                )}
                                {application.notes && (
                                  <div className="mt-2">
                                    <p className="text-sm font-medium text-gray-900">Notes:</p>
                                    <p className="text-sm text-gray-600">{application.notes}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="company" className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h4 className="font-semibold text-gray-900">Company Details</h4>
                              <div className="space-y-3">
                                <div>
                                  <span className="text-sm font-medium text-gray-500">Company Name:</span>
                                  <p className="text-gray-900">{application.company}</p>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-500">Industry:</span>
                                  <p className="text-gray-900">{application.industry}</p>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-500">Company Size:</span>
                                  <p className="text-gray-900">{application.companySize} employees</p>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-500">Annual Revenue:</span>
                                  <p className="text-gray-900">{application.revenue}</p>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <h4 className="font-semibold text-gray-900">Experience</h4>
                              <p className="text-gray-600">{application.experience}</p>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="partnership" className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h4 className="font-semibold text-gray-900">Partnership Information</h4>
                              <div className="space-y-3">
                                <div>
                                  <span className="text-sm font-medium text-gray-500">Partnership Type:</span>
                                  <p className="text-gray-900">{application.partnershipType}</p>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-500">Expected Volume:</span>
                                  <p className="text-gray-900">{application.expectedVolume}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>

                      {application.status === "pending" && (
                        <div className="flex justify-end space-x-2 pt-4 border-t">
                          <Button variant="outline" onClick={() => handleStatusChange(application.id, "under-review")}>
                            Start Review
                          </Button>
                          <Button
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleStatusChange(application.id, "rejected")}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleStatusChange(application.id, "approved")}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  {application.status === "pending" && (
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-200 hover:bg-green-50"
                        onClick={() => handleStatusChange(application.id, "approved")}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleStatusChange(application.id, "rejected")}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600">No applications match your current filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
