import RoleExplorer from "@/components/role-explorer"
import SalaryTrends from "@/components/salary-trends"
import JobReadinessChecker from "@/components/job-readiness-checker"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-[#1a0b47] mb-2">Career Pathways Explorer</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover in-demand roles, explore required skills, and find the right courses to advance your career
          </p>
        </header>

        <div className="space-y-12">
          <RoleExplorer />
          <SalaryTrends />
          <JobReadinessChecker />
        </div>
      </div>
    </main>
  )
}

