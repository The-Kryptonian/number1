"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/buy", label: "Buy USDT" },
  { href: "/sell", label: "Sell USDT" },
  { href: "/history", label: "History" },
]

export function Header() {
  const pathname = usePathname()
  
  // Don't show header on admin pages
  if (pathname.startsWith("/admin")) return null

  return (
    <header className="hidden md:block sticky top-0 z-50 w-full bg-gradient-to-r from-[#1A3A6B] to-[#0D1F3C]">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-8 xl:px-16">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0A500]">
              <span className="text-lg font-bold text-[#0D1F3C]">Z</span>
            </div>
            <span className="text-lg font-bold text-white">
              Zim<span className="text-[#F0A500]">CryptoX</span>
            </span>
          </Link>

          {/* Nav Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative py-1",
                  pathname === link.href
                    ? "text-[#F0A500]"
                    : "text-white/90 hover:text-[#F0A500]"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#F0A500] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Nav Links - Tablet */}
          <nav className="flex lg:hidden items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-medium transition-colors",
                  pathname === link.href
                    ? "text-[#F0A500]"
                    : "text-white/90 hover:text-[#F0A500]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Button 
              asChild
              className="hidden lg:inline-flex bg-[#F0A500] text-[#0D1F3C] font-bold hover:bg-[#D97706]"
            >
              <Link href="/buy">Get Started</Link>
            </Button>
            <Link 
              href="/settings"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
