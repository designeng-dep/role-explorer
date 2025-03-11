"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TrendChartProps {
  data: {
    date: string
    value: number
  }[]
}

export default function TrendChart({ data }: TrendChartProps) {
  return (
    <Card className="p-6">
      <h4 className="text-sm font-medium mb-4">Job ad growth trend over the last 7 weeks</h4>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 50]}
              ticks={[0, 10, 20, 30, 40, 50]}
            />
            <Tooltip formatter={(value) => [`${value}%`, "Growth"]} labelFormatter={(label) => `Date: ${label}`} />
            <Line
              type="linear"
              dataKey="value"
              strokeWidth={2}
              stroke="url(#gradient)"
              dot={{ fill: "#fff", strokeWidth: 2, r: 4 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4338ca" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Button variant="outline" className="mt-4">
        Learn more about this role
      </Button>
    </Card>
  )
}

