"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MessageCircle, Phone, Mail, Book, Search, Users, Calendar, CreditCard, Settings, Shield } from "lucide-react"
import { motion, Variants } from "framer-motion"

const supportCategories = [
  {
    icon: Calendar,
    title: "Booking Help",
    description: "Issues with making or managing bookings",
    articles: 12,
  },
  {
    icon: CreditCard,
    title: "Payment & Billing",
    description: "Payment issues, refunds, and billing questions",
    articles: 8,
  },
  {
    icon: Users,
    title: "Account Management",
    description: "Profile settings, password, and account issues",
    articles: 15,
  },
  {
    icon: Settings,
    title: "Technical Issues",
    description: "App problems, bugs, and technical difficulties",
    articles: 10,
  },
  {
    icon: Shield,
    title: "Safety & Security",
    description: "Privacy, security, and safety concerns",
    articles: 6,
  },
  {
    icon: Book,
    title: "General Questions",
    description: "How-to guides and general platform questions",
    articles: 20,
  },
]

const faqs = [
  {
    question: "How do I book a venue?",
    answer:
      "To book a venue, browse our listings, select your preferred venue, choose an available date, and complete the booking process. You'll receive a confirmation email once your booking is confirmed.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes, you can cancel or modify your booking up to 48 hours before the event date. Go to your dashboard, find your booking, and use the modify or cancel options. Cancellation policies may vary by venue.",
  },
  {
    question: "How do I become a venue partner?",
    answer:
      "To list your venue on UzEvently, click on 'List Your Venue' in the header, fill out the application form with your venue details, and our team will review and approve your listing within 2-3 business days.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards (Visa, MasterCard), PayPal, and local payment methods including Uzcard and Humo. All payments are processed securely through our encrypted payment system.",
  },
  {
    question: "How do I contact a venue directly?",
    answer:
      "You can find the venue's contact information on their listing page. We also facilitate communication through our messaging system to help coordinate your event details.",
  },
  {
    question: "What if I have issues with a venue?",
    answer:
      "If you experience any issues with a venue, please contact our support team immediately. We'll work with both parties to resolve the issue and ensure you have a great experience.",
  },
]

const contactOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our support team",
    availability: "Available 24/7",
    action: "Start Chat",
    primary: true,
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our experts",
    availability: "Mon-Fri 9AM-6PM",
    action: "Call Now",
    primary: false,
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us detailed questions",
    availability: "Response within 24 hours",
    action: "Send Email",
    primary: false,
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

const iconVariants: Variants = {
  hover: {
    scale: 1.2,
    rotate: 10,
    transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" },
  },
}

const accordionVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

export default function SupportPage() {
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
          <Badge className="mb-4 bg-blue-600">Support Center</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">How can we help you?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to common questions or get in touch with our support team
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for help articles..."
              className="pl-12 py-4 text-lg border-blue-200 focus:ring-blue-600 bg-white shadow-md rounded-full"
            />
          </div>
        </div>

        {/* Contact Options */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          {contactOptions.map((option, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover="hover"
            >
              <Card
                className={`bg-gradient-to-br from-blue-50 to-white border-none shadow-lg ${
                  option.primary ? "border-2 border-blue-500" : ""
                }`}
              >
                <CardContent className="p-6 text-center">
                  <motion.div variants={iconVariants} whileHover="hover">
                    <option.icon
                      className={`w-10 h-10 mx-auto mb-4 ${option.primary ? "text-blue-600" : "text-gray-600"}`}
                    />
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-2">{option.description}</p>
                  <p className="text-sm text-gray-500 mb-4">{option.availability}</p>
                  <motion.div variants={buttonVariants} whileHover="hover">
                    <Button
                      className={option.primary ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}
                      variant={option.primary ? "default" : "outline"}
                    >
                      {option.action}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Support Categories */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-gray-600">Find help articles organized by topic</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCategories.map((category, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover="hover"
              >
                <Card className="bg-gradient-to-br from-blue-50 to-white border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <motion.div variants={iconVariants} whileHover="hover">
                      <category.icon className="w-8 h-8 text-blue-600 mb-4" />
                    </motion.div>
                    <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                    <p className="text-gray-600 mb-3">{category.description}</p>
                    <p className="text-sm text-blue-600">{category.articles} articles</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to common questions</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <AccordionItem value={`item-${index}`} className="border rounded-lg px-6 bg-white shadow-md">
                    <AccordionTrigger className="text-left font-medium hover:text-blue-600">
                      {faq.question}
                    </AccordionTrigger>
                    <motion.div
                      variants={accordionVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <AccordionContent className="text-gray-700 pb-4">{faq.answer}</AccordionContent>
                    </motion.div>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-white border-none shadow-lg">
            <CardHeader className="text-center">
              <CardTitle>Still need help?</CardTitle>
              <CardDescription>Send us a message and we'll get back to you within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="border-blue-200 focus:ring-blue-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="border-blue-200 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="border-blue-200 focus:ring-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select className="w-full p-2 border border-blue-200 rounded-md focus:ring-blue-600 focus:border-blue-600">
                    <option>Select a category</option>
                    <option>Booking Help</option>
                    <option>Payment & Billing</option>
                    <option>Account Management</option>
                    <option>Technical Issues</option>
                    <option>Safety & Security</option>
                    <option>General Questions</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    className="border-blue-200 focus:ring-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please provide as much detail as possible..."
                    rows={6}
                    className="border-blue-200 focus:ring-blue-600"
                  />
                </div>
                <motion.div variants={buttonVariants} whileHover="hover">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Message</Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  )
}