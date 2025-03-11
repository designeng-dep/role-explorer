import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CompatibilityProps {
  strengths: string[]
  areasOfImprovement: string[]
  requiredSkills: string[]
  userSkills: string[]
}

export default function JobCompatibility({
  strengths,
  areasOfImprovement,
  requiredSkills,
  userSkills,
}: CompatibilityProps) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-6">Compatibility</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Strengths</h3>
            <p className="text-muted-foreground mb-4">
              As you look for a position, lean on your strengths to find the best job fit.
            </p>
            <Card>
              <CardContent className="p-4">
                {strengths.map((strength, index) => (
                  <p key={index} className="text-sm leading-relaxed">
                    {strength}
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Areas of improvement</h3>
            <p className="text-muted-foreground mb-4">
              Stay on track — focus on your most commonly noted areas of improvement.
            </p>
            <Card>
              <CardContent className="p-4">
                {areasOfImprovement.map((area, index) => (
                  <p key={index} className="text-sm leading-relaxed">
                    {area}
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Skills and experience employers are looking for</h2>
        <p className="text-muted-foreground mb-6">
          Having the right skills and experience can make you an in-demand applicant. Employers are looking for job
          seekers with expertise in the following areas.
        </p>

        <div className="flex flex-wrap gap-3">
          {requiredSkills.map((skill) => (
            <Button key={skill} variant="outline" className="h-auto py-2 px-4">
              {skill}
              <Plus className="w-4 h-4 ml-2" />
            </Button>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Skills in your Skills Passport Profile</h2>
          <Button variant="ghost" size="icon">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-3">
          {userSkills.map((skill) => (
            <Button key={skill} variant="outline" className="h-auto py-2 px-4">
              {skill}
              <Plus className="w-4 h-4 ml-2" />
            </Button>
          ))}
        </div>
      </section>
    </div>
  )
}

