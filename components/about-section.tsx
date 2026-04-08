"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TechMarquee } from "@/components/tech-marquee"
import { useLang } from "@/hooks/use-language"

gsap.registerPlugin(ScrollTrigger)

const groupColors: Record<string, string> = {
  Engine: "#F2C230",
  Code: "#F2921D",
  Design: "#F24F13",
  Graphics: "#8082A6",
  Systems: "#46334F",
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLang()
  const { experience, skills, education } = t.about

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from(".about-label", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        scrollTrigger: { trigger: ".about-label", start: "top 85%", once: true },
      })
      gsap.from(".about-title", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: 0.1,
        scrollTrigger: { trigger: ".about-title", start: "top 85%", once: true },
      })

      // Photo column
      gsap.from(".about-photo-col", {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-main-grid", start: "top 80%", once: true },
      })

      // Content column
      gsap.from(".about-content-col", {
        opacity: 0,
        x: 60,
        duration: 1,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: { trigger: ".about-main-grid", start: "top 80%", once: true },
      })

      // Stats counter
      document.querySelectorAll(".stat-counter").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") || "0")
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate() {
            el.textContent = `${Math.round(obj.val)}+`
          },
        })
      })

      // Experience items
      gsap.from(".exp-item", {
        opacity: 0,
        x: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".exp-list", start: "top 80%", once: true },
      })

      // Skills
      gsap.from(".skill-tag", {
        opacity: 0,
        scale: 0.8,
        stagger: 0.05,
        duration: 0.5,
        ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".skills-grid", start: "top 80%", once: true },
      })

      // Education
      gsap.from(".edu-item", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: { trigger: ".edu-list", start: "top 80%", once: true },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #000 0%, #06000A 40%, #000 100%)" }}
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#46334F]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#46334F]/40 to-transparent" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#F2C230]/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-[#46334F]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="about-label section-label mb-4">{t.about.eyebrow}</p>
          <h2 className="about-title font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            {t.about.title} <span className="text-gradient-gold">{t.about.title_highlight}</span>
          </h2>
        </div>

        {/* Main grid: photo + content */}
        <div className="about-main-grid grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Photo column */}
          <div className="about-photo-col flex justify-center lg:justify-end">
            <div className="relative w-72 md:w-80 lg:w-96">
              {/* Decorative frame */}
              <div className="absolute -inset-3 rounded-2xl border border-[#F2C230]/20 rotate-2" />
              <div className="absolute -inset-3 rounded-2xl border border-[#46334F]/30 -rotate-2" />

              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden border border-[#46334F]/40 shadow-2xl shadow-black/60">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Historia%20de%20Instagram%20Modo%20Carnaval%20Frase%20Minimalista%20Violeta%20%281%29-xtnuFhijJ9so5WMmAjrUOSj7e6Zfgx.png"
                    alt="Samuel Perez Betancur"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 text-center glow-gold-sm">
                <div className="font-display text-2xl font-bold text-[#F2C230]">5+</div>
                <div className="text-[#8082A6] text-xs tracking-wide uppercase">{t.about.years_badge}</div>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className="about-content-col space-y-8">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                {t.about.headline}<br />
                <span className="text-gradient-gold-subtle">{t.about.headline2}</span>
              </h3>
              <p className="text-[#8082A6] leading-relaxed text-sm md:text-base">
                {t.about.bio}
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-10">
              <div>
                <div
                  className="stat-counter font-display text-4xl font-bold text-[#F2C230]"
                  data-target="8"
                >
                  0+
                </div>
                <div className="text-[#8082A6] text-xs uppercase tracking-wider mt-1">{t.about.stats_projects}</div>
              </div>
              <div className="w-px bg-[#46334F]/60" />
              <div>
                <div
                  className="stat-counter font-display text-4xl font-bold text-[#F2C230]"
                  data-target="5"
                >
                  0+
                </div>
                <div className="text-[#8082A6] text-xs uppercase tracking-wider mt-1">{t.about.stats_years}</div>
              </div>
              <div className="w-px bg-[#46334F]/60" />
              <div>
                <div
                  className="stat-counter font-display text-4xl font-bold text-[#F2C230]"
                  data-target="10"
                >
                  0+
                </div>
                <div className="text-[#8082A6] text-xs uppercase tracking-wider mt-1">{t.about.stats_tech}</div>
              </div>
            </div>

            {/* Experience */}
            <div>
              <h4 className="section-label mb-5">{t.about.experience_label}</h4>
              <div className="exp-list space-y-3">
                {experience.map((item, i) => (
                  <div
                    key={i}
                    className="exp-item flex items-center gap-4 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F2C230]/60 flex-shrink-0 group-hover:bg-[#F2C230] transition-colors duration-300" />
                    <div className="flex items-baseline gap-2 min-w-0">
                      <span className="text-white text-sm font-medium truncate">{item.role}</span>
                      <span className="text-[#46334F] text-xs flex-shrink-0">·</span>
                      <span className="text-[#8082A6] text-xs flex-shrink-0">{item.company}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* itch.io link */}
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="inline-flex items-center gap-3 glass rounded-xl px-5 py-3 hover:border-[#F2C230]/40 transition-all duration-300 group"
            >
              <span className="font-bold text-white text-lg group-hover:text-[#F2C230] transition-colors duration-300">
                itch.io
              </span>
              <div>
                <div className="text-[#F2C230] text-xs uppercase tracking-wider font-semibold">{t.about.itchio_label}</div>
                <div className="text-[#8082A6] text-xs">{t.about.itchio_sub}</div>
              </div>
              <svg className="w-4 h-4 text-[#8082A6] group-hover:text-[#F2C230] transition-colors ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Skills + Education grid */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Skills */}
          <div className="glass rounded-2xl p-8">
            <h4 className="section-label mb-6">{t.about.skills_label}</h4>
            <div className="skills-grid flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="skill-tag px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300 hover:scale-105 cursor-default"
                  style={{
                    color: groupColors[skill.group] || "#8082A6",
                    borderColor: `${groupColors[skill.group]}30` || "rgba(128,130,166,0.2)",
                    background: `${groupColors[skill.group]}10` || "rgba(128,130,166,0.05)",
                  }}
                >
                  {skill.label}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="glass rounded-2xl p-8">
            <h4 className="section-label mb-6">{t.about.education_label}</h4>
            <div className="edu-list space-y-4">
              {education.map((item, i) => (
                <div key={i} className="edu-item flex items-start gap-4">
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-white text-sm font-medium">{item.degree}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools marquee */}
        <div>
          <h4 className="section-label text-center mb-8">{t.about.tools_label}</h4>
          <TechMarquee />
        </div>
      </div>
    </section>
  )
}
