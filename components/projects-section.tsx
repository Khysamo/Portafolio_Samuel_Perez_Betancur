"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { X, ExternalLink } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLang } from "@/hooks/use-language"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: "Aeternum",
    category: "Videojuego",
    description: "Experiencia interactiva para hacerle memoria al libro La vorágine.",
    fullDescription:
      "Con el fin de hacerle memoria a las 100 años del libro La vorágine, construimos esta corta experiencia para hacerle memoria al libro, y atraer a más personas a leerlo.",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop",
    technologies: ["Unity", "Figma", "Canva"],
    color: "#F2C230",
    embedUrl: "https://www.behance.net/embed/project/247113871?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/247113871/Aeternum",
  },
  {
    id: 2,
    title: "Tras mis huellas",
    category: "Interactive Experience",
    description: "Experiencia interactiva en el parque la Aurora ubicado en Rionegro.",
    fullDescription:
      "En este proyecto creamos una experiencia interactiva en el parque la Aurora ubicado en Rionegro, con el fin de concientizar a las personas sobre lo que sufren las zarigüeyas en la vida urbana.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
    technologies: ["Figma", "Canva", "Blender"],
    color: "#F2921D",
    embedUrl: "https://www.behance.net/embed/project/247112727?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/247112727/Tras-mis-huellas",
  },
  {
    id: 3,
    title: "Máquina de Goldberg",
    category: "Puzzle",
    description: "Máquina de Goldberg construida en Unity con simulación de física en tiempo real.",
    fullDescription:
      " Máquinas de Goldberg Durante una de las materias cursadas en mi carrera, en una de ellas tuvimos que hacer un trabajo de una máquina de Goldberg, este trabajo me dio un amor por estas máquinas y el uso de las físicas en Unity; esto me llevó a construir 2 más por mi propia cuenta.",
    image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&h=600&fit=crop",
    technologies: ["Unity"],
    color: "#F24F13",
    embedUrl: "https://www.behance.net/embed/project/247115729?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/247115729/Maquinas-de-golber",
  },
  {
    id: 4,
    title: "Proyectos Unity",
    category: "Colección",
    description: "Colección de proyectos realizados en Unity a lo largo de mi carrera.",
    fullDescription:
      "Una colección en Behance que reúne los distintos proyectos desarrollados en Unity: desde prototipos de mecánicas hasta experiencias completas, mostrando la evolución y el aprendizaje a lo largo de la carrera.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
    technologies: ["Unity", "C#"],
    color: "#F2C230",
    embedUrl: "https://www.behance.net/embed/project/247122703?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/247122703/Proyectos-de-unity",
  },
  {
    id: 5,
    title: "Proyectos Figma",
    category: "Colección",
    description: "Colección de proyectos de diseño UI/UX realizados en Figma.",
    fullDescription:
      "Una colección en Behance que reúne los proyectos de diseño desarrollados en Figma: wireframes, prototipos interactivos y sistemas de diseño creados a lo largo de la carrera.",
    image: "https://images.unsplash.com/photo-1493711662062-fa541f7f698b?w=800&h=600&fit=crop",
    technologies: ["Figma"],
    color: "#F2921D",
    embedUrl: "https://www.behance.net/embed/project/247123597?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/247123597/Figma",
  },
]

interface Project {
  id: number
  title: string
  category: string
  description: string
  fullDescription: string
  image: string
  technologies: string[]
  color: string
  embedUrl?: string
  behanceUrl?: string
}

function ProjectCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { t } = useLang()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * 8
    const rotY = ((cx - x) / cx) * 8
    gsap.to(card, {
      rotationX: rotX,
      rotationY: rotY,
      scale: 1.03,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    })
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    })
  }

  return (
    <div
      ref={cardRef}
      className={`project-card-${index} cursor-pointer relative`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 hover:opacity-50 transition-opacity duration-500 blur-md"
        style={{ backgroundColor: project.color }}
      />

      <div className="relative bg-[#0d0d0d] rounded-2xl overflow-hidden border border-[#46334F]/40 hover:border-transparent transition-all duration-300 group">
        {/* Media: embed or image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {project.embedUrl ? (
            <iframe
              src={project.embedUrl}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              allow="clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ border: "none" }}
              loading="lazy"
            />
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent pointer-events-none" />

          {/* Category badge */}
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-black z-10 pointer-events-none"
            style={{ backgroundColor: project.color }}
          >
            {project.category}
          </div>

          {/* Transparent click overlay — sits on top of iframe to capture modal click */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 cursor-pointer"
            onClick={onClick}
          >
            <span className="px-6 py-2.5 rounded-full bg-[#F2C230] text-black text-sm font-bold translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
              {t.projects.view_details}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h4 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#F2C230] transition-colors duration-300">
            {project.title}
          </h4>
          <p className="text-[#8082A6] text-sm leading-relaxed line-clamp-2 mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs rounded-md bg-black/60 text-[#8082A6] border border-[#46334F]/40"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-md text-[#8082A6]">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { t } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(modalRef.current, { opacity: 0, duration: 0.3 })
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.96,
        duration: 0.4,
        ease: "power3.out",
        delay: 0.05,
      })
    })
    return () => ctx.revert()
  }, [])

  const handleClose = () => {
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.97,
        duration: 0.25,
        ease: "power2.in",
      })
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        onComplete: onClose,
      })
    })
    return () => ctx.revert()
  }

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-3xl bg-[#0d0d0d] rounded-2xl overflow-hidden border border-[#46334F]/60 shadow-2xl shadow-black/80 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-[#F2C230] hover:text-black transition-all duration-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media: embed or image */}
        {project.embedUrl ? (
          <div className="relative w-full bg-black" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={project.embedUrl}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              allow="clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ border: "none" }}
              loading="lazy"
            />
            <div
              className="absolute top-4 left-4 px-4 py-1 rounded-full text-sm font-bold text-black z-10"
              style={{ backgroundColor: project.color }}
            >
              {project.category}
            </div>
          </div>
        ) : (
          <div className="relative aspect-video">
            <Image src={project.image} alt={project.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
            <div
              className="absolute top-4 left-4 px-4 py-1 rounded-full text-sm font-bold text-black"
              style={{ backgroundColor: project.color }}
            >
              {project.category}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          <h3 className="font-display text-3xl font-bold text-white mb-4">{project.title}</h3>
          <p className="text-[#8082A6] leading-relaxed mb-6 text-sm md:text-base">
            {project.fullDescription}
          </p>

          <div className="mb-8">
            <h5 className="section-label mb-4">{t.projects.tech_label}</h5>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 text-sm rounded-lg glass text-white border-[#46334F]/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.behanceUrl && (
            <div className="flex gap-4 flex-wrap">
              <a
                href={project.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#F2C230] to-[#F2921D] text-black font-semibold text-sm hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#F2C230]/20"
              >
                <ExternalLink className="w-4 h-4" />
                {t.projects.view_full}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from(".projects-label", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        scrollTrigger: { trigger: ".projects-label", start: "top 85%", once: true },
      })
      gsap.from(".projects-title", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: 0.1,
        scrollTrigger: { trigger: ".projects-title", start: "top 85%", once: true },
      })
      gsap.from(".projects-desc", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.2,
        scrollTrigger: { trigger: ".projects-desc", start: "top 85%", once: true },
      })

      // Cards stagger
      projects.forEach((_, i) => {
        gsap.from(`.project-card-${i}`, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.project-card-${i}`,
            start: "top 88%",
            once: true,
          },
          delay: (i % 3) * 0.1,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-28 px-4 overflow-hidden bg-black"
    >
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#46334F]/40 to-transparent" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#F24F13]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-[#F2C230]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="projects-label section-label mb-4">{t.projects.eyebrow}</p>
          <h2 className="projects-title font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t.projects.title} <span className="text-gradient-gold">{t.projects.title_highlight}</span>
          </h2>
          <p className="projects-desc text-[#8082A6] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            {t.projects.desc}
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
