"use client"

import { useState } from "react"
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Check,
  ClipboardList,
  Copy,
  DollarSign,
  TrendingUp,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { getPaymentLabel } from "@/components/shared/payment-method-picker"

// Mock data
const METHOD_BADGE_CLASS: Record<string, string> = {
  ecocash:  "bg-green-100 text-green-700",
  innbucks: "bg-orange-100 text-orange-700",
  onemoney: "bg-red-100 text-red-700",
  omari:    "bg-blue-100 text-blue-700",
  card:     "bg-slate-100 text-slate-700",
  other:    "bg-gray-100 text-gray-600",
}
function getMethodBadgeClass(method: string) {
  return METHOD_BADGE_CLASS[method] ?? "bg-gray-100 text-gray-600"
}

const pendingBuyOrders = [
  {
    id: "ZCX-A1B2C",
    time: "23 mins ago",
    usdPaid: 100,
    usdtToSend: 93.46,
    wallet: "TN3W4H6Rk2s9KLrD5Q6B9vYX8nMpJkLmRf",
    fromNumber: "0771234567",
    method: "ecocash",
  },
  {
    id: "ZCX-D3E4F",
    time: "45 mins ago",
    usdPaid: 50,
    usdtToSend: 46.73,
    wallet: "TK8M2N5Px4r7JLqE3Y9A6wZC1oPbHjKnSd",
    fromNumber: "0779876543",
    method: "innbucks",
  },
]

const pendingSellOrders = [
  {
    id: "ZCX-G5H6I",
    time: "12 mins ago",
    usdtReceived: 100,
    usdToPay: 93,
    toNumber: "0775551234",
    method: "ecocash",
  },
]

export default function AdminDashboardPage() {
  const [confirmedBuyOrders, setConfirmedBuyOrders] = useState<string[]>([])
  const [confirmedSellOrders, setConfirmedSellOrders] = useState<string[]>([])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied!")
  }

  const handleConfirmBuySent = (orderId: string) => {
    setConfirmedBuyOrders([...confirmedBuyOrders, orderId])
    toast.success(`Order ${orderId} marked as USDT sent`)
  }

  const handleConfirmSellPaid = (orderId: string) => {
    setConfirmedSellOrders([...confirmedSellOrders, orderId])
    toast.success(`Order ${orderId} marked as payment sent`)
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const activePendingBuys = pendingBuyOrders.filter((o) => !confirmedBuyOrders.includes(o.id))
  const activePendingSells = pendingSellOrders.filter((o) => !confirmedSellOrders.includes(o.id))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0D1F3C]">Dashboard</h1>
          <p className="text-sm text-[#6B7280]">{today}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white rounded-xl border border-[#E5E7EB]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#6B7280]">Orders Today</span>
              <ClipboardList className="h-5 w-5 text-[#9CA3AF]" />
            </div>
            <p className="text-2xl font-bold text-[#0D1F3C]">12</p>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> 3 more than yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-[#E5E7EB]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#6B7280]">Revenue Today</span>
              <DollarSign className="h-5 w-5 text-[#F0A500]" />
            </div>
            <p className="text-2xl font-bold text-[#0D1F3C]">$84.00</p>
            <p className="text-xs text-[#6B7280]">7% service fees</p>
          </CardContent>
        </Card>

        <Card
          className={`rounded-xl border ${
            activePendingBuys.length > 0
              ? "bg-amber-50 border-amber-300"
              : "bg-white border-[#E5E7EB]"
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#6B7280]">Pending USDT Sends</span>
              {activePendingBuys.length > 0 && (
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                </span>
              )}
            </div>
            <p
              className={`text-2xl font-bold ${
                activePendingBuys.length > 0 ? "text-amber-700" : "text-green-600"
              }`}
            >
              {activePendingBuys.length}
            </p>
            <p className="text-xs text-[#6B7280]">
              {activePendingBuys.length === 0 ? "All clear" : "Needs attention"}
            </p>
          </CardContent>
        </Card>

        <Card
          className={`rounded-xl border ${
            activePendingSells.length > 0
              ? "bg-amber-50 border-amber-300"
              : "bg-white border-[#E5E7EB]"
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#6B7280]">Pending Payouts</span>
              {activePendingSells.length > 0 && (
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                </span>
              )}
            </div>
            <p
              className={`text-2xl font-bold ${
                activePendingSells.length > 0 ? "text-amber-700" : "text-green-600"
              }`}
            >
              {activePendingSells.length}
            </p>
            <p className="text-xs text-[#6B7280]">
              {activePendingSells.length === 0 ? "All clear" : "Needs attention"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Action Required Section */}
      {(activePendingBuys.length > 0 || activePendingSells.length > 0) && (
        <Card className="bg-white rounded-xl border border-[#E5E7EB]">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg text-[#0D1F3C]">
              <Zap className="h-5 w-5 text-[#F0A500]" />
              Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="buy" className="w-full">
              <TabsList className="mb-4 flex flex-nowrap w-full h-17">

                <TabsTrigger value="buy" className="gap-2 flex flex-wrap">
                  Buy Orders Pending
                  {activePendingBuys.length > 0 && (
                    <Badge className="bg-amber-500 text-white">{activePendingBuys.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="sell" className="gap-2 flex flex-wrap">
                  Sell Orders Pending
                  {activePendingSells.length > 0 && (
                    <Badge className="bg-amber-500 text-white">{activePendingSells.length}</Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="buy">
                {activePendingBuys.length === 0 ? (
                  <div className="text-center py-8 text-[#6B7280]">
                    <Check className="h-12 w-12 mx-auto mb-2 text-green-500" />
                    <p>No pending buy orders</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#E5E7EB]">
                          <th className="text-left py-3 px-2 text-xs font-medium text-[#6B7280]">Order ID</th>
                          <th className="text-left py-3 px-2 text-xs font-medium text-[#6B7280]">Time</th>
                          <th className="text-left py-3 px-2 text-xs font-medium text-[#6B7280]">USD Paid</th>
                          <th className="text-left py-3 px-2 text-xs font-medium text-[#6B7280]">USDT to Send</th>
                          <th className="text-left py-3 px-2 text-xs font-medium text-[#6B7280]">Wallet Address</th>
                          <th className="text-left py-3 px-2 text-xs font-medium text-[#6B7280]">From Number</th>
                          <th className="text-left py-3 px-2 text-xs font-medium text-[#6B7280]">Method</th>
                          <th className="text-left py-3 px-2 text-xs font-medium text-[#6B7280]">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activePendingBuys.map((order) => (
                          <tr key={order.id} className="border-b border-[#F0F4FA]">
                            <td className="py-3 px-2 text-sm font-medium text-[#0D1F3C]">{order.id}</td>
                            <td
                              className={`py-3 px-2 text-sm ${
                                order.time.includes("45") ? "text-amber-600 font-medium" : "text-[#6B7280]"
                              }`}
                            >
                              {order.time}
                            </td>
                            <td className="py-3 px-2 text-sm font-bold text-[#0D1F3C]">${order.usdPaid}</td>
                            <td className="py-3 px-2 text-sm font-bold text-[#F0A500]">
                              {order.usdtToSend} USDT
                            </td>
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-[#0D1F3C]">
                                  {order.wallet.slice(0, 8)}...
                                </span>
                                <Button
                                  size="sm"
                                  onClick={() => copyToClipboard(order.wallet)}
                                  className="bg-[#F0A500] text-[#0D1F3C] hover:bg-[#D97706] h-8 px-3"
                                >
                                  <Copy className="h-4 w-4 mr-1" />
                                  Copy
                                </Button>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-1">
                                <span className="text-sm text-[#0D1F3C]">{order.fromNumber}</span>
                                <button
                                  onClick={() => copyToClipboard(order.fromNumber)}
                                  className="text-[#9CA3AF] hover:text-[#F0A500]"
                                >
                                  <Copy className="h-3 w-3" />
                                </button>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <Badge
                                className={
                                  getMethodBadgeClass(order.method)
                                }
                              >
                                {getPaymentLabel(order.method)}
                              </Badge>
                            </td>
                            <td className="py-3 px-2">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button className="bg-green-500 text-white hover:bg-green-600 h-8">
                                    <Check className="h-4 w-4 mr-1" />
                                    Mark USDT Sent
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirm USDT Sent</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Confirm you have sent {order.usdtToSend} USDT to{" "}
                                      {order.wallet.slice(0, 8)}...{order.wallet.slice(-4)}?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleConfirmBuySent(order.id)}
                                      className="bg-green-500 hover:bg-green-600"
                                    >
                                      Yes, Confirm Sent
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="sell">
                {activePendingSells.length === 0 ? (
                  <div className="text-center py-8 text-[#6B7280]">
                    <Check className="h-12 w-12 mx-auto mb-2 text-green-500" />
                    <p>No pending sell orders</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#E5E7EB]">
                          <th className="text-left py-3 px-2 text-xs font-medium text-[#6B7280]">Order ID</th>
                          <th className="text-left py-3 px-2 text-xs font-medium text-[#6B7280]">Time</th>
                          <th className="text-left py-3 px-2 text-xs font-medium text-[#6B7280]">USDT Received</th>
                          <th className="text-left py-3 px-2 text-xs font-medium text-[#6B7280]">USD to Pay</th>
                          <th className="text-left py-3 px-2 text-xs font-medium text-[#6B7280]">Payout Number</th>
                          <th className="text-left py-3 px-2 text-xs font-medium text-[#6B7280]">Method</th>
                          <th className="text-left py-3 px-2 text-xs font-medium text-[#6B7280]">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activePendingSells.map((order) => (
                          <tr key={order.id} className="border-b border-[#F0F4FA]">
                            <td className="py-3 px-2 text-sm font-medium text-[#0D1F3C]">{order.id}</td>
                            <td className="py-3 px-2 text-sm text-[#6B7280]">{order.time}</td>
                            <td className="py-3 px-2 text-sm font-bold text-[#0D1F3C]">
                              {order.usdtReceived} USDT
                            </td>
                            <td className="py-3 px-2 text-lg font-bold text-[#F0A500]">${order.usdToPay}</td>
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-[#0D1F3C]">{order.toNumber}</span>
                                <Button
                                  size="sm"
                                  onClick={() => copyToClipboard(order.toNumber)}
                                  className="bg-[#F0A500] text-[#0D1F3C] hover:bg-[#D97706] h-8 px-3"
                                >
                                  <Copy className="h-4 w-4 mr-1" />
                                  Copy
                                </Button>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <Badge
                                className={
                                  getMethodBadgeClass(order.method)
                                }
                              >
                                {getPaymentLabel(order.method)}
                              </Badge>
                            </td>
                            <td className="py-3 px-2">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button className="bg-green-500 text-white hover:bg-green-600 h-8">
                                    <Check className="h-4 w-4 mr-1" />
                                    Mark Payment Sent
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirm Payment Sent</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Confirm you have sent ${order.usdToPay} via{" "}
                                      {getPaymentLabel(order.method)} to{" "}
                                      {order.toNumber}?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleConfirmSellPaid(order.id)}
                                      className="bg-green-500 hover:bg-green-600"
                                    >
                                      Yes, Confirm Sent
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Float Health Panel */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-white rounded-xl border border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-lg text-[#0D1F3C]">Today&apos;s Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-[#F0F4FA] rounded-lg">
                <p className="text-2xl font-bold text-[#0D1F3C]">12</p>
                <p className="text-xs text-[#6B7280]">Completed today</p>
              </div>
              <div className="text-center p-4 bg-[#F0F4FA] rounded-lg">
                <p className="text-2xl font-bold text-[#F0A500]">$84.00</p>
                <p className="text-xs text-[#6B7280]">Revenue today</p>
              </div>
              <div className="text-center p-4 bg-[#F0F4FA] rounded-lg">
                <p className="text-2xl font-bold text-[#0D1F3C]">$100.00</p>
                <p className="text-xs text-[#6B7280]">Avg order size</p>
              </div>
              <div className="text-center p-4 bg-[#F0F4FA] rounded-lg">
                <p className="text-2xl font-bold text-[#0D1F3C]">$200.00</p>
                <p className="text-xs text-[#6B7280]">Largest order</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-lg text-[#0D1F3C]">Float Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#4B5563]">USD Cash Float (Stanbic)</span>
                <Badge className="bg-green-100 text-green-700">Healthy</Badge>
              </div>
              <Progress value={75} className="h-2 [&>div]:bg-green-500" />
              <p className="text-sm font-semibold text-[#0D1F3C] mt-1">$450.00 available</p>
              <p className="text-xs text-[#6B7280]">Top up via Paynow settlement</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#4B5563]">USDT Float (Wallet)</span>
                <Badge className="bg-amber-100 text-amber-700">Getting Low</Badge>
              </div>
              <Progress value={35} className="h-2 [&>div]:bg-amber-500" />
              <p className="text-sm font-semibold text-[#0D1F3C] mt-1">180.00 USDT available</p>
              <p className="text-xs text-[#6B7280]">Top up via Binance</p>
            </div>

            <Button variant="outline" className="w-full border-[#1A3A6B] text-[#1A3A6B]">
              Edit Float Values
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
