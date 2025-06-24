"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Zap, Mail, Bell, Calendar, FileText, Users, DollarSign, Settings, Play, Plus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Automation {
  id: string
  name: string
  description: string
  trigger: string
  action: string
  isActive: boolean
  executions: number
  lastRun?: string
}

const mockAutomations: Automation[] = [
  {
    id: "1",
    name: "Welcome Email Sequence",
    description: "Send welcome emails to new partnership applicants",
    trigger: "New application submitted",
    action: "Send email sequence",
    isActive: true,
    executions: 45,
    lastRun: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    name: "Payment Reminder",
    description: "Remind clients about pending payments",
    trigger: "Invoice overdue by 7 days",
    action: "Send payment reminder",
    isActive: true,
    executions: 12,
    lastRun: "2024-01-19T14:20:00Z",
  },
  {
    id: "3",
    name: "Project Status Updates",
    description: "Weekly project status updates to clients",
    trigger: "Every Friday at 5 PM",
    action: "Generate and send report",
    isActive: false,
    executions: 8,
    lastRun: "2024-01-12T17:00:00Z",
  },
  {
    id: "4",
    name: "Lead Qualification",
    description: "Automatically qualify and score new leads",
    trigger: "New demo request",
    action: "Score and assign to sales",
    isActive: true,
    executions: 23,
    lastRun: "2024-01-20T09:15:00Z",
  },
]

export function AutomationSection() {
  const [automations, setAutomations] = useState<Automation[]>(mockAutomations)

  const handleCreateAutomation = () => {
    toast({
      title: "Creating Automation",
      description: "Opening automation builder...",
    })
  }

  const handleUseTemplate = (templateName: string) => {
    toast({
      title: "Using Template",
      description: `Setting up ${templateName} automation...`,
    })
  }

  const handleEditAutomation = (automation: Automation) => {
    toast({
      title: "Editing Automation",
      description: `Opening editor for ${automation.name}`,
    })
  }

  const handleRunAutomation = (automation: Automation) => {
    toast({
      title: "Running Automation",
      description: `Manually triggering ${automation.name}`,
    })
  }

  const handleViewLogs = (automation: Automation) => {
    toast({
      title: "Viewing Logs",
      description: `Opening execution logs for ${automation.name}`,
    })
  }

  const toggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((automation) => (automation.id === id ? { ...automation, isActive: !automation.isActive } : automation)),
    )
  }

  const activeAutomations = automations.filter((a) => a.isActive).length
  const totalExecutions = automations.reduce((sum, a) => sum + a.executions, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Automation Center</h1>
          <p className="text-gray-600 mt-1">Create and manage automated workflows</p>
        </div>
        <Button
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={handleCreateAutomation}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Automation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Automations</p>
                <p className="text-3xl font-bold text-blue-600">{activeAutomations}</p>
              </div>
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Executions</p>
                <p className="text-3xl font-bold text-green-600">{totalExecutions}</p>
              </div>
              <Play className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Time Saved</p>
                <p className="text-3xl font-bold text-purple-600">24h</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-orange-600">98%</p>
              </div>
              <Settings className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automation Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start Templates</CardTitle>
          <CardDescription>Pre-built automation templates to get you started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3 mb-3">
                <Mail className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Email Marketing</h3>
                  <p className="text-sm text-gray-600">Automated email campaigns</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => handleUseTemplate("Email Marketing")}
              >
                Use Template
              </Button>
            </div>

            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3 mb-3">
                <Bell className="h-8 w-8 text-yellow-600" />
                <div>
                  <h3 className="font-semibold">Notifications</h3>
                  <p className="text-sm text-gray-600">Smart notification system</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" onClick={() => handleUseTemplate("Notifications")}>
                Use Template
              </Button>
            </div>

            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3 mb-3">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold">Payment Follow-up</h3>
                  <p className="text-sm text-gray-600">Automated payment reminders</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => handleUseTemplate("Payment Follow-up")}
              >
                Use Template
              </Button>
            </div>

            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <h3 className="font-semibold">Lead Management</h3>
                  <p className="text-sm text-gray-600">Automated lead qualification</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => handleUseTemplate("Lead Management")}
              >
                Use Template
              </Button>
            </div>

            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3 mb-3">
                <FileText className="h-8 w-8 text-indigo-600" />
                <div>
                  <h3 className="font-semibold">Report Generation</h3>
                  <p className="text-sm text-gray-600">Automated reporting</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => handleUseTemplate("Report Generation")}
              >
                Use Template
              </Button>
            </div>

            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3 mb-3">
                <Calendar className="h-8 w-8 text-teal-600" />
                <div>
                  <h3 className="font-semibold">Scheduling</h3>
                  <p className="text-sm text-gray-600">Automated scheduling system</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" onClick={() => handleUseTemplate("Scheduling")}>
                Use Template
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Automations */}
      <Card>
        <CardHeader>
          <CardTitle>Your Automations</CardTitle>
          <CardDescription>Manage your active automation workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automations.map((automation) => (
              <div key={automation.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${automation.isActive ? "bg-green-100" : "bg-gray-100"}`}>
                    <Zap className={`h-5 w-5 ${automation.isActive ? "text-green-600" : "text-gray-400"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-semibold text-gray-900">{automation.name}</h3>
                      <Badge variant={automation.isActive ? "default" : "secondary"}>
                        {automation.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{automation.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Trigger: {automation.trigger}</span>
                      <span>•</span>
                      <span>Action: {automation.action}</span>
                      <span>•</span>
                      <span>{automation.executions} executions</span>
                      {automation.lastRun && (
                        <>
                          <span>•</span>
                          <span>Last run: {new Date(automation.lastRun).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`automation-${automation.id}`} className="text-sm">
                      {automation.isActive ? "On" : "Off"}
                    </Label>
                    <Switch
                      id={`automation-${automation.id}`}
                      checked={automation.isActive}
                      onCheckedChange={() => toggleAutomation(automation.id)}
                    />
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleEditAutomation(automation)}>
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleRunAutomation(automation)}>
                    Run Now
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleViewLogs(automation)}>
                    View Logs
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
