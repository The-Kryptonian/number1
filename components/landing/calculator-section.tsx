"use client"

import { useState } from "react"
import Link from "next/link"
import { DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const BUY_RATE = 1.07 // $1.07 to buy 1 USDT
const SELL_RATE = 0.93 // $0.93 to sell 1 USDT
const FEE_PERCENT = 7

export function CalculatorSection() {
  const [buyAmount, setBuyAmount] = useState<string>("100")
  const [sellAmount, setSellAmount] = useState<string>("100")

  // Buy calculations
  const buyAmountNum = Math.max(0, parseFloat(buyAmount) || 0)
  const usdtReceived = buyAmountNum > 0 ? buyAmountNum / BUY_RATE : 0
  const buyFee = buyAmountNum * (FEE_PERCENT / 100)

  // Sell calculations
  const sellAmountNum = Math.max(0, parseFloat(sellAmount) || 0)
  const usdReceived = sellAmountNum > 0 ? sellAmountNum * SELL_RATE : 0
  const sellFee = sellAmountNum * (FEE_PERCENT / 100)

  return (
    <section className="py-16 lg:py-24 bg-[#F0F4FA]">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-8 xl:px-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-xl lg:text-2xl font-semibold text-[#0D1F3C] mb-2">
            Calculate Your Order
          </h2>
          <div className="w-16 h-1 bg-[#F0A500] mx-auto rounded-full" />
        </div>

        {/* Calculator Card */}
        <Card className="max-w-[560px] mx-auto bg-white rounded-2xl shadow-md border-0">
          <CardContent className="p-6 lg:p-8">
            <Tabs defaultValue="buy" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#F0F4FA] p-1 rounded-lg">
                <TabsTrigger
                  value="buy"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#0D1F3C] data-[state=active]:shadow-sm font-semibold"
                >
                  Buy USDT
                </TabsTrigger>
                <TabsTrigger
                  value="sell"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#0D1F3C] data-[state=active]:shadow-sm font-semibold"
                >
                  Sell USDT
                </TabsTrigger>
              </TabsList>

              {/* Buy Tab */}
              <TabsContent value="buy" className="space-y-6">
                <div>
                  <label className="block text-xs font-medium text-[#4B5563] uppercase tracking-wide mb-2">
                    Amount in USD
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9CA3AF]" />
                    <Input
                      type="number"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(e.target.value)}
                      placeholder="100"
                      min={5}
                      max={200}
                      className="pl-10 h-12 text-lg border-[#D1D5DB] focus:border-[#F0A500] focus:ring-2 focus:ring-[#F0A500]/20"
                    />
                  </div>
                </div>

                {/* Results */}
                <div className="bg-[#F0F4FA] rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#4B5563]">You receive:</span>
                    <span className="text-xl font-bold text-[#F0A500]">
                      {usdtReceived.toFixed(2)} USDT
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">Service fee:</span>
                    <span className="text-sm text-[#6B7280]">
                      ${buyFee.toFixed(2)} ({FEE_PERCENT}%)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">Exchange rate:</span>
                    <span className="text-sm text-[#6B7280]">1 USDT = ${BUY_RATE}</span>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full bg-[#F0A500] text-[#0D1F3C] font-bold hover:bg-[#D97706] h-12"
                >
                  <Link href="/buy">Buy Now</Link>
                </Button>
              </TabsContent>

              {/* Sell Tab */}
              <TabsContent value="sell" className="space-y-6">
                <div>
                  <label className="block text-xs font-medium text-[#4B5563] uppercase tracking-wide mb-2">
                    Amount in USDT
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#9CA3AF] bg-[#F0F4FA] px-2 py-1 rounded">
                      USDT
                    </span>
                    <Input
                      type="number"
                      value={sellAmount}
                      onChange={(e) => setSellAmount(e.target.value)}
                      placeholder="100"
                      min={5}
                      className="pr-20 h-12 text-lg border-[#D1D5DB] focus:border-[#F0A500] focus:ring-2 focus:ring-[#F0A500]/20"
                    />
                  </div>
                </div>

                {/* Results */}
                <div className="bg-[#F0F4FA] rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#4B5563]">You receive:</span>
                    <span className="text-xl font-bold text-[#F0A500]">
                      ${usdReceived.toFixed(2)} USD
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">Service fee:</span>
                    <span className="text-sm text-[#6B7280]">
                      {sellFee.toFixed(2)} USDT ({FEE_PERCENT}%)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">Exchange rate:</span>
                    <span className="text-sm text-[#6B7280]">1 USDT = ${SELL_RATE}</span>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full bg-[#1A3A6B] text-white font-semibold hover:bg-[#0D1F3C] h-12"
                >
                  <Link href="/sell">Sell Now</Link>
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
