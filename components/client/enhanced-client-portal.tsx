"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  User,
  FileText,
  Plus,
  LogOut,
  Eye,
  Edit,
  Trash2,
  FileSpreadsheet,
  FileType,
  Settings,
  Building,
  Menu,
  X,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import * as XLSX from "xlsx"

interface CustomField {
  id: string
  name: string
  type: "text" | "number" | "date" | "select" | "textarea"
  value: string
  options?: string[]
  required: boolean
}

interface Project {
  id: string
  name: string
  status: "active" | "completed" | "pending" | "cancelled"
  startDate: string
  endDate?: string
  budget: number
  description: string
  customFields: CustomField[]
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "E-commerce Website",
    status: "active",
    startDate: "2024-01-15",
    budget: 7500,
    description: "Complete e-commerce solution with payment integration",
    customFields: [
      {
        id: "1",
        name: "Technology Stack",
        type: "select",
        value: "React",
        options: ["React", "Vue", "Angular"],
        required: true,
      },
      { id: "2", name: "Launch Date", type: "date", value: "2024-03-15", required: true },
    ],
  },
  {
    id: "2",
    name: "Mobile App Development",
    status: "completed",
    startDate: "2023-11-01",
    endDate: "2024-01-10",
    budget: 12000,
    description: "Cross-platform mobile application",
    customFields: [
      {
        id: "3",
        name: "Platform",
        type: "select",
        value: "React Native",
        options: ["React Native", "Flutter", "Native"],
        required: true,
      },
      { id: "4", name: "App Store", type: "text", value: "iOS & Android", required: false },
    ],
  },
]

export function EnhancedClientPortal() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isAddingField, setIsAddingField] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [newField, setNewField] = useState<Partial<CustomField>>({
    name: "",
    type: "text",
    value: "",
    required: false,
  })

  const [isCreatingProject, setIsCreatingProject] = useState(false)
  const [isEditingProject, setIsEditingProject] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    budget: 0,
    startDate: "",
    status: "pending" as const,
  })

  useEffect(() => {
    if (!user || user.role !== "client") {
      router.push("/partnership")
    }
  }, [user, router])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleExportToExcel = () => {
    const exportData = projects.map((project) => ({
      "Project Name": project.name,
      Status: project.status,
      "Start Date": project.startDate,
      "End Date": project.endDate || "Ongoing",
      Budget: `$${project.budget.toLocaleString()}`,
      Description: project.description,
      ...project.customFields.reduce(
        (acc, field) => ({
          ...acc,
          [field.name]: field.value,
        }),
        {},
      ),
    }))

    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Projects")
    XLSX.writeFile(wb, "client-projects.xlsx")

    toast({
      title: "Excel Export Complete",
      description: "Your projects have been exported to Excel format.",
    })
  }

  const handleExportToWord = () => {
    let wordContent = `
      <html>
        <head>
          <title>Client Projects Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; border-bottom: 2px solid #007bff; }
            .project { margin-bottom: 30px; padding: 15px; border: 1px solid #ddd; }
            .status { padding: 4px 8px; border-radius: 4px; color: white; }
            .active { background-color: #28a745; }
            .completed { background-color: #007bff; }
            .pending { background-color: #ffc107; color: black; }
            .cancelled { background-color: #dc3545; }
          </style>
        </head>
        <body>
          <h1>Client Projects Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
    `

    projects.forEach((project) => {
      wordContent += `
        <div class="project">
          <h2>${project.name}</h2>
          <p><strong>Status:</strong> <span class="status ${project.status}">${project.status.toUpperCase()}</span></p>
          <p><strong>Start Date:</strong> ${project.startDate}</p>
          ${project.endDate ? `<p><strong>End Date:</strong> ${project.endDate}</p>` : ""}
          <p><strong>Budget:</strong> $${project.budget.toLocaleString()}</p>
          <p><strong>Description:</strong> ${project.description}</p>
          ${
            project.customFields.length > 0
              ? `
            <h3>Custom Fields:</h3>
            <ul>
              ${project.customFields.map((field) => `<li><strong>${field.name}:</strong> ${field.value}</li>`).join("")}
            </ul>
          `
              : ""
          }
        </div>
      `
    })

    wordContent += `
        </body>
      </html>
    `

    const blob = new Blob([wordContent], { type: "application/msword" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "client-projects.doc"
    link.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Word Export Complete",
      description: "Your projects have been exported to Word format.",
    })
  }

  const handleAddCustomField = (projectId: string) => {
    if (!newField.name || !newField.type) {
      toast({
        title: "Invalid Field",
        description: "Please provide field name and type.",
        variant: "destructive",
      })
      return
    }

    const customField: CustomField = {
      id: Date.now().toString(),
      name: newField.name,
      type: newField.type as CustomField["type"],
      value: newField.value || "",
      options: newField.options,
      required: newField.required || false,
    }

    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, customFields: [...project.customFields, customField] } : project,
      ),
    )

    setNewField({ name: "", type: "text", value: "", required: false })
    setIsAddingField(false)

    toast({
      title: "Custom Field Added",
      description: `Field "${customField.name}" has been added successfully.`,
    })
  }

  const handleUpdateCustomField = (projectId: string, fieldId: string, value: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              customFields: project.customFields.map((field) => (field.id === fieldId ? { ...field, value } : field)),
            }
          : project,
      ),
    )
  }

  const handleDeleteCustomField = (projectId: string, fieldId: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              customFields: project.customFields.filter((field) => field.id !== fieldId),
            }
          : project,
      ),
    )

    toast({
      title: "Field Deleted",
      description: "Custom field has been removed.",
    })
  }

  const handleCreateProject = () => {
    setIsCreatingProject(true)
    toast({
      title: "Create New Project",
      description: "Opening project creation form...",
    })
  }

  const handleSaveNewProject = () => {
    if (!newProject.name || !newProject.description || !newProject.startDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      budget: newProject.budget,
      startDate: newProject.startDate,
      status: newProject.status,
      customFields: [],
    }

    setProjects((prev) => [...prev, project])
    setNewProject({ name: "", description: "", budget: 0, startDate: "", status: "pending" })
    setIsCreatingProject(false)

    toast({
      title: "Project Created",
      description: `${project.name} has been created successfully.`,
    })
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setIsEditingProject(true)
    toast({
      title: "Editing Project",
      description: `Opening editor for ${project.name}`,
    })
  }

  const handleSaveEditProject = () => {
    if (!editingProject) return

    setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? editingProject : p)))
    setIsEditingProject(false)
    setEditingProject(null)

    toast({
      title: "Project Updated",
      description: `${editingProject.name} has been updated successfully.`,
    })
  }

  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId))
    toast({
      title: "Project Deleted",
      description: "Project has been removed successfully.",
    })
  }

  const handleViewProject = (project: Project) => {
    setSelectedProject(project)
    toast({
      title: "Viewing Project",
      description: `Opening details for ${project.name}`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderCustomField = (field: CustomField, projectId: string) => {
    switch (field.type) {
      case "select":
        return (
          <Select value={field.value} onValueChange={(value) => handleUpdateCustomField(projectId, field.id, value)}>
            <SelectTrigger className="responsive-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case "textarea":
        return (
          <Textarea
            value={field.value}
            onChange={(e) => handleUpdateCustomField(projectId, field.id, e.target.value)}
            placeholder={`Enter ${field.name}`}
            className="responsive-input"
          />
        )
      case "date":
        return (
          <Input
            type="date"
            value={field.value}
            onChange={(e) => handleUpdateCustomField(projectId, field.id, e.target.value)}
            className="responsive-input"
          />
        )
      case "number":
        return (
          <Input
            type="number"
            value={field.value}
            onChange={(e) => handleUpdateCustomField(projectId, field.id, e.target.value)}
            placeholder={`Enter ${field.name}`}
            className="responsive-input"
          />
        )
      default:
        return (
          <Input
            value={field.value}
            onChange={(e) => handleUpdateCustomField(projectId, field.id, e.target.value)}
            placeholder={`Enter ${field.name}`}
            className="responsive-input"
          />
        )
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile Header */}
      <div className="responsive-nav lg:hidden">
        <div className="flex justify-between items-center h-16 px-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">DigitronCX</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleExportToExcel} className="text-white">
              <FileSpreadsheet className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-700 bg-gray-800 p-4 space-y-2">
            <Button variant="ghost" onClick={handleExportToWord} className="w-full justify-start text-white">
              <FileType className="h-4 w-4 mr-2" />
              Export Word
            </Button>
            <Button onClick={logout} variant="ghost" className="w-full justify-start text-red-400">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block responsive-nav">
        <div className="responsive-container">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Enhanced Client Portal</h1>
                <p className="text-sm text-gray-400">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleExportToExcel} className="responsive-btn">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
              <Button variant="outline" onClick={handleExportToWord} className="responsive-btn">
                <FileType className="h-4 w-4 mr-2" />
                Export Word
              </Button>
              <Button onClick={logout} variant="outline" className="responsive-btn">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="responsive-container">
        <div className="responsive-content">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="responsive-card">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{user.name}</h2>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400">Account Type</div>
                  <div className="font-semibold text-white capitalize">{user.role}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Total Projects</div>
                  <div className="font-semibold text-white">{projects.length}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Active Projects</div>
                  <div className="font-semibold text-white">{projects.filter((p) => p.status === "active").length}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="projects" className="w-full">
              <div className="responsive-tabs">
                <TabsList className="responsive-tabs-list bg-gray-800 border-gray-700">
                  <TabsTrigger value="projects" className="responsive-tab">
                    <Building className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">My Projects</span>
                    <span className="sm:hidden">Projects</span>
                  </TabsTrigger>
                  <TabsTrigger value="submissions" className="responsive-tab">
                    <FileText className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Submissions</span>
                    <span className="sm:hidden">Submit</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="responsive-tab">
                    <Settings className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Settings</span>
                    <span className="sm:hidden">Config</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="projects" className="mt-6">
                <div className="responsive-card">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                    <div>
                      <h2 className="responsive-title">Project Management</h2>
                      <p className="responsive-subtitle">
                        Manage your projects with custom fields and export capabilities
                      </p>
                    </div>
                    <Button onClick={handleCreateProject} className="responsive-btn-primary w-full sm:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      New Project
                    </Button>
                  </div>

                  {/* Projects Display */}
                  {isMobile ? (
                    // Mobile Card Layout
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div key={project.id} className="mobile-table-card">
                          <div className="mobile-table-row">
                            <span className="mobile-table-label">Project</span>
                            <span className="mobile-table-value font-semibold">{project.name}</span>
                          </div>
                          <div className="mobile-table-row">
                            <span className="mobile-table-label">Status</span>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="mobile-table-row">
                            <span className="mobile-table-label">Budget</span>
                            <span className="mobile-table-value">${project.budget.toLocaleString()}</span>
                          </div>
                          <div className="mobile-table-row">
                            <span className="mobile-table-label">Start Date</span>
                            <span className="mobile-table-value">
                              {new Date(project.startDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="mobile-table-row">
                            <span className="mobile-table-label">Custom Fields</span>
                            <Badge variant="outline">{project.customFields.length} fields</Badge>
                          </div>
                          <div className="responsive-actions mt-4">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => handleViewProject(project)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="responsive-modal">
                                <DialogHeader>
                                  <DialogTitle>{project.name}</DialogTitle>
                                  <DialogDescription>{project.description}</DialogDescription>
                                </DialogHeader>
                                {/* Project details content */}
                              </DialogContent>
                            </Dialog>
                            <Button variant="outline" size="sm" onClick={() => handleEditProject(project)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteProject(project.id)}>
                              <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Desktop Table Layout
                    <div className="responsive-table-container">
                      <Table className="responsive-table">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Project</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>Custom Fields</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {projects.map((project) => (
                            <TableRow key={project.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium text-white">{project.name}</div>
                                  <div className="text-sm text-gray-400">{project.description}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(project.status)}>
                                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-white">${project.budget.toLocaleString()}</TableCell>
                              <TableCell className="text-white">
                                {new Date(project.startDate).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{project.customFields.length} fields</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="responsive-actions">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="ghost" size="sm" onClick={() => handleViewProject(project)}>
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="responsive-modal">
                                      <DialogHeader>
                                        <DialogTitle>{project.name}</DialogTitle>
                                        <DialogDescription>{project.description}</DialogDescription>
                                      </DialogHeader>
                                      {/* Project details content */}
                                    </DialogContent>
                                  </Dialog>
                                  <Button variant="ghost" size="sm" onClick={() => handleEditProject(project)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleDeleteProject(project.id)}>
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="submissions" className="mt-6">
                <div className="responsive-card">
                  <h2 className="responsive-title">Partnership Submissions</h2>
                  <p className="responsive-subtitle">Track your partnership applications and submissions</p>
                  <p className="text-gray-400 mt-4">Your partnership submissions will appear here.</p>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <div className="responsive-card">
                  <h2 className="responsive-title">Account Settings</h2>
                  <p className="responsive-subtitle">Manage your account preferences and settings</p>
                  <div className="responsive-spacing">
                    <div className="responsive-form">
                      <div>
                        <Label className="text-white">Full Name</Label>
                        <Input value={user.name} readOnly className="responsive-input" />
                      </div>
                      <div>
                        <Label className="text-white">Email Address</Label>
                        <Input value={user.email} readOnly className="responsive-input" />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Label className="text-white">Notification Preferences</Label>
                      <div className="space-y-3 mt-3">
                        <div className="flex items-center space-x-3">
                          <input type="checkbox" id="email-notifications" defaultChecked className="rounded" />
                          <Label htmlFor="email-notifications" className="text-gray-300">
                            Email notifications
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <input type="checkbox" id="project-updates" defaultChecked className="rounded" />
                          <Label htmlFor="project-updates" className="text-gray-300">
                            Project updates
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <input type="checkbox" id="marketing-emails" className="rounded" />
                          <Label htmlFor="marketing-emails" className="text-gray-300">
                            Marketing emails
                          </Label>
                        </div>
                      </div>
                    </div>
                    <Button className="responsive-btn-primary mt-6">Save Settings</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
