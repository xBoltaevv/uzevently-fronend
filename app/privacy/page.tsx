import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Lock, Users, Database, Globe } from "lucide-react"

const privacyPrinciples = [
  {
    icon: Shield,
    title: "Data Protection",
    description: "We use industry-standard security measures to protect your personal information.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "We're clear about what data we collect and how we use it.",
  },
  {
    icon: Lock,
    title: "Secure Storage",
    description: "Your data is encrypted and stored securely in compliance with international standards.",
  },
  {
    icon: Users,
    title: "User Control",
    description: "You have full control over your data and can request deletion at any time.",
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4">Privacy Policy</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Your Privacy Matters to Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to protecting your privacy and being transparent about how we collect, use, and share your
            information.
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: January 15, 2024</p>
        </div>

        {/* Privacy Principles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {privacyPrinciples.map((principle, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <principle.icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{principle.title}</h3>
                <p className="text-sm text-gray-600">{principle.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Privacy Policy Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2 text-blue-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <p className="text-gray-700 mb-4">When you create an account or use our services, we may collect:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Name and contact information (phone number, email address)</li>
                  <li>Account credentials and profile information</li>
                  <li>Payment information (processed securely by our payment partners)</li>
                  <li>Booking history and preferences</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Usage Information</h4>
                <p className="text-gray-700 mb-4">
                  We automatically collect information about how you use our platform:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Device information and browser type</li>
                  <li>IP address and location data</li>
                  <li>Pages visited and features used</li>
                  <li>Search queries and booking interactions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2 text-blue-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Provide and improve our event booking services</li>
                <li>Process bookings and facilitate communication with venues</li>
                <li>Send important updates about your bookings and account</li>
                <li>Personalize your experience and show relevant venues</li>
                <li>Prevent fraud and ensure platform security</li>
                <li>Comply with legal obligations and resolve disputes</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-600" />
                Information Sharing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  <strong>Venue Partners:</strong> To facilitate bookings and communication
                </li>
                <li>
                  <strong>Service Providers:</strong> Third-party companies that help us operate our platform
                </li>
                <li>
                  <strong>Payment Processors:</strong> To process payments securely
                </li>
                <li>
                  <strong>Legal Authorities:</strong> When required by law or to protect our rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                We never sell your personal information to third parties for marketing purposes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="w-5 h-5 mr-2 text-blue-600" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and employee training</li>
                <li>Secure data centers and backup systems</li>
                <li>Incident response and breach notification procedures</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Access and review your personal information</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Delete your account and personal information</li>
                <li>Export your data in a portable format</li>
                <li>Opt-out of marketing communications</li>
                <li>Restrict or object to certain data processing</li>
              </ul>
              <p className="text-gray-700 mt-4">To exercise these rights, please contact us at privacy@uzevently.uz</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">We use cookies and similar technologies to enhance your experience:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  <strong>Essential Cookies:</strong> Required for basic platform functionality
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how you use our platform
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Used to show relevant advertisements
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your settings and preferences
                </li>
              </ul>
              <p className="text-gray-700 mt-4">You can manage cookie preferences through your browser settings.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Email:</strong> privacy@uzevently.uz
                </p>
                <p>
                  <strong>Phone:</strong> +998 71 123 45 67
                </p>
                <p>
                  <strong>Address:</strong> 123 Amir Timur Street, Tashkent 100000, Uzbekistan
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
