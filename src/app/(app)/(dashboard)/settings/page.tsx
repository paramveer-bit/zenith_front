"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy } from "lucide-react"
import axios from "axios"
import LogRention from "@/components/LogRetentionSelector"

export default function SettingsPage() {
  const { toast } = useToast()
  const [apiKey, setApiKey] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copied, setCopied] = useState(false)

  // This would typically come from your authentication system

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!oldPassword || !newPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/resetpassword`, { oldPassword, newPassword }, { withCredentials: true })

      toast({
        title: "Success",
        description: "Your password has been updated",
      })

      setOldPassword("")
      setNewPassword("")
    } catch (error) {
        console.error("Error fetching API usage data:", error)
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    toast({
      title: "Copied",
      description: "API key copied to clipboard",
    })

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

    // Simulate fetching API key from server
    useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getApiKey`, { withCredentials: true })
        setApiKey(res.data.data.secret)
      } catch (error) {
        console.error("Error fetching API key:", error)
        toast({
          title: "Error",
          description: "Failed to fetch API key",
          variant: "destructive",
        })
      }
    }
    fetchApiKey()
    }, [toast])


  return (
    <div className="container mx-auto py-10 px-2">
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="old-password">Current Password</Label>
                <Input
                  id="old-password"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter your current password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Key</CardTitle>
            <CardDescription>Your API key for accessing our services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Input readOnly value={apiKey} type="text" className="pr-10 font-mono text-sm" />
              </div>
              <Button variant="outline" size="icon" onClick={copyApiKey} className="flex-shrink-0">
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy API key</span>
              </Button>
            </div>
            {copied && <p className="mt-2 text-sm text-green-600">Copied to clipboard</p>}
          </CardContent>
        </Card>
        <LogRention />
      </div>
    </div>
  )
}
