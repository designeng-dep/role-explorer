import RoleExplorer from "@/components/role-explorer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">

        <div className="space-y-12">
          <RoleExplorer />
        </div>
      </div>
    </main>
  )
}

