import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import SkillsBreakdown from "./skills-breakdown"
import JobCompatibility from "./job-compatibility"
import StarRating from "./star-rating"

interface Course {
  id: number
  title: string
  provider: string
  rating: number
  reviewCount: number
  duration: string
  level: string
  price: number
  skills: string[]
}

interface Role {
  id: number
  title: string
  description: string
  interests: string
  salary: number
  openings: number
  credentials: string[]
  category: string
  skills?: {
    technical: string[]
    soft: string[]
  }
  courses?: Course[]
}

interface RoleDetailProps {
  role: Role
  onBack: () => void
}

// Mock data for courses
const mockCourses: Course[] = [
  {
    id: 1,
    title: "AI Fundamentals & Machine Learning",
    provider: "Coursera",
    rating: 4.8,
    reviewCount: 2450,
    duration: "12 weeks",
    level: "Intermediate",
    price: 99,
    skills: ["Python", "Machine Learning", "Neural Networks"]
  },
  {
    id: 2,
    title: "Deep Learning Specialization",
    provider: "Udemy",
    rating: 4.7,
    reviewCount: 1847,
    duration: "16 weeks",
    level: "Advanced",
    price: 129,
    skills: ["TensorFlow", "Deep Learning", "Computer Vision"]
  },
  {
    id: 3,
    title: "Natural Language Processing with Python",
    provider: "edX",
    rating: 4.6,
    reviewCount: 1420,
    duration: "8 weeks",
    level: "Intermediate",
    price: 79,
    skills: ["NLP", "Python", "Text Analysis"]
  }
]

// Mock data for skills
const mockSkills = {
  technical: ["Python", "TensorFlow", "Machine Learning", "Deep Learning", "Neural Networks", "NLP", "Computer Vision"],
  soft: ["Problem Solving", "Critical Thinking", "Communication", "Teamwork", "Adaptability"]
}

// Mock data for skills breakdown
const mockMatchedSkills = [
  { skill: "Python", level: "Advanced", details: "Core programming language for AI development" },
  { skill: "Machine Learning", level: "Intermediate", details: "Building and training ML models" },
  { skill: "Deep Learning", level: "Intermediate", details: "Neural network architecture and training" }
];

const mockMissingSkills = [
  { skill: "Kubernetes", level: "Beginner", details: "Container orchestration for AI deployments" },
  { skill: "MLOps", level: "Intermediate", details: "Operationalizing ML workflows" }
];

const mockRecommendedCourses = [
  {
    id: "1",
    title: "MLOps Fundamentals",
    instructor: "Dr. Jane Smith",
    provider: "Coursera",
    duration: "8 weeks",
    thumbnail: "/course1.jpg",
    rating: 4.7,
    reviewCount: 1250,
    studentCount: 15000,
    badge: "bestseller" as const,
    socialProof: "Used by engineers at Google and Microsoft",
    price: {
      current: 89,
      original: 129
    },
    link: "#"
  },
  {
    id: "2",
    title: "Kubernetes for ML Engineers",
    instructor: "John Davis",
    provider: "Udemy",
    duration: "6 weeks",
    thumbnail: "/course2.jpg",
    rating: 4.5,
    reviewCount: 850,
    studentCount: 9000,
    badge: "hot" as const,
    socialProof: "Trending among AI professionals",
    price: {
      current: 69,
      original: 99
    },
    link: "#"
  }
];

// Mock data for job compatibility
const mockStrengths = [
  "Strong foundation in Python programming",
  "Experience with machine learning algorithms",
  "Understanding of neural networks"
];

const mockAreasOfImprovement = [
  "Cloud deployment of AI models",
  "MLOps and CI/CD for machine learning",
  "Containerization with Docker and Kubernetes"
];

const mockRequiredSkills = [
  "Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning", 
  "Computer Vision", "NLP", "MLOps", "Kubernetes"
];

const mockUserSkills = [
  "Python", "TensorFlow", "Machine Learning", "Deep Learning", "Computer Vision"
];

export default function RoleDetail({ role, onBack }: RoleDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")
  
  // Enhance the role with mock data if not provided
  const enhancedRole = {
    ...role,
    skills: role.skills || mockSkills,
    courses: role.courses || mockCourses
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          Back to Roles
        </Button>
        <h1 className="text-2xl font-bold text-[#1a0b47]">{enhancedRole.title}</h1>
        <Badge className="bg-[#1a0b47]">{enhancedRole.category}</Badge>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills & Requirements</TabsTrigger>
          <TabsTrigger value="courses">Recommended Courses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Role Description</h2>
              <p className="text-muted-foreground mb-6">{enhancedRole.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium mb-2">If you like:</h3>
                  <p className="text-muted-foreground">{enhancedRole.interests}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Credentials:</h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {enhancedRole.credentials.map((credential, index) => (
                      <li key={index}>{credential}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-[#1a0b47]">SGD {enhancedRole.salary.toLocaleString()}</p>
                  <p className="text-muted-foreground">Median Annual Salary</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-[#1a0b47]">{enhancedRole.openings.toLocaleString()}</p>
                  <p className="text-muted-foreground">Open Positions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
         
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
              <CardDescription>Technical and soft skills needed for this role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {enhancedRole.skills.technical.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {enhancedRole.skills.soft.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
           
           
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-6 mt-6">
          <div className="grid gap-6">
            {enhancedRole.courses.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="w-full md:w-2/3">
                      <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                      <p className="text-muted-foreground mb-4">Offered by {course.provider}</p>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <StarRating rating={course.rating} reviewCount={course.reviewCount} />
                        <span className="text-sm text-muted-foreground">({course.reviewCount} reviews)</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="bg-gray-100">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/3 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Duration</p>
                          <p className="font-medium">{course.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Level</p>
                          <p className="font-medium">{course.level}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xl font-bold text-[#1a0b47]">${course.price}</p>
                      </div>
                      
                      <Button className="w-full bg-[#1a0b47] hover:bg-[#2d1a6b]">Enroll Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 