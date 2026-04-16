"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, ArrowDownCircle, ArrowUpCircle, Clock, UserCircle } from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/buy", label: "Buy", icon: ArrowDownCircle },
  { href: "/sell", label: "Sell", icon: ArrowUpCircle },
  { href: "/history", label: "History", icon: Clock },
  { href: "/settings", label: "Account", icon: UserCircle },
]

export function MobileNav() {
  const pathname = usePathname()
  
  // Don't show mobile nav on admin pages
  if (pathname.startsWith("/admin")) return null

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E5E7EB] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 px-3 py-2 relative",
                isActive ? "text-[#F0A500]" : "text-[#9CA3AF]"
              )}
            >
              {isActive && (
                <span className="absolute -top-0.5 w-1 h-1 rounded-full bg-[#F0A500]" />
              )}
              <Icon className={cn("h-6 w-6", isActive && "stroke-[2.5]")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
