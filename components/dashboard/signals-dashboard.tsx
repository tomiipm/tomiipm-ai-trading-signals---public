"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, ArrowUpRight, Clock, DollarSign, LineChart, TrendingUp } from "lucide-react"
import { SignalMetrics } from "./signal-metrics"
import { LatestSignals } from "./latest-signals"
import { useToast } from "@/components/ui/use-toast"
import { MarketSignals } from "./market-signals"
import { MarketOverview } from "./market-overview"

export default function SignalsDashboard() {
  const { toast } = useToast()
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetch("/api/subscription")
        const data = await response.json()
        setSubscription(data.subscription)
      } catch (error) {
        console.error("Error fetching subscription:", error)
        toast({
          title: "Error",
          description: "Failed to fetch subscription status",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSubscription()

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [toast])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscription Status</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : subscription ? (
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-500">Active</div>
                <p className="text-xs text-muted-foreground">
                  Expires: {new Date(subscription.expiresAt).toLocaleString()}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-2xl font-bold text-red-500">Inactive</div>
                <Link href="/dashboard/subscription">
                  <Button size="sm" className="mt-2">
                    Subscribe Now
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTime(currentTime)}</div>
            <p className="text-xs text-muted-foreground">{currentTime.toLocaleDateString()}</p>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Signal Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.5%</div>
            <p className="text-xs text-muted-foreground">+2.5% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="forex">Forex</TabsTrigger>
          <TabsTrigger value="xau">Gold (XAU)</TabsTrigger>
          <TabsTrigger value="oil">Oil</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Market Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <MarketOverview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Latest Signals</CardTitle>
                <CardDescription>Most recent trading opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <LatestSignals />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Total Signals",
                value: "245",
                description: "Last 30 days",
                icon: LineChart,
              },
              {
                title: "Successful Signals",
                value: "192",
                description: "78.5% success rate",
                icon: ArrowUpRight,
              },
              {
                title: "View All Signals",
                action: true,
                href: "/dashboard/signals",
                icon: ArrowRight,
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                  {item.icon && <item.icon className="h-4 w-4 text-muted-foreground" />}
                </CardHeader>
                <CardContent>
                  {item.action ? (
                    <Link href={item.href || "#"}>
                      <Button className="w-full">View All Signals</Button>
                    </Link>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">{item.value}</div>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="crypto" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cryptocurrency Signals</CardTitle>
              <CardDescription>
                Trading signals for Bitcoin, Ethereum, and other major cryptocurrencies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MarketSignals marketType="crypto" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forex" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Forex Signals</CardTitle>
              <CardDescription>Trading signals for major and minor currency pairs.</CardDescription>
            </CardHeader>
            <CardContent>
              <MarketSignals marketType="forex" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="xau" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gold (XAU) Signals</CardTitle>
              <CardDescription>Trading signals for gold against major currencies.</CardDescription>
            </CardHeader>
            <CardContent>
              <MarketSignals marketType="xau" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="oil" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Oil Signals</CardTitle>
              <CardDescription>Trading signals for crude oil and related products.</CardDescription>
            </CardHeader>
            <CardContent>
              <MarketSignals marketType="oil" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Latest Trading Signals</CardTitle>
              <CardDescription>
                View the most recent trading opportunities with entry, take profit, and stop loss levels.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LatestSignals extended />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Detailed statistics about signal performance over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <SignalMetrics />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

