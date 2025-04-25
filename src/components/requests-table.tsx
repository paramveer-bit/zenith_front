"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MoreHorizontal } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import axios from "axios"

interface SendMessageLog {
    id: string;
    requestId: string;
    requestUrl: string;
    forwardUrl: string;
    response: string ;
    statusCode: number;
    type: "POST" | "GET" | "PUT" | "DELETE" | string; // You can restrict or broaden this
    comment: string;
    duration: number;
    userId: string;
    browser: string | null;
    os: string | null;
    ip: string;
    createdAt: string; // You can use `Date` if this will be parsed into a Date object
    updatedAt: string;
  }


// Sample data based on the provided JSON
// const requestsData = [
//   {
//     id: "cm9rdngnz0001umd40enwtmxx",
//     requestId: "cm806h9280004umfotb6nun9a",
//     requestUrl: "/sendhere/api/send-message",
//     forwardUrl: "https://silent-whispers.vercel.app/api/send-message",
//     response: "NIL",
//     statusCode: 500,
//     type: "POST",
//     comment: "Error in forwarding request to the server",
//     duration: 0,
//     userId: "12345678",
//     browser: null,
//     os: null,
//     ip: "::1",
//     createdAt: "2025-04-21T17:56:07.580Z",
//     updatedAt: "2025-04-21T17:56:07.580Z",
//   },
//   {
//     id: "cm9rdnyew0003umd4b5p94gnb",
//     requestId: "cm806h9280004umfotb6nun9a",
//     requestUrl: "/sendhere/api/send-message",
//     forwardUrl: "https://silent-whispers.vercel.app/api/send-message",
//     response: "NIL",
//     statusCode: 500,
//     type: "POST",
//     comment: "Error in forwarding request to the server",
//     duration: 0,
//     userId: "12345678",
//     browser: null,
//     os: null,
//     ip: "::1",
//     createdAt: "2025-04-21T17:56:30.585Z",
//     updatedAt: "2025-04-21T17:56:30.585Z",
//   },
//   {
//     id: "cm9rdrzhh0005umd4crjt5mk4",
//     requestId: "cm806h9280004umfotb6nun9a",
//     requestUrl: "/sendhere/api/send-message",
//     forwardUrl: "https://silent-whispers.vercel.app/api/send-message",
//     response: {
//       message: "Message send successfully",
//       success: true,
//     },
//     statusCode: 200,
//     type: "POST",
//     comment: "Request forwarded to the server. And response is saved in the database",
//     duration: 0,
//     userId: "12345678",
//     browser: null,
//     os: null,
//     ip: "::1",
//     createdAt: "2025-04-21T17:59:38.593Z",
//     updatedAt: "2025-04-21T17:59:38.593Z",
//   },
//   {
//     id: "cm9rdt9a00007umd45khkwcra",
//     requestId: "cm806h9280004umfotb6nun9a",
//     requestUrl: "/sendhere/api/send-message",
//     forwardUrl: "https://silent-whispers.vercel.app/api/send-message",
//     response: "NIL",
//     statusCode: 500,
//     type: "POST",
//     comment: "Error in forwarding request to the server",
//     duration: 0,
//     userId: "12345678",
//     browser: null,
//     os: null,
//     ip: "::1",
//     createdAt: "2025-04-21T18:00:37.944Z",
//     updatedAt: "2025-04-21T18:00:37.944Z",
//   },
//   {
//     id: "cm9rf6fwc0001um6oh405vwum",
//     requestId: "cm806h9280004umfotb6nun9a",
//     requestUrl: "/sendhere/api/send-message",
//     forwardUrl: "https://silent-whispers.vercel.app/api/send-message",
//     response: '{"success":false,"message":"User Not accepting the messages"}',
//     statusCode: 403,
//     type: "POST",
//     comment: "Upstream server returned an error",
//     duration: 0,
//     userId: "12345678",
//     browser: null,
//     os: null,
//     ip: "::1",
//     createdAt: "2025-04-21T18:38:52.667Z",
//     updatedAt: "2025-04-21T18:38:52.667Z",
//   },
//   {
//     id: "cm9rdz7ui0001um5wxlwrtorh",
//     requestId: "cm806h9280004umfotb6nun9a",
//     requestUrl: "/sendhere/api/send-message",
//     forwardUrl: "https://silent-whispers.vercel.app/api/send-message",
//     response: "NIL",
//     statusCode: 500,
//     type: "POST",
//     comment: "Error in forwarding request to the server",
//     duration: 0,
//     userId: "12345678",
//     browser: null,
//     os: null,
//     ip: "::1",
//     createdAt: "2025-04-21T18:05:16.025Z",
//     updatedAt: "2025-04-21T18:05:16.025Z",
//   },
// ]

export function RequestsTable({ limit,value }: { limit?: number ,value:string}) {
  const [selectedRequest, setSelectedRequest] = useState<SendMessageLog>()
  const [data,setData] = useState<SendMessageLog[]>([])
  const displayData = limit ? data.slice(0, limit) : data

  const getStatusBadgeVariant = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return "outline"
    if (statusCode >= 400 && statusCode < 500) return "secondary"
    if (statusCode >= 500) return "destructive"
    return "secondary"
  }

  const formatResponse = (response:string) => {
    if (response === "NIL") return "No response"
    if (typeof response === "string") {
      try {
        return JSON.stringify(JSON.parse(response), null, 2)
      } catch {
        return response
      }
    }
    return JSON.stringify(response, null, 2)
  }

  useEffect(()=>{
    
    const fetch2 = async () => {
        try {
            
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/requestLog/getAll/${value}`, { withCredentials: true })
            console.log(res.data.data)
            setData(res.data.data)
        } catch (error) {
            console.error("Error fetching requests:", error)
        }
    }
    fetch2()
  },[value])

  return (
    <div className="h-[500px] w-full overflow-y-scroll">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayData.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">
                {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    request.statusCode >= 200 && request.statusCode < 300
                      ? "outline"
                      : request.statusCode >= 400 && request.statusCode < 500
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {request.statusCode}
                </Badge>
              </TableCell>
              <TableCell>{request.type}</TableCell>
              <TableCell className="max-w-[200px] truncate">{request.requestUrl}</TableCell>
              <TableCell className="max-w-[200px] truncate">{request.comment}</TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedRequest(request)}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Request Details</DialogTitle>
                      <DialogDescription>Complete information about this request</DialogDescription>
                    </DialogHeader>
                    {selectedRequest && (
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-medium">ID:</span>
                          <span className="col-span-3 font-mono text-sm">{selectedRequest.id}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-medium">Request ID:</span>
                          <span className="col-span-3 font-mono text-sm">{selectedRequest.requestId}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-medium">Status:</span>
                          <span className="col-span-3">
                            <Badge variant={getStatusBadgeVariant(selectedRequest.statusCode)}>
                              {selectedRequest.statusCode}
                            </Badge>
                          </span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-medium">Request URL:</span>
                          <span className="col-span-3 font-mono text-sm break-all">{selectedRequest.requestUrl}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-medium">Forward URL:</span>
                          <span className="col-span-3 font-mono text-sm break-all">{selectedRequest.forwardUrl}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-medium">Type:</span>
                          <span className="col-span-3">{selectedRequest.type}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-medium">Comment:</span>
                          <span className="col-span-3">{selectedRequest.comment}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-medium">User ID:</span>
                          <span className="col-span-3 font-mono text-sm">{selectedRequest.userId}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-medium">IP:</span>
                          <span className="col-span-3 font-mono text-sm">{selectedRequest.ip}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-medium">Created:</span>
                          <span className="col-span-3">{new Date(selectedRequest.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <span className="font-medium">Response:</span>
                          <pre className="col-span-3 rounded bg-muted p-2 font-mono text-xs overflow-auto max-h-[200px]">
                            {formatResponse(selectedRequest.response)}
                          </pre>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
