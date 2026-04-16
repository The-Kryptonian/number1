"use client"

import { Clock, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface OrderSummaryCardProps {
  type: "buy" | "sell"
  amount: number
  usdtAmount: number
  fee: number
  rate: number
  network?: string
  processingTime?: string
  locked?: boolean
}

export function OrderSummaryCard({
  type,
  amount,
  usdtAmount,
  fee,
  rate,
  network = "TRC-20",
  processingTime,
  locked = false,
}: OrderSummaryCardProps) {
  const hasAmount = type === "sell" ? usdtAmount > 0 : amount > 0

  return (
    <Card className="bg-white rounded-2xl border-2 border-[#F0A500]/30 sticky top-24">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-[#0D1F3C]">
          <FileText className="h-5 w-5 text-[#F0A500]" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {type === "buy" ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#4B5563]">You pay:</span>
              <span className="text-xl font-bold text-[#0D1F3C]">
                {hasAmount ? `$${amount.toFixed(2)} USD` : "— —"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Service fee:</span>
              <span className="text-sm text-[#6B7280]">
                {hasAmount ? `$${fee.toFixed(2)} (7%)` : "— —"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#4B5563]">You receive:</span>
              <span className="text-xl font-bold text-[#F0A500]">
                {hasAmount ? `${usdtAmount.toFixed(2)} USDT` : "— —"}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#4B5563]">You send:</span>
              <span className="text-xl font-bold text-[#0D1F3C]">
                {hasAmount ? `${usdtAmount.toFixed(2)} USDT` : "— —"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Service fee:</span>
              <span className="text-sm text-[#6B7280]">
                {hasAmount ? `${fee.toFixed(2)} USDT (7%)` : "— —"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#4B5563]">You receive:</span>
              <span className="text-xl font-bold text-[#F0A500]">
                {hasAmount ? `$${amount.toFixed(2)} USD` : "— —"}
              </span>
            </div>
          </>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6B7280]">Network:</span>
          <Badge variant="secondary" className="bg-[#1A3A6B] text-white">
            {network}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6B7280]">Rate:</span>
          <span className="text-sm text-[#6B7280]">
            1 USDT = ${rate.toFixed(2)}
          </span>
        </div>

        <Separator />

        <div className="flex items-center gap-2 text-sm text-[#6B7280]">
          <Clock className="h-4 w-4" />
          <span>
            Estimated processing: {processingTime || (type === "buy" ? "within 2 hours" : "within 1 hour")}
          </span>
        </div>

        {locked && (
          <div className="bg-[#F0F4FA] rounded-lg p-3 text-xs text-[#4B5563]">
            Order details locked during payment process
          </div>
        )}
      </CardContent>
    </Card>
  )
}
