"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, ArrowLeft, Clock, Copy, MessageCircle, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import type { SellOrderData } from "@/app/(main)/sell/page"

const SELL_RATE = 0.93
const FEE_PERCENT = 7

interface SellStep2Props {
  orderData: SellOrderData
  onComplete: () => void
  onBack: () => void
}

export function SellStep2({ orderData, onComplete, onBack }: SellStep2Props) {
  const [timeLeft, setTimeLeft] = useState(15 * 60)
  const [hasSent, setHasSent] = useState(false)

  const usdReceived = orderData.usdtAmount * SELL_RATE
  const fee = orderData.usdtAmount * (FEE_PERCENT / 100)

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied!")
  }

  const handleConfirmSent = () => {
    setHasSent(true)
    setTimeout(() => {
      onComplete()
    }, 1500)
  }

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8">
      {/* Main Content */}
      <div>
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-xl lg:text-2xl font-semibold text-[#0D1F3C]">
            Send Exactly {orderData.usdtAmount.toFixed(2)} USDT to This Address
          </h1>
        </div>

        {/* Network Warning */}
        <div className="flex gap-3 bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
          <AlertTriangle className="h-6 w-6 text-red-600 shrink-0" />
          <div>
            <p className="font-semibold text-red-800">TRC-20 NETWORK ONLY</p>
            <p className="text-sm text-red-700 mt-1">
              Sending on any other network (ERC-20, BEP-20, etc.) will result in permanent,
              unrecoverable loss of your funds. We cannot help recover funds sent on the wrong
              network.
            </p>
          </div>
        </div>

        {/* Deposit Address Card */}
        <Card className="bg-white rounded-2xl border-2 border-[#1A3A6B] shadow-sm mb-6">
          <CardHeader className="pb-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#4B5563]">
              Send to This Address
            </span>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Address Display */}
            <div className="bg-[#F0F4FA] rounded-lg p-4">
              <p className="font-mono text-sm break-all text-[#0D1F3C]">
                {orderData.depositAddress}
              </p>
            </div>

            {/* Copy Button */}
            <Button
              onClick={() => copyToClipboard(orderData.depositAddress || "")}
              className="w-full bg-[#F0A500] text-[#0D1F3C] font-bold hover:bg-[#D97706] h-12"
            >
              <Copy className="mr-2 h-5 w-5" />
              Copy Address
            </Button>

            {/* QR Code Placeholder */}
            <div className="flex flex-col items-center py-4">
              <div className="w-40 h-40 lg:w-48 lg:h-48 bg-[#F0F4FA] border-2 border-dashed border-[#D1D5DB] rounded-xl flex items-center justify-center">
                <QrCode className="h-12 w-12 text-[#9CA3AF]" />
              </div>
              <span className="text-xs text-[#6B7280] mt-2">Scan with your wallet app</span>
            </div>

            {/* Amount Reminder */}
            <div className="bg-[#FFF8E7] border border-[#F0A500]/30 rounded-lg p-4 text-center">
              <p className="text-sm text-[#92400E]">Send exactly:</p>
              <p className="text-2xl font-bold text-[#F0A500]">{orderData.usdtAmount.toFixed(2)} USDT</p>
              <p className="text-xs text-[#92400E] mt-1">Do not send more or less</p>
            </div>
          </CardContent>
        </Card>

        {/* Timer */}
        <div
          className={`flex items-center gap-3 ${
            timeLeft < 180 ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"
          } border rounded-xl p-4 mb-6`}
        >
          <Clock className={`h-5 w-5 ${timeLeft < 180 ? "text-red-600" : "text-amber-600"}`} />
          <div>
            <p className={`font-semibold ${timeLeft < 180 ? "text-red-800" : "text-amber-800"}`}>
              Address expires in: {formatTime(timeLeft)}
            </p>
            <p className={`text-sm ${timeLeft < 180 ? "text-red-700" : "text-amber-700"}`}>
              A new address will be issued if expired
            </p>
          </div>
        </div>

        {/* Confirm Sent Button */}
        <Button
          onClick={handleConfirmSent}
          disabled={hasSent}
          variant="outline"
          className="w-full border-2 border-[#1A3A6B] text-[#1A3A6B] hover:bg-[#F0F4FA] h-14 text-base font-semibold"
        >
          {hasSent ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-[#1A3A6B]/30 border-t-[#1A3A6B] rounded-full animate-spin" />
              Confirming...
            </span>
          ) : (
            "I Have Sent the USDT"
          )}
        </Button>
        <p className="text-center text-xs text-[#6B7280] mt-2">
          Click only after you have sent the USDT from your wallet
        </p>

        {/* Back Link */}
        <button
          onClick={onBack}
          className="mt-6 flex items-center gap-2 text-sm text-[#4B5563] hover:text-[#F0A500] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Change order details
        </button>
      </div>

      {/* Order Summary (Static) */}
      <div className="hidden lg:block">
        <Card className="bg-white rounded-2xl border border-[#E5E7EB] sticky top-24">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-[#0D1F3C]">Order Summary</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#4B5563]">Order ID:</span>
                <span className="text-sm font-semibold text-[#0D1F3C]">{orderData.orderId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#4B5563]">You are selling:</span>
                <span className="text-sm font-semibold text-[#0D1F3C]">
                  {orderData.usdtAmount.toFixed(2)} USDT
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#4B5563]">You receive:</span>
                <span className="text-sm font-bold text-[#F0A500]">${usdReceived.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#4B5563]">Payment to:</span>
                <span className="text-sm font-medium text-[#0D1F3C]">
                  {orderData.paymentMethod === "ecocash" ? "EcoCash" : "InnBucks"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#4B5563]">Mobile number:</span>
                <span className="text-sm font-medium text-[#0D1F3C]">{orderData.mobileNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#4B5563]">Status:</span>
                <Badge className="bg-amber-100 text-amber-700 border border-amber-200">
                  Awaiting USDT
                </Badge>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E7EB]">
              <p className="text-sm text-[#6B7280] mb-2">Having trouble? Contact us on WhatsApp</p>
              <Button
                asChild
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50"
              >
                <a href="https://wa.me/263771234567" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp Support
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
