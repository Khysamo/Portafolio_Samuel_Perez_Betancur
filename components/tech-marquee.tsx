"use client"

import {
  SiUnity,
  SiSharp,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiGit,
  SiGithub,
  SiFigma,
} from "react-icons/si"

const row1 = [
  { icon: SiUnity,        name: "Unity",          color: "#FFFFFF" },
  { icon: SiSharp,        name: "C#",             color: "#9B4F97" },
  { icon: SiHtml5,        name: "HTML",           color: "#E34F26" },
  { icon: SiCss3,         name: "CSS",            color: "#1572B6" },
]

const row2 = [
  { icon: SiJavascript,   name: "JavaScript",     color: "#F7DF1E" },
  { icon: SiGit,          name: "Git",            color: "#F05032" },
  { icon: SiGithub,       name: "GitHub",         color: "#FFFFFF" },
  { icon: SiFigma,        name: "Figma",          color: "#F24E1E" },
]

function MarqueeRow({
  items,
  direction = "left",
  speed = 35,
}: {
  items: typeof row1
  direction?: "left" | "right"
  speed?: number
}) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }} />

      <div
        className="flex gap-4 w-max"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => {
          const Icon = item.icon
          return (
            <div
              key={i}
              className="group flex items-center gap-3 px-5 py-3 rounded-2xl glass border border-[#46334F]/30 hover:border-[#F2C230]/30 transition-all duration-300 hover:scale-105 cursor-default flex-shrink-0"
            >
              <Icon
                className="w-6 h-6 flex-shrink-0 transition-all duration-300"
                style={{ color: item.color }}
              />
              <span className="text-[#8082A6] text-sm font-medium group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                {item.name}
              </span>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export function TechMarquee() {
  return (
    <div className="space-y-4">
      <MarqueeRow items={row1} direction="left"  speed={30} />
      <MarqueeRow items={row2} direction="right" speed={28} />
    </div>
  )
}
