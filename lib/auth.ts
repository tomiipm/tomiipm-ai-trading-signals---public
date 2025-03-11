import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import { db } from "@/lib/db"

export interface User {
  id: string
  name: string
  email: string
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const token = cookies().get("auth-token")?.value

    if (!token) {
      return null
    }

    const decoded = verify(token, process.env.JWT_SECRET || "secret") as {
      id: string
      email: string
    }

    const user = await db.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    return user
  } catch (error) {
    console.error("Auth error:", error)
    return null
  }
}

