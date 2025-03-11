"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "next-themes"

export function SignalMetrics() {
  const barChartRef = useRef<HTMLCanvasElement>(null)
  const pieChartRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Draw bar chart
    const barCanvas = barChartRef.current
    if (barCanvas) {
      const ctx = barCanvas.getContext("2d")
      if (ctx) {
        drawBarChart(ctx, barCanvas, theme === "dark")
      }
    }

    // Draw pie chart
    const pieCanvas = pieChartRef.current
    if (pieCanvas) {
      const ctx = pieCanvas.getContext("2d")
      if (ctx) {
        drawPieChart(ctx, pieCanvas, theme === "dark")
      }
    }
  }, [mounted, theme])

  const drawBarChart = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, isDark: boolean) => {
    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Colors
    const textColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
    const barColors = [
      "rgba(56, 189, 248, 0.8)",
      "rgba(56, 189, 248, 0.7)",
      "rgba(56, 189, 248, 0.6)",
      "rgba(56, 189, 248, 0.5)",
      "rgba(56, 189, 248, 0.4)",
      "rgba(56, 189, 248, 0.3)",
    ]

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Data
    const data = [85, 67, 72, 89, 92, 78]
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    const maxValue = Math.max(...data) * 1.2

    // Draw grid
    ctx.strokeStyle = gridColor
    ctx.fillStyle = textColor
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"

    // Horizontal grid lines
    const horizontalLines = 5
    for (let i = 0; i <= horizontalLines; i++) {
      const y = rect.height - rect.height * 0.1 - ((rect.height * 0.8) / horizontalLines) * i
      ctx.beginPath()
      ctx.moveTo(rect.width * 0.1, y)
      ctx.lineTo(rect.width * 0.9, y)
      ctx.stroke()

      // Value labels
      const value = Math.round((maxValue / horizontalLines) * i)
      ctx.fillText(value.toString(), rect.width * 0.05, y + 3)
    }

    // Draw bars
    const barWidth = ((rect.width * 0.8) / data.length) * 0.7
    const barSpacing = ((rect.width * 0.8) / data.length) * 0.3

    data.forEach((value, i) => {
      const x = rect.width * 0.1 + (barWidth + barSpacing) * i
      const barHeight = (value / maxValue) * (rect.height * 0.8)
      const y = rect.height - rect.height * 0.1 - barHeight

      // Draw bar
      ctx.fillStyle = barColors[i % barColors.length]
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw label
      ctx.fillStyle = textColor
      ctx.fillText(labels[i], x + barWidth / 2, rect.height - rect.height * 0.05)

      // Draw value
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5)
    })

    // Title
    ctx.fillStyle = textColor
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Monthly Success Rate (%)", rect.width / 2, 15)
  }

  const drawPieChart = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, isDark: boolean) => {
    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Colors
    const textColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"
    const sliceColors = ["rgba(0, 194, 146, 0.8)", "rgba(255, 62, 62, 0.8)", "rgba(250, 204, 21, 0.8)"]

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Data
    const data = [78, 15, 7] // Success, Failed, Pending
    const labels = ["Success", "Failed", "Pending"]
    const total = data.reduce((sum, value) => sum + value, 0)

    // Draw pie chart
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(centerX, centerY) * 0.7

    let startAngle = 0
    data.forEach((value, i) => {
      const sliceAngle = (value / total) * 2 * Math.PI

      // Draw slice
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()
      ctx.fillStyle = sliceColors[i % sliceColors.length]
      ctx.fill()

      // Draw label
      const labelAngle = startAngle + sliceAngle / 2
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7)
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7)

      ctx.fillStyle = "#fff"
      ctx.font = "bold 12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`${value}%`, labelX, labelY)

      startAngle += sliceAngle
    })

    // Draw legend
    const legendX = rect.width * 0.1
    const legendY = rect.height - 60

    labels.forEach((label, i) => {
      const y = legendY + i * 20

      // Draw color box
      ctx.fillStyle = sliceColors[i % sliceColors.length]
      ctx.fillRect(legendX, y, 15, 15)

      // Draw label
      ctx.fillStyle = textColor
      ctx.font = "12px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(`${label} (${data[i]}%)`, legendX + 20, y + 7)
    })

    // Title
    ctx.fillStyle = textColor
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText("Signal Performance", centerX, 15)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Success Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <canvas ref={barChartRef} className="w-full h-full" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Performance Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <canvas ref={pieChartRef} className="w-full h-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

