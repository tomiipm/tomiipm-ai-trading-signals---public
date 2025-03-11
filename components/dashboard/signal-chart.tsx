"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export function SignalChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Colors based on theme
    const isDark = theme === "dark"
    const textColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
    const candleUpColor = "rgba(0, 194, 146, 0.8)"
    const candleDownColor = "rgba(255, 62, 62, 0.8)"
    const lineColor = "rgba(56, 189, 248, 0.8)"

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Generate sample data for candlestick chart
    const data = generateCandlestickData(30)

    // Draw grid
    drawGrid(ctx, rect.width, rect.height, gridColor, textColor)

    // Draw candlesticks
    drawCandlesticks(ctx, data, rect.width, rect.height, candleUpColor, candleDownColor)

    // Draw moving average line
    drawMovingAverage(ctx, data, rect.width, rect.height, lineColor)
  }, [mounted, theme])

  // Generate random candlestick data
  const generateCandlestickData = (count: number) => {
    const data = []
    let price = 100

    for (let i = 0; i < count; i++) {
      const change = (Math.random() - 0.5) * 5
      const open = price
      price += change
      const close = price
      const high = Math.max(open, close) + Math.random() * 2
      const low = Math.min(open, close) - Math.random() * 2

      data.push({ open, high, low, close })
    }

    return data
  }

  // Draw grid lines and labels
  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    gridColor: string,
    textColor: string,
  ) => {
    ctx.strokeStyle = gridColor
    ctx.fillStyle = textColor
    ctx.font = "10px sans-serif"
    ctx.textAlign = "right"

    // Horizontal grid lines
    const horizontalLines = 5
    for (let i = 0; i <= horizontalLines; i++) {
      const y = (height / horizontalLines) * i
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()

      // Price labels
      const price = 120 - i * 10
      ctx.fillText(price.toString(), 40, y + 3)
    }

    // Vertical grid lines
    const verticalLines = 6
    for (let i = 0; i <= verticalLines; i++) {
      const x = (width / verticalLines) * i
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()

      // Date labels
      if (i < verticalLines) {
        const date = new Date()
        date.setDate(date.getDate() - (verticalLines - i) * 5)
        const dateStr = `${date.getMonth() + 1}/${date.getDate()}`
        ctx.textAlign = "center"
        ctx.fillText(dateStr, x + width / verticalLines / 2, height - 5)
      }
    }
  }

  // Draw candlesticks
  const drawCandlesticks = (
    ctx: CanvasRenderingContext2D,
    data: { open: number; high: number; low: number; close: number }[],
    width: number,
    height: number,
    upColor: string,
    downColor: string,
  ) => {
    const candleWidth = (width / data.length) * 0.8
    const padding = (width / data.length) * 0.1

    // Find min and max prices for scaling
    let minPrice = Math.min(...data.map((d) => d.low))
    let maxPrice = Math.max(...data.map((d) => d.high))
    const range = maxPrice - minPrice
    minPrice -= range * 0.1
    maxPrice += range * 0.1

    data.forEach((candle, i) => {
      const x = (width / data.length) * i + padding

      // Scale prices to canvas height
      const scaleY = (price: number) => {
        return height - ((price - minPrice) / (maxPrice - minPrice)) * height
      }

      const openY = scaleY(candle.open)
      const closeY = scaleY(candle.close)
      const highY = scaleY(candle.high)
      const lowY = scaleY(candle.low)

      // Draw wick
      ctx.beginPath()
      ctx.moveTo(x + candleWidth / 2, highY)
      ctx.lineTo(x + candleWidth / 2, lowY)
      ctx.strokeStyle = candle.open > candle.close ? downColor : upColor
      ctx.stroke()

      // Draw body
      ctx.fillStyle = candle.open > candle.close ? downColor : upColor
      const bodyHeight = Math.abs(closeY - openY)
      const bodyY = Math.min(openY, closeY)
      ctx.fillRect(x, bodyY, candleWidth, bodyHeight)
    })
  }

  // Draw moving average line
  const drawMovingAverage = (
    ctx: CanvasRenderingContext2D,
    data: { open: number; high: number; low: number; close: number }[],
    width: number,
    height: number,
    lineColor: string,
  ) => {
    const period = 5
    const maData = []

    // Calculate simple moving average
    for (let i = period - 1; i < data.length; i++) {
      let sum = 0
      for (let j = 0; j < period; j++) {
        sum += data[i - j].close
      }
      maData.push(sum / period)
    }

    // Find min and max prices for scaling
    let minPrice = Math.min(...data.map((d) => d.low))
    let maxPrice = Math.max(...data.map((d) => d.high))
    const range = maxPrice - minPrice
    minPrice -= range * 0.1
    maxPrice += range * 0.1

    // Draw line
    ctx.beginPath()
    maData.forEach((price, i) => {
      const x = (width / data.length) * (i + period - 1) + (width / data.length) * 0.5
      const y = height - ((price - minPrice) / (maxPrice - minPrice)) * height

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.strokeStyle = lineColor
    ctx.lineWidth = 2
    ctx.stroke()
  }

  return (
    <div className="w-full aspect-[16/9]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

