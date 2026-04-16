"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Send,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  ExternalLink,
  User,
  Wallet,
  CreditCard
} from "lucide-react"

// Mock pending orders data
const pendingBuyOrders = [
  {
    id: "ORD-2001",
    type: "buy",
    customer: { name: "John Mutasa", phone: "+263 77 123 4567", email: "john@email.com" },
    amount: 500,
    zwgAmount: 315000,
    rate: 630,
    walletAddress: "TXqZ8K7m9nP3rS5tU2vW4xY6zA8bC0dE1f",
    paymentMethod: "ecocash",
    paymentReference: "EC123456789",
    status: "pending_verification",
    createdAt: "2024-01-15T10:30:00Z",
    expiresAt: "2024-01-15T11:30:00Z",
    proofOfPayment: "/proof-001.jpg"
  },
  {
    id: "ORD-2003",
    type: "buy",
    customer: { name: "Mary Chipo", phone: "+263 71 987 6543", email: "mary@email.com" },
    amount: 200,
    zwgAmount: 126000,
    rate: 630,
    walletAddress: "TAbC1d2E3f4G5h6I7j8K9l0M1n2O3p4Q5r",
    paymentMethod: "other",
    paymentReference: "CBZ78901234",
    status: "pending_verification",
    createdAt: "2024-01-15T09:15:00Z",
    expiresAt: "2024-01-15T10:15:00Z",
    proofOfPayment: "/proof-003.jpg"
  },
]

const pendingSellOrders = [
  {
    id: "ORD-2002",
    type: "sell",
    customer: { name: "Grace Moyo", phone: "+263 78 456 7890", email: "grace@email.com" },
    amount: 1000,
    zwgAmount: 600000,
    rate: 600,
    walletAddress: "TRs7t8U9v0W1x2Y3z4A5b6C7d8E9f0G1h",
    payoutMethod: "ecocash",
    payoutAccount: "+263 78 456 7890",
    status: "pending_payout",
    createdAt: "2024-01-15T08:45:00Z",
    txHash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0"
  },
  {
    id: "ORD-2004",
    type: "sell",
    customer: { name: "Peter Ndlovu", phone: "+263 73 111 2222", email: "peter@email.com" },
    amount: 750,
    zwgAmount: 450000,
    rate: 600,
    walletAddress: "TZx9y0A1b2C3d4E5f6G7h8I9j0K1l2M3n4",
    payoutMethod: "other",
    payoutAccount: "FBC 1234567890",
    status: "pending_payout",
    createdAt: "2024-01-15T07:30:00Z",
    txHash: "z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0"
  },
]

type Order = typeof pendingBuyOrders[0] | typeof pendingSellOrders[0]

export default function PendingOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [actionDialog, setActionDialog] = useState<"verify" | "reject" | "payout" | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [txHash, setTxHash] = useState("")
  const [payoutReference, setPayoutReference] = useState("")

  const handleVerifyPayment = () => {
    // In production, this would call an API
    console.log("Verifying payment for order:", selectedOrder?.id)
    setActionDialog(null)
    setSelectedOrder(null)
  }

  const handleRejectOrder = () => {
    console.log("Rejecting order:", selectedOrder?.id, "Reason:", rejectionReason)
    setActionDialog(null)
    setSelectedOrder(null)
    setRejectionReason("")
  }

  const handleProcessPayout = () => {
    console.log("Processing payout for order:", selectedOrder?.id, "Reference:", payoutReference)
    setActionDialog(null)
    setSelectedOrder(null)
    setPayoutReference("")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    return `${diffHours}h ago`
  }

  const OrderCard = ({ order }: { order: Order }) => {
    const isBuy = order.type === "buy"
    
    return (
      <Card className="hover:border-primary/50 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${isBuy ? "bg-green-500/10" : "bg-blue-500/10"}`}>
                {isBuy ? (
                  <ArrowDownLeft className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-blue-500" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{order.id}</p>
                  <Badge variant="outline" className={isBuy ? "text-green-500 border-green-500/30" : "text-blue-500 border-blue-500/30"}>
                    {isBuy ? "Buy" : "Sell"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{order.customer.name}</p>
                <p className="text-xs text-muted-foreground">{formatTimeAgo(order.createdAt)}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-mono font-semibold">{order.amount.toLocaleString()} USDT</p>
              <p className="text-sm text-muted-foreground">ZWG {order.zwgAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t flex items-center justify-between">
            <Badge 
              variant="outline" 
              className={
                order.status === "pending_verification" 
                  ? "bg-amber-500/10 text-amber-500 border-amber-500/20" 
                  : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
              }
            >
              {order.status === "pending_verification" ? (
                <><Eye className="h-3 w-3 mr-1" /> Verify Payment</>
              ) : (
                <><Send className="h-3 w-3 mr-1" /> Process Payout</>
              )}
            </Badge>
            
            <Button size="sm" onClick={() => setSelectedOrder(order)}>
              <Eye className="h-4 w-4 mr-1" />
              Review
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pending Orders</h1>
        <p className="text-muted-foreground">Orders requiring your immediate action</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-amber-500/10">
                <Eye className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingBuyOrders.length}</p>
                <p className="text-sm text-muted-foreground">Payments to Verify</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-emerald-500/10">
                <Send className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingSellOrders.length}</p>
                <p className="text-sm text-muted-foreground">Payouts Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingBuyOrders.length + pendingSellOrders.length}</p>
                <p className="text-sm text-muted-foreground">Total Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Orders Tabs */}
      <Tabs defaultValue="verify" className="space-y-4">
        <TabsList>
          <TabsTrigger value="verify" className="gap-2">
            <Eye className="h-4 w-4" />
            Verify Payments
            {pendingBuyOrders.length > 0 && (
              <Badge variant="secondary" className="ml-1">{pendingBuyOrders.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="payout" className="gap-2">
            <Send className="h-4 w-4" />
            Process Payouts
            {pendingSellOrders.length > 0 && (
              <Badge variant="secondary" className="ml-1">{pendingSellOrders.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="verify" className="space-y-4">
          {pendingBuyOrders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg">All Caught Up!</h3>
                <p className="text-muted-foreground">No payments waiting to be verified</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {pendingBuyOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="payout" className="space-y-4">
          {pendingSellOrders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg">All Caught Up!</h3>
                <p className="text-muted-foreground">No payouts waiting to be processed</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {pendingSellOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder && !actionDialog} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedOrder.id}
                  <Badge variant="outline" className={selectedOrder.type === "buy" ? "text-green-500" : "text-blue-500"}>
                    {selectedOrder.type === "buy" ? "Buy Order" : "Sell Order"}
                  </Badge>
                </DialogTitle>
                <DialogDescription>Review order details and take action</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Customer Info */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Customer</span>
                  </div>
                  <p className="font-medium">{selectedOrder.customer.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer.phone}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer.email}</p>
                </div>

                {/* Amount Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">USDT Amount</p>
                    <p className="font-mono font-semibold text-lg">{selectedOrder.amount.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">ZWG Amount</p>
                    <p className="font-mono font-semibold text-lg">{selectedOrder.zwgAmount.toLocaleString()}</p>
                  </div>
                </div>

                {/* Payment/Payout Details */}
                {selectedOrder.type === "buy" && "paymentMethod" in selectedOrder ? (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Payment Details</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Method</span>
                        <span className="text-sm font-medium">{getPaymentLabel(selectedOrder.paymentMethod)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Reference</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-mono">{selectedOrder.paymentReference}</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(selectedOrder.paymentReference)}>
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : "payoutMethod" in selectedOrder ? (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Send className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Payout Details</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Method</span>
                        <span className="text-sm font-medium">{selectedOrder.payoutMethod}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Account</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-mono">{selectedOrder.payoutAccount}</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(selectedOrder.payoutAccount)}>
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Wallet Address */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {selectedOrder.type === "buy" ? "Destination Wallet" : "Source Wallet"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-background px-2 py-1 rounded flex-1 truncate">
                      {selectedOrder.walletAddress}
                    </code>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(selectedOrder.walletAddress)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <a href={`https://tronscan.org/#/address/${selectedOrder.walletAddress}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                {/* TX Hash for sell orders */}
                {"txHash" in selectedOrder && selectedOrder.txHash && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-500">USDT Received</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-background px-2 py-1 rounded flex-1 truncate">
                        {selectedOrder.txHash}
                      </code>
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <a href={`https://tronscan.org/#/transaction/${selectedOrder.txHash}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="gap-2">
                {selectedOrder.status === "pending_verification" ? (
                  <>
                    <Button variant="outline" onClick={() => setActionDialog("reject")}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button onClick={() => setActionDialog("verify")}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verify Payment
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setActionDialog("reject")}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel Order
                    </Button>
                    <Button onClick={() => setActionDialog("payout")}>
                      <Send className="h-4 w-4 mr-2" />
                      Process Payout
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Verify Payment Dialog */}
      <Dialog open={actionDialog === "verify"} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Payment</DialogTitle>
            <DialogDescription>
              Confirm that you have received ZWG {selectedOrder?.zwgAmount.toLocaleString()} via {selectedOrder && "paymentMethod" in selectedOrder ? getPaymentLabel(selectedOrder.paymentMethod) : ""}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-500">Important</p>
                  <p className="text-muted-foreground">
                    Only verify if you have confirmed the payment in your {selectedOrder && "paymentMethod" in selectedOrder ? getPaymentLabel(selectedOrder.paymentMethod) : ""} account.
                    This will trigger the USDT transfer to the customer.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Transaction Hash (for USDT transfer)</Label>
              <Input 
                placeholder="Enter the TX hash after sending USDT"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                The transaction hash will be shared with the customer for tracking
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>Cancel</Button>
            <Button onClick={handleVerifyPayment}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm & Send USDT
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Process Payout Dialog */}
      <Dialog open={actionDialog === "payout"} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Payout</DialogTitle>
            <DialogDescription>
              Send ZWG {selectedOrder?.zwgAmount.toLocaleString()} to customer
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {"payoutMethod" in (selectedOrder || {}) && (
              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Payout Method</span>
                  <span className="font-medium">{(selectedOrder as typeof pendingSellOrders[0]).payoutMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Account</span>
                  <span className="font-mono">{(selectedOrder as typeof pendingSellOrders[0]).payoutAccount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="font-mono font-semibold">ZWG {selectedOrder?.zwgAmount.toLocaleString()}</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Payment Reference</Label>
              <Input 
                placeholder="Enter the payment reference/confirmation"
                value={payoutReference}
                onChange={(e) => setPayoutReference(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Reference number from your payment confirmation
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>Cancel</Button>
            <Button onClick={handleProcessPayout}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm Payout Sent
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={actionDialog === "reject"} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Order</DialogTitle>
            <DialogDescription>
              This will cancel the order and notify the customer
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Reason for rejection</Label>
              <Textarea 
                placeholder="Enter the reason for rejecting this order..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleRejectOrder}>
              <XCircle className="h-4 w-4 mr-2" />
              Reject Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
