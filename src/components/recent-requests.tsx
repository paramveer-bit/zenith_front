"use client"

import { useEffect, useState } from "react"
import { Activity, Clock, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from "axios"
import { formatDistanceToNow } from "date-fns"


interface Request {
  comment : string,
  createdAt : string,
  duration : 0,
  forwardUrl : string,
  id : string,
  requestId : string,
  requestUrl : string,
  response : {
    message : string,
    success : boolean,
  }
  statusCode : number,
  type : string,
  updatedAt : string,
  userId : string
}

export function RecentRequests({type,user_code} : {type: string,user_code: string|null}) {
  const [requests,setRequests] = useState<Request[]>([])

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(type=='user'){
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/requestLog/userLast5Min?user_code=${user_code}`,{withCredentials: true})
          setRequests(res.data.data)
          return
        }
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/requestLog/last5Min`,{withCredentials: true})
        setRequests(res.data.data)
      } catch (error) {
        console.error("Error fetching API usage data:", error)

      }
    }
    fetchData()
  },[user_code,type])



  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-500/10 text-blue-500"
      case "POST":
        return "bg-green-500/10 text-green-500"
      case "PUT":
        return "bg-yellow-500/10 text-yellow-500"
      case "DELETE":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <ScrollArea className="h-[350px]">
      <div className="space-y-2">
        {requests.map((request) => (
          <div key={request.id} className="group relative rounded-lg border p-4 hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMethodColor(request.type)}`}>
                  {request.type}
                </span>
                <span className="font-mono text-sm">{request.requestUrl}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-3 w-3" />
                <span>{request.userId}</span>
                <span>•</span>
                <Clock className="h-3 w-3" />
                <span>{formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
            <Badge variant={request.statusCode < 400 ? "default" : "destructive"}>{request.statusCode}</Badge>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            <p>{request.response.message}</p>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Activity className="h-3 w-3" />
            <span>{request.duration}ms</span>
          </div>
        </div>
        ))}
      </div>
    </ScrollArea>
  )
}

