"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MarketData {
  symbol: string
  price: number
  change: number
  volume: string
}

export function MarketOverview() {
  const [markets, setMarkets] = useState<{
    crypto: MarketData[]
    forex: MarketData[]
    xau: MarketData[]
    oil: MarketData[]
  }>({
    crypto: [],
    forex: [],
    xau: [],
    oil: [],
  })

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For now, we'll generate mock data
    setMarkets({
      crypto: [
        { symbol: "BTC/USD", price: 43250.75, change: 2.34, volume: "1.2B" },
        { symbol: "ETH/USD", price: 2345.5, change: 1.87, volume: "780M" },
        { symbol: "XRP/USD", price: 0.5423, change: -0.76, volume: "320M" },
        { symbol: "SOL/USD", price: 124.35, change: 5.21, volume: "450M" },
      ],
      forex: [
        { symbol: "EUR/USD", price: 1.0923, change: 0.12, volume: "1.5B" },
        { symbol: "GBP/USD", price: 1.2745, change: -0.08, volume: "890M" },
        { symbol: "USD/JPY", price: 148.67, change: 0.34, volume: "1.1B" },
        { symbol: "AUD/USD", price: 0.6578, change: -0.21, volume: "650M" },
      ],
      xau: [
        { symbol: "XAU/USD", price: 2034.75, change: 0.45, volume: "980M" },
        { symbol: "XAU/EUR", price: 1862.3, change: 0.32, volume: "420M" },
        { symbol: "XAU/GBP", price: 1595.45, change: 0.28, volume: "310M" },
        { symbol: "XAU/JPY", price: 302450, change: 0.67, volume: "250M" },
      ],
      oil: [
        { symbol: "WTI/USD", price: 78.35, change: -1.24, volume: "850M" },
        { symbol: "BRENT/USD", price: 82.45, change: -0.98, volume: "920M" },
        { symbol: "NATURAL GAS", price: 2.87, change: 2.15, volume: "480M" },
        { symbol: "HEATING OIL", price: 2.45, change: -0.54, volume: "320M" },
      ],
    })
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="crypto">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="forex">Forex</TabsTrigger>
            <TabsTrigger value="xau">Gold</TabsTrigger>
            <TabsTrigger value="oil">Oil</TabsTrigger>
          </TabsList>

          {Object.entries(markets).map(([key, data]) => (
            <TabsContent key={key} value={key} className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {data.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-md border">
                    <div>
                      <div className="font-medium">{item.symbol}</div>
                      <div className="text-sm text-muted-foreground">Vol: {item.volume}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        {item.price.toLocaleString(undefined, {
                          minimumFractionDigits: item.price < 10 ? 4 : 2,
                          maximumFractionDigits: item.price < 10 ? 4 : 2,
                        })}
                      </div>
                      <div
                        className={`text-sm flex items-center justify-end ${
                          item.change >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {item.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {item.change >= 0 ? "+" : ""}
                        {item.change}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

