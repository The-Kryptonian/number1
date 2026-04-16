"use client"

import Link from "next/link"
import { ArrowRight, Check, Clock, Copy, Info, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { getPaymentLabel } from "@/components/shared/payment-method-picker"
import type { BuyOrderData } from "@/app/(main)/buy/page"

const BUY_RATE = 1.07

interface BuyStep3Props {
  orderData: BuyOrderData
}

export function BuyStep3({ orderData }: BuyStep3Props) {
  const usdtAmount = orderData.amount / BUY_RATE
  const now = new Date()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied!")
  }

  const truncateWallet = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="max-w-[560px] mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-green-600 mb-2">Payment Confirmed!</h1>
        <p className="text-[#4B5563]">
          We have received your payment and are processing your USDT transfer.
        </p>
      </div>

      {/* Status Card */}
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
                  <span className="text-sm font-medium text-[#0D1F3C]">Order placed</span>
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
                  <span className="text-sm font-medium text-[#0D1F3C]">Payment confirmed</span>
                  <span className="text-xs text-[#9CA3AF]">
                    {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3 - Current */}
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F0A500] shrink-0">
                <Loader2 className="h-3 w-3 text-white animate-spin" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-[#F0A500]">Sending USDT...</span>
              </div>
            </div>

            {/* Step 4 - Pending */}
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E5E7EB] shrink-0">
                <Clock className="h-3 w-3 text-[#9CA3AF]" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-[#9CA3AF]">Completed</span>
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
              <span className="text-sm text-[#4B5563]">Amount paid:</span>
              <span className="text-sm font-medium text-[#0D1F3C]">
                ${orderData.amount.toFixed(2)} via{" "}
                {getPaymentLabel(orderData.paymentMethod)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#4B5563]">Paid from:</span>
              <span className="text-sm font-medium text-[#0D1F3C]">{orderData.mobileNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#4B5563]">USDT amount:</span>
              <span className="text-sm font-medium text-[#0D1F3C]">{usdtAmount.toFixed(2)} USDT</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#4B5563]">Wallet:</span>
              <span className="text-sm font-mono text-[#0D1F3C]">
                {truncateWallet(orderData.walletAddress)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#4B5563]">Network:</span>
              <span className="text-sm font-medium text-[#1A3A6B]">TRC-20</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Box */}
      <div className="bg-blue-50 rounded-lg p-4 flex gap-3 mb-6">
        <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          Your USDT will arrive within 2 hours. You will see it in your wallet once the transaction
          is confirmed on the Tron network.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          asChild
          className="w-full bg-[#F0A500] text-[#0D1F3C] font-bold hover:bg-[#D97706] h-12"
        >
          <Link href={`/orders/${orderData.orderId}`}>
            Track This Order
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="w-full border-[#F0A500] text-[#F0A500] hover:bg-[#FFF8E7] h-12"
        >
          <Link href="/buy">Place Another Order</Link>
        </Button>
      </div>
    </div>
  )
}
