"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

interface SignalHistory {
  id: string
  symbol: string
  type: "BUY" | "SELL"
  entry: number
  tp1: number
  tp2: number
  sl: number
  createdAt: string
  closedAt: string
  result: "TP1" | "TP2" | "SL" | "CLOSED"
  profit: number
}

interface SignalHistoryTableProps {
  signalHistory: SignalHistory[]
}

export default function SignalHistoryTable({ signalHistory }: SignalHistoryTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof SignalHistory>("closedAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (column: keyof SignalHistory) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedHistory = [...signalHistory].sort((a, b) => {
    if (sortColumn === "closedAt" || sortColumn === "createdAt") {
      return sortDirection === "asc"
        ? new Date(a[sortColumn]).getTime() - new Date(b[sortColumn]).getTime()
        : new Date(b[sortColumn]).getTime() - new Date(a[sortColumn]).getTime()
    }

    if (typeof a[sortColumn] === "string" && typeof b[sortColumn] === "string") {
      return sortDirection === "asc"
        ? (a[sortColumn] as string).localeCompare(b[sortColumn] as string)
        : (b[sortColumn] as string).localeCompare(a[sortColumn] as string)
    }

    return sortDirection === "asc"
      ? (a[sortColumn] as number) - (b[sortColumn] as number)
      : (b[sortColumn] as number) - (a[sortColumn] as number)
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("symbol")}>
              Symbol
              {sortColumn === "symbol" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("type")}>
              Type
              {sortColumn === "type" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead>Entry</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("result")}>
              Result
              {sortColumn === "result" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("profit")}>
              Profit
              {sortColumn === "profit" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("closedAt")}>
              Closed At
              {sortColumn === "closedAt" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedHistory.map((signal) => (
            <TableRow key={signal.id}>
              <TableCell className="font-medium">{signal.symbol}</TableCell>
              <TableCell>
                <Badge variant={signal.type === "BUY" ? "default" : "destructive"}>{signal.type}</Badge>
              </TableCell>
              <TableCell>{signal.entry}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    signal.result === "TP1" || signal.result === "TP2"
                      ? "default"
                      : signal.result === "SL"
                        ? "destructive"
                        : "outline"
                  }
                >
                  {signal.result}
                </Badge>
              </TableCell>
              <TableCell className={signal.profit >= 0 ? "text-green-500" : "text-red-500"}>
                {signal.profit >= 0 ? "+" : ""}
                {signal.profit}%
              </TableCell>
              <TableCell>{new Date(signal.closedAt).toLocaleString()}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Export</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

