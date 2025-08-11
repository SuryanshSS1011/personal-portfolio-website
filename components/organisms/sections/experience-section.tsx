"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms"
import { Badge } from "@/components/atoms"
import { Tabs, TabsContent, TabsList, TabsTrigger, IconTextListItem, ContentCard, TimelineCard } from "@/components/molecules"
import { SectionWrapper } from "@/components/organisms"
import { Coffee, BookOpen, Zap, ChevronLeft, ChevronRight } from "lucide-react"

export const ExperienceSection = () => {
  const [activeTab, setActiveTab] = useState("internships")
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  
  const tabs = ["internships", "teaching", "externships", "timeline"]
  const currentIndex = tabs.indexOf(activeTab)
  
  const minSwipeDistance = 50
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
    if (isRightSwipe && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }
  
  const goToPrevTab = () => {
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }
  
  const goToNextTab = () => {
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  return (
    <SectionWrapper id="experience" title="Experience" maxWidth="6xl">
      <div 
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative"
      >
        {/* Mobile Navigation Arrows */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <button
            onClick={goToPrevTab}
            disabled={currentIndex === 0}
            className="p-3 rounded-full bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary capitalize">
              {activeTab === 'teaching' ? 'Teaching & Mentoring' : activeTab}
            </div>
            <span className="text-xs text-muted-foreground">
              {currentIndex + 1} of {tabs.length}
            </span>
          </div>
          <button
            onClick={goToNextTab}
            disabled={currentIndex === tabs.length - 1}
            className="p-3 rounded-full bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>
        </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Desktop tabs only */}
            <TabsList className="hidden md:grid w-full grid-cols-4 bg-primary/10 border border-primary/20">
              <TabsTrigger
                value="internships"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Internships
              </TabsTrigger>
              <TabsTrigger
                value="teaching"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Teaching & Mentoring
              </TabsTrigger>
              <TabsTrigger
                value="externships"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Externships
              </TabsTrigger>
              <TabsTrigger
                value="timeline"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Timeline
              </TabsTrigger>
            </TabsList>

            <TabsContent value="internships" className="space-y-6">
              <ContentCard
                id="leechy-internship"
                title="Software Engineer (Intern)"
                subtitle="Leechy LLC"
                date="Jun 2025 - Present"
                badge={{
                  text: "Current",
                  className: "bg-success/20 text-success border-success/30"
                }}
                items={[
                  "Led a full UI/UX redesign of the Leechy mobile app (Capacitor + React), applying atomic design patterns and a centralized theming system to boost consistency and developer productivity",
                  "Performed end-to-end QA analysis and performance profiling, uncovering critical bottlenecks in rendering and network workflows",
                  "Engineered and deployed optimization strategies—code-splitting, asset compression, and lazy loading—that cut key screen load times by 80%",
                  "Designed, trained, and integrated a personalized Leechy AI chatbot into the mobile app, building NLP pipelines and fine-tuning language models to deliver contextual, on-demand user support",
                ]}
                icon={Coffee}
                index={0}
                animation={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6 },
                  whileHover: { scale: 1.02 }
                }}
              />

              <ContentCard
                id="flourish-internship"
                title="Full-Stack Mobile App Developer (Intern)"
                subtitle="Flourish: Grow with Self-Care"
                date="Feb 2025 - Jun 2025"
                items={[
                  "Collaborated with design team to implement frontend UI elements from Figma wireframes",
                  "Developed, tested, and maintained frontend code for seamless user experience across iOS and Android",
                  "Assisted with backend architecture, database design, and API integration",
                  "Optimized application for performance, scalability, and reliability",
                  "Coordinated with cross-functional teams to iterate features based on user feedback",
                ]}
                icon={Coffee}
                index={1}
                animation={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.1 },
                  whileHover: { scale: 1.02 }
                }}
              />
            </TabsContent>

            <TabsContent value="teaching" className="space-y-6">
              {[
                {
                  id: "jumpstart-mentor",
                  title: "Jump Start Program Mentor",
                  org: "Center for Engineering Outreach and Inclusion, Penn State",
                  date: "May 2025 - Jun 2025",
                  items: [
                    "Serve as Teaching Assistant and facilitator for PHYS 212 (Electricity and Magnetism)",
                    "Provide academic and social mentorship to incoming engineering students",
                    "Collaborate with instructors, peers, and program staff on planning and student support",
                  ],
                },
                {
                  id: "peer-tutor",
                  title: "Peer Tutor",
                  org: "Russell E. Horn Sr. Learning Center, Penn State Harrisburg",
                  date: "Aug 2024 - Dec 2024",
                  items: [
                    "Tutored Mathematics, Physics, and Computer Science students one-on-one and in small groups",
                    "Created tailored academic resources and strategies for student success",
                  ],
                },
                {
                  id: "eecs-mentor",
                  title: "EECS Peer Mentor",
                  org: "Penn State University",
                  date: "Jan 2025 - May 2025",
                  items: ["Mentored five first-year students in EECS through structured academic support"],
                },
              ].map((experience, expIndex) => (
                <ContentCard
                  key={expIndex}
                  id={experience.id}
                  title={experience.title}
                  subtitle={experience.org}
                  date={experience.date}
                  items={experience.items}
                  icon={BookOpen}
                  index={expIndex}
                  animation={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.6, delay: expIndex * 0.1 },
                    whileHover: { scale: 1.02 }
                  }}
                />
              ))}
            </TabsContent>

            <TabsContent value="externships" className="space-y-6">
              <ContentCard
                id="outamation-externship"
                title="AI & Automation Engineer (Extern)"
                subtitle="Outamation"
                date="May 2025 - Jul 2025 (Remote)"
                items={[
                  "Built AI-powered document-classification and data-extraction pipelines using Python (PyMuPDF, OCR), NLP and computer-vision techniques to automate processing of large mortgage document sets",
                  "Developed a Retrieval-Augmented Generation (RAG) search system with LlamaIndex, improving information-retrieval accuracy by benchmarking and tuning open-source AI models",
                  "Designed and executed model-evaluation and performance-optimization experiments, identifying best-fit architectures and hyperparameter settings for production readiness",
                  "Compiled a comprehensive technical analysis report, synthesizing key challenges, optimization strategies, and deployment recommendations to guide future AI workflow development"
                ]}
                icon={Zap}
                index={0}
                animation={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6 },
                  whileHover: { scale: 1.02 }
                }}
              />
            </TabsContent>

            <TabsContent value="timeline" className="space-y-8">
              <div className="relative">
                {/* Desktop timeline - side-by-side layout */}
                <div className="hidden md:block">
                  <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-primary/20"></div>
                  <div className="space-y-12">
                    {[
                      { title: "Software Engineer (Intern)", date: "Jun 2025 - Present", side: "right", current: true },
                      { title: "AI & Automation Engineer (Extern)", date: "May 2025 - Jul 2025", side: "left" },
                      { title: "Jump Start Program Mentor", date: "May 2025 - Jun 2025", side: "right" },
                      { title: "Full-Stack Mobile App Developer (Intern)", date: "Feb 2025 - Jun 2025", side: "left" },
                      { title: "EECS Peer Mentor", date: "Jan 2025 - May 2025", side: "right" },
                      { title: "Peer Tutor", date: "Aug 2024 - Dec 2024", side: "left" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: item.side === "right" ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center gap-4 ${item.side === "left" ? "flex-row-reverse" : ""}`}
                      >
                        <div className="flex-1 text-right">
                          <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/50">
                            <CardContent className="p-4">
                              <h3 className="text-primary font-semibold text-left">{item.title}</h3>
                              <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                            </CardContent>
                          </Card>
                        </div>
                        <div className={`w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg ${item.current ? "animate-pulse-gold" : ""}`} />
                        <div className="flex-1" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Mobile timeline - vertical layout */}
                <div className="md:hidden">
                  <div className="absolute left-4 top-0 w-0.5 h-full bg-primary/20"></div>
                  <div className="space-y-6 pl-8">
                    {[
                      { title: "Software Engineer (Intern)", date: "Jun 2025 - Present", current: true },
                      { title: "AI & Automation Engineer (Extern)", date: "May 2025 - Jul 2025" },
                      { title: "Jump Start Program Mentor", date: "May 2025 - Jun 2025" },
                      { title: "Full-Stack Mobile App Developer (Intern)", date: "Feb 2025 - Jun 2025" },
                      { title: "EECS Peer Mentor", date: "Jan 2025 - May 2025" },
                      { title: "Peer Tutor", date: "Aug 2024 - Dec 2024" },
                    ].map((item, index) => (
                      <motion.div
                        key={`mobile-${index}`}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative"
                      >
                        <div className={`absolute -left-8 top-3 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg ${item.current ? "animate-pulse-gold" : ""}`} />
                        <Card className="border-l-4 border-l-primary shadow-md hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/50 active:scale-95">
                          <CardContent className="p-4">
                            <h3 className="text-primary font-semibold text-sm leading-snug">{item.title}</h3>
                            <p className="text-xs text-muted-foreground mt-2">{item.date}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
      </div>
    </SectionWrapper>
  )
}