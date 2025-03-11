import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { getSignals } from "@/lib/signals"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import SignalsTable from "@/components/dashboard/signals-table"

export default async function SignalsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const signals = await getSignals()

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Trading Signals"
        text="View all trading signals with entry, take profit, and stop loss levels."
      />
      <SignalsTable signals={signals} />
    </DashboardShell>
  )
}

