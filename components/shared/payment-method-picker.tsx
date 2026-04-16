"use client"

import { Check, CreditCard, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

export type PaymentMethod =
  | "ecocash"
  | "innbucks"
  | "onemoney"
  | "omari"
  | "card"
  | "other"

interface PaymentOption {
  id: PaymentMethod
  label: string
  /** Path to a logo PNG, or null to fall back to an icon */
  logo: string | null
  /** Tailwind bg class used as a subtle tint behind the logo */
  bg: string
  /** Fallback icon node rendered when logo is null */
  icon?: React.ReactNode
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "ecocash",
    label: "EcoCash",
    logo: "/number1/logos/ecocash.png",
    bg: "bg-slate-50",
  },
  {
    id: "innbucks",
    label: "InnBucks",
    logo: "/number1/logos/innbucks.png",
    bg: "bg-slate-50",
  },
  {
    id: "onemoney",
    label: "OneMoney",
    logo: "/number1/logos/onemoney.png",
    bg: "bg-slate-50",
  },
  {
    id: "omari",
    label: "Omari",
    logo: "/number1/logos/omari.png",
    bg: "bg-slate-50",
  },
  {
    id: "card",
    label: "Card",
    logo: null,
    bg: "bg-gray-50",
    icon: <CreditCard className="h-7 w-7 text-slate-500" />,
  },
  {
    id: "other",
    label: "Other",
    logo: null,
    bg: "bg-gray-50",
    icon: <MoreHorizontal className="h-7 w-7 text-gray-400" />,
  },
]

/** Returns the display label for any payment method value */
export function getPaymentLabel(method: PaymentMethod | string): string {
  return PAYMENT_OPTIONS.find((o) => o.id === method)?.label ?? method
}

interface PaymentMethodPickerProps {
  value: PaymentMethod
  onChange: (method: PaymentMethod) => void
  /** Label shown above the grid */
  label: string
}

export function PaymentMethodPicker({ value, onChange, label }: PaymentMethodPickerProps) {
  return (
    <div>
      <span className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
        {label} <span className="text-red-500">*</span>
      </span>

      <div className="grid grid-cols-3 gap-3 mt-2">
        {PAYMENT_OPTIONS.map((option) => {
          const isSelected = value === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={cn(
                "relative flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all min-h-[88px]",
                isSelected
                  ? "border-[#1A3A6B] bg-[#F0F4FA]"
                  : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB]"
              )}
            >
              {/* Selected checkmark */}
              {isSelected && (
                <div className="absolute top-1.5 right-1.5">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F0A500]">
                    <Check className="h-2.5 w-2.5 text-white" />
                  </div>
                </div>
              )}

              {/* Logo or icon */}
              <div
                className={cn(
                  "flex h-10 w-full max-w-[72px] items-center justify-center rounded-lg overflow-hidden",
                  option.bg
                )}
              >
                {option.logo ? (
                  <img
                    src={option.logo}
                    alt={option.label}
                    className="h-8 w-full object-contain px-1"
                    onError={(e) => {
                      // If logo fails to load, hide it so the bg tint shows cleanly
                      ;(e.currentTarget as HTMLImageElement).style.display = "none"
                    }}
                  />
                ) : (
                  option.icon
                )}
              </div>

              <span className="text-xs font-medium text-[#0D1F3C] leading-tight text-center">
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
