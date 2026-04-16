"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowDownCircle,
  ArrowRight,
  ArrowUpCircle,
  Copy,
  Download,
  Search,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { getPaymentLabel } from "@/components/shared/payment-method-picker"
import { toast } from "sonner"

// Mock transactions data
const mockTransactions = [
  {
    id: "ZCX-A1B2C",
    type: "buy" as const,
    usdAmount: 100,
    usdtAmount: 93.46,
    mobileNumber: "0771234567",
    walletAddress: "TN3W4H6Rk2s9KLrD5Q6B9vYX8nMpJkLmRf",
    paymentMethod: "ecocash" as const,
    status: "completed" as const,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    paynowRef: "PNW-12345678",
    rate: 1.07,
  },
  {
    id: "ZCX-D3E4F",
    type: "sell" as const,
    usdAmount: 93,
    usdtAmount: 100,
    mobileNumber: "0779876543",
    walletAddress: "TK8M2N5Px4r7JLqE3Y9A6wZC1oPbHjKnSd",
    paymentMethod: "innbucks" as const,
    status: "pending" as const,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    nowpaymentsRef: "NP-87654321",
    rate: 0.93,
  },
  {
    id: "ZCX-G5H6I",
    type: "buy" as const,
    usdAmount: 50,
    usdtAmount: 46.73,
    mobileNumber: "0775551234",
    walletAddress: "TR7X9Y2Kz1n8MLpF4Q5B3vWC6oPdEjKmNa",
    paymentMethod: "ecocash" as const,
    status: "completed" as const,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    paynowRef: "PNW-23456789",
    rate: 1.07,
  },
  {
    id: "ZCX-J7K8L",
    type: "sell" as const,
    usdAmount: 186,
    usdtAmount: 200,
    mobileNumber: "0778889999",
    walletAddress: "TS5N3M7Lq2k6JLpE9Y4A8wZC1oPbHjKnRf",
    paymentMethod: "ecocash" as const,
    status: "failed" as const,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    nowpaymentsRef: "NP-34567890",
    rate: 0.93,
  },
]

type TransactionType = "all" | "buy" | "sell"
type TransactionStatus = "all" | "completed" | "pending" | "failed"

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<TransactionType>("all")
  const [statusFilter, setStatusFilter] = useState<TransactionStatus>("all")
  const [selectedTransaction, setSelectedTransaction] = useState<typeof mockTransactions[0] | null>(null)
  const [visibleCount, setVisibleCount] = useState(4)

  const filteredTransactions = mockTransactions.filter((tx) => {
    if (searchQuery && !tx.id.toLowerCase().includes(searchQuery.toLowerCase()) && !tx.mobileNumber.includes(searchQuery) && !tx.walletAddress.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (typeFilter !== "all" && tx.type !== typeFilter) return false
    if (statusFilter !== "all" && tx.status !== statusFilter) return false
    return true
  })

  const visibleTransactions = filteredTransactions.slice(0, visibleCount)
  const hasMore = visibleCount < filteredTransactions.length

  const totalBought = mockTransactions
    .filter((tx) => tx.type === "buy" && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.usdAmount, 0)

  const totalSold = mockTransactions
    .filter((tx) => tx.type === "sell" && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.usdAmount, 0)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied!")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700 border border-green-200">Completed</Badge>
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 border border-amber-200">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-700 border border-red-200">Failed</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700 border border-gray-200">Unknown</Badge>
    }
  }

  const truncateWallet = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="min-h-screen bg-[#F0F4FA] pb-20 md:pb-8">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-8 xl:px-16 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl lg:text-2xl font-semibold text-[#0D1F3C]">Transaction History</h1>
          <p className="text-sm text-[#4B5563]">Your complete record of all orders</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-white rounded-xl border border-[#E5E7EB]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 flex-wrap justify-center w-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <ArrowDownCircle className="h-5 w-5 text-[#1A3A6B]" />
                </div>
                <div>
                  <p className="text-xs text-[#6B7280]">Total Bought</p>
                  <p className="text-lg font-bold text-[#0D1F3C]">${totalBought.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-xl border border-[#E5E7EB]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 flex-wrap justify-center w-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF8E7]">
                  <ArrowUpCircle className="h-5 w-5 text-[#F0A500]" />
                </div>
                <div>
                  <p className="text-xs text-[#6B7280]">Total Sold</p>
                  <p className="text-lg font-bold text-[#0D1F3C]">${totalSold.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-xl border border-[#E5E7EB]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 flex-wrap justify-center w-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <span className="text-lg font-bold text-[#6B7280]">#</span>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280]">Total Orders</p>
                  <p className="text-lg font-bold text-[#0D1F3C]">{mockTransactions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 mb-6 sticky top-16 z-10">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Order ID, mobile number, or wallet"
                className="pl-10 h-10 rounded-full border-[#D1D5DB]"
              />
            </div>

            {/* Type Filter Chips */}
            <div className="flex gap-2">
              {(["all", "buy", "sell"] as TransactionType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    typeFilter === type
                      ? "bg-[#F0A500] text-white"
                      : "bg-[#F0F4FA] text-[#4B5563] hover:bg-[#E5E7EB]"
                  )}
                >
                  {type === "all" ? "All" : type === "buy" ? "Buy" : "Sell"}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as TransactionStatus)}>
              <SelectTrigger className="w-[160px] h-10">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Transactions List */}
        {filteredTransactions.length === 0 ? (
          <Card className="bg-white rounded-xl border border-[#E5E7EB]">
            <CardContent className="p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-[#F0F4FA] rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-[#9CA3AF]" />
              </div>
              <h3 className="text-lg font-semibold text-[#0D1F3C] mb-2">No transactions yet</h3>
              <p className="text-sm text-[#6B7280] mb-6">Your order history will appear here</p>
              <div className="flex justify-center gap-4">
                <Button asChild className="bg-[#F0A500] text-[#0D1F3C] font-bold hover:bg-[#D97706]">
                  <Link href="/buy">Buy USDT</Link>
                </Button>
                <Button asChild variant="outline" className="border-[#F0A500] text-[#F0A500] hover:bg-[#FFF8E7]">
                  <Link href="/sell">Sell USDT</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {visibleTransactions.map((tx) => (
              <Card
                key={tx.id}
                className="bg-white rounded-xl border border-[#E5E7EB] hover:border-[#F0A500]/50 transition-colors cursor-pointer"
                onClick={() => setSelectedTransaction(tx)}
              >
                <CardContent className="p-4">
                  {/* Top Row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge className={tx.type === "buy" ? "bg-[#1A3A6B] text-white" : "bg-teal-600 text-white"}>
                        {tx.type === "buy" ? "BUY" : "SELL"}
                      </Badge>
                      <span className="text-xs text-[#9CA3AF]">{tx.id}</span>
                    </div>
                    {getStatusBadge(tx.status)}
                  </div>

                  {/* Amount Row */}
                  <p className="text-lg font-bold text-[#0D1F3C] mb-2">
                    {tx.type === "buy"
                      ? `Paid $${tx.usdAmount.toFixed(2)} → Received ${tx.usdtAmount.toFixed(2)} USDT`
                      : `Sent ${tx.usdtAmount.toFixed(2)} USDT → Received $${tx.usdAmount.toFixed(2)}`}
                  </p>

                  {/* Details Row */}
                  <div className="text-sm text-[#6B7280] space-y-1">
                    <p>
                      {tx.type === "buy" ? "From:" : "To:"} {tx.mobileNumber} (
                      {getPaymentLabel(tx.paymentMethod)})
                    </p>
                    <p>
                      {tx.type === "buy" ? "To wallet:" : "From wallet:"} {truncateWallet(tx.walletAddress)}
                    </p>
                    <p>
                      {tx.createdAt.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      , {tx.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>

                  {/* View Details Link */}
                  <div className="mt-3 pt-3 border-t border-[#F0F4FA]">
                    <span className="text-sm text-[#F0A500] font-medium flex items-center gap-1">
                      View details
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              className="border-[#1A3A6B] text-[#1A3A6B] hover:bg-[#F0F4FA]"
              onClick={() => setVisibleCount((prev) => prev + 4)}
            >
              Load more orders ({filteredTransactions.length - visibleCount} remaining)
            </Button>
          </div>
        )}
      </div>

      {/* Transaction Details Sheet */}
      <Sheet open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <SheetContent className="w-full sm:max-w-[400px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Order Details</SheetTitle>
          </SheetHeader>

          {selectedTransaction && (
            <div className="mt-6 space-y-6">
              {/* Order ID & Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#0D1F3C]">{selectedTransaction.id}</span>
                  <button
                    onClick={() => copyToClipboard(selectedTransaction.id)}
                    className="text-[#6B7280] hover:text-[#F0A500]"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                {getStatusBadge(selectedTransaction.status)}
              </div>

              <div className="flex items-center gap-2">
                <Badge className={selectedTransaction.type === "buy" ? "bg-[#1A3A6B] text-white" : "bg-teal-600 text-white"}>
                  {selectedTransaction.type === "buy" ? "BUY" : "SELL"}
                </Badge>
              </div>

              {/* Details */}
              <div className="space-y-3 pt-4 border-t border-[#E5E7EB]">
                {selectedTransaction.type === "buy" ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#4B5563]">Amount paid:</span>
                      <span className="text-sm font-medium text-[#0D1F3C]">
                        ${selectedTransaction.usdAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#4B5563]">Payment method:</span>
                      <span className="text-sm font-medium text-[#0D1F3C]">
                        {getPaymentLabel(selectedTransaction.paymentMethod)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#4B5563]">Paid from number:</span>
                      <span className="text-sm font-medium text-[#0D1F3C]">
                        {selectedTransaction.mobileNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#4B5563]">Paynow reference:</span>
                      <span className="text-sm font-medium text-[#0D1F3C]">
                        {selectedTransaction.paynowRef}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#4B5563]">USDT received:</span>
                      <span className="text-sm font-medium text-[#0D1F3C]">
                        {selectedTransaction.usdtAmount.toFixed(2)} USDT
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#4B5563]">USDT amount:</span>
                      <span className="text-sm font-medium text-[#0D1F3C]">
                        {selectedTransaction.usdtAmount.toFixed(2)} USDT
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#4B5563]">NOWPayments ref:</span>
                      <span className="text-sm font-medium text-[#0D1F3C]">
                        {selectedTransaction.nowpaymentsRef}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#4B5563]">USD payout:</span>
                      <span className="text-sm font-medium text-[#F0A500]">
                        ${selectedTransaction.usdAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#4B5563]">Payout method:</span>
                      <span className="text-sm font-medium text-[#0D1F3C]">
                        {getPaymentLabel(selectedTransaction.paymentMethod)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#4B5563]">Paid to number:</span>
                      <span className="text-sm font-medium text-[#0D1F3C]">
                        {selectedTransaction.mobileNumber}
                      </span>
                    </div>
                  </>
                )}

                <div className="flex justify-between">
                  <span className="text-sm text-[#4B5563]">
                    {selectedTransaction.type === "buy" ? "Sent to wallet:" : "Sent from wallet:"}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-mono text-[#0D1F3C] max-w-[140px] truncate">
                      {selectedTransaction.walletAddress}
                    </span>
                    <button
                      onClick={() => copyToClipboard(selectedTransaction.walletAddress)}
                      className="text-[#6B7280] hover:text-[#F0A500]"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-[#4B5563]">Exchange rate:</span>
                  <span className="text-sm font-medium text-[#0D1F3C]">
                    1 USDT = ${selectedTransaction.rate}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-[#4B5563]">Service fee:</span>
                  <span className="text-sm font-medium text-[#0D1F3C]">
                    {selectedTransaction.type === "buy"
                      ? `$${(selectedTransaction.usdAmount * 0.07).toFixed(2)}`
                      : `${(selectedTransaction.usdtAmount * 0.07).toFixed(2)} USDT`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-[#4B5563]">Ordered:</span>
                  <span className="text-sm font-medium text-[#0D1F3C]">
                    {selectedTransaction.createdAt.toLocaleDateString()}{" "}
                    {selectedTransaction.createdAt.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-[#4B5563]">Completed:</span>
                  <span className="text-sm font-medium text-[#0D1F3C]">
                    {selectedTransaction.status === "completed"
                      ? selectedTransaction.createdAt.toLocaleDateString()
                      : "Pending"}
                  </span>
                </div>
              </div>

              {/* Download Receipt */}
              <Button
                variant="outline"
                className="w-full border-[#F0A500] text-[#F0A500] hover:bg-[#FFF8E7]"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
