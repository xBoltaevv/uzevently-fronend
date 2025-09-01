"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Star, Clock, Users, Settings, LogOut, Search, Heart, Edit, Save, X } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { motion, Variants } from "framer-motion"

const upcomingBookings = [
  {
    id: 1,
    venue: "Grand Palace Wedding Hall",
    date: "2024-02-15",
    time: "18:00",
    guests: 250,
    status: "confirmed",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    venue: "Silk Road Restaurant",
    date: "2024-02-20",
    time: "19:30",
    guests: 12,
    status: "pending",
    image: "/placeholder.svg?height=80&width=80",
  },
]

const recentlyViewed = [
  {
    id: 1,
    name: "Registan Hotel & Conference",
    type: "Hotel",
    rating: 4.9,
    price: "From $80/night",
    image: "/placeholder.svg?height=120&width=160",
  },
  {
    id: 2,
    name: "Bukhara Traditional Restaurant",
    type: "Restaurant",
    rating: 4.7,
    price: "From $30/person",
    image: "/placeholder.svg?height=120&width=160",
  },
]

// Animatsiya variantlari
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
  }),
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3 },
  },
}

const buttonVariants: Variants = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.3, yoyo: Infinity },
  },
}

const avatarVariants: Variants = {
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: { duration: 0.3 },
  },
}

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
  })

  const { user, logout, updateUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    // Initialize edit form with user data
    setEditForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      address: user.address || "",
      phoneNumber: user.phoneNumber || "",
    })
  }, [user, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form to original values
      setEditForm({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        address: user?.address || "",
        phoneNumber: user?.phoneNumber || "",
      })
    }
    setIsEditing(!isEditing)
  }

  const handleSaveProfile = async () => {
    try {
      // Update user in context
      updateUser({
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        address: editForm.address,
        name: `${editForm.firstName} ${editForm.lastName}`,
      })

      setIsEditing(false)
      // Here you would typically make an API call to update the backend
      // await updateUserProfile(editForm)
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const getUserInitials = () => {
    if (!user) return "U"
    return `${user.firstName[0] || ""}${user.lastName[0] || ""}`.toUpperCase()
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <motion.div className="grid lg:grid-cols-4 gap-8" initial="hidden" animate="visible" variants={sectionVariants}>
          {/* Sidebar */}
          <motion.div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-blue-50 to-white border-none shadow-lg">
              <CardHeader className="text-center">
                <motion.div whileHover="hover" variants={avatarVariants}>
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <CardTitle className="text-xl font-bold">
                  {user.firstName} {user.lastName}
                </CardTitle>
                <CardDescription>{user.phoneNumber}</CardDescription>
                <Badge variant="secondary" className="mt-2 bg-blue-100 text-blue-600">
                  {user.role === "business" ? "Business Account" : "Personal Account"}
                </Badge>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  {[
                    { tab: "overview", icon: Calendar, label: "Overview" },
                    { tab: "bookings", icon: Clock, label: "My Bookings" },
                    { tab: "favorites", icon: Heart, label: "Favorites" },
                    { tab: "profile", icon: Settings, label: "Profile Settings" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.tab}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <Button
                        variant={activeTab === item.tab ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveTab(item.tab)}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.label}
                      </Button>
                    </motion.div>
                  ))}
                  <motion.div whileHover="hover" variants={buttonVariants}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </motion.div>
                </nav>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {activeTab === "overview" && (
              <motion.div variants={sectionVariants} initial="hidden" animate="visible">
                {/* Welcome Section */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.firstName || "User"}!</h1>
                  <p className="text-gray-600">Here's what's happening with your bookings</p>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: Search,
                      title: "Browse Venues",
                      description: "Find perfect venues for your events",
                      href: "/venues",
                    },
                    {
                      icon: Calendar,
                      title: "Quick Book",
                      description: "Book your favorite venues instantly",
                      href: "/venues",
                    },
                    {
                      icon: Star,
                      title: "Write Review",
                      description: "Share your experience",
                      href: "/venues",
                    },
                  ].map((action, index) => (
                    <motion.div
                      key={action.title}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <Link href={action.href}>
                        <Card className="bg-gradient-to-br from-blue-50 to-white border-none shadow-lg hover:shadow-xl transition-shadow">
                          <CardContent className="p-6 text-center">
                            <action.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <h3 className="font-semibold">{action.title}</h3>
                            <p className="text-sm text-gray-600">{action.description}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Upcoming Bookings */}
                <Card className="bg-gradient-to-br from-blue-50 to-white border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Upcoming Bookings</CardTitle>
                    <CardDescription>Your confirmed and pending reservations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingBookings.map((booking, index) => (
                        <motion.div
                          key={booking.id}
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          variants={cardVariants}
                          whileHover="hover"
                        >
                          <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
                            <img
                              src={booking.image || "/placeholder.svg"}
                              alt={booking.venue}
                              className="w-16 h-16 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold">{booking.venue}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {booking.date}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {booking.time}
                                </span>
                                <span className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {booking.guests} guests
                                </span>
                              </div>
                            </div>
                            <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                              {booking.status}
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recently Viewed */}
                <Card className="bg-gradient-to-br from-blue-50 to-white border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Recently Viewed</CardTitle>
                    <CardDescription>Venues you've checked out recently</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {recentlyViewed.map((venue, index) => (
                        <motion.div
                          key={venue.id}
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          variants={cardVariants}
                          whileHover="hover"
                        >
                          <div className="flex space-x-3 p-3 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                            <img
                              src={venue.image || "/placeholder.svg"}
                              alt={venue.name}
                              className="w-20 h-16 rounded object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{venue.name}</h4>
                              <p className="text-xs text-gray-600">{venue.type}</p>
                              <div className="flex items-center justify-between mt-1">
                                <div className="flex items-center">
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  <span className="text-xs ml-1">{venue.rating}</span>
                                </div>
                                <span className="text-xs font-medium text-blue-600">{venue.price}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "bookings" && (
              <motion.div variants={sectionVariants} initial="hidden" animate="visible">
                <Card className="bg-gradient-to-br from-blue-50 to-white border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>My Bookings</CardTitle>
                    <CardDescription>All your venue reservations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="upcoming">
                      <TabsList className="bg-blue-50">
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="past">Past</TabsTrigger>
                        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                      </TabsList>
                      <TabsContent value="upcoming" className="space-y-4 mt-4">
                        {upcomingBookings.map((booking, index) => (
                          <motion.div
                            key={booking.id}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            whileHover="hover"
                          >
                            <div className="border rounded-lg p-4 bg-white shadow-md">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-semibold">{booking.venue}</h4>
                                  <p className="text-sm text-gray-600">
                                    {booking.date} at {booking.time}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                                    {booking.status}
                                  </Badge>
                                  <p className="text-sm text-gray-600 mt-1">{booking.guests} guests</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "favorites" && (
              <motion.div variants={sectionVariants} initial="hidden" animate="visible">
                <Card className="bg-gradient-to-br from-blue-50 to-white border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Favorite Venues</CardTitle>
                    <CardDescription>Your saved venues for quick access</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No favorite venues yet</p>
                        <p className="text-sm text-gray-500 mb-4">Start exploring and save venues you love</p>
                        <motion.div whileHover="hover" variants={buttonVariants}>
                          <Link href="/venues">
                            <Button className="bg-blue-600 hover:bg-blue-700">Browse Venues</Button>
                          </Link>
                        </motion.div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "profile" && (
              <motion.div variants={sectionVariants} initial="hidden" animate="visible">
                <Card className="bg-gradient-to-br from-blue-50 to-white border-none shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Profile Settings</CardTitle>
                      <CardDescription>Manage your account information</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      {isEditing ? (
                        <>
                          <motion.div whileHover="hover" variants={buttonVariants}>
                            <Button size="sm" onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700">
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                          </motion.div>
                          <motion.div whileHover="hover" variants={buttonVariants}>
                            <Button size="sm" variant="outline" onClick={handleEditToggle}>
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </motion.div>
                        </>
                      ) : (
                        <motion.div whileHover="hover" variants={buttonVariants}>
                          <Button size="sm" variant="outline" onClick={handleEditToggle}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          {isEditing ? (
                            <Input
                              id="firstName"
                              value={editForm.firstName}
                              onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                              placeholder="Enter your first name"
                              className="border-blue-200 focus:ring-blue-600"
                            />
                          ) : (
                            <p className="text-gray-900 font-medium">{user.firstName || "Not provided"}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          {isEditing ? (
                            <Input
                              id="lastName"
                              value={editForm.lastName}
                              onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                              placeholder="Enter your last name"
                              className="border-blue-200 focus:ring-blue-600"
                            />
                          ) : (
                            <p className="text-gray-900 font-medium">{user.lastName || "Not provided"}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <p className="text-gray-900 font-medium">{user.phoneNumber}</p>
                        <p className="text-xs text-gray-500">Phone number cannot be changed</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        {isEditing ? (
                          <Input
                            id="address"
                            value={editForm.address}
                            onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                            placeholder="Enter your address"
                            className="border-blue-200 focus:ring-blue-600"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{user.address || "Not provided"}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountType">Account Type</Label>
                        <div className="flex items-center space-x-2">
                          <Badge variant={user.role === "business" ? "default" : "secondary"}>
                            {user.role === "business" ? "Business Account" : "Personal Account"}
                          </Badge>
                        </div>
                      </div>

                      {!isEditing && (
                        <div className="pt-4 border-t">
                          <h3 className="font-medium text-gray-900 mb-2">Account Actions</h3>
                          <div className="space-y-2">
                            <motion.div whileHover="hover" variants={buttonVariants}>
                              <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                                Change Password
                              </Button>
                            </motion.div>
                            <motion.div whileHover="hover" variants={buttonVariants}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 bg-transparent"
                              >
                                Delete Account
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}