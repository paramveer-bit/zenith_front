"use client"
import Login from "@/components/otpField"
import { useParams } from "next/navigation"

export default function SignupPage() {
  const param = useParams<{email:string}>()

  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">Create an account</h1>
        <Login email={param.email}/>
      </div>
    </div>
  )
}

