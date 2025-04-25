"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"

const formSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits" }),
})

export default function OtpVerificationForm({email}:{email: string}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [resending, setResending] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  })

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timerId)
    }
  }, [timeLeft])

//   Submitting OTP---------------------------------------
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const decodedEmail = decodeURIComponent(email)
    // Here you would typically send the OTP to your backend for verification
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/verify`, {email: decodedEmail, otp: values.otp})
        console.log(res)
        router.push("/login")
    } catch (error) {
        console.log(error)
        const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : (error as Error).message || "An unknown error occurred"

        toast({
            title: "Error",
            description: errorMessage,
            variant : "destructive"
        })
        setIsLoading(false)
    }
    
  }

//   Resending otp---------------------------------------
  function handleResendOtp() {
    setResending(true)
    const decodedEmail = decodeURIComponent(email)
    try {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/resendOtp`, {email: decodedEmail})
        toast({
            title: "OTP Resent",
            description: "A new OTP has been sent to your email.",
            })
        setResending(false)
    } catch (error) {
        console.log(error)
        const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : (error as Error).message || "An unknown error occurred"

        toast({
            title: "Error",
            description: errorMessage,
            variant : "destructive"
        })
        setResending(false)
    }
    setTimeLeft(600) // Reset the timer
    toast({
      title: "OTP Resent",
      description: "A new OTP has been sent to your email.",
    })
  }
//   Time function---------------------------------------
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Otp Field */}
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter 6-digit OTP</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="Enter OTP"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-center text-sm text-gray-600">Time remaining: {formatTime(timeLeft)}</div>
        {/* Send Button */}
        <Button type="submit" className="w-full" disabled={isLoading || timeLeft === 0}>
          {isLoading ? "Verifying..." : "Verify OTP"}
        </Button>
      </form>
      {/* Resend Otp */}
      <div className="mt-4 text-center">
        <Button
          variant="link"
          onClick={handleResendOtp}
          disabled={resending}
          className="text-sm text-primary hover:underline"
        >
          Resend OTP
        </Button>
      </div>
    </Form>
  )
}

