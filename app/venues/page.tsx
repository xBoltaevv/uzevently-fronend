"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Users, Search, Filter, Heart } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const venues = [
  {
    id: 1,
    name: "Grand Palace Wedding Hall",
    type: "Wedding Hall",
    location: "Tashkent, Uzbekistan",
    rating: 4.8,
    reviews: 124,
    price: "From $500/day",
    capacity: "500 guests",
    image: "/placeholder.svg?height=250&width=400",
    features: ["Parking", "Catering", "Decoration", "Sound System"],
  },
  {
    id: 2,
    name: "Silk Road Restaurant",
    type: "Restaurant",
    location: "Samarkand, Uzbekistan",
    rating: 4.6,
    reviews: 89,
    price: "From $25/person",
    capacity: "150 guests",
    image: "/placeholder.svg?height=250&width=400",
    features: ["Traditional Cuisine", "Live Music", "Garden Seating"],
  },
  {
    id: 3,
    name: "Registan Hotel & Conference",
    type: "Hotel",
    location: "Bukhara, Uzbekistan",
    rating: 4.9,
    reviews: 203,
    price: "From $80/night",
    capacity: "200 rooms",
    image: "/placeholder.svg?height=250&width=400",
    features: ["Conference Rooms", "Spa", "Restaurant", "Pool"],
  },
  {
    id: 4,
    name: "Royal Banquet Hall",
    type: "Banquet Hall",
    location: "Tashkent, Uzbekistan",
    rating: 4.7,
    reviews: 156,
    price: "From $300/day",
    capacity: "300 guests",
    image: "/placeholder.svg?height=250&width=400",
    features: ["LED Lighting", "Stage", "VIP Rooms", "Valet Parking"],
  },
  {
    id: 5,
    name: "Garden Paradise Restaurant",
    type: "Restaurant",
    location: "Fergana, Uzbekistan",
    rating: 4.5,
    reviews: 67,
    price: "From $20/person",
    capacity: "120 guests",
    image: "/images/ilya.jpg",
    features: ["Outdoor Seating", "BBQ Area", "Kids Play Area", "Free WiFi"],
  },
  {
    id: 6,
    name: "Crystal Palace Hotel",
    type: "Hotel",
    location: "Nukus, Uzbekistan",
    rating: 4.4,
    reviews: 92,
    price: "From $60/night",
    capacity: "150 rooms",
    image: "/placeholder.svg?height=250&width=400",
    features: ["Business Center", "Gym", "Airport Shuttle", "24/7 Service"],
  },
]

export default function VenuesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (venueId: number) => {
    setFavorites((prev) => (prev.includes(venueId) ? prev.filter((id) => id !== venueId) : [...prev, venueId]))
  }

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || venue.type === selectedType
    const matchesLocation = selectedLocation === "all" || venue.location.includes(selectedLocation)

    return matchesSearch && matchesType && matchesLocation
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Venues</h1>
          <p className="text-gray-600">Find the perfect venue for your special event</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Venue Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Wedding Hall">Wedding Hall</SelectItem>
                <SelectItem value="Restaurant">Restaurant</SelectItem>
                <SelectItem value="Hotel">Hotel</SelectItem>
                <SelectItem value="Banquet Hall">Banquet Hall</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Tashkent">Tashkent</SelectItem>
                <SelectItem value="Samarkand">Samarkand</SelectItem>
                <SelectItem value="Bukhara">Bukhara</SelectItem>
                <SelectItem value="Fergana">Fergana</SelectItem>
                <SelectItem value="Nukus">Nukus</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredVenues.length} of {venues.length} venues
          </p>
        </div>

        {/* Venues Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={venue.image || "/placeholder.svg"} alt={venue.name} className="w-full h-48 object-cover" />
                <button
                  onClick={() => toggleFavorite(venue.id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.includes(venue.id) ? "text-red-500 fill-current" : "text-gray-600"
                    }`}
                  />
                </button>
                <Badge className="absolute top-3 left-3 bg-blue-600">{venue.type}</Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{venue.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {venue.location}
                </div>
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{venue.rating}</span>
                    <span className="ml-1 text-sm text-gray-600">({venue.reviews} reviews)</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <Users className="w-4 h-4 mr-1" />
                  {venue.capacity}
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {venue.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {venue.features.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{venue.features.length - 3} more
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-blue-600">{venue.price}</p>
                  <Link href={`/venues/${venue.id}`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVenues.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No venues found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedType("all")
                setSelectedLocation("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
