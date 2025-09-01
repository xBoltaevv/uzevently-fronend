"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, CreditCard, Star, Users, Building2, BarChart3, MessageCircle } from "lucide-react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"

const customerSteps = [
  {
    step: 1,
    icon: Search,
    title: "Browse Venues",
    description:
      "Search through hundreds of verified venues across Uzbekistan. Use filters to find exactly what you need.",
    details: ["Advanced search filters", "High-quality photos", "Detailed venue information", "Real customer reviews"],
  },
  {
    step: 2,
    icon: Calendar,
    title: "Check Availability",
    description: "View real-time availability and select your preferred date. Our calendar shows all available slots.",
    details: ["Real-time availability", "Instant booking confirmation", "Flexible date options", "No double bookings"],
  },
  {
    step: 3,
    icon: CreditCard,
    title: "Secure Booking",
    description: "Complete your booking with secure payment. Get instant confirmation and all the details you need.",
    details: ["Secure payment processing", "Instant confirmation", "Digital receipts", "Booking management"],
  },
  {
    step: 4,
    icon: Star,
    title: "Enjoy Your Event",
    description: "Attend your event and share your experience. Leave a review to help other customers.",
    details: ["Event support", "Direct venue contact", "Review system", "Customer support"],
  },
]

const businessSteps = [
  {
    step: 1,
    icon: Building2,
    title: "List Your Venue",
    description: "Create your venue profile with photos, descriptions, and pricing. Our team will verify your listing.",
    details: ["Professional photos", "Detailed descriptions", "Flexible pricing", "Quick verification"],
  },
  {
    step: 2,
    icon: Calendar,
    title: "Manage Bookings",
    description: "Use our dashboard to manage availability, bookings, and communicate with customers.",
    details: ["Real-time calendar", "Booking management", "Customer communication", "Automated notifications"],
  },
  {
    step: 3,
    icon: BarChart3,
    title: "Track Performance",
    description: "Monitor your venue's performance with detailed analytics and customer feedback.",
    details: ["Booking analytics", "Revenue tracking", "Customer reviews", "Performance insights"],
  },
  {
    step: 4,
    icon: MessageCircle,
    title: "Grow Your Business",
    description: "Use our marketing tools and customer base to grow your venue business.",
    details: ["Marketing support", "Customer acquisition", "Business growth tools", "Dedicated support"],
  },
]

const benefits = [
  {
    icon: Users,
    title: "Trusted Community",
    description: "Join thousands of satisfied customers and verified venue partners",
    stat: "10,000+ Users",
  },
  {
    icon: Building2,
    title: "Quality Venues",
    description: "All venues are verified and reviewed to ensure the highest quality",
    stat: "500+ Venues",
  },
  {
    icon: Star,
    title: "Excellent Service",
    description: "Our customer support team is here to help you every step of the way",
    stat: "4.8/5 Rating",
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

const iconVariants: Variants = {
  hover: {
    scale: 1.2,
    rotate: 10,
    transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" },
  },
}

const buttonVariants: Variants = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" },
  },
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <Header />

      <motion.div
        className="container mx-auto px-4 py-12"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-600">How It Works</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Simple Steps to Perfect Events</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Whether you're planning an event or managing venues, UzEvently makes it simple and efficient
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for venues or guides..."
              className="pl-12 py-4 text-lg border-blue-200 focus:ring-blue-600 bg-white shadow-md rounded-full"
            />
          </div>
        </div>

        {/* For Customers */}
        <motion.div
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Event Planners</h2>
            <p className="text-gray-600">Book the perfect venue in just a few clicks</p>
          </div>

          <div className="space-y-12">
            {customerSteps.map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className="lg:w-1/2">
                  <Card className="h-full bg-gradient-to-br from-blue-50 to-white border-none shadow-lg hover:shadow-xl">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <motion.div
                          className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.2 }}
                        >
                          {step.step}
                        </motion.div>
                        <motion.div variants={iconVariants} whileHover="hover">
                          <step.icon className="w-8 h-8 text-blue-600" />
                        </motion.div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                      <p className="text-gray-600 mb-6">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:w-1/2">
                  <motion.div
                    className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center shadow-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <step.icon className="w-24 h-24 text-blue-600" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* For Business */}
        <motion.div
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Venue Owners</h2>
            <p className="text-gray-600">Grow your business with our platform</p>
          </div>

          <div className="space-y-12">
            {businessSteps.map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className="lg:w-1/2">
                  <Card className="h-full bg-gradient-to-br from-blue-50 to-white border-none shadow-lg hover:shadow-xl">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <motion.div
                          className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.2 }}
                        >
                          {step.step}
                        </motion.div>
                        <motion.div variants={iconVariants} whileHover="hover">
                          <step.icon className="w-8 h-8 text-blue-600" />
                        </motion.div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                      <p className="text-gray-600 mb-6">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:w-1/2">
                  <motion.div
                    className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center shadow-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <step.icon className="w-24 h-24 text-blue-600" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose UzEvently?</h2>
            <p className="text-gray-600">Join our growing community of satisfied users</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover="hover"
              >
                <Card className="bg-gradient-to-br from-blue-50 to-white border-none shadow-lg hover:shadow-xl">
                  <CardContent className="p-8 text-center">
                    <motion.div variants={iconVariants} whileHover="hover">
                      <benefit.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    </motion.div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{benefit.stat}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of users who trust UzEvently for their events</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div variants={buttonVariants} whileHover="hover">
              <Link href="/auth/register">
                <Button size="lg" variant="secondary" className="px-8 bg-white text-blue-600 hover:bg-gray-100">
                  Start Planning Events
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={buttonVariants} whileHover="hover">
              <Link href="/list-your-venue">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                >
                  List Your Venue
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  )
}