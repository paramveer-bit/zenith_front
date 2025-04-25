"use client"

import { Cell, Pie, PieChart, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState } from "react"
import axios from "axios"

interface DeviceData {
  name: string
  value: number

}

interface UserDevicesChartProps {
  searchedUserCode : string,
  timeRange: string,
  type: "device" | "browser"
}

export default function UserDevicesChart({ timeRange, searchedUserCode, type }: UserDevicesChartProps) {
  const [data,setData] = useState<DeviceData[] | null>(null)
  

  useEffect(() => {
    const deviceDataFetch = async () =>{
      try {
        const days = timeRange === "24h" ? 1 : timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/requestLog/deviceDetails?user_code=${searchedUserCode}&days=${days}`, {withCredentials: true})
        if(type === "device"){
          setData(res.data.data.device)
        }else{
          setData(res.data.data.browser)
        }
      } catch (error) {
        console.log(error)
      }
    }
    deviceDataFetch()
  }
  ,[searchedUserCode,timeRange,type])


  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))",
    "hsl(var(--chart-7))",
    "hsl(var(--chart-8))",
  ]

  if(data==null){
    return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    )
  }
  if(data.length === 0){
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p>No data available</p>
      </div>
    )
  }

  return (
    <ChartContainer
      config={{
        value: {
          label: type === "device" ? "Device Usage" : "Browser Usage",
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
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
      </PieChart>
    </ChartContainer>
  )
}

