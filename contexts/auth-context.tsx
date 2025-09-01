"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  firstName: string
  lastName: string
  phoneNumber: string
  role: "user" | "business"
  isAuthenticated: boolean
  token?: string
  address?: string
  name?: string
  accountType?: string
}

interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isLoading: boolean
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load user data from localStorage on app start
    const savedUser = localStorage.getItem("uzevently_user")
    const savedToken = localStorage.getItem("uzevently_token")

    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser)
        setUser({ ...userData, token: savedToken, isAuthenticated: true })
      } catch (error) {
        console.error("Error parsing saved user data:", error)
        localStorage.removeItem("uzevently_user")
        localStorage.removeItem("uzevently_token")
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    const userWithAuth = { ...userData, isAuthenticated: true }
    setUser(userWithAuth)
    localStorage.setItem("uzevently_user", JSON.stringify(userWithAuth))
    if (userData.token) {
      localStorage.setItem("uzevently_token", userData.token)
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("uzevently_user", JSON.stringify(updatedUser))
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("uzevently_user")
    localStorage.removeItem("uzevently_token")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading, updateUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
