"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function PayPalSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const userId = searchParams.get("userId")

    if (!userId) {
      router.push("/dashboard/subscription")
      return
    }

    // In a real app, you would verify the payment with PayPal here
    // and then create the subscription in your database

    // Simulate API call delay
    const timer = setTimeout(() => {
      setIsProcessing(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [router, searchParams])

  const handleContinue = () => {
    router.push("/dashboard")
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Payment {isProcessing ? "Processing" : "Successful"}</CardTitle>
          <CardDescription className="text-center">
            {isProcessing ? "Please wait while we process your payment..." : "Your subscription has been activated!"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
          {isProcessing ? (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          ) : (
            <>
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-medium">Thank you for your payment</h3>
                <p className="text-muted-foreground">Your subscription is now active and will expire in 24 hours.</p>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleContinue} disabled={isProcessing} className="w-full">
            {isProcessing ? "Processing..." : "Continue to Dashboard"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

