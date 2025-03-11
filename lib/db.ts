import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db
}

// Mock database for development
export const mockDb = {
  user: {
    findUnique: async ({ where }: { where: { id?: string; email?: string } }) => {
      // Mock user data
      const users = [
        {
          id: "user-1",
          name: "John Doe",
          email: "john@example.com",
          password: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm", // "password"
        },
      ]

      if (where.id) {
        return users.find((user) => user.id === where.id) || null
      }

      if (where.email) {
        return users.find((user) => user.email === where.email) || null
      }

      return null
    },
    create: async ({ data }: { data: any }) => {
      // Mock user creation
      return {
        id: "user-" + Math.floor(Math.random() * 1000),
        ...data,
      }
    },
  },
  subscription: {
    findFirst: async ({ where }: { where: any }) => {
      // Mock subscription data
      const subscriptions = [
        {
          id: "sub-1",
          userId: "user-1",
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
        },
      ]

      if (where.userId) {
        return subscriptions.find((sub) => sub.userId === where.userId) || null
      }

      return null
    },
  },
  signal: {
    findMany: async ({ orderBy, take }: { orderBy?: any; take?: number }) => {
      // Mock signal data
      const signals = [
        {
          id: "signal-1",
          symbol: "BTC/USD",
          type: "BUY",
          entry: 42500,
          tp1: 43200,
          tp2: 44000,
          sl: 41800,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          status: "ACTIVE",
        },
        {
          id: "signal-2",
          symbol: "ETH/USD",
          type: "SELL",
          entry: 2250,
          tp1: 2180,
          tp2: 2100,
          sl: 2320,
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          status: "COMPLETED",
        },
        {
          id: "signal-3",
          symbol: "XRP/USD",
          type: "BUY",
          entry: 0.52,
          tp1: 0.55,
          tp2: 0.58,
          sl: 0.49,
          createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          status: "FAILED",
        },
        {
          id: "signal-4",
          symbol: "SOL/USD",
          type: "BUY",
          entry: 120,
          tp1: 125,
          tp2: 130,
          sl: 115,
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          status: "ACTIVE",
        },
        {
          id: "signal-5",
          symbol: "ADA/USD",
          type: "SELL",
          entry: 0.45,
          tp1: 0.42,
          tp2: 0.4,
          sl: 0.48,
          createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
          status: "ACTIVE",
        },
      ]

      let result = [...signals]

      if (orderBy?.createdAt === "desc") {
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      }

      if (take) {
        result = result.slice(0, take)
      }

      return result
    },
  },
}

