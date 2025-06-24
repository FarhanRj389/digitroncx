"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Trash2, Search, Filter, CheckCircle, XCircle, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PartnershipRequest {
  id: string
  companyName: string
  contactName: string
  email: string
  partnershipType: string
  status: "pending" | "approved" | "rejected" | "under-review"
  submittedDate: string
  expectedVolume: string
}

const mockRequests: PartnershipRequest[] = [
  {
    id: "1",
    companyName: "TechCorp Solutions",
    contactName: "John Smith",
    email: "john@techcorp.com",
    partnershipType: "Reseller Partner",
    status: "pending",
    submittedDate: "2024-01-20",
    expectedVolume: "6-15 projects",
  },
  {
    id: "2",
    companyName: "Digital Innovations Ltd",
    contactName: "Sarah Johnson",
    email: "sarah@digitalinnovations.com",
    partnershipType: "Technology Partner",
    status: "approved",
    submittedDate: "2024-01-18",
    expectedVolume: "16-30 projects",
  },
  {
    id: "3",
    companyName: "StartupHub Inc",
    contactName: "Mike Chen",
    email: "mike@startuphub.com",
    partnershipType: "Referral Partner",
    status: "under-review",
    submittedDate: "2024-01-15",
    expectedVolume: "1-5 projects",
  },
  {
    id: "4",
    companyName: "Global Ventures",
    contactName: "Lisa Brown",
    email: "lisa@globalventures.com",
    partnershipType: "Strategic Alliance",
    status: "rejected",
    submittedDate: "2024-01-12",
    expectedVolume: "30+ projects",
  },
]

export function PartnershipRequests() {
  const [requests, setRequests] = useState<PartnershipRequest[]>(mockRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()

  const [selectedRequest, setSelectedRequest] = useState<PartnershipRequest | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const handleViewDetails = (request: PartnershipRequest) => {
    setSelectedRequest(request)
    setIsViewModalOpen(true)
    toast({
      title: "Opening Details",
      description: `Loading detailed view for ${request.companyName}`,
    })
  }

  const handleExportData = () => {
    const csvContent = [
      ["Company Name", "Contact Name", "Email", "Partnership Type", "Status", "Expected Volume", "Submitted Date"],
      ...filteredRequests.map((req) => [
        req.companyName,
        req.contactName,
        req.email,
        req.partnershipType,
        req.status,
        req.expectedVolume,
        req.submittedDate,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "partnership-requests.csv"
    link.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Export Complete",
      description: "Partnership requests data exported to CSV successfully.",
    })
  }

  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false)
  const [selectedRequests, setSelectedRequests] = useState<string[]>([])

  const handleBulkActions = () => {
    setIsBulkModalOpen(true)
    toast({
      title: "Bulk Actions",
      description: "Opening bulk actions panel",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "under-review":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const handleStatusChange = (id: string, newStatus: "approved" | "rejected" | "under-review") => {
    setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req)))

    toast({
      title: "Status updated",
      description: `Partnership request has been ${newStatus}.`,
    })
  }

  const handleDelete = (id: string) => {
    setRequests((prev) => prev.filter((req) => req.id !== id))
    toast({
      title: "Request deleted",
      description: "Partnership request has been removed.",
    })
  }

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partnership Requests</CardTitle>
        <CardDescription>Manage and review all partnership applications</CardDescription>
        <div className="flex space-x-2 mt-2">
          <Button variant="outline" size="sm" onClick={handleExportData}>
            Export Data
          </Button>
          <Button variant="outline" size="sm" onClick={handleBulkActions}>
            Bulk Actions
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by company, contact, or email..."
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

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.companyName}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.contactName}</div>
                      <div className="text-sm text-gray-500">{request.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{request.partnershipType}</TableCell>
                  <TableCell>{request.expectedVolume}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(request.status)}>{getStatusText(request.status)}</Badge>
                  </TableCell>
                  <TableCell>{new Date(request.submittedDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetails(request)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {request.status === "pending" && (
                        <>
                          <Button variant="ghost" size="sm" onClick={() => handleStatusChange(request.id, "approved")}>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleStatusChange(request.id, "rejected")}>
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(request.id)}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests found</h3>
            <p className="text-gray-600">No partnership requests match your current filters.</p>
          </div>
        )}

        {/* Detailed View Modal */}
        {selectedRequest && (
          <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl">{selectedRequest.companyName}</DialogTitle>
                <DialogDescription className="text-gray-300">
                  Partnership Request Details - {selectedRequest.partnershipType}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 text-white">
                {/* Company Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-400">Company Information</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="text-sm text-gray-400">Company Name</label>
                        <p className="text-white font-medium">{selectedRequest.companyName}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400">Contact Person</label>
                        <p className="text-white font-medium">{selectedRequest.contactName}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400">Email Address</label>
                        <p className="text-blue-400">{selectedRequest.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-green-400">Partnership Details</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="text-sm text-gray-400">Partnership Type</label>
                        <p className="text-white font-medium">{selectedRequest.partnershipType}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400">Expected Volume</label>
                        <p className="text-white font-medium">{selectedRequest.expectedVolume}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400">Submission Date</label>
                        <p className="text-white font-medium">
                          {new Date(selectedRequest.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="border-t border-gray-700 pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <label className="text-sm text-gray-400">Current Status</label>
                      <Badge className={getStatusColor(selectedRequest.status)}>
                        {getStatusText(selectedRequest.status)}
                      </Badge>
                    </div>
                    <div className="flex space-x-3">
                      {selectedRequest.status === "pending" && (
                        <>
                          <Button
                            onClick={() => {
                              handleStatusChange(selectedRequest.id, "approved")
                              setIsViewModalOpen(false)
                            }}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => {
                              handleStatusChange(selectedRequest.id, "rejected")
                              setIsViewModalOpen(false)
                            }}
                            variant="destructive"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                      <Button
                        onClick={() => handleDelete(selectedRequest.id)}
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  )
}
