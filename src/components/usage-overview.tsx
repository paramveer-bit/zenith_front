"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import axios from 'axios'

interface Data {

    average_response_time : {
        change: number
        total: number
    },
    errors : {
        change: number
        total: number
    },
    requests : {
        change: number
        total: number
    },
    users?: {
        change: number
        total: number
    },
    
    active_days?:{
        change: number
        total: number
    }
}


function Usage({timeRange,dataTemp}:{timeRange: string|null,dataTemp: Data|null}) {
    const [data, setData] = useState<Data>()
    useEffect(()=>{
        if(dataTemp){
            setData(dataTemp)
        }
        else{
          const fetching = async () => {
            try {
              const days = timeRange === "24h" ? 1 : timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
              const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/requestLog/DataByDays?days=${days}`, {withCredentials: true})
              // res.data.data.user.chnage = 1;
              setData(res.data.data)
              console.log(res.data.data)
            } catch (error) {
              console.error("Error fetching API usage data:", error)
            }
          }
          fetching()
        }
    },[timeRange,dataTemp])

    if(data==null){
        return (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Requests</CardDescription>
              <CardTitle className="text-3xl">{data?.requests.total.toFixed(2).toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-sm flex items-center ${data?.requests.change >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {data?.requests.change >= 0 ? "↑" : "↓"} {Math.abs(data?.requests.change || 0).toFixed(2)}% from previous period
              </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
              <CardDescription>Average Response Time</CardDescription>
              <CardTitle className="text-3xl">{(data?.average_response_time.total.toFixed(2))} ms</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-sm flex items-center ${data?.average_response_time.change <= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {data?.average_response_time.change <= 0 ? "↓" : "↑"} {Math.abs((data?.average_response_time.change) || 0).toFixed(2)}% from previous
                period
              </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
              <CardDescription>Error Rate</CardDescription>
              <CardTitle className="text-3xl">{data?.errors.total.toFixed(2)}%</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-sm flex items-center ${data?.errors.change <= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {data?.errors.change <= 0 ? "↓" : "↑"} {Math.abs(data?.errors.change || 0).toFixed(2)}% from previous period
              </div>
            </CardContent>
        </Card>
        {data.users !== null && data.users?.total !==null && data.users?.change!=null &&
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Users</CardDescription>
              <CardTitle className="text-3xl">{
                data?.users.total.toFixed(2).toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-sm flex items-center ${data?.users.change >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {data?.users.change >= 0 ? "↑" : "↓"} {Math.abs(data?.users.change || 0).toFixed(2)}% from previous period
              </div>
            </CardContent>
          </Card> 
        }
        {(data.active_days !== null && data.active_days?.total !==undefined && data.active_days?.change!==undefined) &&
        
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Sessions</CardDescription>
              <CardTitle className="text-3xl">{
                data?.active_days.total.toFixed(2).toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-sm flex items-center ${data?.active_days.change >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {data?.active_days.change >= 0 ? "↑" : "↓"} {Math.abs(data?.active_days.change || 0).toFixed(2)}% from previous period
              </div>
            </CardContent>
          </Card>
        }
    </div>
  )
}

export default Usage