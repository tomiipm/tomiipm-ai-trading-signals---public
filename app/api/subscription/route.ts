import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Redirect to subscription page where user can choose payment method
    return NextResponse.json({ url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription` })
  } catch (error) {
    console.error("Subscription error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const subscription = await db.subscription.findFirst({
      where: {
        userId: user.id,
        expiresAt: {
          gt: new Date(),
        },
      },
    })

    return NextResponse.json({ subscription })
  } catch (error) {
    console.error("Get subscription error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

