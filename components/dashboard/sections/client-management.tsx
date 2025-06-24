"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Edit, Mail, Phone, Building, Calendar, Filter, MoreHorizontal } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Client {
  id: string
  name: string
  email: string
  company: string
  phone: string
  status: "active" | "inactive" | "pending"
  partnershipType: string
  joinDate: string
  lastActivity: string
  projectsCount: number
  revenue: string
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@techcorp.com",
    company: "TechCorp Solutions",
    phone: "+1 (555) 123-4567",
    status: "active",
    partnershipType: "Reseller Partner",
    joinDate: "2024-01-15",
    lastActivity: "2024-01-20",
    projectsCount: 12,
    revenue: "$45,000",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@digitalinnovations.com",
    company: "Digital Innovations Ltd",
    phone: "+1 (555) 987-6543",
    status: "active",
    partnershipType: "Technology Partner",
    joinDate: "2024-01-10",
    lastActivity: "2024-01-19",
    projectsCount: 8,
    revenue: "$32,000",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@startuphub.com",
    company: "StartupHub Inc",
    phone: "+1 (555) 456-7890",
    status: "pending",
    partnershipType: "Referral Partner",
    joinDate: "2024-01-18",
    lastActivity: "2024-01-18",
    projectsCount: 0,
    revenue: "$0",
  },
  {
    id: "4",
    name: "Lisa Brown",
    email: "lisa@globalventures.com",
    company: "Global Ventures",
    phone: "+1 (555) 321-0987",
    status: "inactive",
    partnershipType: "Strategic Alliance",
    joinDate: "2023-12-01",
    lastActivity: "2024-01-10",
    projectsCount: 25,
    revenue: "$125,000",
  },
]

export function ClientManagement() {
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { toast } = useToast()

  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    partnershipType: "",
    notes: "",
  })

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [editClient, setEditClient] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    partnershipType: "",
    status: "",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddClient = () => {
    const client: Client = {
      id: Date.now().toString(),
      ...newClient,
      status: "pending",
      joinDate: new Date().toISOString().split("T")[0],
      lastActivity: new Date().toISOString().split("T")[0],
      projectsCount: 0,
      revenue: "$0",
    }

    setClients((prev) => [...prev, client])
    setNewClient({ name: "", email: "", company: "", phone: "", partnershipType: "", notes: "" })
    setIsAddDialogOpen(false)

    toast({
      title: "Client added successfully!",
      description: `${client.name} has been added to your client list.`,
    })
  }

  const handleDeleteClient = (id: string) => {
    setClients((prev) => prev.filter((client) => client.id !== id))
    toast({
      title: "Client removed",
      description: "Client has been removed from the system.",
    })
  }

  const handleEditClient = (client: Client) => {
    setSelectedClient(client)
    setEditClient({
      name: client.name,
      email: client.email,
      company: client.company,
      phone: client.phone,
      partnershipType: client.partnershipType,
      status: client.status,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateClient = () => {
    if (!selectedClient) return

    setClients((prev) =>
      prev.map((client) => (client.id === selectedClient.id ? { ...client, ...editClient } : client)),
    )

    setIsEditDialogOpen(false)
    setSelectedClient(null)

    toast({
      title: "Client updated successfully!",
      description: `${editClient.name}'s information has been updated.`,
    })
  }

  const handleStatusChange = (clientId: string, newStatus: string) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === clientId ? { ...client, status: newStatus as "active" | "inactive" | "pending" } : client,
      ),
    )

    toast({
      title: "Status updated",
      description: "Client status has been updated successfully.",
    })
  }

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || client.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600 mt-1">Manage your partnership clients and their information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>Create a new client profile</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Full Name</Label>
                <Input
                  id="clientName"
                  value={newClient.name}
                  onChange={(e) => setNewClient((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Email</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientCompany">Company</Label>
                <Input
                  id="clientCompany"
                  value={newClient.company}
                  onChange={(e) => setNewClient((prev) => ({ ...prev, company: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientPhone">Phone</Label>
                <Input
                  id="clientPhone"
                  value={newClient.phone}
                  onChange={(e) => setNewClient((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnershipType">Partnership Type</Label>
                <Select
                  value={newClient.partnershipType}
                  onValueChange={(value) => setNewClient((prev) => ({ ...prev, partnershipType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reseller">Reseller Partner</SelectItem>
                    <SelectItem value="referral">Referral Partner</SelectItem>
                    <SelectItem value="technology">Technology Partner</SelectItem>
                    <SelectItem value="strategic">Strategic Alliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  rows={3}
                  value={newClient.notes}
                  onChange={(e) => setNewClient((prev) => ({ ...prev, notes: e.target.value }))}
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddClient}>Add Client</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {/* Edit Client Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Client</DialogTitle>
              <DialogDescription>Update client information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editClientName">Full Name</Label>
                <Input
                  id="editClientName"
                  value={editClient.name}
                  onChange={(e) => setEditClient((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editClientEmail">Email</Label>
                <Input
                  id="editClientEmail"
                  type="email"
                  value={editClient.email}
                  onChange={(e) => setEditClient((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editClientCompany">Company</Label>
                <Input
                  id="editClientCompany"
                  value={editClient.company}
                  onChange={(e) => setEditClient((prev) => ({ ...prev, company: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editClientPhone">Phone</Label>
                <Input
                  id="editClientPhone"
                  value={editClient.phone}
                  onChange={(e) => setEditClient((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editPartnershipType">Partnership Type</Label>
                <Select
                  value={editClient.partnershipType}
                  onValueChange={(value) => setEditClient((prev) => ({ ...prev, partnershipType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Reseller Partner">Reseller Partner</SelectItem>
                    <SelectItem value="Referral Partner">Referral Partner</SelectItem>
                    <SelectItem value="Technology Partner">Technology Partner</SelectItem>
                    <SelectItem value="Strategic Alliance">Strategic Alliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editClientStatus">Status</Label>
                <Select
                  value={editClient.status}
                  onValueChange={(value) => setEditClient((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateClient}>Update Client</Button>
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
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-3xl font-bold text-gray-900">{clients.length}</p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-3xl font-bold text-green-600">
                  {clients.filter((c) => c.status === "active").length}
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-purple-600">$202K</p>
              </div>
              <div className="text-sm text-green-600">+18%</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Projects</p>
                <p className="text-3xl font-bold text-orange-600">11.3</p>
              </div>
              <div className="text-sm text-green-600">+5%</div>
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
                placeholder="Search clients..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Client Directory</CardTitle>
          <CardDescription>Complete list of all partnership clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Partnership Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{client.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {client.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{client.company}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {client.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{client.partnershipType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(client.status)}>
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{client.projectsCount}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-green-600">{client.revenue}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(client.lastActivity).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditClient(client)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleStatusChange(client.id, "active")}>
                              Mark as Active
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(client.id, "inactive")}>
                              Mark as Inactive
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(client.id, "pending")}>
                              Mark as Pending
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClient(client.id)}>
                              Delete Client
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
