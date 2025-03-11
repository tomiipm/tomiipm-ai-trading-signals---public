"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Clock, CreditCard, Home, LineChart, LogOut, Settings } from "lucide-react"

interface DashboardNavProps {
  onLogout: () => void
}

export default function DashboardNav({ onLogout }: DashboardNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Signals",
      href: "/dashboard/signals",
      icon: LineChart,
    },
    {
      title: "History",
      href: "/dashboard/history",
      icon: Clock,
    },
    {
      title: "Subscription",
      href: "/dashboard/subscription",
      icon: CreditCard,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item, index) => {
        const Icon = item.icon
        return (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )
      })}
      <button
        onClick={onLogout}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground text-red-500 hover:text-red-600"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </nav>
  )
}

