"use client"

import type React from "react"

import Usage from "@/components/usage-overview"
import { useCallback, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import UserActivityChart from "./(user-charts)/user-activity-chart"
import UserEndpointsChart from "./(user-charts)/user-endpoints-chart"
import UserDevicesChart from "./(user-charts)/user-devices-chart"
import { Download, RefreshCw, Search, User } from "lucide-react"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import { RecentRequests } from "@/components/recent-requests"


interface Metric {
  total: number;
  change: number;
}

interface Data {
  userDetails: {
    userId: string;
    createdAt: string;
    email: string;
  }
  average_response_time: Metric;
  requests: Metric;
  errors: Metric;
  active_days: Metric;
}

type TimeRange = "24h" | "7d" | "30d" | "90d";

export default function UserAnalyticsDashboard() {
  const [userCode, setUserCode] = useState("")
  const [searchedUserCode, setSearchedUserCode] = useState("")
  const [timeRange, setTimeRange] = useState<TimeRange>("7d")
  const [error,setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<Data|null>(null)

  const {toast} = useToast()
  // const { data, isLoading, error, refetch } = useUserAnalytics(searchedUserCode, timeRange)

  const fetch = useCallback(async () => {
    setIsLoading(true)
    try {
      const days = timeRange === "24h" ? 1 : timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/requestLog/userDetailsByDays?user_code=${searchedUserCode}&days=${days}`, {withCredentials: true})
      setData(res.data.data)
      console.log(res.data.data)
      setError(null)
    } catch (error) {
      const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
                        ? error.response.data.message
                        : (error as Error).message || "An unknown error occurred"
      setData(null)
      console.log(error)
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant : "destructive"
      })
    } finally{
      setIsLoading(false)
    }
  },[searchedUserCode,timeRange,toast])

  

  useEffect (()=>{
    fetch()
  },[fetch])


  const handleSearch = () => {
    if (userCode.trim()) {
      setSearchedUserCode(userCode.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const exportData = () => {
    if (!data) return

    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `user-analytics-${searchedUserCode}-${timeRange}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Analytics</CardTitle>
          <CardDescription>Enter a user code to view detailed analytics for a specific user</CardDescription>
        </CardHeader>
        {/* Search bar, Range Selector, Export button, Search Button */}
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter user code"
                className="pl-8"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>

            {searchedUserCode && (
              <>
              
              <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange )}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24 Hours</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last 90 Days</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon" onClick={() => fetch()}>
                  <RefreshCw className="h-4 w-4" />
                  <span className="sr-only">Refresh data</span>
                </Button>

                <Button variant="outline" onClick={exportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {isLoading && searchedUserCode && (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load user analytics. Please try again later.</AlertDescription>
        </Alert>
      )}

      {data && !isLoading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-3">
              {/* User Profile Details */}
              <CardHeader className="pb-2">
                <CardDescription>User Profile</CardDescription>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{"temp name"}</CardTitle>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <div className="bg-muted px-3 py-1 rounded-full text-sm">ID: {data.userDetails.userId}</div>
                    <div className="bg-muted px-3 py-1 rounded-full text-sm">Email: {"temp@gmail.com"}</div>
                    <div className="bg-muted px-3 py-1 rounded-full text-sm">
                      Joined: {new Date(data.userDetails.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardHeader>
              {/* User API Usage Overview */}
              <CardContent>
                <Usage timeRange={null} dataTemp={data}/>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="activity">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
            </TabsList>

            {/* User Activity Chart */}
            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>API requests and response times over the selected time period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <UserActivityChart timeRange={timeRange} searchedUserCode={searchedUserCode} />
                  </div>
                </CardContent>
                {/* <CardFooter className="text-sm text-muted-foreground">
                  {data.anomalyDetection.hasAnomaly ? (
                    <Alert className="w-full">
                      <AlertTitle>Anomaly Detected</AlertTitle>
                      <AlertDescription>{data.anomalyDetection.message}</AlertDescription>
                    </Alert>
                  ) : (
                    "No unusual activity patterns detected in this time period."
                  )}
                </CardFooter> */}
              </Card>
            </TabsContent>

            {/* {Api Endpoint Usage-------------------------------------} */}
            <TabsContent value="endpoints" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Endpoint Usage</CardTitle>
                  <CardDescription>Most frequently accessed API endpoints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <UserEndpointsChart timeRange={timeRange} searchedUserCode={searchedUserCode} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Device and browser pie chart */}
            <TabsContent value="devices" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Devices & Browsers</CardTitle>
                  <CardDescription>Distribution of devices and browsers used</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Devices</h3>
                      <div className="h-[300px]">
                        <UserDevicesChart timeRange={timeRange} searchedUserCode={searchedUserCode} type="device" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Browsers</h3>
                      <div className="h-[300px]">
                        <UserDevicesChart timeRange={timeRange} searchedUserCode={searchedUserCode} type="browser" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>

                  
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
          <RecentRequests type="user" user_code={searchedUserCode}/>
        </CardContent>
      </Card>
        </>
      )}

      {!searchedUserCode && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <User className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No User Selected</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Enter a user code above to view detailed analytics for a specific user. You&#39;ll be able to see their
                activity, endpoint usage, devices, and sessions.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

