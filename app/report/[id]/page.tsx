import Link from "next/link"
import { ArrowLeft, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import CircularProgress from "@/components/circular-progress"
import SkillsBreakdown from "@/components/skills-breakdown"
import JobCompatibility from "@/components/job-compatibility"

// In a real app, this would come from an API or database
const mockReport = {
  company: "TikTok",
  position: "Product Designer - UX (Singapore)",
  date: "February 20, 2025",
  score: 6,
  overview:
    "Your readiness score is low because you have not provided any professional experience and your MySkillsFuture progress is limited to the 'Learn CSS' path. The job you're applying for requires a strong understanding of UX/UI design principles, experience in leading design projects, and familiarity with front-end programming. Your current experience does not meet these requirements.",
  matchedSkills: [
    {
      skill: "CSS",
      level: "Basic",
      details: "Completed introductory CSS course",
    },
  ],
  missingSkills: [
    {
      skill: "UX/UI Design Principles",
      importance: "Critical",
      recommendation: "Complete a comprehensive UX/UI design course",
    },
    {
      skill: "Project Leadership",
      importance: "High",
      recommendation: "Gain experience leading design projects through internships or freelance work",
    },
    {
      skill: "Front-end Programming",
      importance: "Medium",
      recommendation: "Learn HTML, JavaScript, and modern front-end frameworks",
    },
  ],
  recommendedCourses: [
    {
      id: "1",
      title: "Advanced Typography Techniques Techniques",
      instructor: "Emily Chen",
      provider: "Udemy",
      duration: "6h 24m",
      thumbnail: "/placeholder.svg",
      rating: 4.8,
      reviewCount: 12453,
      studentCount: 85632,
      badge: "bestseller" as const,
      socialProof: "326+ enrolled in the last week",
      price: {
        current: 49.99,
        original: 199.99,
      },
      link: "#",
    },
    {
      id: "2",
      title: "AI Prototyping Masterclass",
      instructor: "Michael Brown",
      provider: "Coursera",
      duration: "8h 15m",
      thumbnail: "/placeholder.svg",
      rating: 4.7,
      reviewCount: 8765,
      studentCount: 42198,
      badge: "hot" as const,
      socialProof: "Popular among professionals like you",
      price: {
        current: 59.99,
        original: 179.99,
      },
      link: "#",
    },
    {
      id: "3",
      title: "Figma: Zero to Hero",
      instructor: "Sarah Johnson",
      provider: "Codecademy",
      duration: "11h 45m",
      thumbnail: "/placeholder.svg",
      rating: 4.9,
      reviewCount: 15678,
      studentCount: 93421,
      badge: "highest" as const,
      socialProof: "45,216 learners in your industry enrolled",
      price: {
        current: 69.99,
        original: 229.99,
      },
      link: "#",
    },
  ],
  compatibility: {
    strengths: [
      "Your current enrollment in the 'Learn CSS' path is a good start as CSS is a fundamental skill for web design and development.",
    ],
    areasOfImprovement: [
      "You should consider completing the 'Learn HTML' and 'Learn JavaScript' paths to strengthen your front-end development skills, which are crucial for a UX/UI design role.",
    ],
    requiredSkills: [
      "Business Sales",
      "First Point of Contact",
      "Telephone Sales",
      "Outbound Call Centre",
      "Strategic Analysis",
      "Customer Success",
      "Complaint Resolution",
      "Needs Analysis",
      "Search Engine Optimisation",
      "Activation",
    ],
    userSkills: ["Business Sales", "First Point of Contact", "Telephone Sales", "Outbound Call Centre"],
  },
}

export default function ReportPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Job Readiness Checker
            </Link>
          </div>

          {/* Company and Position */}
          <div className="space-y-4">
            <div className="h-12 w-24 bg-gray-200 rounded" />
            <div>
              <h1 className="text-2xl font-bold">{mockReport.position}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <span>Powered by OpenAI</span>
                <span>•</span>
                <span>Report generated on {mockReport.date}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button>Apply for job</Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">Overview</h2>
                <p className="text-muted-foreground">{mockReport.overview}</p>
              </section>

              <JobCompatibility
                strengths={mockReport.compatibility.strengths}
                areasOfImprovement={mockReport.compatibility.areasOfImprovement}
                requiredSkills={mockReport.compatibility.requiredSkills}
                userSkills={mockReport.compatibility.userSkills}
              />

              <SkillsBreakdown
                matchedSkills={mockReport.matchedSkills}
                missingSkills={mockReport.missingSkills}
                recommendedCourses={mockReport.recommendedCourses}
              />
            </div>

            <div>
              <div className="sticky top-8">
                <CircularProgress value={mockReport.score} maxValue={10} label="Keep going" size={240} />
                <div className="mt-2 text-center">
                  <Link href="#" className="text-sm text-blue-600 hover:underline">
                    About this percentage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

