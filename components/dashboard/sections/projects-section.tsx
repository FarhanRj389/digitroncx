"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  Clock,
  Building,
  Target,
  TrendingUp,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Copy, FileText, Bell, Pause, Trash2 } from "lucide-react"

interface Project {
  id: string
  name: string
  client: string
  status: "planning" | "in-progress" | "review" | "completed" | "on-hold"
  progress: number
  budget: number
  spent: number
  startDate: string
  endDate: string
  team: string[]
  description: string
  priority: "low" | "medium" | "high"
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "E-commerce Platform",
    client: "TechCorp Solutions",
    status: "in-progress",
    progress: 65,
    budget: 15000,
    spent: 9750,
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    team: ["John Doe", "Sarah Smith", "Mike Johnson"],
    description: "Complete e-commerce platform with payment integration",
    priority: "high",
  },
  {
    id: "2",
    name: "Corporate Website",
    client: "Digital Innovations Ltd",
    status: "review",
    progress: 90,
    budget: 8000,
    spent: 7200,
    startDate: "2024-01-10",
    endDate: "2024-02-28",
    team: ["Alice Brown", "David Wilson"],
    description: "Modern corporate website with CMS",
    priority: "medium",
  },
  {
    id: "3",
    name: "Mobile App Development",
    client: "StartupHub Inc",
    status: "planning",
    progress: 15,
    budget: 25000,
    spent: 3750,
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    team: ["Emma Davis", "Tom Anderson", "Lisa Garcia"],
    description: "Cross-platform mobile application",
    priority: "high",
  },
  {
    id: "4",
    name: "Portfolio Website",
    client: "Creative Agency",
    status: "completed",
    progress: 100,
    budget: 5000,
    spent: 4800,
    startDate: "2023-12-01",
    endDate: "2024-01-15",
    team: ["Chris Lee"],
    description: "Creative portfolio showcase website",
    priority: "low",
  },
]

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { toast } = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "review":
        return "bg-purple-100 text-purple-800"
      case "planning":
        return "bg-yellow-100 text-yellow-800"
      case "on-hold":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === "in-progress").length,
    completed: projects.filter((p) => p.status === "completed").length,
    planning: projects.filter((p) => p.status === "planning").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all partnership projects</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Add a new project to track</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input id="projectName" placeholder="Enter project name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input id="client" placeholder="Client name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input id="budget" type="number" placeholder="Project budget" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Project description" />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Create Project</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-3xl font-bold text-gray-900">{statusCounts.total}</p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-blue-600">{statusCounts.inProgress}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600">{statusCounts.completed}</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-purple-600">$53K</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
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
                placeholder="Search projects..."
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
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                    <Badge className={getPriorityColor(project.priority)}>{project.priority.toUpperCase()}</Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{project.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      {project.client}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(project.startDate).toLocaleDateString()} -{" "}
                      {new Date(project.endDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {project.team.length} members
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" title="View Project Details">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{project.name} - Project Details</DialogTitle>
                        <DialogDescription>Complete project information and progress</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Client</Label>
                            <p className="text-lg font-semibold">{project.client}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Status</Label>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            </Badge>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Budget</Label>
                            <p className="text-lg font-semibold">${project.budget.toLocaleString()}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Spent</Label>
                            <p className="text-lg font-semibold">${project.spent.toLocaleString()}</p>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Description</Label>
                          <p className="mt-1">{project.description}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Progress</Label>
                          <div className="mt-2">
                            <Progress value={project.progress} className="h-3" />
                            <p className="text-sm text-gray-500 mt-1">{project.progress}% Complete</p>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Team Members</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.team.map((member, index) => (
                              <Badge key={index} variant="secondary">
                                {member}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" title="Edit Project">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Edit Project</DialogTitle>
                        <DialogDescription>Update project information</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="editProjectName">Project Name</Label>
                          <Input id="editProjectName" defaultValue={project.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="editClient">Client</Label>
                          <Input id="editClient" defaultValue={project.client} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="editStatus">Status</Label>
                          <Select defaultValue={project.status}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="planning">Planning</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="review">Review</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="on-hold">On Hold</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="editBudget">Budget</Label>
                          <Input id="editBudget" type="number" defaultValue={project.budget} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="editProgress">Progress (%)</Label>
                          <Input id="editProgress" type="number" min="0" max="100" defaultValue={project.progress} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="editDescription">Description</Label>
                          <Textarea id="editDescription" defaultValue={project.description} />
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                          <DialogTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogTrigger>
                          <Button
                            onClick={() => {
                              toast({
                                title: "Project Updated",
                                description: `${project.name} has been updated successfully.`,
                              })
                            }}
                          >
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" title="More Actions">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        onClick={() => {
                          toast({
                            title: "Project Duplicated",
                            description: `${project.name} has been duplicated successfully.`,
                          })
                        }}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate Project
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          toast({
                            title: "Report Generated",
                            description: `Project report for ${project.name} is being generated.`,
                          })
                        }}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Report
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          toast({
                            title: "Team Notified",
                            description: `All team members have been notified about ${project.name}.`,
                          })
                        }}
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        Notify Team
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          const updatedProjects = projects.map((p) =>
                            p.id === project.id ? { ...p, status: "on-hold" as const } : p,
                          )
                          setProjects(updatedProjects)
                          toast({
                            title: "Project On Hold",
                            description: `${project.name} has been put on hold.`,
                            variant: "destructive",
                          })
                        }}
                      >
                        <Pause className="h-4 w-4 mr-2" />
                        Put On Hold
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => {
                          const updatedProjects = projects.filter((p) => p.id !== project.id)
                          setProjects(updatedProjects)
                          toast({
                            title: "Project Deleted",
                            description: `${project.name} has been deleted successfully.`,
                            variant: "destructive",
                          })
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Progress</span>
                    <span className="text-sm font-bold">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Budget */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Budget</span>
                    <span className="text-sm font-bold">${project.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Spent: ${project.spent.toLocaleString()}</span>
                    <span>Remaining: ${(project.budget - project.spent).toLocaleString()}</span>
                  </div>
                  <Progress value={(project.spent / project.budget) * 100} className="h-2 mt-1" />
                </div>

                {/* Team */}
                <div>
                  <span className="text-sm font-medium text-gray-600 block mb-2">Team Members</span>
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, index) => (
                      <Avatar key={index} className="h-8 w-8 border-2 border-white">
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                          {member
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 3 && (
                      <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                        +{project.team.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">No projects match your current filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
