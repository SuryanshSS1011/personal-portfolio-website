"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/molecules"
import { Star, Code, Users, BookOpen } from "lucide-react"

export const ActivitiesSection = () => {
  return (
    <section id="activities" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Activities
          </h2>

          <Tabs defaultValue="leadership" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-primary/10 border border-primary/20">
              <TabsTrigger
                value="leadership"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Leadership Roles
              </TabsTrigger>
              <TabsTrigger
                value="community"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Volunteer Service
              </TabsTrigger>
            </TabsList>

            <TabsContent value="leadership" className="space-y-6">
              {[
                {
                  title: "President",
                  org: "Cyber Lions Club, Penn State Harrisburg",
                  date: "Aug 2024 - Dec 2024",
                  items: [
                    "Spearheaded cybersecurity initiatives and promoted awareness through workshops, CTFs, and technical talks",
                    "Organized and led weekly club meetings, fostering member engagement and technical development",
                    "Collaborated with campus IT and faculty to execute university-wide cybersecurity outreach events",
                  ],
                  icon: Star,
                },
                {
                  title: "Computer Science Lead Assistant",
                  org: "IEEE Student Branch, Penn State Harrisburg",
                  date: "Jan 2024 - Dec 2024",
                  items: [
                    <>Co-developed the <a href="https://ieee.hackpsh.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline transition-colors">HackPSH hackathon platform</a> using Next.js and Supabase</>,
                    "Facilitated technical workshops on algorithms, data structures, and web development",
                    "Contributed to control systems and data analytics teams for IEEE PSH Radio Telescope project",
                    "Promoted community engagement and technical growth among peers in IEEE-led initiatives",
                  ],
                  icon: Code,
                },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-primary">
                        <activity.icon className="h-5 w-5" />
                        {activity.title}
                      </CardTitle>
                      <CardDescription>
                        {activity.org} • {activity.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {activity.items.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: itemIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-2"
                          >
                            <Star className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="community" className="space-y-6">
              {[
                {
                  title: "Spring Break Community Service in Cleveland",
                  org: "Envision Cleveland",
                  date: "Mar 2024",
                  items: [
                    "Participated in week-long service program addressing urban challenges in Cleveland",
                    "Contributed to community improvement efforts, education programs, and refugee support initiatives",
                    "Gained hands-on experience in sustainability, mentorship, and urban development",
                    "Collaborated with diverse teams to implement solutions for local community needs",
                  ],
                  icon: Users,
                },
                {
                  title: "STEM Instructor",
                  org: "Middletown Public Library",
                  date: "Aug 2023 - Dec 2023",
                  items: [
                    "Led interactive STEM sessions for various age groups in the local community",
                    "Taught circuits, Arduino fundamentals, and introductory programming concepts",
                    "Promoted collaborative learning and interest in technology within the community",
                    "Developed curriculum and hands-on activities to make technology accessible to all",
                  ],
                  icon: BookOpen,
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-primary">
                        <service.icon className="h-5 w-5" />
                        {service.title}
                      </CardTitle>
                      <CardDescription>
                        {service.org} • {service.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {service.items.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: itemIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-2"
                          >
                            <Star className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}