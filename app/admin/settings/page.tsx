"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Clock, DollarSign, Wallet, Bell, Shield, Save, Copy, Eye, EyeOff, Plus, Trash2 } from "lucide-react"

export default function AdminSettingsPage() {
  const [showWalletKey, setShowWalletKey] = useState(false)
  const [platformEnabled, setPlatformEnabled] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Platform Status
              </CardTitle>
              <CardDescription>Control platform availability and maintenance mode</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Platform Enabled</Label>
                  <p className="text-sm text-muted-foreground">
                    When disabled, all trading is paused
                  </p>
                </div>
                <Switch
                  checked={platformEnabled}
                  onCheckedChange={setPlatformEnabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Shows maintenance message to users
                  </p>
                </div>
                <Switch
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Operating Hours</CardTitle>
              <CardDescription>Set the platform operating schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Opening Time</Label>
                  <Input type="time" defaultValue="08:00" />
                </div>
                <div className="space-y-2">
                  <Label>Closing Time</Label>
                  <Input type="time" defaultValue="20:00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select defaultValue="CAT">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CAT">Central Africa Time (CAT)</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Off-hours Message</Label>
                <Textarea
                  defaultValue="We're currently closed. Trading hours: 8:00 AM - 8:00 PM (CAT). Orders placed now will be processed when we reopen."
                  rows={3}
                />
              </div>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Schedule
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trading Settings */}
        <TabsContent value="trading" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Trading Limits
              </CardTitle>
              <CardDescription>Configure minimum and maximum transaction amounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Buy Orders</h4>
                  <div className="space-y-2">
                    <Label>Minimum (USDT)</Label>
                    <Input type="number" defaultValue="10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Maximum (USDT)</Label>
                    <Input type="number" defaultValue="10000" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Sell Orders</h4>
                  <div className="space-y-2">
                    <Label>Minimum (USDT)</Label>
                    <Input type="number" defaultValue="10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Maximum (USDT)</Label>
                    <Input type="number" defaultValue="10000" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure accepted payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  { name: "EcoCash", enabled: true, number: "*227" },
                  { name: "InnBucks", enabled: true, number: "*211" },
                  { name: "OneMoney", enabled: true, number: "*111" },
                  { name: "Omari", enabled: false, number: "*268" },
                  { name: "Card", enabled: false, number: "Visa / Mastercard" },
                  { name: "Other", enabled: false, number: "Manual arrangement" },
                ].map((method) => (
                  <div key={method.name} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked={method.enabled} />
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-muted-foreground">{method.number}</p>
                      </div>
                    </div>
                    <Badge variant={method.enabled ? "default" : "secondary"}>
                      {method.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Timeouts</CardTitle>
              <CardDescription>Set expiration times for pending orders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Payment Timeout (minutes)</Label>
                  <Input type="number" defaultValue="30" />
                  <p className="text-xs text-muted-foreground">
                    Time allowed for customer to make ZWG payment
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Crypto Timeout (minutes)</Label>
                  <Input type="number" defaultValue="60" />
                  <p className="text-xs text-muted-foreground">
                    Time allowed for customer to send USDT
                  </p>
                </div>
              </div>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wallet Settings */}
        <TabsContent value="wallet" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Platform Wallet
              </CardTitle>
              <CardDescription>USDT receiving wallet for sell orders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>TRC-20 Wallet Address</Label>
                <div className="flex gap-2">
                  <Input
                    defaultValue="TXkF3p9jR7hN2qM5sL8wK4vP6mNQzYx123"
                    className="font-mono"
                    readOnly
                  />
                  <Button variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Private Key (Encrypted)</Label>
                <div className="flex gap-2">
                  <Input
                    type={showWalletKey ? "text" : "password"}
                    defaultValue="••••••••••••••••••••••••••••••••"
                    className="font-mono"
                    readOnly
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowWalletKey(!showWalletKey)}
                  >
                    {showWalletKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Never share this key. It is stored encrypted.
                </p>
              </div>
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                <p className="text-sm text-amber-500">
                  Warning: Changing the wallet address will affect all pending sell orders.
                  Ensure all orders are completed before making changes.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Accounts</CardTitle>
              <CardDescription>ZWG payment accounts for receiving customer payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { method: "EcoCash", name: "ZimExchange", number: "0778123456" },
                { method: "InnBucks", name: "ZimExchange Trading", number: "0712345678" },
                { method: "OneMoney", name: "ZimExchange", number: "0713456789" },
                { method: "Omari", name: "ZimExchange", number: "0714567890" },
              ].map((account, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <Badge variant="outline">{account.method}</Badge>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-muted-foreground font-mono">{account.number}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Admin Notifications
              </CardTitle>
              <CardDescription>Configure how you receive alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "New Order Alerts", description: "Get notified when a new order is placed", enabled: true },
                { label: "Payment Verification Required", description: "Alert when payment proof is uploaded", enabled: true },
                { label: "Crypto Received", description: "Notify when USDT is received for sell orders", enabled: true },
                { label: "Order Disputes", description: "Immediate alert for disputed orders", enabled: true },
                { label: "Daily Summary", description: "End of day trading summary", enabled: false },
              ].map((notification) => (
                <div key={notification.label} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <p className="font-medium">{notification.label}</p>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                  <Switch defaultChecked={notification.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>Where to send notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>WhatsApp Number</Label>
                <Input defaultValue="+263 77 123 4567" />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input defaultValue="admin@zimexchange.co.zw" />
              </div>
              <div className="space-y-2">
                <Label>Telegram Chat ID</Label>
                <Input placeholder="Enter Telegram chat ID for bot notifications" />
              </div>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Admin Security
              </CardTitle>
              <CardDescription>Manage admin access and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Change Password</h4>
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input type="password" />
                </div>
                <Button>Update Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="font-medium">Authenticator App</p>
                  <p className="text-sm text-muted-foreground">
                    Use Google Authenticator or similar app
                  </p>
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500/20">
                  Enabled
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="font-medium">SMS Verification</p>
                  <p className="text-sm text-muted-foreground">
                    Receive codes via SMS
                  </p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Management</CardTitle>
              <CardDescription>View and manage active sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Current Session</p>
                    <p className="text-sm text-muted-foreground">
                      Chrome on Windows - Harare, Zimbabwe
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Started: Today at 10:30 AM
                    </p>
                  </div>
                  <Badge>Active</Badge>
                </div>
              </div>
              <Button variant="destructive" className="w-full">
                Log Out All Other Sessions
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
