import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { getUserSubscription } from "@/lib/subscription"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import SubscriptionForm from "@/components/dashboard/subscription-form"

export default async function SubscriptionPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const subscription = await getUserSubscription(user.id)

  return (
    <DashboardShell>
      <DashboardHeader heading="Subscription" text="Manage your subscription to access AI trading signals." />
      <SubscriptionForm subscription={subscription} />
    </DashboardShell>
  )
}

