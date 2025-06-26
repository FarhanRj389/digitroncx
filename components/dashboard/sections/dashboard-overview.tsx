"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  FileText,
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Building,
  Globe,
  Zap,
} from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const stats = [
  {
    title: "Total Partners",
    value: "156",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Pending Applications",
    value: "23",
    change: "+5%",
    trend: "up",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    title: "Active Projects",
    value: "89",
    change: "+18%",
    trend: "up",
    icon: Building,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Monthly Revenue",
    value: "$125K",
    change: "+25%",
    trend: "up",
    icon: DollarSign,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Conversion Rate",
    value: "68%",
    change: "+8%",
    trend: "up",
    icon: TrendingUp,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Global Reach",
    value: "45",
    change: "+3",
    trend: "up",
    icon: Globe,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    suffix: "countries",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "partnership",
    title: "New Partnership Approved",
    description: "TechCorp Solutions partnership has been approved",
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "application",
    title: "Partnership Application",
    description: "Digital Innovations Ltd submitted new application",
    time: "4 hours ago",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "project",
    title: "Project Completed",
    description: "E-commerce platform for StartupHub Inc completed",
    time: "6 hours ago",
    icon: Building,
    color: "text-purple-600",
  },
  {
    id: 4,
    type: "user",
    title: "New Client Onboarded",
    description: "Global Ventures added as new client",
    time: "1 day ago",
    icon: Users,
    color: "text-orange-600",
  },
]

export function DashboardOverview() {
  const { toast } = useToast()
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  const handleViewReports = () => {
    toast({
      title: "Opening Reports",
      description: "Redirecting to analytics dashboard...",
    })
    // Add navigation logic here
  }

  const handleQuickActions = () => {
    toast({
      title: "Quick Actions Menu",
      description: "Opening quick actions panel...",
    })
    // Add quick actions logic here
  }

  const handleAddNewPartner = () => {
    toast({
      title: "Add New Partner",
      description: "Opening partner registration form...",
    })
    // Add navigation to partner form
  }

  const handleReviewApplications = () => {
    toast({
      title: "Review Applications",
      description: "Opening applications review panel...",
    })
    // Add navigation to applications
  }

  const handleCreateProject = () => {
    toast({
      title: "Create Project",
      description: "Opening project creation form...",
    })
    // Add navigation to project creation
  }

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGeneratingReport(false)
    toast({
      title: "Report Generated",
      description: "Your detailed report has been generated and sent to your email.",
    })
  }

  const handleViewAllActivities = () => {
    toast({
      title: "All Activities",
      description: "Opening complete activity log...",
    })
  }

  const handleViewDetailedReport = () => {
    toast({
      title: "Detailed Report",
      description: "Opening comprehensive performance report...",
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your partnerships.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleViewReports} className="text-black">
            <Activity className="h-4 w-4 mr-2" />
            View Reports
          </Button> 
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={handleQuickActions}
          >
            <Zap className="h-4 w-4 mr-2" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
                {stat.suffix && <span className="text-sm font-normal text-gray-500 ml-1">{stat.suffix}</span>}
              </div>
              <div className="flex items-center mt-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                )}
                <span className={`text-xs font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest updates from your partnership program</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`p-2 rounded-full bg-gray-100`}>
                      <activity.icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t">
                <Button variant="outline" className="w-full" onClick={handleViewAllActivities}>
                  View All Activities
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats & Actions */}
        <div className="space-y-6">
          {/* Performance Card */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-white">This Month's Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">New Partners</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Revenue Growth</span>
                  <span className="font-bold">+25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Projects Completed</span>
                  <span className="font-bold">34</span>
                </div>
              </div>
              <Button variant="secondary" className="w-full mt-4" onClick={handleViewDetailedReport}>
                View Detailed Report
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={handleAddNewPartner}>
                <Users className="h-4 w-4 mr-2" />
                Add New Partner
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleReviewApplications}>
                <FileText className="h-4 w-4 mr-2" />
                Review Applications
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleCreateProject}>
                <Building className="h-4 w-4 mr-2" />
                Create Project
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleGenerateReport}
                disabled={isGeneratingReport}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                {isGeneratingReport ? "Generating..." : "Generate Report"}
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Notifications
                <Badge className="bg-red-100 text-red-800">3</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-800">Pending Review</p>
                  <p className="text-xs text-yellow-600">5 partnership applications need review</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-800">System Update</p>
                  <p className="text-xs text-blue-600">New features available in dashboard</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-800">Goal Achieved</p>
                  <p className="text-xs text-green-600">Monthly revenue target reached!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
