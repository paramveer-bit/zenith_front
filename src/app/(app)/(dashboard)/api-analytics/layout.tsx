import type React from "react"
import type { Metadata } from "next"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export const metadata: Metadata = {
  title: "API Analytics Dashboard",
  description: "Monitor and analyze your API usage statistics",
}

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">API Analytics Dashboard</h1>

      <div className="mb-8">
        <Tabs defaultValue="api" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="api" asChild>
              <Link href="/api-analytics">API Overview</Link>
            </TabsTrigger>
            <TabsTrigger value="user" asChild>
              <Link href="/api-analytics/user">User Analytics</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {children}
    </div>
  )
}

