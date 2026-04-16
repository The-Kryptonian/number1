"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, ArrowLeft, ArrowRight, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { OrderSummaryCard } from "@/components/shared/order-summary-card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getPaymentLabel } from "@/components/shared/payment-method-picker"
import type { BuyOrderData } from "@/app/(main)/buy/page"

const BUY_RATE = 1.07
const FEE_PERCENT = 7

interface BuyStep2Props {
  orderData: BuyOrderData
  onComplete: () => void
  onBack: () => void
}

export function BuyStep2({ orderData, onComplete, onBack }: BuyStep2Props) {
  const [timeLeft, setTimeLeft] = useState(15 * 60)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const [showBackDialog, setShowBackDialog] = useState(false)

  const usdtReceived = orderData.amount / BUY_RATE
  const fee = orderData.amount * (FEE_PERCENT / 100)

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsExpired(true)
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

  const handlePayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      onComplete()
    }, 2000)
  }

  // Expired state — show a clear message instead of a broken disabled form
  if (isExpired) {
    return (
      <div className="max-w-[480px] mx-auto text-center py-16">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4">
          <Clock className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-[#0D1F3C] mb-2">Order Expired</h1>
        <p className="text-[#4B5563] mb-8">
          Order #{orderData.orderId} has expired. No payment was taken. Please place a new order.
        </p>
        <Button
          onClick={onBack}
          className="w-full bg-[#F0A500] text-[#0D1F3C] font-bold hover:bg-[#D97706] h-12"
        >
          Start a New Order
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        {/* Payment Section */}
        <div>
          {/* Order Created Card */}
          <Card className="bg-[#F0F4FA] rounded-xl border border-[#E5E7EB] mb-4">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-2 w-2 rounded-full bg-green-500" />
                <div>
                  <p className="font-semibold text-[#0D1F3C]">Order #{orderData.orderId} created</p>
                  <p className="text-sm text-[#6B7280]">Awaiting payment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Instructions Card */}
          <Card className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
            <CardHeader className="pb-2">
              <h2 className="text-xl font-semibold text-[#0D1F3C]">Complete Your Payment</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-[#4B5563]">
                You are paying <span className="font-bold text-[#0D1F3C]">${orderData.amount.toFixed(2)}</span> via{" "}
                <span className="font-bold text-[#0D1F3C]">
                  {getPaymentLabel(orderData.paymentMethod)}
                </span>
              </p>

              {/* Paynow Badge */}
              <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                <Shield className="h-4 w-4" />
                <span>Secured by Paynow</span>
              </div>

              {/* Pay Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-[#F0A500] text-[#0D1F3C] font-bold hover:bg-[#D97706] h-14 text-base"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-[#0D1F3C]/30 border-t-[#0D1F3C] rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <>
                    Pay ${orderData.amount.toFixed(2)} via{" "}
                    {getPaymentLabel(orderData.paymentMethod)}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <p className="text-sm text-[#6B7280] text-center">
                You will be redirected to complete payment securely. Do not close this page.
              </p>
            </CardContent>
          </Card>

          {/* Timer Card */}
          <Card className={`mt-4 rounded-xl border ${timeLeft < 180 ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className={`h-5 w-5 ${timeLeft < 180 ? "text-red-600" : "text-amber-600"}`} />
                <div>
                  <p className={`font-semibold ${timeLeft < 180 ? "text-red-800" : "text-amber-800"}`}>
                    This order expires in {formatTime(timeLeft)}
                  </p>
                  <p className={`text-sm ${timeLeft < 180 ? "text-red-700" : "text-amber-700"}`}>
                    After expiry, your order will be cancelled automatically
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back Link */}
          <button
            onClick={() => setShowBackDialog(true)}
            className="mt-4 flex items-center gap-2 text-sm text-[#4B5563] hover:text-[#F0A500] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Change order details
          </button>
        </div>

        {/* Order Summary (locked) — desktop */}
        <div className="hidden lg:block">
          <OrderSummaryCard
            type="buy"
            amount={orderData.amount}
            usdtAmount={usdtReceived}
            fee={fee}
            rate={BUY_RATE}
            locked
          />
        </div>

        {/* Order Summary — mobile */}
        <div className="lg:hidden">
          <OrderSummaryCard
            type="buy"
            amount={orderData.amount}
            usdtAmount={usdtReceived}
            fee={fee}
            rate={BUY_RATE}
            locked
          />
        </div>
      </div>

      {/* Back confirmation dialog */}
      <AlertDialog open={showBackDialog} onOpenChange={setShowBackDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Cancel this order?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Going back will cancel order #{orderData.orderId}. No payment has been taken. You will need to start a new order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay on this page</AlertDialogCancel>
            <AlertDialogAction
              onClick={onBack}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, cancel order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
