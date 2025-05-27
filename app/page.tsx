"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  GraduationCap,
  Code,
  Award,
  Users,
  ExternalLink,
  Download,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark)

    setIsDark(shouldBeDark)
    document.documentElement.classList.toggle("dark", shouldBeDark)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.classList.toggle("dark", newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
  }
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "research", label: "Research" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "activities", label: "Activities" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollPos = window.scrollY + 100

      sections.forEach((section) => {
        const element = section as HTMLElement
        if (scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(element.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold">
              Suryansh Sijwali
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section.id ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                <Sun className={`h-4 w-4 transition-all ${isDark ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`} />
                <Moon
                  className={`absolute h-4 w-4 transition-all ${isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
                />
              </Button>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 border-t"
            >
              <div className="flex flex-col space-y-2 pt-4">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left py-2 px-4 rounded-md transition-colors hover:bg-accent ${
                      activeSection === section.id ? "bg-accent text-primary" : ""
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        </motion.div>

        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              Suryansh Sijwali
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8"
            >
              Computer Science & Physics Student | AI Researcher | Published Author
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                State College, PA
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                sss6371@psu.edu
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4" />
                (929) 631-1429
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button onClick={() => scrollToSection("research")} size="lg">
                View Research
              </Button>
              <Button variant="outline" size="lg">
                <Download className="h-4 w-4 mr-2" />
                Download CV
              </Button>
              <Button variant="outline" size="lg">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Bachelor of Science Degree</h3>
                      <p className="text-muted-foreground">The Pennsylvania State University</p>
                      <p className="text-sm text-muted-foreground">Expected May 2027</p>
                    </div>

                    <div>
                      <h4 className="font-medium">Majors:</h4>
                      <p className="text-sm">Computer Science, Physics (Computational)</p>
                    </div>

                    <div>
                      <h4 className="font-medium">Minors:</h4>
                      <p className="text-sm">
                        Computer Engineering, Mathematics, Cybersecurity Computational Foundations
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium">Honors:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="secondary">Dean's List (All Semesters)</Badge>
                        <Badge variant="secondary">President Walker Award</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Published Research</h3>
                      <p className="text-sm text-muted-foreground">
                        Accepted at IEEE AITest 2025 with 31.6% acceptance rate
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">Research Excellence</h3>
                      <p className="text-sm text-muted-foreground">
                        83.7% accuracy in LLM-powered performance bug detection
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">Leadership</h3>
                      <p className="text-sm text-muted-foreground">
                        President of Cyber-Lions Club, IEEE Lead Assistant
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">Innovation</h3>
                      <p className="text-sm text-muted-foreground">Co-founder of Wynlabs.ai and OpenScholar Hub</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Research & Publications</h2>

            <div className="space-y-8">
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Fixing Performance Bugs Through LLM Explanations</CardTitle>
                      <CardDescription>Jan 2025 - Jul 2025</CardDescription>
                    </div>
                    <Badge variant="default">Published</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">
                      <strong>Authors:</strong> Suryansh Singh Sijwali, Angela Marie Colom, Anbi Guo, and Suman Saha
                    </p>
                    <p className="text-sm">
                      <strong>Accepted at:</strong> IEEE AITest 2025 (CISOSE) • Acceptance Rate: 31.6%
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Key Achievements:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Created novel LLM-powered framework for performance bug detection</li>
                          <li>• Built dataset of 490 Java performance bugs</li>
                          <li>• Achieved 83.7% accuracy in bug detection</li>
                          <li>• Outperformed baseline models by over 12%</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Technical Impact:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Developed 5-category bug taxonomy</li>
                          <li>• 79.6% efficacy in code improvement suggestions</li>
                          <li>• 87.8% correctness in recommendations</li>
                          <li>• Applied LLM fine-tuning and prompt engineering</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Ongoing Research Extension</CardTitle>
                  <CardDescription>Summer 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">• Developing experimental dataset for performance bugs in C code</p>
                    <p className="text-sm">• Working to generalize LLM bug diagnosis across programming languages</p>
                    <p className="text-sm">
                      • Building universal platform to detect and mitigate performance issues using LLMs
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">UAV-based Disaster Management Research</CardTitle>
                  <CardDescription>Jun 2024 - Jul 2024 • REU Program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">• Collaborated on multidisciplinary project with Dr. Seth Wolpert</p>
                    <p className="text-sm">
                      • Designed UAV-based disaster mitigation systems using LiDAR, SLAM, and object detection
                    </p>
                    <p className="text-sm">
                      • Developed optical communication solutions for real-time aerial data exchange
                    </p>
                    <p className="text-sm">
                      • Presented findings at symposium, addressing technical and ethical implications
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Experience</h2>

            <Tabs defaultValue="internships" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="internships">Internships</TabsTrigger>
                <TabsTrigger value="teaching">Teaching & Mentoring</TabsTrigger>
              </TabsList>

              <TabsContent value="internships" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Full-Stack Mobile App Developer (Intern)</CardTitle>
                        <CardDescription>Flourish: Grow with Self-Care • Feb 2025 - Present</CardDescription>
                      </div>
                      <Badge>Current</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Collaborate with design team to implement frontend UI elements from Figma wireframes</li>
                      <li>
                        • Develop, test, and maintain frontend code for seamless user experience across iOS and Android
                      </li>
                      <li>• Assist with backend architecture, database design, and API integration</li>
                      <li>• Optimize application for performance, scalability, and reliability</li>
                      <li>• Coordinate with cross-functional teams to iterate features based on user feedback</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="teaching" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Jump Start Program Mentor</CardTitle>
                    <CardDescription>
                      Center for Engineering Outreach and Inclusion, Penn State • May 2025 - Jun 2025
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Serve as Teaching Assistant and facilitator for PHYS 212 (Electricity and Magnetism)</li>
                      <li>• Provide academic and social mentorship to incoming engineering students</li>
                      <li>• Collaborate with instructors, peers, and program staff on planning and student support</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Peer Tutor</CardTitle>
                    <CardDescription>
                      Russell E. Horn Sr. Learning Center, Penn State Harrisburg • Aug 2024 - Dec 2024
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • Tutored Mathematics, Physics, and Computer Science students one-on-one and in small groups
                      </li>
                      <li>• Created tailored academic resources and strategies for student success</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>EECS Peer Mentor</CardTitle>
                    <CardDescription>Penn State University • Jan 2025 - May 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Mentored five first-year students in EECS through structured academic support</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        Wynlabs.ai
                      </CardTitle>
                      <CardDescription>Co-founding Member</CardDescription>
                    </div>
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Collaborating with a cross-institutional team to build an AI-powered copilot for the manufacturing
                    industry.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>• Focusing on real-time workflow optimization</p>
                    <p>• Developing predictive analytics capabilities</p>
                    <p>• Creating intuitive user interfaces</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline">AI/ML</Badge>
                    <Badge variant="outline">Manufacturing</Badge>
                    <Badge variant="outline">Analytics</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        OpenScholar Hub
                      </CardTitle>
                      <CardDescription>Founder</CardDescription>
                    </div>
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Developing a centralized research collaboration platform to support networking, data sharing, and
                    project management.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>• Built with full-stack framework</p>
                    <p>• Expanding into student-led team</p>
                    <p>• Targeting pilot integration with Penn State Research Circle by Fall 2025</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline">Full-Stack</Badge>
                    <Badge variant="outline">Research</Badge>
                    <Badge variant="outline">Collaboration</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Programming Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "Java", "C", "C++", "Golang", "JavaScript"].map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Frameworks & Libraries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["React.js", "Next.js", "Node.js", "Express.js", "Flask", "TensorFlow", "PyTorch"].map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tools & Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Git", "Docker", "AWS", "Firebase", "RESTful APIs", "Figma"].map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Activities & Leadership</h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>President, Cyber-Lions Club</CardTitle>
                  <CardDescription>Penn State Harrisburg • Aug 2024 - Dec 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>
                      • Spearheaded cybersecurity initiatives and promoted awareness through workshops, CTFs, and
                      technical talks
                    </li>
                    <li>
                      • Organized and led weekly club meetings, fostering member engagement and technical development
                    </li>
                    <li>
                      • Collaborated with campus IT and faculty to execute university-wide cybersecurity outreach events
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Computer Science Lead Assistant</CardTitle>
                  <CardDescription>IEEE Student Branch, Penn State Harrisburg • Jan 2024 - Dec 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Co-developed the HackPSH hackathon platform using Next.js and Supabase</li>
                    <li>• Facilitated technical workshops on algorithms, data structures, and web development</li>
                    <li>
                      • Contributed to control systems and data analytics teams for IEEE PSH Radio Telescope project
                    </li>
                    <li>• Promoted community engagement and technical growth among peers in IEEE-led initiatives</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Service</CardTitle>
                    <CardDescription>Various Organizations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Envision Cleveland - Week-long service program addressing urban challenges</li>
                      <li>• STEM Instructor at Middletown Public Library</li>
                      <li>• Taught circuits, Arduino fundamentals, and programming</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Awards & Recognition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Winner, HackPSH IEEE Hackathon (Fall 2023)</li>
                      <li>• Dean's List (All Semesters)</li>
                      <li>• President Walker Award</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
            <p className="text-muted-foreground mb-6">
              Interested in collaboration, research opportunities, or just want to chat about technology?
            </p>
            <div className="flex justify-center gap-4">
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                Email Me
              </Button>
              <Button variant="outline">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-8">© 2025 Suryansh Sijwali. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
