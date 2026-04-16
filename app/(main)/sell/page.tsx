"use client"

import { useState } from "react"
import { StepIndicator } from "@/components/shared/step-indicator"
import { SellStep1 } from "@/components/sell/sell-step-1"
import { SellStep2 } from "@/components/sell/sell-step-2"
import { SellStep3 } from "@/components/sell/sell-step-3"

const steps = [
  { step: 1, label: "Order Details" },
  { step: 2, label: "Send USDT" },
  { step: 3, label: "Done" },
]

export interface SellOrderData {
  usdtAmount: number
  paymentMethod: "ecocash" | "innbucks" | "onemoney" | "omari" | "card" | "other"
  mobileNumber: string
  orderId?: string
  depositAddress?: string
}

export default function SellPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [orderData, setOrderData] = useState<SellOrderData>({
    usdtAmount: 0,
    paymentMethod: "ecocash",
    mobileNumber: "",
  })

  const handleStep1Complete = (data: Partial<SellOrderData>) => {
    const orderId = `ZCX-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    const depositAddress = `T${Math.random().toString(36).substring(2, 35).toUpperCase()}`
    setOrderData((prev) => ({ ...prev, ...data, orderId, depositAddress }))
    setCurrentStep(2)
  }

  const handleStep2Complete = () => {
    setCurrentStep(3)
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F4FA]">
      <StepIndicator steps={steps} currentStep={currentStep} />

      <div className="mx-auto max-w-[1280px] px-4 lg:px-8 xl:px-16 py-8">
        {currentStep === 1 && (
          <SellStep1 orderData={orderData} onComplete={handleStep1Complete} />
        )}
        {currentStep === 2 && (
          <SellStep2
            orderData={orderData}
            onComplete={handleStep2Complete}
            onBack={handleBack}
          />
        )}
        {currentStep === 3 && <SellStep3 orderData={orderData} />}
      </div>
    </div>
  )
}
