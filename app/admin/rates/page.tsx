"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowUpDown, Clock, Edit, RefreshCw, Save, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"

// Mock rate history
const rateHistory = [
  { id: 1, buyRate: 25.5, sellRate: 24.5, margin: 4.08, updatedAt: "2024-01-15T10:30:00Z", updatedBy: "Admin" },
  { id: 2, buyRate: 25.3, sellRate: 24.3, margin: 4.12, updatedAt: "2024-01-14T14:15:00Z", updatedBy: "Admin" },
  { id: 3, buyRate: 25.0, sellRate: 24.0, margin: 4.17, updatedAt: "2024-01-13T09:00:00Z", updatedBy: "Admin" },
  { id: 4, buyRate: 24.8, sellRate: 23.8, margin: 4.20, updatedAt: "2024-01-12T16:45:00Z", updatedBy: "Admin" },
  { id: 5, buyRate: 24.5, sellRate: 23.5, margin: 4.26, updatedAt: "2024-01-11T11:30:00Z", updatedBy: "Admin" },
]

export default function AdminRatesPage() {
  const [buyRate, setBuyRate] = useState("25.50")
  const [sellRate, setSellRate] = useState("24.50")
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const currentBuyRate = 25.5
  const currentSellRate = 24.5
  const margin = ((currentBuyRate - currentSellRate) / currentSellRate * 100).toFixed(2)

  const pendingBuyRate = parseFloat(buyRate)
  const pendingSellRate = parseFloat(sellRate)
  const pendingMargin = ((pendingBuyRate - pendingSellRate) / pendingSellRate * 100).toFixed(2)

  const buyRateChange = pendingBuyRate - currentBuyRate
  const sellRateChange = pendingSellRate - currentSellRate

  return (
    <div className="space-y-6">
      {/* Current Rates Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Buy Rate</CardDescription>
            <CardTitle className="text-3xl text-green-500">
              ZWG {currentBuyRate.toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Per 1 USDT (customer pays)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Sell Rate</CardDescription>
            <CardTitle className="text-3xl text-blue-500">
              ZWG {currentSellRate.toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Per 1 USDT (customer receives)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Spread / Margin</CardDescription>
            <CardTitle className="text-3xl">{margin}%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">ZWG 1.00 per USDT</p>
          </CardContent>
        </Card>
      </div>

      {/* Rate Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Rate Management</CardTitle>
              <CardDescription>Update exchange rates for buy and sell transactions</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="auto-refresh"
                  checked={autoRefresh}
                  onCheckedChange={setAutoRefresh}
                />
                <Label htmlFor="auto-refresh" className="text-sm">
                  Auto-sync with market
                </Label>
              </div>
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />
                Last updated: 2 mins ago
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Buy Rate */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Buy Rate (ZWG per USDT)</Label>
                {buyRateChange !== 0 && isEditing && (
                  <Badge variant={buyRateChange > 0 ? "default" : "secondary"} className="gap-1">
                    {buyRateChange > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {buyRateChange > 0 ? "+" : ""}{buyRateChange.toFixed(2)}
                  </Badge>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">ZWG</span>
                <Input
                  type="number"
                  step="0.01"
                  value={buyRate}
                  onChange={(e) => {
                    setBuyRate(e.target.value)
                    setIsEditing(true)
                  }}
                  className="pl-14 text-lg font-mono"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                This is the rate customers pay when buying USDT
              </p>
            </div>

            {/* Sell Rate */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Sell Rate (ZWG per USDT)</Label>
                {sellRateChange !== 0 && isEditing && (
                  <Badge variant={sellRateChange > 0 ? "default" : "secondary"} className="gap-1">
                    {sellRateChange > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {sellRateChange > 0 ? "+" : ""}{sellRateChange.toFixed(2)}
                  </Badge>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">ZWG</span>
                <Input
                  type="number"
                  step="0.01"
                  value={sellRate}
                  onChange={(e) => {
                    setSellRate(e.target.value)
                    setIsEditing(true)
                  }}
                  className="pl-14 text-lg font-mono"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                This is the rate customers receive when selling USDT
              </p>
            </div>
          </div>

          {/* Margin Preview */}
          {isEditing && (
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
              <div className="flex items-center gap-2 text-amber-500 mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Preview Changes</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-3 text-sm">
                <div>
                  <p className="text-muted-foreground">New Buy Rate</p>
                  <p className="font-mono font-medium">ZWG {pendingBuyRate.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">New Sell Rate</p>
                  <p className="font-mono font-medium">ZWG {pendingSellRate.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">New Margin</p>
                  <p className="font-mono font-medium">{pendingMargin}%</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
              <DialogTrigger asChild>
                <Button disabled={!isEditing} className="gap-2">
                  <Save className="h-4 w-4" />
                  Update Rates
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Rate Update</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to update the exchange rates? This will affect all new transactions immediately.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3">
                      <p className="text-sm text-muted-foreground mb-1">Buy Rate</p>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground line-through">ZWG {currentBuyRate.toFixed(2)}</span>
                        <ArrowUpDown className="h-4 w-4" />
                        <span className="font-medium text-green-500">ZWG {pendingBuyRate.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-sm text-muted-foreground mb-1">Sell Rate</p>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground line-through">ZWG {currentSellRate.toFixed(2)}</span>
                        <ArrowUpDown className="h-4 w-4" />
                        <span className="font-medium text-blue-500">ZWG {pendingSellRate.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowConfirm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    setShowConfirm(false)
                    setIsEditing(false)
                  }}>
                    Confirm Update
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              onClick={() => {
                setBuyRate(currentBuyRate.toString())
                setSellRate(currentSellRate.toString())
                setIsEditing(false)
              }}
              disabled={!isEditing}
            >
              Reset
            </Button>
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Sync Market Rate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rate History */}
      <Card>
        <CardHeader>
          <CardTitle>Rate History</CardTitle>
          <CardDescription>Previous rate changes and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead className="text-right">Buy Rate</TableHead>
                <TableHead className="text-right">Sell Rate</TableHead>
                <TableHead className="text-right">Margin</TableHead>
                <TableHead>Updated By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rateHistory.map((rate, index) => (
                <TableRow key={rate.id}>
                  <TableCell>
                    {new Date(rate.updatedAt).toLocaleString()}
                    {index === 0 && (
                      <Badge variant="outline" className="ml-2">Current</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ZWG {rate.buyRate.toFixed(2)}
                    {index > 0 && rate.buyRate !== rateHistory[index - 1].buyRate && (
                      <span className={rate.buyRate > rateHistory[index - 1].buyRate ? "text-green-500 ml-2" : "text-red-500 ml-2"}>
                        {rate.buyRate > rateHistory[index - 1].buyRate ? "↑" : "↓"}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ZWG {rate.sellRate.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {rate.margin.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-muted-foreground">{rate.updatedBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
