"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Lang, translations } from "@/lib/i18n"

type LangContextType = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: typeof translations["en"]
}

const LangContext = createContext<LangContextType | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es")

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null
    if (stored === "en" || stored === "es") setLangState(stored)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem("lang", l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used inside LangProvider")
  return ctx
}
