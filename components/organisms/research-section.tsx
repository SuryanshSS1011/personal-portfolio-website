"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@/components/atoms"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/molecules"
import { Star, Zap, BookOpen, Brain, Users, Target } from "lucide-react"

export const ResearchSection = () => {
  return (
    <section id="research" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Research
          </h2>

          <Tabs defaultValue="published" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-primary/10 border border-primary/20">
              <TabsTrigger
                value="published"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Published
              </TabsTrigger>
              <TabsTrigger
                value="ongoing"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Ongoing/Unpublished
              </TabsTrigger>
            </TabsList>

            <TabsContent value="published" className="space-y-8">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-primary">
                          Fixing Performance Bugs Through LLM Explanations
                        </CardTitle>
                        <CardDescription>Jan 2025 - Jul 2025</CardDescription>
                      </div>
                      <Badge variant="default" className="bg-primary text-primary-foreground animate-pulse-gold">
                        Published
                      </Badge>
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
                        <div className="space-y-3">
                          <h4 className="font-medium mb-2 text-primary">Key Achievements:</h4>
                          {[
                            "Created novel LLM-powered framework for performance bug detection",
                            "Built dataset of 490 Java performance bugs",
                            "Achieved 83.7% accuracy in bug detection",
                            "Outperformed baseline models by over 12%",
                          ].map((achievement, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              viewport={{ once: true }}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <Star className="h-4 w-4 text-primary flex-shrink-0" />
                              {achievement}
                            </motion.div>
                          ))}
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-medium mb-2 text-primary">Technical Impact:</h4>
                          {[
                            "Developed 5-category bug taxonomy",
                            "79.6% efficacy in code improvement suggestions",
                            "87.8% correctness in recommendations",
                            "Applied LLM fine-tuning and prompt engineering",
                          ].map((impact, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.4 }}
                              viewport={{ once: true }}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                              {impact}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="ongoing" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-primary">UAV-based Disaster Management Research</CardTitle>
                        <CardDescription>Jun 2024 - Jul 2024</CardDescription>
                      </div>
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        Extension Planned After Further Coursework
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm">
                        <strong>Research Focus:</strong> Multidisciplinary project designing autonomous UAV-based
                        disaster mitigation systems for emergency response and recovery operations
                      </p>
                      <p className="text-sm">
                        <strong>Collaboration:</strong> Cross-functional team including aerospace engineers, computer
                        scientists, and emergency management specialists
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-medium mb-2 text-primary">Technical Components:</h4>
                          {[
                            "LiDAR sensor integration for 3D environmental mapping",
                            "SLAM (Simultaneous Localization and Mapping) algorithms",
                            "Real-time object detection and classification systems",
                            "Autonomous navigation in GPS-denied environments",
                          ].map((component, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              viewport={{ once: true }}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                              {component}
                            </motion.div>
                          ))}
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-medium mb-2 text-primary">Applications & Impact:</h4>
                          {[
                            "Search and rescue operations in disaster zones",
                            "Rapid damage assessment and mapping",
                            "Supply delivery to inaccessible areas",
                            "Real-time situational awareness for first responders",
                          ].map((application, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.4 }}
                              viewport={{ once: true }}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <Target className="h-4 w-4 text-primary flex-shrink-0" />
                              {application}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-primary/5 rounded-lg p-4 border border-primary/20 mt-4">
                        <h4 className="font-medium mb-2 text-primary">Research Outcomes:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <BookOpen className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>
                              Developed prototype UAV system with integrated sensor suite for disaster response
                              scenarios
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Brain className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                            <span>
                              Implemented machine learning algorithms for automated debris detection and path planning
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Users className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                            <span>
                              Collaborated with emergency management professionals to validate real-world applicability
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}