"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

type Step = "phone" | "verification" | "reset"

export default function ForgotPasswordPage() {
  const [currentStep, setCurrentStep] = useState<Step>("phone")
  const [phone, setPhone] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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

  const handlePhoneSubmit = async () => {
    const digits = phone.replace(/\D/g, "")
    if (digits.length !== 9) {
      setMessage("Telefon raqami 9 raqamdan iborat bo'lishi kerak (masalan, 90 123 45 67)")
      return
    }

    setIsLoading(true)
    setMessage("")

    try {
      const fullPhone = "+998" + digits
      const response = await fetch("https://c9aeac5fd58a.ngrok-free.app/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "ngrok-skip-browser-warning": "true",
        },
        body: new URLSearchParams({ phoneNumber: fullPhone }),
      })

      const data = await response.json()

      if (response.ok) {
        setCurrentStep("verification")
        setMessage("Tasdiqlash kodi telefoningizga yuborildi!")
      } else {
        setMessage(`Xato: ${data.message || "Serverda xatolik yuz berdi"}`)
      }
    } catch (error) {
      setMessage("Xato yuz berdi: " + (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerificationSubmit = async () => {
    if (verificationCode.length !== 6) {
      setMessage("Tasdiqlash kodi 6 raqamdan iborat bo'lishi kerak")
      return
    }

    setIsLoading(true)
    setMessage("")

    try {
      const digits = phone.replace(/\D/g, "")
      const fullPhone = "+998" + digits
      const response = await fetch("https://c9aeac5fd58a.ngrok-free.app/user/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "ngrok-skip-browser-warning": "true",
        },
        body: new URLSearchParams({ phoneNumber: fullPhone, code: verificationCode }),
      })

      const data = await response.json()

      if (response.ok) {
        setCurrentStep("reset")
        setMessage("")
      } else {
        setMessage(`Xato: ${data.message || "Kod noto'g'ri yoki muddati tugagan"}`)
      }
    } catch (error) {
      setMessage("Xato yuz berdi: " + (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPassword || !confirmPassword) {
      setMessage("Iltimos, barcha maydonlarni to'ldiring")
      return
    }
    if (newPassword !== confirmPassword) {
      setMessage("Parollar mos kelmaydi")
      return
    }
    if (newPassword.length < 6) {
      setMessage("Parol kamida 6 belgi bo'lishi kerak")
      return
    }

    setIsLoading(true)
    setMessage("")

    try {
      const digits = phone.replace(/\D/g, "")
      const fullPhone = "+998" + digits
      const response = await fetch("https://c9aeac5fd58a.ngrok-free.app/user/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "ngrok-skip-browser-warning": "true",
        },
        body: new URLSearchParams({ phoneNumber: fullPhone, code: verificationCode, newPassword }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Parol muvaffaqiyatli o'zgartirildi!")
        setTimeout(() => router.push("/auth/login"), 2000)
      } else {
        setMessage(`Xato: ${data.message || "Parol o'zgartirishda xatolik"}`)
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
          <p className="text-gray-600">Parolni tiklash</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {["phone", "verification", "reset"].map((step, index) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${
                  ["phone", "verification", "reset"].indexOf(currentStep) >= index
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
              {currentStep === "phone" && "Telefon raqamini kiriting"}
              {currentStep === "verification" && "Telefoningizni tasdiqlang"}
              {currentStep === "reset" && "Yangi parol o'rnating"}
            </CardTitle>
            <CardDescription>
              {currentStep === "phone" && "Parolni tiklash uchun telefon raqamingizni kiriting"}
              {currentStep === "verification" && "Telefoningizga yuborilgan 6 raqamli kodni kiriting"}
              {currentStep === "reset" && "Yangi parolingizni o'rnating va tasdiqlang"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Phone Step */}
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
                <Button onClick={handlePhoneSubmit} className="w-full" disabled={phone.replace(/\D/g, "").length !== 9 || isLoading}>
                  {isLoading ? "Yuklanmoqda..." : "Kodni yuborish"}
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
                <Button onClick={handleVerificationSubmit} className="w-full" disabled={verificationCode.length !== 6 || isLoading}>
                  {isLoading ? "Yuklanmoqda..." : "Kodni tasdiqlash"}
                </Button>
                <Button variant="ghost" className="w-full text-sm" disabled={isLoading}>
                  Kodni qayta yuborish
                </Button>
                {message && <p className="text-center text-sm text-red-600">{message}</p>}
              </div>
            )}

            {/* Reset Step */}
            {currentStep === "reset" && (
              <form onSubmit={handleResetSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Yangi parol</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Yangi parolingiz"
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
                <Button type="submit" className="w-full" disabled={isLoading || !newPassword || !confirmPassword}>
                  {isLoading ? "Yuklanmoqda..." : "Parolni o'zgartirish"}
                </Button>
                {message && <p className="text-center text-sm text-red-600">{message}</p>}
                {message.includes("muvaffaqiyatli") && (
                  <p className="text-center text-sm text-green-600">Tez orada login sahifasiga yo'naltirilasiz...</p>
                )}
              </form>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Hisobingizga qaytish uchun?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Kirish
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}