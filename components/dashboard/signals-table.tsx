"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

interface Signal {
  id: string
  symbol: string
  type: "BUY" | "SELL"
  entry: number
  tp1: number
  tp2: number
  sl: number
  createdAt: string
  status: "ACTIVE" | "COMPLETED" | "FAILED"
}

interface SignalsTableProps {
  signals: Signal[]
}

export default function SignalsTable({ signals }: SignalsTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof Signal>("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (column: keyof Signal) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedSignals = [...signals].sort((a, b) => {
    if (sortColumn === "createdAt") {
      return sortDirection === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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
            <TableHead className="cursor-pointer" onClick={() => handleSort("entry")}>
              Entry
              {sortColumn === "entry" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead>TP1</TableHead>
            <TableHead>TP2</TableHead>
            <TableHead>SL</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
              Status
              {sortColumn === "status" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("createdAt")}>
              Date
              {sortColumn === "createdAt" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedSignals.map((signal) => (
            <TableRow key={signal.id}>
              <TableCell className="font-medium">{signal.symbol}</TableCell>
              <TableCell>
                <Badge variant={signal.type === "BUY" ? "default" : "destructive"}>{signal.type}</Badge>
              </TableCell>
              <TableCell>{signal.entry}</TableCell>
              <TableCell className="text-green-500">{signal.tp1}</TableCell>
              <TableCell className="text-green-500">{signal.tp2}</TableCell>
              <TableCell className="text-red-500">{signal.sl}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    signal.status === "ACTIVE" ? "outline" : signal.status === "COMPLETED" ? "default" : "destructive"
                  }
                >
                  {signal.status}
                </Badge>
              </TableCell>
              <TableCell>{new Date(signal.createdAt).toLocaleString()}</TableCell>
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
                    <DropdownMenuItem>Add to Watchlist</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
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

