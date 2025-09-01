"use client"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Calendar, Users, Search } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion, Variants } from "framer-motion"

const featuredVenues = [
  {
    id: 1,
    name: "Grand Palace Wedding Hall",
    type: "Wedding Hall",
    location: "Tashkent, Uzbekistan",
    rating: 4.8,
    reviews: 124,
    price: "From $500/day",
    image: "/placeholder.svg?height=200&width=300",
    capacity: "500 guests",
  },
  {
    id: 2,
    name: "Silk Road Restaurant",
    type: "Restaurant",
    location: "Samarkand, Uzbekistan",
    rating: 4.6,
    reviews: 89,
    price: "From $25/person",
    image: "/placeholder.svg?height=200&width=300",
    capacity: "150 guests",
  },
  {
    id: 3,
    name: "Registan Hotel & Conference",
    type: "Hotel",
    location: "Bukhara, Uzbekistan",
    rating: 4.9,
    reviews: 203,
    price: "From $80/night",
    image: "/placeholder.svg?height=200&width=300",
    capacity: "200 rooms",
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
    transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" },
  },
}

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <motion.section
        className="py-20 px-4"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Book Perfect Venues for Your
            <span className="text-blue-600"> Special Events</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover and book the best wedding halls, restaurants, and hotels across Uzbekistan. Make your events
            memorable with UzEvently.
          </p>
          {/* Search Bar */}
          <div className="mb-8 max-w-3xl mx-auto">
            <div className="flex items-center bg-white rounded-full shadow-lg p-2">
              <Search className="w-6 h-6 text-gray-500 ml-4" />
              <input
                type="text"
                placeholder="Search venues by name, type, or location..."
                className="flex-1 px-4 py-2 text-gray-700 bg-transparent outline-none"
              />
              <Button className="rounded-full bg-blue-600 hover:bg-blue-700">Search</Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div variants={buttonVariants} whileHover="hover">
              <Link href="/auth/register">
                <Button size="lg" className="px-8 bg-blue-600 hover:bg-blue-700">
                  Start Booking
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={buttonVariants} whileHover="hover">
              <Link href="/venues">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Browse Venues
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-16 px-4 bg-white"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose UzEvently?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Easy Booking",
                description: "Book venues instantly with our smart calendar system. No more back-and-forth calls.",
              },
              {
                icon: Star,
                title: "Verified Reviews",
                description: "Read authentic reviews from real customers to make informed decisions.",
              },
              {
                icon: Users,
                title: "Business Solutions",
                description: "Venue owners can manage bookings, pricing, and customer relationships easily.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover="hover"
              >
                <Card className="bg-gradient-to-br from-blue-50 to-white border-none shadow-lg">
                  <CardHeader>
                    <feature.icon className="w-10 h-10 text-blue-600 mb-2" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Venues */}
      <motion.section
        className="py-16 px-4"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Venues</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover="hover"
              >
                <Card className="overflow-hidden bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
                  <div className="aspect-video bg-gray-200 relative">
                    <img
                      src={venue.image || "/placeholder.svg"}
                      alt={venue.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="absolute top-3 left-3 bg-blue-600">{venue.type}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{venue.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {venue.location}
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{venue.rating}</span>
                        <span className="ml-1 text-sm text-gray-600">({venue.reviews} reviews)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{venue.capacity}</p>
                        <p className="font-semibold text-blue-600">{venue.price}</p>
                      </div>
                      <Link href={`/venues/${venue.id}`}>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container mx-auto text-center">
          {!user ? (
            <>
              <h2 className="text-3xl font-bold mb-4">Ready to Start Planning?</h2>
              <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers who trust UzEvently</p>
              <motion.div variants={buttonVariants} whileHover="hover">
                <Link href="/auth/register">
                  <Button size="lg" variant="secondary" className="px-8 bg-white text-blue-600 hover:bg-gray-100">
                    Create Your Account
                  </Button>
                </Link>
              </motion.div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Welcome back, {user.firstName}!</h2>
              <p className="text-xl mb-8 opacity-90">Ready to plan your next amazing event?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div variants={buttonVariants} whileHover="hover">
                  <Link href="/venues">
                    <Button size="lg" variant="secondary" className="px-8 bg-white text-blue-600 hover:bg-gray-100">
                      Browse Venues
                    </Button>
                  </Link>
                </motion.div>
                <motion.div variants={buttonVariants} whileHover="hover">
                  <Link href={user.role === "business" ? "/business/dashboard" : "/dashboard"}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-8 bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                    >
                      Go to Dashboard
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  )
}