"use client"

import { Cell, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState } from "react"
import axios from "axios"

interface StatusCodeData {
  statusCode: string
  count: number
}


export default function StatusCodesChart({timeRange}:{timeRange: string}) {
  const [data,setData] = useState<StatusCodeData[]>()
  useEffect(()=>{
    const fetching = async () => {
      try {
        const days = timeRange === "24h" ? 1 : timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/requestLog/status-codes?days=${days}`, {withCredentials: true})
        setData(res.data.data)
      } catch (error) {
        
        console.error("Error fetching status codes:", error)
      }
    }
    fetching()
  },[timeRange])

  const COLORS = {
    "2xx": "hsl(var(--success))",
    "3xx": "hsl(var(--warning))",
    "4xx": "hsl(var(--destructive))",
    "5xx": "hsl(var(--destructive) / 0.8)",
  }

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
        count: {
          label: "Count",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full"
    >
      <PieChart
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          innerRadius={60}
          fill="#8884d8"
          dataKey="count"
          nameKey="statusCode"
          label={({ statusCode, percent }) => `${statusCode}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.statusCode as keyof typeof COLORS] || "#8884d8"} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ChartContainer>
  )
}

