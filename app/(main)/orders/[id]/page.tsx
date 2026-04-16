"use client"

import { use } from "react"
import { Check, Clock, Copy, Loader2, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { getPaymentLabel } from "@/components/shared/payment-method-picker"

// Mock order data - in real app would fetch from API
const getMockOrder = (id: string) => {
  const isBuy = Math.random() > 0.5
  return {
    id,
    type: isBuy ? ("buy" as const) : ("sell" as const),
    status: "processing" as const,
    usdAmount: 100,
    usdtAmount: isBuy ? 93.46 : 100,
    paymentMethod: "ecocash" as const,
    mobileNumber: "0771234567",
    walletAddress: "TN3W4H6Rk2s9KLrD5Q6B9vYX8nMpJkLmRf",
    rate: isBuy ? 1.07 : 0.93,
    fee: isBuy ? 7 : 7,
    paynowRef: "PNW-12345678",
    nowpaymentsRef: "NP-87654321",
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    completedAt: null,
    steps: isBuy
      ? [
          { name: "Order placed", completed: true, time: new Date(Date.now() - 30 * 60 * 1000) },
          { name: "Payment initiated", completed: true, time: new Date(Date.now() - 28 * 60 * 1000) },
          { name: "Payment confirmed", completed: true, time: new Date(Date.now() - 25 * 60 * 1000) },
          { name: "Sending USDT", completed: false, current: true, time: null },
          { name: "Completed", completed: false, time: null },
        ]
      : [
          { name: "Order placed", completed: true, time: new Date(Date.now() - 30 * 60 * 1000) },
          { name: "Deposit address issued", completed: true, time: new Date(Date.now() - 28 * 60 * 1000) },
          { name: "USDT received", completed: true, time: new Date(Date.now() - 15 * 60 * 1000) },
          { name: "Processing payout", completed: false, current: true, time: null },
          { name: "Payment sent", completed: false, time: null },
        ],
  }
}

export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const order = getMockOrder(resolvedParams.id)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied!")
  }

  const getStatusBadge = () => {
    switch (order.status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>
      case "processing":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Processing</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Failed</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Pending</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F4FA] py-8">
      <div className="mx-auto max-w-[680px] px-4">
        {/* Header Card */}
        <Card className="bg-gradient-to-r from-[#1A3A6B] to-[#0D1F3C] text-white rounded-2xl border-0 mb-6">
          <CardContent className="p-6">
            <h1 className="text-lg font-medium mb-2">Order Tracking</h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold">{order.id}</span>
              <button
                onClick={() => copyToClipboard(order.id)}
                className="text-white/70 hover:text-white"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={order.type === "buy" ? "bg-[#1A3A6B] text-white" : "bg-teal-600 text-white"}>
                {order.type === "buy" ? "BUY" : "SELL"}
              </Badge>
              {getStatusBadge()}
            </div>
          </CardContent>
        </Card>

        {/* Status Timeline Card */}
        <Card className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm mb-4">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-[#0D1F3C] mb-6">Order Status</h2>
            <div className="space-y-4">
              {order.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full shrink-0 ${
                      step.completed
                        ? "bg-green-500"
                        : step.current
                        ? "bg-[#F0A500]"
                        : "bg-[#E5E7EB]"
                    }`}
                  >
                    {step.completed ? (
                      <Check className="h-3 w-3 text-white" />
                    ) : step.current ? (
                      <Loader2 className="h-3 w-3 text-white animate-spin" />
                    ) : (
                      <Clock className="h-3 w-3 text-[#9CA3AF]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-medium ${
                          step.completed
                            ? "text-[#0D1F3C]"
                            : step.current
                            ? "text-[#F0A500]"
                            : "text-[#9CA3AF]"
                        }`}
                      >
                        {step.name}
                      </span>
                      {step.time && (
                        <span className="text-xs text-[#9CA3AF]">
                          {step.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Details Card */}
        <Card className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm mb-4">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-[#0D1F3C] mb-4">Order Details</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-[#F0F4FA]">
                <span className="text-sm text-[#4B5563]">Order ID</span>
                <span className="text-sm font-medium text-[#0D1F3C]">{order.id}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#F0F4FA]">
                <span className="text-sm text-[#4B5563]">Order type</span>
                <span className="text-sm font-medium text-[#0D1F3C]">
                  {order.type === "buy" ? "Buy USDT" : "Sell USDT"}
                </span>
              </div>
              {order.type === "buy" ? (
                <>
                  <div className="flex items-center justify-between py-2 border-b border-[#F0F4FA]">
                    <span className="text-sm text-[#4B5563]">USD amount paid</span>
                    <span className="text-sm font-medium text-[#0D1F3C]">
                      ${order.usdAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#F0F4FA]">
                    <span className="text-sm text-[#4B5563]">Payment method</span>
                    <span className="text-sm font-medium text-[#0D1F3C]">
                      {getPaymentLabel(order.paymentMethod)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#F0F4FA]">
                    <span className="text-sm text-[#4B5563]">
                      {getPaymentLabel(order.paymentMethod)} number
                    </span>
                    <span className="text-sm font-medium text-[#0D1F3C]">{order.mobileNumber}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#F0F4FA]">
                    <span className="text-sm text-[#4B5563]">Paynow reference</span>
                    <span className="text-sm font-medium text-[#0D1F3C]">{order.paynowRef}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#F0F4FA]">
                    <span className="text-sm text-[#4B5563]">USDT amount sent</span>
                    <span className="text-sm font-medium text-[#0D1F3C]">
                      {order.usdtAmount.toFixed(2)} USDT
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#F0F4FA]">
                    <span className="text-sm text-[#4B5563]">Network</span>
                    <Badge variant="secondary" className="bg-[#1A3A6B] text-white">
                      TRC-20
                    </Badge>
                  </div>
                  <div className="flex items-start justify-between py-2 border-b border-[#F0F4FA]">
                    <span className="text-sm text-[#4B5563]">Destination wallet</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-[#0D1F3C] break-all text-right max-w-[200px]">
                        {order.walletAddress}
                      </span>
                      <button
                        onClick={() => copyToClipboard(order.walletAddress)}
                        className="text-[#6B7280] hover:text-[#F0A500] shrink-0"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between py-2 border-b border-[#F0F4FA]">
                    <span className="text-sm text-[#4B5563]">USDT amount sent</span>
                    <span className="text-sm font-medium text-[#0D1F3C]">
                      {order.usdtAmount.toFixed(2)} USDT
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#F0F4FA]">
                    <span className="text-sm text-[#4B5563]">Network</span>
                    <Badge variant="secondary" className="bg-[#1A3A6B] text-white">
                      TRC-20
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#F0F4FA]">
                    <span className="text-sm text-[#4B5563]">NOWPayments ref</span>
                    <span className="text-sm font-medium text-[#0D1F3C]">{order.nowpaymentsRef}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#F0F4FA]">
                    <span className="text-sm text-[#4B5563]">USD payout amount</span>
                    <span className="text-sm font-medium text-[#F0A500]">
                      ${order.usdAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#F0F4FA]">
                    <span className="text-sm text-[#4B5563]">Payout method</span>
                    <span className="text-sm font-medium text-[#0D1F3C]">
                      {getPaymentLabel(order.paymentMethod)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#F0F4FA]">
                    <span className="text-sm text-[#4B5563]">
                      {getPaymentLabel(order.paymentMethod)} number
                    </span>
                    <span className="text-sm font-medium text-[#0D1F3C]">{order.mobileNumber}</span>
                  </div>
                </>
              )}
              <div className="flex items-center justify-between py-2 border-b border-[#F0F4FA]">
                <span className="text-sm text-[#4B5563]">Exchange rate</span>
                <span className="text-sm font-medium text-[#0D1F3C]">1 USDT = ${order.rate}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#F0F4FA]">
                <span className="text-sm text-[#4B5563]">Service fee</span>
                <span className="text-sm font-medium text-[#0D1F3C]">
                  {order.type === "buy"
                    ? `$${((order.usdAmount * order.fee) / 100).toFixed(2)} (${order.fee}%)`
                    : `${((order.usdtAmount * order.fee) / 100).toFixed(2)} USDT (${order.fee}%)`}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#F0F4FA]">
                <span className="text-sm text-[#4B5563]">Order created</span>
                <span className="text-sm font-medium text-[#0D1F3C]">
                  {order.createdAt.toLocaleDateString()} {order.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-[#4B5563]">Completed</span>
                <span className="text-sm font-medium text-[#9CA3AF]">
                  {order.completedAt ? order.completedAt.toLocaleDateString() : "Pending"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
          <CardContent className="p-6 text-center">
            <h3 className="font-medium text-[#0D1F3C] mb-2">Need help with this order?</h3>
            <p className="text-sm text-[#6B7280] mb-4">WhatsApp us with your Order ID</p>
            <Button
              asChild
              className="bg-green-500 text-white hover:bg-green-600"
            >
              <a href="https://wa.me/263771234567" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Support
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
