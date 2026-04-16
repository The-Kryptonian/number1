"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Eye, Ban, CheckCircle, User, Phone, Mail, Clock, ArrowUpRight, ArrowDownLeft } from "lucide-react"

// Mock customer data
const mockCustomers = [
  {
    id: "USR-001",
    name: "John Doe",
    phone: "+263 77 123 4567",
    email: "john@example.com",
    status: "active",
    totalOrders: 15,
    totalVolume: 5250,
    lastActive: "2024-01-15T10:30:00Z",
    createdAt: "2023-06-15T08:00:00Z",
    savedWallets: ["TXkF3p9jR...7mNQ", "TYh8K2mW...9pLR"],
    recentOrders: [
      { id: "ORD-001", type: "buy", amount: 100, status: "completed", date: "2024-01-15" },
      { id: "ORD-002", type: "sell", amount: 200, status: "completed", date: "2024-01-10" },
    ],
  },
  {
    id: "USR-002",
    name: "Jane Smith",
    phone: "+263 71 987 6543",
    email: "jane@example.com",
    status: "active",
    totalOrders: 8,
    totalVolume: 3200,
    lastActive: "2024-01-14T16:45:00Z",
    createdAt: "2023-09-20T12:00:00Z",
    savedWallets: ["TZp9M3nK...4qWS"],
    recentOrders: [
      { id: "ORD-005", type: "buy", amount: 500, status: "pending", date: "2024-01-14" },
    ],
  },
  {
    id: "USR-003",
    name: "Mike Johnson",
    phone: "+263 78 456 7890",
    email: "mike@example.com",
    status: "suspended",
    totalOrders: 3,
    totalVolume: 450,
    lastActive: "2024-01-10T09:15:00Z",
    createdAt: "2023-12-01T10:00:00Z",
    savedWallets: [],
    recentOrders: [],
  },
  {
    id: "USR-004",
    name: "Sarah Wilson",
    phone: "+263 77 111 2222",
    email: "sarah@example.com",
    status: "active",
    totalOrders: 22,
    totalVolume: 12500,
    lastActive: "2024-01-15T11:00:00Z",
    createdAt: "2023-03-10T14:30:00Z",
    savedWallets: ["TAb7L5pQ...8rKM", "TCx2N4mR...5sJP"],
    recentOrders: [
      { id: "ORD-010", type: "sell", amount: 1000, status: "completed", date: "2024-01-15" },
      { id: "ORD-011", type: "buy", amount: 750, status: "completed", date: "2024-01-12" },
    ],
  },
]

export default function AdminCustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Customers</CardDescription>
            <CardTitle className="text-3xl">{mockCustomers.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Customers</CardDescription>
            <CardTitle className="text-3xl text-green-500">
              {mockCustomers.filter((c) => c.status === "active").length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Volume (USDT)</CardDescription>
            <CardTitle className="text-3xl">
              {mockCustomers.reduce((sum, c) => sum + c.totalVolume, 0).toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Orders/Customer</CardDescription>
            <CardTitle className="text-3xl">
              {(mockCustomers.reduce((sum, c) => sum + c.totalOrders, 0) / mockCustomers.length).toFixed(1)}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>
          <CardDescription>View and manage platform customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">Volume (USDT)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground font-mono">{customer.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">{customer.totalOrders}</TableCell>
                  <TableCell className="text-right font-mono">
                    {customer.totalVolume.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={customer.status === "active" ? "default" : "destructive"}
                      className={customer.status === "active" ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}
                    >
                      {customer.status === "active" ? (
                        <CheckCircle className="mr-1 h-3 w-3" />
                      ) : (
                        <Ban className="mr-1 h-3 w-3" />
                      )}
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(customer.lastActive).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCustomer(customer)}
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

      {/* Customer Details Dialog */}
      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedCustomer?.name}
              <Badge
                variant={selectedCustomer?.status === "active" ? "default" : "destructive"}
                className={selectedCustomer?.status === "active" ? "bg-green-500/10 text-green-500" : ""}
              >
                {selectedCustomer?.status}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Customer ID: {selectedCustomer?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="wallets">Wallets</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-medium">{selectedCustomer.phone}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p className="font-medium">{selectedCustomer.email}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="text-2xl font-bold">{selectedCustomer.totalOrders}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Total Volume</p>
                    <p className="text-2xl font-bold">{selectedCustomer.totalVolume.toLocaleString()} USDT</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">{new Date(selectedCustomer.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Last Active</p>
                    <p className="font-medium">{new Date(selectedCustomer.lastActive).toLocaleString()}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="space-y-4">
                {selectedCustomer.recentOrders.length > 0 ? (
                  <div className="space-y-2">
                    {selectedCustomer.recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <div className={`rounded-full p-2 ${order.type === "buy" ? "bg-green-500/10" : "bg-blue-500/10"}`}>
                            {order.type === "buy" ? (
                              <ArrowDownLeft className="h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.type.toUpperCase()} - {order.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-medium">{order.amount} USDT</p>
                          <Badge variant="outline" className={order.status === "completed" ? "text-green-500" : "text-amber-500"}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No recent orders</p>
                )}
              </TabsContent>

              <TabsContent value="wallets" className="space-y-4">
                {selectedCustomer.savedWallets.length > 0 ? (
                  <div className="space-y-2">
                    {selectedCustomer.savedWallets.map((wallet, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                        <code className="text-sm">{wallet}</code>
                        <Badge variant="outline">TRC-20</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No saved wallets</p>
                )}
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter className="flex gap-2">
            {selectedCustomer?.status === "active" ? (
              <Button variant="destructive" className="gap-2">
                <Ban className="h-4 w-4" />
                Suspend Customer
              </Button>
            ) : (
              <Button className="gap-2 bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4" />
                Reactivate Customer
              </Button>
            )}
            <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
