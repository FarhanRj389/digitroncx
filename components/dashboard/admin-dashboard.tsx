"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardContent } from "./dashboard-content"

export function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("overview")

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/partnership")
    }
  }, [user, router])

  if (!user) return null

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <DashboardContent activeSection={activeSection} />
    </div>
  )
}
