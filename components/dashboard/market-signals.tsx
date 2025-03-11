"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Bell, Clock } from "lucide-react"

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
  confidence: number
  timeframe: string
  marketType: "crypto" | "forex" | "xau" | "oil"
}

interface MarketSignalsProps {
  marketType: "crypto" | "forex" | "xau" | "oil"
}

export function MarketSignals({ marketType }: MarketSignalsProps) {
  const { toast } = useToast()
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        // In a real app, we would fetch from API with market type filter
        // For now, we'll generate mock data
        setSignals(generateMockSignals(marketType))
      } catch (error) {
        console.error("Error fetching signals:", error)
        toast({
          title: "Error",
          description: "Failed to fetch trading signals. Please check your subscription.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSignals()
  }, [marketType, toast])

  const generateMockSignals = (type: string): Signal[] => {
    const mockSignals: Signal[] = []

    // Market-specific symbols
    const symbols: Record<string, string[]> = {
      crypto: ["BTC/USD", "ETH/USD", "XRP/USD", "SOL/USD", "ADA/USD", "DOT/USD", "AVAX/USD"],
      forex: ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "USD/CAD", "EUR/GBP", "USD/CHF"],
      xau: ["XAU/USD", "XAU/EUR", "XAU/GBP", "XAU/AUD", "XAU/JPY"],
      oil: ["WTI/USD", "BRENT/USD", "NATURAL GAS", "HEATING OIL", "GASOLINE"],
    }

    const timeframes = ["15m", "1h", "4h", "1d"]
    const types: ("BUY" | "SELL")[] = ["BUY", "SELL"]
    const statuses: ("ACTIVE" | "COMPLETED" | "FAILED")[] = ["ACTIVE", "ACTIVE", "ACTIVE", "COMPLETED", "FAILED"]

    // Generate 5-8 signals for the selected market type
    const signalCount = 5 + Math.floor(Math.random() * 4)

    for (let i = 0; i < signalCount; i++) {
      const signalType = types[Math.floor(Math.random() * types.length)]
      const marketSymbols = symbols[type] || symbols.crypto
      const symbol = marketSymbols[Math.floor(Math.random() * marketSymbols.length)]

      // Price ranges based on market type
      let basePrice = 0
      if (type === "crypto") {
        basePrice = symbol.includes("BTC")
          ? 40000 + Math.random() * 10000
          : symbol.includes("ETH")
            ? 2000 + Math.random() * 500
            : 1 + Math.random() * 100
      } else if (type === "forex") {
        basePrice = symbol.includes("JPY") ? 100 + Math.random() * 50 : 1 + Math.random()
      } else if (type === "xau") {
        basePrice = 1900 + Math.random() * 200
      } else if (type === "oil") {
        basePrice = 70 + Math.random() * 30
      }

      const entry = Number.parseFloat(basePrice.toFixed(symbol.includes("JPY") ? 3 : type === "forex" ? 5 : 2))

      // Calculate TP and SL based on market volatility
      const volatility = type === "crypto" ? 0.05 : type === "forex" ? 0.01 : type === "xau" ? 0.02 : 0.03

      const tp1 =
        signalType === "BUY"
          ? Number.parseFloat(
              (entry * (1 + volatility * Math.random())).toFixed(symbol.includes("JPY") ? 3 : type === "forex" ? 5 : 2),
            )
          : Number.parseFloat(
              (entry * (1 - volatility * Math.random())).toFixed(symbol.includes("JPY") ? 3 : type === "forex" ? 5 : 2),
            )

      const tp2 =
        signalType === "BUY"
          ? Number.parseFloat(
              (tp1 * (1 + volatility * 0.5 * Math.random())).toFixed(
                symbol.includes("JPY") ? 3 : type === "forex" ? 5 : 2,
              ),
            )
          : Number.parseFloat(
              (tp1 * (1 - volatility * 0.5 * Math.random())).toFixed(
                symbol.includes("JPY") ? 3 : type === "forex" ? 5 : 2,
              ),
            )

      const sl =
        signalType === "BUY"
          ? Number.parseFloat(
              (entry * (1 - volatility * 0.7 * Math.random())).toFixed(
                symbol.includes("JPY") ? 3 : type === "forex" ? 5 : 2,
              ),
            )
          : Number.parseFloat(
              (entry * (1 + volatility * 0.7 * Math.random())).toFixed(
                symbol.includes("JPY") ? 3 : type === "forex" ? 5 : 2,
              ),
            )

      mockSignals.push({
        id: `${type}-signal-${i}`,
        symbol,
        type: signalType,
        entry,
        tp1,
        tp2,
        sl,
        createdAt: new Date(Date.now() - Math.random() * 86400000 * 2).toISOString(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        confidence: 70 + Math.floor(Math.random() * 25),
        timeframe: timeframes[Math.floor(Math.random() * timeframes.length)],
        marketType: type as "crypto" | "forex" | "xau" | "oil",
      })
    }

    // Sort by creation date (newest first)
    return mockSignals.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

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
        <p className="text-muted-foreground">No signals available for this market</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {signals.map((signal) => (
          <Card key={signal.id} className="overflow-hidden">
            <div className="p-4 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MarketIcon type={signal.marketType} />
                  <span className="font-bold">{signal.symbol}</span>
                  <Badge variant={signal.type === "BUY" ? "default" : "destructive"}>{signal.type}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {signal.timeframe}
                  </Badge>
                  <Badge
                    variant={
                      signal.status === "ACTIVE" ? "outline" : signal.status === "COMPLETED" ? "default" : "destructive"
                    }
                  >
                    {signal.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col space-y-1">
                  <span className="text-xs text-muted-foreground">Entry</span>
                  <span className="font-medium">{signal.entry}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs text-muted-foreground">Stop Loss</span>
                  <span className="font-medium text-red-500">{signal.sl}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs text-muted-foreground">Take Profit 1</span>
                  <span className="font-medium text-green-500">{signal.tp1}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs text-muted-foreground">Take Profit 2</span>
                  <span className="font-medium text-green-500">{signal.tp2}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-muted-foreground">Confidence:</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        signal.confidence > 85
                          ? "bg-green-500"
                          : signal.confidence > 70
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                      }`}
                      style={{ width: `${signal.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium">{signal.confidence}%</span>
                </div>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  <Bell className="h-3 w-3" />
                  <span className="text-xs">Alert</span>
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">{new Date(signal.createdAt).toLocaleString()}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function MarketIcon({ type }: { type: string }) {
  switch (type) {
    case "crypto":
      return (
        <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white">
          <span className="text-xs">₿</span>
        </div>
      )
    case "forex":
      return (
        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <span className="text-xs">$</span>
        </div>
      )
    case "xau":
      return (
        <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white">
          <span className="text-xs">Au</span>
        </div>
      )
    case "oil":
      return (
        <div className="w-5 h-5 rounded-full bg-green-700 flex items-center justify-center text-white">
          <span className="text-xs">O</span>
        </div>
      )
    default:
      return (
        <div className="w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center text-white">
          <span className="text-xs">?</span>
        </div>
      )
  }
}

