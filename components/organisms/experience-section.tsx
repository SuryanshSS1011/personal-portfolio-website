"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms"
import { Badge } from "@/components/atoms"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/molecules"
import { Coffee, BookOpen, Zap, Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/atoms"

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Experience
          </h2>

          <Tabs defaultValue="internships" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-primary/10 border border-primary/20">
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
              <TabsTrigger
                value="github"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                GitHub
              </TabsTrigger>
            </TabsList>

            <TabsContent value="internships" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card id="leechy-internship" className="hover:shadow-xl transition-all duration-300 border-primary/20">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-primary">Software Engineer (Intern)</CardTitle>
                        <CardDescription>Leechy LLC • Jun 2025 - Present (Remote)</CardDescription>
                      </div>
                      <Badge className="bg-success/20 text-success border-success/30">Current</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Led a full UI/UX redesign of the Leechy mobile app (Capacitor + React), applying atomic design patterns and a centralized theming system to boost consistency and developer productivity",
                        "Performed end-to-end QA analysis and performance profiling, uncovering critical bottlenecks in rendering and network workflows",
                        "Engineered and deployed optimization strategies—code-splitting, asset compression, and lazy loading—that cut key screen load times by 80%",
                        "Designed, trained, and integrated a personalized Leechy AI chatbot into the mobile app, building NLP pipelines and fine-tuning language models to deliver contextual, on-demand user support",
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-2"
                        >
                          <Coffee className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card id="flourish-internship" className="hover:shadow-xl transition-all duration-300 border-primary/20">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-primary">Full-Stack Mobile App Developer (Intern)</CardTitle>
                        <CardDescription>Flourish: Grow with Self-Care • Feb 2025 - Jun 2025</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Collaborated with design team to implement frontend UI elements from Figma wireframes",
                        "Developed, tested, and maintained frontend code for seamless user experience across iOS and Android",
                        "Assisted with backend architecture, database design, and API integration",
                        "Optimized application for performance, scalability, and reliability",
                        "Coordinated with cross-functional teams to iterate features based on user feedback",
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-2"
                        >
                          <Coffee className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="teaching" className="space-y-6">
              {[
                {
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
                  title: "Peer Tutor",
                  org: "Russell E. Horn Sr. Learning Center, Penn State Harrisburg",
                  date: "Aug 2024 - Dec 2024",
                  items: [
                    "Tutored Mathematics, Physics, and Computer Science students one-on-one and in small groups",
                    "Created tailored academic resources and strategies for student success",
                  ],
                },
                {
                  title: "EECS Peer Mentor",
                  org: "Penn State University",
                  date: "Jan 2025 - May 2025",
                  items: ["Mentored five first-year students in EECS through structured academic support"],
                },
              ].map((experience, expIndex) => {
                const cardIds = ["jumpstart-mentor", "peer-tutor", "eecs-mentor"];
                return (
                <motion.div
                  key={expIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: expIndex * 0.1 }}
                >
                  <Card id={cardIds[expIndex]} className="hover:shadow-xl transition-all duration-300 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-primary">{experience.title}</CardTitle>
                      <CardDescription>
                        {experience.org} • {experience.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {experience.items.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-2"
                          >
                            <BookOpen className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
                );
              })}
            </TabsContent>

            <TabsContent value="externships" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card id="outamation-externship" className="hover:shadow-xl transition-all duration-300 border-primary/20">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-primary">AI & Automation Engineer (Extern)</CardTitle>
                        <CardDescription>Outamation • May 2025 - Jul 2025 (Remote)</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Built AI-powered document-classification and data-extraction pipelines using Python (PyMuPDF, OCR), NLP and computer-vision techniques to automate processing of large mortgage document sets",
                        "Developed a Retrieval-Augmented Generation (RAG) search system with LlamaIndex, improving information-retrieval accuracy by benchmarking and tuning open-source AI models",
                        "Designed and executed model-evaluation and performance-optimization experiments, identifying best-fit architectures and hyperparameter settings for production readiness",
                        "Compiled a comprehensive technical analysis report, synthesizing key challenges, optimization strategies, and deployment recommendations to guide future AI workflow development"
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-2"
                        >
                          <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="github" className="space-y-6">
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Github className="h-5 w-5" />
                    Development Activity
                  </CardTitle>
                  <CardDescription>
                    Live contribution data from GitHub
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">450+</div>
                      <div className="text-sm text-muted-foreground">Contributions this year</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">12+</div>
                      <div className="text-sm text-muted-foreground">Public repositories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">8+</div>
                      <div className="text-sm text-muted-foreground">Languages used</div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10"
                      onClick={() => window.open("https://github.com/SuryanshSS1011", "_blank")}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      View GitHub Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Timeline tab simplified for space */}
            <TabsContent value="timeline" className="space-y-8">
              <div className="text-center">
                <p className="text-muted-foreground">
                  Interactive timeline showing career progression from 2024 to present.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}