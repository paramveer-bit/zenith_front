"use client"

import { useEffect, useState } from "react"
import { Check, X, Plus, MapPin, Route } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface Request {
  id: string
  requestUrl: string
  forwardUrl: string
  caching: boolean
  cacheTime: number
  rateLimiting: boolean
  defaultRate: number
  bannedUser: string[]
}

export default function DelayedRequests() {
  const {toast} = useToast()
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "1",
      requestUrl: "/api/send-message",
      forwardUrl: "https://silent-whispers.vercel.app/api/send-message",
      caching: true,
      cacheTime: 60,
      rateLimiting: true,
      defaultRate: 10,
      bannedUser: ["user1", "user2"],
    },
    {
      id: "2",
      requestUrl: "/api/get-user",
      forwardUrl: "https://silent-whispers.vercel.app/api/get-user",
      caching: false,
      cacheTime: 30,
      rateLimiting: false,
      defaultRate: 5,
      bannedUser: ["user3"],
    },
  ])
  const [fectching,setFectching] = useState(false)
  const router = useRouter()

  const [editingStates, setEditingStates] = useState<{ [key: string]: Partial<Request> }>({})
  const [savingStates, setSavingStates] = useState<{ [key: string]: boolean }>({})
  const [errorStates, setErrorStates] = useState<{ [key: string]: boolean }>({})
  const [newBannedUser, setNewBannedUser] = useState<{ [key: string]: string }>({})

  const handleChange = (id: string, field: keyof Request, value:string | number | boolean | string[]) => {
    setEditingStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }))
  }

  const handleSave = async (id: string) => {
    setSavingStates((prev) => ({ ...prev, [id]: true }))
    try {
      // Simulating an API call
      console.log(editingStates[id])
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/request/update/${id}`,{...editingStates[id]},{withCredentials: true})
      console.log(res)
      // If the API call is successful, update the request
      setRequests(requests.map((req) => (req.id === id ? { ...req, ...editingStates[id] } : req)))
      setEditingStates((prev) => ({ ...prev, [id]: {} }))
      setErrorStates((prev) => ({ ...prev, [id]: false }))
    } catch (error) {
      // If there's an error, set the error state
      console.error("Error fetching API usage data:", error)

      toast({
        title: "Error",
        description:"Error occured in updating request. Try after some time.",
        variant : "destructive"
      })
      setErrorStates((prev) => ({ ...prev, [id]: true }))
    } finally {
      setSavingStates((prev) => ({ ...prev, [id]: false }))
    }
  }

  const handleCancel = (id: string) => {
    setEditingStates((prev) => ({ ...prev, [id]: {} }))
    setErrorStates((prev) => ({ ...prev, [id]: false }))
  }

  const isEditing = (id: string) => Object.keys(editingStates[id] || {}).length > 0

  const handleAddBannedUser = (id: string) => {
    console.log(id)
    console.log(newBannedUser[id])
    console.log(newBannedUser[id].trim())
    if (newBannedUser[id] && newBannedUser[id].trim() !== "") {
      const updatedBannedUsers = [
        ...(editingStates[id]?.bannedUser || requests.find((r) => r.id === id)?.bannedUser || []),
        newBannedUser[id].trim(),
      ]
      console.log(updatedBannedUsers)
      handleChange(id, "bannedUser", updatedBannedUsers)
      setNewBannedUser((prev) => ({ ...prev, [id]: "" }))
    }
  }

  const handleRemoveBannedUser = (id: string, userToRemove: string) => {
    const updatedBannedUsers = (
      editingStates[id]?.bannedUser ||
      requests.find((r) => r.id === id)?.bannedUser ||
      []
    ).filter((user) => user !== userToRemove)
    handleChange(id, "bannedUser", updatedBannedUsers)
  }

//--------------Fecthing all requests from the server----------------
  

  useEffect(() => {
    const fetchRequest = async ()=>{
      console.log("----------------")
      try {
        console.log(process.env.NEXT_PUBLIC_API_URL)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/request/getall`,{withCredentials: true})
        console.log(res);
        setRequests(res.data.data)
      } catch (error) {
        console.log(error);
        toast({
            title: "Error",
            description:"Error occured in fetching request.",
            variant : "destructive"
        })
      }
    }
    setFectching(true)
    console.log("Rinning")
    fetchRequest()
    setFectching(false)

  },[toast])
//--------------------------------------------------------------------- 

  
  
  if (!fectching && requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="flex flex-col items-center justify-center max-w-md text-center space-y-4">
          <div className="rounded-full bg-muted p-6 w-24 h-24 flex items-center justify-center">
            <Route className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-semibold">No routes found</h3>
          <p className="text-muted-foreground">
            You don&#39;t have any routes to be displayed. Create a new route to get started.
          </p>
          <Button className="mt-4" onClick={() => router.push("/api-routes/add-new-routes")}>
            <MapPin className="mr-2 h-4 w-4" />
            Create New Route
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Routes</h1>
      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className={`bg-white shadow-md rounded-lg p-4 ${errorStates[request.id] ? "border-2 border-red-500" : ""}`}
          >
            {/* Showing all data fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Request URL</label>
                <Input
                  value={editingStates[request.id]?.requestUrl ?? request.requestUrl}
                  onChange={(e) => handleChange(request.id, "requestUrl", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Forward URL</label>
                <Input
                  value={editingStates[request.id]?.forwardUrl ?? request.forwardUrl}
                  onChange={(e) => handleChange(request.id, "forwardUrl", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex items-center">
                <Switch
                  checked={editingStates[request.id]?.caching ?? request.caching}
                  onCheckedChange={(checked) => handleChange(request.id, "caching", checked)}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">Caching</label>
              </div>
              <div className="flex items-center">
                <Switch
                  checked={editingStates[request.id]?.rateLimiting ?? request.rateLimiting}
                  onCheckedChange={(checked) => handleChange(request.id, "rateLimiting", checked)}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">Rate Limiting</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cache Time (seconds)</label>
                <Input
                  type="number"
                  value={editingStates[request.id]?.cacheTime ?? request.cacheTime}
                  onChange={(e) => handleChange(request.id, "cacheTime", Number.parseInt(e.target.value))}
                  className={`mt-1 ${!(editingStates[request.id]?.caching ?? request.caching) ? "bg-gray-100 text-gray-500" : ""}`}
                  disabled={!(editingStates[request.id]?.caching ?? request.caching)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Default Rate</label>
                <Input
                  type="number"
                  value={editingStates[request.id]?.defaultRate ?? request.defaultRate}
                  onChange={(e) => handleChange(request.id, "defaultRate", Number.parseInt(e.target.value))}
                  className={`mt-1 ${!(editingStates[request.id]?.rateLimiting ?? request.rateLimiting) ? "bg-gray-100 text-gray-500" : ""}`}
                  disabled={!(editingStates[request.id]?.rateLimiting ?? request.rateLimiting)}
                />
              </div>
            </div>
            {/* -------------------------------------------------- */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Banned Users</label>
              {/* Banned User lIst */}
              <div className="flex flex-wrap gap-2 mb-2">
                { (editingStates[request.id]?.bannedUser || (request.bannedUser!=undefined && request.bannedUser.length>0
                 )) && 
                  (editingStates[request.id]?.bannedUser ?? request.bannedUser).map((user, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {user}
                      <button
                        onClick={() => handleRemoveBannedUser(request.id, user)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newBannedUser[request.id] || ""}
                  onChange={(e) => setNewBannedUser((prev) => ({ ...prev, [request.id]: e.target.value }))}
                  placeholder="Add banned user"
                  className="flex-grow"
                />
                <Button onClick={() => handleAddBannedUser(request.id)} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {/* Cancelled and Save button */}
            {isEditing(request.id) && (
              <div className="mt-4 flex justify-end space-x-2">
                <Button onClick={() => handleSave(request.id)} disabled={savingStates[request.id]}>
                  {savingStates[request.id] ? "Saving..." : "Save"}
                  {!savingStates[request.id] && <Check className="w-4 h-4 ml-2" />}
                </Button>
                <Button onClick={() => handleCancel(request.id)} variant="outline">
                  Cancel
                  <X className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

