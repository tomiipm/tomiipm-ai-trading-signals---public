import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { hasActiveSubscription } from "@/lib/subscription"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check if user has active subscription
    const hasSubscription = await hasActiveSubscription(user.id)

    if (!hasSubscription) {
      return NextResponse.json({ message: "Active subscription required" }, { status: 403 })
    }

    // Get latest signals
    const signals = await db.signal.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    })

    return NextResponse.json({ signals })
  } catch (error) {
    console.error("Get signals error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

