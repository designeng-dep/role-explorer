"use client"

import { useEffect, useState } from "react"

interface CircularProgressProps {
  value: number
  maxValue: number
  label: string
  size?: number
}

export default function CircularProgress({ value, maxValue, label, size = 240 }: CircularProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animate the progress value
    const timer = setTimeout(() => {
      setProgress(value)
    }, 100)
    return () => clearTimeout(timer)
  }, [value])

  const percentage = (progress / maxValue) * 100
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className="text-gray-500 transition-all duration-1000 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-6xl font-semibold">{progress}</span>
        <span className="text-sm text-muted-foreground mt-1">{label}</span>
      </div>
    </div>
  )
}

