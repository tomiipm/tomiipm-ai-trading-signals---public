import { mockDb } from "@/lib/db"

export async function getSignals() {
  try {
    // In a real app, this would fetch from the database
    // For now, we'll use mock data
    const signals = await mockDb.signal.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    // Add market types to the signals
    const signalsWithMarketTypes = signals.map((signal) => {
      let marketType = "crypto"

      if (signal.symbol.includes("XAU")) {
        marketType = "xau"
      } else if (signal.symbol.includes("USD") && !signal.symbol.includes("/")) {
        marketType = "oil"
      } else if (signal.symbol.includes("EUR") || signal.symbol.includes("GBP") || signal.symbol.includes("JPY")) {
        marketType = "forex"
      }

      return {
        ...signal,
        marketType,
      }
    })

    return signalsWithMarketTypes
  } catch (error) {
    console.error("Error fetching signals:", error)
    return []
  }
}

export async function getSignalHistory() {
  try {
    // Mock signal history data
    const signalHistory = [
      {
        id: "history-1",
        symbol: "BTC/USD",
        type: "BUY",
        entry: 40500,
        tp1: 41200,
        tp2: 42000,
        sl: 39800,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        closedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        result: "TP1",
        profit: 1.73,
      },
      {
        id: "history-2",
        symbol: "ETH/USD",
        type: "SELL",
        entry: 2350,
        tp1: 2280,
        tp2: 2200,
        sl: 2420,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        closedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        result: "TP2",
        profit: 6.38,
      },
      {
        id: "history-3",
        symbol: "XRP/USD",
        type: "BUY",
        entry: 0.48,
        tp1: 0.51,
        tp2: 0.54,
        sl: 0.45,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        closedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        result: "SL",
        profit: -6.25,
      },
      {
        id: "history-4",
        symbol: "SOL/USD",
        type: "BUY",
        entry: 110,
        tp1: 115,
        tp2: 120,
        sl: 105,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        closedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
        result: "TP2",
        profit: 9.09,
      },
      {
        id: "history-5",
        symbol: "ADA/USD",
        type: "SELL",
        entry: 0.52,
        tp1: 0.49,
        tp2: 0.47,
        sl: 0.55,
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        closedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
        result: "CLOSED",
        profit: 1.92,
      },
    ]

    return signalHistory
  } catch (error) {
    console.error("Error fetching signal history:", error)
    return []
  }
}

