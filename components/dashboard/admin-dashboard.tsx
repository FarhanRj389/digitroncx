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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/partnership")
    }
  }, [user, router])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!user) return null

  return (
    <div className="flex h-scree overflow-hidden">
      <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <DashboardContent activeSection={activeSection} />
    </div>
  )
}
