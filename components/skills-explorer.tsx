"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import SkillsList from "./skills-list"
import CourseList from "./course-list"
import JobList from "./job-list"

export default function SkillsExplorer() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would trigger an API call to fetch related skills
    console.log("Searching for:", searchTerm)
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter a job title or skill"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SkillsList selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills} />
        <CourseList selectedSkills={selectedSkills} />
        <JobList selectedSkills={selectedSkills} />
      </div>
    </div>
  )
}

