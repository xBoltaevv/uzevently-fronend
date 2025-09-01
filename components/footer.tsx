"use client"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { motion, Variants } from "framer-motion"

export default function Footer() {
  const { user } = useAuth()

  // Animatsiya variantlari
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const linkVariants: Variants = {
    hover: {
      y: -2,
      color: "#ffffff",
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

  return (
    <motion.footer
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">UE</span>
              </div>
              <div>
                <span className="text-2xl font-bold">UzEvently</span>
                <div className="text-sm text-gray-400">Event Booking Platform</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Making event planning simple and enjoyable across Uzbekistan. Connect with the best venues for your
              special occasions.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">123 Amir Timur Street, Tashkent 100000</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+998 71 123 45 67</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@uzevently.uz</span>
              </div>
            </div>
          </div>

          {/* Dynamic Content Based on User Role */}
          {user?.role === "business" ? (
            <>
              {/* Business Account Sections */}
              <div>
                <h3 className="font-bold text-lg mb-4">Business Tools</h3>
                <ul className="space-y-4 text-gray-400">
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/business/dashboard" className="hover:text-white transition-colors">
                        Business Dashboard
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/business/dashboard?tab=venues" className="hover:text-white transition-colors">
                        Manage Venues
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/business/dashboard?tab=bookings" className="hover:text-white transition-colors">
                        Booking Management
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/business/dashboard?tab=analytics" className="hover:text-white transition-colors">
                        Analytics & Reports
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/list-your-venue" className="hover:text-white transition-colors">
                        Add New Venue
                      </Link>
                    </motion.div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Business Support</h3>
                <ul className="space-y-4 text-gray-400">
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/how-it-works" className="hover:text-white transition-colors">
                        How It Works
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/support" className="hover:text-white transition-colors">
                        Business Support
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/blog" className="hover:text-white transition-colors">
                        Business Blog
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/business/resources" className="hover:text-white transition-colors">
                        Resources
                      </Link>
                    </motion.div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Account & Legal</h3>
                <ul className="space-y-4 text-gray-400">
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/business/dashboard?tab=settings" className="hover:text-white transition-colors">
                        Account Settings
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/privacy" className="hover:text-white transition-colors">
                        Privacy Policy
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/terms" className="hover:text-white transition-colors">
                        Terms of Service
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/contact" className="hover:text-white transition-colors">
                        Contact Us
                      </Link>
                    </motion.div>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Regular User or Guest Sections */}
              <div>
                <h3 className="font-bold text-lg mb-4">For Customers</h3>
                <ul className="space-y-4 text-gray-400">
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/venues" className="hover:text-white transition-colors">
                        Browse Venues
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/how-it-works" className="hover:text-white transition-colors">
                        How It Works
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/support" className="hover:text-white transition-colors">
                        Support
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/blog" className="hover:text-white transition-colors">
                        Blog
                      </Link>
                    </motion.div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">For Business</h3>
                <ul className="space-y-4 text-gray-400">
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/list-your-venue" className="hover:text-white transition-colors">
                        List Your Venue
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/auth/register" className="hover:text-white transition-colors">
                        Business Registration
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/support" className="hover:text-white transition-colors">
                        Business Support
                      </Link>
                    </motion.div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Company</h3>
                <ul className="space-y-4 text-gray-400">
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/about" className="hover:text-white transition-colors">
                        About Us
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/contact" className="hover:text-white transition-colors">
                        Contact
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/privacy" className="hover:text-white transition-colors">
                        Privacy Policy
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover="hover" variants={linkVariants}>
                      <Link href="/support" className="hover:text-white transition-colors">
                        Help Center
                      </Link>
                    </motion.div>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 font-medium">Follow us:</span>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover="hover"
                  variants={iconVariants}
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover="hover"
                  variants={iconVariants}
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover="hover"
                  variants={iconVariants}
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover="hover"
                  variants={iconVariants}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
               
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">
                {user?.role === "business" ? "Business Newsletter:" : "Subscribe to our newsletter:"}
              </span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-800 border border-blue-200 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-r-md transition-colors"
                  whileHover="hover"
                  variants={buttonVariants}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}

      </div>
    </motion.footer>
  )
}