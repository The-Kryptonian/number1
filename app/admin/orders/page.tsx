"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Eye, CheckCircle, XCircle, Clock, AlertTriangle, Copy, ExternalLink } from "lucide-react"

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    type: "buy",
    customer: { name: "John Doe", phone: "+263 77 123 4567", email: "john@example.com" },
    usdtAmount: 100,
    zwgAmount: 2550,
    rate: 25.5,
    paymentMethod: "ecocash",
    walletAddress: "TXkF3p9jR...7mNQ",
    status: "pending_payment",
    createdAt: "2024-01-15T10:30:00Z",
    proofOfPayment: null,
  },
  {
    id: "ORD-002",
    type: "buy",
    customer: { name: "Jane Smith", phone: "+263 71 987 6543", email: "jane@example.com" },
    usdtAmount: 500,
    zwgAmount: 12750,
    rate: 25.5,
    paymentMethod: "innbucks",
    walletAddress: "TYh8K2mW...9pLR",
    status: "pending_verification",
    createdAt: "2024-01-15T09:15:00Z",
    proofOfPayment: "/proof-002.jpg",
  },
  {
    id: "ORD-003",
    type: "sell",
    customer: { name: "Mike Johnson", phone: "+263 78 456 7890", email: "mike@example.com" },
    usdtAmount: 200,
    zwgAmount: 4900,
    rate: 24.5,
    paymentMethod: "ecocash",
    walletAddress: "Platform Wallet",
    status: "pending_crypto",
    createdAt: "2024-01-15T08:45:00Z",
    txHash: null,
  },
  {
    id: "ORD-004",
    type: "sell",
    customer: { name: "Sarah Wilson", phone: "+263 77 111 2222", email: "sarah@example.com" },
    usdtAmount: 1000,
    zwgAmount: 24500,
    rate: 24.5,
    paymentMethod: "other",
    walletAddress: "Platform Wallet",
    status: "pending_payout",
    createdAt: "2024-01-15T07:30:00Z",
    txHash: "0x1234...abcd",
  },
  {
    id: "ORD-005",
    type: "buy",
    customer: { name: "Tom Brown", phone: "+263 71 333 4444", email: "tom@example.com" },
    usdtAmount: 250,
    zwgAmount: 6375,
    rate: 25.5,
    paymentMethod: "ecocash",
    walletAddress: "TZp9M3nK...4qWS",
    status: "completed",
    createdAt: "2024-01-14T16:20:00Z",
    proofOfPayment: "/proof-005.jpg",
  },
]

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending_payment: { label: "Awaiting Payment", color: "bg-amber-500/10 text-amber-500 border-amber-500/20", icon: <Clock className="h-3 w-3" /> },
  pending_verification: { label: "Verify Payment", color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: <Eye className="h-3 w-3" /> },
  pending_crypto: { label: "Awaiting Crypto", color: "bg-orange-500/10 text-orange-500 border-orange-500/20", icon: <Clock className="h-3 w-3" /> },
  pending_payout: { label: "Process Payout", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", icon: <AlertTriangle className="h-3 w-3" /> },
  processing: { label: "Processing", color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: <Clock className="h-3 w-3" /> },
  completed: { label: "Completed", color: "bg-green-500/10 text-green-500 border-green-500/20", icon: <CheckCircle className="h-3 w-3" /> },
  cancelled: { label: "Cancelled", color: "bg-red-500/10 text-red-500 border-red-500/20", icon: <XCircle className="h-3 w-3" /> },
  disputed: { label: "Disputed", color: "bg-red-500/10 text-red-500 border-red-500/20", icon: <AlertTriangle className="h-3 w-3" /> },
}

export default function AdminOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesType = typeFilter === "all" || order.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const pendingActions = mockOrders.filter(
    (o) => o.status === "pending_verification" || o.status === "pending_payout"
  )

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Pending Actions Alert */}
      {pendingActions.length > 0 && (
        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <div>
                <p className="font-medium text-amber-500">
                  {pendingActions.length} order(s) require your attention
                </p>
                <p className="text-sm text-muted-foreground">
                  {pendingActions.filter((o) => o.status === "pending_verification").length} payment verifications,{" "}
                  {pendingActions.filter((o) => o.status === "pending_payout").length} payouts pending
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by order ID, name, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="buy">Buy Orders</SelectItem>
                <SelectItem value="sell">Sell Orders</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending_payment">Awaiting Payment</SelectItem>
                <SelectItem value="pending_verification">Verify Payment</SelectItem>
                <SelectItem value="pending_crypto">Awaiting Crypto</SelectItem>
                <SelectItem value="pending_payout">Process Payout</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">USDT</TableHead>
                <TableHead className="text-right">ZWG</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-mono font-medium">{order.id}</TableCell>
                  <TableCell>
                    <Badge variant={order.type === "buy" ? "default" : "secondary"}>
                      {order.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer.name}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {order.usdtAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {order.zwgAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>{getPaymentLabel(order.paymentMethod)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusConfig[order.status]?.color}
                    >
                      <span className="mr-1">{statusConfig[order.status]?.icon}</span>
                      {statusConfig[order.status]?.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Order {selectedOrder?.id}
              <Badge variant={selectedOrder?.type === "buy" ? "default" : "secondary"}>
                {selectedOrder?.type?.toUpperCase()}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Created on {selectedOrder && new Date(selectedOrder.createdAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <Tabs defaultValue="details" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="customer">Customer</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">USDT Amount</p>
                    <p className="text-2xl font-bold">{selectedOrder.usdtAmount} USDT</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">ZWG Amount</p>
                    <p className="text-2xl font-bold">ZWG {selectedOrder.zwgAmount.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Exchange Rate</p>
                    <p className="font-medium">1 USDT = ZWG {selectedOrder.rate}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-medium">{getPaymentLabel(selectedOrder.paymentMethod)}</p>
                  </div>
                </div>

                {selectedOrder.type === "buy" && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Customer Wallet Address</p>
                    <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                      <code className="flex-1 text-sm">{selectedOrder.walletAddress}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(selectedOrder.walletAddress)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {selectedOrder.type === "sell" && selectedOrder.txHash && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Transaction Hash</p>
                    <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                      <code className="flex-1 text-sm">{selectedOrder.txHash}</code>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Current Status</p>
                  <Badge
                    variant="outline"
                    className={statusConfig[selectedOrder.status]?.color}
                  >
                    <span className="mr-1">{statusConfig[selectedOrder.status]?.icon}</span>
                    {statusConfig[selectedOrder.status]?.label}
                  </Badge>
                </div>
              </TabsContent>

              <TabsContent value="customer" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{selectedOrder.customer.name}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-medium">{selectedOrder.customer.phone}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p className="font-medium">{selectedOrder.customer.email}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="actions" className="space-y-4">
                {selectedOrder.status === "pending_verification" && (
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <p className="mb-2 font-medium">Proof of Payment</p>
                      <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                        <p className="text-muted-foreground">Payment screenshot would appear here</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Confirm Payment
                      </Button>
                      <Button variant="destructive" className="flex-1">
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject Payment
                      </Button>
                    </div>
                  </div>
                )}

                {selectedOrder.status === "pending_payout" && (
                  <div className="space-y-4">
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <p className="font-medium text-emerald-500">Crypto Received - Ready for Payout</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Customer should receive ZWG {selectedOrder.zwgAmount.toLocaleString()} via {getPaymentLabel(selectedOrder.paymentMethod)}
                      </p>
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark Payout Complete
                    </Button>
                  </div>
                )}

                {selectedOrder.status === "completed" && (
                  <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4 text-center">
                    <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-2" />
                    <p className="font-medium text-green-500">Order Completed</p>
                    <p className="text-sm text-muted-foreground">
                      This order has been successfully processed
                    </p>
                  </div>
                )}

                {(selectedOrder.status === "pending_payment" || selectedOrder.status === "pending_crypto") && (
                  <div className="rounded-lg border p-4 text-center">
                    <Clock className="mx-auto h-12 w-12 text-amber-500 mb-2" />
                    <p className="font-medium">Waiting for Customer</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedOrder.status === "pending_payment"
                        ? "Customer needs to complete payment"
                        : "Customer needs to send crypto"}
                    </p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <Button variant="destructive" className="w-full">
                    Cancel Order
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedOrder(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
