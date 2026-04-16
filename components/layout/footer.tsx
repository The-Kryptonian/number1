"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Clock, MessageCircle } from "lucide-react"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/buy", label: "Buy USDT" },
  { href: "/sell", label: "Sell USDT" },
  { href: "/history", label: "History" },
  { href: "/settings", label: "Account" },
]

export function Footer() {
  const pathname = usePathname()
  
  // Don't show footer on admin pages
  if (pathname.startsWith("/admin")) return null

  return (
    <footer className="bg-[#0D1F3C] text-white pb-20 md:pb-0">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-8 xl:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0A500]">
                <span className="text-lg font-bold text-[#0D1F3C]">Z</span>
              </div>
              <span className="text-lg font-bold text-white">
                Zim<span className="text-[#F0A500]">CryptoX</span>
              </span>
            </Link>
            <p className="text-sm text-[#9CA3AF] mb-4">
              Fast, secure USDT exchange using EcoCash or InnBucks. No bank account needed.
            </p>
            <p className="text-xs text-[#6B7280]">
              &copy; 2026 ZimCryptoX. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#9CA3AF] hover:text-[#F0A500] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Operating Hours</h3>
            <div className="flex items-start gap-2 text-sm text-[#9CA3AF] mb-4">
              <Clock className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <p>Monday - Saturday</p>
                <p>8:00 AM - 9:00 PM CAT</p>
              </div>
            </div>
            <h3 className="text-sm font-semibold mb-2">Contact Us</h3>
            <a
              href="https://wa.me/263771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#F0A500] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-[#1A3A6B]">
        <div className="mx-auto max-w-[1280px] px-4 lg:px-8 xl:px-16 py-4">
          <p className="text-xs text-[#6B7280] text-center">
            This platform is an independent service. We are not affiliated with EcoCash, InnBucks, or any cryptocurrency exchange.
          </p>
        </div>
      </div>
    </footer>
  )
}
