"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Users,
  FileText,
  Upload,
  Activity,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Building2,
  UserCheck,
  Building,
  CreditCard,
  Shield,
  HelpCircle,
  Zap,
  Menu,
  X,
} from "lucide-react"

interface DashboardSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, badge: null },
  { id: "partnerships", label: "Partnerships", icon: FileText, badge: "23" },
  { id: "clients", label: "Clients", icon: Users, badge: null },
  { id: "applications", label: "Applications", icon: UserCheck, badge: "12" },
  { id: "projects", label: "Projects", icon: Building, badge: null },
  { id: "files", label: "File Manager", icon: Upload, badge: null },
  { id: "billing", label: "Billing", icon: CreditCard, badge: null },
  { id: "analytics", label: "Analytics", icon: BarChart3, badge: null },
  { id: "activity", label: "Activity Log", icon: Activity, badge: null },
  { id: "automation", label: "Automation", icon: Zap, badge: "New" },
]

const bottomMenuItems = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "security", label: "Security", icon: Shield },
  { id: "help", label: "Help & Support", icon: HelpCircle },
]

export function DashboardSidebar({ activeSection, onSectionChange }: DashboardSidebarProps) {
  const { user, logout } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New partnership request", type: "info", read: false },
    { id: 2, message: "Payment received", type: "success", read: false },
    { id: 3, message: "System maintenance scheduled", type: "warning", read: true },
  ])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleNotificationClick = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
    alert("Notifications:\n" + notifications.map((n) => `• ${n.message}`).join("\n"))
  }

  const handleMenuClick = (sectionId: string) => {
    onSectionChange(sectionId)
    if (isMobile) {
      setIsMobileOpen(false)
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-4 left-4 z-50 lg:hidden bg-gray-800 text-white hover:bg-gray-700"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}

      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && <div className="mobile-overlay active" onClick={() => setIsMobileOpen(false)} />}

      {/* Sidebar */}
      <div className={`responsive-sidebar ${isMobileOpen ? "open" : ""} ${isCollapsed ? "collapsed" : ""}`}>
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-gray-600">
          <div className="flex items-center justify-between">
            {(!isCollapsed || isMobile) && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Building2 className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-base lg:text-lg font-bold text-white">DigitronCX</h1>
                  <p className="text-xs text-gray-400">Admin Dashboard</p>
                </div>
              </div>
            )}
            {!isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 text-gray-400 hover:text-white bg-slate-700 hover:bg-gray-700"
              >
                {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-3 lg:p-4 border-b border-gray-600">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8 lg:h-10 lg:w-10 border border-gray-600">
              <AvatarFallback className="bg-gray-700 text-white font-semibold text-sm">
                {user?.name?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>
            {(!isCollapsed || isMobile) && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-600 text-white rounded">Super Admin</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-2 lg:py-4">
          <nav className="space-y-1 px-2 lg:px-3">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className={`w-full justify-start h-10 lg:h-11 text-sm transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                } ${isCollapsed && !isMobile ? "px-2" : "px-3 lg:px-4"}`}
                onClick={() => handleMenuClick(item.id)}
              >
                <item.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${isCollapsed && !isMobile ? "" : "mr-2 lg:mr-3"}`} />
                {(!isCollapsed || isMobile) && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`ml-2 px-2 py-1 text-xs rounded ${
                          item.badge === "New" ? "bg-green-600 text-white" : "bg-gray-600 text-white"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Button>
            ))}
          </nav>
        </div>

        {/* Bottom Menu */}
        <div className="border-t border-gray-600 p-2 lg:p-3 space-y-1">
          {bottomMenuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-start h-9 lg:h-10 text-sm text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200 ${isCollapsed && !isMobile ? "px-2" : "px-3 lg:px-4"}`}
              onClick={() => handleMenuClick(item.id)}
            >
              <item.icon className={`h-4 w-4 ${isCollapsed && !isMobile ? "" : "mr-2 lg:mr-3"}`} />
              {(!isCollapsed || isMobile) && <span>{item.label}</span>}
            </Button>
          ))}

          <Button
            variant="ghost"
            className={`w-full justify-start h-9 lg:h-10 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-200 ${isCollapsed && !isMobile ? "px-2" : "px-3 lg:px-4"}`}
            onClick={logout}
          >
            <LogOut className={`h-4 w-4 ${isCollapsed && !isMobile ? "" : "mr-2 lg:mr-3"}`} />
            {(!isCollapsed || isMobile) && <span>Logout</span>}
          </Button>
        </div>

        {/* Notifications */}
        {(!isCollapsed || isMobile) && (
          <div className="p-3 lg:p-4 border-t border-gray-600">
            <Button
              variant="outline"
              className="w-full justify-start text-sm bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              onClick={handleNotificationClick}
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {unreadCount > 0 && (
                <span className="ml-auto bg-red-600 text-white text-xs px-2 py-1 rounded-full">{unreadCount}</span>
              )}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
