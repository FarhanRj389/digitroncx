"use client"

import { DashboardOverview } from "./sections/dashboard-overview"
import { PartnershipRequests } from "./partnership-requests"
import { ClientManagement } from "./sections/client-management"
import { ApplicationsSection } from "./sections/applications-section"
import { ProjectsSection } from "./sections/projects-section"
import { FileManager } from "./file-manager"
import { BillingSection } from "./sections/billing-section"
import { AnalyticsSection } from "./sections/analytics-section"
import { ActivityLog } from "./activity-log"
import { AutomationSection } from "./sections/automation-section"
import { SettingsSection } from "./sections/settings-section"
import { SecuritySection } from "./sections/security-section"
import { HelpSection } from "./sections/help-section"

interface DashboardContentProps {
  activeSection: string
}

export function DashboardContent({ activeSection }: DashboardContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />
      case "partnerships":
        return <PartnershipRequests />
      case "clients":
        return <ClientManagement />
      case "applications":
        return <ApplicationsSection />
      case "projects":
        return <ProjectsSection />
      case "files":
        return <FileManager />
      case "billing":
        return <BillingSection />
      case "analytics":
        return <AnalyticsSection />
      case "activity":
        return <ActivityLog />
      case "automation":
        return <AutomationSection />
      case "settings":
        return <SettingsSection />
      case "security":
        return <SecuritySection />
      case "help":
        return <HelpSection />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-6 md:p-8 min-h-full">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </div>
    </div>
  )
}
