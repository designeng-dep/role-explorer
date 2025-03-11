import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const mockJobs = [
  { id: 1, title: "Frontend Developer", company: "TechCorp", skills: ["JavaScript", "React"] },
  { id: 2, title: "Data Scientist", company: "DataCo", skills: ["Python", "Machine Learning"] },
  { id: 3, title: "UX Designer", company: "DesignHub", skills: ["UX Design"] },
  { id: 4, title: "Digital Marketing Specialist", company: "MarketPro", skills: ["Digital Marketing"] },
  { id: 5, title: "Full Stack Developer", company: "WebSolutions", skills: ["JavaScript", "React", "Node.js"] },
]

export default function JobList({ selectedSkills }) {
  const filteredJobs =
    selectedSkills.length > 0
      ? mockJobs.filter((job) => job.skills.some((skill) => selectedSkills.includes(skill)))
      : mockJobs

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Related Job Openings</h2>
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>{job.company}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span key={skill} className="text-sm bg-muted px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

