"use client"

import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { useLang } from "@/hooks/use-language"

const socialLinks = [
  { name: "GitHub", icon: Github, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Email", icon: Mail, href: "mailto:contact@samuelperez.dev" },
]

export function Footer() {
  const { t } = useLang()

  const navLinks = [
    { name: t.nav.home,     href: "#home" },
    { name: t.nav.about,    href: "#about" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.contact,  href: "#contact" },
  ]

  return (
    <footer className="relative bg-black border-t border-[#46334F]/30 py-14 px-4">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#F2C230]/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10 items-start">
          {/* Brand */}
          <div>
            <h4 className="font-display text-xl font-bold mb-2">
              <span className="text-white">Samuel </span>
              <span className="text-gradient-gold-subtle">Perez</span>
            </h4>
            <p className="text-[#8082A6] text-sm leading-relaxed max-w-[200px]">
              {t.footer.tagline}
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-2">
            <p className="section-label mb-2">{t.footer.navigation}</p>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })
                }}
                className="text-[#8082A6] text-sm hover:text-[#F2C230] transition-colors duration-300 w-fit"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social */}
          <div>
            <p className="section-label mb-4">{t.footer.connect}</p>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    aria-label={link.name}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-[#8082A6] hover:text-black hover:bg-[#F2C230] hover:border-[#F2C230] transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#46334F]/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#8082A6]/60 text-xs">
            &copy; {new Date().getFullYear()} Samuel Perez Betancur. {t.footer.rights}
          </p>
          <p className="text-[#46334F]/60 text-xs font-display tracking-wider">
            {t.footer.crafted}
          </p>
        </div>
      </div>
    </footer>
  )
}
