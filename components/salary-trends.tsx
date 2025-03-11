"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpIcon, ChevronDown, ChevronUp, Users, TrendingUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import TrendChart from "./trend-chart"

const industries = [
  "All industries",
  "Accounting",
  "Administration & Office Support",
  "Banking & Financial Services",
  "Call Centre & Customer Service",
  "Community Services & Development",
  "Construction",
  "Consulting & Strategy",
  "Design & Architecture",
  "Education & Training",
  "Engineering",
  "Farming, Animals & Conservation",
  "Government & Defence",
  "Healthcare & Medical",
  "Hospitality & Tourism",
  "Human Resources & Recruitment",
  "Insurance & Superannuation",
  "Legal",
  "Manufacturing, Transport & Logistics",
  "Marketing & Communications",
  "Mining, Resources & Energy",
  "Real Estate & Property",
  "Retail & Consumer Products",
  "Sales",
  "Sport & Recreation",
  "Trades & Services",
]

const mockTrendData = [
  { date: "Jan 5", value: 10 },
  { date: "Jan 12", value: 15 },
  { date: "Jan 19", value: 20 },
  { date: "Jan 26", value: 25 },
  { date: "Feb 2", value: 30 },
  { date: "Feb 9", value: 35 },
  { date: "Feb 16", value: 40 },
]

const jobTrends = [
  {
    industry: "Sales",
    title: "Appointment Setter",
    growth: 90.3,
    salary: 70985,
    trendData: mockTrendData,
    description:
      "Appointment setters have seen consistent growth in demand across the sales industry, with particular emphasis in B2B sectors.",
    requirements: [
      {
        skill: "Strong communication skills",
        popularity: 95,
        courses: ["Effective Communication for Sales Professionals", "Mastering the Art of Persuasion"],
      },
      {
        skill: "Experience with CRM software",
        popularity: 88,
        courses: ["Salesforce Fundamentals", "HubSpot CRM Mastery"],
      },
      {
        skill: "Sales experience preferred",
        popularity: 75,
        courses: ["Introduction to B2B Sales", "Closing Techniques for Sales Success"],
      },
    ],
  },
  {
    industry: "Hospitality & Tourism",
    title: "Artist",
    growth: 90.0,
    salary: 55050,
    trendData: mockTrendData,
    description:
      "Artists in the hospitality and tourism sector are experiencing a surge in opportunities, particularly those specializing in digital art and interactive installations.",
    requirements: [
      {
        skill: "Proficiency in relevant art forms",
        popularity: 92,
        courses: ["Digital Art for Beginners", "Interactive Installation Design"],
      },
      {
        skill: "Creativity and innovation",
        popularity: 85,
        courses: ["Creative Problem Solving", "Design Thinking for Artists"],
      },
      {
        skill: "Ability to work collaboratively",
        popularity: 78,
        courses: ["Teamwork and Collaboration", "Effective Communication for Creative Professionals"],
      },
    ],
  },
  {
    industry: "Construction",
    title: "Certifier",
    growth: 73.3,
    salary: 114317,
    trendData: mockTrendData,
    description:
      "Certifiers are in high demand due to increased regulatory scrutiny and the need for sustainable building practices.",
    requirements: [
      {
        skill: "Advanced Sustainable Building Practices",
        popularity: 98,
        courses: ["Sustainable Building Practices"],
      },
      {
        skill: "Advanced Building Codes",
        popularity: 90,
        courses: ["Building Codes and Regulations", "Advanced Building Codes"],
      },
      {
        skill: "Attention to detail",
        popularity: 82,
        courses: ["Quality Control in Construction", "Construction Documentation"],
      },
    ],
  },
  {
    industry: "Construction",
    title: "Building Supervisor",
    growth: 72.4,
    salary: 106840,
    trendData: mockTrendData,
    description:
      "Building supervisors are essential for managing construction projects efficiently and ensuring quality standards are met.",
    requirements: [
      {
        skill: "Construction Project Management",
        popularity: 95,
        courses: ["Leadership in Construction"],
      },
      {
        skill: "Leadership and Team Management",
        popularity: 88,
        courses: ["Effective Communication for Supervisors"],
      },
      {
        skill: "Conflict Resolution in Construction",
        popularity: 80,
        courses: ["Effective Conflict Resolution in Construction"],
      },
    ],
  },
  {
    industry: "Trades & Services",
    title: "Maintenance Operator",
    growth: 68.6,
    salary: 63877,
    trendData: mockTrendData,
    description:
      "Maintenance operators are crucial for keeping facilities and equipment running smoothly, with a growing emphasis on preventative maintenance.",
    requirements: [
      {
        skill: "Technical skills",
        popularity: 92,
        courses: ["Preventative Maintenance", "Troubleshooting and Repair"],
      },
      {
        skill: "Ability to troubleshoot",
        popularity: 85,
        courses: ["Troubleshooting and Repair", "Electrical Systems Maintenance"],
      },
      {
        skill: "Physical stamina",
        popularity: 78,
        courses: ["Workplace Safety", "Ergonomics for Maintenance Workers"],
      },
    ],
  },
]

export default function SalaryTrends() {
  const [selectedIndustry, setSelectedIndustry] = useState("All industries")
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <h2 className="text-xl font-semibold">Job & salary trends</h2>
        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Select an industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Industry</TableHead>
              <TableHead className="w-[200px]">Job title</TableHead>
              <TableHead className="w-[150px]">Growth rate</TableHead>
              <TableHead className="w-[150px]">Average salary</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobTrends.map((job, index) => (
              <TableRow key={index} className="cursor-pointer" onClick={() => toggleRow(index)}>
                <TableCell className="font-medium">{job.industry}</TableCell>
                <TableCell className="text-blue-600 hover:underline">{job.title}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowUpIcon className="w-4 h-4" />
                    {job.growth}%
                  </div>
                </TableCell>
                <TableCell>${job.salary.toLocaleString()}</TableCell>
                <TableCell>
                  {expandedRow === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {expandedRow !== null && (
        <div className="mt-4 p-6 bg-gray-50 rounded-lg">
          <TrendChart data={jobTrends[expandedRow].trendData} />
          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-medium mb-2">Overview</h4>
              <p className="text-muted-foreground">{jobTrends[expandedRow].description}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Skills Required</h4>
              <ul className="space-y-4">
                {jobTrends[expandedRow].requirements.map((req, i) => (
                  <li key={i} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{req.skill}</span>
                      <Badge variant="secondary" className="ml-2">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {req.popularity}% popular
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Recommended courses: </span>
                      {req.courses.join(", ")}
                    </div>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-blue-600">
                        <Users className="w-3 h-3 mr-1" />
                        {Math.floor(Math.random() * 1000) + 500} learners from your industry enrolled
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

