"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/atoms"
import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react"

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
          <p className="text-muted-foreground mb-8">
            Interested in collaboration, research opportunities, or just want to chat about technology?
          </p>

          {/* Contact Information */}
          <div className="grid md:grid-cols-3 gap-8 mb-8 max-w-4xl mx-auto">
            {/* Contact Methods */}
            <div className="text-center">
              <h4 className="font-semibold text-lg mb-4 text-primary">Get In Touch</h4>
              <div className="space-y-3">
                <Button
                  icon={Mail}
                  size="sm"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                  onClick={() => window.open("mailto:sss6371@psu.edu", "_blank")}
                >
                  Email
                </Button>
                <Button
                  icon={Phone}
                  size="sm"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                  onClick={() => window.open("tel:+19296311429", "_blank")}
                >
                  Phone
                </Button>
              </div>
            </div>

            {/* Location */}
            <div className="text-center">
              <h4 className="font-semibold text-lg mb-4 text-primary">Location</h4>
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-3">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">State College, PA</span>
              </div>
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96712.88872948937!2d-78.0122987!3d40.7933949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89cea62275b7ea6b%3A0x7117c1a731a1fd78!2sState%20College%2C%20PA!5e0!3m2!1sen!2sus!4v1704834567890!5m2!1sen!2sus"
                width="100%"
                height="96"
                className="rounded-lg border-2 border-yellow-400"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="State College, PA Location"
              />
            </div>

            {/* Social Links */}
            <div className="text-center">
              <h4 className="font-semibold text-lg mb-4 text-primary">Connect</h4>
              <div className="flex justify-center gap-3">
                <Button
                  icon={Linkedin}
                  size="sm"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                  onClick={() => window.open("https://www.linkedin.com/in/suryansh-sijwali/", "_blank")}
                >
                  LinkedIn
                </Button>
                <Button
                  icon={Github}
                  size="sm"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                  onClick={() => window.open("https://github.com/SuryanshSS1011", "_blank")}
                >
                  GitHub
                </Button>
              </div>
            </div>
          </div>

          <motion.p className="text-sm text-muted-foreground" whileHover={{ scale: 1.05 }}>
            © 2025 Suryansh Sijwali. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}