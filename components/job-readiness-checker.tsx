"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function JobReadinessChecker() {
  const [jobUrl, setJobUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const analyzeJob = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real application, you would send the jobUrl to your backend
    // and get a report ID in response. For now, we'll use a mock ID.
    const mockReportId = "mock-report-123"

    setLoading(false)
    router.push(`/report/${mockReportId}`)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#1a0b47] mb-4">Job Readiness Checker</h2>
        <p className="text-muted-foreground">
          Add a LinkedIn or MyCareersFuture job posting to analyze how your skills fit the job. You&apos;ll need to add
          more information for jobs found on other websites.{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Learn more
          </a>
        </p>
      </div>

      <form onSubmit={analyzeJob} className="flex gap-4 items-start">
        <Input
          type="url"
          placeholder="Example: https://linkedin.com/jobs..."
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
          {loading ? "Analyzing..." : "Get report"}
        </Button>
      </form>
    </div>
  )
}

