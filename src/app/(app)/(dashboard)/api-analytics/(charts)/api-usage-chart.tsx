"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState } from "react"
import axios from "axios"

interface ApiUsageData {
  timestamp: string
  requests : number
}





export default function ApiUsageChart({timeRange}:{timeRange: string}) {
  const [data, setData] = useState<ApiUsageData[]>()
  useEffect(()=>{
    const fetching = async () => {
      try {
        const days = timeRange === "24h" ? 1 : timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/requestLog/apiUsageChart?days=${days}`, {withCredentials: true})
        setData(res.data.data)
      } catch (error) {
        console.error("Error fetching API usage data:", error)
      }
    }
    fetching()
  },[timeRange])

  if(data==null){
    return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    )
  }

  return (
    <ChartContainer
      config={{
        requests: {
          label: "Requests",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full"
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) => {
            const date = new Date(value)
            return `${date.getMonth() + 1}/${date.getDate()}`
          }}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="requests"
          stroke="var(--color-requests)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  )
}

