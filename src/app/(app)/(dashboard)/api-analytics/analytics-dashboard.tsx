"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ApiUsageChart from "./(charts)/api-usage-chart"
import EndpointBreakdown from "./(charts)/endpoint-breakdown"
import ResponseTimeChart from "./(charts)/response-time-chart"
import StatusCodesChart from "./(charts)/status-codes-chart"
import RouteAnalysisChart from "./(charts)/route-analysis-chart"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import axios from "axios"
import Overview from "@/components/usage-overview"
import { RecentRequests } from "@/components/recent-requests"

interface Route{
  id: string
  requestUrl: string
  forwardUrl: string
  caching: boolean
  cacheTime: number
  rateLimiting: boolean
  defaultRate: number
  bannedUser: string[]
  createdAt: string
  updatedAt: string
}
export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<string>("7d")
  const [selectedRoute, setSelectedRoute] = useState<string>("/api/users")
  
  const [routes,setRoutes] = useState<Route[]>([])
  useEffect(()=>{
    const fetching = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/request/getall`, {withCredentials: true})
        console.log(res.data.data)
        setRoutes(res.data.data)
        setSelectedRoute(res.data.data[0].id)
      } catch (error) {
        console.log(error)
      }
    }
    fetching()
  }
  ,[timeRange])

  const refetch =  ()=>{
    const temp = timeRange;
    setTimeRange("24h")
    setTimeRange(temp)
  }




  

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-semibold">API Usage Overview</h2>
        {/* ------------------------------ Time Range Selector and Refresh Butoon --------------------------------------- */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Select value={timeRange} onValueChange={(value) => setTimeRange(value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh data</span>
          </Button>
        </div>
      </div>

      <Overview timeRange={timeRange} dataTemp={null}/>
      {/* Route-specific analysis section */}
      <Card>
        
        {/* Route Selector */}
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Route-Specific Analysis</CardTitle>
              <CardDescription>Detailed metrics for a specific API route</CardDescription>
            </div>
            <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                  <SelectTrigger className="w-full md:w-[250px]">
                    <SelectValue placeholder="Select API route" />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map((route) => (
                      <SelectItem key={route.id} value={route.id}>
                        {route.requestUrl}
                      </SelectItem>
                    ))}
                  </SelectContent>
            </Select>
          </div>
        </CardHeader>

        {routes.length === 0 ?
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-muted-foreground">No routes available for analysis</p>
          </div>
            :
          // Route Specific Analysis
          <CardContent>
            <div className="h-[400px]">
              <RouteAnalysisChart timeRange={timeRange} id={selectedRoute}/>
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-muted/40 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Avg. Response Time</h3>
                <p className="text-2xl font-semibold">{data?.routeMetrics.avgResponseTime} ms</p>
              </div>
              <div className="bg-muted/40 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Success Rate</h3>
                <p className="text-2xl font-semibold">{data?.routeMetrics.successRate}%</p>
              </div>
              <div className="bg-muted/40 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Cache Hit Rate</h3>
                <p className="text-2xl font-semibold">{data?.routeMetrics.cacheHitRate}%</p>
              </div>
            </div> */}
          </CardContent>
        }
          
        
      </Card>

      <Tabs defaultValue="usage">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="usage">API Usage</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="response-time">Response Time</TabsTrigger>
          <TabsTrigger value="status-codes">Status Codes</TabsTrigger>
        </TabsList>
        
        {/* API Request Usage Overview */}
        <TabsContent value="usage" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Requests Over Time</CardTitle>
              <CardDescription>Number of API requests over the selected time period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ApiUsageChart timeRange={timeRange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* EndPoint BreakDown */}
        <TabsContent value="endpoints" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Endpoint Breakdown</CardTitle>
              <CardDescription>Distribution of requests across different API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <EndpointBreakdown timeRange={timeRange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Response Time */}
        <TabsContent value="response-time" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Response Time</CardTitle>
              <CardDescription>Average response time by endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponseTimeChart timeRange={timeRange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ststus Code Chart */}
        <TabsContent value="status-codes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Status Codes</CardTitle>
              <CardDescription>Distribution of HTTP status codes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <StatusCodesChart timeRange={timeRange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        
      </Tabs>

      {/* Real-time monitoring section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Real-time Monitoring</CardTitle>
              <CardDescription>Live API activity in the last 5 minutes</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-muted-foreground">Live</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <RecentRequests type="all" user_code={null} />
        </CardContent>
      </Card>
    </div>
  )
}

