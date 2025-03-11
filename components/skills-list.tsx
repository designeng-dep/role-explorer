import { Badge } from "@/components/ui/badge"

const mockSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Data Analysis",
  "Machine Learning",
  "UX Design",
  "Project Management",
  "Digital Marketing",
]

export default function SkillsList({ selectedSkills, setSelectedSkills }) {
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">In-Demand Skills</h2>
      <div className="flex flex-wrap gap-2">
        {mockSkills.map((skill) => (
          <Badge
            key={skill}
            variant={selectedSkills.includes(skill) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleSkill(skill)}
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  )
}

