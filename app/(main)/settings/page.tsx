"use client"

import { useState } from "react"
import { Bell, Check, CreditCard, Eye, EyeOff, Lock, Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { PaymentMethodPicker, type PaymentMethod } from "@/components/shared/payment-method-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { cn } from "@/lib/utils"
import { toast } from "sonner"

type TabId = "profile" | "payment" | "security" | "notifications"

const tabs = [
  { id: "profile" as const, label: "Profile & Identity", icon: User },
  { id: "payment" as const, label: "Payment Preferences", icon: CreditCard },
  { id: "security" as const, label: "Security", icon: Lock },
  { id: "notifications" as const, label: "Notifications", icon: Bell },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile")

  return (
    <div className="min-h-screen bg-[#F0F4FA] pb-20 md:pb-8">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-8 xl:px-16 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl lg:text-2xl font-semibold text-[#0D1F3C]">Account Settings</h1>
          <p className="text-sm text-[#4B5563]">Manage your profile and preferences</p>
        </div>

        {/* Mobile Tab Chips */}
        <div className="lg:hidden overflow-x-auto mb-6 -mx-4 px-4">
          <div className="flex gap-2 pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                    activeTab === tab.id
                      ? "bg-[#F0A500] text-white"
                      : "bg-white text-[#4B5563] border border-[#E5E7EB]"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-[220px] shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      activeTab === tab.id
                        ? "bg-[#1A3A6B] text-white"
                        : "text-[#4B5563] hover:bg-white"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "payment" && <PaymentTab />}
            {activeTab === "security" && <SecurityTab />}
            {activeTab === "notifications" && <NotificationsTab />}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileTab() {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "0771234567",
    dob: "",
    nationalId: "",
    streetAddress: "",
    suburb: "",
    city: "",
    province: "",
    country: "Zimbabwe",
  })

  const completedFields = Object.values(formData).filter(Boolean).length
  const totalFields = Object.keys(formData).length
  const completionPercent = Math.round((completedFields / totalFields) * 100)

  const handleSave = () => {
    toast.success("Profile saved successfully")
  }

  return (
    <div className="space-y-6">
      {/* Profile Completion Card */}
      <Card className="bg-[#FFF8E7] border-[#F0A500]/30 rounded-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#92400E]">
              Profile {completionPercent}% complete
            </span>
          </div>
          <Progress value={completionPercent} className="h-2 bg-[#F0A500]/20 [&>div]:bg-[#F0A500]" />
          <p className="text-xs text-[#92400E] mt-2">
            Complete your profile to unlock higher order limits up to $500 per order
          </p>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="bg-white rounded-xl border border-[#E5E7EB]">
        <CardHeader>
          <CardTitle className="text-lg text-[#0D1F3C]">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
                Full Legal Name <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="As on your national ID"
                className="mt-1 h-12"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 h-12"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Primary contact number"
                className="mt-1 h-12"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
                Date of Birth
              </Label>
              <Input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="mt-1 h-12"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
              National ID Number
            </Label>
            <Input
              value={formData.nationalId}
              onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
              className="mt-1 h-12"
            />
            <p className="text-xs text-[#6B7280] mt-1">Required for orders above $50</p>
          </div>
        </CardContent>
      </Card>

      {/* Physical Address */}
      <Card className="bg-white rounded-xl border border-[#E5E7EB]">
        <CardHeader>
          <CardTitle className="text-lg text-[#0D1F3C]">Physical Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
              Street Address / House Number <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.streetAddress}
              onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
              className="mt-1 h-12"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
                Suburb / Area <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.suburb}
                onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                className="mt-1 h-12"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
                City / Town <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="mt-1 h-12"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
                Province / Region <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                className="mt-1 h-12"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
                Country <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.country}
                onValueChange={(v) => setFormData({ ...formData, country: v })}
              >
                <SelectTrigger className="mt-1 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Zimbabwe">Zimbabwe</SelectItem>
                  <SelectItem value="South Africa">South Africa</SelectItem>
                  <SelectItem value="Botswana">Botswana</SelectItem>
                  <SelectItem value="Zambia">Zambia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-[#F0A500] text-[#0D1F3C] font-bold hover:bg-[#D97706] h-12 px-8"
        >
          Save Profile
        </Button>
      </div>
    </div>
  )
}

function PaymentMethodPickerSettings({
  value,
  onChange,
}: {
  value: string
  onChange: (v: any) => void
}) {
  return (
    <PaymentMethodPicker
      label="Default Payment Method"
      value={value as PaymentMethod}
      onChange={onChange}
    />
  )
}

function PaymentTab() {
  const [defaultMethod, setDefaultMethod] = useState<"ecocash" | "innbucks" | "onemoney" | "omari" | "card" | "other">("ecocash")
  const [ecocashNumber, setEcocashNumber] = useState("0771234567")
  const [innbucksNumber, setInnbucksNumber] = useState("")
  const [onemoneyNumber, setOnemoneyNumber] = useState("")
  const [omariNumber, setOmariNumber] = useState("")

  const handleSave = () => {
    toast.success("Payment preferences saved")
  }

  return (
    <div className="space-y-6">
      {/* Default Payment Method */}
      <Card className="bg-white rounded-xl border border-[#E5E7EB]">
        <CardHeader>
          <CardTitle className="text-lg text-[#0D1F3C]">Default Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#6B7280] mb-4">
            This pre-selects on all order forms
          </p>
          <PaymentMethodPickerSettings
            value={defaultMethod}
            onChange={setDefaultMethod}
          />
        </CardContent>
      </Card>

      {/* Saved Mobile Numbers */}
      <Card className="bg-white rounded-xl border border-[#E5E7EB]">
        <CardHeader>
          <CardTitle className="text-lg text-[#0D1F3C]">Saved Mobile Numbers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
              EcoCash Number
            </Label>
            <Input value={ecocashNumber} onChange={(e) => setEcocashNumber(e.target.value)} placeholder="077 XXX XXXX" className="mt-1 h-12" />
          </div>
          <div>
            <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
              InnBucks Number
            </Label>
            <Input value={innbucksNumber} onChange={(e) => setInnbucksNumber(e.target.value)} placeholder="077 XXX XXXX" className="mt-1 h-12" />
          </div>
          <div>
            <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
              OneMoney Number
            </Label>
            <Input value={onemoneyNumber} onChange={(e) => setOnemoneyNumber(e.target.value)} placeholder="077 XXX XXXX" className="mt-1 h-12" />
          </div>
          <div>
            <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
              Omari Number
            </Label>
            <Input value={omariNumber} onChange={(e) => setOmariNumber(e.target.value)} placeholder="077 XXX XXXX" className="mt-1 h-12" />
          </div>

          <div className="bg-blue-50 rounded-lg p-3 flex gap-2">
            <Shield className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800">
              Your saved numbers are just defaults for convenience. You can always enter a different number on any order.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-[#F0A500] text-[#0D1F3C] font-bold hover:bg-[#D97706] h-12 px-8"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  )
}

function SecurityTab() {
  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const getPasswordStrength = () => {
    if (!newPassword) return { level: 0, label: "", color: "" }
    let strength = 0
    if (newPassword.length >= 8) strength++
    if (/[0-9]/.test(newPassword)) strength++
    if (/[!@#$%^&*]/.test(newPassword)) strength++

    if (strength <= 1) return { level: 33, label: "Weak", color: "bg-red-500" }
    if (strength === 2) return { level: 66, label: "Fair", color: "bg-amber-500" }
    return { level: 100, label: "Strong", color: "bg-green-500" }
  }

  const passwordStrength = getPasswordStrength()

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    toast.success("Password updated successfully")
  }

  const loginActivity = [
    { date: "Apr 12, 2026 14:32", device: "Chrome / MacOS", location: "Harare, ZW", status: "success" },
    { date: "Apr 11, 2026 09:15", device: "Safari / iOS", location: "Harare, ZW", status: "success" },
    { date: "Apr 10, 2026 18:45", device: "Firefox / Windows", location: "Bulawayo, ZW", status: "failed" },
  ]

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <Card className="bg-white rounded-xl border border-[#E5E7EB]">
        <CardHeader>
          <CardTitle className="text-lg text-[#0D1F3C]">Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
              Current Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative mt-1">
              <Input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#0D1F3C]"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
              New Password <span className="text-red-500">*</span>
            </Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 h-12"
            />
            {newPassword && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <Progress
                    value={passwordStrength.level}
                    className={cn("h-1 flex-1 bg-gray-200", `[&>div]:${passwordStrength.color}`)}
                  />
                  <span className={cn("text-xs font-medium", passwordStrength.color.replace("bg-", "text-"))}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="space-y-1 mt-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Check className={cn("h-3 w-3", newPassword.length >= 8 ? "text-green-500" : "text-gray-300")} />
                    <span className={newPassword.length >= 8 ? "text-green-600" : "text-[#6B7280]"}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Check className={cn("h-3 w-3", /[0-9]/.test(newPassword) ? "text-green-500" : "text-gray-300")} />
                    <span className={/[0-9]/.test(newPassword) ? "text-green-600" : "text-[#6B7280]"}>
                      Contains a number
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Check className={cn("h-3 w-3", /[!@#$%^&*]/.test(newPassword) ? "text-green-500" : "text-gray-300")} />
                    <span className={/[!@#$%^&*]/.test(newPassword) ? "text-green-600" : "text-[#6B7280]"}>
                      Contains a special character
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wide">
              Confirm New Password <span className="text-red-500">*</span>
            </Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 h-12"
            />
          </div>

          <Button
            onClick={handleUpdatePassword}
            className="bg-[#1A3A6B] text-white font-semibold hover:bg-[#0D1F3C] h-12"
          >
            Update Password
          </Button>
        </CardContent>
      </Card>

      {/* Login Activity */}
      <Card className="bg-white rounded-xl border border-[#E5E7EB]">
        <CardHeader>
          <CardTitle className="text-lg text-[#0D1F3C]">Recent Login Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {loginActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-[#F0F4FA] last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-[#0D1F3C]">{activity.device}</p>
                  <p className="text-xs text-[#6B7280]">
                    {activity.date} &bull; {activity.location}
                  </p>
                </div>
                <Badge
                  className={
                    activity.status === "success"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-red-100 text-red-700 border-red-200"
                  }
                >
                  {activity.status === "success" ? "Success" : "Failed"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-white rounded-xl border-2 border-dashed border-red-300">
        <CardHeader>
          <CardTitle className="text-lg text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                Delete my account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all your data and order history. This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                  Yes, Delete My Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}

function NotificationsTab() {
  const [notifications, setNotifications] = useState({
    paymentConfirmed: true,
    usdtSent: true,
    payoutSent: true,
    updates: false,
  })

  const handleSave = () => {
    toast.success("Notification preferences saved")
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white rounded-xl border border-[#E5E7EB]">
        <CardHeader>
          <CardTitle className="text-lg text-[#0D1F3C]">Email Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-[#0D1F3C]">Email me when payment is confirmed</p>
            </div>
            <Switch
              checked={notifications.paymentConfirmed}
              onCheckedChange={(v) => setNotifications({ ...notifications, paymentConfirmed: v })}
              className="data-[state=checked]:bg-[#F0A500]"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-[#0D1F3C]">Email me when USDT has been sent</p>
            </div>
            <Switch
              checked={notifications.usdtSent}
              onCheckedChange={(v) => setNotifications({ ...notifications, usdtSent: v })}
              className="data-[state=checked]:bg-[#F0A500]"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-[#0D1F3C]">Email me when my payout is sent</p>
            </div>
            <Switch
              checked={notifications.payoutSent}
              onCheckedChange={(v) => setNotifications({ ...notifications, payoutSent: v })}
              className="data-[state=checked]:bg-[#F0A500]"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-[#0D1F3C]">Email me about important updates</p>
            </div>
            <Switch
              checked={notifications.updates}
              onCheckedChange={(v) => setNotifications({ ...notifications, updates: v })}
              className="data-[state=checked]:bg-[#F0A500]"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-xl border border-[#E5E7EB]">
        <CardHeader>
          <CardTitle className="text-lg text-[#0D1F3C]">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2 opacity-50">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-[#0D1F3C]">WhatsApp notifications</p>
              <Badge variant="secondary" className="bg-[#F0F4FA] text-[#6B7280]">Soon</Badge>
            </div>
            <Switch disabled />
          </div>

          <div className="flex items-center justify-between py-2 opacity-50">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-[#0D1F3C]">SMS alerts</p>
              <Badge variant="secondary" className="bg-[#F0F4FA] text-[#6B7280]">Soon</Badge>
            </div>
            <Switch disabled />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-[#F0A500] text-[#0D1F3C] font-bold hover:bg-[#D97706] h-12 px-8"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  )
}
