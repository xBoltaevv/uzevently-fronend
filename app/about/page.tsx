"use client"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, Calendar, Star, Award, Shield } from "lucide-react"
import Footer from "@/components/footer"
import { motion, Variants } from "framer-motion"

// Jamoa a'zolari ma'lumotlari
const teamMembers = [
  {
    name: "Ilyosbek Axmedjanov",
    role: "CEO & Founder",
    image: "/images/ilya.jpg",
  },

  {
    name: "Asadbek Sharipov",
    role: "Chief Marketing Officer",
    image: "/images/Asadbek.png",
  },
  {
    name: "Xoshnud Ravshanov",
    role: "Chief Technology Officer",
    image: "/images/Xoshnud.jpg",
  },
  {
    name: "Bekzod Bobojonov",
    role: "Chief Legal Officer",
    image: "/images/Bekzod.jpg",
  },
]

const features = [
  {
    icon: Shield,
    title: "Trusted Platform",
    description: "All venues are verified and reviewed by our team to ensure quality and reliability.",
  },
  {
    icon: Award,
    title: "Best Prices",
    description: "We work directly with venue owners to offer you the most competitive prices.",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Our dedicated team is here to help you plan the perfect event from start to finish.",
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

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.3 },
  },
}

export default function AboutPage() {
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
          <Badge className="mb-4 bg-blue-600">About UzEvently</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Making Event Planning Simple and Enjoyable</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            UzEvently is Uzbekistan's leading event booking platform, connecting event organizers with the perfect
            venues for their special occasions.
          </p>
        </div>

        {/* Story Section */}
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Founded in 2023, UzEvently was born from a simple idea: event planning should be stress-free and
                enjoyable. We noticed that finding and booking the perfect venue in Uzbekistan was often complicated and
                time-consuming.
              </p>
              <p>
                Our team of event planning experts and technology professionals came together to create a platform that
                simplifies the entire process. From wedding halls in Tashkent to restaurants in Samarkand, we've
                partnered with the best venues across Uzbekistan.
              </p>
              <p>
                Today, we're proud to be the trusted choice for thousands of customers who have successfully planned
                their dream events through our platform.
              </p>
            </div>
          </div>
          <motion.div
            className="relative"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
          >
            <img
              src="/images/ilya.jpg"
              alt="UzEvently team"
              className="rounded-lg shadow-lg h-[500px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-lg"></div>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose UzEvently?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best event booking experience in Uzbekistan
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={cardVariants}
              >
                <Card className="bg-gradient-to-br from-blue-50 to-white border-none shadow-lg hover:shadow-xl">
                  <CardHeader>
                    <motion.div variants={iconVariants} whileHover="hover">
                      <feature.icon className="w-10 h-10 text-blue-600 mb-4" />
                    </motion.div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          {[
            {
              title: "Our Mission",
              description:
                "To revolutionize event planning in Uzbekistan by providing a seamless, transparent, and reliable platform that connects event organizers with exceptional venues, making every celebration memorable and stress-free.",
            },
            {
              title: "Our Vision",
              description:
                "To become the leading event booking platform across Central Asia, empowering communities to celebrate life's special moments while supporting local businesses and preserving cultural traditions.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
            >
              <Card className="bg-gradient-to-br from-blue-50 to-white border-none shadow-lg hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Members */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated team is passionate about making your events unforgettable
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={cardVariants}
              >
                <Card className="text-center bg-gradient-to-br from-blue-50 to-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <motion.div
                      className="relative group"
                      variants={imageVariants}
                      whileHover="hover"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gradient-to-r from-blue-500 to-purple-500 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                    <div className="text-xl font-bold text-gray-900 mb-2">{member.name}</div>
                    <div className="text-gray-600 text-sm">{member.role}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  )
}