"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Star, Settings, LogOut, Plus, TrendingUp, DollarSign, Eye, Edit } from "lucide-react"
import Header from "@/components/header"
import { useAuth } from "@/contexts/auth-context"
import Footer from "@/components/footer"

const venueStats = {
  totalBookings: 45,
  monthlyRevenue: 12500,
  averageRating: 4.7,
  totalViews: 1250,
}

const recentBookings = [
  {
    id: 1,
    customerName: "John Doe",
    venue: "Grand Palace Wedding Hall",
    date: "2024-02-15",
    time: "18:00",
    guests: 250,
    status: "confirmed",
    amount: 1500,
  },
  {
    id: 2,
    customerName: "Sarah Smith",
    venue: "Grand Palace Wedding Hall",
    date: "2024-02-20",
    time: "19:30",
    guests: 180,
    status: "pending",
    amount: 1200,
  },
]

const myVenues = [
  {
    id: 1,
    name: "Grand Palace Wedding Hall",
    type: "Wedding Hall",
    rating: 4.8,
    bookings: 25,
    revenue: 8500,
    image: "/placeholder.svg?height=80&width=80",
    status: "active",
  },
  {
    id: 2,
    name: "Royal Banquet Hall",
    type: "Banquet Hall",
    rating: 4.6,
    bookings: 20,
    revenue: 4000,
    image: "/placeholder.svg?height=80&width=80",
    status: "active",
  },
]

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-lg">AB</AvatarFallback>
                </Avatar>
                <CardTitle>
                  {user?.firstName} {user?.lastName}
                </CardTitle>
                <CardDescription>Venue Owner</CardDescription>
                <Badge className="mt-2">Premium Account</Badge>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Button
                    variant={activeTab === "overview" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("overview")}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Overview
                  </Button>
                  <Button
                    variant={activeTab === "venues" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("venues")}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    My Venues
                  </Button>
                  <Button
                    variant={activeTab === "bookings" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("bookings")}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Bookings
                  </Button>
                  <Button
                    variant={activeTab === "analytics" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("analytics")}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Welcome Section */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Dashboard</h1>
                    <p className="text-gray-600">Manage your venues and bookings</p>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Venue
                  </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                          <p className="text-2xl font-bold">{venueStats.totalBookings}</p>
                        </div>
                        <Calendar className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                          <p className="text-2xl font-bold">${venueStats.monthlyRevenue}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Average Rating</p>
                          <p className="text-2xl font-bold">{venueStats.averageRating}</p>
                        </div>
                        <Star className="w-8 h-8 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Views</p>
                          <p className="text-2xl font-bold">{venueStats.totalViews}</p>
                        </div>
                        <Eye className="w-8 h-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>Latest reservations for your venues</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback>
                                {booking.customerName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold">{booking.customerName}</h4>
                              <p className="text-sm text-gray-600">{booking.venue}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                <span>{booking.date}</span>
                                <span>{booking.time}</span>
                                <span>{booking.guests} guests</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                              {booking.status}
                            </Badge>
                            <p className="text-sm font-medium mt-1">${booking.amount}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "venues" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">My Venues</h2>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Venue
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {myVenues.map((venue) => (
                    <Card key={venue.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={venue.image || "/placeholder.svg"}
                            alt={venue.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold">{venue.name}</h3>
                              <Badge variant={venue.status === "active" ? "default" : "secondary"}>
                                {venue.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{venue.type}</p>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600">Rating</p>
                                <div className="flex items-center">
                                  <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                                  <span className="font-medium">{venue.rating}</span>
                                </div>
                              </div>
                              <div>
                                <p className="text-gray-600">Bookings</p>
                                <p className="font-medium">{venue.bookings}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">Revenue</p>
                                <p className="font-medium">${venue.revenue}</p>
                              </div>
                            </div>
                            <div className="flex space-x-2 mt-4">
                              <Button size="sm" variant="outline">
                                <Edit className="w-3 h-3 mr-1" />
                                Edit
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "bookings" && (
              <Card>
                <CardHeader>
                  <CardTitle>All Bookings</CardTitle>
                  <CardDescription>Manage all venue reservations</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="upcoming">
                    <TabsList>
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="past">Past</TabsTrigger>
                      <TabsTrigger value="pending">Pending</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming" className="space-y-4 mt-4">
                      {recentBookings
                        .filter((b) => b.status === "confirmed")
                        .map((booking) => (
                          <div key={booking.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">{booking.customerName}</h4>
                                <p className="text-sm text-gray-600">{booking.venue}</p>
                                <p className="text-sm text-gray-500">
                                  {booking.date} at {booking.time}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${booking.amount}</p>
                                <p className="text-sm text-gray-600">{booking.guests} guests</p>
                                <Badge className="mt-1">Confirmed</Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Analytics</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-gray-500">
                        Revenue chart would go here
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Booking Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-gray-500">
                        Booking chart would go here
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Business Settings</CardTitle>
                  <CardDescription>Manage your business account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Business Name</label>
                      <p className="text-gray-600">Ahmad Business</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone Number</label>
                      <p className="text-gray-600">+998 90 123 45 67</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Account Type</label>
                      <p className="text-gray-600">Business Account - Premium</p>
                    </div>
                    <Button>Edit Business Profile</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
