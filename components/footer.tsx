"use client"

import { ArrowUp, Github, Linkedin, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const footerLinks = {
  Programs: ["Full-Stack Development", "Data Science", "DevOps", "Cybersecurity", "AI for Creatives"],
  Company: ["About Us", "Careers", "Blog", "Press", "Partners"],
  Resources: ["Documentation", "Community", "Support", "FAQs", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"],
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-card border-t border-border relative">
      {/* Binary Pattern Background */}
      <div className="absolute inset-0 opacity-5 overflow-hidden pointer-events-none">
        <div className="font-mono text-xs text-primary leading-none whitespace-pre select-none">
          {Array(50).fill("01001000 01100101 01101100 01101100 01101111 ").join("")}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <a href="#" className="inline-block mb-6">
              <Image src="/bytetek-logo.svg" alt="byteTek Logo" width={50} height={50} className="h-12 w-auto" />
            </a>
            <p className="text-muted-foreground mb-6">
              Building tech skills byte by byte. Transform your career with cutting-edge technology education.
            </p>

            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Subscribe</Button>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} byteTek. All rights reserved.</p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Twitter, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Github, href: "#" },
              { icon: Youtube, href: "#" },
            ].map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            className="border-border hover:border-primary hover:bg-primary/10 bg-transparent"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </footer>
  )
}
