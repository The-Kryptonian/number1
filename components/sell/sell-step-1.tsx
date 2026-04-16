"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OrderSummaryCard } from "@/components/shared/order-summary-card"
import { PaymentMethodPicker, getPaymentLabel, type PaymentMethod } from "@/components/shared/payment-method-picker"
import { cn } from "@/lib/utils"
import type { SellOrderData } from "@/app/(main)/sell/page"

const SELL_RATE = 0.93
const FEE_PERCENT = 7

interface SellStep1Props {
  orderData: SellOrderData
  onComplete: (data: Partial<SellOrderData>) => void
}

export function SellStep1({ orderData, onComplete }: SellStep1Props) {
  const [usdtAmount, setUsdtAmount] = useState(orderData.usdtAmount?.toString() || "")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    (orderData.paymentMethod as PaymentMethod) || "ecocash"
  )
  const [mobileNumber, setMobileNumber] = useState(orderData.mobileNumber || "")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const usdtAmountNum = parseFloat(usdtAmount) || 0
  const usdReceived = usdtAmountNum > 0 ? usdtAmountNum * SELL_RATE : 0
  const fee = usdtAmountNum * (FEE_PERCENT / 100)

  const isMobileMethod = ["ecocash", "innbucks", "onemoney", "omari"].includes(paymentMethod)

  useEffect(() => {
    const newErrors: Record<string, string> = {}

    if (touched.usdtAmount) {
      if (!usdtAmount || usdtAmountNum <= 0) {
        newErrors.usdtAmount = "Amount is required"
      } else if (usdtAmountNum < 5) {
        newErrors.usdtAmount = "Minimum amount is 5 USDT"
      }
    }

    if (isMobileMethod && touched.mobileNumber) {
      if (!mobileNumber) {
        newErrors.mobileNumber = "Mobile number is required"
      } else if (!/^0[7][0-9]{8}$/.test(mobileNumber.replace(/\s/g, ""))) {
        newErrors.mobileNumber = "Invalid mobile number format"
      }
    }

    setErrors(newErrors)
  }, [usdtAmount, mobileNumber, touched, usdtAmountNum, isMobileMethod])

  const mobileValid = !isMobileMethod || (!!mobileNumber && /^0[7][0-9]{8}$/.test(mobileNumber.replace(/\s/g, "")))
  const isFormValid = usdtAmountNum >= 5 && mobileValid

  const handleSubmit = () => {
    setTouched({ usdtAmount: true, mobileNumber: true })
    if (!isFormValid) return

    setIsSubmitting(true)
    setTimeout(() => {
      onComplete({
        usdtAmount: usdtAmountNum,
        paymentMethod,
        mobileNumber: mobileNumber.replace(/\s/g, ""),
      })
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8">
      <div>
        <div className="mb-6">
          <h1 className="text-xl lg:text-2xl font-semibold text-[#0D1F3C]">Sell USDT</h1>
          <p className="text-sm text-[#4B5563]">
            Tell us how much USDT you want to sell and where to send your money
          </p>
        </div>

        <Card className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
          <CardContent className="p-6 space-y-6">
            {/* USDT Amount */}
            <div>
              <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
                USDT Amount to Sell <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-2">
                <Input
                  type="number"
                  value={usdtAmount}
                  onChange={(e) => setUsdtAmount(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, usdtAmount: true }))}
                  placeholder="100"
                  min={5}
                  className={cn(
                    "pr-16 h-12 text-lg border-[#D1D5DB] focus:border-[#F0A500] focus:ring-2 focus:ring-[#F0A500]/20",
                    errors.usdtAmount && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  )}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#9CA3AF] bg-[#F0F4FA] px-2 py-1 rounded">
                  USDT
                </span>
              </div>
              {errors.usdtAmount && (
                <p className="mt-1 text-sm text-red-500">{errors.usdtAmount}</p>
              )}
              {usdtAmountNum > 0 && (
                <div className="mt-3 bg-[#F0F4FA] rounded-lg p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#4B5563]">You receive:</span>
                    <span className="text-lg font-bold text-[#F0A500]">${usdReceived.toFixed(2)} USD</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6B7280]">Service fee:</span>
                    <span className="text-xs text-[#6B7280]">{fee.toFixed(2)} USDT (7%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6B7280]">Rate:</span>
                    <span className="text-xs text-[#6B7280]">1 USDT = ${SELL_RATE}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <PaymentMethodPicker
              label="Receive Payment Via"
              value={paymentMethod}
              onChange={setPaymentMethod}
            />

            {/* Mobile Number — mobile money only */}
            {isMobileMethod && (
              <div>
                <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
                  Send Payment to This Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, mobileNumber: true }))}
                  placeholder="077 XXX XXXX"
                  className={cn(
                    "mt-2 h-12 border-[#D1D5DB] focus:border-[#F0A500] focus:ring-2 focus:ring-[#F0A500]/20",
                    errors.mobileNumber && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  )}
                />
                {errors.mobileNumber ? (
                  <p className="mt-1 text-sm text-red-500">{errors.mobileNumber}</p>
                ) : (
                  <p className="mt-1 text-xs text-[#6B7280]">
                    Enter the {getPaymentLabel(paymentMethod)} number where you want to receive your money.
                    This does not need to be the number you normally use.
                  </p>
                )}
                <p className="mt-2 text-xs text-amber-600">
                  Please double-check this number. We cannot redirect payments once sent.
                </p>
              </div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className="w-full bg-[#F0A500] text-[#0D1F3C] font-bold hover:bg-[#D97706] h-14 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-[#0D1F3C]/30 border-t-[#0D1F3C] rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <>
                  Get Deposit Address
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="hidden lg:block">
        <OrderSummaryCard type="sell" amount={usdReceived} usdtAmount={usdtAmountNum} fee={fee} rate={SELL_RATE} processingTime="within 1 hour" />
      </div>
      <div className="lg:hidden">
        <OrderSummaryCard type="sell" amount={usdReceived} usdtAmount={usdtAmountNum} fee={fee} rate={SELL_RATE} processingTime="within 1 hour" />
      </div>
    </div>
  )
}
