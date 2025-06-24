"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, Globe, Target, DollarSign, Activity } from "lucide-react"

const analyticsData = {
  revenue: {
    current: 125000,
    previous: 98000,
    growth: 27.6,
  },
  projects: {
    completed: 34,
    inProgress: 12,
    total: 46,
  },
  clients: {
    active: 156,
    new: 23,
    retention: 94.2,
  },
  countries: 45,
  conversionRate: 68.4,
}

const monthlyData = [
  { month: "Jan", revenue: 45000, projects: 8 },
  { month: "Feb", revenue: 52000, projects: 12 },
  { month: "Mar", revenue: 48000, projects: 10 },
  { month: "Apr", revenue: 61000, projects: 15 },
  { month: "May", revenue: 55000, projects: 11 },
  { month: "Jun", revenue: 73000, projects: 18 },
]

const topClients = [
  { name: "TechCorp Solutions", revenue: 45000, projects: 12 },
  { name: "Digital Innovations", revenue: 32000, projects: 8 },
  { name: "StartupHub Inc", revenue: 28000, projects: 6 },
  { name: "Global Ventures", revenue: 20000, projects: 4 },
]

export function AnalyticsSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600">${analyticsData.revenue.current.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">+{analyticsData.revenue.growth}% from last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-3xl font-bold text-blue-600">{analyticsData.clients.active}</p>
                <p className="text-sm text-blue-600 mt-1">+{analyticsData.clients.new} new this month</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Projects Completed</p>
                <p className="text-3xl font-bold text-purple-600">{analyticsData.projects.completed}</p>
                <p className="text-sm text-gray-500 mt-1">{analyticsData.projects.inProgress} in progress</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Global Reach</p>
                <p className="text-3xl font-bold text-orange-600">{analyticsData.countries}</p>
                <p className="text-sm text-gray-500 mt-1">Countries served</p>
              </div>
              <Globe className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Monthly Revenue
            </CardTitle>
            <CardDescription>Revenue trends over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium w-8">{data.month}</span>
                    <div className="flex-1">
                      <Progress value={(data.revenue / 80000) * 100} className="h-2 w-32" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">${data.revenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{data.projects} projects</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Clients */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Top Clients
            </CardTitle>
            <CardDescription>Highest revenue generating clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topClients.map((client, index) => (
                <div key={client.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.projects} projects</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">${client.revenue.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Client Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{analyticsData.clients.retention}%</div>
              <Progress value={analyticsData.clients.retention} className="h-3 mb-2" />
              <p className="text-sm text-gray-600">Excellent retention rate</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{analyticsData.conversionRate}%</div>
              <Progress value={analyticsData.conversionRate} className="h-3 mb-2" />
              <p className="text-sm text-gray-600">Above industry average</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">96%</div>
              <Progress value={96} className="h-3 mb-2" />
              <p className="text-sm text-gray-600">On-time delivery rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-green-50">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Project completed for TechCorp Solutions</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <Badge className="bg-green-100 text-green-800">+$7,500</Badge>
            </div>
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-blue-50">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New client onboarded: Digital Innovations</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">New Client</Badge>
            </div>
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-purple-50">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Partnership application approved</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
              <Badge className="bg-purple-100 text-purple-800">Partnership</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
