"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CreditCard } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion, Variants } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import jsPDF from "jspdf"

// Mock room data with images
const rooms = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Room ${i + 1}`,
  type: i % 2 === 0 ? "Standard" : "Deluxe",
  price: i % 2 === 0 ? "$100/night" : "$150/night",
  capacity: i % 2 === 0 ? "2 guests" : "4 guests",
  image: `/images/room/room${(i % 5) + 1}.png` || "/placeholder.svg?height=200&width=300",
}))

// Mock booked rooms (example data for July 25, 2025, and some future dates)
const initialBookedRooms = [
  { roomId: 1, date: "Fri Jul 25 2025" },
  { roomId: 3, date: "Fri Jul 25 2025" },
  { roomId: 5, date: "Fri Jul 25 2025" },
  { roomId: 7, date: "Sat Jul 26 2025" },
  { roomId: 9, date: "Sun Jul 27 2025" },
]

export default function RoomSelectionPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)
  const [bookedRooms, setBookedRooms] = useState<{ roomId: number; date: string }[]>(initialBookedRooms)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: "", expiry: "", cvv: "", cardHolder: "" })
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const dateParam = searchParams.get("date")
    if (dateParam) {
      setSelectedDate(new Date(dateParam))
    }
  }, [searchParams])

  const isDateBooked = (date: Date | undefined, roomId: number) => {
    if (!date) return false; // Return false if date is undefined
    return bookedRooms.some((booking) => booking.roomId === roomId && booking.date === date.toDateString())
  }

  const handleBooking = () => {
    if (selectedDate && selectedRoom && !isDateBooked(selectedDate, selectedRoom)) {
      setShowPaymentModal(true)
    }
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentStatus("processing")
    setTimeout(() => {
      setPaymentStatus("success")
      setTimeout(() => {
        if (selectedDate && selectedRoom) {
          setBookedRooms([...bookedRooms, { roomId: selectedRoom, date: selectedDate.toDateString() }])
          setShowPaymentModal(false)
          setPaymentDetails({ cardNumber: "", expiry: "", cvv: "", cardHolder: "" })
          setSelectedRoom(null)
          // Generate and download PDF after booking
          generateBookingPDF(selectedDate, selectedRoom)
          router.push(`/venues/1`) // Return to hotel page after booking
          alert(`Room ${selectedRoom} booked for ${selectedDate.toDateString()}`)
        }
      }, 2000)
    }, 2000)
  }

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16)
    return digits.match(/.{1,4}/g)?.join(" ") || digits
  }

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4)
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
  }

  const isHumoOrUzcard = paymentDetails.cardNumber.replace(/\s/g, "").startsWith("9860") || paymentDetails.cardNumber.replace(/\s/g, "").startsWith("8600")

  // Animation variants
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const roomVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
    hover: { scale: 1.05, boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)", transition: { duration: 0.3, ease: "easeOut" } },
  }

  const buttonVariants: Variants = {
    hover: { scale: 1.05, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", transition: { duration: 0.3, ease: "easeOut" } },
  }

  // Function to generate and download PDF using jsPDF with enhanced design
  const generateBookingPDF = (date: Date, roomId: number) => {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const room = rooms.find(r => r.id === roomId);

    // Add stamp at the top
    doc.setFillColor(220, 220, 220); // Light gray background for stamp
    doc.circle(30, 20, 15, "F"); // Circular stamp
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text("Uzevently", 25, 20, { align: "center" });
    doc.text("Tasdiq", 25, 25, { align: "center" });

    // Title and header
    doc.setFillColor(0, 102, 204); // Blue header
    doc.rect(0, 40, 210, 20, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("Uzevently - Xona Bandligi Tasdig'i", 105, 52, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Sanasi: ${new Date().toLocaleString("uz-UZ", { dateStyle: "full", timeStyle: "medium" })}`, 105, 60, { align: "center" });

    // Booking details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text("Xona Bandligi Tasdig'i", 20, 80);
    doc.setFontSize(12);
    doc.setDrawColor(0, 0, 0);
    doc.line(20, 85, 190, 85); // Horizontal line
    doc.text(`Xona raqami: ${room?.name}`, 20, 95);
    doc.text(`Turi: ${room?.type}`, 20, 105);
    doc.text(`Sana: ${date.toDateString()}`, 20, 115);
    doc.text(`Narx: ${room?.price}`, 20, 125);
    doc.text(`Sig'im: ${room?.capacity}`, 20, 135);
    doc.text(`Band qilish vaqti: ${new Date().toLocaleString("uz-UZ", { dateStyle: "full", timeStyle: "medium" })}`, 20, 145);

    // Additional messages
    doc.setTextColor(0, 128, 0); // Green color for messages
    doc.text("Rahmat mijozimiz bo‘lgani uchun!", 20, 160);
    doc.text("Uzevently bilan dam oling!", 20, 170);

    // Contact and legal disclaimer
    doc.setTextColor(0, 0, 0);
    doc.text("Qo‘shimcha ma'lumotlar uchun:", 20, 190);
    doc.text("Email: support@uzevently.uz", 20, 200);
    doc.text("Telefon: +998 99 449 49 16", 20, 210);

    doc.setFontSize(10);
    doc.text("Qonuniy ogohlantiruv: Uzevently kompaniyasi ushbu hujjatni qonuniy ravishda tasdiqlaydi. Ushbu hujjat faqat band qilish ma'lumotlarini aks ettiradi va qaytarish yoki o'zgartirish uchun qo'shimcha shartlarga rioya qilish kerak.", 20, 220, { maxWidth: 170 });

    // Footer
    doc.setFillColor(0, 102, 204);
    doc.rect(0, 250, 210, 20, "F");
    doc.setTextColor(255, 255, 255);
    doc.text("Ra'no Tashpulatova - Bosh menejer", 20, 262);
    doc.text(`Tasdiqlash sanasi: ${new Date().toLocaleString("uz-UZ", { dateStyle: "full" })}`, 20, 270);

    // Download the PDF
    doc.save(`booking_confirmation_room_${roomId}_${date.toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Header />
      <motion.div className="container mx-auto px-4 py-8" initial="hidden" animate="visible" variants={sectionVariants}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Select a Room</h1>
        {selectedDate ? (
          <p className="text-lg text-gray-600 mb-6">Available rooms for {selectedDate.toDateString()}</p>
        ) : (
          <p className="text-lg text-gray-600 mb-6">Please select a date on the hotel page to view rooms.</p>
        )}
        {selectedDate && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {rooms.map((room, index) => {
              const isBooked = isDateBooked(selectedDate, room.id)
              return (
                <motion.div
                  key={room.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={roomVariants}
                  whileHover={!isBooked ? "hover" : undefined} // Disable hover effect for booked rooms
                  className={`cursor-pointer p-4 rounded-lg shadow-md ${
                    selectedRoom === room.id
                      ? "border-2 border-blue-600 bg-blue-50"
                      : isBooked
                      ? "bg-red-100 cursor-not-allowed"
                      : "bg-white hover:bg-blue-50"
                  }`}
                  onClick={() => !isBooked && setSelectedRoom(room.id)}
                >
                  <img src={room.image} alt={room.name} className="w-full h-40 object-cover rounded-md mb-2" />
                  <h3 className="font-medium text-gray-800">{room.name} ({room.type})</h3>
                  <p className="text-sm text-gray-600">{room.capacity}</p>
                  <p className="text-lg font-semibold text-blue-600 mt-1">{room.price}</p>
                  {isBooked && <p className="text-xs text-red-600 mt-1">Booked</p>}
                </motion.div>
              )
            })}
          </div>
        )}
        {selectedDate && selectedRoom && !isDateBooked(selectedDate, selectedRoom) && (
          <motion.div variants={buttonVariants} whileHover="hover" className="mt-8">
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-cyan-700 text-white"
              onClick={handleBooking}
            >
              Book Now
            </Button>
          </motion.div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <Card className="bg-white max-w-md w-full mx-4">
              <CardHeader>
                <CardTitle className="text-2xl">Enter Payment Details</CardTitle>
                <CardDescription>Securely book Room {selectedRoom} for {selectedDate?.toDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                {paymentStatus === "success" ? (
                  <div className="text-center space-y-4">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
                      <CreditCard className="w-16 h-16 text-blue-600 mx-auto" />
                    </motion.div>
                    <p className="text-lg font-medium text-blue-600">Payment Successful!</p>
                    <p className="text-gray-600">Room {selectedRoom} booked for {selectedDate?.toDateString()}.</p>
                    <motion.div variants={buttonVariants} whileHover="hover" className="mt-4">
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                        onClick={() => selectedDate && generateBookingPDF(selectedDate, selectedRoom!)}
                      >
                        Download Confirmation (PDF)
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <Input
                        placeholder="9860 1606 1234 5678"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: formatCardNumber(e.target.value) })}
                        className="border-gray-300 focus:ring-blue-600"
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
                          className="border-gray-300 focus:ring-blue-600"
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
                            className="border-gray-300 focus:ring-green-600"
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
                        className="border-gray-300 focus:ring-blue-600"
                        required
                      />
                    </div>
                    <div className="flex space-x-4">
                      <motion.div variants={buttonVariants} whileHover="hover">
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                          disabled={paymentStatus === "processing"}
                        >
                          {paymentStatus === "processing" ? "Processing..." : "Pay Now"}
                        </Button>
                      </motion.div>
                      <motion.div variants={buttonVariants} whileHover="hover">
                        <Button
                          variant="outline"
                          className="w-full bg-transparent border-gray-300 text-gray-600 hover:bg-gray-100"
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