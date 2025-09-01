"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, User, Building2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

type Step = "role" | "phone" | "verification" | "details" | "complete"

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState<Step>("role")
  const [selectedRole, setSelectedRole] = useState<"PERSONAL" | "BUSINESS" | "">("")
  const [phone, setPhone] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  // Telefon raqamini formatlash (90 123 45 67)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 9) {
      let formatted = ""
      for (let i = 0; i < value.length; i++) {
        if (i === 2) formatted += " "
        else if (i === 5) formatted += " "
        else if (i === 7) formatted += " "
        formatted += value[i]
      }
      setPhone(formatted)
    }
  }

  const handlePhoneSubmit = () => {
    const digits = phone.replace(/\D/g, "")
    if (digits.length === 9) {
      setCurrentStep("verification")
      setMessage("")
    } else {
      setMessage("Telefon raqami 9 raqamdan iborat bo'lishi kerak (masalan, 90 123 45 67)")
    }
  }

  const handleVerificationSubmit = () => {
    if (verificationCode.length === 6) {
      setCurrentStep("details")
      setMessage("")
    } else {
      setMessage("Tasdiqlash kodi 6 raqamdan iborat bo'lishi kerak")
    }
  }

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName || !lastName || !phone || !password || !confirmPassword) {
      setMessage("Iltimos, barcha maydonlarni to'ldiring")
      return
    }
    if (password !== confirmPassword) {
      setMessage("Parollar mos kelmaydi")
      return
    }
    if (password.length < 6) {
      setMessage("Parol kamida 6 belgi bo'lishi kerak")
      return
    }

    setIsLoading(true)
    setMessage("")

    try {
      const fullPhone = "+998" + phone.replace(/\D/g, "")
      const adminPhone = "+998994494916" // Admin uchun telefon raqami
      // Telefon raqamini tekshirish va rolni aniqlash
      const role = fullPhone === adminPhone ? "admin" : selectedRole === "BUSINESS" ? "business" : "user"

      const userData = {
        phoneNumber: fullPhone,
        name: `${firstName} ${lastName}`,
        address,
        accountType: selectedRole,
        password,
        confirmPassword,
        firstName,
        lastName,
        role, // Backendga yuboriladigan rol
      }

      // Backendga so'rov yuborish
      const response = await fetch("http://165.22.21.223:8080/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (response.ok) {
        // Auth context'ga user ma'lumotlarini saqlash
        const userForAuth = {
          id: data.user?.id || Date.now().toString(),
          firstName,
          lastName,
          phoneNumber: fullPhone,
          role: role as "user" | "business" | "admin",
          isAuthenticated: true,
          token: data.token,
          address,
          name: `${firstName} ${lastName}`,
          accountType: selectedRole,
        }

        login(userForAuth)
        setMessage("Ro'yxatdan o'tish muvaffaqiyatli!")
        setCurrentStep("complete")

        setTimeout(() => {
          // Ro‘lga qarab yo‘naltirish
          if (role === "admin") {
            router.push("https://localhost:3000/admin/dashboard")
          } else if (selectedRole === "BUSINESS") {
            router.push("/business/dashboard")
          } else {
            router.push("/dashboard")
          }
        }, 2000)
      } else {
        setMessage(`Xato: ${data.message || "Serverda xatolik yuz berdi"}`)
      }
    } catch (error) {
      setMessage("Xato yuz berdi: " + (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Orqaga
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">UE</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">UzEvently</span>
          </div>
          <p className="text-gray-600">Hisob yarating</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {["role", "phone", "verification", "details", "complete"].map((step, index) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${
                  ["role", "phone", "verification", "details", "complete"].indexOf(currentStep) >= index
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === "role" && "Hisob turini tanlang"}
              {currentStep === "phone" && "Telefon raqamini kiriting"}
              {currentStep === "verification" && "Telefoningizni tasdiqlang"}
              {currentStep === "details" && "Shaxsiy ma'lumotlar"}
              {currentStep === "complete" && "UzEvently'ga xush kelibsiz!"}
            </CardTitle>
            <CardDescription>
              {currentStep === "role" && "Yaratmoqchi bo'lgan hisob turini tanlang"}
              {currentStep === "phone" && "Sizga tasdiqlash kodi yuboramiz"}
              {currentStep === "verification" && "Telefoningizga yuborilgan 6 raqamli kodni kiriting"}
              {currentStep === "details" && "O'zingiz haqida ma'lumot kiriting"}
              {currentStep === "complete" && "Hisobingiz muvaffaqiyatli yaratildi"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Role Selection Step */}
            {currentStep === "role" && (
              <div className="space-y-4">
                <div
                  onClick={() => {
                    setSelectedRole("PERSONAL")
                    setCurrentStep("phone")
                  }}
                  className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <User className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Shaxsiy hisob</h3>
                      <p className="text-sm text-gray-600">Tadbirlar uchun joy band qiling</p>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => {
                    setSelectedRole("BUSINESS")
                    setCurrentStep("phone")
                  }}
                  className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Biznes hisob</h3>
                      <p className="text-sm text-gray-600">Joylaringizni ro'yxatga oling va boshqaring</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Phone Number Step */}
            {currentStep === "phone" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon raqami</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md">
                      <span className="text-sm text-gray-600">+998</span>
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="90 123 45 67"
                      value={phone}
                      onChange={handlePhoneChange}
                      className="rounded-l-none"
                      required
                    />
                  </div>
                </div>
                <Button onClick={handlePhoneSubmit} className="w-full" disabled={phone.replace(/\D/g, "").length !== 9}>
                  Tasdiqlash kodi yuborish
                </Button>
                {message && <p className="text-center text-sm text-red-600">{message}</p>}
              </div>
            )}

            {/* Verification Step */}
            {currentStep === "verification" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Tasdiqlash kodi</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="123456"
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                    className="text-center text-2xl tracking-widest"
                  />
                  <p className="text-sm text-gray-600 text-center">Kod +998 {phone} ga yuborildi</p>
                </div>
                <Button onClick={handleVerificationSubmit} className="w-full" disabled={verificationCode.length !== 6}>
                  Kodni tasdiqlash
                </Button>
                <Button variant="ghost" className="w-full text-sm">
                  Kodni qayta yuborish
                </Button>
                {message && <p className="text-center text-sm text-red-600">{message}</p>}
              </div>
            )}

            {/* Details Step */}
            {currentStep === "details" && (
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ism</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Ismingiz"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Familiya</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Familiyangiz"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Parol</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Parolingiz"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Parolni tasdiqlang</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Parolni qayta kiriting"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Manzil (ixtiyoriy)</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Manzilingiz"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !firstName || !lastName || !password || !confirmPassword}
                >
                  {isLoading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
                </Button>
                {message && <p className="text-center text-sm text-red-600">{message}</p>}
              </form>
            )}

            {/* Complete Step */}
            {currentStep === "complete" && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  Xush kelibsiz, {firstName}! Sizning hisobingiz muvaffaqiyatli yaratildi.
                </p>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Hisobingiz bormi?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Kirish
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}