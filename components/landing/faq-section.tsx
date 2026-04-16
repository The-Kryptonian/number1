"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is USDT?",
    answer:
      "USDT (Tether) is a stablecoin pegged to the US Dollar. 1 USDT always equals approximately $1 USD. It is widely used across Africa for online trading, international payments, and savings.",
  },
  {
    question: "Which crypto wallets are supported?",
    answer:
      "We send USDT on the TRC-20 network (Tron blockchain). Compatible wallets include Binance, Trust Wallet, MEXC, Bybit, and any wallet that supports TRC-20 USDT. Always double-check your wallet supports TRC-20 before ordering.",
  },
  {
    question: "How long does it take?",
    answer:
      "Buy orders: USDT is sent within 2 hours of payment confirmation. Sell orders: Mobile money is sent within 1 hour of your USDT being confirmed on-chain. Both happen faster during business hours.",
  },
  {
    question: "What are your fees?",
    answer:
      "We charge a 7% service fee on all transactions. This is already included in the rates displayed. There are no hidden charges. For a $100 order, you receive $93 worth of USDT.",
  },
  {
    question: "Is this safe?",
    answer:
      "Yes. We are a registered business. Every transaction gets a unique order ID. Your funds are tracked at every step. We have never failed to fulfil a confirmed order.",
  },
]

export function FaqSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-[720px] px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-xl lg:text-2xl font-semibold text-[#0D1F3C] mb-2">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-[#F0A500] mx-auto rounded-full" />
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-[#E5E7EB] rounded-xl px-4 data-[state=open]:border-[#F0A500]/50"
            >
              <AccordionTrigger className="text-left text-[#0D1F3C] font-medium hover:text-[#F0A500] hover:no-underline py-4 [&[data-state=open]>svg]:text-[#F0A500]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#4B5563] pb-4 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
