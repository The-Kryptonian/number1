"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  RefreshCw,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Minus,
  Copy,
  ExternalLink,
  DollarSign,
  Clock,
  CheckCircle
} from "lucide-react"

// Mock float data
const floatData = {
  usdt: {
    available: 15000,
    reserved: 2500,
    total: 17500,
    minThreshold: 5000,
    targetBalance: 20000,
    walletAddress: "TXqZ8K7m9nP3rS5tU2vW4xY6zA8bC0dE1fGh2",
    lastUpdated: "2024-01-15T10:30:00Z"
  },
  zwg: {
    available: 8500000,
    reserved: 1200000,
    total: 9700000,
    minThreshold: 2000000,
    targetBalance: 10000000,
    lastUpdated: "2024-01-15T10:30:00Z"
  }
}

const recentFloatTransactions = [
  { id: 1, type: "deposit", currency: "USDT", amount: 5000, source: "External Wallet", txHash: "abc123...", timestamp: "2024-01-15T09:00:00Z", status: "completed" },
  { id: 2, type: "withdrawal", currency: "USDT", amount: 1000, destination: "Customer ORD-2001", txHash: "def456...", timestamp: "2024-01-15T08:30:00Z", status: "completed" },
  { id: 3, type: "deposit", currency: "ZWG", amount: 2000000, source: "Bank Transfer", reference: "CBZ123456", timestamp: "2024-01-15T08:00:00Z", status: "completed" },
  { id: 4, type: "withdrawal", currency: "ZWG", amount: 500000, destination: "Customer ORD-2002", reference: "EC789012", timestamp: "2024-01-15T07:30:00Z", status: "completed" },
  { id: 5, type: "deposit", currency: "USDT", amount: 2000, source: "Customer ORD-2003", txHash: "ghi789...", timestamp: "2024-01-15T07:00:00Z", status: "pending" },
]

const floatAlerts = [
  { id: 1, type: "warning", message: "USDT balance below target (75% of target)", timestamp: "2024-01-15T10:00:00Z" },
  { id: 2, type: "info", message: "ZWG float replenished successfully", timestamp: "2024-01-15T08:00:00Z" },
]

export default function FloatMonitorPage() {
  const [addFloatDialog, setAddFloatDialog] = useState<"usdt" | "zwg" | null>(null)
  const [withdrawDialog, setWithdrawDialog] = useState<"usdt" | "zwg" | null>(null)
  const [amount, setAmount] = useState("")
  const [reference, setReference] = useState("")

  const usdtUtilization = ((floatData.usdt.total - floatData.usdt.available) / floatData.usdt.total) * 100
  const zwgUtilization = ((floatData.zwg.total - floatData.zwg.available) / floatData.zwg.total) * 100
  
  const usdtHealthPercent = (floatData.usdt.available / floatData.usdt.targetBalance) * 100
  const zwgHealthPercent = (floatData.zwg.available / floatData.zwg.targetBalance) * 100

  const getHealthStatus = (percent: number) => {
    if (percent >= 80) return { label: "Healthy", color: "text-green-500", bg: "bg-green-500" }
    if (percent >= 50) return { label: "Moderate", color: "text-amber-500", bg: "bg-amber-500" }
    return { label: "Low", color: "text-red-500", bg: "bg-red-500" }
  }

  const usdtHealth = getHealthStatus(usdtHealthPercent)
  const zwgHealth = getHealthStatus(zwgHealthPercent)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleAddFloat = () => {
    console.log(`Adding ${amount} ${addFloatDialog} to float`)
    setAddFloatDialog(null)
    setAmount("")
    setReference("")
  }

  const handleWithdraw = () => {
    console.log(`Withdrawing ${amount} ${withdrawDialog} from float`)
    setWithdrawDialog(null)
    setAmount("")
    setReference("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Float Monitor</h1>
          <p className="text-muted-foreground">Monitor and manage your trading float</p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Alerts */}
      {floatAlerts.filter(a => a.type === "warning").length > 0 && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <p className="font-medium text-amber-500">Float Alert</p>
              {floatAlerts.filter(a => a.type === "warning").map((alert) => (
                <p key={alert.id} className="text-sm text-muted-foreground">{alert.message}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Float Balance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* USDT Float */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-green-500/10">
                  <DollarSign className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">USDT Float</CardTitle>
                  <CardDescription>Tether (TRC-20)</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className={usdtHealth.color}>
                {usdtHealth.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Available</p>
                <p className="font-mono font-bold text-lg text-green-500">
                  {floatData.usdt.available.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Reserved</p>
                <p className="font-mono font-bold text-lg text-amber-500">
                  {floatData.usdt.reserved.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Total</p>
                <p className="font-mono font-bold text-lg">
                  {floatData.usdt.total.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Float Health</span>
                <span className={usdtHealth.color}>{Math.round(usdtHealthPercent)}% of target</span>
              </div>
              <Progress value={usdtHealthPercent} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Min: {floatData.usdt.minThreshold.toLocaleString()}</span>
                <span>Target: {floatData.usdt.targetBalance.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Wallet Address</p>
              <div className="flex items-center gap-2">
                <code className="text-xs flex-1 truncate">{floatData.usdt.walletAddress}</code>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(floatData.usdt.walletAddress)}>
                  <Copy className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                  <a href={`https://tronscan.org/#/address/${floatData.usdt.walletAddress}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => setAddFloatDialog("usdt")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Float
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setWithdrawDialog("usdt")}>
                <Minus className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ZWG Float */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-blue-500/10">
                  <Wallet className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">ZWG Float</CardTitle>
                  <CardDescription>Zimbabwe Gold</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className={zwgHealth.color}>
                {zwgHealth.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Available</p>
                <p className="font-mono font-bold text-lg text-green-500">
                  {floatData.zwg.available.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Reserved</p>
                <p className="font-mono font-bold text-lg text-amber-500">
                  {floatData.zwg.reserved.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Total</p>
                <p className="font-mono font-bold text-lg">
                  {floatData.zwg.total.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Float Health</span>
                <span className={zwgHealth.color}>{Math.round(zwgHealthPercent)}% of target</span>
              </div>
              <Progress value={zwgHealthPercent} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Min: {floatData.zwg.minThreshold.toLocaleString()}</span>
                <span>Target: {floatData.zwg.targetBalance.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Payment Methods</p>
              <div className="flex flex-wrap gap-2 mt-1">
                <Badge variant="secondary">EcoCash</Badge>
                <Badge variant="secondary">InnBucks</Badge>
                <Badge variant="secondary">OneMoney</Badge>
                <Badge variant="secondary">Omari</Badge>
                <Badge variant="secondary">Card</Badge>
                <Badge variant="secondary">Bank Transfer</Badge>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => setAddFloatDialog("zwg")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Float
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setWithdrawDialog("zwg")}>
                <Minus className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ArrowDownLeft className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Today&apos;s Inflow</span>
            </div>
            <p className="text-xl font-bold mt-1">7,000 USDT</p>
            <p className="text-xs text-green-500">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">Today&apos;s Outflow</span>
            </div>
            <p className="text-xl font-bold mt-1">5,500 USDT</p>
            <p className="text-xs text-muted-foreground">-5% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Net Position</span>
            </div>
            <p className="text-xl font-bold mt-1 text-green-500">+1,500 USDT</p>
            <p className="text-xs text-muted-foreground">Float growing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Utilization</span>
            </div>
            <p className="text-xl font-bold mt-1">{Math.round(usdtUtilization)}%</p>
            <p className="text-xs text-muted-foreground">USDT reserved</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Float Transactions</CardTitle>
          <CardDescription>Track all float deposits and withdrawals</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="usdt">USDT</TabsTrigger>
              <TabsTrigger value="zwg">ZWG</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Source/Destination</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentFloatTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {tx.type === "deposit" ? (
                            <ArrowDownLeft className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-blue-500" />
                          )}
                          <span className="capitalize">{tx.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{tx.currency}</Badge>
                      </TableCell>
                      <TableCell className="font-mono">
                        {tx.currency === "USDT" ? "" : "ZWG "}
                        {tx.amount.toLocaleString()}
                        {tx.currency === "USDT" ? " USDT" : ""}
                      </TableCell>
                      <TableCell className="text-sm">
                        {tx.source || tx.destination}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {tx.txHash || tx.reference || "-"}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={tx.status === "completed" ? "text-green-500" : "text-amber-500"}
                        >
                          {tx.status === "completed" ? (
                            <><CheckCircle className="h-3 w-3 mr-1" /> Completed</>
                          ) : (
                            <><Clock className="h-3 w-3 mr-1" /> Pending</>
                          )}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="usdt" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Source/Destination</TableHead>
                    <TableHead>TX Hash</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentFloatTransactions.filter(tx => tx.currency === "USDT").map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {tx.type === "deposit" ? (
                            <ArrowDownLeft className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-blue-500" />
                          )}
                          <span className="capitalize">{tx.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">{tx.amount.toLocaleString()} USDT</TableCell>
                      <TableCell className="text-sm">{tx.source || tx.destination}</TableCell>
                      <TableCell className="font-mono text-xs">{tx.txHash || "-"}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={tx.status === "completed" ? "text-green-500" : "text-amber-500"}
                        >
                          {tx.status === "completed" ? "Completed" : "Pending"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="zwg" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Source/Destination</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentFloatTransactions.filter(tx => tx.currency === "ZWG").map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {tx.type === "deposit" ? (
                            <ArrowDownLeft className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-blue-500" />
                          )}
                          <span className="capitalize">{tx.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">ZWG {tx.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-sm">{tx.source || tx.destination}</TableCell>
                      <TableCell className="font-mono text-xs">{tx.reference || "-"}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={tx.status === "completed" ? "text-green-500" : "text-amber-500"}
                        >
                          {tx.status === "completed" ? "Completed" : "Pending"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Float Dialog */}
      <Dialog open={!!addFloatDialog} onOpenChange={() => setAddFloatDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add {addFloatDialog?.toUpperCase()} Float</DialogTitle>
            <DialogDescription>
              Record a float deposit to your trading balance
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input 
                type="number"
                placeholder={`Enter ${addFloatDialog?.toUpperCase()} amount`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>{addFloatDialog === "usdt" ? "Transaction Hash" : "Reference Number"}</Label>
              <Input 
                placeholder={addFloatDialog === "usdt" ? "Enter TX hash" : "Enter reference"}
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddFloatDialog(null)}>Cancel</Button>
            <Button onClick={handleAddFloat}>
              <Plus className="h-4 w-4 mr-2" />
              Add Float
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={!!withdrawDialog} onOpenChange={() => setWithdrawDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw {withdrawDialog?.toUpperCase()}</DialogTitle>
            <DialogDescription>
              Withdraw funds from your trading float
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="font-mono font-bold text-lg">
                {withdrawDialog === "usdt" 
                  ? `${floatData.usdt.available.toLocaleString()} USDT`
                  : `ZWG ${floatData.zwg.available.toLocaleString()}`
                }
              </p>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input 
                type="number"
                placeholder={`Enter ${withdrawDialog?.toUpperCase()} amount`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>{withdrawDialog === "usdt" ? "Destination Wallet" : "Payment Reference"}</Label>
              <Input 
                placeholder={withdrawDialog === "usdt" ? "Enter wallet address" : "Enter reference"}
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setWithdrawDialog(null)}>Cancel</Button>
            <Button onClick={handleWithdraw}>
              <Minus className="h-4 w-4 mr-2" />
              Withdraw
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
