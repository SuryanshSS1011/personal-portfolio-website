"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms"
import { Badge } from "@/components/atoms"
import { Tabs, TabsContent, TabsList, TabsTrigger, IconTextListItem } from "@/components/molecules"
import { SectionWrapper } from "@/components/organisms"
import { Coffee, BookOpen, Zap } from "lucide-react"

export const ExperienceSection = () => {
  return (
    <SectionWrapper id="experience" title="Experience" maxWidth="6xl">

          <Tabs defaultValue="internships" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-primary/10 border border-primary/20">
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card id="leechy-internship" className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300">
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
                    <div className="space-y-3">
                      {[
                        "Led a full UI/UX redesign of the Leechy mobile app (Capacitor + React), applying atomic design patterns and a centralized theming system to boost consistency and developer productivity",
                        "Performed end-to-end QA analysis and performance profiling, uncovering critical bottlenecks in rendering and network workflows",
                        "Engineered and deployed optimization strategies—code-splitting, asset compression, and lazy loading—that cut key screen load times by 80%",
                        "Designed, trained, and integrated a personalized Leechy AI chatbot into the mobile app, building NLP pipelines and fine-tuning language models to deliver contextual, on-demand user support",
                      ].map((item, index) => (
                        <IconTextListItem
                          key={index}
                          icon={Coffee}
                          title={item}
                          index={index}
                          className="text-sm text-muted-foreground"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card id="flourish-internship" className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-primary">Full-Stack Mobile App Developer (Intern)</CardTitle>
                        <CardDescription>Flourish: Grow with Self-Care • Feb 2025 - Jun 2025</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        "Collaborated with design team to implement frontend UI elements from Figma wireframes",
                        "Developed, tested, and maintained frontend code for seamless user experience across iOS and Android",
                        "Assisted with backend architecture, database design, and API integration",
                        "Optimized application for performance, scalability, and reliability",
                        "Coordinated with cross-functional teams to iterate features based on user feedback",
                      ].map((item, index) => (
                        <IconTextListItem
                          key={index}
                          icon={Coffee}
                          title={item}
                          index={index}
                          className="text-sm text-muted-foreground"
                        />
                      ))}
                    </div>
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
                  whileHover={{ scale: 1.02 }}
                >
                  <Card id={cardIds[expIndex]} className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-primary">{experience.title}</CardTitle>
                      <CardDescription>
                        {experience.org} • {experience.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {experience.items.map((item, index) => (
                          <IconTextListItem
                            key={index}
                            icon={BookOpen}
                            title={item}
                            index={index}
                            className="text-sm text-muted-foreground"
                          />
                        ))}
                      </div>
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
                whileHover={{ scale: 1.02 }}
              >
                <Card id="outamation-externship" className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-primary">AI & Automation Engineer (Extern)</CardTitle>
                        <CardDescription>Outamation • May 2025 - Jul 2025 (Remote)</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        "Built AI-powered document-classification and data-extraction pipelines using Python (PyMuPDF, OCR), NLP and computer-vision techniques to automate processing of large mortgage document sets",
                        "Developed a Retrieval-Augmented Generation (RAG) search system with LlamaIndex, improving information-retrieval accuracy by benchmarking and tuning open-source AI models",
                        "Designed and executed model-evaluation and performance-optimization experiments, identifying best-fit architectures and hyperparameter settings for production readiness",
                        "Compiled a comprehensive technical analysis report, synthesizing key challenges, optimization strategies, and deployment recommendations to guide future AI workflow development"
                      ].map((item, index) => (
                        <IconTextListItem
                          key={index}
                          icon={Zap}
                          title={item}
                          index={index}
                          className="text-sm text-muted-foreground"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-8">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-primary/20"></div>
                <div className="space-y-12">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex-1 text-right">
                      <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-4">
                          <h3 className="text-primary font-semibold text-left">
                            Software Engineer (Intern)
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">Jun 2025 - Present</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg animate-pulse-gold" />
                    <div className="flex-1" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 flex-row-reverse"
                  >
                    <div className="flex-1 text-left">
                      <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-4">
                          <h3 className="text-primary font-semibold text-left">
                            AI & Automation Engineer (Extern)
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">May 2025 - Jul 2025</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
                    <div className="flex-1" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex-1 text-right">
                      <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-4">
                          <h3 className="text-primary font-semibold text-left">
                            Jump Start Program Mentor
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">May 2025 - Jun 2025</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
                    <div className="flex-1" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 flex-row-reverse"
                  >
                    <div className="flex-1 text-left">
                      <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-4">
                          <h3 className="text-primary font-semibold text-left">
                            Full-Stack Mobile App Developer (Intern)
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">Feb 2025 - Jun 2025</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
                    <div className="flex-1" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex-1 text-right">
                      <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-4">
                          <h3 className="text-primary font-semibold text-left">
                            EECS Peer Mentor
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">Jan 2025 - May 2025</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
                    <div className="flex-1" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 flex-row-reverse"
                  >
                    <div className="flex-1 text-left">
                      <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-4">
                          <h3 className="text-primary font-semibold text-left">
                            Peer Tutor
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">Aug 2024 - Dec 2024</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
                    <div className="flex-1" />
                  </motion.div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
    </SectionWrapper>
  )
}