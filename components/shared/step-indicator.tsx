"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  label: string
  step: number
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full bg-white border-b border-[#E5E7EB]">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-8 xl:px-16 py-4">
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          {steps.map((step, index) => {
            const isCompleted = step.step < currentStep
            const isCurrent = step.step === currentStep
            const isUpcoming = step.step > currentStep

            return (
              <div key={step.step} className="flex items-center">
                {/* Step Circle & Label */}
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                      isCompleted && "bg-green-500 text-white",
                      isCurrent && "bg-[#F0A500] text-white",
                      isUpcoming && "bg-[#E5E7EB] text-[#9CA3AF]"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      step.step
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium hidden sm:inline",
                      isCurrent && "text-[#F0A500]",
                      isCompleted && "text-green-600",
                      isUpcoming && "text-[#9CA3AF]"
                    )}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-8 sm:w-16 h-0.5 mx-2 sm:mx-4",
                      step.step < currentStep ? "bg-green-500" : "bg-[#E5E7EB]"
                    )}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
