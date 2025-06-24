"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, CheckCircle, Lock, Globe, Smartphone, Clock, User, Activity } from "lucide-react"

const securityEvents = [
  {
    id: "1",
    type: "login",
    description: "Successful login",
    user: "admin@digitroncx.com",
    ip: "192.168.1.100",
    location: "New York, US",
    timestamp: "2024-01-20T10:30:00Z",
    status: "success",
  },
  {
    id: "2",
    type: "failed_login",
    description: "Failed login attempt",
    user: "unknown@example.com",
    ip: "45.123.45.67",
    location: "Unknown",
    timestamp: "2024-01-20T09:15:00Z",
    status: "warning",
  },
  {
    id: "3",
    type: "password_change",
    description: "Password changed",
    user: "admin@digitroncx.com",
    ip: "192.168.1.100",
    location: "New York, US",
    timestamp: "2024-01-19T14:20:00Z",
    status: "success",
  },
  {
    id: "4",
    type: "api_access",
    description: "API key used",
    user: "system",
    ip: "10.0.0.1",
    location: "Server",
    timestamp: "2024-01-19T12:10:00Z",
    status: "info",
  },
]

const activeSessions = [
  {
    id: "1",
    device: "Chrome on Windows",
    location: "New York, US",
    ip: "192.168.1.100",
    lastActive: "2024-01-20T10:30:00Z",
    current: true,
  },
  {
    id: "2",
    device: "Safari on iPhone",
    location: "New York, US",
    ip: "192.168.1.101",
    lastActive: "2024-01-19T18:45:00Z",
    current: false,
  },
  {
    id: "3",
    device: "Firefox on Mac",
    location: "Los Angeles, US",
    ip: "10.0.0.50",
    lastActive: "2024-01-18T09:20:00Z",
    current: false,
  },
]

export function SecuritySection() {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "login":
        return User
      case "failed_login":
        return AlertTriangle
      case "password_change":
        return Lock
      case "api_access":
        return Activity
      default:
        return Shield
    }
  }

  const getEventColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      default:
        return "text-blue-600"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Security Center</h1>
        <p className="text-gray-600 mt-1">Monitor security events and manage access controls</p>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Security Score</p>
                <p className="text-3xl font-bold text-green-600">95%</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">Excellent security</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                <p className="text-3xl font-bold text-blue-600">{activeSessions.length}</p>
              </div>
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-1">Across devices</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Attempts</p>
                <p className="text-3xl font-bold text-yellow-600">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <p className="text-xs text-yellow-600 mt-1">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">2FA Status</p>
                <p className="text-3xl font-bold text-green-600">ON</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">Enabled</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Security Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Security Events
            </CardTitle>
            <CardDescription>Monitor all security-related activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityEvents.map((event) => {
                const EventIcon = getEventIcon(event.type)
                return (
                  <div key={event.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
                    <div className={`p-2 rounded-full bg-gray-100`}>
                      <EventIcon className={`h-4 w-4 ${getEventColor(event.status)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900">{event.description}</p>
                        <Badge className={getStatusBadge(event.status)}>{event.status}</Badge>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>User: {event.user}</div>
                        <div>
                          IP: {event.ip} • {event.location}
                        </div>
                        <div>{new Date(event.timestamp).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">
                View All Events
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="h-5 w-5 mr-2" />
              Active Sessions
            </CardTitle>
            <CardDescription>Manage your active login sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Smartphone className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">{session.device}</p>
                        {session.current && <Badge className="bg-green-100 text-green-800 text-xs">Current</Badge>}
                      </div>
                      <div className="text-xs text-gray-500">
                        <div>
                          {session.location} • {session.ip}
                        </div>
                        <div>Last active: {new Date(session.lastActive).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                  {!session.current && (
                    <Button variant="outline" size="sm">
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security Recommendations
          </CardTitle>
          <CardDescription>Improve your account security with these recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-800">Two-Factor Authentication</h3>
                  <p className="text-sm text-green-600">Enabled and active</p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-800">Strong Password</h3>
                  <p className="text-sm text-green-600">Password meets security requirements</p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                <div>
                  <h3 className="font-semibold text-yellow-800">Session Timeout</h3>
                  <p className="text-sm text-yellow-600">Consider enabling automatic session timeout</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-800">Regular Backups</h3>
                  <p className="text-sm text-blue-600">Last backup: 2 hours ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Backups
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
