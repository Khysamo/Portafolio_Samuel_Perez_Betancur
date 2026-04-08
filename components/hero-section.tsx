"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useLang } from "@/hooks/use-language"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const orb3Ref = useRef<HTMLDivElement>(null)
  const { t } = useLang()

  // Canvas particle network
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animFrameId: number
    let mouseX = 0
    let mouseY = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener("mousemove", onMouseMove)

    type Particle = {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      alpha: number
    }

    const colors = ["#F2C230", "#F2921D", "#F24F13", "#8082A6", "#46334F"]
    const particles: Particle[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.2,
    }))

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.08)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Mouse repulsion + movement
      particles.forEach((p) => {
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) {
          p.vx += (dx / dist) * 0.08
          p.vy += (dy / dist) * 0.08
        }

        // Speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5
          p.vy = (p.vy / speed) * 1.5
        }

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      })

      // Connection lines
      ctx.globalAlpha = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.12
            ctx.beginPath()
            ctx.strokeStyle = `rgba(242, 194, 48, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animFrameId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  // GSAP text reveal + orb animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Orb floating animation
      gsap.to(orb1Ref.current, {
        y: -30,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      })
      gsap.to(orb2Ref.current, {
        y: 25,
        x: -15,
        duration: 5.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.8,
      })
      gsap.to(orb3Ref.current, {
        y: -20,
        x: 20,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      })

      // Hero entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.2 })
      tl.from("#hero-eyebrow", { opacity: 0, y: 24, duration: 0.7 })
        .from("#hero-first", { opacity: 0, x: -70, duration: 0.9 }, "-=0.3")
        .from("#hero-last", { opacity: 0, x: 70, duration: 0.9 }, "-=0.7")
        .from("#hero-divider", { opacity: 0, scaleX: 0, transformOrigin: "center", duration: 0.6 }, "-=0.3")
        .from("#hero-role", { opacity: 0, y: 18, duration: 0.6 }, "-=0.2")
        .from("#hero-desc", { opacity: 0, y: 18, duration: 0.6 }, "-=0.3")
        .from(".hero-btn", { opacity: 0, y: 18, stagger: 0.15, duration: 0.6 }, "-=0.3")
        .from("#hero-scroll", { opacity: 0, y: -12, duration: 0.5 }, "-=0.2")
    }, sectionRef)

    // Mouse parallax on orbs
    const handleMouseMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth - 0.5) * 30
      const yPct = (e.clientY / window.innerHeight - 0.5) * 30
      gsap.to(orb1Ref.current, { x: xPct, y: yPct, duration: 1.2, ease: "power2.out" })
      gsap.to(orb2Ref.current, { x: -xPct * 0.6, y: -yPct * 0.6, duration: 1.5, ease: "power2.out" })
      gsap.to(orb3Ref.current, { x: xPct * 0.4, y: -yPct * 0.4, duration: 2, ease: "power2.out" })
    }
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      ctx.revert()
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#46334F]/15 via-transparent to-black/90 z-10 pointer-events-none" />

      {/* Ambient orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-1/4 left-1/5 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(242,78,19,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/4 right-1/5 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(242,194,48,0.07) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        ref={orb3Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(70,51,79,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <p
          id="hero-eyebrow"
          className="section-label mb-6 tracking-[0.4em]"
        >
          {t.hero.eyebrow}
        </p>

        {/* Name */}
        <h1 className="font-display leading-none mb-2">
          <span
            id="hero-first"
            className="block text-white/90 font-light text-4xl md:text-6xl lg:text-7xl tracking-widest mb-1"
          >
            SAMUEL
          </span>
          <span
            id="hero-last"
            className="block text-gradient-gold font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight"
          >
            PEREZ BETANCUR
          </span>
        </h1>

        {/* Divider */}
        <div id="hero-divider" className="flex items-center justify-center gap-4 my-6">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#F2C230]/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#F2C230]" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#F2C230]/60" />
        </div>

        {/* Role */}
        <p
          id="hero-role"
          className="font-display text-xl md:text-2xl lg:text-3xl text-[#8082A6] tracking-[0.3em] font-light mb-4"
        >
          {t.hero.role}
        </p>

        {/* Description */}
        <p
          id="hero-desc"
          className="text-[#8082A6]/80 text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-10"
        >
          {t.hero.desc}
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="hero-btn group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F2C230] to-[#F2921D] text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#F2C230]/25 overflow-hidden"
          >
            <span className="relative z-10">{t.hero.cta_projects}</span>
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="hero-btn px-8 py-3.5 rounded-full border border-[#46334F] text-[#8082A6] font-medium text-sm tracking-wide transition-all duration-300 hover:border-[#F2C230]/60 hover:text-[#F2C230] hover:scale-105 hover:bg-[#F2C230]/5"
          >
            {t.hero.cta_about}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div id="hero-scroll" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[#8082A6]/50 text-xs tracking-[0.3em] uppercase font-display">{t.hero.scroll}</span>
        <div className="w-5 h-9 rounded-full border border-[#46334F]/60 flex items-start justify-center p-1">
          <div
            className="w-1 h-2.5 rounded-full bg-[#F2C230]"
            style={{
              animation: "scrollDot 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  )
}
