"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, ChevronDown } from "lucide-react"

const languages = [
  { code: "am", name: "አማርኛ", flag: "🇪🇹" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "or", name: "Oromiffa", flag: "🇪🇹" },
]

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState(languages[1])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="neumorphic-button gap-2 bg-card/50 backdrop-blur-sm border border-transparent hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          <Globe className="h-4 w-4 relative z-10 transition-all duration-300 group-hover:rotate-12 group-hover:text-purple-600" />
          <span className="hidden sm:inline relative z-10 font-medium transition-all duration-300">
            {currentLang.name}
          </span>
          <span className="sm:hidden relative z-10 text-lg transition-transform duration-300 group-hover:scale-110">
            {currentLang.flag}
          </span>
          <ChevronDown className="h-3 w-3 relative z-10 transition-all duration-300 group-hover:rotate-180 group-hover:text-purple-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="neumorphic-card border-purple-100 shadow-xl backdrop-blur-sm bg-white/95 animate-in fade-in-0 zoom-in-95 duration-200"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setCurrentLang(lang)}
            className="gap-3 cursor-pointer hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 rounded-lg mx-1 my-0.5 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
            <span className="text-lg transition-transform duration-200 group-hover:scale-110 relative z-10">
              {lang.flag}
            </span>
            <span className="font-medium relative z-10">{lang.name}</span>
            {currentLang.code === lang.code && (
              <div className="w-2 h-2 bg-purple-600 rounded-full ml-auto relative z-10 animate-pulse"></div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
