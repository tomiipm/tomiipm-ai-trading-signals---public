"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              AI Trading Signals
            </span>
          </Link>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Interactive Demo</CardTitle>
              <CardDescription>Walk through the AI Trading Signals platform to see how it works</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress bar */}
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>

              {/* Step 1: Welcome */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Welcome to AI Trading Signals</h2>
                  <div className="aspect-video relative rounded-lg overflow-hidden border">
                    <Image
                      src="/placeholder.svg?height=400&width=800"
                      alt="AI Trading Signals Dashboard"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p>
                    AI Trading Signals provides precise trading opportunities powered by advanced AI algorithms. This
                    demo will walk you through the main features of the platform.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg text-center">
                      <h3 className="font-medium">Multiple Markets</h3>
                      <p className="text-sm text-muted-foreground">Crypto, Forex, Gold, Oil</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <h3 className="font-medium">AI-Powered</h3>
                      <p className="text-sm text-muted-foreground">High accuracy signals</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <h3 className="font-medium">Just $1/day</h3>
                      <p className="text-sm text-muted-foreground">PayPal or Crypto</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Dashboard */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Dashboard Overview</h2>
                  <div className="aspect-video relative rounded-lg overflow-hidden border">
                    <Image
                      src="/placeholder.svg?height=400&width=800"
                      alt="Dashboard Overview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p>
                    The dashboard provides a comprehensive overview of all trading signals across different markets. You
                    can easily navigate between different market types using the tabs.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium">Market Overview</h3>
                      <p className="text-sm text-muted-foreground">
                        See current prices and trends for all supported markets
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium">Latest Signals</h3>
                      <p className="text-sm text-muted-foreground">View the most recent trading opportunities</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium">Performance Metrics</h3>
                      <p className="text-sm text-muted-foreground">Track signal success rates and performance</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium">Market Filters</h3>
                      <p className="text-sm text-muted-foreground">
                        Focus on specific markets like Crypto, Forex, Gold, or Oil
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Trading Signals */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Trading Signals</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="p-3 border-b bg-muted/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white">
                              <span className="text-xs">₿</span>
                            </div>
                            <span className="font-bold">BTC/USD</span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                              BUY
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 rounded-full text-xs font-medium border">4h</span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium border">ACTIVE</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col space-y-1">
                            <span className="text-xs text-muted-foreground">Entry</span>
                            <span className="font-medium">42500.75</span>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <span className="text-xs text-muted-foreground">Stop Loss</span>
                            <span className="font-medium text-red-500">41800.25</span>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <span className="text-xs text-muted-foreground">Take Profit 1</span>
                            <span className="font-medium text-green-500">43200.50</span>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <span className="text-xs text-muted-foreground">Take Profit 2</span>
                            <span className="font-medium text-green-500">44000.00</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-muted-foreground">Confidence:</span>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500" style={{ width: "85%" }}></div>
                            </div>
                            <span className="text-xs font-medium">85%</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">March 10, 2025, 2:45 PM</div>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <div className="p-3 border-b bg-muted/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
                              <span className="text-xs">$</span>
                            </div>
                            <span className="font-bold">EUR/USD</span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-destructive text-destructive-foreground">
                              SELL
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 rounded-full text-xs font-medium border">1h</span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium border">ACTIVE</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col space-y-1">
                            <span className="text-xs text-muted-foreground">Entry</span>
                            <span className="font-medium">1.0923</span>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <span className="text-xs text-muted-foreground">Stop Loss</span>
                            <span className="font-medium text-red-500">1.0975</span>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <span className="text-xs text-muted-foreground">Take Profit 1</span>
                            <span className="font-medium text-green-500">1.0880</span>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <span className="text-xs text-muted-foreground">Take Profit 2</span>
                            <span className="font-medium text-green-500">1.0850</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-muted-foreground">Confidence:</span>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500" style={{ width: "92%" }}></div>
                            </div>
                            <span className="text-xs font-medium">92%</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">March 11, 2025, 10:15 AM</div>
                      </div>
                    </div>
                  </div>
                  <p>
                    Each signal provides detailed information including entry price, take profit targets, stop loss
                    level, and AI confidence rating. Signals are available for multiple markets and timeframes.
                  </p>
                </div>
              )}

              {/* Step 4: Subscription */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Subscription Options</h2>
                  <p>
                    Access to AI Trading Signals costs just $1 per day with no auto-renewal. You can pay using PayPal or
                    cryptocurrency.
                  </p>

                  <Tabs defaultValue="paypal" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
                    </TabsList>

                    <TabsContent value="paypal" className="space-y-4 pt-4">
                      <div className="rounded-lg border p-4 text-center">
                        <div className="mb-4">
                          <div className="h-16 w-48 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center mx-auto">
                            <span className="font-bold text-blue-600 dark:text-blue-400 text-xl">PayPal</span>
                          </div>
                        </div>
                        <p className="mb-4">Pay securely using your PayPal account</p>
                        <Button className="w-full">Pay with PayPal</Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="crypto" className="space-y-4 pt-4">
                      <div className="rounded-lg border p-4">
                        <div className="mb-4">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="btc">Bitcoin</TabsTrigger>
                            <TabsTrigger value="eth">Ethereum</TabsTrigger>
                            <TabsTrigger value="usdt">USDT</TabsTrigger>
                          </TabsList>
                        </div>

                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="mb-2 font-medium">Send exactly</div>
                            <div className="text-2xl font-bold">0.00002500 BTC</div>
                            <div className="text-sm text-muted-foreground">≈ $1.00 USD</div>
                          </div>

                          <div className="space-y-2">
                            <div className="font-medium">To this address:</div>
                            <div className="flex items-center space-x-2">
                              <div className="p-2 border rounded bg-muted w-full font-mono text-sm overflow-hidden text-ellipsis">
                                bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                              </div>
                              <Button variant="outline" size="icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-copy"
                                >
                                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                </svg>
                              </Button>
                            </div>
                          </div>

                          <div className="rounded-lg bg-muted p-4 text-center">
                            <div className="mb-2">QR Code</div>
                            <div className="mx-auto h-40 w-40 bg-white p-2">
                              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                <span className="text-xs text-gray-500">QR Code</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {/* Step 5: Conclusion */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Ready to Get Started?</h2>
                  <div className="aspect-video relative rounded-lg overflow-hidden border">
                    <Image
                      src="/placeholder.svg?height=400&width=800"
                      alt="AI Trading Dashboard"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p>
                    AI Trading Signals provides you with precise trading opportunities across multiple markets. With our
                    AI-powered analysis, you can make more informed trading decisions.
                  </p>
                  <div className="space-y-4">
                    <h3 className="font-medium">Key Benefits:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-green-500 shrink-0 mt-0.5"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Access to signals for Crypto, Forex, Gold (XAU), and Oil markets</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-green-500 shrink-0 mt-0.5"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Precise entry, take profit, and stop loss levels</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-green-500 shrink-0 mt-0.5"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>AI confidence ratings for each signal</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-green-500 shrink-0 mt-0.5"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Pay only $1/day with no auto-renewal</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-green-500 shrink-0 mt-0.5"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Flexible payment options: PayPal or Cryptocurrency</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <Link href="/register">
                      <Button size="lg" className="px-8">
                        Sign Up Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                {currentStep < totalSteps ? (
                  <Button onClick={nextStep}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Link href="/">
                    <Button>Finish Demo</Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

