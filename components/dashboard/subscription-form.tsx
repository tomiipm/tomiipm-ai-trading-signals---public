"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, CheckCircle, AlertCircle, Copy } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface Subscription {
  id: string
  userId: string
  createdAt: string
  expiresAt: string
}

interface SubscriptionFormProps {
  subscription: Subscription | null
}

export default function SubscriptionForm({ subscription }: SubscriptionFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "crypto">("paypal")
  const [cryptoOption, setCryptoOption] = useState<"btc" | "eth" | "usdt">("btc")

  const handlePayPalCheckout = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/subscription/paypal", {
        method: "POST",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create PayPal checkout")
      }

      const data = await response.json()

      // Redirect to PayPal checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("PayPal checkout error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process PayPal checkout",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCryptoPayment = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/subscription/crypto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cryptoType: cryptoOption }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to generate crypto payment")
      }

      toast({
        title: "Payment Instructions Generated",
        description: "Please send the exact amount to the displayed address to activate your subscription.",
      })
    } catch (error) {
      console.error("Crypto payment error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate crypto payment",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Address copied to clipboard",
    })
  }

  const isActive = subscription && new Date(subscription.expiresAt) > new Date()
  const expiresAt = subscription ? new Date(subscription.expiresAt) : null

  const cryptoAddresses = {
    btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    eth: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    usdt: "0x8938d1f65154d7a3da46b32c5e1b1b7a0aea5f9c",
  }

  const cryptoAmounts = {
    btc: "0.00002500",
    eth: "0.00040000",
    usdt: "1.00",
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Status</CardTitle>
          <CardDescription>Your current subscription status and details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 rounded-lg border p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="font-medium">AI Trading Signals</p>
              <p className="text-sm text-muted-foreground">Daily access to AI-powered trading signals</p>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center space-x-4">
              {isActive ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <AlertCircle className="h-6 w-6 text-red-500" />
              )}
              <div>
                <p className="font-medium">{isActive ? "Active Subscription" : "No Active Subscription"}</p>
                <p className="text-sm text-muted-foreground">
                  {isActive ? `Expires on ${expiresAt?.toLocaleString()}` : "You don't have an active subscription"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {!isActive && (
        <Card>
          <CardHeader>
            <CardTitle>Subscribe for $1/day</CardTitle>
            <CardDescription>Choose your preferred payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="paypal" onValueChange={(value) => setPaymentMethod(value as "paypal" | "crypto")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
                <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
              </TabsList>

              <TabsContent value="paypal" className="space-y-4 pt-4">
                <div className="rounded-lg border p-4 text-center">
                  <div className="mb-4">
                    <Image
                      src="/placeholder.svg?height=60&width=200"
                      alt="PayPal"
                      width={200}
                      height={60}
                      className="mx-auto"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=60&width=200"
                      }}
                    />
                  </div>
                  <p className="mb-4">Pay securely using your PayPal account</p>
                  <Button onClick={handlePayPalCheckout} disabled={isLoading} className="w-full">
                    {isLoading ? "Processing..." : "Pay with PayPal"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="crypto" className="space-y-4 pt-4">
                <div className="rounded-lg border p-4">
                  <div className="mb-4">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="btc" onClick={() => setCryptoOption("btc")}>
                        Bitcoin
                      </TabsTrigger>
                      <TabsTrigger value="eth" onClick={() => setCryptoOption("eth")}>
                        Ethereum
                      </TabsTrigger>
                      <TabsTrigger value="usdt" onClick={() => setCryptoOption("usdt")}>
                        USDT
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="mb-2 font-medium">Send exactly</div>
                      <div className="text-2xl font-bold">
                        {cryptoAmounts[cryptoOption]} {cryptoOption.toUpperCase()}
                      </div>
                      <div className="text-sm text-muted-foreground">≈ $1.00 USD</div>
                    </div>

                    <div className="space-y-2">
                      <div className="font-medium">To this address:</div>
                      <div className="flex items-center space-x-2">
                        <Input value={cryptoAddresses[cryptoOption]} readOnly className="font-mono text-sm" />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(cryptoAddresses[cryptoOption])}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted p-4 text-center">
                      <div className="mb-2">QR Code</div>
                      <div className="mx-auto h-40 w-40 bg-white p-2">
                        <Image
                          src="/placeholder.svg?height=150&width=150"
                          alt="Crypto QR Code"
                          width={150}
                          height={150}
                          className="mx-auto"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=150&width=150"
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p>
                        After sending the payment, your subscription will be activated automatically within 10 minutes
                        (1 blockchain confirmation).
                      </p>
                    </div>

                    <Button onClick={handleCryptoPayment} disabled={isLoading} className="w-full">
                      {isLoading ? "Generating..." : "Generate New Address"}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Subscription Benefits</CardTitle>
          <CardDescription>What you get with your subscription</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            "Access to all AI-generated trading signals",
            "Entry, take profit, and stop loss levels for each signal",
            "Real-time notifications for new signals",
            "Historical signal performance data",
            "No auto-renewal - pay only when you need it",
          ].map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <p>{benefit}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

