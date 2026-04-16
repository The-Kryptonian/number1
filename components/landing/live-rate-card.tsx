"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function LiveRateCard() {
  return (
    <Card className="bg-white rounded-2xl shadow-xl border-0">
      <CardHeader className="pb-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-[#F0A500]">
          Current Exchange Rate
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Rate Display */}
        <div>
          <p className="text-3xl lg:text-4xl font-bold text-[#0D1F3C]">
            1 USDT = $1.07 USD
          </p>
          <p className="text-sm text-[#6B7280] mt-1">
            Includes 7% service fee
          </p>
        </div>

        <Separator />

        {/* Buy/Sell Rates */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#4B5563]">Buy rate:</span>
            <span className="text-sm font-semibold text-[#0D1F3C]">$1.07 per USDT</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#4B5563]">Sell rate:</span>
            <span className="text-sm font-semibold text-[#0D1F3C]">$0.93 per USDT</span>
          </div>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              Live
            </span>
          </div>
          <span className="text-xs text-[#9CA3AF]">Last updated: just now</span>
        </div>

        {/* CTA Button */}
        <Button
          asChild
          className="w-full bg-[#F0A500] text-[#0D1F3C] font-bold hover:bg-[#D97706] h-12"
        >
          <Link href="/buy">
            Start Trading
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
