"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Bell,
  ClipboardList,
  DollarSign,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/pending", label: "Pending Orders", icon: Bell, badge: 3 },
  { href: "/admin/orders", label: "All Orders", icon: ClipboardList },
  { href: "/admin/float", label: "Float Monitor", icon: DollarSign },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-[#1A3A6B]">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0A500]">
            <span className="text-sm font-bold text-[#0D1F3C]">Z</span>
          </div>
          <div>
            <span className="text-white font-bold">ZimCryptoX</span>
            <Badge className="ml-2 bg-[#F0A500] text-[#0D1F3C] text-[10px]">Admin</Badge>
          </div>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#1A3A6B] text-[#F0A500] border-l-2 border-[#F0A500]"
                  : "text-[#9CA3AF] hover:text-white hover:bg-[#1A3A6B]/50"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
              {item.badge && item.badge > 0 && (
                <Badge className="ml-auto bg-[#F0A500] text-[#0D1F3C] text-xs">
                  {item.badge}
                </Badge>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-[#1A3A6B]">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A3A6B] text-white font-semibold">
            OP
          </div>
          <div>
            <p className="text-sm font-medium text-white">Operator</p>
            <p className="text-xs text-[#9CA3AF]">Admin</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-[#9CA3AF] hover:text-white hover:bg-[#1A3A6B]/50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-[#F0F4FA]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[240px] flex-col bg-[#0D1F3C]">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-[#0D1F3C] text-white">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0A500]">
              <span className="text-sm font-bold text-[#0D1F3C]">Z</span>
            </div>
            <span className="font-bold">Admin</span>
          </Link>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 bg-[#0D1F3C] border-0">
              <NavContent />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-[240px]">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
