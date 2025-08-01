"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/atoms"
import { Mail, Linkedin, Github } from "lucide-react"

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Let's Connect
          </h3>
          <p className="text-muted-foreground mb-6">
            Interested in collaboration, research opportunities, or just want to chat about technology?
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => window.open("mailto:sss6371@psu.edu", "_blank")}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Me
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => window.open("https://www.linkedin.com/in/suryansh-sijwali/", "_blank")}
            >
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => window.open("https://github.com/SuryanshSS1011", "_blank")}
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>
          <motion.p className="text-sm text-muted-foreground" whileHover={{ scale: 1.05 }}>
            © 2025 Suryansh Sijwali. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}