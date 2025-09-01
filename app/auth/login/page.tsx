  "use client"

  import type React from "react"
  import { useState } from "react"
  import Link from "next/link"
  import { useRouter } from "next/navigation"
  import { Button } from "@/components/ui/button"
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { ArrowLeft, Eye, EyeOff } from "lucide-react"
  import { useAuth } from "@/contexts/auth-context"

  export default function LoginPage() {
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
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

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      if (!phone || !password) {
        setMessage("Iltimos, barcha maydonlarni to'ldiring")
        return
      }

      const digits = phone.replace(/\D/g, "")
      if (digits.length !== 9) {
        setMessage("Telefon raqami 9 raqamdan iborat bo'lishi kerak")
        return
      }

      setIsLoading(true)
      setMessage("")

      try {
        const fullPhone = "+998" + digits
        const formData = new URLSearchParams()
        formData.append("phoneNumber", fullPhone)
        formData.append("password", password)

        // Backendga so'rov yuborish
        const response = await fetch("http://165.22.21.223:8080/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "ngrok-skip-browser-warning": "true",
          },
          body: formData,
        })

        const data = await response.json()
        console.log("To'liq javob:", data)
        if (response.ok) {
          // Backend'dan kelgan ma'lumotlarni auth context'ga saqlash
          console.log("Token:", data.token);
          const userForAuth = {
            id: data.user?.id || Date.now().toString(),
            firstName: data.user?.firstName || data.user?.name?.split(" ")[0] || "User",
            lastName: data.user?.lastName || data.user?.name?.split(" ")[1] || "",
            phoneNumber: fullPhone,
            role: data.user?.accountType === "BUSINESS" ? ("business" as const) : ("user" as const),
            isAuthenticated: true,
            token: data.token,
            address: data.user?.address || "",
            name: data.user?.name || "",
            accountType: data.user?.accountType,
          }

          login(userForAuth)
          setMessage("Kirish muvaffaqiyatli!")

          // Role'ga qarab yo'naltirish
          setTimeout(() => {
            if (data.user?.accountType === "BUSINESS") {
              router.push("/business/dashboard")
            } else {
              router.push("/dashboard")
            }
          }, 1000)
        } else {
          setMessage(`Xato: ${data.message || "Login yoki parol noto'g'ri"}`)
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
            <p className="text-gray-600">Hisobingizga kiring</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Kirish</CardTitle>
              <CardDescription>Telefon raqami va parolingizni kiriting</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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

                <div className="space-y-2">
                  <Label htmlFor="password">Parol</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Parolingiz"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                      Meni eslab qol
                    </label>
                  </div>
                  <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Parolni unutdingizmi?
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading || !phone || !password}>
                  {isLoading ? "Yuklanmoqda..." : "Kirish"}
                </Button>

                {message && (
                  <p
                    className={`text-center text-sm ${message.includes("muvaffaqiyatli") ? "text-green-600" : "text-red-600"}`}
                  >
                    {message}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Hisobingiz yo'qmi?{" "}
              <Link href="/auth/register" className="text-blue-600 hover:underline">
                Ro'yxatdan o'ting
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }