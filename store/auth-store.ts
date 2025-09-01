import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  firstName: string
  lastName: string
  phone: string
  email?: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  verificationStep: "phone" | "code" | "completed"
  tempPhone: string
  register: (firstName: string, lastName: string, phone: string) => Promise<boolean>
  verifyCode: (code: string) => Promise<boolean>
  updateProfile: (updates: Partial<User>) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  setTempPhone: (phone: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      verificationStep: "phone",
      tempPhone: "",

      register: async (firstName: string, lastName: string, phone: string) => {
        set({ isLoading: true })

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Simple validation
        if (firstName && lastName && phone) {
          set({
            tempPhone: phone,
            verificationStep: "code",
            isLoading: false,
          })
          return true
        } else {
          set({ isLoading: false })
          return false
        }
      },

      verifyCode: async (code: string) => {
        set({ isLoading: true })

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Accept any 4-digit code for demo
        if (code.length === 4) {
          const { tempPhone } = get()
          const newUser: User = {
            id: Date.now().toString(),
            firstName: "User",
            lastName: "Name",
            phone: tempPhone,
          }

          set({
            user: newUser,
            isAuthenticated: true,
            verificationStep: "completed",
            isLoading: false,
            tempPhone: "",
          })
          return true
        } else {
          set({ isLoading: false })
          return false
        }
      },

      updateProfile: (updates: Partial<User>) => {
        const { user } = get()
        if (user) {
          set({
            user: { ...user, ...updates },
          })
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          verificationStep: "phone",
          tempPhone: "",
        })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      setTempPhone: (phone: string) => {
        set({ tempPhone: phone })
      },
    }),
    {
      name: "uzevently-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
