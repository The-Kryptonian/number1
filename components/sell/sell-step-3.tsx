"use client"

import Link from "next/link"
import { ArrowRight, Check, Clock, Copy, Info, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { getPaymentLabel } from "@/components/shared/payment-method-picker"
import type { SellOrderData } from "@/app/(main)/sell/page"

const SELL_RATE = 0.93

interface SellStep3Props {
  orderData: SellOrderData
}

export function SellStep3({ orderData }: SellStep3Props) {
  const usdReceived = orderData.usdtAmount * SELL_RATE
  const now = new Date()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied!")
  }

  return (
    <div className="max-w-[560px] mx-auto">
      {/* Processing Header */}
      <div className="text-center mb-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#1A3A6B] mb-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-25" />
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-[#1A3A6B] mb-2">Watching for Your Transfer...</h1>
        <p className="text-[#4B5563]">
          We are monitoring the Tron blockchain for your USDT. This usually takes 1-3 minutes.
        </p>
      </div>

      {/* Progress Card */}
      <Card className="bg-white rounded-2xl shadow-md border-0 mb-6">
        <CardContent className="p-6">
          {/* Status Timeline */}
          <div className="space-y-4 mb-6">
            {/* Step 1 */}
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#0D1F3C]">Order created</span>
                  <span className="text-xs text-[#9CA3AF]">
                    {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#0D1F3C]">Deposit address issued</span>
                  <span className="text-xs text-[#9CA3AF]">
                    {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3 - Current: monitoring for USDT */}
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F0A500] shrink-0">
                <Loader2 className="h-3 w-3 text-white animate-spin" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-[#F0A500]">Waiting for USDT...</span>
                <p className="text-xs text-[#6B7280] mt-0.5">Monitoring the Tron blockchain</p>
              </div>
            </div>

            {/* Step 4 - Pending */}
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E5E7EB] shrink-0">
                <Clock className="h-3 w-3 text-[#9CA3AF]" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-[#9CA3AF]">Processing payout</span>
              </div>
            </div>

            {/* Step 5 - Pending */}
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E5E7EB] shrink-0">
                <Clock className="h-3 w-3 text-[#9CA3AF]" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-[#9CA3AF]">Payment sent</span>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-3 pt-4 border-t border-[#E5E7EB]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#4B5563]">Order ID:</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#0D1F3C]">{orderData.orderId}</span>
                <button
                  onClick={() => copyToClipboard(orderData.orderId || "")}
                  className="text-[#6B7280] hover:text-[#F0A500]"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#4B5563]">USDT received:</span>
              <span className="text-sm font-medium text-[#0D1F3C]">
                {orderData.usdtAmount.toFixed(2)} USDT
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#4B5563]">Payout amount:</span>
              <span className="text-sm font-bold text-[#F0A500]">${usdReceived.toFixed(2)} USD</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#4B5563]">Payout method:</span>
              <span className="text-sm font-medium text-[#0D1F3C]">
                {getPaymentLabel(orderData.paymentMethod)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#4B5563]">Payout number:</span>
              <span className="text-sm font-medium text-[#0D1F3C]">{orderData.mobileNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#4B5563]">Powered by:</span>
              <Badge variant="secondary" className="bg-[#F0F4FA] text-[#4B5563]">
                NOWPayments
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Box */}
      <div className="bg-blue-50 rounded-lg p-4 flex gap-3 mb-6">
        <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          Your mobile money will be sent within 1 hour of confirmation. You will receive an SMS from{" "}
          {getPaymentLabel(orderData.paymentMethod)} when it arrives.
        </p>
      </div>

      {/* Action Button */}
      <Button
        asChild
        className="w-full bg-[#F0A500] text-[#0D1F3C] font-bold hover:bg-[#D97706] h-12"
      >
        <Link href={`/orders/${orderData.orderId}`}>
          Track This Order
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
