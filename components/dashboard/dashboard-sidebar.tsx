"use client"

import { useState } from "react"
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
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New partnership request", type: "info", read: false },
    { id: 2, message: "Payment received", type: "success", read: false },
    { id: 3, message: "System maintenance scheduled", type: "warning", read: true },
  ])

  const handleNotificationClick = () => {
    // Mark all notifications as read
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))

    // Show notification panel
    alert("Notifications:\n" + notifications.map((n) => `• ${n.message}`).join("\n"))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div
      className={`${isCollapsed ? "w-20" : "w-72"} simple-sidebar flex flex-col transition-all duration-200 shadow-lg`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-600">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary-dark">DigitronCX</h1>
                <p className="text-xs text-secondary-dark">Admin Dashboard</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 text-secondary-dark hover:text-primary-dark simple-hover"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-600">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 border border-gray-600">
            <AvatarFallback className="bg-gray-700 text-primary-dark font-semibold">
              {user?.name?.charAt(0) || "A"}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-primary-dark truncate">{user?.name}</p>
              <p className="text-xs text-secondary-dark truncate">{user?.email}</p>
              <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-600 text-white rounded">Super Admin</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className={`w-full justify-start h-11 transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-blue-600 text-white"
                  : "text-secondary-dark hover:text-primary-dark hover:bg-gray-700"
              } ${isCollapsed ? "px-3" : "px-4"}`}
              onClick={() => onSectionChange(item.id)}
            >
              <item.icon className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
              {!isCollapsed && (
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
      <div className="border-t border-gray-600 p-3 space-y-1">
        {bottomMenuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`w-full justify-start h-10 text-secondary-dark hover:text-primary-dark hover:bg-gray-700 transition-all duration-200 ${isCollapsed ? "px-3" : "px-4"}`}
            onClick={() => onSectionChange(item.id)}
          >
            <item.icon className={`h-4 w-4 ${isCollapsed ? "" : "mr-3"}`} />
            {!isCollapsed && <span>{item.label}</span>}
          </Button>
        ))}

        <Button
          variant="ghost"
          className={`w-full justify-start h-10 text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-200 ${isCollapsed ? "px-3" : "px-4"}`}
          onClick={logout}
        >
          <LogOut className={`h-4 w-4 ${isCollapsed ? "" : "mr-3"}`} />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>

      {/* Notifications */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-600">
          <Button
            variant="outline"
            className="w-full justify-start bg-gray-700 border-gray-600 text-primary-dark hover:bg-gray-600"
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
  )
}
