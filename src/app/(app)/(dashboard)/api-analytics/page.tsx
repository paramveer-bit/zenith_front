import type { Metadata } from "next"
import AnalyticsDashboard from "./analytics-dashboard"

export const metadata: Metadata = {
  title: "API Analytics Dashboard",
  description: "Monitor and analyze your API usage statistics",
}

export default function AnalyticsPage() {
  return <AnalyticsDashboard />
}

