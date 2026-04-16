"use client"

import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LiveRateCard } from "./live-rate-card"

const trustItems = [
  "Registered Business",
  "Instant Confirmation",
  "Secure Payments",
]

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#1A3A6B] to-[#0D1F3C] min-h-[520px] lg:min-h-[600px] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzMiAyIDIgNC0yIDQtMiA0LTItMi0yLTR6bTAgMGMwLTItMi00LTItNHMtMiAyLTIgNCAyIDQgMiA0IDItMiAyLTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat" />
      </div>
      
      <div className="relative mx-auto max-w-[1280px] px-4 lg:px-8 xl:px-16 py-12 lg:py-20">
        <div className="grid lg:grid-cols-[55%_45%] gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#F0A500]/20 border border-[#F0A500]/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-sm">🇿🇼</span>
              <span className="text-sm font-medium text-[#F0A500]">
                Trusted USDT Exchange for Zimbabwe
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance leading-tight">
              Buy & Sell USDT Using EcoCash, InnBucks, OneMoney & More
            </h1>

            {/* Subheading */}
            <p className="text-lg text-blue-200 mb-8 text-pretty">
              Fast, secure, and transparent. No bank account needed.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                asChild
                size="lg"
                className="bg-[#F0A500] text-[#0D1F3C] font-bold hover:bg-[#D97706] h-12 px-8 text-base"
              >
                <Link href="/buy">
                  Buy USDT
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-transparent hover:bg-white/10 h-12 px-8 text-base"
              >
                <Link href="/sell">Sell USDT</Link>
              </Button>
            </div>

            {/* Trust Items */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F0A500]/20">
                    <Check className="h-3 w-3 text-[#F0A500]" />
                  </div>
                  <span className="text-sm text-blue-100">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Live Rate Card */}
          <div className="order-1 lg:order-2">
            <LiveRateCard />
          </div>
        </div>
      </div>
    </section>
  )
}
