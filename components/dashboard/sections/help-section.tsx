"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"
import {
  HelpCircle,
  MessageCircle,
  Book,
  Video,
  Search,
  Send,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  FileText,
  Settings,
} from "lucide-react"

const faqs = [
  {
    question: "How do I create a new project?",
    answer:
      "To create a new project, navigate to the Projects section and click the 'New Project' button. Fill in the required details including project name, client information, and budget.",
  },
  {
    question: "How can I manage payment methods?",
    answer:
      "Go to Settings > Business > Payment Gateways to configure your payment methods. You can enable/disable Stripe, PayPal, and other payment processors.",
  },
  {
    question: "How do I set up automations?",
    answer:
      "Visit the Automation Center to create automated workflows. Choose from pre-built templates or create custom automations based on triggers and actions.",
  },
  {
    question: "Can I customize invoice templates?",
    answer:
      "Yes, you can customize invoice templates in Settings > Business. You can modify the invoice prefix, payment terms, and add your company branding.",
  },
  {
    question: "How do I track project progress?",
    answer:
      "Project progress is tracked automatically based on milestones and tasks completed. You can view detailed progress reports in the Projects section.",
  },
]

const supportTickets = [
  {
    id: "TICK-001",
    subject: "Payment gateway integration issue",
    status: "open",
    priority: "high",
    created: "2024-01-20T10:30:00Z",
    lastUpdate: "2024-01-20T14:20:00Z",
  },
  {
    id: "TICK-002",
    subject: "Question about automation setup",
    status: "resolved",
    priority: "medium",
    created: "2024-01-19T09:15:00Z",
    lastUpdate: "2024-01-19T16:45:00Z",
  },
  {
    id: "TICK-003",
    subject: "Feature request: Custom reports",
    status: "in-progress",
    priority: "low",
    created: "2024-01-18T11:20:00Z",
    lastUpdate: "2024-01-19T10:30:00Z",
  },
]

export function HelpSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  })
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setTicketForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmitTicket = () => {
    if (!ticketForm.subject || !ticketForm.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Support ticket created!",
      description: "We'll get back to you within 24 hours.",
    })

    setTicketForm({
      subject: "",
      category: "",
      priority: "",
      description: "",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
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

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600 mt-1">Get help and support for your DigitronCX platform</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 mb-3">Chat with our support team</p>
            <Button size="sm" className="w-full">
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-sm text-gray-600 mb-3">Call us directly</p>
            <Button size="sm" variant="outline" className="w-full">
              +1 (555) 123-4567
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-gray-600 mb-3">Send us an email</p>
            <Button size="sm" variant="outline" className="w-full">
              support@digitroncx.com
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Video className="h-8 w-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Video Tutorials</h3>
            <p className="text-sm text-gray-600 mb-3">Watch how-to videos</p>
            <Button size="sm" variant="outline" className="w-full">
              View Tutorials
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Find answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No FAQs found</h3>
                  <p className="text-gray-600">Try adjusting your search terms.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Create Ticket */}
            <Card>
              <CardHeader>
                <CardTitle>Create Support Ticket</CardTitle>
                <CardDescription>Submit a new support request</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={ticketForm.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={ticketForm.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="general">General Question</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={ticketForm.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={ticketForm.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Provide detailed information about your issue..."
                  />
                </div>

                <Button onClick={handleSubmitTicket} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Ticket
                </Button>
              </CardContent>
            </Card>

            {/* Existing Tickets */}
            <Card>
              <CardHeader>
                <CardTitle>Your Support Tickets</CardTitle>
                <CardDescription>Track your support requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                          <p className="text-sm text-gray-600">#{ticket.id}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Badge>
                          <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority.toUpperCase()}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Created: {new Date(ticket.created).toLocaleDateString()}</span>
                        <span>Updated: {new Date(ticket.lastUpdate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Book className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">Getting Started Guide</h3>
                <p className="text-sm text-gray-600 mb-4">Learn the basics of using DigitronCX platform</p>
                <Button variant="outline" size="sm">
                  Read Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <FileText className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="font-semibold mb-2">API Documentation</h3>
                <p className="text-sm text-gray-600 mb-4">Integrate with our REST API</p>
                <Button variant="outline" size="sm">
                  View API Docs
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Video className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="font-semibold mb-2">Video Tutorials</h3>
                <p className="text-sm text-gray-600 mb-4">Step-by-step video guides</p>
                <Button variant="outline" size="sm">
                  Watch Videos
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Settings className="h-8 w-8 text-orange-600 mb-4" />
                <h3 className="font-semibold mb-2">Configuration Guide</h3>
                <p className="text-sm text-gray-600 mb-4">Configure your platform settings</p>
                <Button variant="outline" size="sm">
                  View Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <HelpCircle className="h-8 w-8 text-teal-600 mb-4" />
                <h3 className="font-semibold mb-2">Troubleshooting</h3>
                <p className="text-sm text-gray-600 mb-4">Common issues and solutions</p>
                <Button variant="outline" size="sm">
                  Get Help
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <CheckCircle className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="font-semibold mb-2">Best Practices</h3>
                <p className="text-sm text-gray-600 mb-4">Tips for optimal platform usage</p>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Get in touch with our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone Support</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9 AM - 6 PM EST</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Support</h3>
                    <p className="text-gray-600">support@digitroncx.com</p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Live Chat</h3>
                    <p className="text-gray-600">Available 24/7</p>
                    <p className="text-sm text-gray-500">Instant support</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday</p>
                    <p className="text-sm text-gray-500">9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Support Hours by Region</CardTitle>
                <CardDescription>Our global support coverage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">North America</h3>
                      <p className="text-sm text-gray-600">USA, Canada</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">9 AM - 6 PM EST</p>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Europe</h3>
                      <p className="text-sm text-gray-600">UK, Germany, France</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">9 AM - 5 PM GMT</p>
                      <Badge className="bg-yellow-100 text-yellow-800">Limited</Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Asia Pacific</h3>
                      <p className="text-sm text-gray-600">Australia, New Zealand</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">9 AM - 5 PM AEST</p>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">South Asia</h3>
                      <p className="text-sm text-gray-600">Pakistan, India</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">9 AM - 6 PM PKT</p>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
