import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle } from "lucide-react"
import StarRating from "./star-rating"
import CourseBadge from "./course-badge"

interface Skill {
  skill: string
  level?: string
  details?: string
  importance?: string
  recommendation?: string
}

interface Course {
  id: string
  title: string
  instructor: string
  provider: string
  duration: string
  thumbnail: string
  rating: number
  reviewCount: number
  studentCount: number
  badge?: "bestseller" | "hot" | "highest"
  socialProof: string
  price: {
    current: number
    original: number
  }
  link: string
}

interface SkillsBreakdownProps {
  matchedSkills: Skill[]
  missingSkills: Skill[]
  recommendedCourses: Course[]
}

export default function SkillsBreakdown({ matchedSkills, missingSkills, recommendedCourses }: SkillsBreakdownProps) {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-4">Skills Breakdown</h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Matched Skills based on Skills Passport</CardTitle>
              <CardDescription>Skills that align with the job requirements</CardDescription>
            </CardHeader>
            <CardContent>
              {matchedSkills.map((skill, index) => (
                <div key={index} className="flex items-start gap-3 py-3 border-b last:border-0">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium">{skill.skill}</div>
                    <div className="text-sm text-muted-foreground mt-1">{skill.details}</div>
                    <Badge variant="secondary" className="mt-2">
                      {skill.level}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Missing Skills</CardTitle>
              <CardDescription>Skills you need to develop for this role</CardDescription>
            </CardHeader>
            <CardContent>
              {missingSkills.map((skill, index) => (
                <div key={index} className="flex items-start gap-3 py-3 border-b last:border-0">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <div className="font-medium">{skill.skill}</div>
                    <div className="text-sm text-muted-foreground mt-1">{skill.recommendation}</div>
                    <Badge variant="secondary" className="mt-2">
                      {skill.importance} Priority
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Recommended for you in UX Design</h2>
          <p className="text-muted-foreground mt-1">Based on your interests and career goals</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedCourses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <div className="relative">
                <div className="aspect-[16/9] bg-gray-100" />
                {course.badge && (
                  <div className="absolute top-2 left-2">
                    <CourseBadge type={course.badge} />
                  </div>
                )}
              </div>
              <CardContent className="flex flex-col flex-grow p-4">
                <div className="space-y-2 flex-grow">
                  <StarRating rating={course.rating} reviewCount={course.reviewCount} />

                  <div>
                    <h3 className="font-semibold text-base line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.instructor}</p>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {course.studentCount.toLocaleString()} students • {course.duration}
                  </div>

                  {course.socialProof && (
                    <div className="bg-green-50 text-green-700 text-xs py-1 px-2 rounded">{course.socialProof}</div>
                  )}

                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold">${course.price.current}</span>
                    {course.price.original > course.price.current && (
                      <span className="text-xs text-muted-foreground line-through">${course.price.original}</span>
                    )}
                  </div>
                </div>

                <Button className="w-full mt-4" size="sm" asChild>
                  <a href={course.link}>Enroll course</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

