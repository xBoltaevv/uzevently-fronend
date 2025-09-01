import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown } from "lucide-react"

const customerPlans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    description: "Perfect for occasional event planning",
    icon: Star,
    features: [
      "Browse all venues",
      "Basic search filters",
      "Read reviews",
      "Contact venues directly",
      "Save up to 5 favorites",
    ],
    limitations: ["Limited booking history", "Basic customer support"],
    popular: false,
  },
  {
    name: "Premium",
    price: "9.99",
    period: "month",
    description: "Best for frequent event organizers",
    icon: Zap,
    features: [
      "Everything in Free",
      "Advanced search filters",
      "Priority customer support",
      "Unlimited favorites",
      "Booking reminders",
      "Exclusive venue deals",
      "Event planning tools",
    ],
    popular: true,
  },
]

const businessPlans = [
  {
    name: "Starter",
    price: "29",
    period: "month",
    description: "Perfect for small venues",
    icon: Star,
    features: [
      "List up to 3 venues",
      "Basic venue management",
      "Customer inquiries",
      "Basic analytics",
      "Email support",
    ],
    limitations: ["Limited photos per venue", "Basic booking calendar"],
    popular: false,
  },
  {
    name: "Professional",
    price: "79",
    period: "month",
    description: "Most popular for growing businesses",
    icon: Zap,
    features: [
      "List up to 10 venues",
      "Advanced venue management",
      "Booking management system",
      "Detailed analytics",
      "Priority support",
      "Custom pricing options",
      "Marketing tools",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "199",
    period: "month",
    description: "For large venue chains",
    icon: Crown,
    features: [
      "Unlimited venues",
      "Full management suite",
      "Advanced analytics & reports",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "White-label options",
    ],
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4">Pricing Plans</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Choose the Perfect Plan for You</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you're planning events or managing venues, we have the right plan to help you succeed.
          </p>
        </div>

        {/* Customer Plans */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Event Planners</h2>
            <p className="text-gray-600">Find and book the perfect venues for your events</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {customerPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? "border-blue-500 shadow-lg" : ""}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <plan.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                    <span className="text-lg font-normal text-gray-600">/{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations?.map((limitation, idx) => (
                      <li key={idx} className="flex items-center text-gray-500">
                        <Check className="w-4 h-4 text-gray-300 mr-3 flex-shrink-0" />
                        <span className="text-sm">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}>
                    {plan.price === "0" ? "Get Started Free" : "Start Free Trial"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Business Plans */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Venue Owners</h2>
            <p className="text-gray-600">Manage your venues and grow your business</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {businessPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? "border-blue-500 shadow-lg" : ""}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <plan.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                    <span className="text-lg font-normal text-gray-600">/{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations?.map((limitation, idx) => (
                      <li key={idx} className="flex items-center text-gray-500">
                        <Check className="w-4 h-4 text-gray-300 mr-3 flex-shrink-0" />
                        <span className="text-sm">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}>
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change my plan anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next
                  billing cycle.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, all paid plans come with a 14-day free trial. No credit card required to start.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and local payment methods in Uzbekistan.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
