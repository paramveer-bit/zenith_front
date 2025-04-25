import Link from "next/link"
import { ArrowLeft, Clock, Construction } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ComingSoonPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <Card className="mx-auto max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <Construction className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl">Feature Coming Soon</CardTitle>
          <CardDescription className="text-lg">We&#39;re working hard to bring you something amazing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Clock className="h-5 w-5" />
            <span>Under Development</span>
          </div>

          <p className="text-muted-foreground">
            This feature is currently in development and will be available in a future update. We appreciate your
            patience as we work to improve your experience.
          </p>

          <div className="mt-6 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <div className="mx-1 h-2 w-2 rounded-full bg-primary animate-pulse delay-150" />
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-300" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild variant="outline">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

