"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import RoleCard from "./role-card"

const categories = [
  "All",
  "Digital & IT",
  "Green Economy",
  "Care",
  "Data Science & Analytics",
  "Business",
];

const roles = [
  {
    id: 1,
    title: "AI Specialist",
    description:
      "An AI Specialist develops and deploys AI models, driving automation and innovation across various industries.",
    interests:
      "building AI models, working with machine learning, deep learning, and AI-driven automation",
    salary: 120000,
    openings: 2450,
    credentials: ["Certified AI Engineer", "Deep Learning Specialization"],
    category: "Digital & IT",
  },
  {
    id: 2,
    title: "Cyber Security Analyst",
    description:
      "A Cyber Security Analyst monitors IT systems, analyses threats, finds vulnerabilities, and implements security measures to protect data.",
    interests:
      "securing networks and data, identifying vulnerabilities, analyzing cyber threats, and implementing security protocols",
    salary: 95000,
    openings: 1847,
    credentials: ["AWS Cybersecurity", "Microsoft Cybersecurity Analyst"],
    category: "Digital & IT",
  },
  {
    id: 3,
    title: "Sustainability Consultant",
    description:
      "A Sustainability Consultant helps organizations implement environmentally friendly strategies and comply with green regulations.",
    interests:
      "driving sustainable practices, managing carbon footprints, consulting on environmental policies",
    salary: 95000,
    openings: 1420,
    credentials: ["Certified Sustainability Professional", "Green Building Certifications"],
    category: "Green Economy",
  },
  {
    id: 4,
    title: "Healthcare Support Specialist",
    description:
      "A Healthcare Support Specialist assists in patient care, medical technology use, and healthcare administration.",
    interests:
      "assisting in patient care, working with medical technology, supporting healthcare professionals",
    salary: 65000,
    openings: 3215,
    credentials: ["Certified Patient Care Technician", "Medical Assistant Certification"],
    category: "Care",
  },
  {
    id: 5,
    title: "Data Scientist",
    description:
      "A Data Scientist extracts insights from large datasets, applies machine learning, and supports data-driven decision-making.",
    interests:
      "analyzing big data, developing predictive models, coding in Python or R",
    salary: 110000,
    openings: 3890,
    credentials: ["Data Science Certification", "Machine Learning Engineer"],
    category: "Data Science & Analytics",
  },
  {
    id: 6,
    title: "Project Manager",
    description:
      "A Project Manager plans, coordinates, and executes projects to ensure timely and budget-friendly delivery.",
    interests:
      "leading teams, managing project resources, optimizing workflow, and mitigating risks",
    salary: 96000,
    openings: 30236,
    credentials: ["PMP Certification", "Agile Project Management"],
    category: "Business",
  },
  {
    id: 7,
    title: "E-Commerce Manager",
    description:
      "An E-Commerce Manager oversees online sales operations, digital marketing, and customer experience management.",
    interests:
      "driving online sales, optimizing digital customer journeys, managing digital marketing campaigns",
    salary: 88000,
    openings: 2570,
    credentials: ["E-Commerce Business Strategy", "Google Ads Certification"],
    category: "Business",
  },
  {
    id: 8,
    title: "Supply Chain Analyst",
    description:
      "A Supply Chain Analyst optimizes inventory, logistics, and procurement processes for efficient supply chain management.",
    interests:
      "analyzing supply chain data, managing logistics operations, optimizing inventory",
    salary: 89000,
    openings: 1750,
    credentials: ["Certified Supply Chain Analyst", "Logistics and Operations Management"],
    category: "Business",
  },
];



export default function RoleExplorer() {
  const [level, setLevel] = useState("Beginner")
  const [category, setCategory] = useState("All")

  const filteredRoles = roles.filter((role) => category === "All" || role.category === category)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1a0b47] mb-2">Explore roles</h1>
        <p className="text-muted-foreground">
          Advance in your career with recognized credentials across levels. Choose from 40+ roles
        </p>
      </div>

      <div className="flex flex-wrap gap-4 items-center"> 

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "default" : "outline"}
              onClick={() => setCategory(cat)}
              className={category === cat ? "bg-[#1a0b47]" : "bg-white"}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRoles.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>
    </div>
  )
}

