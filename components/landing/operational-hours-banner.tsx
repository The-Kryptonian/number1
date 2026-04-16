import { Clock } from "lucide-react"

export function OperationalHoursBanner() {
  return (
    <div className="bg-[#FFF8E7] border-b border-[#F0A500]/30">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-8 xl:px-16 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          <Clock className="h-4 w-4 text-[#92400E] shrink-0" />
          <p className="text-sm text-[#92400E]">
            <span className="font-medium">We process orders Monday – Saturday, 8:00 AM – 9:00 PM CAT</span>
            <span className="hidden sm:inline"> | </span>
            <span className="block sm:inline mt-1 sm:mt-0">Orders outside hours are queued and processed first thing in the morning</span>
          </p>
        </div>
      </div>
    </div>
  )
}
