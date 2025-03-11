import { mockDb } from "@/lib/db"

export async function getUserSubscription(userId: string) {
  try {
    // In a real app, this would fetch from the database
    // For now, we'll use mock data
    const subscription = await mockDb.subscription.findFirst({
      where: {
        userId,
      },
    })

    return subscription
  } catch (error) {
    console.error("Error fetching subscription:", error)
    return null
  }
}

export async function hasActiveSubscription(userId: string) {
  try {
    const subscription = await getUserSubscription(userId)

    if (!subscription) {
      return false
    }

    return new Date(subscription.expiresAt) > new Date()
  } catch (error) {
    console.error("Error checking subscription:", error)
    return false
  }
}

