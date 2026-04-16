"use client"

import { useState } from "react"
import { StepIndicator } from "@/components/shared/step-indicator"
import { BuyStep1 } from "@/components/buy/buy-step-1"
import { BuyStep2 } from "@/components/buy/buy-step-2"
import { BuyStep3 } from "@/components/buy/buy-step-3"

const steps = [
  { step: 1, label: "Order Details" },
  { step: 2, label: "Payment" },
  { step: 3, label: "Done" },
]

export interface BuyOrderData {
  amount: number
  walletAddress: string
  paymentMethod: "ecocash" | "innbucks" | "onemoney" | "omari" | "card" | "other"
  mobileNumber: string
  orderId?: string
}

export default function BuyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [orderData, setOrderData] = useState<BuyOrderData>({
    amount: 0,
    walletAddress: "",
    paymentMethod: "ecocash",
    mobileNumber: "",
  })

  const handleStep1Complete = (data: Partial<BuyOrderData>) => {
    const orderId = `ZCX-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    setOrderData((prev) => ({ ...prev, ...data, orderId }))
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
          <BuyStep1 orderData={orderData} onComplete={handleStep1Complete} />
        )}
        {currentStep === 2 && (
          <BuyStep2
            orderData={orderData}
            onComplete={handleStep2Complete}
            onBack={handleBack}
          />
        )}
        {currentStep === 3 && <BuyStep3 orderData={orderData} />}
      </div>
    </div>
  )
}
