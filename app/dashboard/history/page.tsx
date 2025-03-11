import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { getSignalHistory } from "@/lib/signals"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import SignalHistoryTable from "@/components/dashboard/signal-history-table"

export default async function SignalHistoryPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const signalHistory = await getSignalHistory()

  return (
    <DashboardShell>
      <DashboardHeader heading="Signal History" text="View historical trading signals and their performance." />
      <SignalHistoryTable signalHistory={signalHistory} />
    </DashboardShell>
  )
}

