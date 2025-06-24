"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, User, FileText, Settings, Shield, Clock } from "lucide-react"

interface ActivityItem {
  id: string
  type: "user" | "partnership" | "system" | "security"
  action: string
  user: string
  timestamp: string
  details: string
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "partnership",
    action: "Partnership Approved",
    user: "Admin User",
    timestamp: "2024-01-20T10:30:00Z",
    details: "Approved partnership request from TechCorp Solutions",
  },
  {
    id: "2",
    type: "user",
    action: "User Created",
    user: "Admin User",
    timestamp: "2024-01-20T09:15:00Z",
    details: "Created new client account for John Smith",
  },
  {
    id: "3",
    type: "partnership",
    action: "New Partnership Request",
    user: "Sarah Johnson",
    timestamp: "2024-01-19T16:45:00Z",
    details: "Submitted partnership request for Digital Innovations Ltd",
  },
  {
    id: "4",
    type: "system",
    action: "File Uploaded",
    user: "Mike Chen",
    timestamp: "2024-01-19T14:20:00Z",
    details: "Uploaded company-profile.pdf",
  },
  {
    id: "5",
    type: "security",
    action: "Login Attempt",
    user: "Unknown",
    timestamp: "2024-01-19T12:10:00Z",
    details: "Failed login attempt from IP 192.168.1.100",
  },
  {
    id: "6",
    type: "partnership",
    action: "Partnership Rejected",
    user: "Admin User",
    timestamp: "2024-01-18T11:30:00Z",
    details: "Rejected partnership request from Global Ventures",
  },
]

export function ActivityLog() {
  const [activities] = useState<ActivityItem[]>(mockActivities)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return User
      case "partnership":
        return FileText
      case "system":
        return Settings
      case "security":
        return Shield
      default:
        return Clock
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "user":
        return "bg-blue-100 text-blue-800"
      case "partnership":
        return "bg-green-100 text-green-800"
      case "system":
        return "bg-purple-100 text-purple-800"
      case "security":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  }

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || activity.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
        <CardDescription>Track all system activities and user actions</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="security">Security</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          {filteredActivities.map((activity) => {
            const ActivityIcon = getActivityIcon(activity.type)
            const { date, time } = formatTimestamp(activity.timestamp)

            return (
              <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                  <ActivityIcon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-gray-900">{activity.action}</h4>
                    <div className="text-xs text-gray-500">
                      <div>{date}</div>
                      <div>{time}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{activity.details}</p>
                  <div className="flex items-center space-x-2">
                    <Badge className={getActivityColor(activity.type)}>{activity.type}</Badge>
                    <span className="text-xs text-gray-500">by {activity.user}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No activities found</h3>
            <p className="text-gray-600">No activities match your search criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
