import type React from "react"
import AdminSidebar from "@/components/admin/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 flex">
        <AdminSidebar />
        <main className="flex-1 ml-0 lg:ml-64 p-6 lg:p-8 pt-16 lg:pt-6">
          {children}
        </main>
      </div>
  )
}