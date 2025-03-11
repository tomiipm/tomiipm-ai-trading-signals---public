"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Signal {
  id: string
  symbol: string
  type: "BUY" | "SELL"
  entry: number
  tp1: number
  tp2: number
  sl: number
  createdAt: string
  status: "ACTIVE" | "COMPLETED" | "FAILED"
}

interface LatestSignalsProps {
  extended?: boolean
}

export function LatestSignals({ extended = false }: LatestSignalsProps) {
  const { toast } = useToast()
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const response = await fetch("/api/signals")

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || "Failed to fetch signals")
        }

        const data = await response.json()
        setSignals(data.signals || [])
      } catch (error) {
        console.error("Error fetching signals:", error)
        toast({
          title: "Error",
          description: "Failed to fetch trading signals. Please check your subscription.",
          variant: "destructive",
        })
        setSignals([])
      } finally {
        setLoading(false)
      }
    }

    // Generate mock data if API fails
    const generateMockSignals = () => {
      const mockSignals: Signal[] = []
      const symbols = ["BTC/USD", "ETH/USD", "XRP/USD", "SOL/USD", "ADA/USD"]
      const types: ("BUY" | "SELL")[] = ["BUY", "SELL"]
      const statuses: ("ACTIVE" | "COMPLETED" | "FAILED")[] = ["ACTIVE", "COMPLETED", "FAILED"]

      for (let i = 0; i < 5; i++) {
        const type = types[Math.floor(Math.random() * types.length)]
        const basePrice = 1000 + Math.random() * 50000
        const entry = Number.parseFloat(basePrice.toFixed(2))
        const tp1 =
          type === "BUY"
            ? Number.parseFloat((entry * (1 + Math.random() * 0.05)).toFixed(2))
            : Number.parseFloat((entry * (1 - Math.random() * 0.05)).toFixed(2))
        const tp2 =
          type === "BUY"
            ? Number.parseFloat((tp1 * (1 + Math.random() * 0.03)).toFixed(2))
            : Number.parseFloat((tp1 * (1 - Math.random() * 0.03)).toFixed(2))
        const sl =
          type === "BUY"
            ? Number.parseFloat((entry * (1 - Math.random() * 0.03)).toFixed(2))
            : Number.parseFloat((entry * (1 + Math.random() * 0.03)).toFixed(2))

        mockSignals.push({
          id: `signal-${i}`,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          type,
          entry,
          tp1,
          tp2,
          sl,
          createdAt: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString(),
          status: statuses[Math.floor(Math.random() * statuses.length)],
        })
      }

      return mockSignals
    }

    fetchSignals().catch(() => {
      setSignals(generateMockSignals())
      setLoading(false)
    })
  }, [toast])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (signals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 space-y-4">
        <p className="text-muted-foreground">No signals available</p>
        <Link href="/dashboard/subscription">
          <Button>Subscribe for Signals</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {signals.slice(0, extended ? signals.length : 3).map((signal) => (
        <div key={signal.id} className="flex flex-col space-y-2 rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold">{signal.symbol}</span>
              <Badge variant={signal.type === "BUY" ? "default" : "destructive"}>{signal.type}</Badge>
            </div>
            <Badge
              variant={
                signal.status === "ACTIVE" ? "outline" : signal.status === "COMPLETED" ? "default" : "destructive"
              }
            >
              {signal.status}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-1">
              <span className="text-muted-foreground">Entry:</span>
              <span className="font-medium">{signal.entry}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-muted-foreground">SL:</span>
              <span className="font-medium text-red-500">{signal.sl}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-muted-foreground">TP1:</span>
              <span className="font-medium text-green-500">{signal.tp1}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-muted-foreground">TP2:</span>
              <span className="font-medium text-green-500">{signal.tp2}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{new Date(signal.createdAt).toLocaleString()}</span>
            {extended && (
              <Button variant="ghost" size="sm" className="h-6 gap-1">
                <span>Details</span>
                <ExternalLink className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      ))}
      {!extended && signals.length > 3 && (
        <Link href="/dashboard/signals">
          <Button variant="outline" className="w-full">
            View All Signals
          </Button>
        </Link>
      )}
    </div>
  )
}

