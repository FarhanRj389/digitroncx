"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Calendar, Building, User } from "lucide-react"

interface Submission {
  id: string
  companyName: string
  partnershipType: string
  status: "pending" | "approved" | "rejected" | "under-review"
  submittedDate: string
  lastUpdated: string
}

const mockSubmissions: Submission[] = [
  {
    id: "1",
    companyName: "TechCorp Solutions",
    partnershipType: "Reseller Partner",
    status: "under-review",
    submittedDate: "2024-01-15",
    lastUpdated: "2024-01-18",
  },
  {
    id: "2",
    companyName: "Digital Innovations Ltd",
    partnershipType: "Technology Partner",
    status: "approved",
    submittedDate: "2024-01-10",
    lastUpdated: "2024-01-12",
  },
  {
    id: "3",
    companyName: "StartupHub Inc",
    partnershipType: "Referral Partner",
    status: "pending",
    submittedDate: "2024-01-20",
    lastUpdated: "2024-01-20",
  },
]

export function MySubmissions() {
  const [submissions] = useState<Submission[]>(mockSubmissions)

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

  if (submissions.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No submissions yet</h3>
          <p className="text-gray-600 mb-4">You haven't submitted any partnership requests yet.</p>
          <Button>Submit Your First Partnership Request</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Partnership Submissions</h2>
        <Badge variant="secondary">{submissions.length} Total</Badge>
      </div>

      <div className="grid gap-6">
        {submissions.map((submission) => (
          <Card key={submission.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-gray-600" />
                    <span>{submission.companyName}</span>
                  </CardTitle>
                  <CardDescription className="mt-1">{submission.partnershipType}</CardDescription>
                </div>
                <Badge className={getStatusColor(submission.status)}>{getStatusText(submission.status)}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Submitted: {new Date(submission.submittedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>Updated: {new Date(submission.lastUpdated).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>

              {submission.status === "approved" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-800">
                    🎉 Congratulations! Your partnership has been approved. Our team will contact you within 24 hours.
                  </p>
                </div>
              )}

              {submission.status === "under-review" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    ⏳ Your application is currently under review. We'll update you within 48 hours.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
