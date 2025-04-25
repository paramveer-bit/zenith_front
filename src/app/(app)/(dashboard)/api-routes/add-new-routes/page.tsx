"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {Code,  Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RoutePreview } from "@/components/route-preview"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"

export default function AddNewRoutePage() {
  const [routePath, setRoutePath] = useState("")
  const [forwardRoute, setForwardRoute] = useState("")
  const [rateLimit, setRateLimit] = useState(100)
  const [cacheEnabled, setCacheEnabled] = useState(false)

  const {toast} = useToast()



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if(!routePath || !forwardRoute) {

      toast({
        title: "Error",
        description: "Please fill in all required fields",
      })
      return
    }

    const newRoute = {
      requestUrl : routePath,
      forwardUrl : forwardRoute,
      rateLimiting : true,
      defaultRate : rateLimit,
      caching : true,
      cacheTime : 60
    }

    console.log(newRoute)
    try {
      const res =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/request/addnew`,newRoute,{withCredentials: true})
      console.log(res)
    } catch (error ) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching API usage data:", error);
        toast({
          title: "Error",
          description: error.response?.data?.message || "An unexpected error occurred",
          variant : "destructive",
        });
      } else {
        console.error("Unexpected error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
        });
      }
      return;
    }
    // Here you would typically send this data to your API
    toast({
      title: "Success",
      description: "New route added successfully"
    })
    setRateLimit(100)
    setRoutePath("")
    setForwardRoute("")
    setCacheEnabled(false)

  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold md:text-2xl">Add New API Route</h1>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              <form onSubmit={handleSubmit}>
                {/* ------------------------------------------------------- Basic Information ------------------------------------------------------- */}
                <Card className="mb-6" id="basic-info">
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Define the core details of your API route
                    </CardDescription>
                  </CardHeader>

                  {/* Requested route ------------------------------------------------------- */}
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="route-path">Requested Path</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{`{BaseUrl}`}/</span>
                        <Input
                          id="route-path"
                          placeholder="users/[id]"
                          value={routePath}
                          onChange={(e) => setRoutePath(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        All path parameters should be added in square barckets like [id]
                      </p>
                    </div>
                    {/* Forwarded route ------------------------------------------------------- */}

                    <div className="space-y-2">
                      <Label htmlFor="forwardRoute">Forwarded Path</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="forwardRoute"
                          placeholder="users/[id]"
                          value={forwardRoute}
                          onChange={(e) => setForwardRoute(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        All path parameters should be added in square barckets like [id]
                      </p>
                    </div>

                    {/* <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what this API route does..."
                        className="min-h-[100px]"
                      />
                    </div> */}
                  </CardContent>
                </Card>
                
                {/* Parameters */}
                {/* <Card className="mb-6" id="parameters">
                  <CardHeader>
                    <CardTitle>Parameters</CardTitle>
                    <CardDescription>Define the parameters your API route accepts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {parameters.length > 0 ? (
                      <div className="space-y-4">
                        {parameters.map((param) => (
                          <ParameterForm
                            key={param.id}
                            parameter={param}
                            onUpdate={(field, value) => updateParameter(param.id, field, value)}
                            onRemove={() => removeParameter(param.id)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-md border border-dashed p-6 text-center">
                        <p className="text-muted-foreground">No parameters defined yet</p>
                      </div>
                    )}

                    <Button type="button" variant="outline" onClick={addParameter}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Parameter
                    </Button>
                  </CardContent>
                </Card> */}

                {/* Security & Authentication */}
                {/* <Card className="mb-6" id="security">
                  <CardHeader>
                    <CardTitle>Security & Authentication</CardTitle>
                    <CardDescription>Configure security settings for your API route</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="requires-auth">Requires Authentication</Label>
                        <p className="text-xs text-muted-foreground">
                          Users must be authenticated to access this route
                        </p>
                      </div>
                      <Switch id="requires-auth" checked={requiresAuth} onCheckedChange={setRequiresAuth} />
                    </div>

                    {requiresAuth && (
                      <div className="space-y-2 rounded-md bg-muted p-4">
                        <Label htmlFor="auth-type">Authentication Type</Label>
                        <Select defaultValue="jwt">
                          <SelectTrigger id="auth-type">
                            <SelectValue placeholder="Select authentication type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="jwt">JWT Token</SelectItem>
                            <SelectItem value="api-key">API Key</SelectItem>
                            <SelectItem value="oauth">OAuth 2.0</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </CardContent>
                </Card> */}

                {/* ------------------------------------------------------- Advanced Settings ------------------------------------------------------- */}
                <Card className="mb-6" id="advanced">
                  <CardHeader>
                    <CardTitle>Advanced Settings</CardTitle>
                    <CardDescription>Configure additional options for your API route</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="rate-limiting">
                        <AccordionTrigger>Rate Limiting</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            <Label htmlFor="rate-limit">Requests per minute</Label>
                            <Input
                              id="rate-limit"
                              type="number"
                              value={rateLimit}
                              onChange={(e) => setRateLimit(Number(e.target.value))}
                            />
                            <p className="text-xs text-muted-foreground">Set to 0 for unlimited requests</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="caching">
                        <AccordionTrigger>Caching</AccordionTrigger>
                        <AccordionContent>
                          <div className="flex items-center justify-between pt-2">
                            <div className="space-y-0.5">
                              <Label htmlFor="cache-enabled">Enable Caching</Label>
                              <p className="text-xs text-muted-foreground">Cache responses to improve performance</p>
                            </div>
                            <Switch id="cache-enabled" checked={cacheEnabled} onCheckedChange={setCacheEnabled} />
                          </div>

                          {cacheEnabled && (
                            <div className="mt-4 space-y-2">
                              <Label htmlFor="cache-duration">Cache Duration (seconds)</Label>
                              <Input id="cache-duration" type="number" defaultValue={60} />
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                  <Button variant="outline" type="button" asChild>
                    <Link href="/">Cancel</Link>
                  </Button>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Create API Route
                  </Button>
                </div>
              </form>
            </div>

            {/* Route Preview */}
            <div className="space-y-6">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Route Preview</CardTitle>
                  <CardDescription>Preview of your API route configuration</CardDescription>
                </CardHeader>
                <CardContent>
                  <RoutePreview
                    path={routePath}
                  />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" size="sm">
                    <Code className="mr-2 h-4 w-4" />
                    View Generated Code
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
  )
}

