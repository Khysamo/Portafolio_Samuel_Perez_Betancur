"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, Github, Linkedin, Twitter, Send, MapPin, Clock } from "lucide-react"
import { useLang } from "@/hooks/use-language"

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { name: "GitHub", icon: Github, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
]

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const { t } = useLang()

  const contactInfo = [
    { icon: Mail, label: "Email", value: "contact@samuelperez.dev", href: "mailto:contact@samuelperez.dev" },
    { icon: MapPin, label: t.contact.location_label, value: t.contact.location_value, href: null },
    { icon: Clock, label: t.contact.availability_label, value: t.contact.availability_value, href: null },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-label", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        scrollTrigger: { trigger: ".contact-label", start: "top 85%", once: true },
      })
      gsap.from(".contact-title", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: 0.1,
        scrollTrigger: { trigger: ".contact-title", start: "top 85%", once: true },
      })
      gsap.from(".contact-left", {
        opacity: 0,
        x: -50,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-grid", start: "top 80%", once: true },
      })
      gsap.from(".contact-right", {
        opacity: 0,
        x: 50,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: { trigger: ".contact-grid", start: "top 80%", once: true },
      })
      gsap.from(".contact-info-item", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: { trigger: ".contact-info-list", start: "top 80%", once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const btn = e.currentTarget.querySelector("button[type=submit]")
    gsap.to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 })
    setSent(true)
    setForm({ name: "", email: "", message: "" })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #000 0%, #06000A 50%, #000 100%)" }}
    >
      {/* Decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#46334F]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#46334F]/40 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(242,194,48,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="contact-label section-label mb-4">{t.contact.eyebrow}</p>
          <h2 className="contact-title font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            {t.contact.title} <span className="text-gradient-gold">{t.contact.title_highlight}</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="contact-grid grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Info */}
          <div className="contact-left space-y-10">
            <p className="text-[#8082A6] text-sm md:text-base leading-relaxed">
              {t.contact.bio}
            </p>

            {/* Contact info */}
            <div className="contact-info-list space-y-4">
              {contactInfo.map((item, i) => {
                const Icon = item.icon
                const content = (
                  <div
                    key={i}
                    className="contact-info-item flex items-center gap-4 glass rounded-xl px-5 py-4 hover:border-[#F2C230]/30 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#F2C230]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F2C230]/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#F2C230]" />
                    </div>
                    <div>
                      <p className="text-[#8082A6] text-xs uppercase tracking-wider">{item.label}</p>
                      <p className="text-white text-sm font-medium mt-0.5">{item.value}</p>
                    </div>
                  </div>
                )
                return item.href ? (
                  <a href={item.href} key={i}>
                    {content}
                  </a>
                ) : (
                  content
                )
              })}
            </div>

            {/* Social */}
            <div>
              <p className="section-label mb-4">{t.contact.find_me}</p>
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      aria-label={link.name}
                      className="w-12 h-12 rounded-xl glass flex items-center justify-center text-[#8082A6] hover:text-white hover:border-[#F2C230]/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-right">
            <div className="glass rounded-2xl p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[320px] text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#F2C230]/15 flex items-center justify-center">
                    <Send className="w-7 h-7 text-[#F2C230]" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-white">{t.contact.sent_title}</h4>
                  <p className="text-[#8082A6] text-sm">{t.contact.sent_desc}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#8082A6] text-xs uppercase tracking-wider mb-2">
                        {t.contact.name_label}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={t.contact.name_placeholder}
                        className="w-full bg-black/40 border border-[#46334F]/60 rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#46334F] focus:outline-none focus:border-[#F2C230]/50 focus:ring-1 focus:ring-[#F2C230]/30 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[#8082A6] text-xs uppercase tracking-wider mb-2">
                        {t.contact.email_label}
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder={t.contact.email_placeholder}
                        className="w-full bg-black/40 border border-[#46334F]/60 rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#46334F] focus:outline-none focus:border-[#F2C230]/50 focus:ring-1 focus:ring-[#F2C230]/30 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#8082A6] text-xs uppercase tracking-wider mb-2">
                      {t.contact.message_label}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={t.contact.message_placeholder}
                      className="w-full bg-black/40 border border-[#46334F]/60 rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#46334F] focus:outline-none focus:border-[#F2C230]/50 focus:ring-1 focus:ring-[#F2C230]/30 transition-all duration-300 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#F2C230] to-[#F2921D] text-black font-semibold text-sm tracking-wide hover:scale-[1.02] hover:shadow-lg hover:shadow-[#F2C230]/20 transition-all duration-300 overflow-hidden relative"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {t.contact.send_btn}
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
