"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState } from "react"
import axios from "axios"

interface ActivityData {
  timestamp: string
  requests: number
  responseTime: number
  errors: number
}

interface UserActivityChartProps {
  searchedUserCode : string,
  timeRange: string
}

export default function UserActivityChart({ timeRange, searchedUserCode, }: UserActivityChartProps) {
  const [data,setData] = useState<ActivityData[] | null>(null)
  

  useEffect(() => {
    const deviceDataFetch = async () =>{
      try {
        const days = timeRange === "24h" ? 1 : timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/requestLog/userActivityData?user_code=${searchedUserCode}&days=${days}`, {withCredentials: true})
        setData(res.data.data)
      } catch (error) {
        console.log(error)
        console.error("Error fetching user activity data:", error)
      }
    }
    deviceDataFetch()
  }
  ,[searchedUserCode,timeRange])

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
        responseTime: {
          label: "Response Time (ms)",
          color: "hsl(var(--chart-2))",
        },
        errors: {
          label: "Errors",
          color: "hsl(var(--chart-3))",
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
            return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
          }}
        />
        <YAxis yAxisId="left" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tickMargin={10} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="requests"
          stroke="var(--color-requests)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="responseTime"
          stroke="var(--color-responseTime)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="errors"
          stroke="var(--color-errors)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  )
}

