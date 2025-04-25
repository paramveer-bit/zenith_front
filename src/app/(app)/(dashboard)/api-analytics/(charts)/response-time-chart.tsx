"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState } from "react"
import axios from "axios"

interface ResponseTimeData {
  endpoint: string
  responseTime: number
}


export default function ResponseTimeChart({timeRange}:{timeRange: string}) {
  const [data,setData] = useState<ResponseTimeData[]>()
  useEffect(()=>{
    const fetching = async () => {
      try {
        const days = timeRange === "24h" ? 1 : timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/requestLog/end-point-response-time?days=${days}`, {withCredentials: true})
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
        responseTime: {
          label: "Response Time (ms)",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full"
    >
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{
          top: 20,
          right: 20,
          left: 100,
          bottom: 20,
        }}
      >
        <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
        <XAxis type="number" tickLine={false} axisLine={false} />
        <YAxis dataKey="endpoint" type="category" tickLine={false} axisLine={false} width={80} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="responseTime" fill="var(--color-responseTime)" radius={[0, 4, 4, 0]} barSize={20} />
      </BarChart>
    </ChartContainer>
  )
}

