"use client"

import { useState, useEffect } from "react"
import { ArrowRight, AlertTriangle, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OrderSummaryCard } from "@/components/shared/order-summary-card"
import { PaymentMethodPicker, getPaymentLabel, type PaymentMethod } from "@/components/shared/payment-method-picker"
import { cn } from "@/lib/utils"
import type { BuyOrderData } from "@/app/(main)/buy/page"

const BUY_RATE = 1.07
const FEE_PERCENT = 7

interface BuyStep1Props {
  orderData: BuyOrderData
  onComplete: (data: Partial<BuyOrderData>) => void
}

export function BuyStep1({ orderData, onComplete }: BuyStep1Props) {
  const [amount, setAmount] = useState(orderData.amount?.toString() || "")
  const [walletAddress, setWalletAddress] = useState(orderData.walletAddress || "")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    (orderData.paymentMethod as PaymentMethod) || "ecocash"
  )
  const [mobileNumber, setMobileNumber] = useState(orderData.mobileNumber || "")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const amountNum = parseFloat(amount) || 0
  const usdtReceived = amountNum > 0 ? amountNum / BUY_RATE : 0
  const fee = amountNum * (FEE_PERCENT / 100)

  const isValidWallet = walletAddress.startsWith("T") && walletAddress.length === 34

  const isMobileMethod = ["ecocash", "innbucks", "onemoney", "omari"].includes(paymentMethod)

  useEffect(() => {
    const newErrors: Record<string, string> = {}

    if (touched.amount) {
      if (!amount || amountNum <= 0) {
        newErrors.amount = "Amount is required"
      } else if (amountNum < 5) {
        newErrors.amount = "Minimum amount is $5"
      } else if (amountNum > 200) {
        newErrors.amount = "Maximum amount is $200"
      }
    }

    if (touched.walletAddress) {
      if (!walletAddress) {
        newErrors.walletAddress = "Wallet address is required"
      } else if (!isValidWallet) {
        newErrors.walletAddress = "Invalid TRC-20 address (must start with T, 34 characters)"
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
  }, [amount, walletAddress, mobileNumber, touched, amountNum, isValidWallet, isMobileMethod])

  const mobileValid = !isMobileMethod || (!!mobileNumber && /^0[7][0-9]{8}$/.test(mobileNumber.replace(/\s/g, "")))

  const isFormValid =
    amountNum >= 5 &&
    amountNum <= 200 &&
    isValidWallet &&
    mobileValid

  const handleSubmit = () => {
    setTouched({ amount: true, walletAddress: true, mobileNumber: true })
    if (!isFormValid) return

    setIsSubmitting(true)
    setTimeout(() => {
      onComplete({
        amount: amountNum,
        walletAddress,
        paymentMethod,
        mobileNumber: mobileNumber.replace(/\s/g, ""),
      })
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8">
      {/* Form Section */}
      <div>
        <div className="mb-6">
          <h1 className="text-xl lg:text-2xl font-semibold text-[#0D1F3C]">Buy USDT</h1>
          <p className="text-sm text-[#4B5563]">Fill in your order details below</p>
        </div>

        <Card className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
          <CardContent className="p-6 space-y-6">
            {/* Amount Field */}
            <div>
              <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
                Amount (USD) <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] font-medium">$</span>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, amount: true }))}
                  placeholder="100"
                  min={5}
                  max={200}
                  className={cn(
                    "pl-8 h-12 text-lg border-[#D1D5DB] focus:border-[#F0A500] focus:ring-2 focus:ring-[#F0A500]/20",
                    errors.amount && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  )}
                />
              </div>
              {errors.amount ? (
                <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
              ) : (
                <p className="mt-1 text-xs text-[#6B7280]">Minimum $5 - Maximum $200 per order</p>
              )}
            </div>

            {/* Wallet Address Field */}
            <div>
              <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
                Your TRC-20 Wallet Address <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-2">
                <Input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, walletAddress: true }))}
                  placeholder="T... (34 characters, starts with T)"
                  className={cn(
                    "h-12 font-mono text-sm border-[#D1D5DB] focus:border-[#F0A500] focus:ring-2 focus:ring-[#F0A500]/20 pr-10",
                    errors.walletAddress && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  )}
                />
                {walletAddress && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isValidWallet ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {errors.walletAddress && (
                <p className="mt-1 text-sm text-red-500">{errors.walletAddress}</p>
              )}
              <div className="mt-3 flex gap-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  Double-check this address carefully. USDT sent to a wrong address cannot be recovered. We are not responsible for funds sent to incorrect addresses.
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <PaymentMethodPicker
              label="Pay With"
              value={paymentMethod}
              onChange={setPaymentMethod}
            />

            {/* Mobile Number — only for mobile money methods */}
            {isMobileMethod && (
              <div>
                <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
                  Your {getPaymentLabel(paymentMethod)} Number{" "}
                  <span className="text-red-500">*</span>
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
                    This is the number you will pay from. Must be registered with {getPaymentLabel(paymentMethod)}.
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
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
                  Continue to Payment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary — desktop */}
      <div className="hidden lg:block">
        <OrderSummaryCard type="buy" amount={amountNum} usdtAmount={usdtReceived} fee={fee} rate={BUY_RATE} />
      </div>

      {/* Order Summary — mobile */}
      <div className="lg:hidden">
        <OrderSummaryCard type="buy" amount={amountNum} usdtAmount={usdtReceived} fee={fee} rate={BUY_RATE} />
      </div>
    </div>
  )
}
