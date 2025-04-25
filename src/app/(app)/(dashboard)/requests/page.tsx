"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RequestsTable } from "@/components/requests-table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {  Filter } from "lucide-react"
import { useEffect, useState } from "react"



export default function RequestsPage() {
  const [value, setValue] = useState<string>("all")

  useEffect(()=>{
    console.log(value)
  },[value])
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Request Logs</h1>
          <div className="flex items-center gap-2">
            <Select defaultValue="all" onValueChange={(newValue)=>setValue(newValue)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="200">200 Success</SelectItem>
                <SelectItem value="400">400 Client Error</SelectItem>
                <SelectItem value="500">500 Server Error</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Requests</CardTitle>
            <CardDescription>Complete list of forwarded requests</CardDescription>
          </CardHeader>
          <CardContent>
            <RequestsTable limit={100} value={value}/>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
