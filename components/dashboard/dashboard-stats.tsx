import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, CheckCircle, Clock, TrendingUp, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Partners",
    value: "156",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Pending Requests",
    value: "23",
    change: "+5%",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    title: "Approved This Month",
    value: "18",
    change: "+25%",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Total Revenue",
    value: "$125K",
    change: "+18%",
    icon: DollarSign,
    color: "text-purple-600",
  },
  {
    title: "Active Projects",
    value: "89",
    change: "+8%",
    icon: FileText,
    color: "text-orange-600",
  },
  {
    title: "Growth Rate",
    value: "32%",
    change: "+4%",
    icon: TrendingUp,
    color: "text-indigo-600",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-green-600 font-medium">{stat.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
