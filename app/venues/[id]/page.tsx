"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Star, MapPin, Phone, Mail, Clock, Wifi, Bed, Utensils, Tv, Coffee, CreditCard } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion, Variants } from "framer-motion"
import { useRouter } from "next/navigation"

// Mock hotel data
const hotel = {
  id: 1,
  name: "Grand Oasis Hotel",
  type: "Luxury Hotel",
  location: "Tashkent, Uzbekistan",
  address: "456 Navoi Street, Tashkent 100011",
  rating: 4.9,
  reviews: 156,
  price: "From $100/night",
  capacity: "200 rooms",
  phone: "+998 71 987 65 43",
  email: "reservations@grandoasis.uz",
  description:
    "Grand Oasis Hotel offers luxurious accommodations in the heart of Tashkent. Enjoy modern amenities, exceptional service, and a relaxing stay tailored to your needs.",
  features: [
    { icon: Bed, name: "Comfortable Rooms", description: "Spacious rooms with premium bedding" },
    { icon: Utensils, name: "Restaurant", description: "On-site dining with local and international cuisine" },
    { icon: Wifi, name: "Free WiFi", description: "High-speed internet access" },
    { icon: Tv, name: "Smart TVs", description: "In-room entertainment" },
    { icon: Coffee, name: "Breakfast Included", description: "Complimentary daily breakfast" },
    { icon: Clock, name: "24/7 Concierge", description: "Round-the-clock guest support" },
  ],
  images: [
    "/images/hotels/image.png",
    "/images/hotels/image.png",
    "/images/hotels/image.png",
    "/images/hotels/image.png",
  ],
}

// Mock initial reviews
const initialReviews = [
  {
    id: 1,
    name: "Anna Smith",
    rating: 5,
    date: "2025-02-10",
    comment: "Amazing stay! The rooms were spotless, and the staff was incredibly friendly.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Rustam Aliyev",
    rating: 5,
    date: "2025-02-05",
    comment: "Perfect location and excellent service. Highly recommend!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Elena Petrova",
    rating: 4,
    date: "2025-01-30",
    comment: "Great hotel, but breakfast options could be more varied.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Animation variants
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
  }),
  hover: { scale: 1.03, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)", transition: { duration: 0.3, ease: "easeOut" } },
}

const iconVariants: Variants = {
  hover: { scale: 1.1, transition: { duration: 0.3, ease: "easeOut" } },
}

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
}

const buttonVariants: Variants = {
  hover: { scale: 1.05, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", transition: { duration: 0.3, ease: "easeOut" } },
}

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
}

export default function VenueDetailPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [newReview, setNewReview] = useState("")
  const [newRating, setNewRating] = useState(5)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: "", expiry: "", cvv: "", cardHolder: "" })
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [reviews, setReviews] = useState(initialReviews)
  const [bookedRooms, setBookedRooms] = useState<{ roomId: number; date: string }[]>([])
  const router = useRouter()

  const isHumoOrUzcard = paymentDetails.cardNumber.replace(/\s/g, "").startsWith("9860") || paymentDetails.cardNumber.replace(/\s/g, "").startsWith("8600")

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentStatus("processing")
    setTimeout(() => {
      setPaymentStatus("success")
      setTimeout(() => {
        setShowPaymentModal(false)
        setPaymentDetails({ cardNumber: "", expiry: "", cvv: "", cardHolder: "" })
      }, 2000)
    }, 2000)
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newReviewData = {
      id: reviews.length + 1,
      name: "Guest User",
      rating: newRating,
      date: new Date().toISOString().split("T")[0],
      comment: newReview,
      avatar: "/placeholder.svg?height=40&width=40",
    }
    setReviews([newReviewData, ...reviews])
    setNewReview("")
    setNewRating(5)
  }

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16)
    return digits.match(/.{1,4}/g)?.join(" ") || digits
  }

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4)
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
  }

  const handleViewRooms = () => {
    if (selectedDate) {
      router.push(`/rooms/${hotel.id}?date=${selectedDate.toDateString()}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <Header />
      <motion.div className="container mx-auto px-4 py-8" initial="hidden" animate="visible" variants={sectionVariants}>
        {/* Image Gallery */}
        <motion.div className="grid md:grid-cols-4 gap-4 mb-8" initial="hidden" animate="visible" variants={sectionVariants}>
          <div className="md:col-span-3 relative">
            <motion.img
              src={hotel.images[currentImageIndex] || "/placeholder.svg"}
              alt={hotel.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
              variants={imageVariants}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-lg"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
            {hotel.images.slice(0, 4).map((image, index) => (
              <motion.img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${hotel.name} ${index + 1}`}
                className={`w-full h-20 md:h-24 object-cover rounded cursor-pointer border-2 ${
                  currentImageIndex === index ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => setCurrentImageIndex(index)}
                variants={imageVariants}
                whileHover="hover"
              />
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hotel Info */}
            <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants} whileHover="hover">
              <Card className="bg-gradient-to-br from-blue-50 to-white border-none shadow-lg hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-3xl font-bold">{hotel.name}</CardTitle>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge className="bg-blue-600">{hotel.type}</Badge>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium">{hotel.rating}</span>
                          <span className="ml-1 text-gray-600">({reviews.length} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{hotel.price}</p>
                      <p className="text-sm text-gray-600">{hotel.capacity}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{hotel.address}</span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{hotel.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{hotel.email}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{hotel.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features */}
            <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants} whileHover="hover">
              <Card className="bg-gradient-to-br from-blue-50 to-white border-none shadow-lg hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Features & Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {hotel.features.map((feature, index) => (
                      <motion.div key={index} className="flex items-center space-x-3" variants={iconVariants} whileHover="hover">
                        <feature.icon className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{feature.name}</p>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reviews */}
            <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants} whileHover="hover">
              <Card className="bg-gradient-to-br from-blue-50 to-white border-none shadow-lg hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Reviews ({reviews.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="reviews">
                    <TabsList className="bg-blue-50">
                      <TabsTrigger value="reviews">All Reviews</TabsTrigger>
                      <TabsTrigger value="write">Write Review</TabsTrigger>
                    </TabsList>
                    <TabsContent value="reviews" className="space-y-4 mt-4">
                      {reviews.map((review) => (
                        <motion.div
                          key={review.id}
                          className="border-b pb-4 last:border-b-0"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-start space-x-3">
                            <Avatar>
                              <AvatarImage src={review.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{review.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium">{review.name}</h4>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                                ))}
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </TabsContent>
                    <TabsContent value="write" className="mt-4">
                      <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Rating</label>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <motion.div key={i} variants={iconVariants} whileHover="hover">
                                <Star
                                  className={`w-6 h-6 cursor-pointer ${i < newRating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                  onClick={() => setNewRating(i + 1)}
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Your Review</label>
                          <Textarea
                            placeholder="Share your experience..."
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            rows={4}
                            className="border-blue-200 focus:ring-blue-600"
                            required
                          />
                        </div>
                        <motion.div variants={buttonVariants} whileHover="hover">
                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Submit Review</Button>
                        </motion.div>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <motion.div className="lg:col-span-1" initial="hidden" animate="visible" variants={sectionVariants}>
            <Card className="sticky top-24 bg-gradient-to-br from-blue-50 to-white border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Book a Room</CardTitle>
                <CardDescription>Select your date and view available rooms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={isDateDisabled}
                  className="w-full max-w-md rounded-md border border-blue-200 shadow-md"
                />
                <div className="space-y-2 text-sm">
                  <motion.div className="flex items-center space-x-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <div className="w-3 h-3 bg-red-200 rounded"></div>
                    <span>Booked rooms</span>
                  </motion.div>
                  <motion.div className="flex items-center space-x-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <div className="w-3 h-3 bg-gray-200 rounded"></div>
                    <span>Past dates</span>
                  </motion.div>
                  <motion.div className="flex items-center space-x-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                    <div className="w-3 h-3 bg-blue-200 rounded"></div>
                    <span>Available rooms</span>
                  </motion.div>
                </div>
                {selectedDate && (
                  <motion.div
                    className="p-3 bg-blue-50 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm font-medium">Selected Date:</p>
                    <p className="text-blue-600">{selectedDate.toDateString()}</p>
                    <motion.div variants={buttonVariants} whileHover="hover" className="mt-4">
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={handleViewRooms}
                      >
                        View Rooms
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
                <motion.div variants={buttonVariants} whileHover="hover">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-blue-200 text-blue-600 hover:bg-blue-100"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial="hidden"
            animate="visible"
            variants={modalVariants}
          >
            <Card className="bg-white max-w-md w-full mx-4">
              <CardHeader>
                <CardTitle className="text-2xl">Enter Payment Details</CardTitle>
                <CardDescription>Securely book your room</CardDescription>
              </CardHeader>
              <CardContent>
                {paymentStatus === "success" ? (
                  <div className="text-center space-y-4">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
                      <CreditCard className="w-16 h-16 text-green-600 mx-auto" />
                    </motion.div>
                    <p className="text-lg font-medium text-green-600">Payment Successful!</p>
                    <p className="text-gray-600">Your room has been booked.</p>
                  </div>
                ) : (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <Input
                        placeholder="9860 1606 1234 5678"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: formatCardNumber(e.target.value) })}
                        className="border-blue-200 focus:ring-blue-600"
                        required
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                        <Input
                          placeholder="MM/YY"
                          value={paymentDetails.expiry}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: formatExpiry(e.target.value) })}
                          className="border-blue-200 focus:ring-blue-600"
                          required
                          maxLength={5}
                        />
                      </div>
                      {!isHumoOrUzcard && (
                        <div>
                          <label className="block text-sm font-medium mb-2">CVV</label>
                          <Input
                            placeholder="123"
                            value={paymentDetails.cvv}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })}
                            className="border-blue-200 focus:ring-blue-600"
                            required
                            maxLength={3}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                      <Input
                        placeholder="John Doe"
                        value={paymentDetails.cardHolder}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardHolder: e.target.value })}
                        className="border-blue-200 focus:ring-blue-600"
                        required
                      />
                    </div>
                    <div className="flex space-x-4">
                      <motion.div variants={buttonVariants} whileHover="hover">
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          disabled={paymentStatus === "processing"}
                        >
                          {paymentStatus === "processing" ? "Processing..." : "Pay Now"}
                        </Button>
                      </motion.div>
                      <motion.div variants={buttonVariants} whileHover="hover">
                        <Button
                          variant="outline"
                          className="w-full bg-transparent border-blue-200 text-blue-600 hover:bg-blue-100"
                          onClick={() => setShowPaymentModal(false)}
                        >
                          Cancel
                        </Button>
                      </motion.div>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
      <Footer />
    </div>
  )
}