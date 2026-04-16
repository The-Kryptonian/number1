import { ArrowDownCircle, ArrowUpCircle, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    number: "01",
    icon: ArrowDownCircle,
    iconBgColor: "bg-[#FFF8E7]",
    iconColor: "text-[#F0A500]",
    title: "Pay with Mobile Money",
    description:
      "Enter the amount you want, provide your TRC-20 wallet address, and pay using EcoCash, InnBucks, OneMoney, Omari, or card. We send USDT directly to your wallet.",
    type: "Buy USDT",
  },
  {
    number: "02",
    icon: ArrowUpCircle,
    iconBgColor: "bg-blue-50",
    iconColor: "text-[#1A3A6B]",
    title: "Send USDT, Get Cash",
    description:
      "Tell us how much USDT you want to sell and your mobile number. We give you a wallet address to send to and pay you via EcoCash, InnBucks, OneMoney, Omari, or card.",
    type: "Sell USDT",
  },
  {
    number: "03",
    icon: ShieldCheck,
    iconBgColor: "bg-green-50",
    iconColor: "text-green-600",
    title: "Full Order Transparency",
    description:
      "Every order gets a unique ID. Track your status in real time from payment confirmation to delivery.",
    type: "Track Everything",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-8 xl:px-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-xl lg:text-2xl font-semibold text-[#0D1F3C] mb-2">
            How It Works
          </h2>
          <div className="w-16 h-1 bg-[#F0A500] mx-auto rounded-full" />
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <Card
                key={step.number}
                className="relative bg-white rounded-xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-3 right-4">
                  <span className="inline-flex items-center justify-center h-7 px-3 bg-[#F0A500] text-[#0D1F3C] text-xs font-bold rounded-full">
                    {step.number}
                  </span>
                </div>

                <CardContent className="pt-8 pb-6 px-6">
                  {/* Icon */}
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full ${step.iconBgColor} mb-4`}
                  >
                    <Icon className={`h-7 w-7 ${step.iconColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-[#0D1F3C] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
