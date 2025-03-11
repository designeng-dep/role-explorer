import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

// Role-specific skills data generator
const generateRoleSpecificData = (role: Role) => {
  // Default skills if none provided
  const skills = role.skills || {
    technical: ["Python", "TensorFlow", "Machine Learning", "Deep Learning", "Neural Networks", "NLP", "Computer Vision"],
    soft: ["Problem Solving", "Critical Thinking", "Communication", "Teamwork", "Adaptability"]
  };
  
  // Generate matched skills based on role category and title
  const matchedSkills = [];
  const missingSkills = [];
  
  // Digital & IT roles
  if (role.category === "Digital & IT") {
    if (role.title.includes("AI")) {
      matchedSkills.push(
        { skill: "Python", level: "Advanced", details: "Core programming language for AI development" },
        { skill: "Machine Learning", level: "Intermediate", details: "Building and training ML models" },
        { skill: "Deep Learning", level: "Intermediate", details: "Neural network architecture and training" }
      );
      missingSkills.push(
        { skill: "Kubernetes", level: "Beginner", details: "Container orchestration for AI deployments" },
        { skill: "MLOps", level: "Intermediate", details: "Operationalizing ML workflows" }
      );
    } else if (role.title.includes("Cyber")) {
      matchedSkills.push(
        { skill: "Network Security", level: "Advanced", details: "Securing network infrastructure" },
        { skill: "Threat Analysis", level: "Intermediate", details: "Identifying and analyzing security threats" },
        { skill: "Security Protocols", level: "Advanced", details: "Implementing security measures" }
      );
      missingSkills.push(
        { skill: "Cloud Security", level: "Intermediate", details: "Securing cloud-based applications and data" },
        { skill: "Penetration Testing", level: "Advanced", details: "Testing systems for vulnerabilities" }
      );
    } else {
      matchedSkills.push(
        { skill: "Programming", level: "Intermediate", details: "Software development fundamentals" },
        { skill: "System Design", level: "Intermediate", details: "Designing IT systems and architecture" }
      );
      missingSkills.push(
        { skill: "Cloud Computing", level: "Intermediate", details: "Working with cloud platforms" },
        { skill: "DevOps", level: "Beginner", details: "Integrating development and operations" }
      );
    }
  }
  // Green Economy roles
  else if (role.category === "Green Economy") {
    matchedSkills.push(
      { skill: "Sustainability Analysis", level: "Advanced", details: "Analyzing environmental impact" },
      { skill: "Environmental Regulations", level: "Intermediate", details: "Understanding green policies and compliance" }
    );
    missingSkills.push(
      { skill: "Carbon Footprint Assessment", level: "Intermediate", details: "Measuring and reducing carbon emissions" },
      { skill: "Renewable Energy Systems", level: "Beginner", details: "Knowledge of sustainable energy solutions" }
    );
  }
  // Care roles
  else if (role.category === "Care") {
    matchedSkills.push(
      { skill: "Patient Care", level: "Advanced", details: "Providing direct care to patients" },
      { skill: "Medical Terminology", level: "Intermediate", details: "Understanding healthcare vocabulary" }
    );
    missingSkills.push(
      { skill: "Healthcare Technology", level: "Beginner", details: "Using modern healthcare systems" },
      { skill: "Care Coordination", level: "Intermediate", details: "Managing patient care across providers" }
    );
  }
  // Data Science & Analytics roles
  else if (role.category === "Data Science & Analytics") {
    matchedSkills.push(
      { skill: "Data Analysis", level: "Advanced", details: "Extracting insights from data" },
      { skill: "Statistical Methods", level: "Intermediate", details: "Applying statistical techniques" },
      { skill: "Data Visualization", level: "Advanced", details: "Creating visual representations of data" }
    );
    missingSkills.push(
      { skill: "Big Data Technologies", level: "Intermediate", details: "Working with large-scale data systems" },
      { skill: "Machine Learning Operations", level: "Beginner", details: "Deploying and monitoring ML models" }
    );
  }
  // Business roles
  else if (role.category === "Business") {
    if (role.title.includes("Project Manager")) {
      matchedSkills.push(
        { skill: "Project Planning", level: "Advanced", details: "Planning and organizing projects" },
        { skill: "Team Leadership", level: "Intermediate", details: "Leading project teams effectively" },
        { skill: "Stakeholder Management", level: "Advanced", details: "Managing relationships with stakeholders" }
      );
      missingSkills.push(
        { skill: "Agile Methodologies", level: "Intermediate", details: "Implementing agile project management" },
        { skill: "Risk Management", level: "Intermediate", details: "Identifying and mitigating project risks" }
      );
    } else if (role.title.includes("E-Commerce")) {
      matchedSkills.push(
        { skill: "Digital Marketing", level: "Advanced", details: "Promoting products online" },
        { skill: "E-commerce Platforms", level: "Intermediate", details: "Managing online stores" },
        { skill: "Customer Experience", level: "Advanced", details: "Optimizing user journeys" }
      );
      missingSkills.push(
        { skill: "SEO Optimization", level: "Intermediate", details: "Improving search engine visibility" },
        { skill: "Conversion Rate Optimization", level: "Beginner", details: "Increasing website conversions" }
      );
    } else if (role.title.includes("Supply Chain")) {
      matchedSkills.push(
        { skill: "Inventory Management", level: "Advanced", details: "Optimizing inventory levels" },
        { skill: "Logistics Planning", level: "Intermediate", details: "Coordinating transportation and distribution" },
        { skill: "Supply Chain Analysis", level: "Advanced", details: "Analyzing supply chain performance" }
      );
      missingSkills.push(
        { skill: "Procurement Strategies", level: "Intermediate", details: "Strategic sourcing and vendor management" },
        { skill: "Supply Chain Technology", level: "Beginner", details: "Using supply chain management software" }
      );
    } else {
      matchedSkills.push(
        { skill: "Business Strategy", level: "Intermediate", details: "Developing business plans and strategies" },
        { skill: "Financial Analysis", level: "Intermediate", details: "Analyzing financial data and performance" }
      );
      missingSkills.push(
        { skill: "Market Research", level: "Beginner", details: "Researching market trends and opportunities" },
        { skill: "Business Development", level: "Intermediate", details: "Growing business through partnerships" }
      );
    }
  }
  // Default for any other category
  else {
    matchedSkills.push(
      { skill: skills.technical[0] || "Technical Skill", level: "Intermediate", details: "Core technical competency" },
      { skill: skills.soft[0] || "Soft Skill", level: "Advanced", details: "Essential interpersonal ability" }
    );
    missingSkills.push(
      { skill: "Advanced Technology", level: "Beginner", details: "Emerging technology in this field" },
      { skill: "Industry Certification", level: "Intermediate", details: "Recognized professional qualification" }
    );
  }
  
  // Generate role-specific courses
  const recommendedCourses = [
    {
      id: "1",
      title: `Advanced ${role.title} Skills`,
      instructor: "Dr. Jane Smith",
      provider: "Coursera",
      duration: "8 weeks",
      thumbnail: "/course1.jpg",
      rating: 4.7,
      reviewCount: 1250,
      studentCount: 15000,
      badge: "bestseller" as const,
      socialProof: `Used by professionals at top companies`,
      level: "Advanced",
      price: {
        current: 89,
        original: 129
      },
      link: "#"
    },
    {
      id: "2",
      title: `${role.category} Fundamentals`,
      instructor: "John Davis",
      provider: "Udemy",
      duration: "6 weeks",
      thumbnail: "/course2.jpg",
      rating: 4.5,
      reviewCount: 850,
      studentCount: 9000,
      badge: "hot" as const,
      socialProof: `Trending among ${role.category} professionals`,
      level: "Intermediate",
      price: {
        current: 69,
        original: 99
      },
      link: "#"
    }
  ];
  
  // Generate strengths based on technical skills
  const strengths = skills.technical.slice(0, 3).map(skill => 
    `Strong foundation in ${skill}`
  );
  
  // Generate areas of improvement based on missing skills
  const areasOfImprovement = missingSkills.map(item => 
    `Developing skills in ${item.skill}`
  );
  
  // Required skills combines technical and some additional skills
  const requiredSkills = [
    ...skills.technical,
    ...missingSkills.map(item => item.skill)
  ];
  
  // User skills are a subset of the required skills
  const userSkills = skills.technical.slice(0, Math.ceil(skills.technical.length * 0.7));
  
  return {
    matchedSkills,
    missingSkills,
    recommendedCourses,
    strengths,
    areasOfImprovement,
    requiredSkills,
    userSkills
  };
};

export default function RoleDetail({ role, onBack }: RoleDetailProps) {
  // Generate role-specific data first
  const roleSpecificData = useMemo(() => generateRoleSpecificData(role), [role]);
  
  // Then enhance the role with the generated data
  const enhancedRole = {
    ...role,
    skills: role.skills || mockSkills,
    // Use dynamically generated courses instead of static mockCourses
    courses: roleSpecificData.recommendedCourses.map((course, index) => ({
      id: index + 1,
      title: course.title,
      provider: course.provider,
      rating: course.rating,
      reviewCount: course.reviewCount,
      duration: course.duration,
      level: course.level,
      price: course.price.current,
      skills: role.category === "Digital & IT" && role.title.includes("AI") 
        ? ["AI", "Machine Learning", "Neural Networks"] 
        : role.category === "Digital & IT" && role.title.includes("Cyber")
        ? ["Network Security", "Threat Analysis", "Security Protocols"]
        : role.category === "Green Economy"
        ? ["Sustainability", "Environmental Analysis", "Green Policies"]
        : role.category === "Care"
        ? ["Patient Care", "Healthcare Systems", "Medical Terminology"]
        : role.category === "Data Science & Analytics"
        ? ["Data Analysis", "Statistical Methods", "Data Visualization"]
        : role.category === "Business" && role.title.includes("Project Manager")
        ? ["Project Planning", "Team Leadership", "Stakeholder Management"]
        : role.category === "Business" && role.title.includes("E-Commerce")
        ? ["Digital Marketing", "E-commerce Platforms", "Customer Experience"]
        : role.category === "Business" && role.title.includes("Supply Chain")
        ? ["Inventory Management", "Logistics Planning", "Supply Chain Analysis"]
        : ["Business Strategy", "Industry Knowledge", "Professional Skills"]
    }))
  };

  // Generate dynamic job market outlook data based on role
  const jobMarketData = {
    growthRate: role.category === "Digital & IT" || role.category === "Data Science & Analytics" 
      ? "+22% (Next 5 Years)" 
      : role.category === "Green Economy" 
      ? "+18% (Next 5 Years)"
      : role.category === "Care"
      ? "+15% (Next 5 Years)"
      : "+10% (Next 5 Years)",
    
    industryDemand: role.openings > 3000 
      ? "Very High" 
      : role.openings > 2000 
      ? "High" 
      : role.openings > 1000 
      ? "Moderate" 
      : "Steady",
    
    competitionLevel: role.category === "Digital & IT" && role.title.includes("AI")
      ? "High"
      : role.category === "Digital & IT" && role.title.includes("Cyber")
      ? "Moderate"
      : role.category === "Green Economy"
      ? "Low"
      : role.category === "Care"
      ? "Low"
      : role.category === "Data Science & Analytics"
      ? "High"
      : "Moderate"
  };

  return (
    <div className="space-y-8">
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

      {/* Overview Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-[#1a0b47]">Role Overview</h2>
        
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
        
        
      </section>

      {/* Skills Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-[#1a0b47]">Skills & Requirements</h2>
        
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
        
        <SkillsBreakdown 
          matchedSkills={roleSpecificData.matchedSkills}
          missingSkills={roleSpecificData.missingSkills}
          recommendedCourses={roleSpecificData.recommendedCourses}
        /> 
      </section>

      {/* Courses Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-[#1a0b47]">Recommended Courses / Credentials</h2>
        
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
                
                    <Button className="w-full bg-[#1a0b47] hover:bg-[#2d1a6b]">Learn more</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
} 