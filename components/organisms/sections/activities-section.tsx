"use client"

import { ContentCard } from "@/components/molecules"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/molecules"
import { SectionWrapper } from "@/components/organisms"
import { Star, Code, Users, BookOpen, Calendar, Atom } from "lucide-react"

export const ActivitiesSection = () => {
  const leadershipActivities = [
    {
      title: "Education Committee Instructor",
      org: "Quantum Student Society",
      date: "Aug 2025 - Present",
      badge: {
        text: "Upcoming",
        className: "bg-orange-500/20 text-orange-600 border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20"
      },
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
      badge: {
        text: "Current",
        className: "bg-success/20 text-success border-success/30"
      },
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
            <ContentCard
              key={index}
              id={`leadership-${index}`}
              title={activity.title}
              subtitle={activity.org}
              date={activity.date}
              badge={activity.badge}
              items={activity.items}
              icon={activity.icon}
              index={index}
              animation={{
                initial: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.6, delay: index * 0.2 },
                whileHover: { scale: 1.02 },
                viewport: { once: true }
              }}
            />
          ))}
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          {communityServices.map((service, index) => (
            <ContentCard
              key={index}
              id={`community-${index}`}
              title={service.title}
              subtitle={service.org}
              date={service.date}
              items={service.items}
              icon={service.icon}
              index={index}
              animation={{
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: index * 0.2 },
                whileHover: { scale: 1.02 },
                viewport: { once: true }
              }}
            />
          ))}
        </TabsContent>
      </Tabs>
    </SectionWrapper>
  )
}