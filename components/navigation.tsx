"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Home, User, Gamepad2, Mail } from "lucide-react"
import { useLang } from "@/hooks/use-language"

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home")
  const navRef = useRef<HTMLElement>(null)
  const { lang, setLang, t } = useLang()

  const navItems = [
    { name: t.nav.home, href: "#home", icon: Home },
    { name: t.nav.about, href: "#about", icon: User },
    { name: t.nav.projects, href: "#projects", icon: Gamepad2 },
    { name: t.nav.contact, href: "#contact", icon: Mail },
  ]

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 }
    )

    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"]
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      style={{ opacity: 0 }}
    >
      <div className="flex items-center gap-1 px-2 py-2 rounded-full bg-black/70 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/60">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.href.slice(1)

          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                  ? "bg-[#F2C230] text-black shadow-lg shadow-[#F2C230]/25"
                  : "text-[#8082A6] hover:text-white hover:bg-white/5"
                }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span
                className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isActive
                    ? "max-w-[100px] opacity-100"
                    : "max-w-0 md:max-w-[100px] opacity-0 md:opacity-100"
                  }`}
              >
                {item.name}
              </span>
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-[#F2C230]/20 animate-pulse -z-10" />
              )}
            </a>
          )
        })}

        {/* Language switcher */}
        <div className="flex items-center gap-0.5 ml-1 pl-2 border-l border-white/10">
          <button
            onClick={() => setLang("es")}
            className={`px-2.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${lang === "es"
                ? "bg-[#F2C230] text-black"
                : "text-[#8082A6] hover:text-white"
              }`}
          >
            ES
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-2.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${lang === "en"
                ? "bg-[#F2C230] text-black"
                : "text-[#8082A6] hover:text-white"
              }`}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  )
}
