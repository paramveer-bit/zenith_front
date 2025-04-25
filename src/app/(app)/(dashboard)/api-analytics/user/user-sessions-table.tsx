"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface SessionData {
  id: string
  startTime: string
  endTime: string | null
  duration: number | null
  ipAddress: string
  location: string
  device: string
  browser: string
  requestCount: number
}

interface UserSessionsTableProps {
  data: SessionData[]
}

export default function UserSessionsTable({ data }: UserSessionsTableProps) {
  const formatDuration = (duration: number | null) => {
    if (duration === null) return "Active"

    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60

    if (minutes === 0) {
      return `${seconds}s`
    }

    return `${minutes}m ${seconds}s`
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Session ID</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Device / Browser</TableHead>
            <TableHead className="text-right">Requests</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium">{session.id.substring(0, 8)}...</TableCell>
              <TableCell>{new Date(session.startTime).toLocaleString()}</TableCell>
              <TableCell>
                {session.endTime === null ? (
                  <Badge
                    variant="outline"
                    className="bg-green-500/10 text-green-500 hover:bg-green-500/10 hover:text-green-500"
                  >
                    Active
                  </Badge>
                ) : (
                  formatDuration(session.duration)
                )}
              </TableCell>
              <TableCell>{session.location}</TableCell>
              <TableCell>
                {session.device} / {session.browser}
              </TableCell>
              <TableCell className="text-right">{session.requestCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

