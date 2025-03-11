import { NextResponse } from "next/server"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { cookies } from "next/headers"
import { db } from "@/lib/db"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = loginSchema.parse(body)

    // Find user
    const user = await db.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Create session token
    const token = sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" })

    // Set cookie
    cookies().set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid request data", errors: error.errors }, { status: 400 })
    }

    console.error("Login error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

