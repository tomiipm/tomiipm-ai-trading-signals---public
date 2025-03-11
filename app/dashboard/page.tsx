import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import SignalsDashboard from "@/components/dashboard/signals-dashboard"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="View your AI trading signals and performance metrics." />
      <SignalsDashboard />
    </DashboardShell>
  )
}

