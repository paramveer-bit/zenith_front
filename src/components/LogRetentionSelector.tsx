import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { toast } from '@/hooks/use-toast'
import axios from 'axios'




function Page() {
    const [logRetentionDays, setLogRetentionDays] = useState("30")
    const [isUpdatingRetention, setIsUpdatingRetention] = useState(false)
  

    const handleLogRetentionChange = async () => {
        setIsUpdatingRetention(true)
    
        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/user/updateLogRetention`,
            { logRetentionDays: Number.parseInt(logRetentionDays) },
            { withCredentials: true },
          )
    
          toast({
            title: "Success",
            description: "Log retention settings updated successfully",
          })
        } catch (error) {
          console.error("Error updating log retention settings:", error)
          toast({
            title: "Error",
            description: "Failed to update log retention settings",
            variant: "destructive",
          })
        } finally {
          setIsUpdatingRetention(false)
        }
      }

    useEffect(()=>{
        const fetch = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/logRetention`, { withCredentials: true })
                // console.log(response)
                setLogRetentionDays(response.data.data.logRetentionDays.toString())
            } catch (error) {
                console.error("Error fetching log retention settings:", error)
                toast({
                    title: "Error",
                    description: "Failed to fetch log retention settings",
                    variant: "destructive",
                })
            }
        }
        fetch()
    },[])

  return (
    <Card>
          <CardHeader>
            <CardTitle>Log Retention Settings</CardTitle>
            <CardDescription>Configure how long request log data is retained</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="log-retention">Number of days to retain request log data</Label>
                <Select value={logRetentionDays} onValueChange={setLogRetentionDays}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">365 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleLogRetentionChange} disabled={isUpdatingRetention}>
                {isUpdatingRetention ? "Updating..." : "Save Settings"}
              </Button>
            </div>
          </CardContent>
        </Card>
  )
}

export default Page