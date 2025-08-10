"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@/components/atoms"
import { Tabs, TabsContent, TabsList, TabsTrigger, IconTextListItem } from "@/components/molecules"
import { SectionWrapper } from "@/components/organisms"
import { Star, Code, Users, BookOpen, Calendar, Atom } from "lucide-react"

export const ActivitiesSection = () => {
  const leadershipActivities = [
    {
      title: "Education Committee Instructor",
      org: "Quantum Student Society",
      date: "Aug 2025 - Present",
      badge: "upcoming",
      items: [
        "Design curriculum for quantum computing fundamentals workshops",
        "Prepare hands-on tutorials using Qiskit and quantum simulators",
        "Develop educational materials covering quantum algorithms and principles",
        "Mentor students in quantum programming and theoretical concepts",
        "Coordinate with faculty advisors on advanced quantum research topics",
      ],
      icon: Atom,
    },
    {
      title: "Inter-Club Collaboration and Event Planning In-Charge",
      org: "Penn State Chapters of ASME and IEEE",
      date: "Jan 2025 - Present",
      badge: "current",
      items: [
        "Coordinated joint technical workshops between IEEE and ASME student chapters",
        "Organized interdisciplinary project showcases featuring engineering solutions",
        "Facilitated networking events connecting mechanical and electrical engineering students",
        "Managed event logistics and vendor coordination for collaborative competitions",
        "Developed partnership agreements and resource sharing protocols between chapters",
      ],
      icon: Calendar,
    },
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
  ]

  const communityServices = [
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
  ]

  return (
    <SectionWrapper id="activities" title="Activities" background maxWidth="6xl">
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
          {leadershipActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <activity.icon className="h-5 w-5" />
                    {activity.title}
                    {activity.badge && (
                      <Badge 
                        variant="outline" 
                        className={`ml-2 ${
                          activity.badge === "upcoming" 
                            ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                            : activity.badge === "current"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                        }`}
                      >
                        {activity.badge}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {activity.org} • {activity.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activity.items.map((item, itemIndex) => (
                      <IconTextListItem
                        key={itemIndex}
                        icon={Star}
                        title={typeof item === 'string' ? item : undefined}
                        index={itemIndex}
                        className="text-sm text-muted-foreground"
                      >
                        {typeof item === 'string' ? undefined : <span className="font-semibold">{item}</span>}
                      </IconTextListItem>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          {communityServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/50">
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
                  <div className="space-y-3">
                    {service.items.map((item, itemIndex) => (
                      <IconTextListItem
                        key={itemIndex}
                        icon={Star}
                        title={item}
                        index={itemIndex}
                        className="text-sm text-muted-foreground"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </SectionWrapper>
  )
}