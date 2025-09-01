"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Users, MapPin, AlertTriangle, CheckCircle, Clock, TrendingUp, Activity } from "lucide-react"
import AdminStats from "@/components/admin/admin-stats"

export default function AdminDashboard() {
  const recentActivities = [
    {
      id: 1,
      type: "user_registered",
      message: "New user Sarah Johnson registered",
      time: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      type: "venue_added",
      message: "New venue 'Skyline Rooftop' added",
      time: "15 minutes ago",
      status: "info",
    },
    {
      id: 3,
      type: "booking_completed",
      message: "Booking #1247 completed successfully",
      time: "1 hour ago",
      status: "success",
    },
    {
      id: 4,
      type: "payment_failed",
      message: "Payment failed for booking #1248",
      time: "2 hours ago",
      status: "error",
    },
    {
      id: 5,
      type: "review_submitted",
      message: "New 5-star review submitted",
      time: "3 hours ago",
      status: "success",
    },
  ]

  const quickActions = [
    {
      title: "Add New Venue",
      description: "Register a new venue to the platform",
      icon: MapPin,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      icon: Users,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "View Reports",
      description: "Generate and view analytics reports",
      icon: TrendingUp,
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "System Settings",
      description: "Configure platform settings",
      icon: Activity,
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "error":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      case "info":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4" />
      case "error":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-8 ml-[-250px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"
      >
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">Super Admin</Badge>
          </div>
          <p className="text-muted-foreground">
            Welcome to the Uzevently administration panel. Monitor and manage your platform.
          </p>
        </div>

        {/* Clock Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <AdminStats />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>Latest platform activities and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                        {getStatusIcon(activity.status)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className={`w-full h-auto p-4 justify-start text-left hover:shadow-md transition-all duration-200 ${action.color} hover:text-white border-2`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{action.title}</p>
                            <p className="text-xs opacity-80">{action.description}</p>
                          </div>
                        </div>
                      </Button>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>System Status</span>
            </CardTitle>
            <CardDescription>All systems operational</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Database: Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">API: Healthy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Payments: Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Maintenance: Scheduled</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
