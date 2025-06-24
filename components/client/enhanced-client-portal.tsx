"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
            <SelectTrigger>
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
          />
        )
      case "date":
        return (
          <Input
            type="date"
            value={field.value}
            onChange={(e) => handleUpdateCustomField(projectId, field.id, e.target.value)}
          />
        )
      case "number":
        return (
          <Input
            type="number"
            value={field.value}
            onChange={(e) => handleUpdateCustomField(projectId, field.id, e.target.value)}
            placeholder={`Enter ${field.name}`}
          />
        )
      default:
        return (
          <Input
            value={field.value}
            onChange={(e) => handleUpdateCustomField(projectId, field.id, e.target.value)}
            placeholder={`Enter ${field.name}`}
          />
        )
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Enhanced Client Portal</h1>
              <p className="text-gray-600">Welcome back, {user.name}</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleExportToExcel}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
              <Button variant="outline" onClick={handleExportToWord}>
                <FileType className="h-4 w-4 mr-2" />
                Export Word
              </Button>
              <Button onClick={logout} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Account Type</div>
                    <div className="font-semibold capitalize">{user.role}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total Projects</div>
                    <div className="font-semibold">{projects.length}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Active Projects</div>
                    <div className="font-semibold">{projects.filter((p) => p.status === "active").length}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="projects" className="flex items-center space-x-2">
                  <Building className="h-4 w-4" />
                  <span>My Projects</span>
                </TabsTrigger>
                <TabsTrigger value="submissions" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Submissions</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Project Management</CardTitle>
                        <CardDescription>
                          Manage your projects with custom fields and export capabilities
                        </CardDescription>
                      </div>
                      <Button onClick={handleCreateProject}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Project
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* New Project Creation Form */}
                    {isCreatingProject && (
                      <Card className="mb-6">
                        <CardHeader>
                          <CardTitle>Create New Project</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Project Name *</Label>
                              <Input
                                value={newProject.name}
                                onChange={(e) => setNewProject((prev) => ({ ...prev, name: e.target.value }))}
                                placeholder="Enter project name"
                              />
                            </div>
                            <div>
                              <Label>Budget</Label>
                              <Input
                                type="number"
                                value={newProject.budget}
                                onChange={(e) => setNewProject((prev) => ({ ...prev, budget: Number(e.target.value) }))}
                                placeholder="Enter budget"
                              />
                            </div>
                            <div>
                              <Label>Start Date *</Label>
                              <Input
                                type="date"
                                value={newProject.startDate}
                                onChange={(e) => setNewProject((prev) => ({ ...prev, startDate: e.target.value }))}
                              />
                            </div>
                            <div>
                              <Label>Status</Label>
                              <Select
                                value={newProject.status}
                                onValueChange={(value) => setNewProject((prev) => ({ ...prev, status: value as any }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="col-span-2">
                              <Label>Description *</Label>
                              <Textarea
                                value={newProject.description}
                                onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                                placeholder="Enter project description"
                              />
                            </div>
                            <div className="col-span-2 flex space-x-2">
                              <Button onClick={handleSaveNewProject}>Create Project</Button>
                              <Button variant="outline" onClick={() => setIsCreatingProject(false)}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Edit Project Form */}
                    {isEditingProject && editingProject && (
                      <Card className="mb-6">
                        <CardHeader>
                          <CardTitle>Edit Project: {editingProject.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Project Name *</Label>
                              <Input
                                value={editingProject.name}
                                onChange={(e) =>
                                  setEditingProject((prev) => (prev ? { ...prev, name: e.target.value } : null))
                                }
                                placeholder="Enter project name"
                              />
                            </div>
                            <div>
                              <Label>Budget</Label>
                              <Input
                                type="number"
                                value={editingProject.budget}
                                onChange={(e) =>
                                  setEditingProject((prev) =>
                                    prev ? { ...prev, budget: Number(e.target.value) } : null,
                                  )
                                }
                                placeholder="Enter budget"
                              />
                            </div>
                            <div>
                              <Label>Start Date *</Label>
                              <Input
                                type="date"
                                value={editingProject.startDate}
                                onChange={(e) =>
                                  setEditingProject((prev) => (prev ? { ...prev, startDate: e.target.value } : null))
                                }
                              />
                            </div>
                            <div>
                              <Label>Status</Label>
                              <Select
                                value={editingProject.status}
                                onValueChange={(value) =>
                                  setEditingProject((prev) => (prev ? { ...prev, status: value as any } : null))
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="col-span-2">
                              <Label>Description *</Label>
                              <Textarea
                                value={editingProject.description}
                                onChange={(e) =>
                                  setEditingProject((prev) => (prev ? { ...prev, description: e.target.value } : null))
                                }
                                placeholder="Enter project description"
                              />
                            </div>
                            <div className="col-span-2 flex space-x-2">
                              <Button onClick={handleSaveEditProject}>Save Changes</Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setIsEditingProject(false)
                                  setEditingProject(null)
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Projects Table */}
                    <div className="rounded-md border">
                      <Table>
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
                                  <div className="font-medium">{project.name}</div>
                                  <div className="text-sm text-gray-500">{project.description}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(project.status)}>
                                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>${project.budget.toLocaleString()}</TableCell>
                              <TableCell>{new Date(project.startDate).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{project.customFields.length} fields</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="ghost" size="sm" onClick={() => handleViewProject(project)}>
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl">
                                      <DialogHeader>
                                        <DialogTitle>{project.name}</DialogTitle>
                                        <DialogDescription>{project.description}</DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-6">
                                        {/* Project Details */}
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <Label>Status</Label>
                                            <Badge className={getStatusColor(project.status)}>
                                              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                            </Badge>
                                          </div>
                                          <div>
                                            <Label>Budget</Label>
                                            <p>${project.budget.toLocaleString()}</p>
                                          </div>
                                          <div>
                                            <Label>Start Date</Label>
                                            <p>{new Date(project.startDate).toLocaleDateString()}</p>
                                          </div>
                                          {project.endDate && (
                                            <div>
                                              <Label>End Date</Label>
                                              <p>{new Date(project.endDate).toLocaleDateString()}</p>
                                            </div>
                                          )}
                                        </div>

                                        {/* Custom Fields Section */}
                                        <div>
                                          <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-semibold">Custom Fields</h3>
                                            <Button variant="outline" size="sm" onClick={() => setIsAddingField(true)}>
                                              <Plus className="h-4 w-4 mr-2" />
                                              Add Field
                                            </Button>
                                          </div>

                                          {isAddingField && (
                                            <Card className="mb-4">
                                              <CardContent className="pt-6">
                                                <div className="grid grid-cols-2 gap-4">
                                                  <div>
                                                    <Label>Field Name</Label>
                                                    <Input
                                                      value={newField.name}
                                                      onChange={(e) =>
                                                        setNewField((prev) => ({ ...prev, name: e.target.value }))
                                                      }
                                                      placeholder="Enter field name"
                                                    />
                                                  </div>
                                                  <div>
                                                    <Label>Field Type</Label>
                                                    <Select
                                                      value={newField.type}
                                                      onValueChange={(value) =>
                                                        setNewField((prev) => ({
                                                          ...prev,
                                                          type: value as CustomField["type"],
                                                        }))
                                                      }
                                                    >
                                                      <SelectTrigger>
                                                        <SelectValue />
                                                      </SelectTrigger>
                                                      <SelectContent>
                                                        <SelectItem value="text">Text</SelectItem>
                                                        <SelectItem value="number">Number</SelectItem>
                                                        <SelectItem value="date">Date</SelectItem>
                                                        <SelectItem value="select">Select</SelectItem>
                                                        <SelectItem value="textarea">Textarea</SelectItem>
                                                      </SelectContent>
                                                    </Select>
                                                  </div>
                                                  {newField.type === "select" && (
                                                    <div className="col-span-2">
                                                      <Label>Options (comma separated)</Label>
                                                      <Input
                                                        placeholder="Option 1, Option 2, Option 3"
                                                        onChange={(e) =>
                                                          setNewField((prev) => ({
                                                            ...prev,
                                                            options: e.target.value.split(",").map((s) => s.trim()),
                                                          }))
                                                        }
                                                      />
                                                    </div>
                                                  )}
                                                  <div className="col-span-2 flex space-x-2">
                                                    <Button onClick={() => handleAddCustomField(project.id)}>
                                                      Add Field
                                                    </Button>
                                                    <Button variant="outline" onClick={() => setIsAddingField(false)}>
                                                      Cancel
                                                    </Button>
                                                  </div>
                                                </div>
                                              </CardContent>
                                            </Card>
                                          )}

                                          <div className="space-y-4">
                                            {project.customFields.map((field) => (
                                              <div key={field.id} className="flex items-center space-x-4">
                                                <div className="flex-1">
                                                  <Label>
                                                    {field.name}{" "}
                                                    {field.required && <span className="text-red-500">*</span>}
                                                  </Label>
                                                  {renderCustomField(field, project.id)}
                                                </div>
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  onClick={() => handleDeleteCustomField(project.id, field.id)}
                                                >
                                                  <Trash2 className="h-4 w-4 text-red-600" />
                                                </Button>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                  <Button variant="ghost" size="sm" onClick={() => handleEditProject(project)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleDeleteProject(project.id)}>
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="submissions" className="mt-6">
                {/* Existing submissions content */}
                <Card>
                  <CardHeader>
                    <CardTitle>Partnership Submissions</CardTitle>
                    <CardDescription>Track your partnership applications and submissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Your partnership submissions will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences and settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Full Name</Label>
                          <Input value={user.name} readOnly />
                        </div>
                        <div>
                          <Label>Email Address</Label>
                          <Input value={user.email} readOnly />
                        </div>
                      </div>
                      <div>
                        <Label>Notification Preferences</Label>
                        <div className="space-y-2 mt-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="email-notifications" defaultChecked />
                            <Label htmlFor="email-notifications">Email notifications</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="project-updates" defaultChecked />
                            <Label htmlFor="project-updates">Project updates</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="marketing-emails" />
                            <Label htmlFor="marketing-emails">Marketing emails</Label>
                          </div>
                        </div>
                      </div>
                      <Button>Save Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
