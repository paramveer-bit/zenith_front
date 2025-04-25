"use client"

import type React from "react"
import { useParams } from "next/navigation"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, UploadIcon, AlertCircleIcon, CheckCircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
const recommendedFormat = `[
    {
      "user_code" : "Code of the user1",
      "rate" : 10,
      "ip" : "user1_ip"
    },
    ...
    {
      "user_code" : "Code of the usern",
      "rate" : 10,
      "ip" : "user_n_ip"
    }
  ]`

export default function JsonUploadPage() {
  const [jsonData, setJsonData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const {toast} = useToast()
  
  const param = useParams<{id:string}>()
  

  const handleFileUpload = (file: File) => {
    setError(null)
    setIsSuccess(false)

    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
      setError("Please upload a JSON file")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string)
        setJsonData(json)
        setIsSuccess(true)
      } catch (err) {
        setError("Invalid JSON format. Please check your file and try again.")
      }
    }
    reader.readAsText(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const submit = async () => {
    try {
        setIsUploading(true)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/rateLimiting/getfile`, {id:param.id,"data_json":JSON.stringify(jsonData)}, { withCredentials: true })

        console.log("Response:", res.data)
        setIsUploading(false)
        setJsonData(null)
        setError(null)
        setIsSuccess(false)
        setIsDragging(false)
        toast({
            title: "Success",
            description: "All users are added successfully.",
            variant: "default",
        })
    } catch (error) {
        toast({
            title: "Error",
            description: "Error uploading JSON file",
            variant: "destructive"        
        })
        setIsUploading(false)
        console.error("Error fetching API usage data:", error)        
    } 
  }

  useEffect(() => {
    console.log("JSON Data:", jsonData)
  },[jsonData])

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">JSON File Upload</h1>

        {/* Json Recommendation */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <InfoIcon className="h-5 w-5 text-blue-500" />
            Recommended JSON Format
          </CardTitle>
          <CardDescription>Please follow this format for your JSON file</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
            <code>{recommendedFormat}</code>
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload Your JSON File</CardTitle>
          <CardDescription>Drag and drop your JSON file or click to browse</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors",
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload")?.click()}
            tabIndex={0}
            role="button"
            aria-label="Upload JSON file"
          >
            <div className="flex flex-col items-center gap-4">
              <UploadIcon className="h-10 w-10 text-muted-foreground" />
              <div className="flex flex-col items-center gap-1">
                <p className="text-lg font-medium">Drop your JSON file here or click to browse</p>
                <p className="text-sm text-muted-foreground">Supports .json files only</p>
              </div>
            </div>
            <input
              id="file-upload"
              type="file"
              accept=".json,application/json"
              className="sr-only"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileUpload(e.target.files[0])
                }
              }}
            />
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isSuccess && (
            <Alert className="mt-4 bg-green-50 text-green-800 border-green-200">
              <CheckCircleIcon className="h-4 w-4 text-green-600" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your JSON file has been uploaded successfully.</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              setJsonData(null)
              setError(null)
              setIsSuccess(false)
            }}
          >
            Clear
          </Button>
          <Button disabled={!jsonData || isUploading} onClick={submit}>Process JSON</Button>
        </CardFooter>
      </Card>

      {jsonData && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Uploaded JSON Data</CardTitle>
            <CardDescription>Preview of your uploaded JSON file</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
              <code>{JSON.stringify(jsonData, null, 2)}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </main>
  )
}
