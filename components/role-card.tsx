import { Card, CardContent } from "@/components/ui/card"

interface Role {
  id: number
  title: string
  description: string
  interests: string
  salary: number
  openings: number
  credentials: string[]
  category: string
}

interface RoleCardProps {
  role: Role
}

export default function RoleCard({ role }: RoleCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[2/1] bg-gray-100" />
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2">{role.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{role.description}</p>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-1">If you like:</p>
            <p className="text-sm text-muted-foreground">{role.interests}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">SGD {role.salary.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">median salary</p>
            </div>
            <div>
              <p className="font-semibold">{role.openings.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">roles available</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Credentials</p>
            <div className="space-y-1">
              {role.credentials.map((credential, index) => (
                <p key={index} className="text-sm text-blue-600 hover:underline cursor-pointer">
                  {credential}
                </p>
              ))}
              <p className="text-sm text-blue-600 hover:underline cursor-pointer">+ 3 more</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

