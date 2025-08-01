"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@/components/atoms"
import { Tabs, TabsContent, TabsList, TabsTrigger, IconTextListItem, ContentCard } from "@/components/molecules"
import { SectionWrapper } from "@/components/organisms"
import { Star, Zap, BookOpen, Brain, Users, Target } from "lucide-react"

export const ResearchSection = () => {
  const publishedAchievements = [
    "Created novel LLM-powered framework for performance bug detection",
    "Built dataset of 490 Java performance bugs",
    "Achieved 83.7% accuracy in bug detection",
    "Outperformed baseline models by over 12%",
  ]

  const publishedImpacts = [
    "Developed 5-category bug taxonomy",
    "79.6% efficacy in code improvement suggestions",
    "87.8% correctness in recommendations",
    "Applied LLM fine-tuning and prompt engineering",
  ]

  const uavComponents = [
    "LiDAR sensor integration for 3D environmental mapping",
    "SLAM (Simultaneous Localization and Mapping) algorithms",
    "Real-time object detection and classification systems",
    "Autonomous navigation in GPS-denied environments",
  ]

  const uavApplications = [
    "Search and rescue operations in disaster zones",
    "Rapid damage assessment and mapping",
    "Supply delivery to inaccessible areas",
    "Real-time situational awareness for first responders",
  ]

  const uavOutcomes = [
    {
      title: "Developed prototype UAV system with integrated sensor suite for disaster response scenarios",
      icon: BookOpen,
    },
    {
      title: "Implemented machine learning algorithms for automated debris detection and path planning",
      icon: Brain,
    },
    {
      title: "Collaborated with emergency management professionals to validate real-world applicability",
      icon: Users,
    },
  ]

  return (
    <SectionWrapper id="research" title="Research" background maxWidth="6xl">
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
            <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/50">
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
                      {publishedAchievements.map((achievement, index) => (
                        <IconTextListItem
                          key={index}
                          icon={Star}
                          title={achievement}
                          index={index}
                          className="text-sm text-muted-foreground"
                        />
                      ))}
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium mb-2 text-primary">Technical Impact:</h4>
                      {publishedImpacts.map((impact, index) => (
                        <IconTextListItem
                          key={index}
                          icon={Zap}
                          title={impact}
                          index={index}
                          className="text-sm text-muted-foreground"
                        />
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
            <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/50">
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
                      {uavComponents.map((component, index) => (
                        <IconTextListItem
                          key={index}
                          icon={Zap}
                          title={component}
                          index={index}
                          className="text-sm text-muted-foreground"
                        />
                      ))}
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium mb-2 text-primary">Applications & Impact:</h4>
                      {uavApplications.map((application, index) => (
                        <IconTextListItem
                          key={index}
                          icon={Target}
                          title={application}
                          index={index}
                          className="text-sm text-muted-foreground"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/20 mt-4">
                    <h4 className="font-medium mb-2 text-primary">Research Outcomes:</h4>
                    <div className="space-y-2 text-sm">
                      {uavOutcomes.map((outcome, index) => (
                        <IconTextListItem
                          key={index}
                          icon={outcome.icon}
                          title={outcome.title}
                          index={index}
                          iconClassName={index === 1 ? "text-secondary" : index === 2 ? "text-secondary" : "text-primary"}
                          hoverable={false}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </SectionWrapper>
  )
}