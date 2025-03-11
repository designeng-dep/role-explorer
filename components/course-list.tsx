import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const mockCourses = [
  { id: 1, title: "Introduction to JavaScript", provider: "Codecademy", skills: ["JavaScript"] },
  { id: 2, title: "React - The Complete Guide", provider: "Udemy", skills: ["React", "JavaScript"] },
  { id: 3, title: "Machine Learning A-Z", provider: "Coursera", skills: ["Python", "Machine Learning"] },
  { id: 4, title: "UX Design Fundamentals", provider: "Interaction Design Foundation", skills: ["UX Design"] },
  { id: 5, title: "Digital Marketing Specialization", provider: "Google", skills: ["Digital Marketing"] },
]

export default function CourseList({ selectedSkills }) {
  const filteredCourses =
    selectedSkills.length > 0
      ? mockCourses.filter((course) => course.skills.some((skill) => selectedSkills.includes(skill)))
      : mockCourses

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Recommended Courses</h2>
      <div className="space-y-4">
        {filteredCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.provider}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {course.skills.map((skill) => (
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

