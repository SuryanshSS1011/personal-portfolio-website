import { 
  Music, Languages, MapPin, Globe, 
  Gamepad2, Trophy, GraduationCap 
} from "lucide-react"

export const personalInfo = {
  name: "Suryansh Sijwali",
  roles: [
    "Full-Stack Developer",
    "Multi-Domain AI Researcher", 
    "Systems Thinker",
    "Published Author",
    "SaaS Designer"
  ],
  description: "Architecting intelligent systems that solve complex problems — where research meets implementation and user experience drives innovation",
  cvPath: "/Suryansh-Sijwali-CV.pdf",
  cvFileName: "Suryansh-Sijwali-CV.pdf",
}

export const education = {
  degree: "Bachelor of Science",
  institution: "The Pennsylvania State University",
  expectedGraduation: "Expected May 2027",
  colleges: [
    { name: "Schreyer Honors College", color: "primary" },
    { name: "College of Engineering", color: "primary" },
    { name: "Eberly College of Science", color: "primary" },
  ],
  majors: "Computer Science • Computational Physics",
  minors: "Computer Engineering • Mathematics • Cybersecurity",
  recognitions: [
    { name: "Dean's List", variant: "primary" },
    { name: "President Walker Award", variant: "secondary" },
  ],
}

export const interests = [
  { name: "Music & Songwriting", icon: Music, gradient: "primary" },
  { name: "Linguistics", icon: Languages, gradient: "secondary" },
  { name: "GIS & Mapping", icon: MapPin, gradient: "primary" },
  { name: "Cultural Studies", icon: Globe, gradient: "secondary" },
  { name: "Racket Sports", icon: Gamepad2, gradient: "primary" },
  { name: "Chess", icon: Trophy, gradient: "secondary" },
]

export const philosophy = "I believe in the power of interdisciplinary thinking—bringing together technology, research, and diverse cultural perspectives to create solutions that truly matter."