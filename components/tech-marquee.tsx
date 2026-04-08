"use client"

import {
  SiUnity,
  SiUnrealengine,
  SiBlender,
  SiSharp,
  SiCplusplus,
  SiGit,
  SiReact,
  SiFigma,
  SiSteam,
  SiGithub,
  SiVim,
  SiPhotopea,
  SiJira,
  SiSlack,
  SiNodedotjs,
  SiTypescript,
} from "react-icons/si"

const row1 = [
  { icon: SiUnity,        name: "Unity",          color: "#FFFFFF" },
  { icon: SiUnrealengine, name: "Unreal Engine",  color: "#DA1F26" },
  { icon: SiBlender,      name: "Blender",        color: "#F5792A" },
  { icon: SiSharp,        name: "C#",             color: "#9B4F97" },
  { icon: SiCplusplus,    name: "C++",            color: "#00599C" },
  { icon: SiGit,          name: "Git",            color: "#F05032" },
  { icon: SiReact,        name: "React",          color: "#61DAFB" },
  { icon: SiFigma,        name: "Figma",          color: "#F24E1E" },
]

const row2 = [
  { icon: SiSteam,        name: "Steam",          color: "#C5C3C0" },
  { icon: SiGithub,       name: "GitHub",         color: "#FFFFFF" },
  { icon: SiVim,          name: "Vim",            color: "#019733" },
  { icon: SiPhotopea,     name: "Photopea",       color: "#18A497" },
  { icon: SiJira,         name: "Jira",           color: "#0052CC" },
  { icon: SiSlack,        name: "Slack",          color: "#4A154B" },
  { icon: SiNodedotjs,    name: "Node.js",        color: "#339933" },
  { icon: SiTypescript,   name: "TypeScript",     color: "#3178C6" },
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
