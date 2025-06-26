"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Building, User, DollarSign, Target, Award } from "lucide-react"

interface ApplyNowModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ApplyNowModal({ isOpen, onClose }: ApplyNowModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    linkedIn: "",

    // Company Information
    companyName: "",
    companyWebsite: "",
    companySize: "",
    industry: "",
    annualRevenue: "",
    yearsInBusiness: "",
    companyDescription: "",

    // Partnership Details
    partnershipType: "",
    expectedVolume: "",
    targetMarkets: [],
    currentClients: "",
    competitiveAdvantage: "",
    marketingBudget: "",
    salesTeamSize: "",

    // Experience & Capabilities
    previousPartnerships: "",
    technicalExpertise: [],
    certifications: "",
    caseStudies: "",

    // Goals & Expectations
    partnershipGoals: "",
    expectedROI: "",
    timelineExpectations: "",
    supportNeeds: [],

    // Additional Information
    hearAboutUs: "",
    additionalComments: "",
    agreeToTerms: false,
    agreeToMarketing: false,
  })

  const totalSteps = 5

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter((item) => item !== value),
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Application Submitted Successfully! 🎉",
      description: "We'll review your application and get back to you within 24 hours.",
    })

    setIsSubmitting(false)
    onClose()

    // Reset form
    setCurrentStep(1)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      linkedIn: "",
      companyName: "",
      companyWebsite: "",
      companySize: "",
      industry: "",
      annualRevenue: "",
      yearsInBusiness: "",
      companyDescription: "",
      partnershipType: "",
      expectedVolume: "",
      targetMarkets: [],
      currentClients: "",
      competitiveAdvantage: "",
      marketingBudget: "",
      salesTeamSize: "",
      previousPartnerships: "",
      technicalExpertise: [],
      certifications: "",
      caseStudies: "",
      partnershipGoals: "",
      expectedROI: "",
      timelineExpectations: "",
      supportNeeds: [],
      hearAboutUs: "",
      additionalComments: "",
      agreeToTerms: false,
      agreeToMarketing: false,
    })
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">Position/Title *</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                <Input
                  id="linkedIn"
                  placeholder="https://linkedin.com/in/..."
                  value={formData.linkedIn}
                  onChange={(e) => handleInputChange("linkedIn", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Building className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900">Company Information</h3>
              <p className="text-gray-600">Tell us about your company</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyWebsite">Company Website</Label>
                <Input
                  id="companyWebsite"
                  placeholder="https://..."
                  value={formData.companyWebsite}
                  onChange={(e) => handleInputChange("companyWebsite", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companySize">Company Size *</Label>
                <Select value={formData.companySize} onValueChange={(value) => handleInputChange("companySize", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-1000">201-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="annualRevenue">Annual Revenue</Label>
                <Select
                  value={formData.annualRevenue}
                  onValueChange={(value) => handleInputChange("annualRevenue", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select revenue range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1m">Under $1M</SelectItem>
                    <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                    <SelectItem value="5m-25m">$5M - $25M</SelectItem>
                    <SelectItem value="25m-100m">$25M - $100M</SelectItem>
                    <SelectItem value="over-100m">Over $100M</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearsInBusiness">Years in Business</Label>
                <Select
                  value={formData.yearsInBusiness}
                  onValueChange={(value) => handleInputChange("yearsInBusiness", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="11-20">11-20 years</SelectItem>
                    <SelectItem value="20+">20+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyDescription">Company Description *</Label>
              <Textarea
                id="companyDescription"
                rows={3}
                placeholder="Describe your company, services, and target market..."
                value={formData.companyDescription}
                onChange={(e) => handleInputChange("companyDescription", e.target.value)}
                required
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900">Partnership Details</h3>
              <p className="text-gray-600">What type of partnership are you looking for?</p>
            </div>

            <div className="space-y-4">
              <Label>Partnership Type *</Label>
              <RadioGroup
                value={formData.partnershipType}
                onValueChange={(value) => handleInputChange("partnershipType", value)}
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="reseller" id="reseller" />
                  <Label htmlFor="reseller" className="flex-1 cursor-pointer">
                    <div className="font-medium">Reseller Partner</div>
                    <div className="text-sm text-gray-600">Sell our services to your clients</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="referral" id="referral" />
                  <Label htmlFor="referral" className="flex-1 cursor-pointer">
                    <div className="font-medium">Referral Partner</div>
                    <div className="text-sm text-gray-600">Refer clients and earn commissions</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="technology" id="technology" />
                  <Label htmlFor="technology" className="flex-1 cursor-pointer">
                    <div className="font-medium">Technology Partner</div>
                    <div className="text-sm text-gray-600">Integrate our solutions with yours</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="strategic" id="strategic" />
                  <Label htmlFor="strategic" className="flex-1 cursor-pointer">
                    <div className="font-medium">Strategic Alliance</div>
                    <div className="text-sm text-gray-600">Long-term strategic partnership</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expectedVolume">Expected Monthly Volume</Label>
                <Select
                  value={formData.expectedVolume}
                  onValueChange={(value) => handleInputChange("expectedVolume", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select expected volume" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1-5 projects</SelectItem>
                    <SelectItem value="6-15">6-15 projects</SelectItem>
                    <SelectItem value="16-30">16-30 projects</SelectItem>
                    <SelectItem value="30+">30+ projects</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="marketingBudget">Monthly Marketing Budget</Label>
                <Select
                  value={formData.marketingBudget}
                  onValueChange={(value) => handleInputChange("marketingBudget", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-5k">Under $5K</SelectItem>
                    <SelectItem value="5k-15k">$5K - $15K</SelectItem>
                    <SelectItem value="15k-50k">$15K - $50K</SelectItem>
                    <SelectItem value="over-50k">Over $50K</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Target Markets (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3">
                {["Small Business", "Enterprise", "Government", "Healthcare", "Education", "Non-profit"].map(
                  (market) => (
                    <div key={market} className="flex items-center space-x-2">
                      <Checkbox
                        id={market}
                        checked={formData.targetMarkets.includes(market)}
                        onCheckedChange={(checked) => handleArrayChange("targetMarkets", market, checked as boolean)}
                      />
                      <Label htmlFor={market} className="text-sm">
                        {market}
                      </Label>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="competitiveAdvantage">What's your competitive advantage? *</Label>
              <Textarea
                id="competitiveAdvantage"
                rows={3}
                placeholder="Describe what sets you apart from competitors..."
                value={formData.competitiveAdvantage}
                onChange={(e) => handleInputChange("competitiveAdvantage", e.target.value)}
                required
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900">Experience & Capabilities</h3>
              <p className="text-gray-600">Tell us about your expertise</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="previousPartnerships">Previous Partnership Experience</Label>
              <Textarea
                id="previousPartnerships"
                rows={3}
                placeholder="Describe your experience with other partnerships..."
                value={formData.previousPartnerships}
                onChange={(e) => handleInputChange("previousPartnerships", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Technical Expertise (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Web Development",
                  "Mobile Apps",
                  "Cloud Solutions",
                  "AI/ML",
                  "Cybersecurity",
                  "DevOps",
                  "UI/UX Design",
                  "Digital Marketing",
                ].map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={formData.technicalExpertise.includes(skill)}
                      onCheckedChange={(checked) => handleArrayChange("technicalExpertise", skill, checked as boolean)}
                    />
                    <Label htmlFor={skill} className="text-sm">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salesTeamSize">Sales Team Size</Label>
                <Select
                  value={formData.salesTeamSize}
                  onValueChange={(value) => handleInputChange("salesTeamSize", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 people</SelectItem>
                    <SelectItem value="3-5">3-5 people</SelectItem>
                    <SelectItem value="6-10">6-10 people</SelectItem>
                    <SelectItem value="10+">10+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentClients">Current Client Base Size</Label>
                <Select
                  value={formData.currentClients}
                  onValueChange={(value) => handleInputChange("currentClients", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select client base" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-50">Under 50</SelectItem>
                    <SelectItem value="50-200">50-200</SelectItem>
                    <SelectItem value="200-1000">200-1000</SelectItem>
                    <SelectItem value="over-1000">Over 1000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="certifications">Relevant Certifications</Label>
              <Textarea
                id="certifications"
                rows={2}
                placeholder="List any relevant certifications, awards, or recognitions..."
                value={formData.certifications}
                onChange={(e) => handleInputChange("certifications", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="caseStudies">Success Stories / Case Studies</Label>
              <Textarea
                id="caseStudies"
                rows={3}
                placeholder="Share a brief success story or case study..."
                value={formData.caseStudies}
                onChange={(e) => handleInputChange("caseStudies", e.target.value)}
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <DollarSign className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900">Goals & Final Details</h3>
              <p className="text-gray-600">Let's finalize your application</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="partnershipGoals">Partnership Goals *</Label>
              <Textarea
                id="partnershipGoals"
                rows={3}
                placeholder="What do you hope to achieve through this partnership?"
                value={formData.partnershipGoals}
                onChange={(e) => handleInputChange("partnershipGoals", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expectedROI">Expected ROI Timeline</Label>
                <Select value={formData.expectedROI} onValueChange={(value) => handleInputChange("expectedROI", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-months">Within 3 months</SelectItem>
                    <SelectItem value="6-months">Within 6 months</SelectItem>
                    <SelectItem value="12-months">Within 12 months</SelectItem>
                    <SelectItem value="long-term">Long-term (12+ months)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hearAboutUs">How did you hear about us?</Label>
                <Select value={formData.hearAboutUs} onValueChange={(value) => handleInputChange("hearAboutUs", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google Search</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="social-media">Social Media</SelectItem>
                    <SelectItem value="event">Industry Event</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Support Needs (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Training & Onboarding",
                  "Marketing Materials",
                  "Technical Support",
                  "Sales Support",
                  "Lead Generation",
                  "Co-marketing",
                ].map((support) => (
                  <div key={support} className="flex items-center space-x-2">
                    <Checkbox
                      id={support}
                      checked={formData.supportNeeds.includes(support)}
                      onCheckedChange={(checked) => handleArrayChange("supportNeeds", support, checked as boolean)}
                    />
                    <Label htmlFor={support} className="text-sm">
                      {support}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalComments">Additional Comments</Label>
              <Textarea
                id="additionalComments"
                rows={3}
                placeholder="Any additional information you'd like to share..."
                value={formData.additionalComments}
                onChange={(e) => handleInputChange("additionalComments", e.target.value)}
              />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                />
                <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                  I agree to the <span className="text-blue-600 underline cursor-pointer">Terms of Service</span> and{" "}
                  <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span> *
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToMarketing"
                  checked={formData.agreeToMarketing}
                  onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked)}
                />
                <Label htmlFor="agreeToMarketing" className="text-sm leading-relaxed">
                  I agree to receive marketing communications and partnership updates
                </Label>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Partnership Application</DialogTitle>
          <DialogDescription className="text-center">
            Step {currentStep} of {totalSteps} - Complete all steps to submit your application
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>Next Step</Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!formData.agreeToTerms || isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
